import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

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

function Table() {
  const location = useLocation();
  const params = location.pathname.split('/').slice(1);

  const [param1, param2, param3, param4, param5] = params;

  return (
    <section id="section_pre">
      <div className="form-container">
        <img
          src="./Images/logotipo-09.png"
          alt="Imagen Superior"
          className="imagenlogo"
        />
        <h2 className="encabezado">Tabla de Usuarios</h2>
        <div>
          <p>Param1: {param1}</p>
          <p>Param2: {param2}</p>
          <p>Param3: {param3}</p>
          <p>Param4: {param4}</p>
          <p>Param5: {param5}</p>
        </div>
      </div>
    </section>
  );
}

export default Table;

