import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Model", path: "/model" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className=" sticky top-0 z-50  border-b border-black/5 font-['EB_Garamond',_serif]">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink 
          className="text-3xl md:text-4xl font-normal tracking-tighter uppercase leading-none"
          to="/"
        >
          Crunch
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name}
              to={link.path} 
              className={({ isActive }) => 
                `text-xl transition-opacity hover:opacity-50 ${isActive ? 'italic font-bold' : 'font-normal'}`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="text-xl pl-4 border-l border-black/10">
            {!isAuthenticated ? (
              <NavLink to="/login" className="hover:opacity-50 transition-opacity">Login</NavLink>
            ) : (
              <div className="relative group cursor-pointer">
                <span className="italic">{user?.username}</span>
                <div className="absolute right-0 top-full pt-4 hidden group-hover:block w-32">
                  <button
                    onClick={logout}
                    className="w-full bg-black text-white text-sm py-3 font-sans font-bold uppercase tracking-widest hover:bg-[#948181] transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-3xl"
          onClick={toggleMenu}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-24 bg-white z-40 md:hidden flex flex-col p-8 gap-8"
          >
            {navLinks.map((link) => (
              <NavLink 
                key={link.name}
                to={link.path} 
                onClick={toggleMenu}
                className="text-5xl font-bold uppercase tracking-tighter"
              >
                {link.name}
              </NavLink>
            ))}
            
            <div className="pt-8 border-t border-black/10">
              {!isAuthenticated ? (
                <NavLink to="/login" onClick={toggleMenu} className="text-4xl italic">Login</NavLink>
              ) : (
                <div className="flex flex-col gap-6">
                  <span className="text-3xl italic">{user?.username}</span>
                  <button
                    onClick={() => { logout(); toggleMenu(); }}
                    className="text-left text-2xl font-sans font-bold uppercase text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;