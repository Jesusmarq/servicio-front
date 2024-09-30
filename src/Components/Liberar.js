import React from 'react';
import Logo2 from '../Img/Oficialia.png';  // por veda 333.jpeg 
import styled from 'styled-components';
import 'sweetalert2/src/sweetalert2.scss';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/responsive.css';

import Estadia2 from './liberaciones/Estadias';
import Estancia2 from './liberaciones/Estancia';
import ModeloDual2 from './liberaciones/ModeloDual';
import Residencia2 from './liberaciones/Residencia';
import ProyectoIntervencion2 from './liberaciones/Proyecto';
import PracticasProfesionales2 from './liberaciones/Practicas';
import PracticasUAEH2 from './liberaciones/PracticasUAEH';
import ServicioSocial2 from './liberaciones/ServicioSocial';
import ServicioSocialUAEH2 from './liberaciones/ServicioUAEH';


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
    content: 'Validación de Documentos:';
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




function Liberar({ title }) {
  

  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>{title}Validación de Documentos: Liberación de Usuarios </Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header>
      {/* <br></br><Text>Bienvenido al Centro de Validación y Liberacion de Usuarios. Aquí, encontrarás una interfaz intuitiva para liberar usuarios de manera eficiente. Simplificamos el proceso para que puedas verificar la fecha de solicitud y liberar usuarios de manera rápida. ¡Explora y toma decisiones informadas con facilidad!</Text> */}

      <Tabs
          defaultActiveKey="servicio-social" // Cambiado a "servicio-social"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="servicio-social" title="Servicio Social">
          <ServicioSocialUAEH2 />
            <ServicioSocial2 />
            
          </Tab>
          <Tab eventKey="practicas-profesionales" title="Prácticas Profesionales">
            <PracticasProfesionales2 />
            <PracticasUAEH2 />
          </Tab>
          <Tab eventKey="estancia" title="Estancia">
            <Estancia2 />
          </Tab>
          <Tab eventKey="estadia" title="Estadía">
            <Estadia2 />
          </Tab>
          <Tab eventKey="modelo-dual" title="Modelo Dual">
            <ModeloDual2 />  
          </Tab>
          <Tab eventKey="residencia-profesional" title="Residencia Profesional">
            <Residencia2 />  
          </Tab>
          <Tab eventKey="proyecto-intervencion" title="Proyecto de Intervención">
          <ProyectoIntervencion2/>
          </Tab>
          
        </Tabs>

    </div>
  );
}

export default Liberar;
