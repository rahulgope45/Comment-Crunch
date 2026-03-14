import React from 'react'

const Whyus: React.FC = () => {

    return (
        <div className=' flex flex-col items-center justify-center gap-3 font-garamond'>
            <h1 className='text-[50px] font-bold  '>
                Why Choose Us?
            </h1>
            <p className='text-[25px] font-normal '>
                We combine creativity and strategy to deliver results that matter.
            </p>
            <div className='relative flex gap-4 text-white text-[25px]'>
                <div className='w-[360px] h-[435px] rounded-[20px] flex flex-col  text-start justify-center p-5 bg-stone-500 gap-7 absolute top-10 right-2'>
                    <div className='flex items-center gap-2'>
                        {/* Tick icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path
                                d="M9 12l2 2l4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <p className=''>Accurate Sentiment Analysis</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        {/* Tick icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path
                                d="M9 12l2 2l4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p >Easy to Use</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        {/* Tick icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path
                                d="M9 12l2 2l4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p>Actionable Insights</p>
                    </div>
                </div>
                <div className='w-[360px] h-[435px] rounded-[20px] flex flex-col text-start justify-center p-5 bg-sky-800 gap-7 absolute -bottom-160 left-5'>
                    <div className='flex items-center gap-2'>
                        {/* Tick icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path
                                d="M9 12l2 2l4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p>Scalable for Any Need</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        {/* Tick icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path
                                d="M9 12l2 2l4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p>Professional Reports</p>
                    </div> 
                    <div className='flex items-center gap-2'>
                        {/* Tick icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path
                                d="M9 12l2 2l4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p>Secure & Reliable</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Whyus