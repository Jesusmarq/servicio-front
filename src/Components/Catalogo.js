import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/Oficialia.png';

// Importa el componente de la tabla desde su ubicación real
import TablaEscuelas from '../Components/Tablas/Escuelas';

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
    content: 'Administrador de Catálogos:';
    color: #9e2343;
    position: absolute;
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 30vh;
  margin: 20px;
`;

const Catalogo = ({ title }) => {
  const [tipoCatalogo, setTipoCatalogo] = useState('');
  const [opcionesCatalogo, setOpcionesCatalogo] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

  const handleTipoCatalogoChange = (event) => {
    const selectedTipo = event.target.value;
    setTipoCatalogo(selectedTipo);

    switch (selectedTipo) {
      case 'Secretarias':
        setOpcionesCatalogo([

         
'SECRETARÍA DE AGRICULTURA Y DESARROLLO RURAL',
'SECRETARÍA DE BIENESTAR E INCLUSIÓN SOCIAL',
'SECRETARÍA DE CONTRALORÍA',
'SECRETARÍA DE CULTURA',
'SECRETARÍA DE DESARROLLO ECONÓMICO',
'SECRETARÍA DE EDUCACIÓN PÚBLICA DE HIDALGO',
'SECRETARÍA DE GOBIERNO',
'SECRETARÍA DE HACIENDA',
'SECRETARÍA DE INFRAESTRUCTURA PÚBLICA  Y DESARROLLO URBANO SOSTENIBLE',
'SECRETARÍA DE MEDIO AMBIENTE Y RECURSOS NATURALES',
'SECRETARÍA DE MOVILIDAD Y TRANSPORTE',
'SECRETARÍA DE SALUD', 
'SECRETARÍA DE SEGURIDAD PÚBLICA',
'SECRETARÍA DE TURISMO',
'SECRETARÍA DEL TRABAJO Y PREVISION SOCIAL',
'OFICIALÍA MAYOR',
'UNIDAD DE PLANEACIÓN Y PROSPECTIVA',
        ]);
    break;
  case 'Escuelas':
    setOpcionesCatalogo(['Seleccionar..','UAEH', 'Otras']);
    break;
  case 'Usuarios':
    setOpcionesCatalogo(['Alumnos', 'Validador']);
    break;
  default:
    setOpcionesCatalogo([]);
    break;
}

setOpcionSeleccionada('');
};

return (
<div>
  <Header>
    <TitleWrapper>
      <Title>{title}Administrador de Catálogos: Secretarias, Escuelas y Usuarios </Title>
    </TitleWrapper>
    <Image src={Logo2} alt="Logo2" />
  </Header>
  <h2>
    Bienvenido al Administrador de Catálogos. Aquí, encontrarás una interfaz intuitiva para administrar cada uno de los catálogos de manera eficiente. Simplificamos el proceso para que puedas realizar cambios de manera rápida. ¡Explora y toma decisiones informadas con facilidad!
  </h2>

  {/* Select para el tipo de catálogo */}
  <label htmlFor="tipoCatalogo">Selecciona el tipo de catálogo:</label>
  <select id="tipoCatalogo" value={tipoCatalogo} onChange={handleTipoCatalogoChange}>
    <option value="">Selecciona...</option>
    <option value="Secretarias">Secretarias</option>
    <option value="Escuelas">Escuelas</option>
    <option value="Usuarios">Usuarios</option>
  </select>

  {/* Select para las opciones del catálogo */}
  {(tipoCatalogo === 'Escuelas' || tipoCatalogo === 'Secretarias' || tipoCatalogo === 'Usuarios') && (
    <>
      <label htmlFor="opcionesCatalogo">Selecciona la opción del catálogo:</label>
      <select id="opcionesCatalogo" value={opcionSeleccionada} onChange={(e) => setOpcionSeleccionada(e.target.value)}>
        {opcionesCatalogo.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </>
  )}

  {/* Aquí puedes renderizar el componente de tabla según la opción seleccionada */}
  {tipoCatalogo === 'Escuelas' && opcionSeleccionada && <TablaEscuelas filtro={opcionSeleccionada} />}
</div>
);
};

export default Catalogo;