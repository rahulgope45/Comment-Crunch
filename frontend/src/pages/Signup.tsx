import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Signup() {

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

        <div className='flex items-start min-h-screen w-full overflow-x-hidden'>

            {/* Signup Section */}
            <div className='ml-[20px] w-full md:w-[540px] flex flex-col items-center mt-[75px] shrink-0'>
                <div className='mb-8'>
                    <h1 className='text-2xl font-bold'>Create A New Account</h1>
                </div>

                <form
                    className='flex flex-col items-center w-full'
                    onSubmit={handleSubmit}
                >
                    <div className='flex flex-col gap-5 w-full max-w-[385px]'>
                        <div>
                            <p className='font-semibold mb-1'>Name</p>
                            <input
                                name='username'
                                onChange={handleChange}
                                type='text'
                                placeholder='Enter Your Name'
                                className='h-[50px] w-full border rounded-[15px] p-2 focus:border-sky-500 focus:outline-none'
                            />
                        </div>

                        <div>
                            <p className='font-semibold mb-1'>Email</p>
                            <input
                                name='email'
                                type='email'
                                onChange={handleChange}
                                placeholder='Enter Your Email'
                                className='h-[50px] w-full border rounded-[15px] p-2 focus:border-sky-500 focus:outline-none'
                            />
                        </div>

                        <div>
                            <p className='font-semibold mb-1'>Password</p>
                            <input
                                type='password'
                                name='password'
                                onChange={handleChange}
                                placeholder='Enter Your Password'
                                className='h-[50px] w-full border rounded-[15px] p-2 focus:border-sky-500 focus:outline-none'
                            />
                        </div>

                        <div>
                            <p className='font-semibold mb-1'>Confirm Password</p>
                            <input
                                type='password'
                                name='confirmPassword'
                                onChange={handleChange}
                                placeholder='Enter Your Password Again'
                                className='h-[50px] w-full border rounded-[15px] p-2 focus:border-sky-500 focus:outline-none'
                            />
                        </div>
                    </div>

                    <button
                        disabled={isLoading}
                        className='h-[55px] w-full max-w-[272px] rounded-[20px] bg-[#C8B6A3] hover:bg-[#B8A693] cursor-pointer mt-8 font-bold'>
                        {isLoading ? "Creating..." : "Create A Account"}
                    </button>

                    {error && <p>{error}</p>}

                    
                </form>

                <NavLink
                    to={"/login"}
                    className='underline text-sky-700 hover:text-sky-400 cursor-pointer mt-3'>
                    Already Have An Account?
                </NavLink>
            </div>

            {/* Side Banner Section*/}

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

export default Signup