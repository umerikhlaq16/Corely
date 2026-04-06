import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Layout, Cpu, Fingerprint, ArrowUpRight, Zap, ArrowRight, Globe, Code2, Sparkles } from 'lucide-react';

const PortfolioPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useTransform(smoothProgress, [0, 0.2], [1, 0.96]);
  const rotate = useTransform(smoothProgress, [0, 0.2], [0, -1]);
  
  const baseTransition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

  return (
    <div className="bg-[#F9F8F6] text-[#1a1a1a] selection:bg-orange-600 selection:text-white overflow-x-hidden font-sans">
      
      {/* --- CLEAN HERO SECTION --- */}
      <motion.section 
        style={{ scale, rotateZ: rotate }}
        className="relative pt-32 pb-32 px-6 md:px-20 z-0 flex flex-col items-center text-center origin-bottom"
      >
        <div className="max-w-[1100px] w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={baseTransition}
            className="mb-8 px-5 py-2 bg-orange-50 border border-orange-100 rounded-full inline-flex items-center gap-2"
          >
            <Sparkles size={12} className="text-orange-600" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">Available for 2026 Directives</p>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...baseTransition, delay: 0.1 }}
            className="text-[13vw] md:text-[8vw] font-black leading-[0.82] tracking-tighter uppercase"
          >
            ENGINEERING <br /> 
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ...baseTransition, delay: 0.4 }}
              className="italic font-serif font-light text-orange-600 lowercase"
            >
              high-performance
            </motion.span> ASSETS.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-16 flex flex-col md:flex-row items-center justify-center gap-12"
          >
            <p className="text-gray-500 text-sm md:text-xl max-w-md leading-relaxed text-center md:text-left font-medium">
              Specializing in MERN architecture and autonomous AI agents. Delivering scalable digital infrastructure for modern enterprises.
            </p>
            <div className="h-24 w-[1px] bg-gray-200 hidden md:block"></div>
            <div className="flex flex-col items-start">
               <span className="text-5xl font-black tracking-tighter italic font-serif text-orange-600">2026</span>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Current Roadmap</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- CAPABILITIES GRID --- */}
      <section className="relative z-10 bg-white rounded-t-[4rem] md:rounded-t-[6rem] px-6 md:px-20 py-32 shadow-[0_-50px_100px_rgba(0,0,0,0.03)] border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          
          <RevealText>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
              <div className="max-w-xl">
                <p className="text-orange-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Core Expertise</p>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">Strategic <br /> Solutions.</h2>
              </div>
              <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-300">
                <span>Scalability</span>
                <span>Automation</span>
                <span>Growth</span>
              </div>
            </div>
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Feature Card: AI */}
            <BentoCard className="md:col-span-8 bg-[#F9F8F6] border-none group">
              <div className="flex flex-col h-full justify-between p-12 md:p-16 min-h-[500px]">
                <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-black/5 group-hover:bg-orange-600 group-hover:text-white transition-all duration-700">
                  <Cpu size={32} />
                </div>
                <div>
                  <h3 className="text-5xl font-black tracking-tighter mb-6 uppercase">Agentic AI <br/> Orchestration</h3>
                  <p className="text-gray-500 max-w-sm text-lg leading-snug font-medium">Deploying autonomous systems that handle decision-making and multi-step business tasks with LLM precision.</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                 <Cpu size={300} className="rotate-12" />
              </div>
            </BentoCard>

            {/* Feature Card: MERN */}
            <BentoCard className="md:col-span-4 bg-[#1a1a1a] text-white border-none group">
              <div className="flex flex-col h-full justify-between p-12 min-h-[500px]">
                <div className="flex justify-between items-start">
                   <div className="w-14 h-14 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-center">
                    <Code2 size={24} className="text-orange-500" />
                   </div>
                   <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowUpRight size={20} />
                   </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black tracking-tighter mb-4 uppercase italic">MERN <br/> Performance</h3>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Full-Stack Ecosystems</p>
                </div>
              </div>
            </BentoCard>

            {/* Feature Card: UI/UX */}
            <BentoCard className="md:col-span-4 bg-white border border-gray-100 group">
               <div className="p-12 flex flex-col h-full justify-between min-h-[450px]">
                  <Layout size={40} className="text-orange-600" />
                  <div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase">Intuitive <br /> Design</h3>
                    <p className="text-gray-400 mt-4 font-serif italic text-xl leading-tight">Human-centric interfaces that convert users into loyalists.</p>
                  </div>
               </div>
            </BentoCard>

            {/* Feature Card: Ecommerce Logic */}
            <BentoCard className="md:col-span-8 bg-orange-600 text-white border-none group overflow-hidden">
               <div className="p-12 md:p-16 relative z-10 flex flex-col md:flex-row h-full items-center justify-between gap-12 min-h-[450px]">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <Fingerprint size={24} className="text-white/40" />
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Business Logic Specialist</span>
                    </div>
                    <h3 className="text-6xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">Scalable <br /> Commerce.</h3>
                    <p className="text-white/80 max-w-sm text-lg font-medium leading-tight">Custom e-commerce infrastructure featuring personalized logic and high-conversion checkout flows.</p>
                  </div>
                  <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 border-[15px] border-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                    <ArrowRight size={60} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
            </BentoCard>
          </div>
        </div>
      </section>

      {/* --- GLOBAL SECTION --- */}
      <section className="bg-white px-6 md:px-20 py-24 border-y border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white">
               <Globe size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Operating from Lahore, Pakistan / Remote Worldwide</span>
         </div>
         <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
            <span>Development</span>
            <span>Architecture</span>
            <span>AI Agents</span>
         </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="bg-white py-40 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[1300px] mx-auto overflow-hidden bg-[#1a1a1a] rounded-[4rem] md:rounded-[6rem] py-32 px-10 text-center relative group"
        >
          <a href="/talk" className="absolute inset-0 z-20" />
          
          <div className="relative z-10 space-y-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <Zap size={40} className="text-orange-500 mx-auto" />
            </motion.div>

            <h2 className="text-[11vw] md:text-[9vw] font-black tracking-tighter leading-none text-white transition-all duration-700 group-hover:tracking-tight uppercase italic">
              LET'S BUILD
            </h2>

            <div className="flex flex-col items-center gap-4">
               <p className="text-gray-500 font-black tracking-[0.5em] uppercase text-[10px]">Secure your next project</p>
               <div className="h-[2px] w-20 bg-orange-600 transition-all duration-500 group-hover:w-40" />
            </div>
          </div>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-orange-600 rounded-full blur-[150px]" />
          </div>
        </motion.div>
      </section>

      {/* --- MINIMAL FOOTER --- */}
      <footer className="bg-[#F9F8F6] pt-20 pb-10 px-8 md:px-20">
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-12 gap-8">
            <div className=" gap-2 items-center md:items-start">
               <p className="text-[10px] font-black uppercasec  tracking-widest text-gray-400">© 2026 Corely — Developed by Umer Akhlaq</p>
            </div>
          
         </div>
      </footer>
    </div>
  );
};

// --- HELPERS ---

const BentoCard = ({ children, className }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={`relative group overflow-hidden rounded-[3rem] md:rounded-[4.5rem] transition-all duration-500 border border-transparent ${className}`}
  >
    {children}
  </motion.div>
);

const RevealText = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} style={{ 
      transform: isInView ? "none" : "translateY(50px)",
      opacity: isInView ? 1 : 0,
      transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
    }}>
      {children}
    </div>
  );
};

export default PortfolioPage;