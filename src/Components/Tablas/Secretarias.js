import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Button from 'react-bootstrap/Button';



const TableWrapper = styled.div`
  margin: 20px auto;
  width: 80%;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  background-color: #9E2343;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 18px;
`;

const StyledTd = styled.td`
  padding: 15px;
  text-align: center;
  font-size: 14px;
  border-bottom: 2px solid #ddd;
  background-color: ${(props) => (props.isEven ? '#f9f9f9' : 'white')};
`;

const LiberacionButton = styled.button`
  background-color: #9E2343;
  color: white;
  padding: 5px;
  
  border: none;
  cursor: pointer;
  border-radius: 5px;


  &:hover {
    background-color: #7a1c33;
  }
`;

const CenteredModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #ccc;
  padding: 80px;
  border-radius: 15px;
  width: 40vw;
  margin: 0 auto;
  text-align: center;
  color: #333;
  font-weight: bold;
  font-size: 20px;
  border: 10px solid #ddd;
`;

const CloseButton = styled(Button)`
  background-color: #BC955B !important;
  color: white !important;
  border-color: #BC955B !important;
  border-radius: 10px;
  margin: 10px;
  height: 40px;
  width: 10vw;
`;
const SendButton = styled(Button)`
  background-color: #BC955B !important;
  color: white !important;
  border-color: #BC955B !important;
  border-radius: 10px;
  margin: 10px;
  height: 40px;
  width: 10vw;
`;

function TablaSecretarias  ({ title })  {
 
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [keyForRerender, setKeyForRerender] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [editedData, setEditedData] = useState({
    secretaria: '',
    dependencia: '',
  });
  const [formChanged, setFormChanged] = useState(false);
  const [searchText, setSearchText] = useState('');

  //let selected='';
  const handleShow = (index) => {
    const dependenciaSelec = dependencias.find((dependencia) => dependencia.id_dependencia === index);
    console.log("Dependencia a mostrar en el modal", dependenciaSelec);

  setEditedData({
    secretaria: dependenciaSelec ? dependenciaSelec.secretaria : '',
    dependencia: dependenciaSelec ? dependenciaSelec.dependencia : '',
  });
  setSelectedRow(index);
  setShowModal(true);
};


  const [dependencias, setDependencias] = useState([]);
  const [secretariasUnicas, setSecretariasUnicas] = useState([]);
  // Función para obtener dependencias
  const fetchDependencias = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/dependencias');

      if (response.ok) {
        const depen = await response.json();
        setDependencias(depen);

        const secretariasUnicasSet = new Set(depen.map((item) => item.secretaria));
          const secretariasUnicasArray = Array.from(secretariasUnicasSet);
          setSecretariasUnicas(secretariasUnicasArray);

        //console.log(secretariasUnicasArray);

      } else {
        console.error('Error al obtener datos de dependencias:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud para obtener datos de dependencias:', error.message);
    }
  };

  const handleSend = async () => {
    if (selectedRow !== null) {
      // Aplica los cambios de edición a la fila seleccionada
      const dependenciaSelec = dependencias.find((dependencia) => dependencia.id_dependencia === selectedRow);
      const id = dependenciaSelec.id_dependencia;
      //console.log(dependencias)
      try {
        const newData = { nombre: editedData.dependencia, dependencia: id };
  
        const response = await fetch(`http://127.0.0.1:5000/dependenciaEditar`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });
  
        if (response.ok) {
          setKeyForRerender(prevKey => prevKey + 1);        
          Swal.fire({
            icon: 'success',
            title: 'Edición exitosa',
            text: 'La información ha sido editada correctamente.',
          });
          handleClose();
        } else {
          throw new Error(`Error en la solicitud PATCH a dependenciaEditar: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error al actualizar dependencia:', error);
  
        Swal.fire({
          icon: 'error',
          title: 'Edición fallida',
          text: 'No se logró editar la información.',
        });
      }
    }
  };
  

  const handleCancel = () => {
    // Muestra la alerta de error
    Swal.fire({
      icon: 'error',
      title: 'Edición fallida',
      text: 'No se logro editar la información.',
    });

    // Cierra la ventana emergente
    handleClose();
  };



const handleEditChange = (e, field) => {
  setEditedData((prevData) => ({
    ...prevData,
    [field]: e.target.value,
  }));
  setFormChanged(true); // Indica que se han realizado cambios en el formulario
};

const handleClose = () => {
  setFileSelected(false);
  setFormChanged(false); // Restablece el estado cuando se cierra el modal
  setShowModal(false);
};

const handleSearch = (e) => {
  setSearchText(e.target.value);
};

useEffect(() => {
  fetchDependencias();
}, []);

useEffect(() => {
  fetchDependencias();
}, [keyForRerender]);

    return (
<div>
<TableWrapper>
<h2>{title}</h2>
<input
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={handleSearch}
        />
{console.log(secretariasUnicas)}
<select value={selectedOption} onChange={handleOptionChange}>
  <option value="">Todas las secretarias</option>
  {secretariasUnicas.map((secretaria, index) => (
    <option key={index} value={secretaria}>
      {secretaria}
    </option>
  ))}
</select>


<StyledTable>
          <thead>
            <tr>
              <StyledTh>Secretaria</StyledTh>
              <StyledTh>Área de Adscripción</StyledTh>
              <StyledTh>Editar</StyledTh>
            </tr>
          </thead>
          <tbody>
            {dependencias
              .filter((item) => !selectedOption || item.secretaria === selectedOption)
              .filter((item) =>
                item.secretaria.toLowerCase().includes(searchText.toLowerCase()) ||
                item.dependencia.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((item, index) => (
                <tr key={index}>
                  <StyledTd isEven={index % 2 !== 0}>{item.secretaria}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>{item.dependencia}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>
                    <LiberacionButton variant="primary" onClick={() => handleShow(item.id_dependencia)}>
                      {"Editar"}
                    </LiberacionButton>
                  </StyledTd>
                </tr>
              ))}
          </tbody>
        </StyledTable>

</TableWrapper>


<CenteredModal show={showModal} onHide={handleClose}>
        <ModalContent>
          <Modal.Header closeButton>
            <Modal.Title>Editar Información</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  {selectedRow !== null && (
    <Form>
      <Form.Group controlId="formSecretaria">
        <Form.Label>Secretaria:</Form.Label>
        <Form.Control
  type="text"
  value={editedData.secretaria}
  onChange={(e) => handleEditChange(e, 'secretaria')}
/>
      </Form.Group>

      <Form.Group controlId="formArea">
        <Form.Label>Area de Adscripcion:</Form.Label>
        <Form.Control
          type="text"
          value={editedData.dependencia}
          onChange={(e) => handleEditChange(e, 'dependencia')}
        />
      </Form.Group>

      {/* Agregar más campos según tus necesidades */}
    </Form>
  )}
</Modal.Body>
          <Modal.Footer>
          <SendButton variant="primary" onClick={handleSend} disabled={!formChanged}>
  Enviar
</SendButton>
            <CloseButton variant="primary" onClick={handleCancel}>
              Cerrar
            </CloseButton>
          </Modal.Footer>
        </ModalContent>
      </CenteredModal>
</div>
    );
  };
  
  export default TablaSecretarias;