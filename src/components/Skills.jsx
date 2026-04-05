import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import { FaReact, FaNodeJs, FaPython, FaDatabase, FaJs, FaRobot, FaTerminal, FaCode } from 'react-icons/fa'

const skills = [
  { name: 'React.js', category: 'Frontend', level: 90, icon: FaReact, color: 'text-cyan-400', desc: 'Expert in Hooks, Context API, and Performance Optimization.' },
  { name: 'Node.js', category: 'Backend', level: 85, icon: FaNodeJs, color: 'text-green-500', desc: 'Scalable API development and Microservices architecture.' },
  { name: 'Python', category: 'Programming', level: 88, icon: FaPython, color: 'text-blue-500', desc: 'Automation, AI data handling, and Scripting.' },
  { name: 'MongoDB', category: 'Database', level: 82, icon: FaDatabase, color: 'text-emerald-500', desc: 'NoSQL schema design and Aggregation pipelines.' },
  { name: 'JavaScript', category: 'Core', level: 95, icon: FaJs, color: 'text-yellow-400', desc: 'Modern ES6+, Async/Await, and Engine internals.' },
  { name: 'AI Tools', category: 'Specialized', level: 92, icon: FaRobot, color: 'text-purple-500', desc: 'Prompt Engineering and OpenAI API integration.' }
]

// --- 3D TILT CARD SUB-COMPONENT ---
const SkillCard = ({ skill, index }) => {
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

  const Icon = skill.icon;

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative p-8 rounded-[3rem] bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-white/10 shadow-2xl transition-all duration-500"
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="flex items-center mb-8">
          <div className={`w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center mr-6 shadow-inner group-hover:shadow-blue-500/20 transition-all`}>
            <Icon className={`w-8 h-8 ${skill.color} group-hover:scale-110 transition-transform`} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight uppercase italic">{skill.name}</h3>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">{skill.category}</span>
          </div>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed mb-8 h-10 line-clamp-2">
          {skill.desc}
        </p>

        {/* PROGRESS SYSTEM */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Mastery Level</span>
            <span className="text-lg font-black text-slate-900 dark:text-white italic">{skill.level}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-40 px-6 overflow-hidden bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500">
      
      {/* 🎨 DYNAMIC BACKGROUND */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-blue-600/20 rounded-full bg-blue-500/5 backdrop-blur-md"
            >
              <FaTerminal size={10} className="text-blue-600" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-blue-600 dark:text-blue-400">Technical Arsenal</span>
            </motion.div>
            <h2 className="text-6xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase leading-[0.8]">
              Expertise <br /> & <span className="text-blue-600 underline">Skills.</span>
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.3em] text-xs pb-4 border-b-4 border-blue-600 hidden lg:block">
            Verified Tech Stack (2026)
          </p>
        </div>

        {/* GRID LAYOUT with Perspective */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          style={{ perspective: "2000px" }}
        >
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>

      {/* Decorative Text */}
      <div className="absolute bottom-10 right-10 text-[10rem] font-black opacity-[0.02] dark:text-white pointer-events-none select-none uppercase italic">
        Systems
      </div>
    </section>
  );
};

export { Skills };