import React, { useState, useEffect } from 'react'; import styled from 'styled-components';
import Logo2 from '../Img/Oficialia.png';  // por veda 333.jpeg
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { axios, obtenerTuToken } from "../Pages/axiosConfig";
import '../Styles/responsive.css';
import fetchWithToken from '../Pages/fetchConfig';


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
  color: #BC955B;    // por veda #98989a
  position: relative;

  &::before {
    content: 'Portal de Reportes:';
    color: #9E2343; // por veda #666666
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

const Container = styled.div`
  margin: 20px;

  @media screen and (max-width: 768px) {
   
    margin: 10px;
    overflow-x: scroll;
    
  }

  
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout:auto;


 
`;

const Th = styled.th`
  background-color: #9E2343;  // por veda #666666 
  color: white;
  padding: 15px;
  text-align: center;
`;

const Td = styled.td`
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #BC955B;  // por veda  #98989a
  }
`;

const TrashIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #9E2343;  // #666666
`;

const UploadButton = styled.label`
  background-color: #9E2343 ;   // por veda  #666666
  color: white;
  padding: 1%; /* Controla la altura del botón */
  width: 8%; /* Ajusta el ancho del botón */
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center; /* Centra el contenido horizontalmente */
  border-radius: 10px;
  margin-bottom: 40px;

  &:hover {
    background-color: #7a1c33;   // por veda #98989a

  input {
    display: none;
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

function Reportes({ title }) {

  // console.log(localStorage.getItem('dataUser'))
  var dataUser = localStorage.getItem('dataUser')
  var parsedDataUser = JSON.parse(dataUser);

  // Acceder a la propiedad 'id'
  //console.log(parsedDataUser.id);

  const initialState = {
    alumno: parsedDataUser.id,
    horas: "0"
  };

  const [datosTabla, setDatosTabla] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetchWithToken(`https://dev-apis.hidalgo.gob.mx/serviciosocial/consultaReportesAlumno?alumno=${parsedDataUser.id}`);
      const data = await response.json();

      setDatosTabla(data.solicitudes);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {

    fetchData();
  }, [parsedDataUser.id]); // Agregar parsedDataUser.id como dependencia para que useEffect se ejecute cuando cambie

  const [formData, setFormData] = useState(initialState);

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


  const [files, setFiles] = useState([]);

  const [pdfFile, setPdfFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPdfFile(file);
  };


  const handleSend = async (file) => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('JSON', JSON.stringify(formData));
      formDataObj.append('pdf', file);

      const response = await fetchWithToken("https://dev-apis.hidalgo.gob.mx/serviciosocial/subirReporte", {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        const responseData = await response;
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Archivo enviado",
            text: "Tu archivo PDF ha sido enviado correctamente.",
          });
          //window.location.reload();
          fetchData();
        }
      } else {
        throw new Error('Error en la respuesta de la red');
      }
    } catch (error) {
      console.error("Error al enviar el archivo:", error);
      Swal.fire({
        icon: "error",
        title: "Error al enviar el archivo",
        text: "Hubo un problema al enviar el archivo o el archivo esta duplicado.",
      });
    }
  };

  const { getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>{title}Portal de Reportes: Captura y Comparte tu Experiencia</Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header><br></br><br></br>

      <Container>
        <Table>
          <thead>
            <tr>
              <Th>Archivo</Th>
              <Th>Horas</Th>
              <Th>Estado</Th>
            </tr>
          </thead>
          <tbody>
            {datosTabla.map((data, index) => (
              <tr key={index}>
                <Td onClick={() => handleDownloadPDF(data.pdf_reporte, 'reporte.pdf')}>PDF</Td>
                <Td>{data.horas}</Td>
                <Td>{data.estado}</Td>
              </tr>
            ))}
            {/*{files.map((file, index) => (
              <tr key={index}>
                <Td onClick={() => handleFileClick(file.preview)}>{file.name}</Td>
                <Td>{file.date}</Td>
                <Td>
                  <TrashIcon icon={faTrash} onClick={() => handleDelete(index)} />
                </Td>
              </tr>
            ))}*/}
          </tbody>
        </Table>
        <br></br>
        <br></br>
        <br></br>

        <UploadButton onChange={(e) => handleSend(e.target.files[0])}>
          <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '10px' }} />
          Seleccionar Archivo
          <input type="file"{...getInputProps()} />
        </UploadButton>
        {/* <input type="file" onChange={(e) => handleSend(e.target.files[0])} /> */}
        {/* <UploadButton onClick={handleSend}>
          <FontAwesomeIcon style={{ marginRight: '10px' }} />
          Subir Archivo
        </UploadButton> */}
      </Container>


    </div>
  );
}

export default Reportes;
