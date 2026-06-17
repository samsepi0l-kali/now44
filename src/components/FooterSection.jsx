import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import JoinPopup from './JoinForm/JoinPopup'

// Stats counter component
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

  // Photo grid data with random floating offsets
  const photos = [
    { id: 1, type: 'portrait', orientation: 'vertical', image: '/photos/photo1.jpg', alt: 'NOW44 Event', float: { x: 0, y: -8 } },
    { id: 2, type: 'landscape', orientation: 'horizontal', image: '/photos/photo2.jpg', alt: 'NOW44 Coverage', float: { x: 12, y: 5 } },
    { id: 3, type: 'portrait', orientation: 'vertical', image: '/photos/photo3.jpg', alt: 'NOW44 Team', float: { x: -10, y: 10 } },
    { id: 4, type: 'landscape', orientation: 'horizontal', image: '/photos/photo4.jpg', alt: 'NOW44 Studio', float: { x: 15, y: -5 } },
    { id: 5, type: 'portrait', orientation: 'vertical', image: '/photos/photo5.jpg', alt: 'NOW44 Interview', float: { x: -5, y: -12 } },
    { id: 6, type: 'landscape', orientation: 'horizontal', image: '/photos/photo6.jpg', alt: 'NOW44 Live', float: { x: 8, y: 8 } },
    { id: 7, type: 'portrait', orientation: 'vertical', image: '/photos/photo7.jpg', alt: 'NOW44 Event', float: { x: -15, y: 3 } },
    { id: 8, type: 'landscape', orientation: 'horizontal', image: '/photos/photo8.jpg', alt: 'NOW44 Coverage', float: { x: 10, y: -10 } },
  ]

  // Stats
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
        {/* Red Bubble Background */}
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
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white">
              उपलब्धियाँ
            </h2>
            <div className="w-12 h-px bg-red-600/50 mx-auto mt-4" />
          </motion.div>

          {/* Photo Grid - Floating & Asymmetric */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-16 sm:mb-20"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto">
              {photos.map((photo, index) => {
                // Random sizes for asymmetry on mobile
                const mobileSpan = index % 3 === 0 ? 'col-span-1' : index % 3 === 1 ? 'col-span-1' : 'col-span-1'
                const mobileRowSpan = index % 2 === 0 ? 'row-span-1' : 'row-span-1'
                
                return (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={isInView ? { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      x: photo.float.x,
                      y: photo.float.y
                    } : {}}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      zIndex: 10,
                      transition: { duration: 0.2 }
                    }}
                    className={`relative rounded-lg overflow-hidden bg-gray-800 shadow-lg shadow-black/20 ${
                      photo.orientation === 'vertical' 
                        ? 'aspect-[3/4]' 
                        : 'aspect-[4/3]'
                    } ${mobileSpan} ${mobileRowSpan}`}
                    style={{
                      marginTop: index % 2 === 0 ? `${(index % 4) * 8}px` : '0px',
                      marginBottom: index % 3 === 1 ? `${(index % 5) * 6}px` : '0px',
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-500 text-[8px] sm:text-xs uppercase tracking-wider">Photo</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Main Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 sm:mb-16"
          >
            <div className="flex justify-center">
              {mainStats.map((stat, index) => (
                <CountUpStats key={index} end={stat.value} suffix={stat.suffix} label={stat.label} isMain={true} />
              ))}
            </div>
          </motion.div>

          {/* Secondary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-2xl mx-auto mb-12 sm:mb-16"
          >
            {secondaryStats.map((stat, index) => (
              <CountUpStats key={index} end={stat.value} suffix={stat.suffix} label={stat.label} isMain={false} />
            ))}
          </motion.div>

          {/* Join Us Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12 sm:mb-16"
          >
            <button
              onClick={() => setShowPopup(true)}
              className="px-8 sm:px-10 py-3 sm:py-4 border border-red-600/50 hover:border-red-600 hover:bg-red-600/10 text-white text-sm sm:text-base transition-all duration-300 rounded-full"
            >
              Join us
            </button>
          </motion.div>

          {/* Map Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16 sm:mb-20"
          >
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 shadow-xl shadow-red-600/5">
                <div className="aspect-[16/9] bg-gray-900">
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
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent mb-8 sm:mb-10" />

          {/* Footer Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center gap-6 sm:gap-8"
          >
            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 md:gap-9">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-red-500 text-xs sm:text-sm transition-colors duration-300 tracking-wider"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Email & Phone */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <a
                href="mailto:amethi.aajtak@gmail.com"
                className="text-gray-500 hover:text-red-500 text-xs sm:text-sm transition-colors duration-300 tracking-wider"
              >
                amethi.aajtak@gmail.com
              </a>
              <span className="text-gray-700 text-xs hidden sm:inline">|</span>
              <a
                href="tel:+917275886607"
                className="text-gray-500 hover:text-red-500 text-xs sm:text-sm transition-colors duration-300 tracking-wider"
              >
                +91 72758 86607
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-600 text-xs sm:text-sm tracking-wide">
                © {new Date().getFullYear()} NOW44 News. All rights reserved.
              </p>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* Join Popup */}
      <JoinPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </>
  )
}
