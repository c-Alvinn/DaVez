import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use((config) => {
    const authData = localStorage.getItem('davez-auth');
    if (authData) {
        try {
            const { state } = JSON.parse(authData);
            if (state?.user?.token) {
                config.headers.Authorization = `Bearer ${state.user.token}`;
            }
        } catch (error) {
            console.error('Erro ao parsear dados de autenticação:', error);
        }
    }
    return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('davez-auth');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);
