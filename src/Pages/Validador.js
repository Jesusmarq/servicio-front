import React, { useState } from 'react';
import styled from 'styled-components';
import LogoImage from '../Img/333.jpeg'; // se cambnio la imagen Logo_escudo_blanco.png por veda
import { IoMdExit } from 'react-icons/io';
import { MdError } from 'react-icons/md';
import ReactDOM from 'react-dom';  // Agrega esta línea
import ValidarSolicitud from '../Components/Val';
import '../Styles/responsive.css';


const BrighterColor = '#98989A';  //#9E2343; VEDA 
const LineColor = '#ccc';// #BC955B  veda
const SelectedColor = '#98989A';  //#9E2343; VEDA 
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
`;


const Content = styled.div`
  padding: 20px;
`;

const LogoutButton = styled.button`
background-color: #98989A ; //#9E2343; VEDA 
  color: white;
  padding: 15px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 20px;

  &:hover {
    background-color: #ccc ;/*#7a1c33; VEDA */

`;

const AlertContainer = styled.div`
  position: fixed;
  top: 70%;
  left: 10%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #BC955B;
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

const Validador = ({ title }) => {
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
            <IcoImage src={require('../Img/Solicitante-veda.png')} alt='ImageSolicitante' />
            Validar Reportes
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
          {selectedItem === 'Section1' && <ValidarSolicitud /> }
          {selectedItem === 'Section2' && <p></p>}
          {selectedItem === 'Section3' && <p></p>}
          {selectedItem === 'Section4' && <p></p>}
          {selectedItem === 'Section5' && <p></p>}
          {selectedItem === 'Section6' && <p></p>}
          {selectedItem === 'Section7' && <p></p>}
          {selectedItem === 'Section8' && <p></p>}
        </Content>
      </DashboardWrapper>
    </div>
  );
};

export default Validador;
