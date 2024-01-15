import React from 'react';
import styled from 'styled-components';
import { IoMdExit } from 'react-icons/io';
import { MdError } from 'react-icons/md';
import ReactDOM from 'react-dom';  // Agrega esta línea
import '../Styles/responsive.css';

const LogoutButton = styled.button`
  background-color: #9E2343;
  color: white;
  padding: 15px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 20px;

  &:hover {
    background-color: #7a1c33;
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #9E2343;
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

function CerrarSesion() {
  const handleCerrarSesion = () => {
    // Lógica para cerrar sesión
    showAlert();
    // Puedes redirigir a la página de inicio de sesión o realizar otras acciones necesarias
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
    <LogoutButton onClick={handleCerrarSesion}>
      <IoMdExit style={{ marginRight: '10px' }} />
      Cerrar Sesión
    </LogoutButton>
  );
}

export default CerrarSesion;
