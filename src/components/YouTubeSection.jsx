import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function YouTubeSection() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Your YouTube Channel ID - Replace with your actual channel ID
  const CHANNEL_ID = 'UC_your_channel_id' // REPLACE THIS
  
  // You'll need a YouTube API key - Get from Google Cloud Console
  const API_KEY = 'YOUR_API_KEY' // REPLACE THIS

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // First, get the playlist ID from channel
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
        )
        const channelData = await channelRes.json()
        
        if (!channelData.items || channelData.items.length === 0) {
          throw new Error('Channel not found')
        }
        
        const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads
        
        // Then, fetch the latest videos from that playlist
        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6&playlistId=${uploadsPlaylistId}&key=${API_KEY}`
        )
        const videosData = await videosRes.json()
        
        if (videosData.items) {
          setVideos(videosData.items)
        }
        setLoading(false)
      } catch (err) {
        console.error('Error fetching YouTube videos:', err)
        setError(err.message)
        setLoading(false)
      }
    }
    
    // Only fetch if API key is set
    if (API_KEY !== 'YOUR_API_KEY' && CHANNEL_ID !== 'UC_your_channel_id') {
      fetchVideos()
    } else {
      // Demo videos if no API key
      setVideos([
        { id: { videoId: "7-UFjHduvkE" }, snippet: { title: "सुल्तानपुर मेडिकल कॉलेज में बवाल", publishedAt: "2026-05-15" } },
        { id: { videoId: "2WXAQXGinuk" }, snippet: { title: "सुल्तानपुर में हिस्ट्रीशीटर ने खुद को मारी गोली", publishedAt: "2026-05-14" } },
        { id: { videoId: "2qSDRYDXRJo" }, snippet: { title: "अमेठी में शिक्षकों को दिया गया सड़ा खाना", publishedAt: "2026-04-30" } },
        { id: { videoId: "1mVwdpvOB64" }, snippet: { title: "सुल्तानपुर के पूर्वांचल एक्सप्रेस पर युद्धाभ्यास", publishedAt: "2026-04-22" } },
        { id: { videoId: "85dR1jxavEc" }, snippet: { title: "सुल्तानपुर में बेटी की शादी से पहले पिता की हत्या", publishedAt: "2026-04-12" } },
        { id: { videoId: "OCm4p0leVuE" }, snippet: { title: "सुल्तानपुर में प्रॉपर्टी डीलर की गोली मारकर हत्या", publishedAt: "2026-03-25" } }
      ])
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">लोड हो रहा है...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading videos</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-black py-24 px-4 md:px-8">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white">
            हमारी यूट्यूब खबरें
          </h2>
          <div className="w-20 h-0.5 bg-red-600 mx-auto mt-4" />
          <p className="text-gray-400 mt-4 text-base">
            सुल्तानपुर और अमेठी की ताज़ा वीडियो खबरें
          </p>
        </motion.div>
        
        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id.videoId || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-gray-900 rounded-xl">
                {/* Video Thumbnail / Player */}
                <div className="relative aspect-video">
                  <iframe
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={`https://www.youtube.com/embed/${video.id.videoId}?autoplay=0&modestbranding=1&rel=0&showinfo=0`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="p-4">
                  <h3 className="text-white font-medium text-base line-clamp-2 group-hover:text-red-500 transition-colors">
                    {video.snippet.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <span>NOW44 News</span>
                    <span>•</span>
                    <span>{new Date(video.snippet.publishedAt).toLocaleDateString('hi-IN')}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a 
            href="https://youtube.com/@now44newschannel" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm uppercase tracking-wider transition-colors duration-300"
          >
            <span>सभी वीडियो देखें</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
        
      </div>
    </section>
  )
}
