// Table.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

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
  background-color: ${(props) => (props.even ? "#f0f0f0" : "white")};
  height: 40px;
`;

const StyledTd = styled.td`
  padding: 10px;
`;

function Table({ location }) {
  const [filas, setFilas] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const datos = searchParams.get("datos");
    const filas = datos ? datos.split("|") : [];
    setFilas(filas);
  }, [location.search]);

  return (
    <section id="section_pre">
      <div className="form-container">
        <img
          src="./Images/logotipo-09.png"
          alt="Imagen Superior"
          className="imagenlogo"
        />
        <h2 className="encabezado">Tabla de Usuarios</h2>

        <TableContainer>
          <StyledTable border="1">
            <thead>
              <tr>
                <StyledTh>Nombre</StyledTh>
                <StyledTh>Edad</StyledTh>
                <StyledTh>Correo</StyledTh>
              </tr>
            </thead>
            <tbody>
              {filas.map((fila, index) => {
                const [nombre, edad, correo] = fila.split(",");
                return (
                  <StyledTr key={index}>
                    <StyledTd>{nombre}</StyledTd>
                    <StyledTd>{edad}</StyledTd>
                    <StyledTd>{correo}</StyledTd>
                  </StyledTr>
                );
              })}
            </tbody>
          </StyledTable>
        </TableContainer>
      </div>
    </section>
  );
}

export default withRouter(Table);
