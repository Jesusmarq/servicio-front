import React, { useState } from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/Oficialia.png';
import '../Styles/responsive.css';

const Header = styled.div`
  height: 100px;
  background-color: white;
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

const Title = styled.h2`
  font-size: 3em;
  margin: 0;
  color: #bc955b;
  position: relative;

  &::before {
    content: 'Validación de Documentos:';
    color: #9e2343;
    position: absolute;
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 30vh;
  margin: 20px;
`;

const TableContainer = styled.div`
  margin: 20px;
  border-radius: 15px;
  overflow: hidden;
  text-align: center;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border-radius: 15px;
`;

const StyledTh = styled.th`
  background-color: #9e2343;
  color: white;
  padding: 10px;
  font-size: 20px;
`;

const StyledTr = styled.tr`
  background-color: ${(props) => (props.even ? '#f0f0f0' : 'white')};
  height: 40px;
`;

const StyledTd = styled.td`
  padding: 10px;
`;

const StyledButton = styled.button`
  background-color: ${(props) => (props.validar ? '#9e2343' : '#bc955b')};
  color: white;
  cursor: ${(props) => (props.validar ? 'not-allowed' : 'pointer')};
  border-radius: 15px;
  &:disabled {
    cursor: not-allowed;
    background-color:#9e2343;
  }
`;

function ValidarSolicitud({ title }) {
  const [data, setData] = useState([
    { id: 1, nombre: 'Victor Daniel Acosta', reportes: 'Reporte-Enero.pdf', horas: 10, validar: false },
    { id: 2, nombre: 'Jesus Adolfo Marquez', reportes: 'Reporte-Final.pdf', horas: 200, validar: false },
    { id: 3, nombre: 'Julian Trejo Melchor', reportes: 'Reporte-Agosto.pdf', horas: 100, validar: true },
    // ... más datos
  ]);

  const [selectedPdf, setSelectedPdf] = useState(null);

  const openPdfInNewTab = (pdf) => {
    window.open(pdf, '_blank');
  };

  const handleHoursChange = (id, newHours) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id && !item.validar ? { ...item, horas: newHours } : item
      )
    );
  };

  const handleValidation = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, validar: !item.validar } : item
      )
    );
  };

  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>{title}Validación de Documentos: Reportes Mensuales, Reporte Final y Registro de Horas </Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header><br></br><br></br>
      <h2>Bienvenido al Centro de Validación de Informes en PDF. Aquí, encontrarás una interfaz intuitiva para revisar y validar informes de manera eficiente. 
        Simplificamos el proceso para que puedas verificar la precisión de los datos de manera rápida. ¡Explora, valida y toma decisiones informadas con facilidad!</h2><br></br><br></br>
     
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Nombre</StyledTh>
              <StyledTh>Reportes</StyledTh>
              <StyledTh>Horas</StyledTh>
              <StyledTh>Validar</StyledTh>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <StyledTr key={item.id} even={index % 2 === 0}>
                <StyledTd>{item.nombre}</StyledTd>
                <StyledTd>
                  <a
                    href="#"
                    onClick={() => {
                      setSelectedPdf(item.reportes);
                      openPdfInNewTab(item.reportes);
                    }}
                    style={{ color: selectedPdf === item.reportes ? '#9e2343' : '#bc955b' }}
                  >
                    {item.reportes}
                  </a>
                </StyledTd>
                <StyledTd>
                  <input
                    type="number"
                    value={item.horas}
                    onChange={(e) => handleHoursChange(item.id, e.target.value)}
                    style={{ width: '60px' }}
                    disabled={item.validar} // Desactiva el input si ya está validado
                  />
                </StyledTd>
                <StyledTd>
                  <StyledButton
                    onClick={() => handleValidation(item.id)}
                    validar={item.validar}
                    disabled={item.validar} // Desactiva el botón si ya está validado
                  >
                    {item.validar ? 'Validado' : 'Validar'}
                  </StyledButton>
                </StyledTd>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </div>
  );
}

export default ValidarSolicitud;
