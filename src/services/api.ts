import axios from 'axios';

console.log(process.env.REACT_APP_API_URL);

const api = axios.create({
  baseURL: 'https://exata.modery.com.br',
});

export default api;
