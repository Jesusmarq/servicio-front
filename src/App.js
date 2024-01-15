// App.js
import React from 'react';
import Routes from './Routes';
import { BrowserRouter as Router} from 'react-router-dom';
import './Styles/responsive.css';

function App() {
  return (
    <div className="App">
      {/* Renderiza el componente de rutas */}
      <Router>
      <Routes />
      </Router>
      
    </div>
  );
}

export default App;
