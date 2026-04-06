import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiArrowRight, FiGithub, FiLinkedin, FiInstagram, } from 'react-icons/fi';
import { FaBehance } from 'react-icons/fa';

const TalkPage = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle service selection toggle
  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const services = [
    "Web Application", "Agentic AI", "E-Commerce", 
    "UI/UX Design", "Backend Architecture", "Custom Software"
  ];

  // Social Links 
  const socialLinks = [
    { name: 'Github', icon: <FiGithub size={20}/>, url: 'https://github.com/umerikhlaq16' },
    { name: 'LinkedIn', icon: <FiLinkedin size={20}/>, url: 'https://www.linkedin.com/in/umer-ikhlaq-25b376345/' },
    { name: 'Instagram', icon: <FiInstagram size={20}/>, url: 'https://www.instagram.com/codedbyumer?igsh=MTZyaDdwaWgxaDV6' },
    { name: 'Behance', icon: <FaBehance size={20}/>, url: 'https://www.behance.net/umerikhlaq' }
  ];

  //  ANIMATION VARIANTS 
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } 
    }
  };

  const formItemVars = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#121212] selection:bg-[#FF4D00] selection:text-white font-sans">
      
      <motion.main 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto px-8 md:px-20 py-20 md:py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* CONTENT & INFO */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <motion.div variants={itemVars} className="flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#FF4D00]"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Inquiry Department</span>
              </motion.div>
              
              <motion.h1 variants={itemVars} className="text-7xl md:text-8xl font-bold leading-[0.85] tracking-tighter uppercase">
                LET'S MAKE <br /> 
                <span className="text-[#FF4D00] italic font-serif font-normal lowercase">history.</span>
              </motion.h1>
              
              <motion.p variants={itemVars} className="text-xl text-gray-500 max-w-md leading-relaxed font-medium">
                Your ambition meets our execution. Let's build something that creates a lasting digital impact.
              </motion.p>
            </div>

            <motion.div variants={itemVars} className="pt-12 space-y-8 border-t border-gray-100">
              <div className="flex items-start gap-5">
                <FiMail size={20} className="text-[#FF4D00] mt-1" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Email Inquiry</h4>
                  <p className="text-lg font-bold">contact@yourdomain.com</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <FiMapPin size={20} className="text-[#FF4D00] mt-1" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Availability</h4>
                  <p className="text-lg font-bold">Remote / Global (PKT)</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* INTERACTIVE FORM  */}
          <motion.div variants={itemVars} className="lg:col-span-7">
            <form className="bg-white border border-gray-100 rounded-[3rem] p-10 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.02)] space-y-12">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div variants={formItemVars} className="relative">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF4D00] mb-3 block">Full Name</label>
                  <input type="text" placeholder="e.g. John Doe" className="w-full bg-transparent border-b-2 border-gray-100 py-3 text-lg font-medium focus:outline-none focus:border-[#FF4D00] transition-all" required />
                </motion.div>
                <motion.div variants={formItemVars} className="relative">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF4D00] mb-3 block">Email Address</label>
                  <input type="email" placeholder="email@example.com" className="w-full bg-transparent border-b-2 border-gray-100 py-3 text-lg font-medium focus:outline-none focus:border-[#FF4D00] transition-all" required />
                </motion.div>
              </div>

              {/* Service Selection Chips */}
              <motion.div variants={formItemVars} className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF4D00] block">Required Services</label>
                <div className="flex flex-wrap gap-3">
                  {services.map((service, i) => (
                    <motion.button 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + (i * 0.05) }}
                      key={service} 
                      type="button" 
                      onClick={() => toggleService(service)}
                      className={`px-6 py-3 rounded-xl text-xs font-bold transition-all border-2 ${selectedServices.includes(service) ? 'bg-[#121212] border-[#121212] text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'}`}>
                      {service}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={formItemVars} className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF4D00] block">Project Brief</label>
                <textarea rows="4" placeholder="Describe your vision and project goals..." className="w-full bg-gray-50 border-none rounded-3xl p-6 text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D00]/10 transition-all resize-none font-medium" required />
              </motion.div>

              {/* Submission Button with Hover State */}
              <motion.button 
                variants={formItemVars}
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full h-20 bg-[#121212] text-white rounded-2xl flex items-center justify-center gap-4 text-sm font-black uppercase tracking-widest hover:bg-[#FF4D00] transition-all duration-500 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Send Inquiry <FiArrowRight size={18} className={`transition-transform ${isHovered ? 'translate-x-2' : ''}`} />
                </span>
                <div className={`absolute inset-0 bg-[#FF4D00] transition-transform duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.main>

      {/*  FOOTER  */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-gray-100 py-20 bg-white"
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-20 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="text-2xl font-black tracking-tighter uppercase italic">
            CORELY<span className="text-[#FF4D00] not-italic">.</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10">
            {socialLinks.map((social, i) => (
              <motion.div 
                key={social.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <SocialLink 
                  icon={social.icon} 
                  name={social.name} 
                  url={social.url}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
            © 2026 Corely — Developed by Umer Akhlaq
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

/**
 * Reusable Social Link Component
 * Opens in a new tab with security headers
 */
const SocialLink = ({ icon, name, url }) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex flex-col items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#FF4D00] transition-all group"
  >
    <span className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#FF4D00]/10 group-hover:text-[#FF4D00] transition-all">
      {icon}
    </span>
    {name}
  </a>
);

export default TalkPage;
