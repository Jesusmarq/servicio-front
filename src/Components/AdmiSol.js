import React from 'react';
import styled from 'styled-components';
import Logo2 from '../Img/333.jpeg';  //POR VEDA Oficialia.png
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
  height: 100px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-bottom: 40px; 
`;

const TitleWrapper = styled.div`
  text-align: left;
  color: black;
  margin-left: auto;
`;

const Title = styled.h2`
font-size: clamp(12px, 4vw, 52px);
  margin: 10px;
  color: #CCC;  // POR VEDA bc955b
  position: relative;

  &::before {
    content: 'Validación de Solicitudes:';
    color: #98989A; //por veda 9e2343
    position: absolute;
    z-index: 1;
  }
`;

const Image = styled.img`
  width: 30vh;
  margin: 20px;
`;



// ... (código anterior)

function ADMIsol({ title }) {
 


  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>{title}Validación de Solicitudes: Servicio Social, Practicas Profecionas, Estadias entre otras. </Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header>
      <div></div><div></div><h2>Bienvenido al Centro de Validación de Solicitudes. Aquí, encontrarás una interfaz intuitiva para revisar y aceptar o rechazar solicitudes de manera eficiente. 
        Simplificamos el proceso para que puedas verificar la precisión de los datos de manera rápida. ¡Explora, valida y toma decisiones informadas con facilidad!</h2>
        
        <Tabs
          defaultActiveKey="secretarias"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="servicio-social" title="Servicio Social">
          <ServicioSocialUAEH />
            <ServicioSocial />
            
          </Tab>
          <Tab eventKey="practicas-profesionales" title="Practicas Profesionales">
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