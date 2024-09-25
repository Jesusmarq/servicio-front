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
    background-color: #7a1c33;   // por veda #98989a
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

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr; 
    padding-left: 10px; 
    gap: 10px;
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    display: grid;
    grid-template-columns: 1fr;
    padding-left: 10px; 
    gap: 10px;
  }

  @media screen and (min-width: 1424px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
  }
`;

const StyledInput = styled.input`
  margin-right: 10%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;

    @media screen and (max-width: 768px) {
    margin-left: 0px;
    margin-right: 60%;

   }

    @media screen and (min-width: 768px) and (max-width: 1424px) {
      margin-left: 0px;
      margin-right: 65%;
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
    margin-right: 65%;
    
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    margin-left: 0px;
    margin-right: 65%;
  }
`;



const StyledAddButton = styled(Button)`
  background-color: #9E2343 !important;  // por veda #666666
  color: white;
  border-radius: 5px;
  border-color: #9E2343 !important;  // por veda #666666
  margin-left: auto;

  &:hover {
    background-color:#bc955b !important; // por veda #98989a
    border-color: #bc955b !important;
  }

  @media screen and (max-width: 768px) {
    margin-left: 0px;
    margin-right: 65%;
    
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    margin-left: 0px;
    margin-right: 65%;
  }

  @media screen and (min-width: 1424px) {
    margin-left: 0%;
    margin-right: 20%;
  }
`;


function TablaSecretarias  ({ title })  {
 
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [keyForRerender, setKeyForRerender] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [editedData, setEditedData] = useState({
    secretaria: '',
    dependencia: '',
  });
  const [formChanged, setFormChanged] = useState(false);
  const [searchText, setSearchText] = useState('');

  //let selected='';
  const handleShow = (index) => {
    const dependenciaSelec = dependencias.find((dependencia) => dependencia.id_dependencia === index);
    console.log("Dependencia a mostrar en el modal", dependenciaSelec);

  setEditedData({
    secretaria: dependenciaSelec ? dependenciaSelec.secretaria : '',
    dependencia: dependenciaSelec ? dependenciaSelec.dependencia : '',
  });
  setSelectedRow(index);
  setShowModal(true);
};


  const [dependencias, setDependencias] = useState([]);
  const [secretariasUnicas, setSecretariasUnicas] = useState([]);
  // Función para obtener dependencias
  const fetchDependencias = async () => {
    try {
      const response = await fetchWithToken('https://dev-apis.hidalgo.gob.mx/serviciosocial/dependencias');

      if (response.ok) {
        const depen = await response.json();
        setDependencias(depen);

        const secretariasUnicasSet = new Set(depen.map((item) => item.secretaria));
          const secretariasUnicasArray = Array.from(secretariasUnicasSet);
          setSecretariasUnicas(secretariasUnicasArray);

        //console.log(secretariasUnicasArray);

      } else {
        console.error('Error al obtener datos de dependencias:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud para obtener datos de dependencias:', error.message);
    }
  };

  const handleSend = async () => {
    if (selectedRow !== null) {
      // Aplica los cambios de edición a la fila seleccionada
      const dependenciaSelec = dependencias.find((dependencia) => dependencia.id_dependencia === selectedRow);
      const id = dependenciaSelec.id_dependencia;
      //console.log(dependencias)
      try {
        const newData = { nombre: editedData.dependencia, dependencia: id };
  
        const response = await fetchWithToken(`https://dev-apis.hidalgo.gob.mx/serviciosocial/dependenciaEditar`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });
  
        if (response.ok) {
          setKeyForRerender(prevKey => prevKey + 1);        
          Swal.fire({
            icon: 'success',
            title: 'Edición exitosa',
            text: 'La información ha sido editada correctamente.',
          });
          handleClose();
        } else {
          throw new Error(`Error en la solicitud PATCH a dependenciaEditar: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error al actualizar dependencia:', error);
  
        Swal.fire({
          icon: 'error',
          title: 'Edición fallida',
          text: 'No se logró editar la información.',
        });
      }
    }
  };
  

  const handleCancel = () => {
    // Muestra la alerta de error
    Swal.fire({
      icon: 'error',
      title: 'Edición fallida',
      text: 'No se logro editar la información.',
    });

    // Cierra la ventana emergente
    handleClose();
  };



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

const handleSearch = (e) => {
  setSearchText(e.target.value);
};

useEffect(() => {
  fetchDependencias();
}, []);

useEffect(() => {
  fetchDependencias();
}, [keyForRerender]);

//-{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{POST AGREGAR DEPENDENCIA}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
const handleAddPlantel = async () => {
  try {
    const response = await fetchWithToken('https://dev-apis.hidalgo.gob.mx/serviciosocial/agregar_dependencia', {
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
        title: 'Dependencia Agregada', // Título de la ventana emergente
        text: 'Se agregó de manera correcta una nueva dependencia.',
        timer: 2000,// Texto de la ventana emergente
      }).then(() => {
        setKeyForRerender(keyForRerender + 1);
      });
      
      
    } else {
      // Manejar otros códigos de estado si es necesario
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
  } catch (error) {
    // Manejar errores de red u otros errores
    console.error('Error en la solicitud para agregar nuevo plantel:', error.message);
  }
};

const initialState = {
  secretaria_id: "",
  dependencia: "",
};

const [formData, setFormData] = useState(initialState);
const [showAddModal, setShowAddModal] = useState(false);
console.log(formData)


const handleOptionChange2 = (event) => {
  const secretaria_id = event.target.value;
 
  setFormData({ ...formData, secretaria_id }); // Actualiza el estado con el id y el nombre de la universidad
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
  // console.log("Datos recibidos en handleShowDeleteModal:", rowData);
   setSelectedRowData(rowData);
   setShowDeleteModal(true);
};


    return (
<div>
<TableWrapper>
<h2>{title}</h2>
<SearchWrapper>
<StyledInput
          type="text"
          placeholder="Buscar..."
          value={searchText}
          onChange={handleSearch}
        />
{console.log(secretariasUnicas)}
<StyledSelect value={selectedOption} onChange={handleOptionChange}>
  <option value="">Todas las secretarias</option>
  {secretariasUnicas.map((secretaria, index) => (
    <option key={index} value={secretaria}>
      {secretaria}
    </option>
  ))}
</StyledSelect>

<StyledAddButton onClick={ShowModal}>Agregar Nueva Dependencia</StyledAddButton>
</SearchWrapper>


<StyledTable>
          <thead>
            <tr>
              <StyledTh>Secretaria</StyledTh>
              <StyledTh>Área de Adscripción</StyledTh>
              <StyledTh>Editar</StyledTh>
              <StyledTh>Eliminar </StyledTh>
             
            </tr>
          </thead>
          <tbody>
            {dependencias
              .filter((item) => !selectedOption || item.secretaria === selectedOption)
              .filter((item) =>
                item.secretaria.toLowerCase().includes(searchText.toLowerCase()) ||
                item.dependencia.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((item, index) => (
                <tr key={index}>
                  <StyledTd isEven={index % 2 !== 0}>{item.secretaria}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>{item.dependencia}</StyledTd>
                  <StyledTd isEven={index % 2 !== 0}>
                    <LiberacionButton variant="primary" onClick={() => handleShow(item.id_dependencia)}>
                      {"Editar"}
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
      <Form.Group controlId="formSecretaria">
        <Form.Label>Secretaria:</Form.Label>
        <Form.Control
  type="text"
  value={editedData.secretaria}
  onChange={(e) => handleEditChange(e, 'secretaria')}
/>
      </Form.Group>

      <Form.Group controlId="formArea">
        <Form.Label>Area de Adscripcion:</Form.Label>
        <Form.Control
          type="text"
          value={editedData.dependencia}
          onChange={(e) => handleEditChange(e, 'dependencia')}
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
            {/* <CloseButton variant="primary" onClick={handleCancel}>
              Cerrar
            </CloseButton> */}
          </Modal.Footer>
        </ModalContent>
      </CenteredModal>




      <CenteredModal show={showAddModal} onHide={handleCloseAddModal}>
      <ModalContent>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Dependencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSecretaria">
              <Form.Label>Secretaria:</Form.Label>
              <Form.Control as="select" value={formData.secretaria_id} onChange={handleOptionChange2}>
                <option value="">Todas las secretarias</option>
                <option value="75">Comisión Ejecutiva de Atención a Víctimas del Estado de Hidalgo</option>
                <option value="76">Comisión Estatal de Biodiversidad de Hidalgo</option>
                <option value="77">Comisión Estatal para el Desarrollo Sostenible de los Pueblos Indígenas</option>
                <option value="78">Consejo de Ciencia, Tecnología e Innovación de Hidalgo</option>
                <option value="79">Coordinación General del Distrito de Educación, Salud, Ciencia, Tecnología e Innovación</option>
                <option value="80">Centro de Atención Infantil Burócratas</option>
                <option value="81">Centro de Justicia para Mujeres del Estado de Hidalgo CJMH</option>
                <option value="82">Dirección General de Archivo General de Notarías</option>
                <option value="83">Dirección General de Asuntos Religiosos</option>
                <option value="84">Instituto de la Defensoría Pública del Estado de Hidalgo</option>
                <option value="85">Instituto Hidalguense de las Mujeres</option>
                <option value="86">Instituto de Formación Profesional de la Procuraduría</option>
                <option value="87">Oficialía Mayor</option>
                <option value="88">Procuraduría General de Justicia</option>
                <option value="89">Radio y Televisión de Hidalgo</option>
                <option value="90">Secretaría de Cultura</option>
                <option value="91">Secretaría de Contraloría</option>
                <option value="92">Secretaría de Desarrollo Económico</option>
                <option value="93">Secretaría de Gobierno (Apoyo a la Defensoría)</option>
                <option value="94">Secretaría de Gobierno (Centro de Justicia para Mujeres del Estado de Hidalgo)</option>


              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDependencia">
              <Form.Label>Dependencia:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la nueva dependencia"
                value={formData.dependencia}
                onChange={(e) => handleInputChange(e, 'dependencia')}
              />
            </Form.Group>

           
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <LiberacionButton variant="primary" onClick={() => {handleAddPlantel(); handleCloseAddModal();}}>
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
            <p>Estas a punto de eliminar esta dependencia:</p>
            <p>Secretaria: {selectedRowData.secretaria}</p>
            <p>Dependencia: {selectedRowData.dependencia}</p>
            <p>¿Deseas continuar con la eliminación?</p>
        </>
    )}
</Modal.Body>
          <Modal.Footer>
            <LiberacionButton variant="primary" onClick={handleDelete}>
              Continuar
            </LiberacionButton>
            {/* <CloseButton variant="primary" onClick={() => setShowDeleteModal(false)}>
              Cerrar
            </CloseButton> */}
          </Modal.Footer>
        </ModalContent>
      </CenteredModal>

</div>
    );
  };
  
  export default TablaSecretarias;