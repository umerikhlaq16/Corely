import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';

const FooterCTA = () => {
  return (
    <div className="relative">
      {/* FOOTER WRAPPER: Sticky effect intact */}
      <footer className="sticky bottom-0 h-screen w-full bg-[#0f0f0f] flex flex-col justify-between p-8 md:p-20 -z-10 text-white overflow-hidden">
        
        {/* --- MAIN HEADER SECTION --- */}
        <div className="mt-12 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col space-y-4"
          >
            <h2 className="text-6xl md:text-[9vw] font-medium leading-[0.9] tracking-tighter">
              LET'S BUILD <br />
              <span className="text-orange-600 italic">SOMETHING</span> BOLD
            </h2>

            {/* BUTTON WITH ENHANCED ANIMATION */}
            <div className="mt-8">
              <motion.a
                href="mailto:hello@webaurix.com"
                className="group relative inline-flex items-center gap-6 px-10 py-5 bg-white text-black overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Animated Background Overlay */}
                <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
                
                <span className="relative z-10 text-lg md:text-xl font-black uppercase tracking-tighter group-hover:text-white transition-colors duration-300">
                  Get in touch
                </span>
                
                <motion.div 
                  className="relative z-10 p-1 bg-black group-hover:bg-white transition-colors duration-300"
                  whileHover={{ rotate: 45 }}
                >
                   <ArrowUpRight size={22} className="text-white group-hover:text-orange-600 transition-colors" />
                </motion.div>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* --- BOTTOM SECTION: CLEANED UP --- */}
        <div className="w-full mb-12">
          <div className="flex flex-col items-center justify-center gap-4 border-t border-white/5 pt-12">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[10px] tracking-[0.4em] text-gray-500 uppercase hover:text-orange-600 transition-all mb-4"
            >
              Back to top ↑
            </button>
            
            {/* CENTERED COPYRIGHT & BRANDING */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] uppercase font-light text-gray-400">
                <span>© 2026</span>
                <span className="w-1 h-1 bg-orange-600 rounded-full"></span>
                <span className="text-white font-bold tracking-[0.3em]">CORELY</span>
              </div>
              <p className="text-[10px] md:text-xs tracking-[0.5em] text-gray-600 uppercase">
                Developed by <span className="text-gray-400 hover:text-orange-600 transition-colors cursor-default">Umer Akhlaq</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Spacer to allow the sticky footer to reveal properly without clipping */}
      <div className="h-screen bg-transparent pointer-events-none"></div>
    </div>
  );
};

export default FooterCTA;