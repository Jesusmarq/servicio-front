import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../Styles/registro.css';
import './Styles/responsive.css';

const validationSchema = Yup.object().shape({
  usuario: Yup.string().required('Campo requerido'),
  contraseña: Yup.string().required('Campo requerido'),
  nombre: Yup.string().required('Campo requerido'),
  apellidoPaterno: Yup.string().required('Campo requerido'),
  apellidoMaterno: Yup.string().required('Campo requerido'),
  numeroCuenta: Yup.string().required('Campo requerido'),
  programaEducativo: Yup.string().required('Campo requerido'),
  institutoProcedencia: Yup.string().required('Campo requerido'),
  plantel: Yup.string().required('Campo requerido'),
  semestre: Yup.number().required('Campo requerido'),
  seguroSocialFacultativo: Yup.string().required('Campo requerido'),
  periodo: Yup.string().required('Campo requerido'),
});

const initialValues = {
  usuario: '',
  contraseña: '',
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  numeroCuenta: '',
  programaEducativo: '',
  institutoProcedencia: '',
  plantel: '',
  semestre: '',
  seguroSocialFacultativo: '',
  periodo: '',
};

const MyForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Aquí puedes manejar la lógica de envío del formulario
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="form-container">
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="my-form">
        <div className="form-group">
          <label htmlFor="usuario">Usuario</label>
          <Field type="text" name="usuario" />
          <ErrorMessage name="usuario" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="contraseña">Contraseña</label>
          <Field type="password" name="contraseña" />
          <ErrorMessage name="contraseña" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <Field type="text" name="nombre" />
          <ErrorMessage name="nombre" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="apellidoPaterno">Apellido Paterno</label>
          <Field type="text" name="apellidoPaterno" />
          <ErrorMessage name="apellidoPaterno" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="apellidoMaterno">Apellido Materno</label>
          <Field type="text" name="apellidoMaterno" />
          <ErrorMessage name="apellidoMaterno" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="numeroCuenta">Número de Cuenta</label>
          <Field type="text" name="numeroCuenta" />
          <ErrorMessage name="numeroCuenta" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="programaEducativo">Programa Educativo</label>
          <Field type="text" name="programaEducativo" />
          <ErrorMessage name="programaEducativo" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="institutoProcedencia">Instituto de Procedencia</label>
          <Field type="text" name="institutoProcedencia" />
          <ErrorMessage name="institutoProcedencia" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="plantel">Plantel</label>
          <Field type="text" name="plantel" />
          <ErrorMessage name="plantel" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="semestre">Semestre</label>
          <Field type="number" name="semestre" />
          <ErrorMessage name="semestre" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="seguroSocialFacultativo">Número de Seguro Social Facultativo</label>
          <Field type="text" name="seguroSocialFacultativo" />
          <ErrorMessage name="seguroSocialFacultativo" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="periodo">Periodo</label>
          <Field type="text" name="periodo" />
          <ErrorMessage name="periodo" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <button type="submit">Enviar</button>
        </div>
      </Form>
    </Formik>

    </div>
  );
};

export default MyForm;
