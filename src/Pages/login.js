import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { axios, obtenerTuToken } from "./axiosConfig";
import Swal from "sweetalert2";
import "../Styles/Login.css";


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
      .post(`https://servicioypracticas.hidalgo.gob.mx:3002/login`, formData)
      .then((response) => {
        //console.log(response.data);
        // Acceder y guardar solo las propiedades necesarias
        const { exp, rol, id, nombre, token, universidad, plantel } = response.data;

        localStorage.setItem(
          "dataUser",
          JSON.stringify({ exp, rol, id, nombre, token,  })
        );
        //console.log( exp, rol, id, nombre, token );

        localStorage.setItem(
          "token",
          JSON.stringify({ token })
        );
        //console.log(  token );

        localStorage.setItem(
          "exp",
          JSON.stringify({ exp })
        );
        //console.log(  exp );

        localStorage.setItem(
          "universidad",
          JSON.stringify({universidad})
        );
         console.log(  universidad );

         localStorage.setItem(
          "plantel",
          JSON.stringify({plantel})
        );
         console.log(  plantel );

         if (rol === "admin") {
          history.push("/administrador");
        } else if (rol === "verificador") {
          history.push("/validador");
        } else if (rol === "alumno") {
          // Verifica la universidad junto con el rol de alumno
          if (universidad === "SEMSyS" && plantel === "Universidad Abierta y a Distancia de México") {
            history.push("/usuario_unadem");
          } else if (universidad === "SEMSyS") {
            history.push("/usuario_sempsys");
          } else if (universidad === "UAEH") {
            history.push("/usuario_uaeh");
          }
        }
      })
      .catch((error) => {
        // Maneja errores de solicitud
        console.error("Error al enviar el formulario:", error);
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text: "Hubo un problema al iniciar sesión.",
        });
      });
  };

  return (
    <div className="body1">
      <div className="login-container">
        {/* Lado Izquierdo */}
        <div
          className="left-side"
          style={{
            backgroundColor: "#9E2343",     /* #98989A; VEDA */
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="./Images/Escudo_fondo_osccuro.png"
            alt="Imagen Izquierda"
            className="centered-image"
          />
        </div>

        {/* Lado Derecho */}
        <div className="right-side">
          <img
            src="./Images/logotipo-09.png"    /* 333.jpeg   cambio por veda */
            alt="Imagen Superior"
            className="top-image"
          />

          {/* Encabezado */}
          <p className="titulo">
            Bienvenido al Sistema de Servicio Social, Prácticas Profesionales, Estancias y Estadías.
          </p>
          <br></br>
          <p className="texto">Por favor ingresa tus datos...</p>

          {/* Formulario de Login */}
          <form onSubmit={handleSubmit} className="form1">
            <label htmlFor="usuario" className="label1">
              Usuario:
            </label>
            <input
              className="input1"
              type="text"
              id="usuario"
              name="usuario"
              onChange={handleChange}
              required
            />
            <br />
            <br />

            <label htmlFor="contrasenia" className="label1">
              Contraseña:
            </label>
            <input
              className="input1"
              type="password"
              id="contrasenia"
              name="contrasenia"
              onChange={handleChange}
              required
            />
            <br />
            <br />

            <button className="button1" onClick={handleSubmit}>
              Iniciar sesión
            </button>
          </form>

          {/* Opción para registrarse */}
          <p className="texto2">
            ¿No tienes una cuenta?{" "}<br></br>
            <Link to="/registro" style={{ color: "#9E2343" }}>   {/* #98989A; VEDA */}
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
