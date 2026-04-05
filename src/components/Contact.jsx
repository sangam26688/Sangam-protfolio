import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'; // <--- FIXED: Added AnimatePresence
import { useState } from 'react';
import { 
  FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, 
  FaExclamationCircle, FaLinkedin, FaGithub, FaTerminal, FaHeadset 
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  // --- 3D TILT LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      const response = await fetch('https://sangam-protfolio.vercel.app/api/contact', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', msg: 'Data Transmitted! 🚀 Check your inbox.' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Transmission Failed');
      }
    } catch (error) {
      setStatus({ type: 'error', msg: 'System Offline. Check server connection.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-40 px-6 overflow-hidden bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500">
      
      {/* 🌑 DEPTH BLOBS */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center mb-32 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-8 border border-blue-600/20 rounded-full bg-blue-600/5 backdrop-blur-md"
          >
            <FaTerminal className="text-blue-600 text-[10px]" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-blue-600 dark:text-blue-400">
              Secure Channel v2.0
            </span>
          </motion.div>
          
          <h2 className="text-6xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-[0.85]">
            Start A <br /> <span className="text-blue-600 underline">Project.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-20 items-start">
          
          {/* LEFT: INFO PANEL */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            className="space-y-16"
          >
            <div className="space-y-6">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white leading-tight uppercase italic">
                Ready for the <br /> 
                <span className="text-blue-600">Next Big Thing?</span>
              </h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-bold max-w-sm leading-relaxed">
                Send a ping to my terminal. I respond to high-impact opportunities within 12 hours.
              </p>
            </div>

            <div className="space-y-10">
              {[
                { icon: <FaEnvelope />, label: "Direct Mail", val: "sangam.x2228@gmail.com", color: "bg-blue-600" },
                { icon: <FaMapMarkerAlt />, label: "Current Base", val: "Yamuna Nagar, Haryana", color: "bg-purple-600" }
              ].map((item, i) => (
                <motion.div whileHover={{ x: 12 }} key={i} className="flex items-center gap-6 group cursor-pointer">
                  <div className={`w-16 h-16 ${item.color} rounded-[1.5rem] flex items-center justify-center shadow-2xl group-hover:rotate-[15deg] transition-all duration-500`}>
                    <span className="text-white text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-black mb-1">{item.label}</p>
                    <p className="text-xl text-slate-900 dark:text-white font-black italic tracking-tighter">{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* QUICK SOCIALS */}
            <div className="flex gap-8 pt-10 border-t border-slate-200 dark:border-white/10">
                <FaLinkedin size={22} className="text-slate-400 hover:text-blue-600 transition-colors" />
                <FaGithub size={22} className="text-slate-400 hover:text-white transition-colors" />
                <FaHeadset size={22} className="text-slate-400 hover:text-pink-500 transition-colors" />
            </div>
          </motion.div>
          
          {/* RIGHT: 3D FORM CARD */}
          <motion.div 
            style={{ perspective: "1500px" }}
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }}
          >
            <motion.form 
              onMouseMove={handleMouseMove}
              onMouseLeave={() => { x.set(0); y.set(0); }}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onSubmit={handleSubmit} 
              className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-white dark:border-white/10 shadow-2xl relative"
            >
              <div style={{ transform: "translateZ(60px)" }} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">Client Identity</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-3xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all text-slate-900 dark:text-white font-bold italic"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">Return Path</label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-3xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all text-slate-900 dark:text-white font-bold italic"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 italic">Project Payload</label>
                   <textarea
                    rows="5"
                    placeholder="Describe your vision or technical requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-3xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all text-slate-900 dark:text-white font-bold italic resize-none"
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, rotate: -0.5 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="w-full bg-slate-950 dark:bg-white text-white dark:text-black py-6 rounded-3xl font-black uppercase text-[11px] tracking-[0.5em] shadow-2xl hover:shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-4 italic"
                >
                  {isLoading ? 'Encoding Data...' : <>Initialize Transmission <FaPaperPlane /></>}
                </motion.button>
              </div>

              {/* STATUS FEEDBACK */}
              <AnimatePresence>
                {status.msg && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mt-10 p-5 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest border-2 italic ${
                      status.type === 'success' 
                      ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                      : 'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}
                  >
                    {status.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                    {status.msg}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* BACKGROUND WATERMARK */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[18rem] font-black opacity-[0.01] dark:text-white pointer-events-none select-none uppercase -rotate-90">
        Connect
      </div>
    </section>
  );
};

export { Contact };