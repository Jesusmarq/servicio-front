import React, { useState } from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/Oficialia.png';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFileUpload } from '@fortawesome/free-solid-svg-icons';



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
