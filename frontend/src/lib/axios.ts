import axios,{ type AxiosInstance } from "axios";

const API_URL = import.meta.env.VITE_APi_URL ?? "";
export const axiosInstance:AxiosInstance = axios.create({
    baseURL: API_URL + "/api",
    withCredentials: true
})