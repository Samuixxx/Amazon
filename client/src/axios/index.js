import axios from 'axios'
import axiosRetry from 'axios-retry'

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
	timeout: 10000,
})

axiosRetry(api, {
	retries: 3,
	retryDelay: axiosRetry.exponentialDelay,
	retryCondition: error => {
		return axiosRetry.isRetryableError(error)
	},
})

// Interceptor per aggiungere token a ogni richiesta
api.interceptors.request.use(config => {
	const token = sessionStorage.getItem('token'); // o sessionStorage o altro
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config;
}, error => {
	return Promise.reject(error)
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
