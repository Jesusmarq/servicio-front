import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import { Helmet } from 'react-helmet';

// Importa la imagen (asegúrate de tener la ruta correcta)
import encabezadoImage from '../PDFS/image001.jpg';


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


  function ServicioSocialUAEH2({ title }) {
    const [data, setData] = useState([
      { id: 1, nombre: 'Víctor Daniel Acosta', escuela:'UAEH', tipoSolicitud: 'Servicio Social', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
      { id: 2, nombre: 'Jesús Adolfo Márquez', escuela:'UAEH', tipoSolicitud: 'Servicio Social', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '15/01/2023', validar: false },
      { id: 3, nombre: 'Julián Trejo Melchor', escuela:'UAEH', tipoSolicitud: 'Servicio Social', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '10/02/2023', validar: true },
      { id: 4, nombre: 'Ana María López', escuela:'UAEH', tipoSolicitud: 'Servicio Social', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
      { id: 5, nombre: 'Miguel Ángel Ramírez', escuela:'UAEH', tipoSolicitud: 'Servicio Social', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
      { id: 6, nombre: 'Sofía Rodríguez', escuela:'UAEH', tipoSolicitud: 'Servicio Social', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
      { id: 7, nombre: 'Carlos Alberto Gómez', escuela:'UAEH', tipoSolicitud: 'Servicio Social', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
      { id: 8, nombre: 'Luisa Fernández', escuela:'UAEH', tipoSolicitud: 'Servicio Social', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
      { id: 9, nombre: 'María José Díaz', escuela:'UAEH', tipoSolicitud: 'Servicio Social', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false },
      { id: 10, nombre: 'Pedro López Martínez', escuela:'UAEH', tipoSolicitud: 'Servicio Social', cartaPresentacion: 'Carta-de-presentacion.pdf', fecha: '01/01/2023', validar: false }
      // ... más datos
    ]);

  //codigo generar pdf------------------------------------------------------------
  const [modalData, setModalData] = useState({
    numeroArchivo: '',
    fecha:'',
    instituto:'',
    nombreEstudiante: '',
    numeroControl: '',
    carrera: '',
    dependencia: '',
    periodo: '',
    periodo2:'',
    horario: '',
    direccionGeneral: '',
    programa: '',
    clave: '',
    horas: '',
    actividadesDesarrollar: [''],
  });

  const handleChange = (field, value) => {
    setModalData({ ...modalData, [field]: value });
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

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Añadir la imagen de encabezado
    pdf.addImage(encabezadoImage, 'PNG', 0, -15, 200, 300); // Ajusta las coordenadas y el tamaño según tus necesidades

    // Establecer la fuente Montserrat y el tamaño de letra
  pdf.setFont('Montserrat');
  pdf.setFontSize(12); // Ajusta el tamaño según tus preferencias

    const xPosition = 10;
    let yPosition = 20;

    // Construir el texto con el formato deseado
    const textoPDF = `



    
                                                     Carta de Terminación de Servicio Social


                                                                                                                                                        ${modalData.numeroArchivo}
                                                                                              Pachuca de Soto,Hgo., a ${modalData.fecha}


                                                                                              
    Dr. Jesús Ibarra Zamudio
    Director de Servicio Social, Practicas Profesionales y
    Vinculción Laboral de la Universidad Autónoma del 
    Estado de Hidalgo
    P r e s e n t e

    Por medio del presente informo a usted que el ${modalData.nombreEstudiante}, con número de 
    cuenta:${modalData.numeroControl}, estudiante de la ${modalData.carrera}, del 
    ${modalData.instituto} ha concluido su Servicio Social en la 
    ${modalData.dependencia}, cubriendo el periodo del ${modalData.periodo} al ${modalData.periodo2},
    de lunes a viernes en un horario de ${modalData.horario} hrs., bajo el Proyecto: 
    “${modalData.programa}” cubriendo un total de ${modalData.horas} horas, realizando las siguientes 
    actividades:
    `;

    

    // Agregar el texto al PDF
    pdf.text(textoPDF, xPosition, yPosition);

          yPosition += 130;
          modalData.actividadesDesarrollar.forEach((actividad, index) => {
          yPosition += 10;
          pdf.text(`${index + 1}. ${actividad}`, xPosition, yPosition);
    });

    // Agregar el resto del texto del pie de página
    const piePagina = `
    Sin otro particular por el momento, le envío un cordial saludo.
    A t e n t a m e n t e
    
    M.G.P. Odette Assad Díaz
    Directora de Profesionalización
    de la Oficialía Mayor








                                                                         Dirección de Profesionalización, Av. Madero 100-A, 1er Piso
                                                                                                            Col. Centro, Pachuca, Hgo., C.P. 42000
                                                                                                             Tel.; 01(771)7176000 ext. 2095 y 6836
                                                                                                                                         www.hidalgo.gob.mx
    `;

    yPosition += 20;
    pdf.text(piePagina, xPosition, yPosition);

    // Guardar o mostrar el PDF (ajusta según tus necesidades)
    pdf.save('formulario.pdf');
  };
  //************************************************************************************************************************************/

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
      fecha:'',
      instituto:'',
      nombreEstudiante: '',
      numeroControl: '',
      carrera: '',
      dependencia: '',
      periodo: '',
      periodo2:'',
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
      fecha:'',
      instituto:'',
      nombreEstudiante: '',
      numeroControl: '',
      carrera: '',
      dependencia: '',
      periodo: '',
      periodo2:'',
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
              <StyledTh>Tipo de Solicitud</StyledTh>
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
                <StyledTd>{item.escuela}</StyledTd>
                <StyledTd>{item.tipoSolicitud}</StyledTd>
                <StyledTd>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSelectedPdf(item.cartaPresentacion);
                      openPdfInNewTab(require('./12123.pdf'));
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

        <Form.Group controlId="fecha" className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="text"
            value={modalData.fecha}
            onChange={(e) => handleChange('fecha', e.target.value)}
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

        <Form.Group controlId="instituto" className="mb-3">
          <Form.Label>Instituto </Form.Label>
          <Form.Control
            type="text"
            value={modalData.instituto}
            onChange={(e) => handleChange('instituto', e.target.value)}
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

        <Form.Group controlId="dependencia" className="mb-3">
          <Form.Label>Dependencia</Form.Label>
          <Form.Control
            type="text"
            value={modalData.dependencia}
            onChange={(e) => handleChange('dependencia', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="periodo" className="mb-3">
          <Form.Label>Periodo de inicio</Form.Label>
          <Form.Control
            type="text"
            value={modalData.periodo}
            onChange={(e) => handleChange('periodo', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="periodo2" className="mb-3">
          <Form.Label>Periodo de termino</Form.Label>
          <Form.Control
            type="text"
            value={modalData.periodo2}
            onChange={(e) => handleChange('periodo2', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="horario" className="mb-3">
          <Form.Label>Horario</Form.Label>
          <Form.Control
            type="text"
            value={modalData.horario}
            onChange={(e) => handleChange('horario', e.target.value)}
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

        

        <Form.Group controlId="horas" className="mb-3">
          <Form.Label>Horas</Form.Label>
          <Form.Control
            type="text"
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

      <Button variant="primary" onClick={generatePDF}>
        Generar PDF
      </Button>
          </Modal.Body>
          <Modal.Footer>
            <SendButton variant="primary" onClick={handleSend} disabled={!validateForm()}>
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

export default ServicioSocialUAEH2;