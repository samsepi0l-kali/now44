import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function YouTubeSection() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedShort, setSelectedShort] = useState(null)
  const [activeTab, setActiveTab] = useState('videos')

  // Regular Videos (long form)
  const videos = [
    { id: "7-UFjHduvkE", title: "सुल्तानपुर मेडिकल कॉलेज में बवाल", publishedAt: "2026-05-15", channelTitle: "NOW44 News Channel", views: "2.9K" },
    { id: "2WXAQXGinuk", title: "सुल्तानपुर में हिस्ट्रीशीटर ने खुद को मारी गोली", publishedAt: "2026-05-14", channelTitle: "NOW44 News Channel", views: "5.1K" },
    { id: "2qSDRYDXRJo", title: "अमेठी में शिक्षकों को दिया गया सड़ा खाना", publishedAt: "2026-04-30", channelTitle: "NOW44 News Channel", views: "1.8K" },
    { id: "1mVwdpvOB64", title: "सुल्तानपुर के पूर्वांचल एक्सप्रेस पर युद्धाभ्यास", publishedAt: "2026-04-22", channelTitle: "NOW44 News Channel", views: "5.8K" },
    { id: "85dR1jxavEc", title: "सुल्तानपुर में बेटी की शादी से पहले पिता की हत्या", publishedAt: "2026-04-12", channelTitle: "NOW44 News Channel", views: "1.7K" },
    { id: "OCm4p0leVuE", title: "सुल्तानपुर में प्रॉपर्टी डीलर की गोली मारकर हत्या", publishedAt: "2026-03-25", channelTitle: "NOW44 News Channel", views: "13.9K" }
  ]

  // SHORTS - Replace these IDs with actual YouTube Shorts video IDs
  // Shorts URLs look like: https://youtube.com/shorts/VIDEO_ID
  const shorts = [
    { id: "7-UFjHduvkE", title: "सुल्तानपुर मेडिकल कॉलेज बवाल", publishedAt: "2026-05-15", channelTitle: "NOW44 News", views: "2.9K" },
    { id: "2WXAQXGinuk", title: "हिस्ट्रीशीटर ने खुद को मारी गोली", publishedAt: "2026-05-14", channelTitle: "NOW44 News", views: "5.1K" },
    { id: "2qSDRYDXRJo", title: "अमेठी में शिक्षकों को सड़ा खाना", publishedAt: "2026-04-30", channelTitle: "NOW44 News", views: "1.8K" },
    { id: "1mVwdpvOB64", title: "पूर्वांचल एक्सप्रेस पर युद्धाभ्यास", publishedAt: "2026-04-22", channelTitle: "NOW44 News", views: "5.8K" },
    { id: "85dR1jxavEc", title: "बेटी की शादी से पहले पिता की हत्या", publishedAt: "2026-04-12", channelTitle: "NOW44 News", views: "1.7K" },
    { id: "OCm4p0leVuE", title: "प्रॉपर्टी डीलर की गोली मारकर हत्या", publishedAt: "2026-03-25", channelTitle: "NOW44 News", views: "13.9K" }
  ]

  useEffect(() => {
    if (videos.length > 0) setSelectedVideo(videos[0])
    if (shorts.length > 0) setSelectedShort(shorts[0])
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

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-900 rounded-full p-1">
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-8 py-2.5 rounded-full text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
                activeTab === 'videos' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab('shorts')}
              className={`px-8 py-2.5 rounded-full text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
                activeTab === 'shorts' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Shorts
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* VIDEOS MODE */}
          {activeTab === 'videos' && selectedVideo && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0f0f0f] rounded-xl overflow-hidden shadow-2xl w-full"
            >
              <div className="bg-[#202020] px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 flex items-center gap-2 sm:gap-3 md:gap-4 border-b border-[#303030]">
                <div className="flex items-center gap-1 sm:gap-2">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                  </svg>
                  <span className="text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl">YouTube</span>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8 p-3 sm:p-4 md:p-5 lg:p-8">
                <div className="flex-1">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=0&modestbranding=1&rel=0&showinfo=0`}
                      title={selectedVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <h1 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-normal mt-3 sm:mt-4 line-clamp-2">
                    {selectedVideo.title}
                  </h1>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-3 pb-3 sm:pb-4 border-b border-[#303030]">
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
                  <h3 className="text-white font-medium text-sm sm:text-base mb-2 sm:mb-3">Up next</h3>
                  <div className="space-y-2 sm:space-y-3 max-h-[600px] overflow-y-auto">
                    {videos.slice(1).map((video, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedVideo(video)}
                        className="flex gap-2 sm:gap-3 cursor-pointer hover:bg-[#272727] rounded-lg p-1.5 sm:p-2 transition-all duration-200"
                      >
                        <div className="relative w-28 sm:w-32 md:w-36 lg:w-40 flex-shrink-0">
                          <img 
                            src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                            alt={video.title}
                            className="w-full rounded-md"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">{video.title}</p>
                          <p className="text-gray-400 text-xs mt-0.5 sm:mt-1">{video.channelTitle}</p>
                          <p className="text-gray-500 text-xs mt-0.5">{video.views} views • {formatDate(video.publishedAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SHORTS MODE - Vertical player */}
          {activeTab === 'shorts' && selectedShort && (
            <motion.div
              key="shorts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-[360px] mx-auto">
                <div className="bg-black rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
                  <div className="bg-black px-4 pt-3 pb-2 flex justify-between text-white text-xs">
                    <span>9:41</span>
                  </div>
                  
                  <div className="relative aspect-[9/16] bg-black">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedShort.id}?autoplay=0&modestbranding=1&rel=0&showinfo=0`}
                      title={selectedShort.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm line-clamp-2">{selectedShort.title}</h3>
                          <p className="text-gray-300 text-xs mt-1">NOW44 News</p>
                          <p className="text-gray-400 text-xs mt-1">{selectedShort.views} views</p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                          <button className="flex flex-col items-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            <span className="text-white text-[10px] mt-1 uppercase tracking-wide">Like</span>
                          </button>
                          <button className="flex flex-col items-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13v-9m-7 10h2M17 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                            </svg>
                            <span className="text-white text-[10px] mt-1 uppercase tracking-wide">Dislike</span>
                          </button>
                          <button className="flex flex-col items-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            <span className="text-white text-[10px] mt-1 uppercase tracking-wide">Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2 flex justify-center">
                    <div className="w-10 h-1 bg-gray-600 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* More Shorts - Horizontal scroll */}
        {activeTab === 'shorts' && (
          <div className="mt-8">
            <h3 className="text-white font-medium text-sm sm:text-base mb-3 text-center uppercase tracking-wide">More shorts</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 px-2">
              {shorts.slice(1).map((short, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedShort(short)}
                  className="flex-shrink-0 w-32 cursor-pointer hover:scale-105 transition-transform duration-200"
                >
                  <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-gray-800">
                    <img 
                      src={`https://img.youtube.com/vi/${short.id}/mqdefault.jpg`}
                      alt={short.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded uppercase tracking-wide">
                      Short
                    </div>
                  </div>
                  <p className="text-white text-xs mt-2 line-clamp-2 font-normal">{short.title}</p>
                  <p className="text-gray-500 text-xs mt-1">{short.views} views</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </section>
  )
}
