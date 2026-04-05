import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import gsap from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    // entry animation only on mount
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemTheme)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setIsDarkMode(isDark);
    
    // Smooth transition flash
    gsap.fromTo("body", { opacity: 0.9 }, { opacity: 1, duration: 0.3 });
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Work', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      ref={navRef}
      style={{ pointerEvents: 'none' }} // Outer nav doesn't block clicks
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 px-4 md:px-10 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div 
        style={{ pointerEvents: 'auto' }} // Inner container allows clicks
        className={`max-w-7xl mx-auto flex justify-between items-center px-6 py-3 rounded-2xl transition-all duration-500 ${
        scrolled 
        ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl" 
        : "bg-transparent border border-transparent"
      }`}>
        
        {/* LOGO with subtle 3D hover */}
        <motion.div 
          whileHover={{ scale: 1.05, rotateY: 10 }}
          className="perspective-1000 cursor-pointer"
        >
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            SANGAM.
          </span>
        </motion.div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <motion.a 
              key={link.name} 
              href={link.href}
              whileHover={{ y: -2 }}
              className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-all relative group"
            >
              {link.name}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-8"></span>
            </motion.a>
          ))}
          
          <div className="h-6 w-[1px] bg-slate-300 dark:bg-slate-800 mx-4" />

          <div className="flex gap-4">
            <motion.a whileHover={{ y: -3 }} href="https://github.com/sangam" target="_blank" className="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-all">
              <FaGithub size={20} />
            </motion.a>
            <motion.a whileHover={{ y: -3 }} href="https://linkedin.com" target="_blank" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all">
              <FaLinkedin size={20} />
            </motion.a>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-all ${
              isDarkMode 
              ? "bg-slate-800 border-slate-700 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]" 
              : "bg-slate-50 border-slate-200 text-slate-600"
            }`}
          >
            {isDarkMode ? <FaLightbulb size={20} /> : <FaRegLightbulb size={20} />}
          </motion.button>

          <button className="md:hidden p-2 text-slate-800 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ pointerEvents: 'auto' }}
            className="fixed inset-0 top-0 left-0 bg-white dark:bg-slate-950 z-[1000] flex flex-col items-center justify-center gap-8 md:hidden"
          >
             <button 
                className="absolute top-10 right-10 text-slate-800 dark:text-white"
                onClick={() => setIsOpen(false)}
             >
                <FaTimes size={32} />
             </button>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="text-4xl font-black text-slate-800 dark:text-white hover:text-blue-600 transition-colors uppercase tracking-tight"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;