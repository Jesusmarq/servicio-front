import React, { useState } from 'react';
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

const data = [
    
    {
        "secretaria": "SECRETARÍA DE AGRICULTURA Y DESARROLLO RURAL",
        "area_de_adscripcion": "Agricultura Sostenible",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE BIENESTAR E INCLUSIÓN SOCIAL",
        "area_de_adscripcion": "Bienestar Social",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE CONTRALORÍA",
        "area_de_adscripcion": "Control Interno",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE CULTURA",
        "area_de_adscripcion": "Promoción Cultural",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE DESARROLLO ECONÓMICO",
        "area_de_adscripcion": "Fomento Económico",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE EDUCACIÓN PÚBLICA DE HIDALGO",
        "area_de_adscripcion": "Educación Básica",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE GOBIERNO",
        "area_de_adscripcion": "Asuntos Jurídicos",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE HACIENDA",
        "area_de_adscripcion": "Finanzas Públicas",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE INFRAESTRUCTURA PÚBLICA Y DESARROLLO URBANO SOSTENIBLE",
        "area_de_adscripcion": "Infraestructura Urbana",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE MEDIO AMBIENTE Y RECURSOS NATURALES",
        "area_de_adscripcion": "Conservación Ambiental",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE MOVILIDAD Y TRANSPORTE",
        "area_de_adscripcion": "Movilidad Urbana",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE SALUD",
        "area_de_adscripcion": "Salud Pública",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE SEGURIDAD PÚBLICA",
        "area_de_adscripcion": "Seguridad Ciudadana",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DE TURISMO",
        "area_de_adscripcion": "Promoción Turística",
        "edicion": "Editar"
      },
      {
        "secretaria": "SECRETARÍA DEL TRABAJO Y PREVISION SOCIAL",
        "area_de_adscripcion": "Trabajo y Empleo",
        "edicion": "Editar"
      },
      {
        "secretaria": "OFICIALÍA MAYOR",
        "area_de_adscripcion": "Administración Interna",
        "edicion": "Editar"
      },
      {
        "secretaria": "UNIDAD DE PLANEACIÓN Y PROSPECTIVA",
        "area_de_adscripcion": "Planeación Estratégica",
        "edicion": "Editar"
      }
      
]

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


  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [editedData, setEditedData] = useState({
    secretaria: '',
    area_de_adscripcion: '',
  });
  const [formChanged, setFormChanged] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleShow = (index) => {
    setSelectedRow(index);
    setShowModal(true);
  };

 


  const handleSend = () => {
    if (selectedRow !== null) {
      // Aplica los cambios de edición a la fila seleccionada
      const newData = [...data];
      newData[selectedRow] = { ...data[selectedRow], ...editedData };
      // Aquí puedes realizar cualquier lógica de actualización o enviar los datos editados al servidor
  
      // Muestra la alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Edición exitosa',
        text: 'La información ha sido editada correctamente.',
      });
  
      // Cierra la ventana emergente
      handleClose();
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
{/* Agregar el select con las opciones */}
<select value={selectedOption} onChange={handleOptionChange}>
  <option value="">Todas las secretarias</option>
  <option value="SECRETARÍA DE AGRICULTURA Y DESARROLLO RURAL">SECRETARÍA DE AGRICULTURA Y DESARROLLO RURAL</option>
  <option value="SECRETARÍA DE BIENESTAR E INCLUSIÓN SOCIAL">SECRETARÍA DE BIENESTAR E INCLUSIÓN SOCIAL</option>
  <option value="SECRETARÍA DE CONTRALORÍA">SECRETARÍA DE CONTRALORÍA</option>
  <option value="SECRETARÍA DE CULTURA">SECRETARÍA DE CULTURA</option>
  <option value="SECRETARÍA DE DESARROLLO ECONÓMICO">SECRETARÍA DE DESARROLLO ECONÓMICO</option>
  <option value="SECRETARÍA DE EDUCACIÓN PÚBLICA DE HIDALGO">SECRETARÍA DE EDUCACIÓN PÚBLICA DE HIDALGO</option>
  <option value="SECRETARÍA DE GOBIERNO">SECRETARÍA DE GOBIERNO</option>
  <option value="SECRETARÍA DE HACIENDA">SECRETARÍA DE HACIENDA</option>
  <option value="SECRETARÍA DE INFRAESTRUCTURA PÚBLICA Y DESARROLLO URBANO SOSTENIBLE">SECRETARÍA DE INFRAESTRUCTURA PÚBLICA Y DESARROLLO URBANO SOSTENIBLE</option>
  <option value="SECRETARÍA DE MEDIO AMBIENTE Y RECURSOS NATURALES">SECRETARÍA DE MEDIO AMBIENTE Y RECURSOS NATURALES</option>
  <option value="SECRETARÍA DE MOVILIDAD Y TRANSPORTE">SECRETARÍA DE MOVILIDAD Y TRANSPORTE</option>
  <option value="SECRETARÍA DE SALUD">SECRETARÍA DE SALUD</option>
  <option value="SECRETARÍA DE SEGURIDAD PÚBLICA">SECRETARÍA DE SEGURIDAD PÚBLICA</option>
  <option value="SECRETARÍA DE TURISMO">SECRETARÍA DE TURISMO</option>
  <option value="SECRETARÍA DEL TRABAJO Y PREVISION SOCIAL">SECRETARÍA DEL TRABAJO Y PREVISION SOCIAL</option>
  <option value="OFICIALÍA MAYOR">OFICIALÍA MAYOR</option>
  <option value="UNIDAD DE PLANEACIÓN Y PROSPECTIVA">UNIDAD DE PLANEACIÓN Y PROSPECTIVA</option>
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
            {data
              .filter((item) => !selectedOption || item.secretaria === selectedOption)
              .filter((item) =>
                item.secretaria.toLowerCase().includes(searchText.toLowerCase()) ||
                item.area_de_adscripcion.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((item, index) => (
                <tr key={index}>
                  <StyledTd isEven={index % 2 !== 0}>{item.secretaria}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>{item.area_de_adscripcion}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>
                    <LiberacionButton variant="primary" onClick={() => handleShow(index)}>
                      {item.edicion}
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
          value={editedData.area_de_adscripcion}
          onChange={(e) => handleEditChange(e, 'area_de_adscripcion')}
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