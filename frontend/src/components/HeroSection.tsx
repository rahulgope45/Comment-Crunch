import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] py-12 px-4 text-black bg-white font-['EB_Garamond',_serif] overflow-hidden">
      
      {/* Small Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="px-4 py-1.5 border border-black/10 rounded-full font-sans text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold opacity-60">
          For Creators & Agencies
        </span>
      </motion.div>

      {/* Main Heading - Using responsive text scaling */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center font-bold text-[clamp(2.5rem,10vw,5.625rem)] leading-[1] md:leading-[0.9] tracking-tighter uppercase mb-8 px-2 w-full max-w-5xl"
      >
        Know Your Community<br className="hidden sm:block" />
        <span className="italic font-medium text-[#948181]"> Better With</span><br className="hidden sm:block" />
        Comment Crunch
      </motion.h1>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <NavLink 
          to="/app"
          className="group relative flex items-center justify-center w-[200px] sm:w-[220px] h-[55px] sm:h-[60px] bg-black text-white overflow-hidden transition-all duration-500"
        >
          <span className="relative z-10 font-sans font-bold uppercase text-[10px] sm:text-xs tracking-widest flex items-center gap-3">
            Start Now 
            <HiOutlineArrowNarrowRight className="text-xl group-hover:translate-x-2 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 bg-[#948181] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </NavLink>
      </motion.div>

      {/* Asset Display - Fixed for real mobile responsiveness */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative w-full max-w-[900px] flex justify-center px-2"
      >
        <div className="absolute -inset-4 bg-[#948181]/10 blur-3xl rounded-full opacity-50"></div>
        <img
          src="/saphire.gif"
          alt="Visual Intelligence"
          
          className="relative h-full w-full sm:h-[200px] sm:w-[800px] aspect-video object-cover rounded-2xl shadow-2xl shadow-blue-900 "
        />
      </motion.div>
      
    </div>
  );
};

export default HeroSection;