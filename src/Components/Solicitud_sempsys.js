import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Logo2 from '../Img/333.jpeg';  // por veda Oficialia.png
import imagecar from '../Img/00.jpg';
import imagecar2 from '../Img/06.jpg';
import imagecar3 from '../Img/02.jpg';
import imagecar4 from '../Img/05.jpg';
import imagecar5 from '../Img/01.jpg';
import imagecar6 from '../Img/04.jpg';
import imagecar7 from '../Img/03.jpg';
import axios from "axios";


const Header = styled.div`
  height: 5%;
  background-color: white;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0px;
  
  //align-items: center;
  //justify-content: center;

  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 40px;

  @media screen and (max-width: 768px) {
    
    grid-template-columns: 1fr; // 
    padding-left: 10px; // Cambiar el relleno para adaptarse a pantallas más pequeñas
    gap: 10px;
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    grid-template-columns: 1fr;
    padding-left: 10px; // Cambiar el relleno para adaptarse a pantallas más pequeñas
    gap: 10px;
  }

  
`;



const TitleWrapper = styled.div`
  //text-align: left;

  margin-left: 0%;
  
`;

const Title = styled.h2`
  font-size: clamp(15px, 4vw, 52px);
  margin: 0;
  color: #98989a;    // por veda #BC955B
  position: relative;

  &::before {
    content: 'Explora Oportunidades:';
    color: #666666; // por veda #9E2343
    position: absolute;
    z-index: 1;
  }
`;

const Text = styled.h4`
font-size: clamp(12px, 2vw, 52px);
  margin: 0;
  color: #000000;
  text-align: justify;
  }
`;

const Image = styled.img`

  width: clamp(5%, 30vh, 100%);
  margin-left: 40%;
  margin-top: 2%;
  align-items: right;

  @media screen and (max-width: 768px) {
    order: -1; // Cambia el orden del elemento cuando el ancho de la pantalla sea menor o igual a 768px
    margin-left: 10%
    
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    order: -1; 
    margin-left: 25%
  }

`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center ;
`;

const StyledCard = styled(Card)`
  width: 18rem;
  border-radius: 15px;
  background-color: #666666 !important; // por veda #9E2343 
  //position: relative ;
  margin: 1%;

`;



const CardImage = styled(Card.Img)`
  width: 100%;
  height: auto;
  margin: 0 !important;
  border-radius: 15px 15px 0 0;
  &.img-fluid {
    width: 100%;
    height: auto;
  }
`;



const CardBody = styled(Card.Body)`
  margin: 0px;
  
  text-align: center;
`;

const CardTitle = styled(Card.Title)`
  color: white !important;
  font-size: 20px 
  text-align: center 
  font-weight: bold 
`;

const CardText = styled(Card.Text)`

  color: white;
  text-align: justify ;
`;

const Line = styled.div`
  width: 100%;
  height: 10px;
  background-color: #98989a; // por veda #BC955B
  margin: 0;
`;

const StyledButton = styled(Button)`
  background-color: ${({ disabled }) => (disabled ? '#666666' : '#98989a')} !important;
  color: white !important;
  border-color: ${({ disabled }) => (disabled ? '#666666' : '#ccc')} !important;
  border-radius: 10px;
  margin: 10px;
  height: 40px;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#666666' : '#ccc')};
    border-color: ${({ disabled }) => (disabled ? '#666666' : '#ccc')};
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

  @media screen and (max-width: 768px) {
    padding: 40px;
    width: 80vw;
    border-radius: 10px;
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    padding: 60px;
    width: 60vw;
  }
`;

const CloseButton = styled(Button)`
  background-color: #98989a !important;
  color: white !important;
  border-color: #98989a !important;
  border-radius: 10px;
  margin: 10px;
  height: 40px;
  width: 10vw;

  @media screen and (max-width: 768px) {
    font-size: clamp(10px, 3vw, 24px);
    padding: 10px;
    width: 60vw;
    border-radius: 5px;
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    padding: 5px;
    width: 40vw;
    border-radius: 5px;
  }
`;

const SendButton = styled(Button)`
  background-color: #98989a !important;
  color: white !important;
  border-color: #98989a !important;
  border-radius: 10px;
  margin: 10px;
  height: 40px;
  width: 10vw;

  @media screen and (max-width: 768px) {
    font-size: clamp(10px, 3vw, 24px);
    padding: 10px;
    width: 60vw;
    border-radius: 5px;
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    padding: 5px;
    width: 40vw;
    border-radius: 5px;
  }
`;




function Solicitud_SEMPSYS({ title }) {
  
  //const dataUser = JSON.parse(localStorage.getItem('dataUser'));
  
    
  //console.log(localStorage.getItem('dataUser'))
  var dataUser = localStorage.getItem('dataUser')
  var parsedDataUser = JSON.parse(dataUser);
  
  // Acceder a la propiedad 'id'
 // console.log(parsedDataUser.id);
  //
   console.log(localStorage.getItem('universidad'))
  var universidad = localStorage.getItem('universidad')
  var parsedUniversidad = JSON.parse(universidad);


  const initialState = {
    alumno: parsedDataUser.id, // Reemplazar el número de alumno con parsedDataUser.id
    horas: "", // Nuevo estado para las horas solicitadas
    fecha: new Date().toLocaleDateString(),
    pdf: "",
    tipo: ""
  };

  const [showModal, setShowModal] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [formData, setFormData] = useState(initialState);

         // Nueva función para manejar cambios en las horas solicitadas
         const handleChangeHours = (e) => {
          setFormData({ ...formData, horas: e.target.value });
        };

          // Nueva función para manejar cambios en la fecha actual
 

    // Función para manejar cambios en el select
    const handleChangeSelect = (e) => {
      setFormData({ ...formData, dependencia: e.target.value });
    };

    const handleSelect = (type) => {
      setFormData({ ...formData, tipo: type });
      handleShow(); // Muestra el modal después de seleccionar
    };

  const handleClose = () => {
    setFileSelected(false);
    setShowModal(false);
  };

  const handleShow = () => setShowModal(true);

  const handleChangeFile = (e) => {
    setFileSelected(!!e.target.files.length);
    // Actualiza el estado formData para incluir el archivo seleccionado
    setFormData({ ...formData, pdf: e.target.files[0] });
  };


  
  
  const handleSend = (e) => {
    // Lógica para enviar la carta

    //const dataUser = JSON.parse(localStorage.getItem('dataUser'));


    const jsonString = JSON.stringify(formData);
    const formDataObj =  new FormData()

    formDataObj.append('JSON',jsonString)
    formDataObj.append('pdf', formData.pdf)
    // Obtener el objeto JSON desde localStorage

    //console.log(formDataObj)
    
    e.preventDefault();
  
    axios
      .post(`https://servicioypracticas.hidalgo.gob.mx:3002/subirCarta`, formDataObj)
      .then((response) => {
        
        if (response.status == 201) {
          Swal.fire({
            icon: 'success',
            title: 'Carta enviada',
            text: 'Tu carta de presentación ha sido enviada correctamente.',
          });
        }
        
      })
      .catch((error) => {
        // Maneja errores de solicitud
        console.error("Error al enviar el formulario:", error);
        Swal.fire({
          icon: "error",
          title: "Error al enviar el formulario",
          text: "Hubo un problema al enviar el formulario.",
        });
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

 

  const isSelectButtonEnabled = (index) => {
    const lowerCaseUniversity = universidad.toLowerCase();
    if (lowerCaseUniversity.includes("semsys")) {
      // Para SEMSYS, habilitar el botón de selección para todas las tarjetas
      return true;
    } else {
      // Para la UAEH, habilitar el botón de selección solo para las dos primeras tarjetas
      return index <= 1;
    }
  };
  

  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>{title}Explora Oportunidades: Servicio Social, Prácticas Profesionales y más.</Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header><br></br><br></br>
         <Text>Bienvenido. A continuación, se presentan todas las opciones disponibles. Selecciona la que se adapte a tus necesidades.</Text><br></br><br></br>

      <CardsContainer>
          <StyledCard>
            <CardImage src={imagecar} alt="imagecar" className="img-fluid" />
            <Line />
            <CardBody>
              <CardTitle>Servicio Social</CardTitle>
              <CardText>
                Si estás listo para marcar la diferencia a través del servicio social, ¡Únete a nosotros!
              </CardText>
              <StyledButton
                variant="primary"
                onClick={() => { handleSelect(1); }}
                disabled={!isSelectButtonEnabled(0)}
              >
                Seleccionar
              </StyledButton>
            </CardBody>
          </StyledCard>

          <StyledCard>
            <CardImage src={imagecar2} alt="imagecar" className="img-fluid" />
            <Line />
            <CardBody>
              <CardTitle>Prácticas Profesionales</CardTitle>
              <CardText>
                Explora nuestras prácticas profesionales en el gobierno y da forma a tu futuro. Haz clic abajo para empezar.
              </CardText>
              <StyledButton
                variant="primary"
                onClick={() => { handleSelect(2); }}
                disabled={!isSelectButtonEnabled(1)}
              >
                Seleccionar
              </StyledButton>
            </CardBody>
          </StyledCard>

          <StyledCard>
            <CardImage src={imagecar3} alt="imagecar" className="img-fluid" />
            <Line />
            <CardBody>
              <CardTitle>Estancias</CardTitle>
              <CardText>
                Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
              </CardText>
              <StyledButton
                variant="primary"
                onClick={() => { handleSelect(3); }}
                disabled={!isSelectButtonEnabled(2)}
                
              >
                Seleccionar
              </StyledButton>
            </CardBody>
          </StyledCard>

          <StyledCard>
            <CardImage src={imagecar4} alt="imagecar" className="img-fluid" />
            <Line />
            <CardBody>
              <CardTitle>Estadías</CardTitle>
              <CardText>
                Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
              </CardText>
              <StyledButton
                variant="primary"
                onClick={() => { handleSelect(4); }}
                disabled={!isSelectButtonEnabled(3)}
              >
                Seleccionar
              </StyledButton>
            </CardBody>
          </StyledCard>

          <StyledCard>
            <CardImage src={imagecar5} alt="imagecar" className="img-fluid" />
            <Line />
            <CardBody>
              <CardTitle>Modelo Dual</CardTitle>
              <CardText>
                Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
              </CardText>
              <StyledButton
                variant="primary"
                onClick={() => { handleSelect(5); }}
                disabled={!isSelectButtonEnabled(4)}
              >
                Seleccionar
              </StyledButton>
            </CardBody>
          </StyledCard>

          <StyledCard>
            <CardImage src={imagecar6} alt="imagecar" className="img-fluid" />
            <Line />
            <CardBody>
              <CardTitle>Residencia Profesional</CardTitle>
              <CardText>
                Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
              </CardText>
              <StyledButton
                variant="primary"
                onClick={() => { handleSelect(6); }}
                disabled={!isSelectButtonEnabled(5)}
              >
                Seleccionar
              </StyledButton>
            </CardBody>
          </StyledCard>

          <StyledCard>
            <CardImage src={imagecar7} alt="imagecar" className="img-fluid" />
            <Line />
            <CardBody>
              <CardTitle>Proyecto de Intervención</CardTitle>
              <CardText>
                Explora las oportunidades para desarrollar tu potencial en el servicio público a través de nuestras estancias en el gobierno.
              </CardText>
              <StyledButton
                variant="primary"
                onClick={() => { handleSelect(7); }}
                disabled={!isSelectButtonEnabled(6)}
              >
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
            <Form >
        

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Selecciona tu archivo PDF</Form.Label>
                <Form.Control type="file" accept=".pdf" onChange={handleChangeFile} />
              </Form.Group>

              <Form.Group controlId="horas" className="mb-3">
                <Form.Label>Horas Solicitadas</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese las horas solicitadas"
                  value={formData.horas}
                  onChange={handleChangeHours}
                />
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

export default Solicitud_SEMPSYS;

