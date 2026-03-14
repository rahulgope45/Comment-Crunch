import React from 'react'

const OurAim: React.FC = () => {

    return (
        <div className='w-[1520px] h-[800px] bg-stone-300 flex items-center justify-center'>
            <div className='w-[900px] h-[600px] bg-neutral-200 rounded-2xl   shadow-2xs shadow-sky-100 flex items-center justify-center gap-2 '>
                {/* image */}
                <div>
                    <img
                        src='/Ouraim.jpg'
                        className='rounded-[20px] w-[410px] h-[500px] '
                    />
                </div>

                {/* Text Section */}
                <div className='w-[372px] h-[358px] flex flex-col items-center font-garamond '>
                    <h2 className='text-[40px] font-bold text-indigo-800'>
                        Our Aim
                    </h2>
                    <p className='text-[20px] text-center'>
                        At our core, we strive to make online<br/>
                        conversations more transparent and meaningful.<br/>
                        Our aim is to empower creators, businesses,<br/>
                        and viewers by uncovering the true voice<br/>
                        of audiences through sentiment analysis.<br/>
                        By transforming raw YouTube comments<br/>
                        into clear, actionable insights,<br/>
                        we help users understand how people feel,<br/>
                        what they value, and where conversations<br/>
                        are heading.
                    </p>
                </div>

            </div>

        </div>
    )
}

export default OurAim