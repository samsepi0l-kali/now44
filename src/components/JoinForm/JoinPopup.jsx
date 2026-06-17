import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function JoinPopup({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200]"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-black rounded-none w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              
              {/* Header - Minimal like cvnt.in */}
              <div className="border-b border-gray-800 px-6 py-6 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-light tracking-tight text-white">
                    join<span className="font-medium text-red-600"> now</span>
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-white text-2xl transition-colors duration-200"
                >
                  ×
                </button>
              </div>
              
              {/* Google Form Embed */}
              <div className="p-6 min-h-[500px]">
                {/* Loading State */}
                {isLoading && (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-pulse text-gray-600 text-sm tracking-wider uppercase">
                      loading form...
                    </div>
                  </div>
                )}
                
                {/* Google Form Iframe */}
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSeop94fxIzynZJ9aB-lsLaL93JpYYA6WicODhfaNE-_7L2SjA/viewform?embedded=true"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  className="w-full"
                  onLoad={() => setIsLoading(false)}
                  title="Join Now - Google Form"
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}