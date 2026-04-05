import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FaUsers, FaHandsHelping, FaAward, FaUsersCog } from 'react-icons/fa'

const leadership = [
  {
    title: 'Vice President',
    org: 'Tech Express Club',
    description: 'Led technical workshops, hackathons, and coding competitions for 50+ members. Organized AI/ML sessions and mentored juniors in competitive programming.',
    icon: FaUsersCog,
    gradient: 'from-blue-600 to-cyan-500',
    tag: 'Leadership'
  },
  {
    title: 'NGO Volunteer Developer',
    org: 'KUK Affiliated NGO',
    description: 'Architected full-stack applications for non-profits including donation management systems and volunteer portals using the MERN stack for social impact.',
    icon: FaHandsHelping,
    gradient: 'from-purple-600 to-pink-500',
    tag: 'Community'
  }
]

const LeadershipCard = ({ item, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative"
    >
      {/* 3D OUTER GLOW */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-[3rem] blur-xl opacity-0 group-hover:opacity-20 transition duration-700`}></div>

      <div className="relative h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-white dark:border-white/10 shadow-2xl transition-all duration-500 overflow-hidden">
        
        {/* TOP BADGE */}
        <div style={{ transform: "translateZ(40px)" }} className="flex justify-between items-start mb-10">
          <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-500`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 dark:text-slate-400 uppercase tracking-[0.2em]">
            {item.tag}
          </span>
        </div>

        {/* CONTENT */}
        <div style={{ transform: "translateZ(60px)" }}>
          <h4 className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] mb-2">
            {item.org}
          </h4>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-none italic uppercase mb-6">
            {item.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed font-medium mb-8">
            {item.description}
          </p>
        </div>

        {/* BOTTOM DECORATION */}
        <div className="absolute bottom-[-10px] right-[-10px] opacity-10">
           <FaAward size={120} className="text-slate-400 dark:text-white" />
        </div>
      </div>
    </motion.div>
  );
};

const Leadership = () => {
  return (
    <section id="leadership" className="relative py-40 px-6 overflow-hidden bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500">
      
      {/* 🎨 DYNAMIC BACKGROUND */}
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[150px] opacity-40"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[50%] bg-purple-100 dark:bg-purple-900/10 rounded-full blur-[150px] opacity-40"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center mb-32 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-8 border border-blue-600/20 rounded-full bg-blue-500/5 backdrop-blur-md"
          >
            <FaUsers className="text-blue-600 text-xs" />
            <span className="text-xs font-black tracking-[0.4em] uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Beyond The Code
            </span>
          </motion.div>
          
          <h2 className="text-6xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-[0.8]">
            Leader <br /> <span className="text-blue-600">&</span> Community.
          </h2>
        </div>

        {/* LEADERSHIP GRID */}
        <div 
          className="grid md:grid-cols-2 gap-12"
          style={{ perspective: "2000px" }}
        >
          {leadership.map((item, index) => (
            <LeadershipCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* BACKGROUND DECORATIVE TEXT */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15rem] font-black opacity-[0.02] dark:text-white pointer-events-none select-none uppercase -rotate-90">
        Impact
      </div>
    </section>
  )
}

export { Leadership }