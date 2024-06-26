import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "../Styles/preregistro.css"

import fetchWithToken from './fetchConfig';

import { useHistory } from "react-router-dom"; 
import { Tag } from "keep-react";


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
    matricula:"",
    
  };



  const [formData, setFormData] = useState(initialState);
  
  const [plantelOptions, setPlantelOptions] = useState(
    ["Escuela Superior de Actopan",
      "Escuela Superior de Apan",
      "Escuela Superior de Atotonilco de Tula",
      "Escuela Superior de Ciudad Sahagún ",
      "Escuela Superior de Huejutla",
      "Escuela Superior de Tepeji del Río",
      "Escuela Superior de Tlahuelilpan",
      "Escuela Superior de Tizayuca",
      "Escuela Superior de Zimapán",
      "Instituto de Artes",
      "Instituto de Ciencias Básicas e Ingeniería",
      "Instituto de Ciencias Agropecuarias",
      "Instituto de Ciencias de la Salud",
      "Instituto de Ciencias Económico Administrativas",
      "Instituto de Ciencias Sociales y Humanidades"]);
  const [escuelaOptions, setEscuelaOptions] = useState(
    [
      "Centro Cultural Europeo de Estudios Universitarios (CE)",
      "Centro Hidalguense de Estudios Superiores (CENHIES)",
      "Centro Universitario Antares",
      "Centro Universitario Hidalguense (CUH)",
      "Centro Universitario Metropolitano Hidalgo (CEUMH)",
      "Centro Universitario Siglo XXI",
      "Centro de Estudios Universitarios de Hidalgo (CEUH)",
      "Centros de Bachillerato Tecnológico Industrial y de Servicios (CBTis) No. 8",
      "Centros de Bachillerato Tecnológico Industrial y de Servicios (CBTis) No. 222",
      "Colegio de Estudios Científicos y Tecnológicos del Estado de Hidalgo (CECYTEH) Plantel Pachuca",
      "Colegio de Estudios Científicos y Tecnológicos del Estado de Hidalgo (CECYTEH) Plantel Zempoala",
      "Colegio Nacional de Educación Profesional Técnica (CONALEP) PACHUCA 1",
      "Colegio Nacional de Educación Profesional Técnica (CONALEP) PACHUCA 2",
      "Instituto de Estudios Universitarios IEU",
      "Instituto Moyocoyani Plantel Actopan",
      "Instituto Moyocoyani Plantel Pachuca",
      "Instituto Tecnológico de Pachuca (ITP)",
      "Instituto Tecnológico Latinoamericano (ITLA)",
      "Instituto Tecnológico Superior del Occidente del Estado de Hidalgo (ITSOEH)",
      "Universidad Abierta y a Distancia de México UnADM",
      "Universidad Digital del Estado de Hidalgo (UNIDEH)",
      "Universidad Iberomexicana de Hidalgo (UIH)",
      "Universidad Interactiva Milenio",
      "Universidad Interamericana para el Desarrollo (UNID)",
      "Universidad Nacional Autonoma de México",
      "Universidad Politécnica de Huejutla",
      "Universidad Politécnica de Pachuca (UPP)",
      "Universidad Politécnica Metropolitana de Hidalgo (UPMH)",
      "Universidad Tecnologica El Puerto",
      "Universidad Utel (UTEL)",
      "Universidad Virtual del Estado de Guanajuato (UVEG)",
      "Universidad Interamericana para el Desarrollo UNID",
      "Universidad La Salle",
      "Universidad Interglobal (UIG)"
    ]);

    const history = useHistory(); // Instancia de useHistory para redireccionar

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Tu lógica de manejo de envío de formulario
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    // Previene el comportamiento predeterminado del formulario, que es el envío normal.
    e.preventDefault();

    // Realiza una solicitud POST a la URL 'http://127.0.0.1:5000/registroAlumno' utilizando Axios.
    axios
      .post(`https://servicioypracticas.hidalgo.gob.mx:3002/registroAlumno`, formData)
      .then((response) => {
        // Si la solicitud es exitosa, muestra una ventana emergente de éxito utilizando SweetAlert.
        Swal.fire({
          position: "center", // Posición de la ventana emergente en el centro.
          icon: "success", // Ícono de éxito.
          title: "Registro Completo.", // Título de la ventana emergente.
          showConfirmButton: history.push("/login"), // No muestra el botón de confirmación.
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

 
   
  


  const [escuelas, setEscuelas] = useState();
  const [planteles, setPlanteles] = useState();
  const [institutos, setInstitutos] = useState();
  
  const traerPlanteles = async () => {
    //Hacer peticion al endpoint  
    const response = await fetchWithToken('https://servicioypracticas.hidalgo.gob.mx:3002/planteles');
    const data = await response.json();

    // Array para almacenar los objetos con id y universidad únicos
    let arrayIdUniversidadUnicos = [
      {
        id: 0,
        value: "Selecciona la escuela"
      }
    ];
    let idUniversidadesSet = new Set();

    // Recorres el array de objetos
    data.forEach(objeto => {
      if (!idUniversidadesSet.has(objeto.id_universidad)) {
        idUniversidadesSet.add(objeto.id_universidad);

        arrayIdUniversidadUnicos.push({
          id: objeto.id_universidad,
          value: objeto.universidad
        });
      }
    });

    const platelesTemp = data.map(element => {
      return {
        id: element.id_plantel,
        value: element.plantel,
        id_universidad: element.id_universidad
      }
    })

    setPlanteles(platelesTemp)
    setEscuelas(arrayIdUniversidadUnicos)
  }

  useEffect(() => {
    if (!planteles) {
      traerPlanteles();
    }
  })

  const handleEscuelaProcedenciaChange = (e) => {
    // Filtrar a los planteles según su dependencia seleccionada
    const idEscuela = parseInt(e.target.value, 10); // Convertir a número

    if (idEscuela === 0) {
      // Mostrar todos los planteles sin filtrar
      setInstitutos([
        {
          id: 0,
          plantel: "Selecciona una escuela"
        }
      ]);

      setFormData({
        ...formData,
        escuelaprocedencia: 0
      });
    } else {
      // Filtrar los planteles según la escuela seleccionada
      let resultadoFiltrado = planteles.filter(objeto => objeto.id_universidad === idEscuela);

      setInstitutos(resultadoFiltrado);

      setFormData({
        ...formData,
        escuelaprocedencia: idEscuela
      });
    }
  };


  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar la visualización de la alerta

const handleConfirmation = () => {
  setShowConfirmation(true);
};

  return (
    <section id="section_pre">
      <div className="form-container">
        <img src="./Images/333.jpeg" alt="Imagen Superior" className="imagenlogo" />
        <h2 className="encabezado">Registro de Usuario</h2>
        
        
        <form onSubmit={(e) => {handleSubmit(e); handleFormSubmit(e)}}>
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
            <label htmlFor="matricula">Matricula:</label>
            <input className="cuadros"
              type="text"
              name="matricula"
              value={formData.matricula}
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
              {
                escuelas && (
                  escuelas.map(element => {
                    return (
                      <option value={element.id}>{element.value}</option>
                    )
                  })
                )
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="plantel">Plantel:</label>
            <select
              className="cuadros"
              name="plantel"
              value={formData.plantel}
              onChange={handleChange}
              required
            >
              {
                institutos && (
                  institutos.map(element => {
                    return (
                      <option value={element.id}>{element.value}</option>
                    )
                  })
                )
              }
            </select>
          </div>



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

          {showConfirmation ? (
          <>
            <br></br><br></br><br></br><p className="alerta">Entiendo que los datos ingresados son correctos y no se podrán hacer cambios posteriores.</p>
            <div className="form-group">
              <button type="submit" className="botonchido">Enviar</button>
            </div>
            
          </>
        ) : (
          <div className="form-group">
            <button className="botonchido2" onClick={handleConfirmation}>SEGUIR</button>
          </div>
        )}
      </form>
    </div>
  </section>
);
}

export default Preregistro;