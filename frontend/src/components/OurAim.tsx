import React from 'react';
import { motion } from 'framer-motion';

const OurAim: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-stone-300 flex items-center justify-center px-6 py-20 font-['EB_Garamond',_serif]">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        /* Container: Flex-col on mobile, Flex-row on desktop */
        className="w-full max-w-6xl bg-neutral-200 rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden flex flex-col md:flex-row items-center p-8 md:p-12 gap-12"
      >
        
        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src="/Ouraim.jpg"
            alt="Our Vision"
            className="rounded-[30px] w-full max-w-[450px] aspect-[4/5] object-cover shadow-xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#948181] uppercase tracking-[0.3em] text-xs font-sans font-bold mb-4"
          >
            Our Mission
          </motion.span>
          
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase italic mb-8 leading-none">
            Our Aim
          </h2>
          
          <div className="space-y-6">
            <p className="text-xl md:text-2xl font-normal leading-tight opacity-80">
              At our core, we strive to make online conversations more transparent and meaningful. 
              Our aim is to empower creators, businesses, and viewers by uncovering 
              the <span className="text-[#948181] italic">true voice</span> of audiences through sentiment analysis.
            </p>
            
            <p className="font-sans text-base md:text-lg opacity-60 leading-relaxed max-w-md">
              By transforming raw YouTube comments into clear, actionable insights, 
              we help users understand how people feel, what they value, and where 
              conversations are heading.
            </p>
          </div>

          <motion.div 
            className="mt-10 w-24 h-[1px] bg-[#948181]"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </div>

      </motion.div>
    </div>
  );
}

export default OurAim;