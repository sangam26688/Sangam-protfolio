import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

// --- 3D TILT CARD COMPONENT ---
const ProjectCard = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Rotate values: Card 20 degree tak tilt hoga
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d", // 3D Layering ke liye
      }}
      className="group relative flex flex-col rounded-[2.5rem] bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
    >
      {/* IMAGE AREA with Parallax */}
      <div 
        style={{ transform: "translateZ(50px)" }} // Image ko card se bahar nikalne ke liye
        className="relative h-64 overflow-hidden m-4 rounded-[2rem]"
      >
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
           <p className="text-white text-xs font-bold tracking-widest uppercase">View Case Study</p>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div 
        style={{ transform: "translateZ(80px)" }} // Text ko aur bhi zyada 3D depth dene ke liye
        className="p-8 pt-2 flex flex-col flex-grow"
      >
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6">
          {project.description}
        </p>

        {/* TECH TAGS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tech, i) => (
            <span 
              key={i}
              className="px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* LINKS */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200/50 dark:border-white/5">
          <a 
            href={project.live} 
            target="_blank" 
            className="flex items-center gap-2 text-sm font-black text-blue-600 dark:text-blue-400 hover:underline"
          >
            Live Demo <FaExternalLinkAlt size={12} />
          </a>
          <a 
            href={project.github} 
            target="_blank" 
            className="p-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full hover:scale-110 transition-transform"
          >
            <FaGithub size={18} />
          </a>
        </div>
      </div>

      {/* Glossy Overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'Photography Portfolio',
      tech: ['React.js', 'Framer Motion', 'Tailwind'],
      description: 'Dynamic photography portfolio with 3D hover effects and AI-optimized image loading.',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000', 
      live: 'https://event-portfolio.sangam.dev',
      github: '#'
    },
    {
      title: 'AI Chat Assistant',
      tech: ['Node.js', 'OpenAI API', 'MongoDB'],
      description: 'Real-time AI conversation platform with memory context and multi-language support.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000',
      live: '#',
      github: '#'
    },
    {
      title: 'E-Commerce Dashboard',
      tech: ['React', 'Chart.js', 'Express'],
      description: 'Admin dashboard with real-time analytics, inventory management and sales forecasting.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
      live: '#',
      github: '#'
    }
  ];

  return (
    <section id="projects" className="relative py-32 px-6 bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      
      {/* 🎨 ANIMATED BACKGROUND SHAPES */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-[20%] left-[-5%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-purple-400/10 rounded-full blur-[120px]" 
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADING SECTION */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block px-6 py-2 mb-6 border border-blue-500/20 rounded-full bg-blue-500/5 backdrop-blur-md"
          >
            <span className="text-xs font-black tracking-[0.3em] uppercase text-blue-600 dark:text-blue-400">
              Portfolio
            </span>
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            Featured <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Projects.
            </span>
          </h2>
        </div>

        {/* PROJECTS GRID with Perspective container */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
          style={{ perspective: "1500px" }} // Z-axis depth ke liye zaroori hai
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Projects }