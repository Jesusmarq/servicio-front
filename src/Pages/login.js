// Login.js
import React, { useEffect } from 'react';
import '../Styles/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    useEffect(() => {
        document.body.classList.add('login-page');
    
        // Limpia la clase cuando el componente se desmonta
        return () => {
          document.body.classList.remove('login-page');
        };
      }, []);
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
        <form className='form1'>
          <label htmlFor="username" className='label1'>Usuario:</label>
          <input type="text" id="username" name="username" className='input1'/><br /><br />

          <label htmlFor="password" className='label1'>Contraseña:</label>
          <input type="password" id="password" name="password" className='input1'/><br /><br />

          <button type="submit" className='button1'>Iniciar sesión</button>
        </form>

        {/* Opción para registrarse */}
        <p style={{ textAlign: 'right' }}>¿No tienes una cuenta? <Link to="/registro" style={{ color: '#9E2343' }}>Registrarse</Link></p>
      </div>
    </div>
    </div>
  );
}

export default Login;
