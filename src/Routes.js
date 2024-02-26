import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Importa los componentes que utilizarás en tus rutas
import Login from './Pages/login';
import Preregistro from './Pages/Prueba';
import Usuario from './Pages/Usuario';
import Validador from './Pages/Validador';
import ADMI from './Pages/Admi';

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  // Verifica si el usuario está autenticado, por ejemplo, revisando si existe algún token en el almacenamiento local
  return localStorage.getItem('dataUser') !== null;
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
      <Switch>
        {/* Define las rutas y los componentes asociados */}
        <Route path="/" exact component={Login} />
        <Route path="/registro" component={Preregistro} />
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
