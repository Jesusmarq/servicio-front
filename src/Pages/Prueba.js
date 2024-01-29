import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "../Styles/preregistro.css"
import '../Styles/responsive.css';


function Preregistro() {
  const initialState = {
    usuario: "",
    contrasenia: "",
    nombre: "",
    apellidop: "",
    apellidom: "",
    escuelaprocedencia: "UAEH",
    plantel: "",
    otroplantel: "",
    curp: "",
    carrera: "",
    
  };

  const [formData, setFormData] = useState(initialState);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e) => {
    // Previene el comportamiento predeterminado del formulario, que es el envío normal.
    e.preventDefault();
    console.log(formData)
    // Realiza una solicitud POST a la URL 'http://127.0.0.1:5000/registroAlumno' utilizando Axios.
    axios
      .post(`http://127.0.0.1:5000/registroAlumno`, formData)
      .then((response) => {
        // Si la solicitud es exitosa, muestra una ventana emergente de éxito utilizando SweetAlert.
        Swal.fire({
          position: "center", // Posición de la ventana emergente en el centro.
          icon: "success", // Ícono de éxito.
          title: "Gracias por tu interés. Te contactaremos pronto.", // Título de la ventana emergente.
          showConfirmButton: false, // No muestra el botón de confirmación.
          timer: 4000, // Tiempo de visualización de la ventana emergente (en milisegundos).
        });
  
        // Reinicia el estado 'formData' al estado inicial después del envío exitoso.
        setFormData(initialState);
      })
      .catch((error) => {
        // Maneja cualquier error que ocurra durante la solicitud.
        console.error("Error al enviar el formulario:", error);
  
        // Muestra una ventana emergente de error utilizando SweetAlert.
        Swal.fire({
          icon: "error", // Ícono de error.
          title: "Error al enviar el formulario", // Título de la ventana emergente.
          text: "Hubo un problema al enviar el formulario.", // Texto de la ventana emergente.
        });
      });
  };
  

  const handleEscuelaProcedenciaChange = (e) => {
    const escuelaProcedenciaValue = e.target.value;
    setFormData({
      ...formData,
      escuelaprocedencia: escuelaProcedenciaValue,
      plantel: "",
      otroplantel: "",
    });
  };

  return (
    <section id="section_pre">
        <div className="form-container">
        <img src="./Images/logotipo-09.png" alt="Imagen Superior" className="imagenlogo" />
        <h2 className="encabezado">Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usuario">Usuario:</label>
            <input className="cuadros"
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              required
              
            />
          </div>
          <div className="form-group">
            <label htmlFor="contrasenia">Contraseña:</label>
            <input className="cuadros"
              type="password"
              name="contrasenia"
              value={formData.contrasenia}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input className="cuadros"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellidop">Apellido Paterno:</label>
            <input className="cuadros"
              type="text"
              name="apellidop"
              value={formData.apellidop}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellidom">Apellido Materno:</label>
            <input className="cuadros"
              type="text"
              name="apellidom"
              value={formData.apellidom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="escuelaprocedencia">Escuela de Procedencia:</label>
            <select className="cuadros"
              name="escuelaprocedencia"
              value={formData.escuelaprocedencia}
              onChange={handleEscuelaProcedenciaChange}
              required
            >
              <option value="UAEH">UAEH</option>
              <option value="Otras">Otras</option>
            </select>
          </div>
          {formData.escuelaprocedencia === "UAEH" && (
            <div className="form-group">
              <label htmlFor="plantel">Plantel:</label>
              <select
                className="cuadros"
                name="plantel"
                value={formData.plantel}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un plantel</option>
                <option value="1">Plantel 1</option>
                <option value="2">Plantel 2</option>
                {/* Agrega más opciones según tus necesidades */}
              </select>
            </div>
          )}

          {formData.escuelaprocedencia === "Otras" && (
            <div className="form-group">
              <label htmlFor="otroplantel">Nombre de la Escuela:</label>
              <input className="cuadros"
                type="text"
                name="otroplantel"
                value={formData.otroplantel}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="curp">CURP:</label>
            <input className="cuadros"
              type="text"
              name="curp"
              value={formData.curp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="carrera">carrera:</label>
            <input className="cuadros"
              type="text"
              name="carrera"
              value={formData.carrera}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <button type="submit" className="botonchido">Enviar</button>
          </div>
        </form>
      </div>
      
    </section>
  );
}

export default Preregistro;
