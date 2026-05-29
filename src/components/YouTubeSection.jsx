import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function YouTubeSection() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedShort, setSelectedShort] = useState(null)
  const [activeTab, setActiveTab] = useState('videos')
  const [videos, setVideos] = useState([])
  const [shorts, setShorts] = useState([])
  const [loading, setLoading] = useState(true)

  const CHANNEL_ID = 'UCWVgdi437t9cIx_8cH2DcXQ'
  const API_KEY = 'AIzaSyAnLNyTGMB9dfBWYISKRDFrgo1aoPV_SwY'

  const fallbackVideos = [
    { id: "7-UFjHduvkE", title: "सुल्तानपुर मेडिकल कॉलेज में बवाल", publishedAt: "2026-05-15", channelTitle: "NOW44 News Channel", thumbnail: "https://img.youtube.com/vi/7-UFjHduvkE/mqdefault.jpg" },
    { id: "2WXAQXGinuk", title: "सुल्तानपुर में हिस्ट्रीशीटर ने खुद को मारी गोली", publishedAt: "2026-05-14", channelTitle: "NOW44 News Channel", thumbnail: "https://img.youtube.com/vi/2WXAQXGinuk/mqdefault.jpg" },
    { id: "2qSDRYDXRJo", title: "अमेठी में शिक्षकों को दिया गया सड़ा खाना", publishedAt: "2026-04-30", channelTitle: "NOW44 News Channel", thumbnail: "https://img.youtube.com/vi/2qSDRYDXRJo/mqdefault.jpg" },
    { id: "1mVwdpvOB64", title: "सुल्तानपुर के पूर्वांचल एक्सप्रेस पर युद्धाभ्यास", publishedAt: "2026-04-22", channelTitle: "NOW44 News Channel", thumbnail: "https://img.youtube.com/vi/1mVwdpvOB64/mqdefault.jpg" },
    { id: "85dR1jxavEc", title: "सुल्तानपुर में बेटी की शादी से पहले पिता की हत्या", publishedAt: "2026-04-12", channelTitle: "NOW44 News Channel", thumbnail: "https://img.youtube.com/vi/85dR1jxavEc/mqdefault.jpg" },
    { id: "OCm4p0leVuE", title: "सुल्तानपुर में प्रॉपर्टी डीलर की गोली मारकर हत्या", publishedAt: "2026-03-25", channelTitle: "NOW44 News Channel", thumbnail: "https://img.youtube.com/vi/OCm4p0leVuE/mqdefault.jpg" }
  ]

  const fallbackShorts = [
    { id: "7-UFjHduvkE", title: "सुल्तानपुर मेडिकल कॉलेज बवाल", publishedAt: "2026-05-15", channelTitle: "NOW44 News", thumbnail: "https://img.youtube.com/vi/7-UFjHduvkE/mqdefault.jpg" },
    { id: "2WXAQXGinuk", title: "हिस्ट्रीशीटर ने खुद को मारी गोली", publishedAt: "2026-05-14", channelTitle: "NOW44 News", thumbnail: "https://img.youtube.com/vi/2WXAQXGinuk/mqdefault.jpg" },
    { id: "2qSDRYDXRJo", title: "अमेठी में शिक्षकों को सड़ा खाना", publishedAt: "2026-04-30", channelTitle: "NOW44 News", thumbnail: "https://img.youtube.com/vi/2qSDRYDXRJo/mqdefault.jpg" },
    { id: "1mVwdpvOB64", title: "पूर्वांचल एक्सप्रेस पर युद्धाभ्यास", publishedAt: "2026-04-22", channelTitle: "NOW44 News", thumbnail: "https://img.youtube.com/vi/1mVwdpvOB64/mqdefault.jpg" },
    { id: "85dR1jxavEc", title: "बेटी की शादी से पहले पिता की हत्या", publishedAt: "2026-04-12", channelTitle: "NOW44 News", thumbnail: "https://img.youtube.com/vi/85dR1jxavEc/mqdefault.jpg" }
  ]

  useEffect(() => {
    const fetchYouTubeData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=30&order=date&type=video&key=${API_KEY}`
        )
        const data = await response.json()
        
        if (data.items && data.items.length > 0) {
          const regularVideos = []
          const shortsVideos = []
          
          data.items.forEach((item) => {
            const title = item.snippet.title.toLowerCase()
            const isShort = title.includes('#shorts') || title.includes('ytshorts')
            
            const videoObj = {
              id: item.id.videoId,
              title: item.snippet.title,
              publishedAt: item.snippet.publishedAt,
              channelTitle: item.snippet.channelTitle,
              thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url
            }
            
            if (isShort) {
              shortsVideos.push(videoObj)
            } else {
              regularVideos.push(videoObj)
            }
          })
          
          if (regularVideos.length > 0) setVideos(regularVideos)
          else setVideos(fallbackVideos)
          
          if (shortsVideos.length > 0) setShorts(shortsVideos.slice(0, 5))
          else setShorts(fallbackShorts.slice(0, 5))
          
          if (regularVideos.length > 0) setSelectedVideo(regularVideos[0])
          else setSelectedVideo(fallbackVideos[0])
          
          if (shortsVideos.length > 0) setSelectedShort(shortsVideos[0])
          else setSelectedShort(fallbackShorts[0])
        } else {
          setVideos(fallbackVideos)
          setShorts(fallbackShorts.slice(0, 5))
          setSelectedVideo(fallbackVideos[0])
          setSelectedShort(fallbackShorts[0])
        }
        setLoading(false)
      } catch (error) {
        setVideos(fallbackVideos)
        setShorts(fallbackShorts.slice(0, 5))
        setSelectedVideo(fallbackVideos[0])
        setSelectedShort(fallbackShorts[0])
        setLoading(false)
      }
    }
    
    fetchYouTubeData()
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

  return (
    <section className="bg-black py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-white tracking-tight">यूट्यूब</h2>
          <div className="w-12 h-px bg-red-600 mx-auto mt-3" />
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="relative bg-[#1a1a1a] rounded-full p-1 w-56">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`absolute top-1 bottom-1 w-1/2 bg-red-600 rounded-full ${
                activeTab === 'videos' ? 'left-1' : 'left-[calc(50%-2px)]'
              }`}
            />
            <div className="relative flex">
              <button onClick={() => setActiveTab('videos')} className="flex-1 py-1.5 text-sm rounded-full relative z-10 text-white">Videos</button>
              <button onClick={() => setActiveTab('shorts')} className="flex-1 py-1.5 text-sm rounded-full relative z-10 text-white">Shorts</button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* VIDEOS TAB */}
          {activeTab === 'videos' && selectedVideo && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[#0f0f0f] rounded-xl overflow-hidden border border-[#2a2a2a]">
                <div className="bg-[#202020] px-4 py-3 flex items-center gap-2 border-b border-[#2a2a2a]">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#FF0000">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                    <polygon points="9.545,15.568 9.545,8.432 15.818,12" fill="#FFFFFF"/>
                  </svg>
                  <span className="text-white font-medium text-base">YouTube</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-5 p-5">
                  <div className="flex-1">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=0&modestbranding=1&rel=0`}
                        title={selectedVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <h1 className="text-white text-lg font-normal mt-3">{selectedVideo.title}</h1>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">N</div>
                      <div>
                        <p className="text-white text-sm">NOW44 News Channel</p>
                        <p className="text-[#666666] text-xs">78.4K subscribers</p>
                      </div>
                      <button className="ml-auto bg-white text-black px-4 py-1 rounded-full text-xs font-medium hover:bg-[#e5e5e5] transition">Subscribe</button>
                    </div>
                  </div>

                  <div className="lg:w-96">
                    <h3 className="text-white text-sm font-medium mb-3">Up next</h3>
                    <div className="space-y-3">
                      {videos.slice(1, 6).map((video) => (
                        <div
                          key={video.id}
                          onClick={() => setSelectedVideo(video)}
                          className="flex gap-3 cursor-pointer hover:bg-[#1a1a1a] p-2 rounded-lg transition"
                        >
                          <img src={video.thumbnail} alt={video.title} className="w-32 rounded-md object-cover" />
                          <div className="flex-1">
                            <p className="text-white text-xs line-clamp-2">{video.title}</p>
                            <p className="text-[#666666] text-xs mt-1">{video.channelTitle}</p>
                            <p className="text-[#666666] text-xs mt-1">{formatDate(video.publishedAt)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SHORTS TAB */}
          {activeTab === 'shorts' && selectedShort && (
            <motion.div
              key="shorts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-md mx-auto">
                <div className="bg-[#0f0f0f] rounded-xl overflow-hidden border border-[#2a2a2a]">
                  <div className="bg-[#202020] px-3 py-2 flex items-center gap-2 border-b border-[#2a2a2a]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF0000">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                      <polygon points="9.545,15.568 9.545,8.432 15.818,12" fill="#FFFFFF"/>
                    </svg>
                    <span className="text-white font-medium text-xs tracking-wide">SHORTS</span>
                  </div>

                  <div className="relative bg-black" style={{ height: '480px' }}>
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedShort.id}?autoplay=0&modestbranding=1&rel=0`}
                      title={selectedShort.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-white text-xs line-clamp-2">{selectedShort.title}</p>
                    <p className="text-[#666666] text-[10px] mt-1">{formatDate(selectedShort.publishedAt)}</p>
                  </div>
                </div>
              </div>

              {shorts.length > 1 && (
                <div className="mt-8 max-w-2xl mx-auto">
                  <h3 className="text-white text-xs font-medium text-center mb-3 uppercase tracking-wider">More shorts</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {shorts.slice(1, 5).map((short) => (
                      <div
                        key={short.id}
                        onClick={() => setSelectedShort(short)}
                        className="cursor-pointer hover:scale-105 transition duration-200"
                      >
                        <div className="aspect-[9/16] rounded-lg overflow-hidden bg-[#1a1a1a]">
                          <img 
                            src={short.thumbnail} 
                            alt={short.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-white text-[10px] mt-1 line-clamp-2">{short.title}</p>
                        <p className="text-[#666666] text-[9px] mt-0.5">{formatDate(short.publishedAt)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
