import React, { useState } from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/Oficialia.png';
import { Formik, Field, Form, ErrorMessage } from 'formik';
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
  const [postData, setPostData] = useState({
    title: '',
    body: '',
  });

  const [dependencia, setDependencia] = useState('');
  const [area, setArea] = useState('');

  const handleInputChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleDependenciaChange = (e) => {
    setDependencia(e.target.value);
    setArea(''); // Reiniciar area cuando dependencia cambia
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('URL_DE_TU_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Agrega cualquier otra cabecera que tu API pueda requerir
        },
        body: JSON.stringify(postData),
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isValid }) => (
            <StyledForm onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="usuario">Usuario</label>
                <StyledField type="text" name="usuario" />
                <ErrorMessageStyled name="usuario" component="div" />
              </FormGroup>

              <FormGroup>
                <label htmlFor="contrasenia">Contraseña</label>
                <StyledField type="password" name="contrasenia" />
                <ErrorMessageStyled name="contrasenia" component="div" />
              </FormGroup>

              <FormGroup>
                <label htmlFor="nombre">Nombre</label>
                <StyledField type="text" name="nombre" />
                <ErrorMessageStyled name="nombre" component="div" />
              </FormGroup>

              <FormGroup>
                <label htmlFor="apellidop">Apellido Paterno</label>
                <StyledField type="text" name="apellidop" />
                <ErrorMessageStyled name="apellidop" component="div" />
              </FormGroup>

              <FormGroup>
                <label htmlFor="apellidom">Apellido Materno</label>
                <StyledField type="text" name="apellidom" />
                <ErrorMessageStyled name="apellidom" component="div" />
              </FormGroup>

              <FormGroup>
                <label htmlFor="dependencia">Dependencia</label>
                <StyledField
                  as="select"
                  name="dependencia"
                  onChange={handleDependenciaChange}
                >
                  <option value="">Selecciona una dependencia</option>
                  <option value="1">Secretaría de Hacienda</option>
                  <option value="0">Secretaría de Gobierno</option>
                </StyledField>
                <ErrorMessageStyled name="dependencia" component="div" />
              </FormGroup>

              {dependencia === '1' && (
                <FormGroup>
                  <label htmlFor="area">Área de Adscripción</label>
                  <StyledField
                    as="select"
                    name="area"
                    onChange={(e) => setArea(e.target.value)}
                  >
                    <option value="">Selecciona un área</option>
                    <option value="1.1">Gobierno Digital e Innovación</option>
                  </StyledField>
                  <ErrorMessageStyled name="area" component="div" />
                </FormGroup>
              )}

              {dependencia === '0' && (
                <FormGroup>
                  <label htmlFor="area">Área de Adscripción</label>
                  <StyledField
                    as="select"
                    name="area"
                    onChange={(e) => setArea(e.target.value)}
                  >
                    <option value="">Selecciona un área</option>
                    <option value="0.0">Oficialía Mayor</option>
                    <option value="0.00">Recursos Humanos</option>
                  </StyledField>
                  <ErrorMessageStyled name="area" component="div" />
                </FormGroup>
              )}

              <FormGroup>
                <SubmitButton type="submit" disabled={!isValid}>
                  Agregar Verificador
                </SubmitButton>
              </FormGroup>
            </StyledForm>
          )}
        </Formik>
      </FormContainer>
    </div>
  );
};

export default AgregarVal;
