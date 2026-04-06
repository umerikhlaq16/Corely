import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiFilter, FiPlus } from 'react-icons/fi';

const WorkPage = () => {
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = ['All', 'Web App', 'AI Agents', 'E-Commerce', 'Branding'];

  const projects = [
    {
      id: 1,
      title: "Nexus AI Interface",
      category: "AI Agents",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
      size: "large" // Takes more space
    },
    {
      id: 2,
      title: "Solana NFT Marketplace",
      category: "Web App",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
      size: "small"
    },
    {
      id: 3,
      title: "Urban Kicks Store",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop",
      size: "small"
    },
    {
      id: 4,
      title: "Aura Branding Lab",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1601049676039-2533359f131a?q=80&w=1000&auto=format&fit=crop",
      size: "large"
    },
    {
      id: 5,
      title: "HealthTrack Pro",
      category: "Web App",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
      size: "small"
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#121212] font-sans selection:bg-[#FF4D00] selection:text-white">
      
      {/* --- HEADER --- */}
      <section className="px-8 md:px-20 pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h1 className="text-8xl md:text-[10rem] font-bold tracking-tighter leading-none">
              WORK<span className="text-[#FF4D00]">.</span>
            </h1>
            <p className="text-gray-400 font-medium tracking-widest uppercase text-[10px]">
              Selected projects / 2024 — 2026
            </p>
          </motion.div>

          {/* Filter System */}
          <div className="flex flex-wrap gap-4 border-b border-gray-100 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] font-black uppercase tracking-widest pb-2 transition-all relative ${
                  filter === cat ? 'text-[#FF4D00]' : 'text-gray-400 hover:text-[#121212]'
                }`}
              >
                {cat}
                {filter === cat && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF4D00]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- MASONRY GRID --- */}
      <section className="px-8 md:px-20 pb-40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`group relative overflow-hidden rounded-[2.5rem] bg-gray-100 ${
                  project.size === 'large' ? 'md:col-span-2 h-[500px] md:h-[700px]' : 'h-[500px]'
                }`}
              >
                {/* Project Image */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12 text-white">
                  <div className="space-y-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF4D00]">
                      {project.category}
                    </span>
                    <div className="flex justify-between items-center">
                      <h3 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h3>
                      <div className="w-16 h-16 rounded-full bg-white text-[#121212] flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-500 shadow-2xl">
                        <FiArrowUpRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Tag (Visible without hover) */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:opacity-0 transition-opacity">
                  <FiPlus />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <footer className="py-20 text-center border-t border-gray-100">
        <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-6">Have a vision?</p>
        <a href="/talk" className="text-5xl md:text-7xl font-bold hover:text-[#FF4D00] transition-colors tracking-tighter">
          START A PROJECT <FiArrowUpRight className="inline ml-4" />
        </a>
      </footer>
    </div>
  );
};

export default WorkPage;