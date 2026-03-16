import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


function Navbar() {

  const { isAuthenticated,user,logout } = useAuth();
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
          Contact
        </NavLink>
        <div className='text-[25px] font-garamond'>
          {!isAuthenticated ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <div className="relative group">
              <span>{user?.username}</span>

              <button
                onClick={logout}
                className="absolute hidden group-hover:block bg-red-500 text-white p-2"
              >
                Logout
              </button>
              </div>
          )}
            </div>

      </div>
      </div>
      )
}

      export default Navbar