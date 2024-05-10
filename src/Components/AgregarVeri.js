import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/333.jpeg';  // por veda Oficialia.png
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import '../Styles/responsive.css';

import fetchWithToken from '../Pages/fetchConfig';


const Header = styled.div`
  height: 5%;
  background-color: white;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0px;
  
  //align-items: center;
  //justify-content: center;

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



const TitleWrapper = styled.div`
  //text-align: left;

  margin-left: 0%;
  
`;

const Title = styled.h2`
  font-size: clamp(15px, 4vw, 52px);
  margin: 0;
  color: #98989a;    // por veda #BC955B
  position: relative;

  &::before {
    content: 'Validación de Documentos:';
    color: #666666; // por veda #9E2343
    position: absolute;
    z-index: 1;
  }
`;

const Text = styled.h4`
font-size: clamp(10px, 2vw, 52px);
  margin-top: 2%;
  color: #000000;
  text-align: justify;
  }
`;

const Image = styled.img`

  width: clamp(5%, 30vh, 100%);
  margin-left: 40%;
  margin-top: 2%;
  align-items: right;

  @media screen and (max-width: 768px) {
    order: -1; // Cambia el orden del elemento cuando el ancho de la pantalla sea menor o igual a 768px
    margin-left: 10%
    
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    order: -1; 
    margin-left: 25%
  }

`;

const FormContainer = styled.div`
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid #666666; // #9e2343 por veda  
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
  border: 2px solid #666666; // #9e2343 por veda  
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const ErrorMessageStyled = styled.div`
  color: #98989a;   // por veda bc955b
  font-size: 14px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#666666' : '#666666')}; // por veda '#9e2343' : '#bc955b'
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
        const response = await fetchWithToken('https://servicioypracticas.hidalgo.gob.mx:3002/dependencias');
        const datos = await response.json();
        //console.log(datos);

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
   // console.log(formData);
  };

  const handleSecretariaChange = (e) => {
    const selectedSec = e.target.value;
    const selectedSecId = datos.find(entry => entry.secretaria === selectedSec)?.id_secretaria || '';
    //console.log(selectedSec, selectedSecId);
    setSelectedSecretaria(selectedSec);
    setIdSecretaria(selectedSecId);
    setFormData(prevState => ({
      ...prevState,
      dependencia: selectedSecId
    }));

    //console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Agregar el ID de la secretaría a los valores antes de enviar la solicitud
      formData.id_secretaria = idSecretaria;
     // console.log(JSON.stringify(formData))

      // Enviar la solicitud POST a la URL
      const response = await fetchWithToken('https://servicioypracticas.hidalgo.gob.mx:3002/registroValidador', {
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
        timer: 2200,// Texto de la ventana emergente
      });
      window.location.reload()
    } else {
      const data = await response.text();
      console.log(data)
      Swal.fire({
        icon: "error",
        title: "Error al agregar Validador",
        text: `${data}`,
      });
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
      <Text>
        Bienvenido al Centro de Validación y Liberación de Usuarios. Aquí,
        encontrarás una interfaz intuitiva para liberar usuarios de manera
        eficiente. Simplificamos el proceso para que puedas verificar la fecha
        de solicitud y liberar usuarios de manera rápida. ¡Explora y toma
        decisiones informadas con facilidad!
      </Text><br></br>

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

          <FormGroup><br></br>
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
