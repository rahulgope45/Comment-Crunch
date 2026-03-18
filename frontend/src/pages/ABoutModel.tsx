import React from 'react';
import { motion } from 'framer-motion';
import { BsArrowUpRight, BsCpu, BsDatabaseUp, BsShieldCheck } from 'react-icons/bs';
import { BiBarChart } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
// import { ShieldCheck, Cpu, Database, BarChart3, ArrowUpRight } from 'lucide-react';

interface ModelSpec {
  label: string;
  value: string;
  icon: React.ReactNode; 
}

const ModelDetailPage: React.FC = () => {
  const specs: ModelSpec[] = [
    { label: "Architecture", value: "RoBERTa-Base", icon: <BsCpu size={18} /> },
    { label: "Training Data", value: "124M Tweets", icon: <BsDatabaseUp size={18} /> },
    { label: "Task", value: "Sentiment Analysis", icon: <BiBarChart size={18} /> },
    { label: "Security", value: "Vetted Weights", icon: <BsShieldCheck size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-pink-50  font-['EB_Garamond',_serif] selection:bg-[#948181] selection:text-white">
      <main className="max-w-7xl mx-auto px-6 py-24">
        
        {/* Breadcrumb / Label */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-[#948181] uppercase tracking-[0.3em] text-xs mb-8 font-sans font-semibold"
        >
          <span className="w-8 h-[1px] bg-[#948181]"></span>
          Neural Engine / v2.1
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-7xl md:text-9xl font-bold leading-[0.85] tracking-tighter uppercase">
              RoBERTa <br />
              <span className="italic font-medium text-[#948181]">Latest</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-xl max-w-md font-sans leading-relaxed border-l border-white/10 pl-8 pb-2"
          >
            Optimized for the high-velocity linguistic shifts of social media. 
            The core intelligence driving the <span className="italic text-white">Comment-Crunch</span> ecosystem.
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Technical Deep Dive */}
          <div className="lg:col-span-8 space-y-16">
            <section>
              <h2 className="text-3xl italic mb-6">Semantic Precision</h2>
              <p className="text-2xl opacity-80 leading-snug max-w-2xl font-sans">
                Unlike generic BERT models, this RoBERTa iteration utilizes a dynamic masking pattern, 
                allowing it to understand contextual sarcasm and sentiment irony across 
                YouTube and Reddit comment structures.
              </p>
            </section>

            {/* Performance Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-garamond">
              <div className="p-8 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent rounded-lg">
                <p className="text-sm uppercase tracking-widest opacity-50 mb-2">Accuracy</p>
                <h4 className="text-5xl font-bold">94.8<span className="text-[#948181]">%</span></h4>
                <p className="mt-4 text-sm opacity-40">Benchmark against Twitter-2017-test dataset.</p>
              </div>
              <div className="p-8 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent rounded-lg">
                <p className="text-sm uppercase tracking-widest opacity-50 mb-2">Latency</p>
                <h4 className="text-5xl font-bold">12<span className="text-[#948181]">ms</span></h4>
                <p className="mt-4 text-sm opacity-40">Average inference time per token sequence.</p>
              </div>
            </div>
          </div>

          {/* Sidebar Info Card */}
          <div className="lg:col-span-4 text-gray-500">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#1a1a1a] border border-white/10 p-8 rounded-sm sticky top-12"
            >
              <h3 className="text-lg uppercase tracking-tighter font-bold mb-8 flex justify-between items-center">
                Manifest Details
                <BsArrowUpRight size={16} className="" />
              </h3>
              
              <div className="space-y-8">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1  opacity-80">{spec.icon}</div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-40 font-sans font-bold">{spec.label}</p>
                      <p className="text-lg italic">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 space-y-4 flex flex-col">
                <NavLink 
                to="/app"
                className="w-full sm:w-[150px] text-center p-2 bg-white text-black py-4 font-sans font-bold uppercase text-xs tracking-widest hover:bg-[#948181] hover:text-white transition-all duration-300">
                  Analyze Sample
                </NavLink>
                <a
                href='https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment-latest?text=Nice+video%0ANeed+Improvement+%0Aspeed+up+the+pace'
                className="w-full sm:w-[150px] text-center border border-white/20 py-4 font-sans font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-all">
                  View Source
                </a>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Footer Identifier */}
        <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 items-center opacity-30">
          <div className="text-5xl font-bold tracking-tighter uppercase">Crunch</div>
          <div className="font-sans text-[10px] tracking-[0.4em] uppercase">
            model_id: cardiffnlp/twitter-roberta-base-sentiment-latest
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ModelDetailPage;