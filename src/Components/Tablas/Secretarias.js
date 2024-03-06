import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Button from 'react-bootstrap/Button';



const TableWrapper = styled.div`
  margin: 20px auto;
  width: 90%;
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

// Define los estilos para el área de búsqueda y el select
const SearchWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const StyledSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white; /* Color de fondo del select */
  color: #333; /* Color del texto */
`;



const StyledAddButton = styled(Button)`
  background-color: #9E2343;
  color: white;
  border-radius: 5px;
  border-color: #9E2343;
  margin-left: auto;

  &:hover {
    background-color: #bc955b;
    border-color: #bc955b;
  }
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

//-{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{POST AGREGAR DEPENDENCIA}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
const handleAddPlantel = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/agregarUniversidadPlantel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Puedes agregar otros encabezados si es necesario
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // La solicitud fue exitosa, puedes realizar acciones adicionales si es necesario
      console.log('Nuevo plantel agregado con éxito.');
    } else {
      // Manejar otros códigos de estado si es necesario
      console.error('Error al agregar nuevo plantel:', response.statusText);
    }
  } catch (error) {
    // Manejar errores de red u otros errores
    console.error('Error en la solicitud para agregar nuevo plantel:', error.message);
  }
};

const initialState = {
  id_universidad: "",
  universidad_nombre: "",
  plantel_nombre: "",
  direccion: "",
};

const [formData, setFormData] = useState(initialState);
const [showAddModal, setShowAddModal] = useState(false);
console.log(formData)


const handleOptionChange2 = (event) => {
  const id_universidad = event.target.value;
  const universidad_nombre = event.target.options[event.target.selectedIndex].text; // Obtén el nombre de la universidad seleccionada
  setFormData({ ...formData, id_universidad, universidad_nombre }); // Actualiza el estado con el id y el nombre de la universidad
};

const handleInputChange = (event, fieldName) => {
  const value = event.target.value;
  setFormData({ ...formData, [fieldName]: value });
};



const ShowModal = () => {
  setShowAddModal(true);
};

const handleCloseAddModal = () => {
  setShowAddModal(false);
};




    return (
<div>
<TableWrapper>
<h2>{title}</h2>
<SearchWrapper>
<StyledInput
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={handleSearch}
        />
{console.log(secretariasUnicas)}
<StyledSelect value={selectedOption} onChange={handleOptionChange}>
  <option value="">Todas las secretarias</option>
  {secretariasUnicas.map((secretaria, index) => (
    <option key={index} value={secretaria}>
      {secretaria}
    </option>
  ))}
</StyledSelect>

<StyledAddButton onClick={ShowModal}>Agregar Nueva Dependencia</StyledAddButton>
</SearchWrapper>


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




      <CenteredModal show={showAddModal} onHide={handleCloseAddModal}>
      <ModalContent>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Plantel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSecretaria">
              <Form.Label>Secretaria:</Form.Label>
              <Form.Control as="select" value={formData.id_universidad} onChange={handleOptionChange2}>
                <option value="">Todas las secretarias</option>
                <option value="1">UAEH</option>
                <option value="2">SEMSyS</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDependencia">
              <Form.Label>Dependencia:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la nueva dependencia"
                value={formData.plantel_nombre}
                onChange={(e) => handleInputChange(e, 'plantel_nombre')}
              />
            </Form.Group>

            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la dirección"
                value={formData.direccion}
                onChange={(e) => handleInputChange(e, 'direccion')}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <LiberacionButton variant="primary" onClick={handleAddPlantel}>
            Guardar
          </LiberacionButton>
        </Modal.Footer>
      </ModalContent>
    </CenteredModal>

</div>
    );
  };
  
  export default TablaSecretarias;