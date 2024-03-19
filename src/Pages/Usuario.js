import React, { useState } from 'react';
import styled from 'styled-components';
import LogoImage from '../Img/333.jpeg'; // se cambnio la imagen Logo_escudo_blanco.png por veda
import Solicitud from '../Components/Solicitud';
import Estatus from '../Components/Estatus';
import Reportes from '../Components/Reportes';
import CerrarSesion from '../Components/CerrarSesion';
import { IoMdExit } from 'react-icons/io';
import { MdError } from 'react-icons/md';
import ReactDOM from 'react-dom';  // Agrega esta línea
import '../Styles/responsive.css';

const BrighterColor = '#666666';  //#9E2343; VEDA 
const LineColor = '#98989a';// #BC955B  veda
const SelectedColor = '#666666';  //#9E2343; VEDA 
const SidebarBackgroundColor = 'white';




const SidebarWrapper = styled.div`
  width: ${({ expanded }) => (expanded ? '350px' : '100px')};
  height: 100vh;
  background-color: ${SidebarBackgroundColor};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  transition: width 0.3s ease, height 0.3s ease;
  overflow: hidden;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    width: 100px;

    
  }


`;

const SidebarHeader = styled.div`
  width: 100%;
  padding: 20px;
  background-color: ${BrighterColor};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SidebarImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0%; // se cambio de 50 a 0 por veda
  object-fit: cover;
  transition: width 0.3s ease;
`;

const LineSeparator = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${LineColor};
  margin-bottom: 10px;
`;

const SidebarItem = styled.div`
  width: 100%;
  padding: 20px;
  color: ${({ isSelected }) => (isSelected ? SelectedColor : BrighterColor)};
  text-align: left;
  background-color: ${({ isSelected }) => (isSelected ? 'transparent' : SidebarBackgroundColor)};
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease, padding 0.3s ease;

  &:hover {
    color: ${LineColor};
    text-decoration: underline;
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  position: relative;
`;

const IcoContainer = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  > * {
    margin-right: 0; /* Espacio entre elementos */
  }

  > *:last-child {
    margin-right: 20px; /* Eliminar margen del último elemento */
  }

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
    font-size: 15px;

    > * {
      margin-right: 0; /* Eliminar margen entre elementos cuando la pantalla es pequeña */
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1424px) {
    /* Estilos adicionales para este rango de ancho */
  }
`;


const IcoImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const LineDivider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: ${BrighterColor};
`;

const DashboardWrapper = styled.div`
  margin-left: ${({ expanded }) => (expanded ? '350px' : '100px')};
  transition: margin-left 0.3s ease;

  @media screen and (max-width: 768px) {
    margin-left:100px;

    
  }
`;


const Content = styled.div`
  padding: 20px;
`;

const LogoutButton = styled.button`
  background-color: #666666 ; //#9E2343; VEDA  
  color: white;
  padding: 15px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 20px;

  &:hover {
    background-color: #98989a ;/*#BC955B; VEDA */
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 70%;
  left: 10%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #666666; // por veda #BC955B
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const AlertIcon = styled.div`
  margin-right: 10px;
`;

const AlertMessage = styled.div`
  font-size: 18px;
`;

const Usuario = ({ title }) => {
  const [selectedItem, setSelectedItem] = useState('Section1');
  const [expanded, setExpanded] = useState(false);

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };



  const handleCerrarSesion = () => {
    // Redirige al usuario a la página de inicio de sesión
    window.location.href = '/login';
    // Borra los datos del localStorage después de redirigir al usuario
    localStorage.clear();
  };

  const showAlert = () => {
    const alertElement = document.createElement('div');

    const removeAlert = () => {
      document.body.removeChild(alertElement);
    };

    document.body.appendChild(alertElement);

    setTimeout(() => {
      removeAlert();
    }, 3000);

    ReactDOM.render(
      <AlertContainer>
        <AlertIcon>
          <MdError size={30} />
        </AlertIcon>
        <AlertMessage>Sesión cerrada exitosamente.</AlertMessage>
      </AlertContainer>,
      alertElement
    );
  };
    

  return (
    <div>
  
      <SidebarWrapper expanded={expanded} onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
        <SidebarHeader>
          <SidebarImage src={LogoImage} alt="Logo" />
        </SidebarHeader>
        <LineSeparator />
        <LineDivider />
        <SidebarItem isSelected={selectedItem === 'Section1'} onClick={() => handleMenuItemClick('Section1')}>
          <IcoContainer>
            <IcoImage src={require('../Img/Solicitante-veda2.png')} alt='ImageSolicitante' />
            Solicitud
          </IcoContainer>
          <LineDivider />
        </SidebarItem>

        <SidebarItem isSelected={selectedItem === 'Section2'} onClick={() => handleMenuItemClick('Section2')}>
          <IcoContainer>
            <IcoImage src={require('../Img/Aval-veda2.png')} alt='ImagePadres' />
            Estatus y Liberación
          </IcoContainer>
          <LineDivider />
        </SidebarItem>

        <SidebarItem isSelected={selectedItem === 'Section3'} onClick={() => handleMenuItemClick('Section3')}>
          <IcoContainer>
            <IcoImage src={require('../Img/Documentacion-veda2.png')} alt='ImageInstitucion' />
            Reportes
          </IcoContainer>
          <LineDivider />
        </SidebarItem>

        <LogoutButton onClick={() => { handleCerrarSesion(); showAlert(); }}>
        <IoMdExit style={{ marginRight: '10px' }} />
        Cerrar Sesión
        </LogoutButton>
      </SidebarWrapper>

      <DashboardWrapper expanded={expanded}>
      
        <Content>
          {/* CONTENIDO FORMULARIOS SIDEBAR */}
          {selectedItem === 'Section1' && <Solicitud /> }
          {selectedItem === 'Section2' && <Estatus />}
          {selectedItem === 'Section3' && <Reportes />}
          {selectedItem === 'Section4' && <CerrarSesion />}
          {selectedItem === 'Section5' && <p></p>}
          {selectedItem === 'Section6' && <p></p>}
          {selectedItem === 'Section7' && <p></p>}
          {selectedItem === 'Section8' && <p></p>}
        </Content>
      </DashboardWrapper>
   
    </div>
  );
};

export default Usuario;
