import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const WhyUs: React.FC = () => {
    const list1 = ["Accurate Sentiment Analysis", "Easy to Use", "Actionable Insights"];
    const list2 = ["Scalable for Any Need", "Professional Reports", "Secure & Reliable"];

    return (
        <section className="py-24 px-6 bg-white font-['EB_Garamond',_serif] overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col items-center">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-4">
                        Why Choose Us?
                    </h2>
                    <p className="font-sans text-lg md:text-xl opacity-60 max-w-2xl mx-auto">
                        We combine creativity and strategy to deliver results that matter.
                    </p>
                </motion.div>

                {/* Staggered Cards Container */}
                {/* Cards Container */}
                <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-12 relative">

                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:-mt-10 p-5 md:p-12 bg-black text-white rounded-[24px] md:rounded-[40px] shadow-2xl flex flex-col justify-center gap-4 md:gap-8 min-h-[220px] md:min-h-[400px]"
                    >
                        {list1.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 md:gap-4 group">
                                <FiCheckCircle className="text-[#948181] text-lg md:text-2xl shrink-0 group-hover:scale-125 transition-transform" />
                                <p className="text-sm md:text-2xl font-medium tracking-tight">{item}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:mt-10 p-5 md:p-12 bg-[#948181] text-white rounded-[24px] md:rounded-[40px] shadow-2xl flex flex-col justify-center gap-4 md:gap-8 min-h-[220px] md:min-h-[400px]"
                    >
                        {list2.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 md:gap-4 group">
                                <FiCheckCircle className="text-black text-lg md:text-2xl shrink-0 group-hover:scale-125 transition-transform" />
                                <p className="text-sm md:text-2xl font-medium tracking-tight">{item}</p>
                            </div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default WhyUs;