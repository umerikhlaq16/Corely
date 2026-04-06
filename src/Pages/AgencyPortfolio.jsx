import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiActivity, FiTarget, FiZap, FiPlus } from 'react-icons/fi';

const AgencyPortfolio = () => {
  // Horizontal Scroll Setup
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const projects = [
    { id: "01", title: "Neural CRM", category: "Agentic AI", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000" },
    { id: "02", title: "SkyMesh Cloud", category: "Architecture", img: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=1000" },
    { id: "03", title: "BioSync App", category: "Health-Tech", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000" },
    { id: "04", title: "Nexus OS", category: "Systems", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000" },
  ];

  return (
    <div className="bg-white text-[#121212] selection:bg-[#FF4D00] selection:text-white antialiased">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <div className="max-w-[1600px] w-full">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
          >
            <span className="flex items-center gap-2 text-[#FF4D00] font-bold text-[10px] uppercase tracking-[0.4em] mb-8">
              <span className="w-8 h-[1px] bg-[#FF4D00]"></span> Engineering the Future
            </span>
            <h1 className="text-[14vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase">
              Beyond <br /> 
              <span className="text-neutral-200">Interface.</span>
            </h1>
          </motion.div>

          <div className="mt-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="max-w-md text-lg text-neutral-500 font-medium leading-relaxed"
            >
              We are a boutique engineering agency crafting high-performance digital ecosystems for the next generation of founders.
            </motion.p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <button className="bg-[#121212] text-white px-10 py-6 rounded-full flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:bg-[#FF4D00] transition-colors duration-300">
                 Explore Work <FiArrowRight />
               </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- STATS GRID --- */}
      <section className="py-24 px-6 md:px-12 lg:px-24 border-y border-neutral-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {[
            { val: "120+", lab: "Projects Built" },
            { val: "99.9%", lab: "Uptime SLA" },
            { val: "24/7", lab: "AI Monitoring" },
            { val: "15+", lab: "Design Awards" },
          ].map((s, i) => (
            <div key={i} className="group">
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-2 group-hover:text-[#FF4D00] transition-colors">{s.val}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{s.lab}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- HORIZONTAL PORTFOLIO (FIXED SPACE) --- */}
      <section ref={scrollRef} className="relative h-[250vh] bg-[#121212]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="px-6 md:px-12 lg:px-24 mb-12 flex justify-between items-end">
            <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter">
              Featured <br /> <span className="text-[#FF4D00]">Work</span>
            </h2>
            
          </div>

          <motion.div style={{ x: springX }} className="flex gap-8 px-6 md:px-12 lg:px-24">
            {projects.map((p) => (
              <div key={p.id} className="relative shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] aspect-[4/5] md:aspect-square group overflow-hidden bg-neutral-900 rounded-2xl">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                   <p className="text-[#FF4D00] text-[10px] font-bold uppercase tracking-widest mb-2">{p.category}</p>
                   <h3 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-tight">{p.title}</h3>
                </div>
                <div className="absolute top-10 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiArrowUpRight size={20} />
                </div>
              </div>
            ))}
            {/* Empty space at the end to prevent abrupt stop */}
            <div className="shrink-0 w-[20vw]" />
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES: CLEAN BENTO --- */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
            <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Modern Day <br /> <span className="text-[#FF4D00]">Solutions.</span>
            </h2>
            <p className="text-xl text-neutral-500 font-medium leading-relaxed">
              We operate at the intersection of high-end design and scalable engineering. 
              Our systems are built to perform under pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FiTarget />, title: "Strategy", desc: "Digital blueprints that align with your business goals and scale." },
              { icon: <FiZap />, title: "Development", desc: "Ultra-fast, clean, and scalable codebases using the latest stacks." },
              { icon: <FiActivity />, title: "Intelligence", desc: "Integrating LLMs and Agentic AI into your core workflows." }
            ].map((service, i) => (
              <div key={i} className="group p-12 bg-white border border-neutral-100 rounded-[2rem] hover:border-[#FF4D00] transition-all duration-500">
                <div className="mb-8 text-4xl text-[#FF4D00]">{service.icon}</div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4 flex items-center justify-between">
                  {service.title} <FiPlus className="opacity-20 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-neutral-400 font-medium">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT CTA --- */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto bg-[#121212] rounded-[3rem] p-12 md:p-32 text-center relative overflow-hidden">
          {/* Animated Background Shape */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-50%] left-[-20%] w-full h-full bg-[#FF4D00]/10 blur-[120px] rounded-full"
          />
          
          <h2 className="relative z-10 text-white text-5xl md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-12">
            Let's build <br /> your <span className="text-[#FF4D00]">Empire.</span>
          </h2>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="relative z-10 bg-[#FF4D00] text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] transition-all"
          >
            Get in touch
          </motion.button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 md:px-12 lg:px-24 bg-white border-t border-neutral-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black tracking-tighter">CORELY<span className="text-[#FF4D00]">.</span></div>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            <a href="https://www.linkedin.com/in/umer-ikhlaq-25b376345/" className="hover:text-black transition-colors">LinkedIn</a>
            <a href="https://www.behance.net/umerikhlaq" className="hover:text-black transition-colors">Behance</a>
            <a href="https://github.com/umerikhlaq16" className="hover:text-black transition-colors">GitHub</a>
          </div>
          <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">© 2026 Corely — Developed by Umer Akhlaq</p>
        </div>
      </footer>
    </div>
  );
};

export default AgencyPortfolio;