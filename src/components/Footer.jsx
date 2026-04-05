import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-6 overflow-hidden bg-[#f8fafc] dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
      
      {/* 🎨 VERY SUBTLE MESH BLOB (Footer ke liye chota) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* LEFT: Branding & Status */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <h3 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
            SANGAM<span className="text-blue-600">.</span>
          </h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Open to new roles
            </span>
          </div>
        </div>

        {/* CENTER: Copyright & Stack */}
        <div className="text-center">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
            © 2026. Designed & Developed by Sangam. <br />
            <span className="text-[10px] opacity-50 italic">Built with MERN, Framer Motion & ❤️</span>
          </p>
        </div>

        {/* RIGHT: Socials & Back to Top */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-slate-200 dark:border-white/10 pr-6">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-all hover:-translate-y-1"><FaGithub size={18} /></a>
            <a href="#" className="text-slate-400 hover:text-blue-500 transition-all hover:-translate-y-1"><FaLinkedin size={18} /></a>
            <a href="#" className="text-slate-400 hover:text-sky-400 transition-all hover:-translate-y-1"><FaTwitter size={18} /></a>
          </div>
          
          <motion.button 
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm text-slate-600 dark:text-white"
          >
            <FaArrowUp size={14} />
          </motion.button>
        </div>
      </div>

      {/* BOTTOM-MOST STRIP (Subtle Text) */}
      <div className="mt-12 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-slate-800">
          Yamuna Nagar • Haryana • India
        </p>
      </div>
    </footer>
  );
};

export default Footer;