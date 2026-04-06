import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiArrowUpRight, FiZap, FiLayers, FiCpu, FiGlobe, FiChevronRight } from 'react-icons/fi';

const CreativeLanding = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Smoother scroll physics for the background parallax
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const xLeft = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const xRight = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 45]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const services = [
    { id: "01", title: "Agentic AI", icon: <FiCpu />, desc: "Autonomous AI agents that think, reason, and execute complex workflows." },
    { id: "02", title: "MERN Apps", icon: <FiLayers />, desc: "Scalable, high-performance web ecosystems with military-grade architecture." },
    { id: "03", title: "Cloud Arch", icon: <FiGlobe />, desc: "Serverless and distributed systems built for 99.9% uptime and global scale." }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-[#FF4D00] selection:text-white font-sans overflow-x-hidden">
      
      {/* --- PREMIUM GRAIN OVERLAY --- */}
      <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.03] contrast-150" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col justify-center items-center px-8 overflow-hidden">
        {/* Background Scrolling Text (Decorative) */}
        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-[0.02] select-none">
          <motion.h1 style={{ x: xLeft }} className="text-[25vw] font-black leading-none whitespace-nowrap">ENGINEERING ASSETS</motion.h1>
          <motion.h1 style={{ x: xRight }} className="text-[25vw] font-black leading-none whitespace-nowrap">DIGITAL FUTURE</motion.h1>
        </div>

        <div className="relative z-10 max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block py-2 px-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF4D00] mb-8">
              Your ambition meets our execution
            </span>
            
            <h2 className="text-6xl md:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase mb-12">
              Architecting <br /> 
              <span className="text-[#FF4D00] italic font-serif font-light lowercase tracking-normal">autonomous</span> <br />
              Intelligence.
            </h2>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-12">
              <p className="text-lg md:text-xl text-zinc-400 max-w-xl font-medium leading-relaxed">
                We bridge the gap between human intuition and machine execution through custom Agentic AI and high-end full-stack engineering.
              </p>
              
              <motion.div style={{ rotate }} className="hidden md:block">
                <div className="w-32 h-32 rounded-full border border-zinc-800 flex items-center justify-center group cursor-pointer hover:border-[#FF4D00] transition-colors duration-500">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-black group-hover:bg-[#FF4D00] group-hover:text-white transition-all duration-500">
                    <FiArrowUpRight size={40} />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
           <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-zinc-500 to-transparent"></div>
           <span className="text-[8px] uppercase tracking-[0.5em] text-zinc-500">Scroll</span>
        </div>
      </section>

      {/* --- SERVICES: BENTO BOX --- */}
      <section className="py-32 px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Feature */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }}
            className="md:col-span-2 relative group overflow-hidden bg-zinc-900 rounded-[2.5rem] p-12 flex flex-col justify-between min-h-[500px]"
          >
            <div className="absolute top-0 right-0 p-12 text-[#FF4D00] opacity-20 group-hover:opacity-100 transition-opacity">
              <FiZap size={120} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#FF4D00] mb-4">Core Competency</h3>
              <h4 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">AGENTIC<br/>FLOWS</h4>
            </div>
            <div className="max-w-md">
              <p className="text-zinc-400 text-lg mb-8">Deploying sophisticated AI agents that automate multi-step business logic with zero human intervention.</p>
              <button className="group flex items-center gap-4 text-xs font-black uppercase tracking-widest">
                Explore the tech <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Secondary Features Stack */}
          <div className="flex flex-col gap-6">
            {services.slice(1).map((s, i) => (
              <motion.div 
                key={s.id}
                whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 20 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex-1 bg-zinc-900/50 border border-white/5 hover:border-[#FF4D00]/50 transition-all rounded-[2.5rem] p-10 group"
              >
                <div className="text-[#FF4D00] mb-6 text-2xl p-4 bg-zinc-800 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h5 className="text-2xl font-bold uppercase mb-3 tracking-tighter">{s.title}</h5>
                <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE MARQUEE: SKEWED --- */}
      <div className="py-10 bg-[#FF4D00] -rotate-1 scale-105 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="flex gap-20 items-center pr-20"
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="text-4xl font-black uppercase tracking-tighter text-black">High Performance Engineering</span>
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- BIG CALL TO ACTION --- */}
      <section className="relative py-60 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF4D00]/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }}
            className="text-7xl md:text-[12vw] font-black tracking-tighter uppercase mb-16 leading-none"
          >
            LET'S <br/> <span className="text-[#FF4D00]">BUILD.</span>
          </motion.h2>
          
          <motion.a 
            href="mailto:hello@umer.tech"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-6 bg-white text-black text-sm font-black uppercase tracking-widest rounded-full hover:bg-[#FF4D00] hover:text-white transition-colors duration-300"
          >
            Start a Conversation
          </motion.a>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-8 md:px-20 border-t border-white/5 bg-zinc-950">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="max-w-xs">
            <div className="text-3xl font-black tracking-tighter mb-6">Corely<span className="text-[#FF4D00]">.</span></div>
            <p className="text-zinc-500 text-sm">Engineering high-end digital products for the next generation of tech startups.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-20">
            <div>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-6">Socials</p>
              <ul className="flex flex-col gap-4 text-sm font-bold">
                {['LinkedIn', 'GitHub', 'X-Twitter', 'Instagram'].map(social => (
                  <li key={social}><a href="#" className="hover:text-[#FF4D00] transition-colors">{social}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto mt-40 pt-8 border-t border-white/5 flex justify-between text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
          <span>© 2026 Corely - Developed by Umer Akhlaq </span>
          <span className="hidden md:block italic">Crafted with precision & passion</span>
          <span>Legal / Privacy</span>
        </div>
      </footer>

    </div>
  );
};

export default CreativeLanding;