import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



// Importa los componentes que utilizarás en tus rutas
import Login from './Pages/login';
import Preregistro from './Pages/Prueba';


import Validador from './Pages/Validador';
import ADMI from './Pages/Admi';
import Table from './Pages/QR';
import Usuario_UAEH from './Pages/Usuario_uaeh';
import Usuario_SEMPSYS from './Pages/Usuario_sempsys';
import Usuario_UNADEM from './Pages/Usuario_unadem';

//console.log(localStorage.getItem('dataUser'))
  var dataUser = localStorage.getItem('dataUser')
  var parsedDataUser = JSON.parse(dataUser);
  
  // Acceder a la propiedad 'id'
  //console.log(parsedDataUser.id);

// Función para verificar si el usuario está autenticado y el token es válido
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('exp');
  console.log(token);
  console.log(expirationDate);

  if (!token || !expirationDate) {
    return false;
  }

  // Verifica si el token ha expirado
  if (Date.now() >= new Date(expirationDate).getTime()) {
    return false;
  }

  try {
    // Decodifica el token para verificar su validez
    const decodedToken = jwtDecode(token);
    // Puedes agregar más validaciones aquí, como verificar el rol del usuario, etc.
    return true;
  } catch (error) {
    return false;
  }
};

const allowedRole = (allowed) =>{
  const dataUser = localStorage.getItem('dataUser');

// Convertir el JSON a un objeto JavaScript
const userData = JSON.parse(dataUser);

// Acceder a la propiedad rol
const rol = userData.rol;
if (rol !== allowed) {
  return false
} else {
  return true
}
}

const redirectToRole = () => {
  const dataUser = localStorage.getItem('dataUser');

// Convertir el JSON a un objeto JavaScript
const userData = JSON.parse(dataUser);

// Acceder a la propiedad rol
const rol = userData.rol;

  var redirectTo =''
  if (rol === 'admin') {
    redirectTo = '/administrador'
  }

  if (rol === 'verificador') {
    redirectTo = '/verificador'
  }

  if (rol === 'alumno') {
    redirectTo = '/usuario'
  }

  return <Redirect to={redirectTo} />;
};

// Componente para proteger las rutas que requieren autenticación
const PrivateRoute = ({ component: Component, allowed, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        allowedRole(allowed) ? (
          <Component {...props} />
        ) : (
          // Redirige al usuario según su rol
          redirectToRole()
        )
      ) : (
        // Redirige al componente de inicio de sesión si el usuario no está autenticado
        <Redirect to="/" />
      )
    }
  />
);



const Routes = () => {
  return (
    <Router>

  

      <Switch>
        {/* Define las rutas y los componentes asociados */}
        <Route path="/" exact component={Login} />
        <Route path="/registro" component={Preregistro} />
        
        <Route path="/datosQR/:param1" component={Table} />

        {/* Utiliza PrivateRoute para proteger las rutas que requieren autenticación */}
        <PrivateRoute path="/usuario_sempsys" component={Usuario_SEMPSYS} allowed = "alumno"/>
        <PrivateRoute path="/usuario_uaeh" component={Usuario_UAEH} allowed = "alumno"/>
        <PrivateRoute path="/usuario_unadem" component={Usuario_UNADEM} allowed = "alumno"/>
        <PrivateRoute path="/validador" component={Validador} allowed = "verificador"/>
        <PrivateRoute path="/administrador" component={ADMI} allowed = "admin" />
       
        {/* Agrega más rutas según sea necesario */}
       
       

        {/* Ruta comodín para redirigir a la ruta principal en caso de ruta incorrecta */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
