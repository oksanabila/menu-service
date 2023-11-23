import axios from "axios";

import { baseURL } from "../constants";


const apiService = axios.create({
    baseURL,
});

apiService.interceptors.request.use(
    (config) => {
        config.headers.accept = 'application/json';
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { apiService };
