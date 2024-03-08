import React from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/333.jpeg';  // por veda Oficialia.png
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa los estilos de Bootstrap
//importar tablas 
import TablaEscuelas from './Tablas/Escuelas';
import TablaSecretarias from './Tablas/Secretarias';
import TablaUsuarios from './Tablas/Usuarios';
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
`;

const Title = styled.h2`
  font-size: clamp(12px, 4vw, 52px);
  margin: 0;
  color: #ccc;   // #bc955b por veda 
  position: relative;

  &::before {
    content: 'Administrador de Catálogos';
    color: #98989a;  // por veda #9e2343
    position: absolute;
    z-index: 1;
    left: 0;
  }
`;

const Image = styled.img`
  width: 30vh;
  margin: 20px;
`;

function Catalogo2({ title }) {
  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>{title}Administrador de Catálogos: Secretarias, Escuelas y Usuarios </Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header><br></br><br></br>
      <h2>
        Bienvenido al Administrador de Catálogos. Aquí, encontrarás una interfaz intuitiva para administrar cada uno de los catálogos de manera eficiente. Simplificamos el proceso para que puedas realizar cambios de manera rápida. ¡Explora y toma decisiones informadas con facilidad!
      </h2>
      <div><br></br><br></br>
      <Tabs
          defaultActiveKey="secretarias"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="secretarias" title="Secretarias">
            <TablaSecretarias />
          </Tab>
          <Tab eventKey="instituciones_educativas" title="Instituciones educativas">
            <TablaEscuelas />
          </Tab>
          
        </Tabs>
      </div>
    </div>
  );
}

export default Catalogo2;
