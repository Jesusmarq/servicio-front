import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "../Styles/preregistro.css"


function Preregistro() {
  const initialState = {
    usuario: "",
    contraseña: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    escuelaProcedencia: "UAEH",
    plantel: "",
    otroPlantel: "",
    semestre: "",
    numSeguroSocial: "",
    periodo: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:3001/preregistro/enviar-preregistro`, formData)
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Gracias por tu interés. Te contactaremos pronto.",
          showConfirmButton: false,
          timer: 4000,
        });

        setFormData(initialState);
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
        Swal.fire({
          icon: "error",
          title: "Error al enviar el formulario",
          text: "Hubo un problema al enviar el formulario.",
        });
      });
  };

  const handleEscuelaProcedenciaChange = (e) => {
    const escuelaProcedenciaValue = e.target.value;
    setFormData({
      ...formData,
      escuelaProcedencia: escuelaProcedenciaValue,
      plantel: "",
      otroPlantel: "",
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
            <label htmlFor="contraseña">Contraseña:</label>
            <input className="cuadros"
              type="password"
              name="contraseña"
              value={formData.contraseña}
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
            <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
            <input className="cuadros"
              type="text"
              name="apellidoPaterno"
              value={formData.apellidoPaterno}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellidoMaterno">Apellido Materno:</label>
            <input className="cuadros"
              type="text"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="escuelaProcedencia">Escuela de Procedencia:</label>
            <select className="cuadros"
              name="escuelaProcedencia"
              value={formData.escuelaProcedencia}
              onChange={handleEscuelaProcedenciaChange}
              required
            >
              <option value="UAEH">UAEH</option>
              <option value="Otras">Otras</option>
            </select>
          </div>
          {formData.escuelaProcedencia === "UAEH" && (
            <div className="form-group">
              <label htmlFor="plantel">Plantel:</label>
              <input className="cuadros"
                type="text"
                name="plantel"
                value={formData.plantel}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {formData.escuelaProcedencia === "Otras" && (
            <div className="form-group">
              <label htmlFor="otroPlantel">Nombre de la Escuela:</label>
              <input className="cuadros"
                type="text"
                name="otroPlantel"
                value={formData.otroPlantel}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="semestre">Semestre:</label>
            <input className="cuadros"
              type="text"
              name="semestre"
              value={formData.semestre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numSeguroSocial">Número de Seguro Social Facultativo:</label>
            <input className="cuadros"
              type="text"
              name="numSeguroSocial"
              value={formData.numSeguroSocial}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="periodo">Periodo:</label>
            <input className="cuadros"
              type="text"
              name="periodo"
              value={formData.periodo}
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
