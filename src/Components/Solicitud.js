import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Logo2 from '../Img/Oficialia.png';
import imagecar from '../Img/00.jpg';
import imagecar2 from '../Img/06.jpg';
import imagecar3 from '../Img/02.jpg';
import imagecar4 from '../Img/05.jpg';
import imagecar5 from '../Img/01.jpg';
import imagecar6 from '../Img/04.jpg';
import imagecar7 from '../Img/03.jpg';

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
  color: #BC955B;
  position: relative;

  &::before {
    content: 'Explora Oportunidades:';
    color: #9E2343;
    position: absolute;
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 30vh;
  margin: 20px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center ;
`;

const StyledCard = styled(Card)`
  width: 18rem;
  border-radius: 15px;
  background-color: #9E2343 !important;
  position: relative ;
  margin: 10px;
  padding: 0;
`;

const CardImage = styled(Card.Img)`
  border-radius: 15px 15px 0 0;
  width: 100%;
  height: auto;
  margin: 0;
`;

const CardBody = styled(Card.Body)`
  margin: 10px;
  position: relative;
  text-align: center;
`;

const CardTitle = styled(Card.Title)`
  color: white !important;
  font-size: 20px !important;
  text-align: center !important;
  font-weight: bold !important;
`;

const CardText = styled(Card.Text)`
  color: white;
  text-align: justify ;
`;

const Line = styled.div`
  width: 100%;
  height: 10px;
  background-color: #BC955B;
  margin: 0;
`;

const StyledButton = styled(Button)`
  background-color: #BC955B !important;
  color: white !important;
  border-color: #BC955B !important;
  border-radius: 10px !important;
  margin: 10px !important;
  height: 40px !important;
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

function Solicitud({ title }) {
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
          <Title>{title}Explora Oportunidades: Servicio Social, Prácticas Profesionales y más.</Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header><br></br><br></br>
      <h2>Bienvenido. A continuación, se presentan todas las opciones disponibles. Selecciona la que se adapte a tus necesidades.</h2><br></br><br></br>

      <CardsContainer>
        {/* Tarjeta 1 */}
        <StyledCard>
          <CardImage src={imagecar} alt="imagecar" />
          <Line />
          <CardBody>
            <CardTitle>Servicio Social</CardTitle>
            <CardText>
              Si estás listo para marcar la diferencia a través del servicio social, ¡Únete a nosotros!
            </CardText>
            <StyledButton variant="primary" onClick={handleShow}>
              Seleccionar
            </StyledButton>
          </CardBody>
        </StyledCard>

        {/* Tarjeta 2 */}
        <StyledCard>
          <CardImage src={imagecar2} alt="imagecar" />
          <Line />
          <CardBody>
            <CardTitle>Practicas Profesionales</CardTitle>
            <CardText>
              Explora nuestras prácticas profesionales en el gobierno y da forma a tu futuro. Haz clic abajo para empezar.
            </CardText>
            <StyledButton variant="primary" onClick={handleShow}>
              Seleccionar
            </StyledButton>
          </CardBody>
        </StyledCard>

        {/* Tarjeta 3 */}
        <StyledCard>
          <CardImage src={imagecar3} alt="imagecar" />
          <Line />
          <CardBody>
            <CardTitle>Estancias</CardTitle>
            <CardText>
              Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
            </CardText>
            <StyledButton variant="primary" onClick={handleShow}>
              Seleccionar
            </StyledButton>
          </CardBody>
        </StyledCard>

        {/* Tarjeta 4 */}
        <StyledCard>
          <CardImage src={imagecar4} alt="imagecar" />
          <Line />
          <CardBody>
            <CardTitle>Estadías</CardTitle>
            <CardText>
              Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
            </CardText>
            <StyledButton variant="primary" onClick={handleShow}>
              Seleccionar
            </StyledButton>
          </CardBody>
        </StyledCard>

        {/* Tarjeta 5 */}
        <StyledCard>
          <CardImage src={imagecar5} alt="imagecar" />
          <Line />
          <CardBody>
            <CardTitle>Modelo Dual</CardTitle>
            <CardText>
              Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
            </CardText>
            <StyledButton variant="primary" onClick={handleShow}>
              Seleccionar
            </StyledButton>
          </CardBody>
        </StyledCard>

        {/* Tarjeta 6 */}
        <StyledCard>
          <CardImage src={imagecar6} alt="imagecar" />
          <Line />
          <CardBody>
            <CardTitle>Residencia Profesional</CardTitle>
            <CardText>
              Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
            </CardText>
            <StyledButton variant="primary" onClick={handleShow}>
              Seleccionar
            </StyledButton>
          </CardBody>
        </StyledCard>

        {/* Tarjeta 7 */}
        <StyledCard>
          <CardImage src={imagecar7} alt="imagecar" />
          <Line />
          <CardBody>
            <CardTitle>Proyecto de Intervención</CardTitle>
            <CardText>
              Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
            </CardText>
            <StyledButton variant="primary" onClick={handleShow}>
              Seleccionar
            </StyledButton>
          </CardBody>
        </StyledCard>
      </CardsContainer>

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

export default Solicitud;
