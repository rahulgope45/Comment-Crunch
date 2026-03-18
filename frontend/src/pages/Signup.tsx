import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion';
import { type JSX } from 'react';

function Signup(): JSX.Element {

    const { isLoading, error, isAuthenticated, signin } = useAuth();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        

        if (form.password !== form.confirmPassword) {
            //-------Todo Tost message --------
            return;
        }

        await signin({
            username: form.username,
            email: form.email,
            password: form.password
        })
    }


    //Redirect
    useEffect(() =>{
        if(isAuthenticated){
            navigate("/")
        }

    },[isAuthenticated,navigate])

    return (

        <div className="flex items-start min-h-screen w-full overflow-x-hidden bg-white font-['EB_Garamond',_serif]">
      
      {/* Signup Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        /* Strictly ml-[20px] for desktop, centered for mobile */
        className="ml-0 sm:ml-[20px] w-full md:w-[540px] flex flex-col items-center mt-[60px] md:mt-[75px] shrink-0 px-6 sm:px-0"
      >
        <div className="mb-10 text-center md:text-left w-full max-w-[385px]">
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase italic leading-[0.9] mt-2">
            Create A <br /> New Account
          </h1>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <div className="flex flex-col gap-6 w-full max-w-[385px]">
            {/* Name Field */}
            <div className="space-y-1">
              <p className="font-sans text-[10px] uppercase tracking-widest font-bold opacity-60">Full Name</p>
              <input
                name="username"
                type="text"
                onChange={handleChange}
                placeholder="John Doe"
                className="h-[45px] w-full border-b border-black/10 bg-transparent p-2 text-lg focus:border-[#948181] focus:outline-none transition-colors placeholder:opacity-20"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <p className="font-sans text-[10px] uppercase tracking-widest font-bold opacity-60">Email</p>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="name@example.com"
                className="h-[45px] w-full border-b border-black/10 bg-transparent p-2 text-lg focus:border-[#948181] focus:outline-none transition-colors placeholder:opacity-20"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <p className="font-sans text-[10px] uppercase tracking-widest font-bold opacity-60">Password</p>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="••••••••"
                className="h-[45px] w-full border-b border-black/10 bg-transparent p-2 text-lg focus:border-[#948181] focus:outline-none transition-colors placeholder:opacity-20"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <p className="font-sans text-[10px] uppercase tracking-widest font-bold opacity-60">Confirm Password</p>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="••••••••"
                className="h-[45px] w-full border-b border-black/10 bg-transparent p-2 text-lg focus:border-[#948181] focus:outline-none transition-colors placeholder:opacity-20"
              />
            </div>
          </div>

          <button 
            disabled={isLoading}
            className="group relative h-[55px] w-full max-w-[385px] bg-black text-white overflow-hidden mt-10 transition-all duration-500 rounded-none md:rounded-[20px]"
          >
            <span className="relative z-10 font-sans font-bold uppercase text-[11px] tracking-[0.2em]">
              {isLoading ? "Creating Account..." : "Register Now"}
            </span>
            <div className="absolute inset-0 bg-[#948181] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>

          {error && <p className="text-red-500 mt-4 font-sans text-xs">{error}</p>}
        </form>

        <NavLink 
          to="/login"
          className="mt-6 font-sans text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity underline underline-offset-4"
        >
          Already have an account? Log in
        </NavLink>
      </motion.div>

      {/* Side Banner Section */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden md:flex flex-1 justify-end mt-[75px] pl-10"
      >
        <div className="relative">
          <div className="absolute -inset-10 bg-[#948181]/5 blur-3xl rounded-full"></div>
          <img
            src="/Auth.jpg"
            alt="Signup-visual"
            className="relative w-[750px] h-[610px] rounded-l-[40px] object-cover shadow-2xl grayscale-[20%]"
          />
        </div>
      </motion.div>
    </div>
    )
}

export default Signup