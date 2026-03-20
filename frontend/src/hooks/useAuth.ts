import { useAuthStore } from "../store/authStore";


export const useAuth =() =>{
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const isLoading = useAuthStore((state) => state.isLoading)
    const error = useAuthStore((state) => state.error)
    const signin = useAuthStore((state) => state.signin)
    const login = useAuthStore((state) => state.login)
    const logout = useAuthStore((state) => state.logout)
    const checkAuth = useAuthStore((state) => state.checkAuth)
    const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth)

    return{
        user,
        isAuthenticated,
        isLoading,
        error,
        signin,
        login,
        logout,
        checkAuth,
        isCheckingAuth,
    };
};