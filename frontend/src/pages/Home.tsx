
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div className='flex mt-30 items-center justify-center'>
      <div className='flex flex-col items-center font-garamond gap-4'>
        <p className='font-medium text-[25px]'>
          For Creators & Agencies
        </p>
        <p className='text-center font-bold text-[40px] text-indigo-800'>
          Know Your Community<br />
          Better With<br />
          Comment Crunch
        </p>
        <p className='text-center font-normal text-[20px]'>
          Made for agencies and creatives, designed to showcase<br />
          your work with a polished, professional look.
        </p>
        <NavLink to={"/app"}
          className="w-[200px] h-[50px] bg-indigo-800 hover:bg-indigo-900 flex items-center justify-center text-white rounded-3xl gap-2"

        >
          Start Now
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 rotate-[-50deg]"
              viewBox="0 0 22 22"
              fill="none"
              stroke="black"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </NavLink>

        <img
        src='/saphire.gif'
        alt='Gif-Herosection'
        className='w-[600px] h-[240px] rounded-[60px]'
        />
      </div>
    </div>
  )
}

export default Home