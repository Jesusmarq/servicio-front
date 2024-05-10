import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/333.jpeg';  // por veda Oficialia.png
import backgroundImg from '../Img/fondo.png'; 
import Swal from "sweetalert2";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { TRUE } from 'sass';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import fetchWithToken from '../Pages/fetchConfig';

const EstatusWrapper = styled.div`
  //  background-image: url(${backgroundImg});  por veda se comenta imagen
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 100vh;
 // display: flex;
  flex-direction: column;
  align-items: center;
 // padding: 20px;
  box-sizing: border-box;
 
 

`;

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
    padding-left: 0px; // Cambiar el relleno para adaptarse a pantallas más pequeñas
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
    content: 'Seguimiento de Solicitud:';
    color: #666666; // por veda #9E2343
    position: absolute;
    z-index: 1;
  }
`;

const Text = styled.h4`
font-size: clamp(12px, 2vw, 52px);
  margin: 0px;
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

const TableWrapper = styled.div`
  margin: 0px;

 
  
  background-color: rgba(255, 255, 255, 0.8);

  @media screen and (max-width: 768px) {
    overflow-x: auto !important;
  }
  @media screen and (min-width: 768px) and (max-width: 1424px) {
    overflow-x: auto !important;
  }
`;



const StyledTable = styled.table`

width: 100%;
border-collapse: collapse;
margin-top: 20px;

  
`;

const StyledTh = styled.th`
  background-color: #666666; // por veda #9E2343
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 30px;

  @media screen and (max-width: 768px) {
    padding: 10px;
    font-size: clamp(10px, 4vw, 52px);
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    padding: 10px;
    font-size: clamp(10px, 4vw, 52px);
  }
`;

const StyledTd = styled.td`
  padding: 20px;
  text-align: center;
  font-size: 20px;
  border-bottom: 3px solid #ddd;
  background-color: ${(props) => (props.isEven ? '#f9f9f9' : '#e6e6e6')};

  @media screen and (max-width: 768px) {
    padding: 15px;
    font-size: clamp(10px, 3vw, 52px);
  }
  @media screen and (min-width: 768px) and (max-width: 1424px) {
    padding: 15px;
    font-size: clamp(10px, 3vw, 52px);
  }
`;

const LiberacionButton = styled.button`
  background-color: #666666;  // por veda #9E2343
  color: white;
  padding: 15px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 20px;

  &:hover {
    background-color: #98989a; // por veda #7a1c33
  }

  @media screen and (max-width: 768px) {
    font-size: clamp(10px, 1vw, 52px);
    padding: 3%; /* Controla la altura del botón */
    width: 40%; /* Ajusta el ancho del botón */
    border-radius: 5px;
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    padding: 2%; /* Controla la altura del botón */
    width: 30%; /* Ajusta el ancho del botón */
    border-radius: 5px;
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







function base64toBlob(base64Data, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

  function Estatus({ title }) {
    const [datosTabla, setDatosTabla] = useState([]);

    //console.log("localStorage.getItem('dataUser')")

    //console.log(localStorage.getItem('dataUser'))
    var dataUser = localStorage.getItem('dataUser')
    var parsedDataUser = JSON.parse(dataUser);
    
    // Acceder a la propiedad 'id'
    //console.log(parsedDataUser.id);

    const handleSolicitarLiberacion = async () => {

      const jsonString = JSON.stringify(formData);
      const formDataObj =  new FormData()
    
      formDataObj.append('JSON',jsonString)
      formDataObj.append('pdf', formData.pdf)

      try {
        // Hacer la primera petición para obtener el id
        const response = await fetchWithToken(`https://servicioypracticas.hidalgo.gob.mx:3002/idSolicitud?alumno=${parsedDataUser.id} `, formDataObj);
        
        if (!response.ok) {
          throw new Error('Error al obtener el ID de solicitud');
        }
    
        const { id } = await response.json();
    
        // Hacer la segunda petición con el id obtenido
        const secondResponse = await fetchWithToken(`https://servicioypracticas.hidalgo.gob.mx:3002/solicitarLiberacion?solicitud=${id}`, {
          method: 'PATCH',
        });
    
        if (!secondResponse.ok) {
          throw new Error('No tienes una solicitud aplicable para liberación');
        }
    
        // Mostrar el mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Liberación Solicitada',
          text: 'La solicitud se realizó de manera correcta.',
        });
      } catch (error) {
        // Manejar errores
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No tienes una solicitud aplicable para liberación',
        });
      }
      // Cierra la ventana emergente
    handleClose();
    };

  function handleDownloadPDF(pdfBase64, fileName) {
    try {
      const blob = base64toBlob(pdfBase64, 'application/pdf');
      const blobUrl = URL.createObjectURL(blob);

      // Abrir el PDF en una nueva ventana o pestaña
      window.open(blobUrl, '_blank');

      // Limpiar el objeto URL creado
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithToken(`https://servicioypracticas.hidalgo.gob.mx:3002/consultaAlumno?alumno=${parsedDataUser.id}`);
        const data = await response.json();
  
        // Verifica si la respuesta contiene la propiedad 'solicitudes'
        if (data.solicitudes && Array.isArray(data.solicitudes)) {
          setDatosTabla(data.solicitudes);
        } else {
          console.error('La respuesta del API no tiene la estructura esperada:', data);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
  
    fetchData();
  }, [parsedDataUser.id]); // Este efecto se ejecutará cada vez que parsedDataUser.id cambie




  const initialState = {
    pdf: "",
  };
  
  const [showModal, setShowModal] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [formData, setFormData] = useState(initialState);


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
    <EstatusWrapper>
      <Header>
        <TitleWrapper>
          <Title>{title}Seguimiento de Solicitud: Estado, Horas Acumuladas y Liberación</Title>
        
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header>
      <br></br><br></br>
      <Text>Explora tu Progreso: En este espacio dedicado, visualiza el estado actual de tu solicitud, las horas acumuladas y la liberación
         de manera clara y organizada. Mantén un control total sobre tu trayectoria.</Text>
      <br></br><br></br>
      
      {datosTabla.map((data, index) => (
        <TableWrapper key={index}>
          
          <StyledTable>
            <thead>
              <tr>
                <StyledTh>Estatus de Solicitud</StyledTh>
                <StyledTh>Horas Solicitadas</StyledTh>
                <StyledTh>Horas Aprobadas</StyledTh>
                <StyledTh>Tipo de solicitud</StyledTh>
                <StyledTh>Carta de aceptacion</StyledTh>
                <StyledTh>Fecha Liberacion</StyledTh>
                {data.pdf_liberacion !== null && (
                  <StyledTh>Carta de liberación</StyledTh>
                )}

              </tr>
            </thead>
            <tbody>
              <tr>
                <StyledTd isEven={false}>{data.estado}</StyledTd>
                <StyledTd isEven={true}>{data.horas}</StyledTd>
                <StyledTd isEven={true}>{data.horas_abrobadas}</StyledTd>
                <StyledTd isEven={true}>{data.tipo}</StyledTd>
                {data.pdf_aceptacion != null ? (
                    <>
                      <StyledTd isEven={true}>
                      <button
                        onClick={() => handleDownloadPDF(data.pdf_aceptacion, 'aceptacion.pdf')}>
                        PDF
                      </button>
                      </StyledTd>
                          </>
                  ) : (
                    <>
                      <StyledTd>No disponible</StyledTd>
                    </>
                  )}
                <StyledTd isEven={true}>{data.fechaLiberacion}</StyledTd>
                {data.pdf_liberacion !== null && (
                  <StyledTd isEven={true}>
                  <button
                    onClick={() => handleDownloadPDF(data.pdf_liberacion, 'aceptacion.pdf')}>
                    PDF
                  </button>
                  </StyledTd>
                )}
              </tr>
            </tbody>
          </StyledTable>
          
        </TableWrapper>
        
      ))}

      <LiberacionButton onClick={handleShow}>
        Solicitar Liberación
      </LiberacionButton>

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
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <SendButton variant="primary" onClick={handleSolicitarLiberacion} >
              Enviar
            </SendButton>
            <CloseButton variant="primary" onClick={handleCancel}>
              Cerrar
            </CloseButton>
          </Modal.Footer>
        </ModalContent>
      </CenteredModal>
    </EstatusWrapper>
  );
}

export default Estatus;