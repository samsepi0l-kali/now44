import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black px-4">
      
      <div className="text-center max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] font-normal tracking-tight text-white whitespace-nowrap">
            सिर्फ खबर नहीं
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-4 sm:mt-6"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] font-normal tracking-tight whitespace-nowrap"
              style={{ color: '#ce4545' }}>
            आवाज़ है
          </h1>
        </motion.div>
        
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-12 left-0 right-0"
      >
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
          
          {/* YouTube */}
          <a 
            href="https://www.youtube.com/channel/UCWVgdi437t9cIx_8cH2DcXQ" 
            className="text-gray-500 hover:text-[#FF0000] transition-all duration-300 hover:scale-110" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/now44newschannel/" 
            className="text-gray-500 hover:text-[#E4405F] transition-all duration-300 hover:scale-110" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
          
          {/* Facebook */}
          <a 
            href="https://www.facebook.com/901178950223162/" 
            className="text-gray-500 hover:text-[#1877F2] transition-all duration-300 hover:scale-110" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          
          {/* X (Twitter) - White on hover */}
          <a 
            href="https://x.com/now44news" 
            className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-110" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="X"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"/>
            </svg>
          </a>
          
          {/* WhatsApp */}
          <a 
            href="https://wa.me/919839221161" 
            className="text-gray-500 hover:text-[#25D366] transition-all duration-300 hover:scale-110" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.032 0C5.392 0 0 5.372 0 12.03c0 2.126.556 4.207 1.61 6.03L0 24l6.104-1.608c1.785.991 3.806 1.513 5.928 1.513 6.64 0 12.032-5.372 12.032-12.03C24 5.372 18.64 0 12.032 0zm0 3.942c4.492 0 8.142 3.66 8.142 8.16 0 4.5-3.65 8.16-8.142 8.16a8.16 8.16 0 0 1-3.896-.977l-4.353 1.146 1.168-4.244a8.1 8.1 0 0 1-1.06-4.085c0-4.5 3.65-8.16 8.141-8.16z"/>
            </svg>
          </a>
          
        </div>
      </motion.div>
      
    </section>
  )
}