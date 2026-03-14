import React from 'react'


type DataIteam = {
        icon: string;
        title: string;
        content: string
    }

    const data:DataIteam[] = [
        {
            icon: "/icon3.png",
            title: "Comparative Analysis",
            content: "Compare sentiment across multiple videos",
        },
        {
            icon: "/icon2.png",
            title: "Engagement Metrics",
            content: "Track comment volume, frequency, and sentiment shifts over time.",
        },
        {
            icon: "/icon1.png",
            title: "Keyword & Topic Insights",
            content: "Identify trending words, recurring themes, and emotional triggers in the comment section.",
        }

    ]

const Services: React.FC=()=> {

    
    return (
        <div className='flex flex-col items-center justify-center gap-20'>
            <h1 className='font-garamond font-bold text-[40px] text-gray-700'>Services</h1>
            <div className='flex gap-20'>
            {data.map((iteam,index)=>(
                <div
                key={index}
                className='flex flex-col items-center font-garamond w-75 h-87.5 bg-stone-500 rounded-[30px] p-5 shadow-2xl shadow-blue-950'
                >
                 <div>
                 <img
                  className='w-32.5 h-32.5 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4'
                 src={iteam.icon}/>
                 </div>

                 <div>
                    <h1 className='text-[25px] font-medium text-center'>
                        {iteam.title}
                    </h1>
                 </div>
                 <div>
                    <p className='text-[20px] font-normal text-center'>
                        {iteam.content}
                    </p>
                 </div>
                </div>
            ))}
        </div>
        </div>
    )
}

export default Services