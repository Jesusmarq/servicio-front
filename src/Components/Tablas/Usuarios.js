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
          "nombre": "Elena ",
          "apellidop": "García",
          "apellidom": "Cosme",
          "usuario": "usuario1@example.com",
          "contraseña": "Yg7#mPz9",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Alumno",
          "nombre": "Carlos",
          "apellidop": "Rodríguez",
          "apellidom": "Cosme",
          "usuario": "correo2@gmail.com",
          "contraseña": "A3fXb*7r",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Alumno",
          "nombre": "Valeria ",
          "apellidop": "López",
          "apellidom": "Cosme",
          "usuario": "email_3@hotmail.com",
          "contraseña": "L1q&nW8k",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Alumno",
          "nombre": "Juan ",
          "apellidop": "Martínez",
          "apellidom": "Cosme",
          "usuario": "user4@yahoo.com",
          "contraseña": "H9t@oB2p",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Alumno",
          "nombre": "María ",
          "apellidop": "Sánchez",
          "apellidom": "Cosme",
          "usuario": "test5@outlook.com",
          "contraseña": "Z6g@yU4j",
          "edicion": "Editar"
        },
      
      
        {
          "tipo_usuario": "Validador",
          "nombre": "Miguel ",
          "apellidop": "González",
          "apellidom": "Cosme",
          "usuario": "correo_ejemplo6@domain.com",
          "contraseña": "X5p%mK7s",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Validador",
          "nombre": "Laura",
          "apellidop": "Pérez",
          "apellidom": "Cosme",
          "usuario": "prueba7@icloud.com",
          "contraseña": "R8w*A3hQ",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Validador",
          "nombre": "Alejandro",
          "apellidop": "Torres",
          "apellidom": "Cosme",
          "usuario": "user8@example.org",
          "contraseña": "C2z@vG6o",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Validador",
          "nombre": "Adriana ",
          "apellidop": "Ramírez",
          "apellidom": "Cosme",
          "usuario": "email9@gmail.com",
          "contraseña": "D4e#jL9x",
          "edicion": "Editar"
        },
        {
          "tipo_usuario": "Validador",
          "nombre": "Jorge Hernández",
          "apellidop": "Hernández",
          "apellidom": "Cosme",
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

function TablaUsuarios({ title }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedData, setEditedData] = useState({
    tipo_usuario: '',
    nombre: '',
    apellidop:'',
    apellidom:'',
    usuario: '',
    contraseña: '',
  });
  const [formChanged, setFormChanged] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleShow = (index) => {
    setSelectedRow(index);
    setShowModal(true);
  };

  const handleSend = () => {
    if (selectedRow !== null) {
      const newData = [...data];
      newData[selectedRow] = { ...data[selectedRow], ...editedData };
      Swal.fire({
        icon: 'success',
        title: 'Edición exitosa',
        text: 'La información ha sido editada correctamente.',
      });
      handleClose();
    }
  };

  const handleCancel = () => {
    Swal.fire({
      icon: 'error',
      title: 'Edición fallida',
      text: 'No se logro editar la información.',
    });
    handleClose();
  };

  const handleEditChange = (e, field) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
    setFormChanged(true);
  };

  const handleClose = () => {
    setFormChanged(false);
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
              <StyledTh>Apellido Paterno</StyledTh>
              <StyledTh>Apellido Materno</StyledTh>
              <StyledTh>Usuario</StyledTh>
              <StyledTh>Contraseña</StyledTh>
              <StyledTh>Editar</StyledTh>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => !selectedOption || item.tipo_usuario === selectedOption)
              .filter((item) =>
                item.tipo_usuario.toLowerCase().includes(searchText.toLowerCase()) ||
                item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
                item.apellidop.toLowerCase().includes(searchText.toLowerCase()) ||
                item.apellidom.toLowerCase().includes(searchText.toLowerCase()) ||
                item.usuario.toLowerCase().includes(searchText.toLowerCase()) ||
                item.contraseña.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((item, index) => (
                <tr key={index}>
                  <StyledTd isEven={index % 2 !== 0}>{item.tipo_usuario}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>{item.nombre}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>{item.apellidop}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>{item.apellidom}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>{item.usuario}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>{item.contraseña}</StyledTd>
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

                <Form.Group controlId="formapellidop">
                  <Form.Label>Apellido Paterno:</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.apellidop}
                    onChange={(e) => handleEditChange(e, 'apellidop')}
                  />
                </Form.Group>

                <Form.Group controlId="formapellidom">
                  <Form.Label>Apellido Materno:</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.apellidom}
                    onChange={(e) => handleEditChange(e, 'apellidom')}
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
}

export default TablaUsuarios;