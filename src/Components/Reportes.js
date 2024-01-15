import React, { useState } from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/Oficialia.png';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import axios from "axios";
import '../Styles/responsive.css';


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
    content: 'Portal de Reportes:';
    color: #9E2343;
    position: absolute;
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 30vh;
  margin: 20px;
`;

const Container = styled.div`
  margin: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #9E2343;
  color: white;
  padding: 15px;
  text-align: center;
`;

const Td = styled.td`
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #BC955B;
  }
`;

const TrashIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #9E2343;
`;

const UploadButton = styled.label`
  background-color: #9E2343;
  color: white;
  padding: 15px; /* Controla la altura del botón */
  width: 8%; /* Ajusta el ancho del botón */
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center; /* Centra el contenido horizontalmente */
  border-radius: 10px;
  margin-bottom: 40px;

  &:hover {
    background-color: #7a1c33;
  }

  input {
    display: none;
  }
`;



function Reportes({ title }) {

  const initialState = {
    usuario: "",
    contrasenia: "",
    nombre: "",
    apellidop: "",
    apellidom: "",
    escuelaprocedencia: "",
    plantel: "",
    otroplantel: "",
    curp: "",
    carrera: "",
    
  };

  const [formData, setFormData] = useState(initialState);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  

  const handleSubmit = (e) => {
    // Previene el comportamiento predeterminado del formulario, que es el envío normal.
    e.preventDefault();
  
    // Realiza una solicitud POST a la URL 'http://127.0.0.1:5000/registroAlumno' utilizando Axios.
    axios
      .post(`http://127.0.0.1:5000/registroAlumno`, formData)
      .then((response) => {
        // Si la solicitud es exitosa, muestra una ventana emergente de éxito utilizando SweetAlert.
        Swal.fire({
          position: "center", // Posición de la ventana emergente en el centro.
          icon: "success", // Ícono de éxito.
          title: "Gracias por tu interés. Te contactaremos pronto.", // Título de la ventana emergente.
          showConfirmButton: false, // No muestra el botón de confirmación.
          timer: 4000, // Tiempo de visualización de la ventana emergente (en milisegundos).
        });
  
        // Reinicia el estado 'formData' al estado inicial después del envío exitoso.
        setFormData(initialState);
      })
      .catch((error) => {
        // Maneja cualquier error que ocurra durante la solicitud.
        console.error("Error al enviar el formulario:", error);
  
        // Muestra una ventana emergente de error utilizando SweetAlert.
        Swal.fire({
          icon: "error", // Ícono de error.
          title: "Error al enviar el formulario", // Título de la ventana emergente.
          text: "Hubo un problema al enviar el formulario.", // Texto de la ventana emergente.
        });
      });
  };

  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      date: new Date().toLocaleString(),
      preview: URL.createObjectURL(file), // Crea una URL para la vista previa
    }));

    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleFileClick = (previewUrl) => {
    // Abre la vista previa del archivo
    window.open(previewUrl, '_blank');
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
              <Th>Nombre del Archivo</Th>
              <Th>Fecha de Subida</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <Td onClick={() => handleFileClick(file.preview)}>{file.name}</Td>
                <Td>{file.date}</Td>
                <Td>
                  <TrashIcon icon={faTrash} onClick={() => handleDelete(index)} />
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br></br>
        <br></br>
        <br></br>

        <UploadButton>
          <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: '10px' }} />
          Subir Archivos
          <input type="file" {...getInputProps()} />
        </UploadButton>
      </Container>

      
    </div>
  );
}

export default Reportes;
