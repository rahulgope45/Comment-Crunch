import axios,{ type AxiosInstance } from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "";
export const axiosInstance:AxiosInstance = axios.create({
    baseURL: API_URL ,
    withCredentials: true,
    headers: {
        'Content-Type' : 'application/json'
    }
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Redirect to login if unauthorized
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);