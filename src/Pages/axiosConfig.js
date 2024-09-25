import axios from 'axios';

// Función para obtener el token del localStorage
const obtenerTuToken = () => {
  const tokenData = localStorage.getItem('token');
  return tokenData ? JSON.parse(tokenData).token : null;
};

// Función para configurar el token en la cabecera de la solicitud
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Configurar el interceptor para agregar automáticamente el token a la cabecera de todas las solicitudes
axios.interceptors.request.use(
  config => {
    const token = obtenerTuToken();
    setAuthToken(token);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export { axios, obtenerTuToken }; // Exportar axios y obtenerTuToken
