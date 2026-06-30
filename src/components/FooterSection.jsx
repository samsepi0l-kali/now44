import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import JoinPopup from './JoinForm/JoinPopup'
import { getAssetPath } from '../utils/paths'

function CountUpStats({ end, duration = 2, label, suffix = '', isMain = false }) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return
    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min(1, (currentTime - startTime) / (duration * 1000))
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(end)
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])
  
  return (
    <div ref={nodeRef} className="text-center">
      <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isMain ? 'text-red-600' : 'text-white'}`}>
        {count}{suffix}
      </div>
      <p className={`text-sm tracking-wide mt-2 ${isMain ? 'text-gray-300' : 'text-gray-400'}`}>
        {label}
      </p>
    </div>
  )
}

export default function FooterSection() {
  const [showPopup, setShowPopup] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const bubbleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 1], [0, 0.15, 0.15, 0])

  const mainStats = [
    { value: 321, suffix: 'K+', label: 'Followers across social media' }
  ]

  const secondaryStats = [
    { value: 15, suffix: '+', label: 'Years of experience' },
    { value: 6.3, suffix: 'K+', label: 'Stories covered' }
  ]

  const socialLinks = [
    { name: 'YouTube', url: 'https://www.youtube.com/channel/UCWVgdi437t9cIx_8cH2DcXQ' },
    { name: 'Instagram', url: 'https://www.instagram.com/now44newschannel/' },
    { name: 'Facebook', url: 'https://www.facebook.com/901178950223162/' },
    { name: 'X', url: 'https://x.com/now44news' },
    { name: 'WhatsApp', url: 'https://wa.me/917275886607' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/now44/' },
  ]

  return (
    <>
      <motion.section 
        ref={sectionRef}
        className="relative bg-black py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 overflow-hidden"
      >
        <motion.div 
          style={{ opacity: bubbleOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.div
            animate={{ 
              x: [0, 30, -20, 50, 0],
              y: [0, -20, 30, -10, 0],
              scale: [1, 1.1, 0.95, 1.05, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-red-600/10 blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -25, 20, -15, 0],
              y: [0, 15, -25, 20, 0],
              scale: [1, 0.9, 1.1, 0.95, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, 20, -30, 25, 0],
              y: [0, -15, 20, -20, 0],
              scale: [1, 1.05, 0.9, 1.02, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-red-600/8 blur-3xl"
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white">
              उपलब्धियाँ
            </h2>
            <div className="w-12 h-px bg-red-600/50 mx-auto mt-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 sm:mb-16"
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-600/5 rounded-full blur-2xl" />
              {mainStats.map((stat, index) => (
                <CountUpStats key={index} end={stat.value} suffix={stat.suffix} label={stat.label} isMain={true} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-xl mx-auto mb-12 sm:mb-16"
          >
            {secondaryStats.map((stat, index) => (
              <div key={index} className="relative">
                <div className="absolute inset-0 bg-red-600/5 rounded-full blur-xl" />
                <CountUpStats key={index} end={stat.value} suffix={stat.suffix} label={stat.label} isMain={false} />
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12 sm:mb-16"
          >
            <button
              onClick={() => setShowPopup(true)}
              className="group relative px-10 sm:px-12 py-4 sm:py-5 overflow-hidden rounded-full border-2 border-red-600/60 hover:border-red-600 transition-all duration-300"
            >
              <span className="relative z-10 text-white text-sm sm:text-base uppercase tracking-wider group-hover:tracking-[0.2em] transition-all duration-300">
                Join Our Team
              </span>
              <span className="absolute inset-0 bg-red-600/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16 sm:mb-20"
          >
            <div className="max-w-3xl mx-auto">
              <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/30 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-red-600/5 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl" />
                <div className="aspect-[16/9] bg-gray-900/50 relative z-10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7154.825684671067!2d82.074354!3d26.2608054!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a7d237a254e0b%3A0x71483d40cd8916c4!2sAtul%20plaza!5e0!3m2!1sen!2sin!4v1700000000000"
                    className="w-full h-full"
                    style={{ 
                      border: 0,
                      filter: 'invert(0.9) hue-rotate(180deg) brightness(0.8)'
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Atul Plaza - NOW44 Location"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-xs font-medium tracking-wider">NOW44 HEADQUARTERS</p>
                      <p className="text-gray-400 text-[10px]">Atul Plaza, Amethi</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-gray-400 text-[10px]">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent mb-8 sm:mb-10" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center gap-8 sm:gap-10"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-12">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-gray-400 hover:text-red-500 text-xs sm:text-sm transition-all duration-300 tracking-wider uppercase"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <a
                href="mailto:contact@now44.in"
                className="group flex items-center gap-2 text-gray-400 hover:text-red-500 text-xs sm:text-sm transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@now44.in
              </a>
              <span className="text-gray-700 text-xs hidden sm:inline">|</span>
              <a
                href="tel:+917275886607"
                className="group flex items-center gap-2 text-gray-400 hover:text-red-500 text-xs sm:text-sm transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 72758 86607
              </a>
            </div>

            <p className="text-gray-600 text-xs tracking-wide">
              &copy; {new Date().getFullYear()} NOW44 News. All rights reserved.
            </p>
          </motion.div>

        </div>
      </motion.section>

      <JoinPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </>
  )
}