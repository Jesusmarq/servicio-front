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
          "tipo_usuario": "Alumno",
          "nombre": "Elena García",
          "usuario": "usuario1@example.com",
          "contraseña": "Yg7#mPz9",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Alumno",
          "nombre": "Carlos Rodríguez",
          "usuario": "correo2@gmail.com",
          "contraseña": "A3fXb*7r",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Alumno",
          "nombre": "Valeria López",
          "usuario": "email_3@hotmail.com",
          "contraseña": "L1q&nW8k",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Alumno",
          "nombre": "Juan Martínez",
          "usuario": "user4@yahoo.com",
          "contraseña": "H9t@oB2p",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Alumno",
          "nombre": "María Sánchez",
          "usuario": "test5@outlook.com",
          "contraseña": "Z6g@yU4j",
          "edicion": "Editar"
        },
      
      
        {
          "tipo_usuario": "Validador",
          "nombre": "Miguel González",
          "usuario": "correo_ejemplo6@domain.com",
          "contraseña": "X5p%mK7s",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Validador",
          "nombre": "Laura Pérez",
          "usuario": "prueba7@icloud.com",
          "contraseña": "R8w*A3hQ",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Validador",
          "nombre": "Alejandro Torres",
          "usuario": "user8@example.org",
          "contraseña": "C2z@vG6o",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Validador",
          "nombre": "Adriana Ramírez",
          "usuario": "email9@gmail.com",
          "contraseña": "D4e#jL9x",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Validador",
          "nombre": "Jorge Hernández",
          "usuario": "usuario_10@yahoo.com",
          "contraseña": "F1n*oT7s",
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
function TablaUsuarios  ({ title })  {
  const [selectedOption, setSelectedOption] = useState(''); // Estado para la opción seleccionada
  const [selectedRow, setSelectedRow] = useState(null); // Estado para almacenar la fila seleccionada

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleShow = (index) => {
    setSelectedRow(index);
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

 
  const [editedData, setEditedData] = useState({
    escuela: '',
    institucion: '',
    // Agrega más campos según tus necesidades
  });


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
      title: 'Carta no enviada',
      text: 'La carta no fue enviada.',
    });

    // Cierra la ventana emergente
    handleClose();
  };

  const [formChanged, setFormChanged] = useState(false);

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
  
    return (
    
<div>
<TableWrapper>
<h2>{title}</h2>
{/* Agregar el select con las opciones */}
<select value={selectedOption} onChange={handleOptionChange}>
  <option value="">Todos los Usuarios</option>
  <option value="Alumno">Alumno</option>
  <option value="Validador">Validador</option>
</select>

<StyledTable>
  <thead>
    <tr>
    <StyledTh>Tipo de Usuario</StyledTh>
    <StyledTh>Nombre</StyledTh>
    <StyledTh>Usuario</StyledTh>
    <StyledTh>Contraseña</StyledTh>
    <StyledTh>Editar</StyledTh>
    </tr>
  </thead>
  <tbody>
    {data
      .filter((item) => !selectedOption || item.tipo_usuario === selectedOption) // Filtrar según la opción seleccionada
      .map((item, index) => (
        <tr key={index}>
          <StyledTd isEven={index % 2 !== 0}>{item.tipo_usuario}</StyledTd>
                <StyledTd isEven={index % 2 !== 0}>{item.nombre}</StyledTd>
                <StyledTd isEven={index % 2 !== 0}>{item.usuario}</StyledTd>
                <StyledTd isEven={index % 2 !== 0}>{item.contraseña}</StyledTd>
                <StyledTd isEven={index % 2 !== 0}>
                  {/* Agrega aquí el botón de Editar con el estilo proporcionado */}
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
      <Form.Group controlId="formtipo_usuario">
        <Form.Label>Tipo de Usuario:</Form.Label>
        <Form.Control
  type="text"
  value={editedData.tipo_usuario}
  onChange={(e) => handleEditChange(e, 'tipo_usuario')}
/>
      </Form.Group>

      <Form.Group controlId="formnombre">
        <Form.Label>Nombre:</Form.Label>
        <Form.Control
          type="text"
          value={editedData.nombre}
          onChange={(e) => handleEditChange(e, 'nombre')}
        />
      </Form.Group>

      <Form.Group controlId="formusuario">
        <Form.Label>Usuario(email):</Form.Label>
        <Form.Control
          type="text"
          value={editedData.usuario}
          onChange={(e) => handleEditChange(e, 'usuario')}
        />
      </Form.Group>

      <Form.Group controlId="formcontraseña">
        <Form.Label>Contraseña:</Form.Label>
        <Form.Control
          type="text"
          value={editedData.contraseña}
          onChange={(e) => handleEditChange(e, 'contraseña')}
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
  
  export default TablaUsuarios;