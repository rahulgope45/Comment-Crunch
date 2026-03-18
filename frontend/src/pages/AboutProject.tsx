import React from 'react';
import { motion } from 'framer-motion';
import { SiGithub, SiX } from 'react-icons/si';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { FiCpu, FiTarget, FiLayers, FiLinkedin } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black font-['EB_Garamond',_serif] selection:bg-black selection:text-white">
      <main className="max-w-6xl mx-auto px-8 py-24">
        
        {/* Hero Section */}
        <section className="mb-32">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col text-6xl md:text-[10rem] font-bold leading-[0.8] tracking-tighter uppercase mb-12"
          >
            Decoding <br /> 
            <span className="italic font-medium text-black/40">Context.</span>
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start font-sans">
            <p className="text-2xl leading-tight font-light">
              Comment-Crunch is a dual-model intelligence platform designed to extract meaning 
              from the noise of digital discourse.
            </p>
            <div className="flex gap-6 text-2xl pt-2">
              <a href="https://x.com/Rahul26664125" className="hover:opacity-50 transition-opacity"><SiX /></a>
              <a href="https://github.com/rahulgope45" className="hover:opacity-50 transition-opacity"><SiGithub /></a>
              <a href="https://www.linkedin.com/in/rahul-gope-808476369" className="hover:opacity-50 transition-opacity"><FiLinkedin /></a>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-16 py-24 border-y border-black/10">
          <div className="md:col-span-4">
            <h2 className="text-sm uppercase tracking-[0.3em] font-sans font-bold opacity-40">The Mission</h2>
          </div>
          <div className="md:col-span-8 space-y-12">
            <h3 className="text-5xl leading-none italic">
              "We believe that every comment is a data point in a larger cultural narrative."
            </h3>
            <p className="font-sans text-xl opacity-70 leading-relaxed max-w-2xl">
              By utilizing the CardiffNLP RoBERTa architecture, we provide deep-layer sentiment analysis 
              that goes beyond "positive" or "negative." We identify intent, sarcasm, and the 
              shifting patterns of community engagement on platforms like YouTube and Reddit.
            </p>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="py-32 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <FiCpu className="text-4xl" />
            <h4 className="text-3xl font-bold uppercase tracking-tighter">Neural Logic</h4>
            <p className="font-sans opacity-60">Leveraging state-of-the-art Transformer models for high-fidelity NLP processing.</p>
          </div>
          <div className="space-y-6">
            <FiLayers className="text-4xl" />
            <h4 className="text-3xl font-bold uppercase tracking-tighter">Dual Model</h4>
            <p className="font-sans opacity-60">Cross-referencing datasets from disparate platforms to find universal truths.</p>
          </div>
          <div className="space-y-6">
            <FiTarget className="text-4xl" />
            <h4 className="text-3xl font-bold uppercase tracking-tighter">Pure UX</h4>
            <p className="font-sans opacity-60">Minimalist interfaces that let the data speak for itself without distraction.</p>
          </div>
        </section>

        {/* CTA Section */}
        <NavLink 
        to="/app"
        className="bg-black text-white p-12 md:p-24 flex flex-col md:flex-row justify-between items-center group cursor-pointer">
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter italic">
            Start Crunching
          </h2>
          <HiOutlineArrowNarrowRight className="text-7xl group-hover:translate-x-4 transition-transform duration-500" />
        </NavLink>

        

      </main>
    </div>
  );
};

export default AboutPage;