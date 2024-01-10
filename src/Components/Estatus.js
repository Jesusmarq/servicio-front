import React, { useState } from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/Oficialia.png';
import backgroundImg from '../Img/fondo.png'; // Reemplaza con la ruta correcta de tu imagen de fondo
import Swal from "sweetalert2";

const EstatusWrapper = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px; /* Ajusta el padding según tus necesidades */
  box-sizing: border-box; /* Asegura que el padding no afecte el tamaño total */
`;

const Header = styled.div`
  height: 100px;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const TitleWrapper = styled.div`
  text-align: left;
  color: black;
  margin-left: auto;
`;

const Title = styled.h1`
  font-size: 3em;
  margin: 0px;
  color: #BC955B;
  position: relative;

  &::before {
    content: 'Seguimiento de Solicitud:';
    color: #9E2343;
    position: absolute;
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 30vh;
  margin: 30px;
`;

const TableWrapper = styled.div`
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8); /* Ajusta la opacidad del fondo de la tabla */
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  background-color: #9E2343;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 30px;
`;

const StyledTd = styled.td`
  padding: 20px;
  text-align: center;
  font-size: 20px;
  border-bottom: 3px solid #ddd;
  background-color: ${(props) => (props.isEven ? '#f9f9f9' : '#e6e6e6')};
`;

const LiberacionButton = styled.button`
  background-color: #9E2343;
  color: white;
  padding: 15px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 20px;

  &:hover {
    background-color: #7a1c33;
  }
`;

function Estatus({ title }) {
  // Estado para almacenar los datos de la tabla
  const [datosTabla, setDatosTabla] = useState({
    estatusSolicitud: 'Aceptado',
    horasAcumuladas: '456 horas',
    liberacion: 'Pendiente',
  });

  const handleSolicitarLiberacion = () => {
    // Lógica para solicitar liberación
    Swal.fire({
      icon: "success",
      title: "Liberación Solicitada",
      text: "La solicitud se realizo de manera correcta.",
    });
  };

  return (
    <EstatusWrapper>
      <Header>
        <TitleWrapper>
          <Title>{title}Seguimiento de Solicitud: Estado, Horas Acumuladas y Liberación</Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header><br></br><br></br>
      <h2>Explora tu Progreso: En este espacio dedicado, visualiza el estado actual de tu solicitud, las horas acumuladas y la liberación
         de manera clara y organizada. Mantén un control total sobre tu trayectoria.</h2>
      <br></br><br></br>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Estatus de Solicitud</StyledTh>
              <StyledTh>Horas Acumuladas</StyledTh>
              <StyledTh>Liberación</StyledTh>
            </tr>
          </thead>
          <tbody>
            <tr>
              <StyledTd isEven={false}>{datosTabla.estatusSolicitud}</StyledTd>
              <StyledTd isEven={true}>{datosTabla.horasAcumuladas}</StyledTd>
              <StyledTd isEven={false}>{datosTabla.liberacion}</StyledTd>
            </tr>
          </tbody>
        </StyledTable>
      </TableWrapper>

      <LiberacionButton onClick={handleSolicitarLiberacion}>
        Solicitar Liberación
      </LiberacionButton>
    </EstatusWrapper>
  );
}

export default Estatus;