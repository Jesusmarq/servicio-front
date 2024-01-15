import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import '../Styles/Login.css';
import '../Styles/responsive.css';

const Login = () => {
  const initialState = {
    usuario: "",
    contrasenia: "",
  };

  const [formData, setFormData] = useState(initialState);
  const history = useHistory(); // Utiliza el hook useNavigate para gestionar redirecc
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://127.0.0.1:5000/login`, formData)
      .then((response) => {
        console.log(response.data.payload.rol);
        // Verifica la respuesta de la API y redirige según el usuario
        if (response.data && response.data.payload.rol === 'admin') {
          // Utiliza navigate para redirigir a la ruta de administrador
          history.push('/administrador');
        } else if (response.data && response.data.payload.rol === 'user') {
          // Utiliza navigate para redirigir a la ruta de usuario normal
          history.push('/administrador');
        }
      })
      .catch((error) => {
        // Maneja errores de solicitud
        console.error("Error al enviar el formulario:", error);
        Swal.fire({
          icon: "error",
          title: "Error al enviar el formulario",
          text: "Hubo un problema al enviar el formulario.",
        });
      });
  };


  return (
    <div className='body1'>
      <div className="login-container">
        {/* Lado Izquierdo */}
        <div className="left-side" style={{ backgroundColor: '#9E2343', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="./Images/Escudo_fondo_osccuro.png" alt="Imagen Izquierda" className="centered-image" />
        </div>

        {/* Lado Derecho */}
        <div className="right-side">
          <img src="./Images/logotipo-09.png" alt="Imagen Superior" className="top-image" />

          {/* Encabezado */}
          <h2 className='h2'>Bienvenido al Sistema de Servicio Social, Prácticas Profesionales, Estancias y Estadías.</h2><br></br>
          <h4>Por favor ingresa tus datos...</h4>

          {/* Formulario de Login */}
          <form onSubmit={handleSubmit} className='form1'>
            <label htmlFor="usuario" className='label1'>Usuario:</label>
            <input
              className='input1'
              type="text"
              id="usuario"
              name="usuario"
              onChange={handleChange}
              required
            /><br /><br />

            <label htmlFor="contrasenia" className='label1'>Contraseña:</label>
            <input
              className='input1'
              type="password"  
              id="contrasenia"
              name="contrasenia"
              onChange={handleChange}
              required
            /><br /><br />

            <button  className='button1' onClick={handleSubmit}>Iniciar sesión</button>
          </form>

          {/* Opción para registrarse */}
          <p style={{ textAlign: 'right' }}>¿No tienes una cuenta? <Link to="/registro" style={{ color: '#9E2343' }}>Registrarse</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
