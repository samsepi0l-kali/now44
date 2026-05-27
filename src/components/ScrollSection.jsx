import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import Microphone from './3D/Microphone'
import JoinPopup from './JoinForm/JoinPopup'

export default function ScrollSection() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [showPopup, setShowPopup] = useState(false)
  const containerRef = useRef()

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      let progress = 0
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        progress = Math.max(0, Math.min(1,
          (windowHeight - rect.top) / (windowHeight + rect.height)
        ))
      }
      
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const micSize = windowWidth < 768 ? 0.9 : 1.1
  const isMobile = windowWidth < 768

  const handleJoinClick = () => {
    setShowPopup(true)
  }

  return (
    <div ref={containerRef} className="relative w-full min-h-[200vh] bg-black">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        <div className="fixed right-5 top-7 z-[130]">
          {scrollProgress > 0.25 && (
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleJoinClick}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black hover:bg-gray-100 transition-all duration-300 shadow-lg sm:px-7 sm:py-3.5 sm:text-base cursor-pointer"
            >
              Join Us
            </motion.button>
          )}
        </div>
        
        <Canvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            zIndex: 30,
            pointerEvents: isMobile ? 'none' : 'auto'
          }}
          camera={{ position: [0, 0, 6.5], fov: 35 }}
        >
          <Microphone scrollProgress={scrollProgress} size={micSize} />
          {!isMobile && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={1.5}
              autoRotate={false}
            />
          )}
        </Canvas>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
          <div className="text-center px-4 max-w-5xl mx-auto">
            <div style={{ opacity: Math.min(1, scrollProgress * 2) }}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight leading-tight">
                <span style={{ color: '#7cb342' }}>आवाज़ उठाए</span>
                <br />
                <span className="text-white">हथियार नहीं</span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl font-normal mt-6 max-w-2xl mx-auto leading-relaxed">
                आपकी आवाज़ ही है जो कल की तस्वीर बदल सकती है
              </p>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Join Popup */}
      <JoinPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
      
    </div>
  )
}
