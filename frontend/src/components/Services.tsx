import React from 'react';
import { motion } from 'framer-motion';

type DataItem = {
  icon: string;
  title: string;
  content: string;
};

const data: DataItem[] = [
  {
    icon: "/icon3.png",
    title: "Comparative Analysis",
    content: "Compare sentiment across multiple videos to identify patterns.",
  },
  {
    icon: "/icon2.png",
    title: "Engagement Metrics",
    content: "Track comment volume, frequency, and sentiment shifts over time.",
  },
  {
    icon: "/icon1.png",
    title: "Topic Insights",
    content: "Identify trending words, recurring themes, and emotional triggers.",
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-stone-20 font-['EB_Garamond',_serif]">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12 sm:mb-16 lg:mb-20 text-center"
        >
          <span className="text-[#948181] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-xs font-sans font-bold mb-3 sm:mb-4">
            Capabilities
          </span>

          {/* Scales nicely across screens */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase italic">
            Services
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-20">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="flex flex-col items-center p-6 sm:p-8 bg-[#fdfdfd] border border-black/5 rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all duration-500 group"
            >
              {/* Icon */}
              <div className="relative mb-6 sm:mb-8">
                <div className="absolute inset-0 bg-[#948181]/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500"></div>
                
                <img
                  src={item.icon}
                  alt={item.title}
                  className="relative 
                    w-20 h-20 
                    sm:w-24 sm:h-24 
                    md:w-28 md:h-28 
                    lg:w-32 lg:h-32 
                    rounded-full  p-3 sm:p-1 shadow-sm"
                />
              </div>

              {/* Content */}
              <div className="text-center space-y-3 sm:space-y-4">
                <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight uppercase">
                  {item.title}
                </h3>

                <p className="font-sans text-sm sm:text-base md:text-base lg:text-lg opacity-60 leading-relaxed">
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;