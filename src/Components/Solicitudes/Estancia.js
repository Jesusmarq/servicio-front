import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet';
import axios from "axios";
import '../../Styles/responsive.css';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';

// Importa la imagen (asegúrate de tener la ruta correcta)
import encabezadoImage from '../PDFS/image001.jpg';
import { font } from '../Fuentes/Montserrat-Regular-normal'
import { font2 } from '../Fuentes/Montserrat-Bold-normal';

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
  background-color: ${(props) => (props.validar ? '#9e2343' : '#bc955b')};
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
  background-color: #bc955b !important;
  color: white !important;
  border-color: #bc955b !important;
  border-radius: 10px;
  margin: 10px;
  height: 40px;
  width: 10vw;
`;
const SendButton = styled(Button)`
  background-color: #bc955b !important;
  color: white !important;
  border-color: #bc955b !important;
  border-radius: 10px;
  margin: 10px;
  height: 40px;
  width: 10vw;
`;



function ServicioSocial ({ title }) {
  const [data, setData] = useState([
    { id: 1, nombre: 'Juan Pérez', tipoSolicitud: 'Estancia', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
    { id: 2, nombre: 'María González', tipoSolicitud: 'Estancia', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '15/01/2023', validar: false },
    { id: 3, nombre: 'José Rodríguez', tipoSolicitud: 'Estancia', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '10/02/2023', validar: true },
    { id: 4, nombre: 'Ana Martínez', tipoSolicitud: 'Estancia', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
    { id: 5, nombre: 'Luis Hernández', tipoSolicitud: 'Estancia', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
    { id: 6, nombre: 'Laura Díaz', tipoSolicitud: 'Estancia', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
    { id: 7, nombre: 'Carlos Ramírez', tipoSolicitud: 'Estancia', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
    { id: 8, nombre: 'Sofía López', tipoSolicitud: 'Estancia', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
    { id: 9, nombre: 'Miguel Fernández', tipoSolicitud: 'Estancia', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
    { id: 10, nombre: 'Isabel Hernández', tipoSolicitud: 'Estancia', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false }
    // ... más datos
  ]);
      
  //-------------------------------generar pdf---------------------------------------------------------
  const [datosQr, setDatosQr] = useState('');
  const [datosFirma, setDatosFirma] = useState('');
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/generarQr?solicitud=2');
      const data = await response.json();
  
      console.log(data);
  
      // Verifica si la respuesta contiene las propiedades 'qr_image_base64' y 'firma_image_base64'
      if (data.qr_image_base64 && data.firma_base64) {
        setDatosQr(data.qr_image_base64);
        setDatosFirma(data.firma_base64);
      } else {
        console.error('La respuesta del API no tiene la estructura esperada:', data);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
  
  useEffect(() => {
      fetchData()
    
    }, []);


  
  const [modalData, setModalData] = useState({
    numeroArchivo: '',
    date:'',
    dirigidaA: '',
    cargo:'',
    nombreEstudiante: '',
    numeroControl: '',
    carrera: '',
    periodo_inicio: '',
    periodo_termino: '',
    horarioInicio: '',
    horarioFin:'',
    direccionGeneral: '',
    programa: '',
    clave: '',
    horas: '',
    actividadesDesarrollar: [''],
  });

  const handleChange = (field, value) => {
    // Actualizar el campo de almacenamiento
    setModalData((prevData) => ({ ...prevData, [field]: value }));
    // Actualizar el campo de visualización (puedes aplicar el formato aquí si es necesario)
   
  };
 
  const handleActividadesChange = (index, value) => {
    const newActividades = [...modalData.actividadesDesarrollar];
    newActividades[index] = value;
    setModalData({ ...modalData, actividadesDesarrollar: newActividades });
  };
 
  const addActividad = () => {
    setModalData({
      ...modalData,
      actividadesDesarrollar: [...modalData.actividadesDesarrollar, ''],
    });
  };


  // _____-------------------------------------FUNCION PARA CREAR PDF ******************************
  const generatePDF = async () => {

    const pdf = new jsPDF();
     // Cargar Montserrat Bold
  pdf.addFileToVFS('Montserrat-Bold-normal.ttf', font2);
  pdf.addFont('Montserrat-Bold-normal.ttf', 'Montserrat-Bold', 'normal')

// Cargar Montserrat Regular
  pdf.addFileToVFS('Montserrat-Regular-normal.ttf', font);
  pdf.addFont('Montserrat-Regular-normal.ttf', 'Montserrat-Regular', 'normal')
  
  pdf.setFont('Montserrat-Bold');
  pdf.setFontSize(11);


  // Añadir la imagen de encabezado
  pdf.addImage(encabezadoImage, 'PNG', 0, -15, 200, 300); // Ajusta las coordenadas y el tamaño según tus necesidades

  const xPosition = 10;
  let yPosition = 20;

 
 // Construir el texto con el formato deseado
 const textoPDF = `

 
                                                  Carta de Aceptación de Estancia


                                                                                                                                                   ${modalData.numeroArchivo}`;
  // Dividir el texto en líneas de un ancho específico (ancho de la página - márgenes)
const linest = pdf.splitTextToSize(textoPDF, pdf.internal.pageSize.width - 2 * xPosition);
// Agregar las líneas al PDF
pdf.text(linest, xPosition, yPosition);


pdf.setFont('Montserrat-Regular');
pdf.setFontSize(11);
yPosition += 30;                                                                                                                                                 
const fecha =`                                                                                                                                                     
                                                                                           Pachuca de Soto,Hgo., a ${format(new Date(modalData.date), 'dd \'de\' MMMM \'de\' yyyy', { locale: esLocale })}`;




 // Dividir el texto en líneas de un ancho específico (ancho de la página - márgenes)
 const linese = pdf.splitTextToSize(fecha, pdf.internal.pageSize.width - 2 * xPosition);
 // Agregar las líneas al PDF
 pdf.text(linese, xPosition, yPosition);  
   
   
    pdf.setFont('Montserrat-Bold');
    pdf.setFontSize(11);
    yPosition += 20;                                                                                          
  const encabezado=`                                                                                            
  ${modalData.dirigidaA}
  ${modalData.cargo}
  P r e s e n t e`;

   // Dividir el texto en líneas de un ancho específico (ancho de la página - márgenes)
   const lines = pdf.splitTextToSize(encabezado, pdf.internal.pageSize.width - 2 * xPosition);
   // Agregar las líneas al PDF
   pdf.text(lines, xPosition, yPosition);


   pdf.setFont('Montserrat-Regular');
   pdf.setFontSize(11);
   yPosition += 20;
  const cuerpo =`
  Por medio del presente informo a usted que el C.${modalData.nombreEstudiante}, con número de control ${modalData.numeroControl}, alumno/a de la Licenciatura en ${modalData.carrera}, ha sido aceptado/a para realizar su Estancia en la Oficialia Mayor, cubriendo el periodo del ${format(new Date(modalData.periodo_inicio), 'dd \'de\' MMMM \'de\' yyyy', { locale: esLocale })} al  ${format(new Date(modalData.periodo_termino), 'dd \'de\' MMMM \'de\' yyyy', { locale: esLocale })}, de lunes a viernes en un horario de ${modalData.horarioInicio} a ${modalData.horarioFin} hrs.,siendo asignado/a en la ${modalData.direccionGeneral}, bajo el Programa: “${modalData.programa}” clave:${modalData.clave}, cubriendo un total de ${modalData.horas} horas, realizando las siguientes actividades:
  `;
   // Dividir el texto en líneas de un ancho específico (ancho de la página - márgenes)
   const lines2 = pdf.splitTextToSize(cuerpo, pdf.internal.pageSize.width - 2 * xPosition);
   // Agregar las líneas al PDF
   pdf.text(lines2, xPosition, yPosition);

   yPosition += 30;
  modalData.actividadesDesarrollar.forEach((actividad, index) => {
    yPosition += 15;

    // Dividir cada actividad en líneas
    const actividadLines = pdf.splitTextToSize(`${index + 1}. ${actividad}`, pdf.internal.pageSize.width - 2 * xPosition);

    // Agregar las líneas al PDF
    pdf.text(actividadLines, xPosition, yPosition);
  });

  const saludo =` Sin otro particular por el momento, le envío un cordial saludo.`;
  yPosition += 30;
  // Dividir el texto del pie de página en líneas
const saludolines = pdf.splitTextToSize(saludo, pdf.internal.pageSize.width - 2 * xPosition);
 // Agregar las líneas al PDF
pdf.text(saludolines, xPosition, yPosition);

pdf.setFont('Montserrat-Bold');
    pdf.setFontSize(11);
  // Agregar el resto del texto del pie de página
  const att = `
 
  A t e n t a m e n t e `;
  yPosition += 5;
  // Dividir el texto del pie de página en líneas
const attLines = pdf.splitTextToSize(att, pdf.internal.pageSize.width - 2 * xPosition);
 // Agregar las líneas al PDF
pdf.text(attLines, xPosition, yPosition);

const piePagina =`
M.G.P. Odette Assad Díaz
Directora de Profesionalización
de la Oficialía Mayor `;
yPosition += 40;
// Dividir el texto del pie de página en líneas
const piePaginaLines = pdf.splitTextToSize(piePagina, pdf.internal.pageSize.width - 2 * xPosition);
// Agregar las líneas al PDF
pdf.text(piePaginaLines, xPosition, yPosition);

pdf.addImage(datosQr, 'PNG', 140, 190, 50, 50);
pdf.addImage(datosFirma, 'PNG', 10,215, 50, 20);

pdf.setFont('Montserrat-Regular');
    pdf.setFontSize(9);
const direccion=`
                                                                                                                     Dirección de Profesionalización, Av. Madero 100-A, 1er Piso
                                                                                                                                                           Col. Centro, Pachuca, Hgo., C.P. 42000
                                                                                                                                                                Tel.: 01(771)7176000 ext. 2095 y 6836
                                                                                                                                                                                           www.hidalgo.gob.mx
                                                                                                                                         `;
                                                                                                                                         
  
    yPosition += 10;
     // Dividir el texto del pie de página en líneas
  const direccionLines = pdf.splitTextToSize(direccion, pdf.internal.pageSize.width - 2 * xPosition);
    // Agregar las líneas al PDF
  pdf.text(direccionLines, xPosition, yPosition);
  

  // Agregar un salto de línea antes de la cadena de firma electrónica
  yPosition += 25;

  // Ajustar el tamaño de letra solo para la cadena de firma electrónica
  pdf.setFont('Montserrat-Regular');
  pdf.setFontSize(6);

  const cadena = `MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKW7Rv3W/7QdUoYGv5l1N1T4z8Y1Z+uAaVtD+u8SCnUf6zvDz4r6Jm8uRJn4IRHjuUL9FLFTWNQlD3rckA4Zjuh3V4/XoUHDbc7w1pvqnEs3JNp7PBJotz47ti2SPo5f0gJmCEuLVYSWifEjT+evxAdFt4mX31RlcMv5z/AgMBAAECgYEAi0k2d3aQhsWO6kmJXQ2cE5RugDqGtNhQQHrsx57lroF1DFqctKXOgYv6xdWdsfbBxmWkxSdoZGmFE5cxfF+6KtGbK/nWYEW0Q9GxShU1EYcyc4j4ISzo94jQsXqCrWAT02z3F7SryJ0wvFQ6e2SJ67U1t9Il9JY3lWYyx/vLkCQQD1jiA2spBrKlAWEa+IsmV/3LnzRrTtql+XgTYYraq5Rtoz/d6W0aVrDp78cV8QFh54j9uVACMsFYByQdEjYDAkEAyrqwWUmSbDTsXKYIYFIt4cO9Wt6HgGmvY/ghDsINbFJblp0+fF4zz2abzAMiBmIKI0Q1sUucQShY+/YrLgJBAN5bslF4gWpjjPCdNBlGz1TtNuyiMc2shMLqXy06+I13ud6RvOJ8QWghXKPE0GvDsgyffRplcSkTQOh3SGYx0CQQC07Zg8pgGupVYBTRa3Kw9nYRUZDNXszET7Goy6B16fz+n75WfToxdK4UvXcGILG1b+0eTpppJ7yIZoF3Td/NkLAkAZgSZj4iZxhq8wfhX2h7DFEAp7QAxS1a9lPN+qZgPIhgc02M50JHtOUwABcPm/n`;

  // Agregar la cadena de firma electrónica al PDF
  const cadenaLines = pdf.splitTextToSize(cadena, pdf.internal.pageSize.width - 2 * xPosition);
  pdf.text(cadenaLines, xPosition, yPosition);


  
    // Obtener el contenido del PDF como ArrayBuffer
  const pdfArrayBuffer = pdf.output('arraybuffer');
  // Crear un Blob a partir del ArrayBuffer
  const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
  const pdfFile = new File([pdfBlob], 'pdfgenerado.pdf', {
    lastModified: new Date().getTime(), // Timestamp de la última modificación
    type: 'application/pdf',
  });
  
  return pdfFile;
  
  };
  const sendRequest = async() => {
    // Crear FormData y agregar el PDF
    const pdfFile = await generatePDF();
    console.log(pdfFile)
    const formData = new FormData();
    formData.append('pdf', pdfFile, 'pdfgenerado.pdf');
  
    // Agregar el JSON al FormData
    const jsonData = {"solicitud":"2","estatus":"Aceptado","validador":"7"}; 
    formData.append('JSON', JSON.stringify(jsonData));
  
    console.log('FormData antes de la solicitud:', formData);
  
    // Realizar la solicitud Axios
    axios
    .patch(`http://127.0.0.1:5000/AceptarRechazarSolicitud`, formData)
    .then((response) => {
      
      if (response) {
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
};
  
  
  //************************************************************************************************************************************************ *

  const [sendButtonClicked, setSendButtonClicked] = useState(false);

  const handleSend = () => {
    // Lógica para enviar la solicitud con los datos del formulario
    // Muestra la alerta de éxito
    Swal.fire({
      icon: 'success',
      title: 'Solicitud enviada',
      text: 'Tu solicitud ha sido enviada correctamente.',
    });
    // Cierra la ventana emergente y restablece el estado del formulario
    handleClose();
    setSendButtonClicked(true);
    setModalData({
      numeroArchivo: '',
      dirigidaA: '',
      nombreEstudiante: '',
      numeroControl: '',
      carrera: '',
      dependencia: '',
      periodo: '',
      horario: '',
      direccionGeneral: '',
      programa: '',
      clave: '',
      horas: '',
      actividadesDesarrollar: [''],
    });
  };
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const openPdfInNewTab = (pdf) => {
    window.open(pdf, '_blank');
  };
  const handleValidation = (id) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, validar: !item.validar } : item))
    );
  };
  const handleClose = () => {
    setSendButtonClicked(false);
    setShowModal(false);
    setModalData({
      numeroArchivo: '',
      dirigidaA: '',
      nombreEstudiante: '',
      numeroControl: '',
      carrera: '',
      dependencia: '',
      periodo: '',
      horario: '',
      direccionGeneral: '',
      programa: '',
      clave: '',
      horas: '',
      actividadesDesarrollar: [''],
    });
  };
  const handleShow = () => setShowModal(true);
  
  const validateForm = () => {
    // Implementa la lógica de validación del formulario
    return true; // Devuelve true si el formulario es válido, o false si no lo es
  };

  return (
       <div>
  <TableContainer>
    <StyledTable>
      <thead>
        <tr>
          <StyledTh>Nombre</StyledTh>
          <StyledTh>Escuela</StyledTh>
          <StyledTh>Tipo de Solicitud</StyledTh>
          <StyledTh>Carta de Presentación</StyledTh>
          <StyledTh>Fecha</StyledTh>
          <StyledTh>Aceptar Solicitud2</StyledTh>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <StyledTr key={item.id} even={index % 2 === 0}>
            <StyledTd>{item.nombre}</StyledTd>
            <StyledTd>{item.escuela}</StyledTd>
            <StyledTd>{item.tipoSolicitud}</StyledTd>
            <StyledTd>
              <Button
                variant="link"
                onClick={() => {
                  setSelectedPdf(item.cartaPresentacion);
                  openPdfInNewTab(require('./1212.pdf'));
                }}
                style={{ color: selectedPdf === item.cartaPresentacion ? '#9e2343' : '#bc955b' }}
              >
                {item.cartaPresentacion}
              </Button>
            </StyledTd>
            <StyledTd>{item.fecha}</StyledTd>
            <StyledTd>
              <StyledButton
                variant="primary"
                onClick={() => {
                  handleShow();
                  handleValidation(item.id);
                  setSendButtonClicked(false);
                }}
                validar={item.validar}
                disabled={item.validar || sendButtonClicked}
              >
                {item.validar ? 'Aceptado' : 'Aceptar'}
              </StyledButton>
            </StyledTd>
          </StyledTr>
        ))}
      </tbody>
    </StyledTable>
  </TableContainer>

  <CenteredModal show={showModal} onHide={handleClose} onExited={() => setSendButtonClicked(false)}>
    <ModalContent>
      <Modal.Header closeButton>
        <Modal.Title>Formulario de Solicitud</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Incluir Helmet para agregar la fuente Montserrat */}
  <Helmet>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"
    />
  </Helmet>

  <Form>
    <Form.Group controlId="numeroArchivo" className="mb-3">
      <Form.Label>Número de Archivo</Form.Label>
      <Form.Control
        type="text"
        value={modalData.numeroArchivo}
        onChange={(e) => handleChange('numeroArchivo', e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="date" className="mb-3">
          <Form.Label>Fecha de la carta</Form.Label>
          <Form.Control
            type="date"
            value={modalData.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
        </Form.Group>

    <Form.Group controlId="dirigidaA" className="mb-3">
      <Form.Label>A quien va dirigida la carta</Form.Label>
      <Form.Control
        type="text"
        value={modalData.dirigidaA}
        onChange={(e) => handleChange('dirigidaA', e.target.value)}
      />
    </Form.Group>
    <Form.Group controlId="cargo" className="mb-3">
      <Form.Label>Cargo de la persona a quien va dirigida</Form.Label>
      <Form.Control
        type="text"
        value={modalData.cargo}
        onChange={(e) => handleChange('cargo', e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="nombreEstudiante" className="mb-3">
      <Form.Label>Nombre del Estudiante</Form.Label>
      <Form.Control
        type="text"
        value={modalData.nombreEstudiante}
        onChange={(e) => handleChange('nombreEstudiante', e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="numeroControl" className="mb-3">
      <Form.Label>Número de Control</Form.Label>
      <Form.Control
        type="text"
        value={modalData.numeroControl}
        onChange={(e) => handleChange('numeroControl', e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="carrera" className="mb-3">
      <Form.Label>Carrera</Form.Label>
      <Form.Control
        type="text"
        value={modalData.carrera}
        onChange={(e) => handleChange('carrera', e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="periodo_inicio" className="mb-3">
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control
            type="date"
            value={modalData.periodo_inicio}
            onChange={(e) => handleChange('periodo_inicio', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="periodo_termino" className="mb-3">
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control
            type="date"
            value={modalData.periodo_termino}
            onChange={(e) => handleChange('periodo_termino', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="horario" className="mb-3">
          <Form.Label>Horario</Form.Label>
          <div style={{ display: "flex" }}>
          <Form.Control
          type="time"
          value={modalData.horarioInicio}
          onChange={(e) => handleChange('horarioInicio', e.target.value)}
          style={{ marginRight: "10px" }}
          />
         <span style={{ margin: "auto" }}>a</span>
        <Form.Control
        type="time"
        value={modalData.horarioFin}
        onChange={(e) => handleChange('horarioFin', e.target.value)}
        style={{ marginLeft: "10px" }}
          />
        </div>
      </Form.Group>

    <Form.Group controlId="direccionGeneral" className="mb-3">
      <Form.Label>Dirección General</Form.Label>
      <Form.Control
        type="text"
        value={modalData.direccionGeneral}
        onChange={(e) => handleChange('direccionGeneral', e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="programa" className="mb-3">
      <Form.Label>Programa</Form.Label>
      <Form.Control
        type="text"
        value={modalData.programa}
        onChange={(e) => handleChange('programa', e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="clave" className="mb-3">
      <Form.Label>Clave</Form.Label>
      <Form.Control
        type="text"
        value={modalData.clave}
        onChange={(e) => handleChange('clave', e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="horas" className="mb-3">
      <Form.Label>Horas</Form.Label>
      <Form.Control
        type="number"
        value={modalData.horas}
        onChange={(e) => handleChange('horas', e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="actividadesDesarrollar" className="mb-3">
      <Form.Label>Actividades a Desarrollar</Form.Label>
      {modalData.actividadesDesarrollar.map((actividad, index) => (
        <div key={index}>
          <Form.Control
            type="text"
            value={actividad}
            onChange={(e) => handleActividadesChange(index, e.target.value)}
          />
          {index === modalData.actividadesDesarrollar.length - 1 && (
            <button type="button" onClick={addActividad}>
              Agregar Más
            </button>
          )}
        </div>
      ))}
    </Form.Group>
  </Form>
     

           </Modal.Body>
          <Modal.Footer>
          <SendButton variant="primary" onClick={sendRequest}>
        Enviar
      </SendButton>
            <CloseButton variant="primary" onClick={handleClose}>
              Cerrar
            </CloseButton>
          </Modal.Footer>
        </ModalContent>
      </CenteredModal>
    </div>
  );
}
export default ServicioSocial;
