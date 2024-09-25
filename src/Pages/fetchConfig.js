// Función para obtener el token del localStorage
const obtenerTuToken = () => {
  const tokenData = localStorage.getItem('token');
  return tokenData ? JSON.parse(tokenData).token : null;
};

// Función para enviar una solicitud con fetch y agregar el token a la cabecera
const fetchWithToken = (url, options = {}) => {
  const token = obtenerTuToken();
  options.headers = {
    ...options.headers,
    Authorization: `${token}`
  };
  return fetch(url, options);
};

export default fetchWithToken;
