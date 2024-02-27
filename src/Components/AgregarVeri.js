import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/Oficialia.png';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
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
  color: #bc955b;
  position: relative;

  &::before {
    content: 'Validación de Documentos:';
    color: #9e2343;
    position: absolute;
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 30vh;
  margin: 20px;
`;

const FormContainer = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid #9e2343;
  border-radius: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const StyledField = styled.input`
  height: 40px;
  border: 2px solid #9e2343;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const ErrorMessageStyled = styled.div`
  color: #bc955b;
  font-size: 14px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#9e2343' : '#bc955b')};
  color: white;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 5px;
  height: 40px;
`;

const validationSchema = Yup.object().shape({
  usuario: Yup.string().required('Campo requerido'),
  contrasenia: Yup.string().required('Campo requerido'),
  nombre: Yup.string().required('Campo requerido'),
  apellidop: Yup.string().required('Campo requerido'),
  apellidom: Yup.string().required('Campo requerido'),
  dependencia: Yup.string().required('Campo requerido'),
  area: Yup.string().required('Campo requerido'),
});

const AgregarVal = ({ title }) => {
  const [formData, setFormData] = useState({
    usuario: '',
    contrasenia: '',
    nombre: '',
    apellidop: '',
    apellidom: '',
    dependencia: '',
    id_secretaria:  '',
  });

  const [secretarias, setSecretarias] = useState([]);
  const [selectedSecretaria, setSelectedSecretaria] = useState('');
  const [idSecretaria, setIdSecretaria] = useState('');
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const traerDatos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/dependencias');
        const datos = await response.json();
        console.log(datos);

        // Filtrar las secretarías únicas
        const secretariasUnicas = [...new Set(datos.map(entry => entry.secretaria))];

        setSecretarias(secretariasUnicas);
        setSelectedSecretaria('');
        setIdSecretaria('');
        setDatos(datos); // Guardar los datos en el estado local
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    traerDatos();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSecretariaChange = (e) => {
    const selectedSec = e.target.value;
    const selectedSecId = datos.find(entry => entry.secretaria === selectedSec)?.id_secretaria || '';
    console.log(selectedSec, selectedSecId);
    setSelectedSecretaria(selectedSec);
    setIdSecretaria(selectedSecId);
    setFormData(prevState => ({
      ...prevState,
      dependencia: selectedSecId
    }));

    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Agregar el ID de la secretaría a los valores antes de enviar la solicitud
      formData.id_secretaria = idSecretaria;
      console.log(JSON.stringify(formData))
      // Enviar la solicitud POST a la URL
      const response = await fetch('http://127.0.0.1:5000/registroValidador', {
        method: 'POST', // Método de la solicitud HTTP
        headers: {
          'Content-Type': 'application/json', // Tipo de contenido que se está enviando (en este caso, JSON)
        },
        body: JSON.stringify(formData), // Convierte el objeto 'formData' a una cadena JSON y lo envía como el cuerpo de la solicitud
      });
      // Parsear la respuesta de la API como JSON
      //const data = await response.json();

    
 
     
      // Mostrar una ventana emergente (SweetAlert) indicando que el validador se agregó correctamente
      if (response.ok) {
      
      Swal.fire({
        icon: 'success', // Ícono de éxito
        title: 'Validador Agregado', // Título de la ventana emergente
        text: 'Se agregó de manera correcta un nuevo validador.',
        timer: 400,// Texto de la ventana emergente
      });
      window.location.reload()
    }
    } catch (error) {
      console.error("Error al enviar el archivo:", error);
      Swal.fire({
        icon: "error",
        title: "Error al agregar Validador",
        text: "Hubo un problema al agregar el validador.",
      });
    }
  };

  

  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>{title}Validación de Documentos: Liberación de Usuarios </Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header>
      <h2>
        Bienvenido al Centro de Validación y Liberación de Usuarios. Aquí,
        encontrarás una interfaz intuitiva para liberar usuarios de manera
        eficiente. Simplificamos el proceso para que puedas verificar la fecha
        de solicitud y liberar usuarios de manera rápida. ¡Explora y toma
        decisiones informadas con facilidad!
      </h2>

      <FormContainer onSubmit={handleSubmit}>
        <StyledForm>
          <FormGroup>
            <label htmlFor="usuario">Usuario</label>
            <StyledField
              type="text"
              name="usuario"
              onChange={handleInputChange}
              value={formData.usuario}
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="contrasenia">Contraseña</label>
            <StyledField
              type="password"
              name="contrasenia"
              onChange={handleInputChange}
              value={formData.contrasenia}
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="nombre">Nombre</label>
            <StyledField
              type="text"
              name="nombre"
              onChange={handleInputChange}
              value={formData.nombre}
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="apellidop">Apellido Paterno</label>
            <StyledField
              type="text"
              name="apellidop"
              onChange={handleInputChange}
              value={formData.apellidop}
              required
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="apellidom">Apellido Materno</label>
            <StyledField
              type="text"
              name="apellidom"
              onChange={handleInputChange}
              value={formData.apellidom}
              required
            />
          </FormGroup>

          <select value={selectedSecretaria} onChange={handleSecretariaChange}>
            <option value="">Seleccione una secretaría</option>
            {secretarias.map(secretaria => (
              <option key={secretaria} value={secretaria}>{secretaria}</option>
            ))}
          </select>

          <FormGroup>
            <SubmitButton type="submit">
              Agregar Verificador
            </SubmitButton>
          </FormGroup>
        </StyledForm>
      </FormContainer>
    </div>
  );
};

export default AgregarVal;
