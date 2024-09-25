import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import LogoImage from '../Img/333.jpeg';
import fetchWithToken from './fetchConfig';

const CardContainer = styled.div`
  background-color: #ccc;
  padding: 20px;
  border-radius: 15px;
  width: 40vw;
  margin-top: 13%;
  margin-left: 30%;
  text-align: center;
  color: #333;
  font-weight: bold;
  font-size: 20px;
  border: 10px solid #ddd;

  @media screen and (max-width: 768px) {
    width: 80vw;
    border-radius: 10px;
    margin-left: 10%;
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    width: 60vw;
  }
`;

function Table() {
  const { param1 } = useParams();
//  console.log(param1)
  const [solicitudData, setSolicitudData] = useState(null);
 //console.log(solicitudData)
 const fetchSolicitudData = async () => {
      try {
        const response = await fetchWithToken(`https://dev-apis.hidalgo.gob.mx/serviciosocial/consultaQR?solicitud=${param1}`);

        if (!response.ok) {
          throw new Error('Error al obtener las solicitudes');
        }

        const responseData = await response.json();
        setSolicitudData(responseData);
      } catch (error) {
        console.error(error);
      }
    };
  useEffect(() => {
    

    fetchSolicitudData();
  }, [param1]);

  return (
    <CardContainer>
      <img src={LogoImage} alt="Imagen Superior" className="imagenlogo" />
      <h2 className="encabezado">Datos de tu Solicitud</h2>
    { solicitudData ? (
  <div>
    <p>Estado: {solicitudData[0].estado}</p>
    <p>Fecha de Liberación: {solicitudData[0].fecha_liberacion}</p>
    <p>Fecha de Solicitud: {solicitudData[0].fecha_solicitud}</p>
    <p>Firma: {solicitudData[0].firma}</p>
    <p>Nombre: {solicitudData[0].nombre}</p>
    <p>Tipo: {solicitudData[0].tipo}</p>
  </div>
) : (
  <p>Cargando...</p>
)}
    </CardContainer>
  );
}

export default Table;
