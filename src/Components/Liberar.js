import React from 'react';
import Logo2 from '../Img/Oficialia.png';
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
font-size: clamp(12px, 4vw, 52px);
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



function Liberar({ title }) {
  

  return (
    <div>
      <Header>
        <TitleWrapper>
          <Title>{title}Validación de Documentos: Liberación de Usuarios </Title>
        </TitleWrapper>
        <Image src={Logo2} alt="Logo2" />
      </Header>
      <h2>Bienvenido al Centro de Validación y Liberacion de Usuarios. Aquí, encontrarás una interfaz intuitiva para liberar usuarios de manera eficiente. Simplificamos el proceso para que puedas verificar la fecha de solicitud y liberar usuarios de manera rápida. ¡Explora y toma decisiones informadas con facilidad!</h2>

      <Tabs
          defaultActiveKey="secretarias"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="servicio-social" title="Servicio Social">
          <ServicioSocialUAEH2 />
            <ServicioSocial2 />
            
          </Tab>
          <Tab eventKey="practicas-profesionales" title="Practicas Profesionales">
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
