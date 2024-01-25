import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import { Helmet } from 'react-helmet';

// Importa la imagen (asegúrate de tener la ruta correcta)
import encabezadoImage from '../PDFS/image001.jpg';
import qr from '../../Img/qr.png';

const CartaAcepSerSol = () => {
  const [modalData, setModalData] = useState({
    numeroArchivo: '',
    fecha:'',
    dirigidaA: '',
    cargo:'',
    nombreEstudiante: '',
    numeroControl: '',
    carrera: '',
    dependencia: '',
    periodo: '',
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
    const pdf = new jsPDF();

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


  ${modalData.dirigidaA}
  ${modalData.cargo}
  P r e s e n t e


  Por medio del presente informo a usted que el C.${modalData.nombreEstudiante}, con número de control ${modalData.numeroControl}, alumno/a de la ${modalData.carrera}, ha sido aceptado para realizar su Servicio Social en la Licenciatura en ${modalData.dependencia}, cubriendo el periodo del ${modalData.periodo}, de lunes a viernes en un horario de ${modalData.horario} hrs.,siendo asignado a la ${modalData.direccionGeneral}, bajo el Programa: “${modalData.programa}” clave:${modalData.clave}, cubriendo un total de ${modalData.horas} horas, realizando las siguientes actividades:
  `;
   // Dividir el texto en líneas de un ancho específico (ancho de la página - márgenes)
   const lines = pdf.splitTextToSize(textoPDF, pdf.internal.pageSize.width - 2 * xPosition);

   // Agregar las líneas al PDF
   pdf.text(lines, xPosition, yPosition);

   yPosition += 90;

  modalData.actividadesDesarrollar.forEach((actividad, index) => {
    yPosition += 15;

    // Dividir cada actividad en líneas
    const actividadLines = pdf.splitTextToSize(`${index + 1}. ${actividad}`, pdf.internal.pageSize.width - 2 * xPosition);

    // Agregar las líneas al PDF
    pdf.text(actividadLines, xPosition, yPosition);
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
     // Dividir el texto del pie de página en líneas
  const piePaginaLines = pdf.splitTextToSize(piePagina, pdf.internal.pageSize.width - 2 * xPosition);
    // Agregar las líneas al PDF
  pdf.text(piePaginaLines, xPosition, yPosition);
  
  pdf.addImage(qr, 'PNG', 140, 190, 40, 40);

  // Agregar un salto de línea antes de la cadena de firma electrónica
  yPosition += 70;

  // Ajustar el tamaño de letra solo para la cadena de firma electrónica
  pdf.setFontSize(6);

  const cadena = `MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKW7Rv3W/7QdUoYGv5l1N1T4z8Y1Z+uAaVtD+u8SCnUf6zvDz4r6Jm8uRJn4IRHjuUL9FLFTWNQlD3rckA4Zjuh3V4/XoUHDbc7w1pvqnEs3JNp7PBJotz47ti2SPo5f0gJmCEuLVYSWifEjT+evxAdFt4mX31RlcMv5z/AgMBAAECgYEAi0k2d3aQhsWO6kmJXQ2cE5RugDqGtNhQQHrsx57lroF1DFqctKXOgYv6xdWdsfbBxmWkxSdoZGmFE5cxfF+6KtGbK/nWYEW0Q9GxShU1EYcyc4j4ISzo94jQsXqCrWAT02z3F7SryJ0wvFQ6e2SJ67U1t9Il9JY3lWYyx/vLkCQQD1jiA2spBrKlAWEa+IsmV/3LnzRrTtql+XgTYYraq5Rtoz/d6W0aVrDp78cV8QFh54j9uVACMsFYByQdEjYDAkEAyrqwWUmSbDTsXKYIYFIt4cO9Wt6HgGmvY/ghDsINbFJblp0+fF4zz2abzAMiBmIKI0Q1sUucQShY+/YrLgJBAN5bslF4gWpjjPCdNBlGz1TtNuyiMc2shMLqXy06+I13ud6RvOJ8QWghXKPE0GvDsgyffRplcSkTQOh3SGYx0CQQC07Zg8pgGupVYBTRa3Kw9nYRUZDNXszET7Goy6B16fz+n75WfToxdK4UvXcGILG1b+0eTpppJ7yIZoF3Td/NkLAkAZgSZj4iZxhq8wfhX2h7DFEAp7QAxS1a9lPN+qZgPIhgc02M50JHtOUwABcPm/n`;

  // Agregar la cadena de firma electrónica al PDF
  const cadenaLines = pdf.splitTextToSize(cadena, pdf.internal.pageSize.width - 2 * xPosition);
  pdf.text(cadenaLines, xPosition, yPosition);

    // Guardar o mostrar el PDF (ajusta según tus necesidades)
    pdf.save('formulario.pdf');
  };


  return (
    <>
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

        <Form.Group controlId="dirigidaA" className="mb-3">
          <Form.Label>A quien va dirigida la carta</Form.Label>
          <Form.Control
            type="text"
            value={modalData.dirigidaA}
            onChange={(e) => handleChange('dirigidaA', e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="cargo" className="mb-3">
          <Form.Label>Cargo de la persona a quien va dirigida</Form.Label>
          <Form.Control
            type="text"
            value={modalData.cargo}
            onChange={(e) => handleChange('cargo', e.target.value)}
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

        <Form.Group controlId="periodo" className="mb-3">
          <Form.Label>Periodo</Form.Label>
          <Form.Control
            type="text"
            value={modalData.periodo}
            onChange={(e) => handleChange('periodo', e.target.value)}
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

        <Form.Group controlId="direccionGeneral" className="mb-3">
          <Form.Label>Dirección General</Form.Label>
          <Form.Control
            type="text"
            value={modalData.direccionGeneral}
            onChange={(e) => handleChange('direccionGeneral', e.target.value)}
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

        <Form.Group controlId="clave" className="mb-3">
          <Form.Label>Clave</Form.Label>
          <Form.Control
            type="text"
            value={modalData.clave}
            onChange={(e) => handleChange('clave', e.target.value)}
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

export default CartaAcepSerSol;
