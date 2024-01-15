// Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Importa los componentes que utilizarás en tus rutas
import Login from './Pages/login';
import Preregistro from './Pages/Prueba';
import Usuario from './Pages/Usuario';
import Validador from './Pages/Validador';
import ADMI from './Pages/Admi';
import TablaEscuelas from './Components/Tablas/Escuelas';
import TablaUsuarios from './Components/Tablas/Usuarios';
import TablaSecretarias from './Components/Tablas/Secretarias';
import YourFormComponent from './Components/PDFS/CartaAcepPracProf';
import CartaAcepSerSol from './Components/PDFS/CartaAcepSerSol';
import CartaAcepPracUAEH from './Components/PDFS/CartaAcepPracUAEH';
import CartaAcepSerUAEH from './Components/PDFS/CartaAcepSerUAEH';
import Base64ToQRCode from './Components/Solicitudes/Ejemplo';



const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* Define las rutas y los componentes asociados */}
        <Route path="/" exact component={Login} />
        <Route path="/registro" component={Preregistro} />
        <Route path="/usuario" component={Usuario} />
        <Route path="/validador" component={Validador} />
        <Route path="/administrador" component={ADMI} />
        {/* Agrega más rutas según sea necesario */}
        <Route path="/x" component={TablaEscuelas} />
        <Route path="/xx" component={TablaUsuarios} />
        <Route path="/xxx" component={TablaSecretarias} />
        <Route path="/2" component={YourFormComponent}/>
        <Route path="/3" component={CartaAcepSerSol}/>
        <Route path="/4" component={CartaAcepPracUAEH}/>
        <Route path="/5" component={CartaAcepSerUAEH}/>
        <Route path="/6" component={Base64ToQRCode}/>
       

        {/* Ruta comodín para redirigir a la ruta principal en caso de ruta incorrecta */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
