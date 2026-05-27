import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function YouTubeSection() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  
  const videos = [
    { id: { videoId: "7-UFjHduvkE" }, snippet: { title: "सुल्तानपुर मेडिकल कॉलेज में बवाल", publishedAt: "2026-05-15", channelTitle: "NOW44 News Channel" } },
    { id: { videoId: "2WXAQXGinuk" }, snippet: { title: "सुल्तानपुर में हिस्ट्रीशीटर ने खुद को मारी गोली", publishedAt: "2026-05-14", channelTitle: "NOW44 News Channel" } },
    { id: { videoId: "2qSDRYDXRJo" }, snippet: { title: "अमेठी में शिक्षकों को दिया गया सड़ा खाना", publishedAt: "2026-04-30", channelTitle: "NOW44 News Channel" } },
    { id: { videoId: "1mVwdpvOB64" }, snippet: { title: "सुल्तानपुर के पूर्वांचल एक्सप्रेस पर युद्धाभ्यास", publishedAt: "2026-04-22", channelTitle: "NOW44 News Channel" } },
    { id: { videoId: "85dR1jxavEc" }, snippet: { title: "सुल्तानपुर में बेटी की शादी से पहले पिता की हत्या", publishedAt: "2026-04-12", channelTitle: "NOW44 News Channel" } },
    { id: { videoId: "OCm4p0leVuE" }, snippet: { title: "सुल्तानपुर में प्रॉपर्टी डीलर की गोली मारकर हत्या", publishedAt: "2026-03-25", channelTitle: "NOW44 News Channel" } }
  ]

  useEffect(() => {
    if (videos.length > 0) {
      setSelectedVideo(videos[0])
    }
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  if (!selectedVideo) {
    return (
      <section className="bg-black py-20 px-4 md:px-8">
        <div className="text-center text-white">Loading...</div>
      </section>
    )
  }

  return (
    <section className="bg-black py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
            यूट्यूब
          </h2>
          <div className="w-16 sm:w-20 h-0.5 bg-red-600 mx-auto mt-3 sm:mt-4" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[#0f0f0f] rounded-xl overflow-hidden shadow-2xl w-full"
        >
          <div className="bg-[#202020] px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 flex items-center gap-2 sm:gap-3 md:gap-4 border-b border-[#303030]">
            <div className="flex items-center gap-1 sm:gap-2">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
              </svg>
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl">YouTube</span>
            </div>
            
            <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl mx-auto">
              <div className="bg-[#121212] rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-gray-400 text-xs sm:text-sm border border-[#303030]">
                Search...
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-red-600 flex items-center justify-center text-white text-xs sm:text-sm md:text-base font-bold">
                N
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8 p-3 sm:p-4 md:p-5 lg:p-8">
            <div className="flex-1">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=0&modestbranding=1&rel=0&showinfo=0`}
                  title={selectedVideo.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              
              <h1 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mt-3 sm:mt-4 line-clamp-2">
                {selectedVideo.snippet.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 mt-3 pb-3 sm:pb-4 border-b border-[#303030]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                    N
                  </div>
                  <div>
                    <p className="text-white text-sm sm:text-base font-medium">NOW44 News Channel</p>
                    <p className="text-gray-400 text-xs sm:text-sm">78.4K subscribers</p>
                  </div>
                  <button className="bg-white text-black px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-200 transition whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:w-[420px]">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="text-white font-semibold text-sm sm:text-base">Up next</h3>
              </div>
              
              <div className="space-y-2 sm:space-y-3 max-h-[600px] overflow-y-auto">
                {videos.slice(1).map((video, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedVideo(video)}
                    className="flex gap-2 sm:gap-3 cursor-pointer hover:bg-[#272727] rounded-lg p-1.5 sm:p-2 transition-all duration-200"
                  >
                    <div className="relative w-28 sm:w-32 md:w-36 lg:w-40 flex-shrink-0">
                      <img 
                        src={`https://img.youtube.com/vi/${video.id.videoId}/mqdefault.jpg`}
                        alt={video.snippet.title}
                        className="w-full rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{video.snippet.title}</p>
                      <p className="text-gray-400 text-xs mt-0.5 sm:mt-1 truncate">{video.snippet.channelTitle}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{formatDate(video.snippet.publishedAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
