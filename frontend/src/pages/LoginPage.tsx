import React, { useEffect, useState } from 'react'
import { type JSX } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

function Login(): JSX.Element {

    const navigate  = useNavigate();

    const {isAuthenticated,isLoading,error,login} = useAuth();

    const [form,setForm] = useState({
        email: "",
        password: ""

    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       e.preventDefault();

       setForm({
        ...form,
        [e.target.name] : e.target.value,
       });
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>)=>{
        e.preventDefault();

        await login({
            email: form.email,
            password: form.password,
        })
    }

    useEffect(()=>{
        if(isAuthenticated){
            navigate("/")
        }
    },[isAuthenticated,navigate])

    
    return (
        
      <div className="flex items-start min-h-screen w-full overflow-x-hidden bg-white font-['EB_Garamond',_serif] ">
      
      {/* Form Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        /* ml-[20px] strictly kept for desktop. 
           On mobile (sm), we center the form for better UX.
        */
        className="ml-0 sm:ml-[20px] w-full md:w-[540px] flex flex-col items-center mt-[75px] shrink-0 px-6 sm:px-0"
      >
        <div className="mb-12 text-center md:text-left w-full max-w-[385px]">
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase italic leading-none mt-2">
            Welcome <br /> Back
          </h1>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <div className="flex flex-col gap-6 w-full max-w-[385px]">
            {/* Email Field */}
            <div className="space-y-2">
              <p className="font-sans text-xs uppercase tracking-widest font-bold opacity-60">Email Address</p>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="name@agency.com"
                className="h-[55px] w-full border-b border-black/10 bg-transparent p-2 text-xl focus:border-[#948181] focus:outline-none transition-colors placeholder:opacity-30"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <p className="font-sans text-xs uppercase tracking-widest font-bold opacity-60">Password</p>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                className="h-[55px] w-full border-b border-black/10 bg-transparent p-2 text-xl focus:border-[#948181] focus:outline-none transition-colors placeholder:opacity-30"
              />
            </div>
          </div>

          <button 
            disabled={isLoading}
            className="group relative h-[60px] w-full max-w-[385px] bg-black text-white overflow-hidden mt-12 transition-all duration-500 rounded-none md:rounded-[20px]"
          >
            <span className="relative z-10 font-sans font-bold uppercase text-xs tracking-widest">
              {isLoading ? "Verifying..." : "Sign In"}
            </span>
            <div className="absolute inset-0 bg-[#948181] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>

          {error && <p className="text-red-500 mt-4 font-sans text-sm">{error}</p>}
        </form>

        <NavLink 
          to="/signup"
          className="mt-8 font-sans text-xs uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity underline underline-offset-4"
        >
          Create an account
        </NavLink>
      </motion.div>

      {/* Side Banner Section */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden md:flex flex-1 justify-end mt-[75px] pl-10"
      >
        <div className="relative group">
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-[#948181]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <img
            src="/Auth.jpg"
            alt="Auth-visual"
            /* Maintained your requested size for desktop, but object-fit ensures it looks good */
            className="relative w-[750px] h-[610px] rounded-l-[40px] object-cover shadow-2xl grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </motion.div>
    </div>
    )
}

export default Login