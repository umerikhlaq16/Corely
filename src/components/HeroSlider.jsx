import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Parallax, Mousewheel, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MoveRight } from 'lucide-react';
import Navbar from './Navbar';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    title: "DESIGN",
    subtitle: "OUR VISION",
    description: "Credibly leverage existing business experiences through magnetic mindshare. Synergistically exploit efficient partnerships world-class applications.",
    image: "public/Mock/S12.jpg",
    link: "/landing"
  },
  {
    id: 2,
    title: "FUTURE",
    subtitle: "INNOVATION",
    description: "Deep dive into immersive digital experiences. We craft solutions that bridge the gap between technology and human emotion.",
    image: "public/Mock/S22.jpg",
    link: "/landing-v2"
  },
  {
    id: 3,
    title: "AGENCY",
    subtitle: "CREATIVE",
    description: "We are a digital agency focused on delivering high-end products and experiences for users across the globe.",
    image: "public/Mock/S33.jpg",
    link: "/agency"
  }
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = slides.length;
  const progressWidth = ((activeIndex + 1) / totalSlides) * 100;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <Navbar />

      <Swiper
        slidesPerView={1} 
        spaceBetween={0}
        speed={1400}
        parallax={true}
        mousewheel={{ releaseOnEdges: true, sensitivity: 1 }} 
        loop={false}
        navigation={{
          nextEl: '.next-btn',
          prevEl: '.prev-btn',
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[Parallax, Navigation, Mousewheel, Pagination]}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="w-full h-full relative overflow-hidden">
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
              data-swiper-parallax="50%"
            >
              <div className="absolute inset-0 bg-black/40 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 md:px-24">
              <div className="overflow-hidden">
                <motion.h4 
                  initial={{ y: 20, opacity: 0 }}
                  animate={activeIndex === index ? { y: 0, opacity: 0.8 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-[9px] md:text-xs font-bold tracking-[0.4em] mb-4 uppercase"
                >
                  {slide.subtitle}
                </motion.h4>
              </div>
              
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: 100, opacity: 0 }}
                  animate={activeIndex === index ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-5xl sm:text-7xl md:text-[11rem] font-black leading-[0.85] mb-6 tracking-tighter"
                >
                  {slide.title}
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.p 
                  initial={{ y: 50, opacity: 0 }}
                  animate={activeIndex === index ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="max-w-[260px] sm:max-w-md text-gray-200 mb-10 text-xs sm:text-sm md:text-base leading-relaxed"
                >
                  {slide.description}
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={activeIndex === index ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <Link 
                  to={slide.link}
                  className="group relative inline-flex items-center space-x-4 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] outline-none cursor-pointer overflow-hidden py-2"
                >
                  {/* Dot to Arrow Animation */}
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <span className="absolute w-2 h-2 rounded-full border border-white group-hover:scale-0 group-hover:opacity-0 transition-all duration-500 ease-in-out"></span>
                    <MoveRight className="absolute w-5 h-5 text-white scale-0 opacity-0 -translate-x-4 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-in-out" />
                  </div>

                  {/* Text and Underline Animation */}
                  <div className="relative">
                    <span>Take A Look</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40 group-hover:w-0 transition-all duration-500 ease-in-out"></span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation & Progress UI */}
        <div className="absolute bottom-8 md:bottom-16 left-0 w-full z-20 flex justify-between items-center px-6 md:px-24 pointer-events-none">
          
          <button className="prev-btn pointer-events-auto flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition-all duration-500 group outline-none">
            <ArrowLeft className="w-5 h-5 md:w-8 md:h-8 text-white group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="flex flex-col items-center">
             <div className="flex items-center space-x-4 md:space-x-8">
                <span className="text-[10px] md:text-[33px] font-mono tracking-widest font-bold">0{activeIndex + 1}</span>
                <div className="w-24 sm:w-48 md:w-72 h-[1px] md:h-[2px] bg-white/10 relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-white transition-all duration-1000 ease-out"
                    style={{ width: `${progressWidth}%` }}
                  ></div>
                </div>
                <span className="text-[10px] md:text-[33px]  font-mono tracking-widest font-bold opacity-40">0{totalSlides}</span>
             </div>
          </div>

          <button className="next-btn pointer-events-auto flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/20 transition-all duration-500 group outline-none">
            <ArrowRight className="w-5 h-5 md:w-8 md:h-8 text-white group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
