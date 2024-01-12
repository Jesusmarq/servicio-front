import React, { useState } from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/Oficialia.png';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

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

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const StyledField = styled(Field)`
  height: 40px;
  border: 2px solid #9e2343;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const ErrorMessageStyled = styled(ErrorMessage)`
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
  
  const initialValues = {
    usuario: '',
    contrasenia: '',
    nombre: '',
    apellidop: '',
    apellidom: '',
    dependencia: '',
    area: '',
  };
  
  const AgregarVal = ({ title }) => {
    const [formData, setFormData] = useState(initialValues);
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleDependenciaChange = (e) => {
      const newDependencia = e.target.value;
      setFormData((prevData) => ({ ...prevData, dependencia: newDependencia, area: '' }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://127.0.0.1:5000/registroValidador', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        console.log('Respuesta de la API:', data);
  
        Swal.fire({
          icon: 'success',
          title: 'Validador Agregado',
          text: 'Se agregó de manera correcta un nuevo validador.',
        });
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
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
  

        <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="usuario">Usuario</label>
            <StyledField type="text" name="usuario" onChange={handleInputChange} value={formData.usuario} />
            <ErrorMessageStyled>{validationSchema.errors?.usuario}</ErrorMessageStyled>
          </FormGroup>

          <FormGroup>
            <label htmlFor="contrasenia">Contraseña</label>
            <StyledField type="password" name="contrasenia" onChange={handleInputChange} value={formData.contrasenia} />
            <ErrorMessageStyled>{validationSchema.errors?.contrasenia}</ErrorMessageStyled>
          </FormGroup>

          <FormGroup>
            <label htmlFor="nombre">Nombre</label>
            <StyledField type="text" name="nombre" onChange={handleInputChange} value={formData.nombre} />
            <ErrorMessageStyled>{validationSchema.errors?.nombre}</ErrorMessageStyled>
          </FormGroup>

          <FormGroup>
            <label htmlFor="apellidop">Apellido Paterno</label>
            <StyledField type="text" name="apellidop" onChange={handleInputChange} value={formData.apellidop} />
            <ErrorMessageStyled>{validationSchema.errors?.apellidop}</ErrorMessageStyled>
          </FormGroup>

          <FormGroup>
            <label htmlFor="apellidom">Apellido Materno</label>
            <StyledField type="text" name="apellidom" onChange={handleInputChange} value={formData.apellidom} />
            <ErrorMessageStyled>{validationSchema.errors?.apellidom}</ErrorMessageStyled>
          </FormGroup>

          <FormGroup>
            <label htmlFor="dependencia">Dependencia</label>
            <StyledField as="select" name="dependencia" onChange={handleDependenciaChange} value={formData.dependencia}>
              <option value="">Selecciona una dependencia</option>
              <option value="1">Secretaría de Hacienda</option>
              <option value="2">Secretaría de Gobierno</option>
              {/* Agrega más opciones según sea necesario */}
            </StyledField>
            <ErrorMessageStyled>{validationSchema.errors?.dependencia}</ErrorMessageStyled>
          </FormGroup>

          <FormGroup>
            <label htmlFor="area">Área de Adscripción</label>
            <StyledField as="select" name="area" onChange={(e) => setFormData((prevData) => ({ ...prevData, area: e.target.value }))} value={formData.area}>
              <option value="">Selecciona un área</option>
              <option value="1">Gobierno Digital e Innovación</option>
              <option value="2">Oficialía Mayor</option>
              {/* Agrega más opciones según sea necesario */}
            </StyledField>
            <ErrorMessageStyled>{validationSchema.errors?.area}</ErrorMessageStyled>
          </FormGroup>

          {/* Otros campos adicionales según tus necesidades */}

          <FormGroup>
            <SubmitButton type="submit" disabled={!validationSchema.isValid}>
              Agregar Verificador
            </SubmitButton>
          </FormGroup>
        </StyledForm>
      </FormContainer>
    </div>
  );
};

export default AgregarVal;
