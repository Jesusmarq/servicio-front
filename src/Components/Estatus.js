import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/Oficialia.png';
import backgroundImg from '../Img/fondo.png'; 
import Swal from "sweetalert2";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { TRUE } from 'sass';

const EstatusWrapper = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  height: 100px;
  background-color: transparent;
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

const Title = styled.h1`
font-size: clamp(12px, 4vw, 52px);
  margin: 0px;
  color: #BC955B;
  position: relative;

  &::before {
    content: 'Seguimiento de Solicitud:';
    color: #9E2343;
    position: absolute;
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 30vh;
  margin: 30px;
`;

const TableWrapper = styled.div`
  margin: 20px;
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
  padding: 20px;
  text-align: center;
  font-size: 30px;
`;

const StyledTd = styled.td`
  padding: 20px;
  text-align: center;
  font-size: 20px;
  border-bottom: 3px solid #ddd;
  background-color: ${(props) => (props.isEven ? '#f9f9f9' : '#e6e6e6')};
`;

const LiberacionButton = styled.button`
  background-color: #9E2343;
  color: white;
  padding: 15px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 20px;

  &:hover {
    background-color: #7a1c33;
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

    console.log(localStorage.getItem('dataUser'))
    var dataUser = localStorage.getItem('dataUser')
    var parsedDataUser = JSON.parse(dataUser);
    
    // Acceder a la propiedad 'id'
    console.log(parsedDataUser.id);

    const handleSolicitarLiberacion = async () => {
      try {
        // Hacer la primera petición para obtener el id
        const response = await fetch(`http://127.0.0.1:5000/idSolicitud?alumno=${parsedDataUser.id}`);
        
        if (!response.ok) {
          throw new Error('Error al obtener el ID de solicitud');
        }
    
        const { id } = await response.json();
    
        // Hacer la segunda petición con el id obtenido
        const secondResponse = await fetch(`http://127.0.0.1:5000/solicitarLiberacion?solicitud=${id}`, {
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
        const response = await fetch(`http://127.0.0.1:5000/consultaAlumno?alumno=${parsedDataUser.id}`);
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
  
  return (
    <EstatusWrapper>
      <Header>
        <TitleWrapper>
          <Title>{title}Seguimiento de Solicitud: Estado, Horas Acumuladas y Liberación</Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header>
      <br></br><br></br>
      <h2>Explora tu Progreso: En este espacio dedicado, visualiza el estado actual de tu solicitud, las horas acumuladas y la liberación
         de manera clara y organizada. Mantén un control total sobre tu trayectoria.</h2>
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
                      <StyledTd>Aún no disponible</StyledTd>
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

      <LiberacionButton onClick={handleSolicitarLiberacion}>
        Solicitar Liberación
      </LiberacionButton>
    </EstatusWrapper>
  );
}

export default Estatus;
