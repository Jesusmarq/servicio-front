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
    curp: "",
    carrera: "",
    plantel: "",
    matricula:"",
    
    escuelaprocedencia: "",
    
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
            <label htmlFor="usuario">Correo:</label>
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
              <option value="">Selecione alguna opción</option>
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
              <option value="1">Escuela Superior de Actopan</option>
              <option value="2">Escuela Superior de Apan</option>
              <option value="3">Escuela Superior de Atotonilco de Tula</option>
              <option value="4">Escuela Superior de Ciudad Sahagún</option>
              <option value="5">Escuela Superior de Huejutla</option>
              <option value="6">Escuela Superior de Tepeji del Río</option>
              <option value="7">Escuela Superior de Tlahuelilpan</option>
              <option value="8">Escuela Superior de Tizayuca</option>
              <option value="9">Escuela Superior de Zimapán</option>
              <option value="10">Instituto de Artes</option>
              <option value="11">Instituto de Ciencias Básicas e Ingeniería</option>
              <option value="12">Instituto de Ciencias Agropecuarias</option>
              <option value="13">Instituto de Ciencias de la Salud</option>
              <option value="14">Instituto de Ciencias Económico Administrativas</option>
              <option value="15">Instituto de Ciencias Sociales y Humanidades</option>

              </select>
            </div>
          )}

          {formData.escuelaprocedencia === "Otras" && (
            <div className="form-group">
              <label htmlFor="otroplantel">Escuela:</label>
              <select
               className="cuadros"
                name="otroplantel"
                value={formData.plantel}
                onChange={handleChange}
                required
              >
              <option value="">Selecciona un plantel</option>
              <option value="16">Centro Cultural Europeo de Estudios Universitarios (CE)</option>
              <option value="17">Centro Hidalguense de Estudios Superiores (CENHIES)</option>
              <option value="18">Centro Universitario Antares</option>
              <option value="19">Centro Universitario Hidalguense (CUH)</option>
              <option value="20">Centro Universitario Metropolitano Hidalgo (CEUMH)</option>
              <option value="21">Centro Universitario Siglo XXI</option>
              <option value="22">Centro de Estudios Universitarios de Hidalgo (CEUH)</option>
              <option value="23">Centros de Bachillerato Tecnológico Industrial y de Servicios (CBTis) No. 8</option>
              <option value="24">Centros de Bachillerato Tecnológico Industrial y de Servicios (CBTis) No. 222</option>
              <option value="25">Colegio de Estudios Científicos y Tecnológicos del Estado de Hidalgo (CECYTEH) Plantel Pachuca</option>
              <option value="26">Colegio de Estudios Científicos y Tecnológicos del Estado de Hidalgo (CECYTEH) Plantel Zempoala</option>
              <option value="27">Colegio Nacional de Educación Profesional Técnica (CONALEP) PACHUCA 1</option>
              <option value="28">Colegio Nacional de Educación Profesional Técnica (CONALEP) PACHUCA 2</option>
              <option value="29">Instituto de Estudios Universitarios IEU</option>
              <option value="30">Instituto Moyocoyani Plantel Actopan</option>
              <option value="31">Instituto Moyocoyani Plantel Pachuca</option>
              <option value="32">Instituto Tecnológico de Pachuca (ITP)</option>
              <option value="33">Instituto Tecnológico Latinoamericano (ITLA)</option>
              <option value="34">Instituto Tecnológico Superior del Occidente del Estado de Hidalgo (ITSOEH)</option>
              <option value="35">Universidad Abierta y a Distancia de México UnADM</option>
              <option value="36">Universidad Digital del Estado de Hidalgo (UNIDEH)</option>
              <option value="37">Universidad Iberomexicana de Hidalgo (UIH)</option>
              <option value="38">Universidad Interactiva Milenio</option>
              <option value="39">Universidad Interamericana para el Desarrollo (UNID)</option>
              <option value="40">Universidad Nacional Autonoma de México</option>
              <option value="41">Universidad Politécnica de Huejutla</option>
              <option value="42">Universidad Politécnica de Pachuca (UPP)</option>
              <option value="43">Universidad Politécnica Metropolitana de Hidalgo (UPMH)</option>
              <option value="44">Universidad Tecnologica El Puerto</option>
              <option value="45">Universidad Utel (UTEL)</option>
              <option value="46">Universidad Virtual del Estado de Guanajuato (UVEG)</option>
              <option value="47">Universidad Interamericana para el Desarrollo UNID</option>
              <option value="48">Universidad La Salle</option>
              <option value="49">Universidad Interglobal (UIG)</option>
              <option value="50">Universidad Politécnica de Huejutla</option>


              </select>
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
            <label htmlFor="carrera">Carrera:</label>
            <input className="cuadros"
              type="text"
              name="carrera"
              value={formData.carrera}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="matricula">Matricula:</label>
            <input className="cuadros"
              type="text"
              name="matriculas"
              value={formData.matricula}
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
