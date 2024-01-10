import React, { useState } from 'react';
import Logo2 from '../Img/Oficialia.png';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
const Header = styled.div`
  height: 100px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const TitleWrapper = styled.div`
  text-align: left;
  color: black;
  margin-left: auto;
`;

const Title = styled.h2`
  font-size: 3em;
  margin: 0;
  color: #bc955b;
  position: relative;

  &::before {
    content: 'Validación de Documentos:';
    color: #9e2343;
    position: absolute;
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 30vh;
  margin: 20px;
`;

const TableContainer = styled.div`
  margin: 20px;
  border-radius: 15px;
  overflow: hidden;
  text-align: center;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border-radius: 15px;
`;

const StyledTh = styled.th`
  background-color: #9e2343;
  color: white;
  padding: 10px;
  font-size: 20px;
`;

const StyledTr = styled.tr`
  background-color: ${(props) => (props.even ? '#f0f0f0' : 'white')};
  height: 40px;
`;

const StyledTd = styled.td`
  padding: 10px;
`;

const StyledButton = styled.button`
  background-color: ${(props) => (props.liberar ? '#9e2343' : '#bc955b')};
  color: white;
  cursor: pointer;
  border-radius: 15px;
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

function Liberar({ title }) {
  const [data, setData] = useState([
    { id: 1, nombreUsuario: 'Victor Daniel Acosta', fechaSolicitud: '01/03/2023', liberarUsuario: false },
    { id: 2, nombreUsuario: 'Jesus Adolfo Marquez', fechaSolicitud: '15/03/2023', liberarUsuario: true },
    { id: 3, nombreUsuario: 'Julian Trejo Melchor', fechaSolicitud: '10/04/2023', liberarUsuario: false },
    // ... más datos
  ]);

  const [pdfUrl, setPdfUrl] = useState('');

  const handleReleaseUser = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, liberarUsuario: !item.liberarUsuario } : item
      )
    );
  };

  const handleSendCarta = (id) => {
    // Lógica para enviar carta
    // Puedes implementar la lógica para enviar la carta aquí
  };

  const handleShowCarta = (pdfUrl) => {
    // Lógica para mostrar la carta al usuario
    // Puedes implementar la lógica para mostrar el archivo PDF aquí
  };

  const [showModal, setShowModal] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

  const handleClose = () => {
    setFileSelected(false);
    setShowModal(false);
  };

  const handleShow = () => setShowModal(true);

  const handleChangeFile = (e) => {
    setFileSelected(!!e.target.files.length);
  };

  const handleSend = () => {
    // Lógica para enviar la carta

    // Muestra la alerta de éxito
    Swal.fire({
      icon: 'success',
      title: 'Carta enviada',
      text: 'Tu carta de presentación ha sido enviada correctamente.',
    });

    // Cierra la ventana emergente
    handleClose();
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

  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>{title}Validación de Documentos: Liberación de Usuarios </Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header>
      <h2>Bienvenido al Centro de Validación y Liberacion de Usuarios. Aquí, encontrarás una interfaz intuitiva para liberar usuarios de manera eficiente. Simplificamos el proceso para que puedas verificar la fecha de solicitud y liberar usuarios de manera rápida. ¡Explora y toma decisiones informadas con facilidad!</h2>

      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Nombre del Usuario</StyledTh>
              <StyledTh>Fecha de Solicitud de Liberación</StyledTh>
              <StyledTh>Liberar Usuario</StyledTh>
              <StyledTh>Carta de Liberación</StyledTh>
              <StyledTh>Mostrar Carta al Usuario</StyledTh>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <StyledTr key={item.id} even={index % 2 === 0}>
                <StyledTd>{item.nombreUsuario}</StyledTd>
                <StyledTd>{item.fechaSolicitud}</StyledTd>
                <StyledTd>
                  <StyledButton
                  variant="primary" 
                    onClick={() => {
                      handleShow();
                      handleReleaseUser(item.id);}}
                    liberar={item.liberarUsuario}
                  >

                    {item.liberarUsuario ? 'Liberado' : 'Liberar'}
                  </StyledButton>
                </StyledTd>
                <StyledTd>
                  {item.liberarUsuario && (
                    <>
                      <StyledButton onClick={() => handleSendCarta(item.id)}>
                        Enviar Carta
                      </StyledButton>
                      {/* Otros botones y lógica específica para la fila de "Mostrar Carta" */}
                    </>
                  )}
                </StyledTd>
                <StyledTd>
                  {item.liberarUsuario && (
                    <StyledButton onClick={() => handleShowCarta(pdfUrl)}>
                      Mostrar Carta
                    </StyledButton>
                  )}
                </StyledTd>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>

      <CenteredModal show={showModal} onHide={handleClose}>
        <ModalContent>
          <Modal.Header closeButton>
            <Modal.Title>Carta de presentación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Por favor, adjunta tu carta de presentación y envíala.</p>
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Selecciona tu archivo PDF</Form.Label>
                <Form.Control type="file" accept=".pdf" onChange={handleChangeFile} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <SendButton variant="primary" onClick={handleSend} disabled={!fileSelected}>
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

export default Liberar;
