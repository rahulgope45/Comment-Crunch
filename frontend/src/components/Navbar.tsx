import React from 'react'
import { NavLink } from 'react-router-dom'


function Navbar() {
  return (
    <div className='flex gap-[580px] items-center justify-center'>

      {/* Project Name */}
      <div>
        <NavLink className='font-garamond text-[40px] font-normal'
        to={"/"}
        >
          Comment Crunch
        </NavLink>
      </div>

      {/* Nav Section */}
      <div className='flex gap-[30px] items-center'>
        <NavLink
        to={"/about"}
        className="font-garamond text-[25px] font-normal"
        >
          About
        </NavLink>
        <NavLink
        to={"/about"}
        className="font-garamond text-[25px] font-normal"
        >
          Model
        </NavLink>
        <NavLink
        to={"/about"}
        className="font-garamond text-[25px] font-normal"
        >
          FeedBack
        </NavLink>
        <NavLink
        to={"/about"}
        className="font-garamond text-[25px] font-normal"
        >
          Contact
        </NavLink>

      </div>
    </div>
  )
}

export default Navbar