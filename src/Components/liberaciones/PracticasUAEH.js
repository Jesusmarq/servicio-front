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



function PracticasUAEH ({ title }) {

  //  inicialisacion de los estados de tabla Y DEMAS COMO QR DATOS FIRMA ETC ---------
  const [data, setData] = useState([]);//tabla
 
  const [datosQr, setDatosQr] = useState('');
  const [datosFirma, setDatosFirma] = useState('');
  const [datosFirmaE, setDatosFirmaE] =useState('');
  const[numChange,setNumChange] = useState(0)

  console.log(localStorage.getItem('dataUser'))
  var dataUser = localStorage.getItem('dataUser')
  var parsedDataUser = JSON.parse(dataUser);
  
  // Acceder a la propiedad 'id'
  console.log(parsedDataUser.id);

  //peticion para el qr  y los demas datos
  const fetchData = async (solicitudId) => { // Aquí agregamos solicitudId como parámetro
    console.log(solicitudId)
    try {
      const response = await fetch(`http://127.0.0.1:5000/generarQr?solicitud=${solicitudId}`); // Utilizamos solicitudId
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

  //peticion datos de la tabla  ------------------
  const fetchDataTabla = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/consultaLiberaciones?filtro=pendiente&limite=1005&alumno=5&firma=XEXX010101HNEXXXQ5_2Vzc4mMO6sr');

        if (!response.ok) {
            throw new Error('Error al obtener las solicitudes');
        }

        const responseData = await response.json();
        console.log(responseData);

        // Filtrar responseData.solicitudes para obtener solo las de tipo "servicio social" y universidad "UAEH"
        const solicitudesFiltradas = responseData.solicitudes.filter(solicitud => solicitud.tipo === 'Prácticas Profesionales' && solicitud.universidad === 'UAEH');

        // Asegúrate de que solicitudesFiltradas es un array antes de asignarlo a data
        if (Array.isArray(solicitudesFiltradas)) {
            setData(solicitudesFiltradas);
        } else {
            throw new Error('La propiedad solicitudes_json de la respuesta de la API no es un array');
        }
    } catch (error) {
        console.error(error);
    }
};
  
//------------------------   mada hacer los los cambios -------------
  useEffect(() => {
      //fetchData()
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
//-----------------para que se muestre en la tabla------------------------
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
  
  ////---------------para  almacenar los datos del modal-----------------
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
      ver_carta:'',
      actividadesDesarrollar: [''],
    });

  
   
    const handleChange = (field, value) => {
      // Actualizar el campo de almacenamiento
      setModalData((prevData) => ({ ...prevData, [field]: value }));
      // Actualizar el campo de visualización (puedes aplicar el formato aquí si es necesario)
     
    };
      //para crear actividades modAL
    const handleActividadesChange = (index, value) => {
      const newActividades = [...modalData.actividadesDesarrollar];
      newActividades[index] = value;
      setModalData({ ...modalData, actividadesDesarrollar: newActividades });
    };
   //para crear actividades modAL
    const addActividad = () => {
      setModalData({
        ...modalData,
        actividadesDesarrollar: [...modalData.actividadesDesarrollar, ''],
      });
    };

  // _____-------------------------------------FUNCION PARA CREAR PDF ******************************

  const generatePDF = async () => {

    const pdf = new jsPDF();

    console.log(selectedSecretaria)
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

   
                                                    Carta de Aceptación de Prácticas Profesionales


                                                                                                                                                     A-SS-00${datosSolicitud}`;
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
 Por medio del presente informo a usted que el C.${datosAlumno}, con número de cuenta: ${datosMatricula}, estudiante de la Licenciatura en ${datosCarrera}, del ${datosPlantel}, ha sido aceptado/a, para realizar sus Prácticas Profesionales en la ${selectedSecretaria}, siendo asignado/a en la ${selectedDependencia} cubriendo el periodo del ${format(new Date(modalData.periodo_inicio), 'dd \'de\' MMMM \'de\' yyyy', { locale: esLocale })} al ${format(new Date(modalData.periodo_termino), 'dd \'de\' MMMM \'de\' yyyy', { locale: esLocale })}, con un horario de ${modalData.horarioInicio} a ${modalData.horarioFin} hrs., bajo el Proyecto: ${selectedProyecto}, cubriendo un total de ${modalData.horas} horas, realizando las siguientes actividades:
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
  console.log(numChange)
    // Agregar el JSON al FormData
    const jsonData = {"solicitud": numChange,"estatus":"Aceptado","validador":parsedDataUser.id, "ver_pdf":modalData.ver_carta,}; 
console.log(jsonData)
    formData.append('JSON', JSON.stringify(jsonData));
  
    console.log('FormData antes de la solicitud:', formData);
  
    // Realizar la solicitud Axios
    axios
    .patch(`http://127.0.0.1:5000/AceptarRechazarLiberacion`, formData)
    .then((response) => {
  fetchDataTabla()

  Swal.fire({
    icon: 'success',
    title: 'Carta enviada',
    text: 'Tu carta de presentación ha sido enviada correctamente.',
    allowOutsideClick: false,
    confirmButtonText: "Aceptar"
  }).then((result) => {
    console.log(result)
    if (result.isConfirmed) {
        console.log(result)
        handleClose()
    }
});
      
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
  
  const sendRequest22 = async() => {
      // Crear FormData y agregar el PDF
    
     
      const formData = new FormData();
    
    console.log(numChange)
      // Agregar el JSON al FormData
      const jsonData = {"solicitud": numChange,"estatus":"Rechazado","validador":parsedDataUser.id}; 
  console.log(jsonData)
      formData.append('JSON', JSON.stringify(jsonData));
    
      console.log('FormData antes de la solicitud:', formData);
    
      // Realizar la solicitud Axios
      axios
      .patch(`http://127.0.0.1:5000/AceptarRechazarLiberacion`, formData)
      .then((response) => {
    fetchDataTabla()
  
    Swal.fire({
      icon: 'success',
      title: 'Solicitud Rechazada',
      text: 'La solicitud ha sido rechazada correctamente.',
      allowOutsideClick: false,
      confirmButtonText: "Aceptar"
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
          console.log(result)
          handleClose()
      }
  });
        
      })
      .catch((error) => {
        // Maneja errores de solicitud
        console.error("Error al enviar el formulario:", error);
        Swal.fire({
          icon: "error",
          title: "Error al rechazar la solicitud ",
          text: "Hubo un problema al rechazar la solicitud.",
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
      prevData.map((item, index) =>
        index === id ? { ...item, validar: !item.validar } : item
      )
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
    // Implementa la lógica de valcidación del formulario
    return true; // Devuelve true si el formulario es válido, o false si no lo es
  };
  


  //{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{----------traer dependencias----------}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
  const [secretarias, setSecretarias] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [selectedSecretaria, setSelectedSecretaria] = useState('');
  const [selectedDependencia, setSelectedDependencia] = useState('');
  const [datos, setDatos] = useState([]);

console.log('Secretarias:', secretarias);
console.log('Dependencias:', dependencias);
console.log('Selected Secretaria:', selectedSecretaria);
console.log('Selected Dependencia:', selectedDependencia);

  const traerDatos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/dependencias');
      const datos = await response.json();
      console.log(datos);

      // Filtrar las secretarías únicas
      const secretariasUnicas = [...new Set(datos.map(entry => entry.secretaria))];

      setSecretarias(secretariasUnicas);
      setDatos(datos); // Guardar los datos en el estado local
      setDependencias([]);
      setSelectedSecretaria('');
      
      setSelectedDependencia('');
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    traerDatos();
    fetchDatosModal();
  }, []);

  const handleSecretariaChange = (e) => {
    const selectedSec = e.target.value;
    console.log(selectedSec)
    setSelectedSecretaria(selectedSec);

    // Filtrar las dependencias correspondientes a la secretaría seleccionada
    const dependenciasSecretaria = secretarias.find(sec => sec === selectedSec)
      ? datos.filter(entry => entry.secretaria === selectedSec).map(entry => entry.dependencia)
      : [];

    setDependencias(dependenciasSecretaria);
    setSelectedDependencia('');
  };

    //{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{----------Datos MOdal----------}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
    const [datosAlumno, setDatosAlumno] = useState('');
    const [datosCarrera, setDatosCarrera] = useState('');
    const [datosMatricula, setDatosMatricula] = useState('');
    const [datosPlantel, setDatosPlantel] = useState('');
    const [datosSolicitud, setDatosSolicitud] = useState('');

    console.log('Alumno:', datosAlumno);
    console.log('Carrera:', datosCarrera);
    console.log('Matricula:', datosMatricula);
    console.log('Plantel:', datosPlantel);
    console.log('Solicitud:', datosSolicitud);
   
    
    // Función para realizar la solicitud y obtener los datos del nuevo endpoint
    const fetchDatosModal = async (solicitudId) => {
      console.log(solicitudId)
      try {
        const response = await fetch(`http://127.0.0.1:5000/datosAceptacion?solicitud=${solicitudId}`);
        const data = await response.json();
        console.log(data);
    
        // Verifica si la respuesta contiene las propiedades necesarias
        if (data.alumno && data.carrera && data.matricula && data.plantel && data.solicitud && data.universidad) {
          // Establece los datos en el estado
          setDatosAlumno(data.alumno);
          setDatosCarrera(data.carrera);
          setDatosMatricula(data.matricula);
          setDatosPlantel(data.plantel);
          setDatosSolicitud(data.solicitud);
        } else {
          console.error('La respuesta del API no tiene la estructura esperada:', data);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    
    // Función para manejar el clic del botón
    const sendRequest2 = (solicitudId) => {
      fetchDatosModal(solicitudId); // Llamar a la función fetchDatosModal con el solicitudId como argumento
    };  
    
    //{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{----------traer Proyectos----------}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
    const [proyectos, setProyectos] = useState([]);
    const [selectedProyecto, setSelectedProyecto] = useState('');
    const [selectedProyectoId, setSelectedProyectoId] = useState(null); // Nueva constante para almacenar la ID del proyecto seleccionado
    const [proyectosData, setProyectosData] = useState([]);
  
    console.log('Proyectos:', proyectos);
    console.log('Selected Proyecto:', selectedProyecto);
    console.log('Selected Proyecto ID:', selectedProyectoId); // Agregamos un log para la ID del proyecto
  
    const traerDatos2 = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/consultaProyectos');
        const data = await response.json();
        console.log(data);
  
        // Obtener proyectos únicos
        const proyectosUnicos = [...new Set(data.map(entry => entry.proyecto))];
  
        setProyectos(proyectosUnicos);
        setProyectosData(data);
        setSelectedProyecto('');
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
  
    useEffect(() => {
      traerDatos2();
    }, []);
  
    const handleProyectoChange = (e) => {
      const selectedProj = e.target.value;
      console.log(selectedProj);
  
      // Buscar la ID del proyecto seleccionado
      const proyectoSeleccionado = proyectosData.find(entry => entry.proyecto === selectedProj);
      if (proyectoSeleccionado) {
        setSelectedProyectoId(proyectoSeleccionado.id);
      }
  
      setSelectedProyecto(selectedProj);
    };



  return (
    <div>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
            <StyledTh>ID</StyledTh>
              <StyledTh>Nombre</StyledTh>
              <StyledTh>Escuela</StyledTh>
              <StyledTh>Tipo de Solicitud</StyledTh>
             
              <StyledTh>Fecha</StyledTh>
              <StyledTh>Cambiar Estatus</StyledTh>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <StyledTr key={item.solicitud_id} even={index % 2 === 0}>
                <StyledTd>{item.solicitud_id}</StyledTd>
                <StyledTd>{item.nombre}</StyledTd>
                <StyledTd>{"UAEH"}</StyledTd>
                <StyledTd>{item.tipo}</StyledTd>
               
                <StyledTd>{item.fechaSolicitud}</StyledTd>
                <StyledTd>
                  <StyledButton
                    variant="primary"
                    onClick={() => {
                      handleShow();
                      setNumChange(item.solicitud_id)
                      handleValidation(item.id);
                      setSendButtonClicked(false);
                      fetchDatosModal(item.solicitud_id);
                        fetchData(item.solicitud_id);
                    }}
                    validar={item.validar}
                    disabled={item.validar || sendButtonClicked}
                  >
                   {item.validar ? 'Revisado' : 'Revisar'}
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
      

        <Form.Group controlId="date" className="mb-3">
          <Form.Label>Fecha de la carta</Form.Label>
          <Form.Control
            type="date"
            value={modalData.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="secretaria" className="mb-3">
        <Form.Label>Secretaría</Form.Label>
        <Form.Select
          value={selectedSecretaria}
          onChange={handleSecretariaChange}
        >
          <option value="">Selecciona una secretaría</option>
          {secretarias.map(secretaria => (
            <option key={secretaria} value={secretaria}>{secretaria}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {dependencias.length > 0 && (
        <Form.Group controlId="dependencia" className="mb-3">
          <Form.Label>Dependencia</Form.Label>
          <Form.Select
            value={selectedDependencia}
            onChange={(e) => setSelectedDependencia(e.target.value)}
          >
            <option value="">Selecciona una dependencia</option>
            {dependencias.map(dependencia => (
              <option key={dependencia} value={dependencia}>{dependencia}</option>
            ))}
          </Form.Select>
        </Form.Group>
      )}

<Form.Group controlId="proyecto" className="mb-3">
      <Form.Label>Proyecto</Form.Label>
      <Form.Select
        value={selectedProyecto}
        onChange={handleProyectoChange}
      >
        <option value="">Selecciona un proyecto</option>
        {proyectos.map(proyecto => (
          <option key={proyecto} value={proyecto}>{proyecto}</option>
        ))}
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
  {[...Array(3)].map((_, index) => (
    <div key={index}>
      <Form.Control
        type="text"
        value={modalData.actividadesDesarrollar[index] || ''}
        onChange={(e) => handleActividadesChange(index, e.target.value)}
      />
    </div>
  ))}
</Form.Group>

<Form.Group controlId="ver_carta" className="mb-3 d-flex flex-column align-items-center">
  <Form.Label className="mb-2">El alumno puede ver su carta</Form.Label>
  <Form.Check
    type="switch"
    id="custom-switch"
    label=""
    checked={modalData.ver_carta}
    onChange={(e) => handleChange('ver_carta', e.target.checked)}
    className="custom-switch-lg"
  />
</Form.Group>
      </Form>
     

           </Modal.Body>
          <Modal.Footer>
              <SendButton variant="primary" onClick={() => {
                  sendRequest();
           
                }}>
                  Enviar
              </SendButton>

              <CloseButton variant="primary" onClick={() => {
                  sendRequest22();
           
                }}>
              Rechazar Liberación
            </CloseButton>
          </Modal.Footer>
        </ModalContent>
      </CenteredModal>
    </div>
  );
}
export default PracticasUAEH;
