import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaDownload, FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    'Building Future with MERN & AI 🚀',
    'Full Stack Developer | AI Specialist',
    'VP @ Tech Express Club | B.Sc. IT'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8fafc] dark:bg-[#020617] pt-20 px-6 transition-colors duration-500">
      
      {/* 🎨 DYNAMIC MESH BACKGROUND: Light mein soft, Dark mein deep neon */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100 dark:bg-purple-900/20 rounded-full blur-[120px] opacity-60"></div>
      
      {/* 3D FLOATING OBJECTS: Ye background ko depth denge */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[15%] w-12 h-12 border-4 border-blue-400/30 rounded-xl hidden md:block"
      />
      <motion.div 
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[10%] w-20 h-20 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-2xl hidden md:block"
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        
        {/* MODERN BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 mb-8 border border-blue-100 dark:border-blue-900/30 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-sm"
        >
          <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
            Available for Projects
          </span>
        </motion.div>

        {/* MAIN HEADING */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight text-slate-900 dark:text-white"
        >
          Hi, I'm <br className="md:hidden" /> 
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
            Sangam
          </span>
        </motion.h1>

        {/* ANIMATED TEXT */}
        <div className="h-12 md:h-16 mb-10">
          <AnimatePresence mode="wait">
            <motion.p 
              key={textIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-3xl font-medium text-slate-600 dark:text-slate-400"
            >
              {texts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <motion.a 
            href="/resume.pdf" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold flex items-center gap-2 overflow-hidden transition-all shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20"
          >
            <span className="relative z-10">Download CV</span>
            <FaDownload className="relative z-10 transition-transform group-hover:translate-y-1" />
          </motion.a>

          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 border-2 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold transition-all backdrop-blur-sm flex items-center gap-2 shadow-sm"
          >
            Explore Work
            <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>

      {/* MODERN SCROLL INDICATOR */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-1 h-12 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex justify-center">
           <motion.div 
             animate={{ y: [0, 48, 0] }} 
             transition={{ repeat: Infinity, duration: 2 }}
             className="w-full h-1/3 bg-blue-500 dark:bg-cyan-400"
           />
        </div>
      </motion.div>
    </section>
  );
};

export { Hero };