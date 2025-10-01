import axios from 'axios';

const http = axios.create({
    baseURL: '/api',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

// Request interceptor
http.interceptors.request.use((config) => {
    const token = import.meta.env.VITE_API_TOKEN;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
http.interceptors.response.use(
  (response) => response,
  (error) => {
    //401
    if (error.response?.status === 401) {
      console.warn("Unauthorized, redirect to login!!!");
    }
    return Promise.reject(error);
  }
);
export default http;