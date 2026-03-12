import React from 'react'
import { NavLink } from 'react-router-dom'

function Login() {
    return (
        /* overflow-x-hidden prevents any accidental horizontal scrolling */
        <div className='flex items-start min-h-screen w-full overflow-x-hidden'>
            
            {/* Signup Section - Strictly ml-[20px] as requested */}
            <div className='ml-[20px] w-full md:w-[540px] flex flex-col items-center mt-[75px] shrink-0'>
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold'>Welcome Back</h1>
                </div>

                <form className='flex flex-col items-center w-full'>
                    <div className='flex flex-col gap-5 w-full max-w-[385px]'>
                        

                        <div>
                            <p className='font-semibold mb-1'>Email</p>
                            <input
                                type='email'
                                placeholder='Enter Your Email'
                                className='h-[50px] w-full border rounded-[15px] p-2 focus:border-sky-500 focus:outline-none'
                            />
                        </div>

                        <div>
                            <p className='font-semibold mb-1'>Password</p>
                            <input
                                type='password'
                                placeholder='Enter Your Password'
                                className='h-[50px] w-full border rounded-[15px] p-2 focus:border-sky-500 focus:outline-none'
                            />
                        </div>

                        
                    </div>

                    <button className='h-[55px] w-full max-w-[272px] rounded-[20px] bg-[#C8B6A3] hover:bg-[#B8A693] cursor-pointer mt-8 font-bold'>
                        Log In
                    </button>
                </form>

                <NavLink 
                to={"/signup"}
                className='underline text-sky-700 hover:text-sky-400 cursor-pointer mt-3'>
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