import React from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/Oficialia.png';  //POR VEDA 333.jpeg
import 'sweetalert2/src/sweetalert2.scss';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/responsive.css';
import ServicioSocial from './Solicitudes/ServicioSocial';
import Estadia from './Solicitudes/Estadias';
import Estancia from './Solicitudes/Estancia';
import ModeloDual from './Solicitudes/ModeloDual';
import PracticasProfesionales from './Solicitudes/Practicas';
import Residencia from './Solicitudes/Residencia';
import ProyectoIntervencion from './Solicitudes/Proyecto';
import ServicioSocialUAEH from './Solicitudes/ServicioUAEH';
import PracticasUAEH from './Solicitudes/PracticasUAEH';


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
    content: 'Validación de Solicitudes:';
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



// ... (código anterior)

function ADMIsol({ title }) {
 


  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>{title}Validación de Solicitudes: Servicio Social, Prácticas Profesionales, Estadías entre otras. </Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header>
      {/* <div></div><div></div><Text>Bienvenido al Centro de Validación de Solicitudes. Aquí, encontrarás una interfaz intuitiva para revisar y aceptar o rechazar solicitudes de manera eficiente. 
        Simplificamos el proceso para que puedas verificar la precisión de los datos de manera rápida. ¡Explora, valida y toma decisiones informadas con facilidad!</Text>
         */}
        <Tabs
          defaultActiveKey="servicio-social" // Cambiado a "servicio-social"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="servicio-social" title="Servicio Social">
          <ServicioSocialUAEH />
            <ServicioSocial />
            
          </Tab>
          <Tab eventKey="practicas-profesionales" title="Prácticas Profesionales">
            <PracticasUAEH />
            <PracticasProfesionales />
            
          </Tab>
          <Tab eventKey="estancia" title="Estancia">
            <Estancia />
          </Tab>
          <Tab eventKey="estadia" title="Estadía">
            <Estadia />
          </Tab>
          <Tab eventKey="modelo-dual" title="Modelo Dual">
            <ModeloDual />  
          </Tab>
          <Tab eventKey="residencia-profesional" title="Residencia Profesional">
            <Residencia />  
          </Tab>
          <Tab eventKey="proyecto-intervencion" title="Proyecto de Intervención">
          <ProyectoIntervencion/>
          </Tab>
          
        </Tabs>
    </div>
  );
}

export default ADMIsol;