import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export interface LoginPayload{
    email: string;
    password: string
};

export interface AuthResponse{
    user: {
        id: string;
        email: string;
        name: string;
    };
    accessToken: string;

}

export const authApi = {
    async login(data: LoginPayload): Promise<AuthResponse>{
        const res = await api.post("/auth/login",data);
        return res.data;
    },

    async signin(data: LoginPayload): Promise<AuthResponse>{
        const res = await api.post("/auth/signup",data)
        return res.data;
    },

    async logout(){
        await api.post("/auth/logout");
    },
}