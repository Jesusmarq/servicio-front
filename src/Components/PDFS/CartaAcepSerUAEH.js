import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { Helmet } from 'react-helmet';


// Importa la imagen (asegúrate de tener la ruta correcta)
import encabezadoImage from '../PDFS/image001.jpg';

const CartaAcepPracUAEH = () => {
  const [modalData, setModalData] = useState({
    numeroArchivo: '',
    fecha:'',
    instituto:'',
    nombreEstudiante: '',
    numeroControl: '',
    carrera: '',
    dependencia: '',
    secretaria:'',
    periodo: '',
    periodo2:'',
    horario: '',
    direccionGeneral: '',
    programa: '',
    clave: '',
    horas: '',
    actividadesDesarrollar: [''],
  });

  const handleChange = (field, value) => {
    setModalData({ ...modalData, [field]: value });
  };

  const handleActividadesChange = (index, value) => {
    const newActividades = [...modalData.actividadesDesarrollar];
    newActividades[index] = value;
    setModalData({ ...modalData, actividadesDesarrollar: newActividades });
  };

  const addActividad = () => {
    setModalData({
      ...modalData,
      actividadesDesarrollar: [...modalData.actividadesDesarrollar, ''],
    });
  };

  const generatePDF = () => {
    const pdf = new jsPDF({
      orientation: 'p',  // 'p' para retrato, 'l' para apaisado
      unit: 'mm',        // Unidad de medida (milímetros en este caso)
      format: 'letter',  // Tamaño de página (carta en este caso)
      marginLeft: 10,    // Márgenes izquierdo
      marginRight: 10,   // Márgenes derecho
      marginTop: 10,     // Márgenes superior
      marginBottom: 10   // Márgenes inferior
    });

    // Añadir la imagen de encabezado
    pdf.addImage(encabezadoImage, 'PNG', 0, -15, 200, 300); // Ajusta las coordenadas y el tamaño según tus necesidades

    // Establecer la fuente Montserrat y el tamaño de letra
  pdf.setFont('Montserrat');
  pdf.setFontSize(12); // Ajusta el tamaño según tus preferencias

    const xPosition = 10;
    let yPosition = 20;

    // Construir el texto con el formato deseado
    const textoPDF = `



    
                                                     Carta de Aceptación de Servicio Social


                                                                                                                                                        ${modalData.numeroArchivo}
                                                                                              Pachuca de Soto,Hgo., a ${modalData.fecha}


                                                                                              
    Dr. Jesús Ibarra Zamudio
    Director de Servicio Social, Practicas Profesionales y
    Vinculción Laboral de la Universidad Autónoma del 
    Estado de Hidalgo
    P r e s e n t e

    Por medio del presente informo a usted que el ${modalData.nombreEstudiante}, con número de 
    cuenta:${modalData.numeroControl}, estudiante de la Licenciatura en ${modalData.carrera}, del 
    ${modalData.instituto} ha sido aceptado para realizar sus Servicio 
    Social en la ${modalData.dependencia},siendo asignado en la ${modalData.dependencia} cubriendo el periodo del ${modalData.periodo}
    ${modalData.periodo2}, de lunes a viernes en un horario de ${modalData.horario} hrs., bajo el Proyecto: 
    “${modalData.programa}” cubriendo un total de ${modalData.horas} horas, realizando las siguientes 
    actividades:
    `;

    

    // Agregar el texto al PDF
    pdf.text(textoPDF, xPosition, yPosition);

          yPosition += 130;
          modalData.actividadesDesarrollar.forEach((actividad, index) => {
          yPosition += 10;
          pdf.text(`${index + 1}. ${actividad}`, xPosition, yPosition);
    });

    // Agregar el resto del texto del pie de página
    const piePagina = `
    Sin otro particular por el momento, le envío un cordial saludo.
    A t e n t a m e n t e
    
    M.G.P. Odette Assad Díaz
    Directora de Profesionalización
    de la Oficialía Mayor








                                                                         Dirección de Profesionalización, Av. Madero 100-A, 1er Piso
                                                                                                            Col. Centro, Pachuca, Hgo., C.P. 42000
                                                                                                             Tel.; 01(771)7176000 ext. 2095 y 6836
                                                                                                                                         www.hidalgo.gob.mx
    `;

    yPosition += 20;
    pdf.text(piePagina, xPosition, yPosition);

    // Guardar o mostrar el PDF (ajusta según tus necesidades)
    pdf.save('formulario.pdf');
  };


  return (
    <>
      {/* Incluir Helmet para agregar la fuente Montserrat */}
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"
        />
      </Helmet>

      <Form>
        <Form.Group controlId="numeroArchivo" className="mb-3">
          <Form.Label>Número de Archivo</Form.Label>
          <Form.Control
            type="text"
            value={modalData.numeroArchivo}
            onChange={(e) => handleChange('numeroArchivo', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="fecha" className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="text"
            value={modalData.fecha}
            onChange={(e) => handleChange('fecha', e.target.value)}
          />
        </Form.Group>

        

        <Form.Group controlId="nombreEstudiante" className="mb-3">
          <Form.Label>Nombre del Estudiante</Form.Label>
          <Form.Control
            type="text"
            value={modalData.nombreEstudiante}
            onChange={(e) => handleChange('nombreEstudiante', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="numeroControl" className="mb-3">
          <Form.Label>Número de Control</Form.Label>
          <Form.Control
            type="text"
            value={modalData.numeroControl}
            onChange={(e) => handleChange('numeroControl', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="instituto" className="mb-3">
          <Form.Label>Instituto </Form.Label>
          <Form.Control
            type="text"
            value={modalData.instituto}
            onChange={(e) => handleChange('instituto', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="carrera" className="mb-3">
          <Form.Label>Carrera</Form.Label>
          <Form.Control
            type="text"
            value={modalData.carrera}
            onChange={(e) => handleChange('carrera', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="dependencia" className="mb-3">
          <Form.Label>Dependencia</Form.Label>
          <Form.Control
            type="text"
            value={modalData.dependencia}
            onChange={(e) => handleChange('dependencia', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="secretaria" className="mb-3">
          <Form.Label>Secretaria</Form.Label>
          <Dropdown onSelect={(eventKey) => handleChange('secretaria', eventKey)}>
              <Dropdown.Toggle variant="success" id="dropdown-dependencia">
              {modalData.secretaria}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            {/* Agrega las opciones del ComboBox aquí */}
            <Dropdown.Item eventKey="opcion1">Secretaría de Agricultura y Desarrollo Rural</Dropdown.Item>
            <Dropdown.Item eventKey="opcion2">Secretaría de Bienestar e Inclusión Social</Dropdown.Item>
            <Dropdown.Item eventKey="opcion3">Secretaría de Contraloría</Dropdown.Item>
            <Dropdown.Item eventKey="opcion4">Secretaría de Cultura</Dropdown.Item>
            <Dropdown.Item eventKey="opcion5">Secretaría de Desarrollo Económico</Dropdown.Item>
            <Dropdown.Item eventKey="opcion6">Secretaría de Educación Pública de Hidalgo</Dropdown.Item>
            <Dropdown.Item eventKey="opcion7">Secretaría de Gobierno</Dropdown.Item>
            <Dropdown.Item eventKey="opcion8">Secretaría de Hacienda</Dropdown.Item>
            <Dropdown.Item eventKey="opcion9">Secretaría de Infraestructura Pública y Desarrollo Urbano Sostenible</Dropdown.Item>
            <Dropdown.Item eventKey="opcion10">Secretaría de Medio Ambiente y Recursos Naturales</Dropdown.Item>
            <Dropdown.Item eventKey="opcion11">Secretaría de Movilidad y Transporte</Dropdown.Item>
            <Dropdown.Item eventKey="opcion12">Secretaría de Salud</Dropdown.Item>
            <Dropdown.Item eventKey="opcion13">Secretaría de Seguridad Pública</Dropdown.Item>
            <Dropdown.Item eventKey="opcion14">Secretaría de Turismo</Dropdown.Item>
            <Dropdown.Item eventKey="opcion15">Secretaría del Trabajo y Previsión Social</Dropdown.Item>
            <Dropdown.Item eventKey="opcion16">Oficialía Mayor</Dropdown.Item>
            <Dropdown.Item eventKey="opcion17">Unidad de Planeación y Prospectiva</Dropdown.Item>
           
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Form.Group controlId="periodo" className="mb-3">
          <Form.Label>Periodo de inicio</Form.Label>
          <Form.Control
            type="text"
            value={modalData.periodo}
            onChange={(e) => handleChange('periodo', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="periodo2" className="mb-3">
          <Form.Label>Periodo de termino</Form.Label>
          <Form.Control
            type="text"
            value={modalData.periodo2}
            onChange={(e) => handleChange('periodo2', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="horario" className="mb-3">
          <Form.Label>Horario</Form.Label>
          <Form.Control
            type="text"
            value={modalData.horario}
            onChange={(e) => handleChange('horario', e.target.value)}
          />
        </Form.Group>

        

        <Form.Group controlId="programa" className="mb-3">
          <Form.Label>Programa</Form.Label>
          <Form.Control
            type="text"
            value={modalData.programa}
            onChange={(e) => handleChange('programa', e.target.value)}
          />
        </Form.Group>

        

        <Form.Group controlId="horas" className="mb-3">
          <Form.Label>Horas</Form.Label>
          <Form.Control
            type="text"
            value={modalData.horas}
            onChange={(e) => handleChange('horas', e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="actividadesDesarrollar" className="mb-3">
          <Form.Label>Actividades a Desarrollar</Form.Label>
          {modalData.actividadesDesarrollar.map((actividad, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                value={actividad}
                onChange={(e) => handleActividadesChange(index, e.target.value)}
              />
              {index === modalData.actividadesDesarrollar.length - 1 && (
                <button type="button" onClick={addActividad}>
                  Agregar Más
                </button>
              )}
            </div>
          ))}
        </Form.Group>
      </Form>

      <Button variant="primary" onClick={generatePDF}>
        Generar PDF
      </Button>
    </>
  );
};

export default CartaAcepPracUAEH;
