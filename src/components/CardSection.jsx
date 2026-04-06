import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Layout, Cpu, Plus } from 'lucide-react';

const CardSection = ({ fadeInUp }) => {
  const services = [
    {
      id: '01',
      icon: Layout,
      title: 'UI/UX',
      subTitle: 'Design',
      italicTitle: 'Digital Journeys',
      desc: 'Crafting intuitive digital paths through deep user research and pixel-perfect execution.',
    },
    {
      id: '02',
      icon: Cpu,
      title: 'Engineering',
      subTitle: 'Scalable',
      italicTitle: 'Modern Architectures',
      desc: 'High-performance web applications built with robust, future-proof codebases.',
    },
    {
      id: '03',
      icon: Globe,
      title: 'Brand',
      subTitle: 'Global',
      italicTitle: 'Visual Storytelling',
      desc: 'Identity that captures core values and projects them powerfully to the world stage.',
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const smoothTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

  return (
    <section className="relative z-10 px-4 md:px-10 py-12">
      {/* MAIN CONTAINER: No extra outer BG, just the clean white card */}
      <div className="bg-white rounded-[32px] md:rounded-[60px] shadow-[0_30px_80px_rgba(0,0,0,0.03)] px-6 md:px-16 py-16 md:py-24 overflow-hidden border border-black/[0.03]">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 md:mb-32">
          <motion.div {...fadeInUp} className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-orange-600"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-orange-600 font-bold">
                Capabilities
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-[#1a1a1a] leading-tight">
              Bold ideas, <br />
              <span className="text-gray-400 font-light italic">Digital Reality.</span>
            </h2>
          </motion.div>
          
          <motion.div {...fadeInUp} className="md:w-[30%] text-gray-500 text-base leading-relaxed">
            <p>
              We bridge complex engineering with human-centric design for high-performance results.
            </p>
          </motion.div>
        </div>

        {/* --- SERVICES LIST --- */}
        <div className="border-t border-black/[0.05]">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={service.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-12 border-b border-black/[0.05] cursor-pointer transition-all duration-500"
              >
                {/* Background Highlight: Subtle & Clean */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      layoutId="hoverHighlight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#fafafa] -z-10"
                      transition={smoothTransition}
                    />
                  )}
                </AnimatePresence>

                {/* Left Side: ID & Content */}
                <div className="flex items-center gap-6 md:gap-12 flex-1">
                  <span className="text-[10px] font-bold text-gray-300 font-mono">
                    {service.id}
                  </span>
                  
                  <div className="flex flex-col">
                    <h3 className="text-3xl md:text-4xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-orange-600">
                      {service.title} <span className="font-light text-gray-300">{service.subTitle}</span>
                    </h3>
                    <p className="text-sm md:text-base italic font-serif text-gray-400 mt-1">
                      {service.italicTitle}
                    </p>
                  </div>
                </div>

                {/* Middle: Description (Refined font size) */}
                <div className="hidden lg:block w-[28%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                {/* Right Side: Simple Plus Icon */}
                <div className="absolute right-0 md:static mt-4 md:mt-0">
                   <motion.div
                    animate={{ 
                      rotate: isHovered ? 45 : 0,
                      backgroundColor: isHovered ? "#ea580c" : "transparent",
                      color: isHovered ? "#fff" : "#d1d1d1",
                      borderColor: isHovered ? "#ea580c" : "#e5e5e5"
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-300"
                   >
                     <Plus size={20} strokeWidth={1.5} />
                   </motion.div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CardSection;