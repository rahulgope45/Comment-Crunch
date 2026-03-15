import { create } from "zustand";
import  {authApi} from "../api/authApi"
import type { LoginPayload, SigninPayload } from "../api/authApi";



interface User {
    id: string;
    email:string;
    username: string;
    profilepic?: string| null
};

interface AuthState{
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    signin: (data: SigninPayload) => Promise<void>;
    login: (data: LoginPayload) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set,get)=>({
    user:null,
    token: localStorage.getItem("token"),
    isAuthenticated:false,
    isLoading:false,
    error:null,

    login: async(data) =>{
        try {
            set({isLoading:true,error:null});
            const res = await authApi.login(data);
            localStorage.setItem("token",res.accessToken);

            set({
                user: res.user,
                token: res.accessToken,
                isAuthenticated:true,
                isLoading:false,
            });
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Login failed",
                isLoading:false,
            });
            
        }
    },

    logout: async()=>{
        try {
            await authApi.logout();

        } catch (error) {}
        localStorage.removeItem("token");

            set({
                user: null,
                token: null,
                isAuthenticated: false,
            });
    },

    signin: async(data)=>{
            try {
                set({isLoading:true, error:null});

                const res = await authApi.signin(data);
                localStorage.setItem("token",res.accessToken);

                set({
                    user:res.user,
                    token:res.accessToken,
                    isAuthenticated:true,
                    isLoading:false,
                })
            } catch (err:any) {
                set({
                    error: err.response?.data?.message || "Signup Error",
                    isLoading:false,
                })
                
            }
    },

    checkAuth: async()=>{
        const  token = get().token;
        if(!token) return;
     try {
        set ({isLoading:true});
        const user = await authApi.getcurrentUser();

        set({
            user,
            isAuthenticated:true,
            isLoading:false,
        });
     } catch {
        set({
            user: null,
            token:null,
            isAuthenticated:false,
            isLoading:false
        });
        
     }
    },


}))







