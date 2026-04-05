import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', msg: '' }) // Enhanced status

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: '', msg: '' })

    try {
      // ✅ ASLI API CALL (Backend URL)
    const response = await fetch('https://sangam-protfolio-api.vercel.app/api/contact', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
});

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', msg: 'Message sent successfully! 🚀 Check your Gmail.' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus({ type: 'error', msg: 'Failed to send message. Is the server running?' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500 font-sans">
      
      {/* 🎨 BLOBS */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[120px] opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-purple-100 dark:bg-purple-900/10 rounded-full blur-[120px] opacity-50"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-block px-4 py-1.5 mb-4 border border-blue-100 dark:border-white/10 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-md">
            <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight">
            Get In <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent italic">Touch</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                Let's build something <br /> 
                <span className="text-blue-600">exceptional</span> together.
              </h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                I'm currently looking for new opportunities. My email is always open!
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { icon: <FaEnvelope />, label: "Email Me", val: "sangam.x2228@gmail.com", color: "text-blue-500" },
                { icon: <FaMapMarkerAlt />, label: "Location", val: "Yamuna Nagar, Haryana", color: "text-pink-500" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm">
                    <span className={`${item.color} text-xl`}>{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{item.label}</p>
                    <p className="text-slate-900 dark:text-white font-bold">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
            <form onSubmit={handleSubmit} className="bg-white/60 dark:bg-white/5 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white dark:border-white/10 shadow-2xl shadow-blue-500/5">
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none transition-all text-slate-900 dark:text-white font-medium"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none transition-all text-slate-900 dark:text-white font-medium"
                    required
                  />
                </div>
                <textarea
                  rows="5"
                  placeholder="Your Message..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl focus:border-blue-500 focus:outline-none transition-all text-slate-900 dark:text-white font-medium resize-none"
                  required
                ></textarea>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-xl hover:shadow-blue-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isLoading ? 'Sending...' : <>Send Message <FaPaperPlane size={14} /></>}
                </motion.button>
              </div>

              {status.msg && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border ${
                    status.type === 'success' 
                    ? 'bg-green-500/10 text-green-600 border-green-500/20' 
                    : 'bg-red-500/10 text-red-600 border-red-500/20'
                  }`}
                >
                  {status.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                  {status.msg}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { Contact }