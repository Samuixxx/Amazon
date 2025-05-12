import axios from 'axios'
import { store } from '../app/store'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 10000,
})

// Interceptor per aggiungere token a ogni richiesta
api.interceptors.request.use(config => {
    const state = store.getState();
    const xsrfToken = state.token.XSRFTOKEN;

    if (xsrfToken) {
        config.headers['X-XSRF-TOKEN'] = xsrfToken;
    }

    return config;
}, error => {
    return Promise.reject(error);
});


api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Token scaduto o non valido: logout utente, redirect, ecc.
            console.warn('Non autorizzato, forse il token è scaduto.');
        }
        return Promise.reject(error)
    }
);

export default api
