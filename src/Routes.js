import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



// Importa los componentes que utilizarás en tus rutas
import Login from './Pages/login';
import Preregistro from './Pages/Prueba';
import Usuario from './Pages/Usuario';
import Validador from './Pages/Validador';
import ADMI from './Pages/Admi';
import Table from './Pages/QR';



console.log(localStorage.getItem('dataUser'))
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

// Componente para proteger las rutas que requieren autenticación
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
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

      {/*<Link to="/tabla?datos=JesusAdolfo,25,juan@example.com">
              
  </Link>*/}

      <Switch>
        {/* Define las rutas y los componentes asociados */}
        <Route path="/" exact component={Login} />
        <Route path="/registro" component={Preregistro} />
        <Route path="/tabla" component={Table} />
        {/* Utiliza PrivateRoute para proteger las rutas que requieren autenticación */}
        <PrivateRoute path="/usuario" component={Usuario} />
        <PrivateRoute path="/validador" component={Validador} />
        <PrivateRoute path="/administrador" component={ADMI} />
       
        {/* Agrega más rutas según sea necesario */}
       
       

        {/* Ruta comodín para redirigir a la ruta principal en caso de ruta incorrecta */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
