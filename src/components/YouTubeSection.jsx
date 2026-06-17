import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function YouTubeSection() {
  const [selectedShort, setSelectedShort] = useState(null)
  const [shorts, setShorts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Fade in/out the red glow based on scroll position
  // 0 to 0.15: fade in, 0.15 to 0.85: full visibility, 0.85 to 1: fade out
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    [0, 0.1, 0.1, 0]
  )

  const CHANNEL_ID = 'UCWVgdi437t9cIx_8cH2DcXQ'
  const API_KEY = 'AIzaSyAnLNyTGMB9dfBWYISKRDFrgo1aoPV_SwY'

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=30&order=date&type=video&key=${API_KEY}`
        )
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.items && data.items.length > 0) {
          const shortsVideos = data.items.filter(item => 
            item.snippet.title.toLowerCase().includes('#shorts') || 
            item.snippet.title.toLowerCase().includes('ytshorts')
          )
          
          if (shortsVideos.length > 0) {
            const shortsList = shortsVideos.map(item => ({
              id: item.id.videoId,
              title: item.snippet.title,
              publishedAt: item.snippet.publishedAt,
              channelTitle: item.snippet.channelTitle,
              thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url
            }))
            
            setShorts(shortsList)
            setSelectedShort(shortsList[0])
          } else {
            setError('No shorts found on this channel')
          }
        } else {
          setError('No videos found')
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching YouTube data:', error)
        setError('Unable to retrieve shorts at this time')
        setLoading(false)
      }
    }
    
    fetchShorts()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.ceil(Math.abs(now - date) / (1000 * 60 * 60 * 24))
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  if (loading) {
    return (
      <section className="bg-black py-32 text-center">
        <div className="inline-block w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-black py-32 text-center px-4">
        <p className="text-gray-400 text-sm">Unable to retrieve shorts at this time</p>
        <p className="text-gray-500 text-xs mt-2">हमें शॉर्ट्स प्राप्त करने में समस्या हो रही है</p>
      </section>
    )
  }

  if (shorts.length === 0) {
    return (
      <section className="bg-black py-32 text-center px-4">
        <p className="text-gray-400 text-sm">No shorts available</p>
        <p className="text-gray-500 text-xs mt-2">कोई शॉर्ट्स उपलब्ध नहीं है</p>
      </section>
    )
  }

  return (
    <motion.section 
      ref={sectionRef}
      className="relative bg-black py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      
      {/* YouTube-style red glow that fades in/out with scroll */}
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
      >
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-red-600/25 to-transparent" />
        
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-red-600/15 to-transparent" />
        
        {/* Center glow - larger and more prominent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-red-600/25 blur-3xl" />
        
        {/* Secondary glow - offset for depth */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-red-700/10 blur-3xl" />
      </motion.div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header - Mobile optimized like ProfileSection */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
              <polygon points="9.545,15.568 9.545,8.432 15.818,12" fill="#FFFFFF"/>
            </svg>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight text-white">
              यूट्यूब शॉर्ट्स
            </h2>
          </div>
          <div className="w-8 sm:w-12 md:w-16 h-px bg-red-600/50 mx-auto mt-3 sm:mt-4" />
        </div>

        {/* Shorts Player */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <div className="bg-[#0f0f0f] rounded-xl overflow-hidden border border-[#2a2a2a] shadow-xl shadow-red-600/5">
              <div className="bg-gradient-to-r from-[#202020] to-[#2a2020] px-3 py-2 flex items-center gap-2 border-b border-[#2a2a2a]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF0000">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                  <polygon points="9.545,15.568 9.545,8.432 15.818,12" fill="#FFFFFF"/>
                </svg>
                <span className="text-white font-medium text-xs tracking-wide">SHORTS</span>
              </div>

              <div className="relative aspect-[9/16]">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedShort.id}?autoplay=0&modestbranding=1&rel=0`}
                  title={selectedShort.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-2 bg-gradient-to-t from-[#0f0f0f] to-transparent">
                <p className="text-white text-xs line-clamp-2">{selectedShort.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[#666666] text-[10px]">{formatDate(selectedShort.publishedAt)}</p>
                  <span className="text-[#333333] text-[8px]">•</span>
                  <p className="text-[#444444] text-[10px]">#shorts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Shorts + Open Channel Button */}
        {shorts.length > 1 && (
          <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
              <div className="w-8 sm:w-12 h-px bg-red-600/30" />
              <p className="text-gray-400 text-[9px] sm:text-[10px] uppercase tracking-wider">More shorts</p>
              <div className="w-8 sm:w-12 h-px bg-red-600/30" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {shorts.slice(1, 5).map((short) => (
                <div
                  key={short.id}
                  onClick={() => setSelectedShort(short)}
                  className="cursor-pointer group"
                >
                  <div className="aspect-[9/16] rounded-lg overflow-hidden bg-[#1a1a1a] relative">
                    <img 
                      src={short.thumbnail} 
                      alt={short.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-1 right-1 bg-red-600/80 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ▶
                    </div>
                  </div>
                  <p className="text-white text-[9px] sm:text-[10px] mt-1 line-clamp-2 group-hover:text-red-500 transition-colors">{short.title}</p>
                  <p className="text-[#666666] text-[8px] sm:text-[9px] mt-0.5">{formatDate(short.publishedAt)}</p>
                </div>
              ))}
            </div>
            
            {/* Open Channel Button */}
            <div className="text-center mt-6 sm:mt-8">
              <a 
                href="https://www.youtube.com/channel/UCWVgdi437t9cIx_8cH2DcXQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 border border-red-600/50 hover:border-red-600 hover:bg-red-600/10 text-white text-xs sm:text-sm transition-all duration-300 rounded-full"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                  <polygon points="9.545,15.568 9.545,8.432 15.818,12" fill="#FFFFFF"/>
                </svg>
                <span>Open Channel</span>
              </a>
            </div>
          </div>
        )}
        
      </div>
    </motion.section>
  )
}
