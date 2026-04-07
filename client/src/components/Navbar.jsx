import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import { FaGithub, FaLinkedin, FaBars, FaTimes, FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'; // npm i gsap @gsap/react

gsap.registerPlugin(ScrollTrigger);

const FloatingOrb = ({ position }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.01;
  });
  return (
    <Sphere ref={meshRef} args={[0.3, 32, 32]} position={position}>
      <meshStandardMaterial emissive="cyan" emissiveIntensity={0.5} />
    </Sphere>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const bulbRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemTheme)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  useGSAP(() => {
    // Logo 3D hover
    gsap.to(logoRef.current, {
      rotationY: 360,
      duration: 2,
      repeat: -1,
      ease: "none",
      paused: true
    });

    logoRef.current.addEventListener("mouseenter", () => gsap.play());
    logoRef.current.addEventListener("mouseleave", () => gsap.pause());

    // Stagger links glow on scroll
    ScrollTrigger.create({
      trigger: navRef.current,
      start: "top top",
      onEnter: () => {
        gsap.fromTo(linksRef.current, 
          { opacity: 0, y: -20 }, 
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
        );
      }
    });

    // Bulb GSAP pulse
    gsap.to(bulbRef.current, {
      scale: 1.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }, { scope: navRef });

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 backdrop-blur-xl ${
        scrolled 
          ? "bg-white/10 dark:bg-slate-950/30 border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/10 py-3" 
          : "bg-transparent/50 py-5"
      } glassmorphism`} // Add to Tailwind: .glassmorphism { background: rgba(255,255,255,0.1); }
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex justify-between items-center relative">
        {/* 3D Orbs Canvas - Floating futuristic */}
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="cyan" />
            <Stars />
            <FloatingOrb position={[-2, 1, 0]} />
            <FloatingOrb position={[2, -1, 0]} />
          </Canvas>
        </div>

        {/* LEFT: 3D LOGO */}
        <motion.div 
          ref={logoRef}
          whileHover={{ scale: 1.1 }}
          className="text-3xl font-black cursor-pointer shrink-0 relative z-10 bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl"
        >
          SANGAM.
        </motion.div>

        {/* CENTER: DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-10 relative z-10">
          <div className="flex space-x-8">
            {navLinks.map((link, i) => (
              <a 
                key={link.name} 
                ref={el => linksRef.current[i] = el}
                href={link.href} 
                className="text-lg font-bold text-transparent bg-gradient-to-r from-slate-200 via-cyan-400 to-purple-400 bg-clip-text hover:!text-cyan-400 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-cyan-500/50 p-2 rounded-full"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4 border-l border-cyan-500/30 pl-6">
            <a href="https://github.com" target="_blank" className="hover:scale-125 transition-all"><FaGithub size={22} /></a>
            <a href="https://linkedin.com" target="_blank" className="hover:scale-125 transition-all"><FaLinkedin size={22} /></a>
          </div>
        </div>

        {/* RIGHT: Holographic BULB + Mobile */}
        <div className="flex items-center gap-4 relative z-10">
          <motion.button
            ref={bulbRef}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-4 rounded-2xl transition-all duration-500 backdrop-blur-lg ${
              isDarkMode 
                ? "bg-gradient-to-r from-yellow-400/30 to-orange-400/30 text-yellow-300 border border-yellow-400/50 shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:shadow-[0_0_50px_rgba(251,191,36,0.8)]" 
                : "bg-gradient-to-r from-slate-100/50 to-white/50 text-slate-700 border border-slate-200/50 hover:shadow-[0_0_30px_rgba(148,163,184,0.5)]"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDarkMode ? 'bulb-on' : 'bulb-off'}
                initial={{ opacity: 0, rotate: 180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -180 }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? <FaLightbulb size={24} /> : <FaRegLightbulb size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <button className="md:hidden p-3 text-2xl backdrop-blur-sm rounded-xl border" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - Futuristic slide */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: '100%' }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: '100%' }}
            className="fixed right-0 top-20 w-80 h-96 bg-gradient-to-b from-cyan-500/10 to-purple-500/10 backdrop-blur-3xl border-l border-cyan-500/30 md:hidden z-[99] rounded-2xl shadow-2xl shadow-cyan-500/20"
          >
            <div className="p-8 flex flex-col space-y-6 items-center">
              {navLinks.map((link) => (
                <a 
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className="text-2xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent hover:scale-110 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;