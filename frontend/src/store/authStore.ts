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

interface SignUpData {
    email: String;
    password: String;
    userName ?: String;
}
interface LogimData {
    email: String;
    password: String;
    userName ?: String;
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

  signup: async(data:SignUpData)=>{
    set({isSigningUp : true});
    try {
        const res = await axiosInstance.post("/auth/signup",data);
        set({authUser:res.data});

        // ====To do add toast message =====
        
        console.log("User",res.data);
    } catch (error) {
        console.log("SignUp error",error)
    }finally{
         set({isSigningUp:false});
    }
  },

  login: async(data :LogimData)=>{
    set({isLoggingIn: true});
    try {
        const res =  await axiosInstance.post("/auth/login",data)
        set({authUser: res.data})
        
        // ====To do add toast message =====
        
        console.log("User",res.data);
    } catch (error) {
        console.log("Login",error);
    }
    
  },
  
  logout: async()=>{
    try {
        await axiosInstance.post("/auth/logout");
        set({authUser: null});
                
        // ====To do add toast message =====
        
        console.log("user Logged out")
    } catch (error) {
        console.log("Error logging out",error)
        
    }
  },

  
// ====To do not added Update profile in backend yet =====
//   updateProfile: async(data: SignUpData)=> {
//     const res = await axiosInstance.put("/auth")
//   }




}))
