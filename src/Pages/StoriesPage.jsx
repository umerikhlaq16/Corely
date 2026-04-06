import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiClock, FiLayers } from 'react-icons/fi';

const StoriesPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const stories = [
    {
      id: 1,
      category: "Agentic AI",
      title: "Automating Sales for Global SaaS",
      description: "Humne ek custom AI SDR banaya jisne manual outreach ko 90% kam kar diya aur conversion rates ko 3x boost kiya.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
      tags: ["OpenAI", "Node.js", "Automation"],
      stats: "300% Growth"
    },
    {
      id: 2,
      category: "E-Commerce",
      title: "Sticky Icky 2.0: The Relaunch",
      description: "Ek interactive sticker store jahan 'Build Your Own Box' feature ne customer engagement ko next level par pahuncha diya.",
      image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=1000&auto=format&fit=crop",
      tags: ["React", "Framer Motion", "Shopify"],
      stats: "50k+ Orders"
    },
    {
      id: 3,
      category: "Web App",
      title: "FinTech Dashboard for Modern Teams",
      description: "Complex data ko simple aur clean UI mein convert kiya taaki teams apni financial health ek glance mein dekh sakein.",
      image: "/Mock/3.jpg",
      tags: ["Dashboard", "UI/UX", "MERN"],
      stats: "12ms Latency"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#121212] font-sans selection:bg-[#FF4D00] selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="px-8 md:px-20 pt-28 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-[#FF4D00]">
              <span className="w-12 h-[1px] bg-[#FF4D00]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Our Impact</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85]">
              STORIES OF <br /> <span className="italic font-light serif text-gray-300">Success.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-xl leading-relaxed pt-4">
              Hum sirf code nahi likhte, hum results deliver karte hain. Dekhiye kaise humne ideas ko profitable digital products mein badla.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- STORIES GRID --- */}
      <section className="px-8 md:px-20 pb-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 gap-32">
          {stories.map((story, index) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
            >
              {/* Image side */}
              <div className="w-full lg:w-3/5 group cursor-pointer overflow-hidden rounded-[2rem] bg-gray-100">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-[400px] md:h-[600px] object-cover"
                />
              </div>

              {/* Content side */}
              <div className="w-full lg:w-2/5 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {story.category}
                    </span>
                    <span className="text-[10px] font-bold text-[#FF4D00] uppercase tracking-widest flex items-center gap-2">
                      <FiClock /> 2026 Project
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight hover:text-[#FF4D00] transition-colors cursor-pointer">
                    {story.title}
                  </h2>
                  <p className="text-lg text-gray-500 leading-relaxed">
                    {story.description}
                  </p>
                </div>

                <div className="flex items-center gap-8 pt-4 border-t border-gray-100">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Key Result</h4>
                    <p className="text-2xl font-black text-[#121212]">{story.stats}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Scope</h4>
                    <div className="flex gap-2">
                      {story.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs font-bold text-gray-400">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] group"
                >
                  View Full Story 
                  <span className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#FF4D00] group-hover:border-[#FF4D00] group-hover:text-white transition-all">
                    <FiArrowUpRight size={20} />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="px-8 md:px-20 py-32 bg-[#121212] text-white rounded-t-[4rem]">
        <div className="max-w-[1400px] mx-auto text-center space-y-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">READY TO START <br /> YOUR OWN STORY?</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-12 py-6 bg-[#FF4D00] rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-[#FF4D00]/20"
          >
            Start a Project
          </motion.button>
        </div>
      </section>

    </div>
  );
};

export default StoriesPage;