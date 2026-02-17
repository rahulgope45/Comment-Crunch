import React from 'react'

function Signup() {
    return (
        <div className='flex flex-col items-center gap-4'>
           <h1 className='text-4xl'>
             Create A New Account
           </h1>
            <form className=' flex flex-col p-2 gap-3 items-center'>
                <input
                    className='w-[300px] h-[50px] p-2 border'
                    placeholder='Enter Your Name'
                />

                <input
                    type='email'
                    className='w-[300px] h-[50px] p-2 border'
                    placeholder='Enter Your Email'
                />
                <input
                    type='email'
                    className='w-[300px] h-[50px] p-2 border'
                    placeholder='Enter Your Password'
                />
                <button
                className='w-[150px] h-[50px] border bg-blue-600 hover:bg-blue-400 text-white cursor-pointer' 
                >
                    Signup
                </button>
            </form>
            <p className='text-[15px] text-blue-700 hover:underline cursor-pointer'>
                Already Have an Account?
            </p>
        </div>
    )
}

export default Signup