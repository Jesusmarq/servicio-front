import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Button from 'react-bootstrap/Button';
import '../../Styles/responsive.css';



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
  background-color: #BC955B !important;
  color: white !important;
  border-color: #BC955B !important;
  border-radius: 10px;
  margin: 10px;
  height: 40px;
  width: 10vw;
`;
const SendButton = styled(Button)`
  background-color: #BC955B !important;
  color: white !important;
  border-color: #BC955B !important;
  border-radius: 10px;
  margin: 10px;
  height: 40px;
  width: 10vw;
`;

// ... (código anterior)

function Estancia({ title }) {
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

  const [formFields, setFormFields] = useState({
    numeroArchivo: '',
    dirigidaA: '',
    nombreEstudiante: '',
    numeroControl: '',
    carrera: '',
    actividad: '',
    dependencia: '',
    periodo: '',
    horario: '',
    direccionGeneral: '',
    programa: '',
    clave: '',
    horas: '',
    actividadesDesarrollar: [''], // Inicializado con un campo por defecto
  });

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [sendButtonClicked, setSendButtonClicked] = useState(false);

  const openPdfInNewTab = (pdf) => {
    window.open(pdf, '_blank');
  };

  const handleValidation = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, validar: !item.validar } : item
      )
    );
  };

  const [showModal, setShowModal] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [acceptedButtonDisabled, setAcceptedButtonDisabled] = useState(false);

  const handleClose = () => {
    setFileSelected(false);
    setShowModal(false);
  };

  const handleShow = () => setShowModal(true);



  const handleSend = () => {
    // Lógica para enviar la solicitud con los datos del formulario
  
    // Muestra la alerta de éxito
    Swal.fire({
      icon: 'success',
      title: 'Carta de Aceptación enviada',
      text: 'La carta ha sido enviada correctamente.',
    });
  
    // Cierra la ventana emergente y activa el estado de enviar clicado
    handleClose();
    setSendButtonClicked(true);
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
    <div>
     
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Nombre</StyledTh>
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
                      setAcceptedButtonDisabled(false); // Habilita el botón "Aceptar" al hacer clic en un nuevo item
                    }}
                    validar={item.validar}
                    disabled={item.validar || sendButtonClicked || acceptedButtonDisabled}
                  >
                    {item.validar ? 'Aceptado' : 'Aceptar'}
                  </StyledButton>
                </StyledTd>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>

      <CenteredModal show={showModal} onHide={handleClose}>
        <ModalContent>
          <Modal.Header closeButton>
            <Modal.Title>Formulario de Solicitud</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="numeroArchivo" className="mb-3">
                <Form.Label>Número de Archivo</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.numeroArchivo}
                  onChange={(e) => setFormFields({ ...formFields, numeroArchivo: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="dirigidaA" className="mb-3">
                <Form.Label>A quien va dirigida la carta</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.dirigidaA}
                  onChange={(e) => setFormFields({ ...formFields, dirigidaA: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="nombreEstudiante" className="mb-3">
                <Form.Label>Nombre del Estudiante</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.nombreEstudiante}
                  onChange={(e) => setFormFields({ ...formFields, nombreEstudiante: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="numeroControl" className="mb-3">
                <Form.Label>Número de Control</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.numeroControl}
                  onChange={(e) => setFormFields({ ...formFields, numeroControl: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="carrera" className="mb-3">
                <Form.Label>Carrera</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.carrera}
                  onChange={(e) => setFormFields({ ...formFields, carrera: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="actividad" className="mb-3">
                <Form.Label>Actividad a Realizar</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.actividad}
                  onChange={(e) => setFormFields({ ...formFields, actividad: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="dependencia" className="mb-3">
                <Form.Label>Dependencia</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.dependencia}
                  onChange={(e) => setFormFields({ ...formFields, dependencia: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="periodo" className="mb-3">
                <Form.Label>Periodo</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.periodo}
                  onChange={(e) => setFormFields({ ...formFields, periodo: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="horario" className="mb-3">
                <Form.Label>Horario</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.horario}
                  onChange={(e) => setFormFields({ ...formFields, horario: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="direccionGeneral" className="mb-3">
                <Form.Label>Dirección General</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.direccionGeneral}
                  onChange={(e) => setFormFields({ ...formFields, direccionGeneral: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="programa" className="mb-3">
                <Form.Label>Programa</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.programa}
                  onChange={(e) => setFormFields({ ...formFields, programa: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="clave" className="mb-3">
                <Form.Label>Clave</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.clave}
                  onChange={(e) => setFormFields({ ...formFields, clave: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="horas" className="mb-3">
                <Form.Label>Horas</Form.Label>
                <Form.Control
                  type="text"
                  value={formFields.horas}
                  onChange={(e) => setFormFields({ ...formFields, horas: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="actividadesDesarrollar" className="mb-3">
                <Form.Label>Actividades a Desarrollar</Form.Label>
                {formFields.actividadesDesarrollar.map((actividad, index) => (
                  <div key={index}>
                    <Form.Control
                      type="text"
                      value={actividad}
                      onChange={(e) => {
                        const newActividades = [...formFields.actividadesDesarrollar];
                        newActividades[index] = e.target.value;
                        setFormFields({ ...formFields, actividadesDesarrollar: newActividades });
                      }}
                    />
                    {index === formFields.actividadesDesarrollar.length - 1 && (
                      <button
                        type="button"
                        onClick={() => setFormFields({ ...formFields, actividadesDesarrollar: [...formFields.actividadesDesarrollar, ''] })}
                      >
                        Agregar Más
                      </button>
                    )}
                  </div>
                ))}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <SendButton variant="primary" onClick={handleSend} disabled={!fileSelected}>
              Enviar
            </SendButton>
            <CloseButton variant="primary" onClick={handleCancel}>
              Cerrar
            </CloseButton>
          </Modal.Footer>
        </ModalContent>
      </CenteredModal>
    </div>
  );
}

export default Estancia;