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
  const [data, setData] = useState([]);
      
  //-------------------------------generar pdf---------------------------------------------------------
  const [datosQr, setDatosQr] = useState('');
  const [datosFirma, setDatosFirma] = useState('');
  const [datosFirmaE, setDatosFirmaE] =useState('');
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/generarQr?solicitud=2');
      const data = await response.json();
  
      console.log(data);
  
      // Verifica si la respuesta contiene las propiedades 'qr_image_base64' y 'firma_image_base64'
      if (data.qr_image_base64 && data.firma_base64) {
        setDatosQr(data.qr_image_base64);
        setDatosFirma(data.firma_base64);
        setDatosFirmaE(data.firma);
      } else {
        console.error('La respuesta del API no tiene la estructura esperada:', data);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const fetchDataTabla = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/consultaSolicitudes?filtro=todos&limite=5');
      
      if (!response.ok) {
        throw new Error('Error al obtener las solicitudes');
      }
  
      const responseData = await response.json();
      console.log(responseData);
      // Asegúrate de que responseData.solicitudes_json es un array antes de asignarlo a data
      if (Array.isArray(responseData.solicitudes)) {
        setData(responseData.solicitudes);
      } else {
        throw new Error('La propiedad solicitudes_json de la respuesta de la API no es un array');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  useEffect(() => {
      fetchData()
      fetchDataTabla()
    }, []);

    function base64toBlob(base64Data, contentType = '', sliceSize = 512) {
      try {
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
        console.log(blob)
        return blob;
      } catch (error) {
        console.error('Error al convertir la cadena base64 a Blob:', error);
        return null;
      }
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
  
  
    const [modalData, setModalData] = useState({
      numeroArchivo: '',
      date:'',
      nombreEstudiante: '',
      numeroControl: '',
      carrera: '',
      instituto:'',
      dependencia:'',
      asignado_a:'',
      periodo_inicio: '',
      periodo_termino: '',
      horarioInicio: '',
      horarioFin:'',
      proyecto: '',
      horas: '',
      actividadesDesarrollar: [''],
    });

    const getDependenciaNombre = (valor) => {
      switch(valor) {
        case '1':
          return 'Procuraduría General de Justicia';
        case '2':
          return 'Secretaría del Despacho de la Persona Titular del Poder Ejecutivo del Estado';
        case '3':
          return 'Oficialía Mayor';
        case '4':
          return 'Secretaría de Turismo';
        case '5':
          return 'Secretaría de Movilidad y Transporte';
        case '6':
          return 'Unidad de Planeación y Prospectiva';
        case '7':
          return 'Comisión Estatal para el Desarrollo Sostenible de los Pueblos Indígenas';
        case '8':
          return 'Secretaría del Bienestar e Inclusión Social';
        case '9':
          return 'Secretaría del Medio Ambiente y Recursos Naturales';
        case '10':
          return 'Comisión Estatal de Biodiversidad de Hidalgo';
        case '11':
          return 'Secretaría de Hacienda';
        case '12':
          return 'Comisión Ejecutiva de Atención a Víctimas del Estado de Hidalgo';
        case '13':
          return 'Consejo de Ciencia, Tecnología e Innovación de Hidalgo';
        case '14':
          return 'Secretaría de Gobierno (ciudad de las mujeres)';
        case '15':
          return 'Secretaría de Gobierno (Centro de Justicia para Mujeres del Estado de Hidalgo)';
        case '16':
          return 'SECRETARIA DE GOBIERNO INDEMUN';
        case '17':
          return 'Secretaría de Gobierno (Dir. Gral de Archivo de Notarías)';
        case '18':
          return 'Secretaría de Gobierno (Coordinación General de Comunicación gubernamental)';
        case '19':
          return 'Secretaría de Gobierno (Apoyo a la Defensoría)';
        case '20':
          return 'Secretaría de Desarrollo Económico';
        case '21':
          return 'Secretaría de Contraloría';
        default:
          return '';
      }
    }

    const getAsignadoNombre = (valor) => {
      switch(valor) {
        case '40':
          return 'Dirección General de Recursos Materiales y Servicios';
        case '41':
          return 'Dirección General de Administración de la Oficialía Mayor';
        case '42':
          return 'Dirección General de Organización y Rediseño Institucional';
        case '43':
          return 'Dirección General de Recursos Humanos';
        case '44':
          return 'Archivo General del Estado';
        
        default:
          return '';
      }
    }


    const getProyectoNombre = (valor) => {
      switch(valor) {
        case '200':
          return 'Abatimiento de Rezago ';
        case '201':
          return 'Revisión de los Recursos Materiales, Humanos y Financieros de la PGJEH ';
        case '202':
          return 'Integración de los Expedientes de Presunta Responsabilidad ';
        case '203':
          return 'Investigaciones Administrativas vs Servidores Públicos de la PGJEH ';
        case '204':
          return 'Servicio Social ';
        case '205':
          return 'Actividades que Realiza Ministerio Público Adscrito a Juzgado Penal Sistema Tradicional ';
        case '206':
          return 'Actividades Administrativas ';
        case '207':
          return 'Auxiliar en el Instituto de Formación Profesional de la Procuraduría';
        
    
          default:
          return '';
      }
    }
    
   
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

   
                                                    Carta de Aceptación de Servicio Social


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
   yPosition += 10;                                                                                          
 const encabezado=`                                                                                            
 Dr. Jesús Ibarra Zamudio
 Director de Servicio Social, Practicas Profesionales y
 Vinculción Laboral de la Universidad Autónoma del 
 Estado de Hidalgo
 
 P r e s e n t e`;

  // Dividir el texto en líneas de un ancho específico (ancho de la página - márgenes)
  const lines = pdf.splitTextToSize(encabezado, pdf.internal.pageSize.width - 2 * xPosition);
  // Agregar las líneas al PDF
  pdf.text(lines, xPosition, yPosition);


  pdf.setFont('Montserrat-Regular');
  pdf.setFontSize(11);
  yPosition += 30;
 const cuerpo =`
 Por medio del presente informo a usted que el C.${modalData.nombreEstudiante}, con número de cuenta: ${modalData.numeroControl}, estudiante de la Licenciatura en ${modalData.carrera}, del ${modalData.instituto}, ha sido aceptado/a, para realizar su Servicio Social en la ${getDependenciaNombre(modalData.dependencia)}, siendo asignado/a en la ${getAsignadoNombre(modalData.asignado_a)} cubriendo el periodo del ${format(new Date(modalData.periodo_inicio), 'dd \'de\' MMMM \'de\' yyyy', { locale: esLocale })} al ${format(new Date(modalData.periodo_termino), 'dd \'de\' MMMM \'de\' yyyy', { locale: esLocale })}, con un horario de ${modalData.horarioInicio} a ${modalData.horarioFin} hrs., bajo el Proyecto: “${getProyectoNombre(modalData.proyecto)}”, cubriendo un total de ${modalData.horas} horas, realizando las siguientes actividades:
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
pdf.addImage(datosFirma, 'PNG', 10, 215, 50, 20);

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
  
  const cadena = `${datosFirmaE}`;

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
      date:'',
      instituto:'',
      nombreEstudiante: '',
      numeroControl: '',
      carrera: '',
      dependencia:'',
      asignado_a:'',
      periodo: '',
      horario: '',
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
      date:'',
      instituto:'',
      nombreEstudiante: '',
      numeroControl: '',
      carrera: '',
      dependencia:'',
      asignado_a:'',
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
              <StyledTh>Aceptar Solicitud</StyledTh>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <StyledTr key={item.id} even={index % 2 === 0}>
                <StyledTd>{item.nombre}</StyledTd>
                <StyledTd>{"escuela"}</StyledTd>
                <StyledTd>{item.tipo}</StyledTd>
                <StyledTd>
                <button
                        onClick={() => handleDownloadPDF(data.pdf, 'aceptacion.pdf')}>
                        PDF
                      </button>
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

        <Form.Group controlId="instituto" className="mb-3">
          <Form.Label>Instituto</Form.Label>
          <Form.Control
            type="text"
            value={modalData.instituto}
            onChange={(e) => handleChange('instituto', e.target.value)}
          />
        </Form.Group>




        <Form.Group controlId="dependencia" className="mb-3">
        <Form.Label>Dependencia</Form.Label>
        <Form.Select
          value={modalData.dependencia}
          onChange={(e) => handleChange('dependencia', e.target.value)}
        >
          <option value="">Selecciona una dependencia</option>
          <option value="1">Procuraduría General de Justicia</option>
          <option value="2">Secretaría del Despacho de la Persona Titular del Poder Ejecutivo del Estado</option>
          <option value="3">Oficialía Mayor</option>
          <option value="4">Secretaría de Turismo</option>
          <option value="5">Secretaría de Movilidad y Transporte</option>
          <option value="6">Unidad de Planeación y Prospectiva</option>
          <option value="7">Comisión Estatal para el Desarrollo Sostenible de los Pueblos Indígenas</option>
          <option value="8">Secretaría del Bienestar e Inclusión Social</option>
          <option value="9">Secretaría del Medio Ambiente y Recursos Naturales</option>
          <option value="10">Comisión Estatal de Biodiversidad de Hidalgo</option>
          <option value="11">Secretaría de Hacienda</option>
          <option value="12">Comisión Ejecutiva de Atención a Víctimas del Estado de Hidalgo</option>
          <option value="13">Consejo de Ciencia, Tecnología e Innovación de Hidalgo</option>
          <option value="14">Secretaría de Gobierno (ciudad de las mujeres)</option>
          <option value="15">Secretaría de Gobierno (Centro de Justicia para Mujeres del Estado de Hidalgo)</option>
          <option value="16">SECRETARIA DE GOBIERNO INDEMUN</option>
          <option value="17">Secretaría de Gobierno (Dir. Gral de Archivo de Notarías)</option>
          <option value="18">Secretaría de Gobierno (Coordinación General de Comunicación gubernamental)</option>
          <option value="19">Secretaría de Gobierno (Apoyo a la Defensoría)</option>
          <option value="20">Secretaría de Desarrollo Económico</option>
          <option value="21">Secretaría de Contraloría</option>
        
        </Form.Select>
      </Form.Group>

      {modalData.dependencia && (
        <Form.Group controlId="asignado_a" className="mb-3">
          <Form.Label>Asignado a:</Form.Label>
          <Form.Select
            value={modalData.asignado_a}
            onChange={(e) => handleChange('asignado_a', e.target.value)}
          >
            
            {modalData.dependencia === '3' && (
              <>
                <option value="">Selecciona una opción</option>
                <option value="40">Dirección General de Recursos Materiales y Servicios</option>
                <option value="41">Dirección General de Administración de la Oficialía Mayor</option>
                <option value="42">Dirección General de Organización y Rediseño Institucional</option>
                <option value="43">Dirección General de Recursos Humanos</option>
                <option value="44">Archivo General del Estado</option>
                {/* Agrega más opciones según sea necesario */}
              </>
            )}
            {modalData.dependencia === 'Dependencia 2' && (
              <>
                <option value="Asignado A">Asignado A</option>
                <option value="Asignado B">Asignado B</option>
                {/* Agrega más opciones según sea necesario */}
              </>
            )}
          </Form.Select>
        </Form.Group>
      )}


      
<Form.Group controlId="proyecto" className="mb-3">
        <Form.Label>Proyecto</Form.Label>
        <Form.Select
          value={modalData.proyecto}
          onChange={(e) => handleChange('proyecto', e.target.value)}
        >
          <option value="">Selecciona un proyecto</option>
          <option value="200">Abatimiento de Rezago</option>
          <option value="201">Revisión de los Recursos Materiales, Humanos y Financieros de la PGJEH</option>
          <option value="202">Integración de los Expedientes de Presunta Responsabilidad</option>
          <option value="203">Investigaciones Administrativas vs Servidores Públicos de la PGJEH</option>
          <option value="204">Servicio Social</option>
          <option value="205">Actividades que Realiza Ministerio Público Adscrito a Juzgado Penal Sistema Tradicional</option>
          <option value="206">Actividades Administrativas</option>
          <option value="207">Auxiliar en el Instituto de Formación Profesional de la Procuraduría</option>
          
        
        </Form.Select>
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
          <Form.Label>Fecha de Termino</Form.Label>
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
