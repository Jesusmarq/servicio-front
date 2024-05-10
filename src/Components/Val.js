import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import fetchWithToken from '../Pages/fetchConfig';
import Logo2 from '../Img/333.jpeg';  // por veda Oficialia.png
import '../Styles/responsive.css';

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
    content: 'Validación de Documentos:';
    color: #666666; // por veda #9E2343
    position: absolute;
    z-index: 1;
  }
`;

const Text = styled.h4`
font-size: clamp(10px, 2vw, 52px);
  margin-top: 2%;
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

const TableContainer = styled.div`
  margin: 20px;
  border-radius: 15px;
  overflow: hidden;
  text-align: center;

  @media screen and (max-width: 768px) {
    overflow-x: auto !important;
    margin: 0px;

  }
  @media screen and (min-width: 768px) and (max-width: 1424px) {
    overflow-x: auto !important;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border-radius: 15px;
`;

const StyledTh = styled.th`
  background-color: #666666; // por veda  #9e2343
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
  background-color: ${(props) => (props.validar ? '#666666' : '#666666')}; // por veda '#9e2343' : '#bc955b'
  color: white;
  cursor: ${(props) => (props.validar ? 'not-allowed' : 'pointer')};
  border-radius: 15px;
  &:disabled {
    cursor: not-allowed;
    background-color:#98989a; // por veda #9e2343
  }
`;

function ValidarSolicitud({ title }) {
  const [data, setData] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWithToken('https://servicioypracticas.hidalgo.gob.mx:3002/consultaReportesTodos?tipo=todos');
        const responseData = await response.json();
        

        setData(responseData.solicitudes);
    // Actualiza dataRef.current
        dataRef.current = responseData.solicitudes;

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const openPdfInNewTab = (pdf) => {
    window.open(pdf, '_blank');
  };

  const handleHoursChange = (id, newHours) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.reporte_id === id && !item.validar ? { ...item, horas: newHours } : item
      )
    );
  };

  const handleValidation = useCallback(async (id, horas) => {
    // Verifica si id es undefined o null antes de continuar
    if (id === undefined || id === null) {
      console.error('Error: id es undefined o null');
      return;
    }

    const updatedData = dataRef.current.map((item) =>
      item.reporte_id === id ? { ...item, validar: !item.validar } : item
    );

    setData(updatedData);

    try {
      const patchData = {
        reporte: id.toString(),
        estatus: 'Aceptado',
        horas: horas.toString(),
      };

      const response = await fetchWithToken('https://servicioypracticas.hidalgo.gob.mx:3002/AceptarRechazarReporte', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchData),
      });

      if (!response.ok) {
        throw new Error(`Error al enviar PATCH: ${response.statusText}`);
      }

      console.log('PATCH enviado exitosamente:', response.status);
    } catch (error) {
      console.error('Error al enviar PATCH:', error);
      // Revertir los cambios en caso de error
      setData(dataRef.current);
    }
  }, []);

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

  

  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>{title}Validación de Documentos: Reportes Mensuales, Reporte Final y Registro de Horas </Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header><br></br><br></br>
      <Text>Bienvenido al Centro de Validación de Informes en PDF. Aquí, encontrarás una interfaz intuitiva para revisar y validar informes de manera eficiente. 
        Simplificamos el proceso para que puedas verificar la precisión de los datos de manera rápida. ¡Explora, valida y toma decisiones informadas con facilidad!</Text><br></br><br></br>
     
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Nombre</StyledTh>
              <StyledTh>Reportes</StyledTh>
              <StyledTh>Horas</StyledTh>
              <StyledTh>Validar</StyledTh>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <StyledTr key={item.reporte_id} even={index % 2 === 0}>
                <StyledTd>{item.nombre}</StyledTd>
                {item.pdf_reporte != null ? (
                    <>
                      <StyledTd isEven={true}>
                      <button
                        onClick={() => handleDownloadPDF(item.pdf_reporte, 'reporte.pdf')}>
                        PDF
                      </button>
                      </StyledTd>
                          </>
                  ) : (
                    <>
                      <StyledTd>Aún no disponible</StyledTd>
                    </>
                  )}
                <StyledTd>
                  <input
                    type="number"
                    value={item.horas}
                    onChange={(e) => handleHoursChange(item.reporte_id, e.target.value)}
                    style={{ width: '60px' }}
                    disabled={item.validar} // Desactiva el input si ya está validado
                  />
                </StyledTd>
                <StyledTd>
                <StyledButton
                  onClick={() => {
                    console.log('item.reporte_id before handleValidation:', item.reporte_id);
                    console.log('item.horas before handleValidation:', item.horas);
                    handleValidation(item.reporte_id, item.horas);
                  }}
                  validar={item.validar}
                  disabled={item.validar}
                >
                  {item.validar ? 'Validado' : 'Validar'}
                </StyledButton>

                </StyledTd>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </div>
  );
}

export default ValidarSolicitud;
