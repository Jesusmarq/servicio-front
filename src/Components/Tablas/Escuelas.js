import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Button from 'react-bootstrap/Button';

import fetchWithToken from '../../Pages/fetchConfig';


const TableWrapper = styled.div`
  margin: 20px auto;
  width: 90%;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);

  @media screen and (max-width: 768px) {
    overflow-x: auto !important;
    margin: 0px;
    width: 100%;
  }
  @media screen and (min-width: 768px) and (max-width: 1424px) {
    overflow-x: auto !important;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
background-color: #9E2343;  // por veda #666666
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
  background-color: #9E2343;   // por veda #666666
  color: white;
  padding: 5px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color:#7a1c33;   // por veda #98989a
  }
`;

const CenteredModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 80px;
  border-radius: 15px;
  width: 40vw;
  margin: 0 auto;
  text-align: center;
  color: black;
  font-weight: bold;
  font-size: 20px;
  

  @media screen and (max-width: 768px) {
    padding: 40px;
    width: 80vw;
    border-radius: 10px;
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    padding: 60px;
    width: 60vw;
  }
`;

const CloseButton = styled(Button)`
  background-color: #9E2343 !important;
  color: white !important;
  border-color: #9E2343 !important;
  border-radius: 10px;
  margin: 10px;
  height: 40px;
  width: 10vw;

  @media screen and (max-width: 768px) {
    font-size: clamp(10px, 3vw, 24px);
    padding: 10px;
    width: 60vw;
    border-radius: 5px;
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    padding: 5px;
    width: 40vw;
    border-radius: 5px;
  }
`;

const SendButton = styled(Button)`
  background-color: #9E2343 !important;
  color: white !important;
  border-color: #9E2343 !important;
  border-radius: 10px;
  margin: 10px;
  height: 40px;
  width: 10vw;

  @media screen and (max-width: 768px) {
    font-size: clamp(10px, 3vw, 24px);
    padding: 10px;
    width: 60vw;
    border-radius: 5px;
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    padding: 5px;
    width: 40vw;
    border-radius: 5px;
  }
`;

// Define los estilos para el área de búsqueda y el select
const SearchWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0px;
  
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

const StyledInput = styled.input`
  margin-right: 10%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;

    @media screen and (max-width: 768px) {
    margin-left: 0px;
    margin-right: 0%;

   }

    @media screen and (min-width: 768px) and (max-width: 1424px) {
      margin-left: 0px;
      margin-right: 0%;
    }
`;

const StyledSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white; /* Color de fondo del select */
  color: #333; /* Color del texto */
  margin-right: 20%;

  @media screen and (max-width: 768px) {
    margin-left: 0px;
    margin-right: 0%;
    
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    margin-left: 0px;
    margin-right: 0%;
  }
`;



const StyledAddButton = styled(Button)`
  background-color: #9E2343 !important;  // por veda #666666
  color: white;
  border-radius: 5px;
  border-color: #9E2343 !important;  // por veda #666666
  margin-left: auto;

  &:hover {
    background-color: #bc955b !important; // por veda #98989a
    border-color: #bc955b !important;
  }

  @media screen and (max-width: 768px) {
    margin-left: 0px;
    margin-right: 30%;
    
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    margin-left: 0px;
    margin-right: 65%;
  }

  @media screen and (min-width: 1424px) {
    margin-left: 30%;
    margin-right: 10%;
  }
`;

const TablaEscuelas = ({ title }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRow, setSelectedRow] = useState();
  const [showModal, setShowModal] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [editedData, setEditedData] = useState({
    escuela: '',
    institucion: '',
  });

  const [formChanged, setFormChanged] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [keyForRerender, setKeyForRerender] = useState(0);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddPlantel = async () => {
    try {
      const response = await fetchWithToken('https://dev-apis.hidalgo.gob.mx/serviciosocial/agregarUniversidadPlantel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Puedes agregar otros encabezados si es necesario
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // La solicitud fue exitosa, puedes realizar acciones adicionales si es necesario
        Swal.fire({
          icon: 'success', // Ícono de éxito
        title: 'Plantel Agregado', // Título de la ventana emergente
        text: 'Se agregó de manera correcta un nuevo Plantel.',
        timer: 2000,// Texto de la ventana emergente
        }).then(() => {
          setKeyForRerender(keyForRerender + 1);
        });
        
      } else{
        const data = await response.text();
        //console.log(data)
        Swal.fire({
          icon: "error",
          title: "Error al agregar Dependencia",
          text: `${data}`,
        }).then(() => {
          window.location.reload();
        });
      }
      }
     catch (error) {
      // Manejar errores de red u otros errores
      console.error('Error en la solicitud para agregar nuevo plantel:', error.message);
    }
  };
  
  const handleShow = (index) => {
      const plantelSeleccionado = planteles.find((plantel) => plantel.id_plantel === index);


    setEditedData({
      escuela: plantelSeleccionado ? plantelSeleccionado.universidad : '',
      institucion: plantelSeleccionado ? plantelSeleccionado.plantel : '',
    });
    setSelectedRow(index);
    setShowModal(true);
  };
  

  const handleSend = async () => {
    if (selectedRow !== null) {
      const plantelSeleccionado = planteles.find((plantel) => plantel.id_plantel === selectedRow);
      const plantelNombre = plantelSeleccionado.plantel;
      const { escuela, institucion } = editedData;
      //console.log(plantelNombre);
      //console.log(institucion);
      try {
        const response = await fetchWithToken(`https://dev-apis.hidalgo.gob.mx/serviciosocial/plantelEditar`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plantel: plantelNombre,
            nuevo_plantel: institucion,
          }),
        });
        setKeyForRerender(prevKey => prevKey + 1);        
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Edición exitosa',
            text: 'La información ha sido editada correctamente.',
          }).then(() => {
            //window.location.reload();
          });
          
          handleClose();
        } else {
          throw new Error('Error en la solicitud PATCH a plantelEditar');
        }
      } catch (error) {
        console.error('Error al editar el plantel:', error);
        Swal.fire({
          icon: 'error',
          title: 'Edición fallida',
          text: 'No se logró editar la información.',
        });
        handleClose();
      }
    }
  };

  const handleCancel = () => {
    Swal.fire({
      icon: 'error',
      title: 'Edición fallida',
      text: 'No se logro editar la información.',
    });
    handleClose();
  };

  const handleEditChange = (e, field) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
    setFormChanged(true);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleClose = () => {
    setFileSelected(false);
    setFormChanged(false);
    setShowModal(false);
  };

  const handleFileChange = (e) => {
    setFileSelected(e.target.files[0]);
    setFormChanged(true); // Indica que se han realizado cambios en el formulario
  };
  const [planteles, setPlanteles] = useState();
  let plantelSeleccionado = null;
  const fetchPlanteles = async () => {
    try {
      const response = await fetchWithToken('https://dev-apis.hidalgo.gob.mx/serviciosocial/planteles');
  
      // Verificar si la respuesta es exitosa (código de estado 200)
      console.log(response);
      if (response.ok) {
        // Convertir la respuesta a formato JSON
        const data = await response.json();
        // Almacenar los datos en el estado
        setPlanteles(data);
      } else {
        // Si la respuesta no es exitosa, lanzar un error
        throw new Error('Error en la solicitud GET a planteles');
      }
    } catch (error) {
      console.error('Error al obtener datos de planteles:', error);
    }
  };
  // Efecto para realizar la solicitud cuando el componente se monta
  useEffect(() => {
    fetchPlanteles();
  }, []);

  useEffect(() => {
    fetchPlanteles();
  }, [keyForRerender]);



  
  
  const initialState = {
    id_universidad: "",
    universidad_nombre: "",
    plantel_nombre: "",
    direccion: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [showAddModal, setShowAddModal] = useState(false);
  console.log(formData)


  const handleOptionChange2 = (event) => {
    const id_universidad = event.target.value;
    const universidad_nombre = event.target.options[event.target.selectedIndex].text; // Obtén el nombre de la universidad seleccionada
    setFormData({ ...formData, id_universidad, universidad_nombre }); // Actualiza el estado con el id y el nombre de la universidad
  };

  const handleInputChange = (event, fieldName) => {
    const value = event.target.value;
    setFormData({ ...formData, [fieldName]: value });
  };



  const ShowModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setTimeout(() => {
      setShowAddModal(false);
    }, 2000); // Retraso de 4 segundos (4000 milisegundos)
  };


  //  funciones modal borrar *********************************************************
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleDelete = () => {
    // Lógica para eliminar la escuela...
    setShowDeleteModal(false);
  };

  const handleShowDeleteModal = (rowData) => {
    //console.log("Datos recibidos en handleShowDeleteModal:", rowData);
    setSelectedRowData(rowData);
    setShowDeleteModal(true);
};

  

  return (
    <div key={keyForRerender}>
      <TableWrapper>
        <h2>{title}</h2>
        <SearchWrapper>
          <StyledInput
            type="text"
            placeholder="Buscar..."
            value={searchText}
            onChange={handleSearch}
          />
          <StyledSelect value={selectedOption} onChange={handleOptionChange}>
            <option value="">Todas las instituciones</option>
            <option value="UAEH">UAEH</option>
            <option value="SEMSyS">SEMSyS</option>
          </StyledSelect>
         
          <StyledAddButton onClick={ShowModal}>Agregar Nuevo Plantel</StyledAddButton>
        </SearchWrapper>

        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Escuela</StyledTh>
              <StyledTh>Plantel</StyledTh>
              <StyledTh>Editar </StyledTh>
              <StyledTh>Eliminar </StyledTh>
              
            </tr>
          </thead>
          <tbody>
            {planteles && planteles
              .filter(
                (item) =>
                  (!selectedOption || item.universidad === selectedOption) &&
                  (item.universidad.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.plantel.toLowerCase().includes(searchText.toLowerCase()))
              )
              .map((item, index) => (
                <tr key={item.id_plantel}>
                  <StyledTd isEven={index % 2 !== 0}>{item.universidad}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>{item.plantel}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>
                    <LiberacionButton variant="primary" onClick={() => handleShow(item.id_plantel)}>
                      Editar
                    </LiberacionButton>           
                  </StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>
                  <LiberacionButton variant="primary" onClick={() => handleShowDeleteModal(item)}>
                      Borrar
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
                    placeholder={editedData.escuela}
                    value={editedData.escuela}
                    readOnly={true}
                    onChange={(e) => handleEditChange(e, 'escuela')}
                  />
                </Form.Group>

                <Form.Group controlId="formInstitucion">
                  <Form.Label>Institución:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese la nueva institución"
                    value={editedData.institucion}
                    onChange={(e) => handleEditChange(e, 'institucion')}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <SendButton variant="primary" >
              Guardar
            </SendButton>
            {/* <CloseButton variant="primary" onClick={handleCancel}>
              Cerrar
            </CloseButton> */}
          </Modal.Footer>
        </ModalContent>
      </CenteredModal>



      <CenteredModal show={showAddModal} onHide={handleCloseAddModal}>
      <ModalContent>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Plantel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEscuela">
              <Form.Label>Escuela:</Form.Label>
              <Form.Control as="select" value={formData.id_universidad} onChange={handleOptionChange2}>
                <option value="">Todas las instituciones</option>
                <option value="1">UAEH</option>
                <option value="2">SEMSyS</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formInstitucion">
              <Form.Label>Institución:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la nueva institución"
                value={formData.plantel_nombre}
                onChange={(e) => handleInputChange(e, 'plantel_nombre')}
              />
            </Form.Group>

            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la dirección"
                value={formData.direccion}
                onChange={(e) => handleInputChange(e, 'direccion')}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <LiberacionButton variant="primary" onClick={() => {handleAddPlantel(); handleCloseAddModal();}} >
            Guardar
          </LiberacionButton>
        </Modal.Footer>
      </ModalContent>
    </CenteredModal>


     {/* Modal de eliminación */}
     <CenteredModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <ModalContent>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
    {selectedRowData && (
        <>
            <p>Estas a punto de eliminar esta institución:</p>
            <p>Escuela: {selectedRowData.universidad}</p>
            <p>Institución: {selectedRowData.plantel}</p>
            <p>¿Deseas continuar con la eliminación?</p>
        </>
    )}
</Modal.Body>
          <Modal.Footer>
            <LiberacionButton variant="primary" onClick={handleDelete}>
              Continuar
            </LiberacionButton>
            <CloseButton variant="primary" onClick={() => setShowDeleteModal(false)}>
              Cerrar
            </CloseButton>
          </Modal.Footer>
        </ModalContent>
      </CenteredModal>

    </div>
  );
};

export default TablaEscuelas;
