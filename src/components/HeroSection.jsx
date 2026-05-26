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
              style={{ color: '#c53131' }}>
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
          <a href="#" className="text-gray-500 hover:text-[#FF0000] transition-all duration-300 hover:scale-110" target="_blank" rel="noopener noreferrer">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-[#E4405F] transition-all duration-300 hover:scale-110" target="_blank" rel="noopener noreferrer">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-[#1877F2] transition-all duration-300 hover:scale-110" target="_blank" rel="noopener noreferrer">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-[#000000] transition-all duration-300 hover:scale-110" target="_blank" rel="noopener noreferrer">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-[#0A66C2] transition-all duration-300 hover:scale-110" target="_blank" rel="noopener noreferrer">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-[#25D366] transition-all duration-300 hover:scale-110" target="_blank" rel="noopener noreferrer">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.032 0C5.392 0 0 5.372 0 12.03c0 2.126.556 4.207 1.61 6.03L0 24l6.104-1.608c1.785.991 3.806 1.513 5.928 1.513 6.64 0 12.032-5.372 12.032-12.03C24 5.372 18.64 0 12.032 0zm0 3.942c4.492 0 8.142 3.66 8.142 8.16 0 4.5-3.65 8.16-8.142 8.16a8.16 8.16 0 0 1-3.896-.977l-4.353 1.146 1.168-4.244a8.1 8.1 0 0 1-1.06-4.085c0-4.5 3.65-8.16 8.141-8.16zm-1.32 4.372c-.286 0-.668.027-1.025.247-.26.162-1.293.84-1.293 2.028 0 1.188.858 2.335.972 2.496.114.163 1.643 2.62 4.002 3.542.557.217 1.36.439 2.015.232.535-.168 1.2-.88 1.37-1.548.07-.264.076-.514.019-.747-.136-.56-.789-1.15-.789-1.15s-.241-.165-.54-.249c-.188-.053-.496-.13-.703-.104-.148.018-.38.104-.598.364-.266.317-.567.784-.78.95-.159.125-.326.187-.547.125-.327-.092-1.11-.398-2.103-1.257-.777-.672-1.3-1.5-1.45-1.754-.16-.268-.018-.413.12-.548.125-.125.28-.326.42-.49.12-.14.16-.24.24-.4.08-.162.04-.3-.02-.42-.06-.12-.54-1.38-.74-1.89-.195-.496-.395-.428-.542-.435-.158-.006-.31-.006-.476-.006z"/>
            </svg>
          </a>
        </div>
      </motion.div>
      
    </section>
  )
}
