import { axiosInstance } from "../lib/axios";
import { create } from "zustand";

interface AuthState {
    authUser: any | null;
    isSigningUp: boolean;
    isLoggingIn : boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    checkAuth:()=> Promise<void>;
}

export const useAuthStore = create<AuthState>((set)=>({
  authUser : null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile:false,
  isCheckingAuth:true,
  

  checkAuth: async () =>{
    try {
        const res = await axiosInstance.get("/auth/check")
        set({authUser:res.data})
        console.log("User",res.data);
    } catch (error) {
        console.log("Error in authCheck",error)
        set({authUser:null});
    }finally{
        set({isCheckingAuth:false});
    }
  },


  

}))
