import axios from "axios";

import { baseURL } from "../constants";


const apiAdminService = axios.create({
    baseURL,
});

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjb21wMSIsImV4cCI6MTcwMTY2NzMyN30.HwtWUFeCTccwfDia2JPDpJc4YIIxLDg1KPeiAVyJDRk';

apiAdminService.interceptors.request.use(
    (config) => {
        config.headers.accept = 'application/json';
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { apiAdminService };
