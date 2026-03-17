import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});



export interface LoginPayload{
    email: string;
    password: string;
};

export interface SigninPayload extends LoginPayload{
    username: string;
}

export interface UserResponse {
    id: number;
    email: string;
    username: string;
    profilepic?: string | null;
    created_at?: string;
}

// export interface AuthResponse{
//     user: {
//         id: number;
//         email: string;
//         name: string;
//         username:string
//         profilepic?: string | null
//     };
//     accessToken: string;

// }

export const authApi = {
    async login(data: LoginPayload): Promise<UserResponse>{
        const res = await api.post("api/auth/login",data);
        return res.data;
    },

    async signin(data: SigninPayload): Promise<UserResponse>{
        const res = await api.post("api/auth/signup",data)
        return res.data;
    },

    async getcurrentUser(): Promise<UserResponse> {
     const res = await api.get("api/auth/me");
     return res.data;
    },

    async logout():Promise<void>{
        await api.post("api/auth/logout");
    },
}