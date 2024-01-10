import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Button from 'react-bootstrap/Button';



const TableWrapper = styled.div`
  margin: 20px auto;
  width: 80%;
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
  padding: 15px;
  text-align: center;
  font-size: 18px;
`;

const StyledTd = styled.td`
  padding: 15px;
  text-align: center;
  font-size: 14px;
  border-bottom: 2px solid #ddd;
  background-color: ${(props) => (props.isEven ? '#f9f9f9' : 'white')};
`;

const LiberacionButton = styled.button`
  background-color: #9E2343;
  color: white;
  padding: 5px;
  
  border: none;
  cursor: pointer;
  border-radius: 5px;


  &:hover {
    background-color: #7a1c33;
  }
`;

const data = [
  {
    escuela: 'UAEH',
    institucion: 'Escuela Superior de Actopan',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Escuela Superior de Apan',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Escuela Superior de Atotonilco de Tula',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Escuela Superior de Ciudad Sahagún',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Escuela Superior de Huejutla',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Escuela Superior de Tepeji del Río',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Escuela Superior de Tlahuelilpan',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Escuela Superior de Tizayuca',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Escuela Superior de Zimapán',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Instituto de Artes',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Instituto de Ciencias Básicas e Ingeniería',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Instituto de Ciencias Agropecuarias',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Instituto de Ciencias de la Salud',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Instituto de Ciencias Económico Administrativas',
    edicion: 'Editar',
  },
  {
    escuela: 'UAEH',
    institucion: 'Instituto de Ciencias Sociales y Humanidades',
    edicion: 'Editar',
  },
  
  {
    "escuela": "OTRAS",
    "institucion": "Universidad Nacional Autónoma de México (UNAM)",
    "edicion": "Editar"
  },
  {
    "escuela": "OTRAS",
    "institucion": "Instituto Tecnológico y de Estudios Superiores de Monterrey (ITESM)",
    "edicion": "Editar"
  },
  {
    "escuela": "OTRAS",
    "institucion": "Universidad Autónoma Metropolitana (UAM)",
    "edicion": "Editar"
  },
  {
    "escuela": "OTRAS",
    "institucion": "Universidad Iberoamericana (UIA)",
    "edicion": "Editar"
  },
  {
    "escuela": "OTRAS",
    "institucion": "Benemérita Universidad Autónoma de Puebla (BUAP)",
    "edicion": "Editar"
  },
  {
    "escuela": "OTRAS",
    "institucion": "Universidad Autónoma de Nuevo León (UANL)",
    "edicion": "Editar"
  },
  {
    "escuela": "OTRAS",
    "institucion": "Universidad de Guadalajara (UDG)",
    "edicion": "Editar"
  },
  {
    "escuela": "OTRAS",
    "institucion": "Universidad Autónoma del Estado de México (UAEM)",
    "edicion": "Editar"
  },
  {
    "escuela": "OTRAS",
    "institucion": "Instituto Politécnico Nacional (IPN)",
    "edicion": "Editar"
  },
  {
    "escuela": "OTRAS",
    "institucion": "Universidad Autónoma de Querétaro (UAQ)",
    "edicion": "Editar"
  }
];

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

const TablaEscuelas = ({ title }) => {
  const [selectedOption, setSelectedOption] = useState(''); // Estado para la opción seleccionada
  const [selectedRow, setSelectedRow] = useState(null); // Estado para almacenar la fila seleccionada

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleShow = (index) => {
    setSelectedRow(index);
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

 
  const [editedData, setEditedData] = useState({
    escuela: '',
    institucion: '',
    // Agrega más campos según tus necesidades
  });


  const handleSend = () => {
    if (selectedRow !== null) {
      // Aplica los cambios de edición a la fila seleccionada
      const newData = [...data];
      newData[selectedRow] = { ...data[selectedRow], ...editedData };
      // Aquí puedes realizar cualquier lógica de actualización o enviar los datos editados al servidor
  
      // Muestra la alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Edición exitosa',
        text: 'La información ha sido editada correctamente.',
      });
  
      // Cierra la ventana emergente
      handleClose();
    }
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

  const [formChanged, setFormChanged] = useState(false);

const handleEditChange = (e, field) => {
  setEditedData((prevData) => ({
    ...prevData,
    [field]: e.target.value,
  }));
  setFormChanged(true); // Indica que se han realizado cambios en el formulario
};

const handleClose = () => {
  setFileSelected(false);
  setFormChanged(false); // Restablece el estado cuando se cierra el modal
  setShowModal(false);
};

  return (
    <div>
      <TableWrapper>
        <h2>{title}</h2>
        {/* Agregar el select con las opciones */}
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Todas las instituciones</option>
          <option value="UAEH">UAEH</option>
          <option value="OTRAS">Otra Institución</option>
        </select>

        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Escuela</StyledTh>
              <StyledTh>Institución</StyledTh>
              <StyledTh>Editar</StyledTh>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => !selectedOption || item.escuela === selectedOption) // Filtrar según la opción seleccionada
              .map((item, index) => (
                <tr key={index}>
                  <StyledTd isEven={index % 2 !== 0}>{item.escuela}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>{item.institucion}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>
                    <LiberacionButton variant="primary" onClick={() => handleShow(index)}>
                      {item.edicion}
                    </LiberacionButton>
                  </StyledTd>
                </tr>
              ))}
          </tbody>
        </StyledTable>
      </TableWrapper>

      <CenteredModal show={showModal} onHide={handleClose}>
        <ModalContent>
          <Modal.Header closeButton>
            <Modal.Title>Editar Información</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  {selectedRow !== null && (
    <Form>
      <Form.Group controlId="formEscuela">
        <Form.Label>Escuela:</Form.Label>
        <Form.Control
  type="text"
  value={editedData.escuela}
  onChange={(e) => handleEditChange(e, 'escuela')}
/>
      </Form.Group>

      <Form.Group controlId="formInstitucion">
        <Form.Label>Institución:</Form.Label>
        <Form.Control
          type="text"
          value={editedData.institucion}
          onChange={(e) => handleEditChange(e, 'institucion')}
        />
      </Form.Group>

      {/* Agregar más campos según tus necesidades */}
    </Form>
  )}
</Modal.Body>
          <Modal.Footer>
          <SendButton variant="primary" onClick={handleSend} disabled={!formChanged}>
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
};

export default TablaEscuelas;

