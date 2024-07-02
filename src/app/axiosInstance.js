import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cursopositivocia.com.br:29', // URL da API
  withCredentials: true, // Permite envio de cookies e cabeçalhos de autenticação
  headers: {
    'Content-Type': 'application/json',
  }
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
