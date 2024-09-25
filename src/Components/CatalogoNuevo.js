import React from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/Oficialia.png';  // por veda 333.jpeg
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa los estilos de Bootstrap
//importar tablas 
import TablaEscuelas from './Tablas/Escuelas';
import TablaSecretarias from './Tablas/Secretarias';
import TablaUsuarios from './Tablas/Usuarios';
import '../Styles/responsive.css';


const Header = styled.div`
  height: 5%;
  background-color: white;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0px;
  
  //align-items: center;
  //justify-content: center;

  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 40px;

  @media screen and (max-width: 768px) {
    
    grid-template-columns: 1fr; // 
    padding-left: 10px; // Cambiar el relleno para adaptarse a pantallas más pequeñas
    gap: 10px;
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    grid-template-columns: 1fr;
    padding-left: 10px; // Cambiar el relleno para adaptarse a pantallas más pequeñas
    gap: 10px;
  }

  
`;



const TitleWrapper = styled.div`
  //text-align: left;

  margin-left: 0%;
  
`;

const Title = styled.h2`
  font-size: clamp(15px, 4vw, 52px);
  margin: 0;
  color: #BC955B;    // por veda #98989a
  position: relative;

  &::before {
    content: 'Administrador de Catálogos:';
    color: #9E2343; // por veda #666666
    position: absolute;
    z-index: 1;
  }
`;

const Text = styled.h4`
font-size: clamp(10px, 2vw, 52px);
  margin-top: 2%;
  color: #000000;
  text-align: justify;
  }
`;

const Image = styled.img`

  width: clamp(5%, 30vh, 100%);
  margin-left: 40%;
  margin-top: 2%;
  align-items: right;

  @media screen and (max-width: 768px) {
    order: -1; // Cambia el orden del elemento cuando el ancho de la pantalla sea menor o igual a 768px
    margin-left: 10%
    
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    order: -1; 
    margin-left: 25%
  }

`;

function Catalogo2({ title }) {
  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>{title}Administrador de Catálogos: Secretarias, Escuelas y Usuarios </Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header><br></br>
      <Text>
        Bienvenido al Administrador de Catálogos. Aquí, encontrarás una interfaz intuitiva para administrar cada uno de los catálogos de manera eficiente. Simplificamos el proceso para que puedas realizar cambios de manera rápida. ¡Explora y toma decisiones informadas con facilidad!
      </Text>
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
