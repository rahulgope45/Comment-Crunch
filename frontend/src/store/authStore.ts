import { create } from "zustand";
import { authApi } from "../api/authApi"
import type { LoginPayload, SigninPayload, UserResponse } from "../api/authApi";



interface User {
    id: number;
    email: string;
    username: string;
    profilepic?: string | null
};

interface AuthState {
    user: UserResponse | null;
    // token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    signin: (data: SigninPayload) => Promise<void>;
    login: (data: LoginPayload) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    // token: localStorage.getItem("token"),
    isAuthenticated: false,
    isLoading: true,
    error: null,

    login: async (data) => {
        try {
            set({ isLoading: true, error: null });
            const user = await authApi.login(data);
            // localStorage.setItem("token",res.accessToken);

            set({
                // user: res.user,,
                user,
                // token: res.accessToken,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Login failed",
                isLoading: false,
            });

        }
    },

    logout: async () => {
        try {
            await authApi.logout();

        } catch (error) { }
        // localStorage.removeItem("token");

        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });
    },

    signin: async (data) => {
        try {
            set({ isLoading: true, error: null });

            const user = await authApi.signin(data);
            // localStorage.setItem("token",res.accessToken);

            set({
                // user:res.user,
                user,
                // token:res.accessToken,
                isAuthenticated: true,
                isLoading: false,
            })
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Signup Error",
                isLoading: false,
            })

        }
    },

    checkAuth: async () => {
        try {
            set({ isLoading: true });
            console.log("🔍 checkAuth running...");
            const user = await authApi.getcurrentUser();
            console.log("✅ Got user:", user);
            set({ user, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
            console.log("❌ checkAuth failed:", err.response?.status, err.response?.data);
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },


}))







