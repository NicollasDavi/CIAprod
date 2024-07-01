import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:4000',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
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
