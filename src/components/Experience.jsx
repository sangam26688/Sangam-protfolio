import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  FaCalendarAlt, FaCheckCircle, FaBriefcase, FaBuilding, 
  FaLocationArrow, FaCode, FaRocket, FaTerminal 
} from 'react-icons/fa';

// --- EXPERIENCE DATA (High Detail) ---
const experiences = [
  {
    role: 'Web Development Intern',
    company: 'SM Digital',
    duration: 'July 2025 - Aug 2025',
    type: 'Internship',
    location: 'Remote / India',
    tech: ['React', 'Next.js', 'AI APIs', 'Tailwind'],
    impact: '40% Perf Boost',
    achievements: [
      'Mastered 10+ AI-driven development tools (Cursor, Copilot) to accelerate development cycles by 30%.',
      'Engineered 5+ high-conversion responsive websites using MERN stack principles and SEO best practices.',
      'Optimized asset delivery and code splitting, resulting in a 40% performance improvement on Lighthouse scores.'
    ]
  },
  {
    role: 'Vice President',
    company: 'Tech Express Club',
    duration: '2024 - Present',
    type: 'Leadership',
    location: 'MLNC, Yamuna Nagar',
    tech: ['Mentorship', 'Event Org', 'Public Speaking'],
    impact: '50+ Members Led',
    achievements: [
      'Orchestrated technical events and hackathons for 50+ active members, fostering a culture of innovation.',
      'Curated and delivered 12+ hands-on workshops on AI integration and modern full-stack workflows.',
      'Established a junior mentorship framework to bridge the gap between academic theory and industry reality.'
    ]
  },
  {
    role: 'Volunteer Developer',
    company: 'KUK Affiliated NGO',
    duration: '2023 - Present',
    type: 'Social Contribution',
    location: 'Haryana',
    tech: ['PHP', 'MySQL', 'Admin Panels'],
    impact: 'Live System',
    achievements: [
      'Architected a full-scale donation tracking system ensuring 100% financial transparency for stakeholders.',
      'Developed a mobile-first volunteer onboarding portal with real-time registration and data tracking.',
      'Integrated secure payment gateways to facilitate seamless digital fundraising during peak NGO events.'
    ]
  }
];

// --- 3D TILT CARD COMPONENT ---
const ExperienceCard = ({ exp, index }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative flex items-center justify-between w-full flex-col md:flex-row gap-8 ${
        index % 2 === 0 ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Central Connector Dot */}
      <div className="absolute left-[18px] md:left-1/2 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 z-30">
        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-[6px] border-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.6)]">
          <FaBriefcase className="text-blue-600 text-[10px]" />
        </div>
      </div>

      {/* Card Content */}
      <div className="w-full md:w-[46%] ml-12 md:ml-0" style={{ perspective: "1000px" }}>
        <motion.div 
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="group relative p-8 rounded-[3rem] bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-white dark:border-white/10 shadow-2xl hover:border-blue-500/50 transition-all duration-300"
        >
          {/* Side Numbering */}
          <div className="absolute top-10 right-10 text-6xl font-black opacity-[0.03] dark:text-white select-none">
            0{index + 1}
          </div>

          <div className="relative z-10">
            {/* Header Area */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/30">
                  <FaBuilding size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
                    {exp.company}
                  </h4>
                  <p className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                    <FaLocationArrow size={8} /> {exp.location}
                  </p>
                </div>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {exp.type}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 leading-none italic uppercase">
              {exp.role}
            </h3>

            {/* Metrics Highlight */}
            <div className="flex gap-4 mb-8">
               <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <p className="text-[9px] font-bold text-blue-600 uppercase">Key Result</p>
                  <p className="text-lg font-black dark:text-white">{exp.impact}</p>
               </div>
               <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <p className="text-[9px] font-bold text-purple-600 uppercase">Duration</p>
                  <p className="text-lg font-black dark:text-white">{exp.duration.split(' ')[0]}</p>
               </div>
            </div>

            {/* Achievements List */}
            <ul className="space-y-4 mb-8">
              {exp.achievements.map((ach, i) => (
                <li key={i} className="flex items-start gap-4 group/item">
                  <div className="mt-1.5 p-1 rounded-full bg-blue-50 dark:bg-blue-900/30">
                    <FaCheckCircle className="text-blue-600 dark:text-blue-400 text-[10px]" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
                    {ach}
                  </p>
                </li>
              ))}
            </ul>

            {/* Tech Stack in Card */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-white/5">
                {exp.tech.map(t => (
                  <span key={t} className="text-[9px] font-black px-3 py-1 bg-slate-100 dark:bg-white/5 text-slate-500 rounded uppercase tracking-tighter hover:text-blue-500 transition-colors">
                    {t}
                  </span>
                ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Spacer for MD screens */}
      <div className="hidden md:block w-[46%]"></div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="relative py-40 px-6 overflow-hidden bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500">
      
      {/* Background Orbs */}
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[150px] opacity-60"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-purple-100 dark:bg-purple-900/10 rounded-full blur-[150px] opacity-60"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-8 border border-blue-600/20 rounded-full bg-blue-500/5 backdrop-blur-md"
          >
            <FaTerminal className="text-blue-600 text-xs" />
            <span className="text-xs font-black tracking-[0.4em] uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Career Protocol
            </span>
          </motion.div>
          
          <h2 className="text-6xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-[0.8]">
            Work <br /> <span className="text-blue-600">History.</span>
          </h2>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative">
          {/* Central Animated Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 w-[4px] bg-gradient-to-b from-blue-600 via-purple-600 to-transparent z-10"
          />

          <div className="space-y-32">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Kanji/Background Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20rem] font-black opacity-[0.02] dark:text-white pointer-events-none select-none uppercase -rotate-90">
        Professional
      </div>
    </section>
  );
};

export { Experience };