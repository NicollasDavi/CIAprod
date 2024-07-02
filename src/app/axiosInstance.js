import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://15.228.38.79:29/api',  // Certifique-se de usar HTTPS e a porta correta
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true  // Inclui cookies e outros credenciais nas requisições
});

instance.interceptors.request.use(async config => {
    const token = await localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;
