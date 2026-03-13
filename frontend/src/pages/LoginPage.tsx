import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

function Login() {

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
        /* overflow-x-hidden prevents any accidental horizontal scrolling */
        <div className='flex items-start min-h-screen w-full overflow-x-hidden'>
            
            {/* Signup Section - Strictly ml-[20px] as requested */}
            <div className='ml-[20px] w-full md:w-[540px] flex flex-col items-center mt-[75px] shrink-0'>
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold font-garamond '>Welcome Back</h1>
                </div>

                <form 
                onSubmit={handleSubmit}
                className='flex flex-col items-center w-full'>
                    <div className='flex flex-col gap-5 w-full max-w-[385px]'>
                        

                        <div>
                            <p className='font-semibold mb-1 font-garamond '>Email</p>
                            <input
                                name='email'
                                type='email'
                                onChange={handleChange}
                                placeholder='Enter Your Email'
                                className='h-[50px] w-full border rounded-[15px] p-2 focus:border-sky-500 focus:outline-none'
                            />
                        </div>

                        <div>
                            <p className='font-semibold mb-1 font-garamond'>Password</p>
                            <input
                                type='password'
                                name='password'
                                onChange={handleChange}
                                placeholder='Enter Your Password'
                                className='h-[50px] w-full border rounded-[15px] p-2 focus:border-sky-500 focus:outline-none'
                            />
                        </div>

                        
                    </div>

                    <button 
                    disabled={isLoading}
                    className='h-[55px] w-full max-w-[272px] rounded-[20px] bg-[#C8B6A3] hover:bg-[#B8A693] cursor-pointer mt-8 font-bold font-garamond'>
                        {isLoading ? "Logingin..." : "LogIn"}
                    </button>

                    {error && <p className='text-red-600'>{error}</p>}
                </form>

                <NavLink 
                to={"/signup"}
                className='underline text-sky-700 hover:text-sky-400 cursor-pointer mt-3 font-garamond'>
                    Don't Have An Account?
                </NavLink>
            </div>

            {/* Side Banner Section - Hidden on mobile, flex on md+ screens */}
            {/* flex-1 ensures it grows to fill the rest of the right-side space */}
            <div className='hidden md:flex flex-1 justify-end mt-[75px]'>
                <img
                    src='/Auth.jpg'
                    alt='Auth-image'
                    className='w-[750px] h-[610px] rounded-l-[20px] object-cover'
                />
            </div>
        </div>
    )
}

export default Login