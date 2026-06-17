import { useState } from 'react'
import Preloader from './components/Preloader'
import HeroSection from './components/HeroSection'
import ScrollSection from './components/ScrollSection'
import YouTubeSection from './components/YouTubeSection'
import ProfileSection from './components/ProfileSection'
import FooterSection from './components/FooterSection'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="bg-black min-h-screen">
      <main>
        <HeroSection />
        <ScrollSection />
        <YouTubeSection />
        <ProfileSection />
        <FooterSection />
      </main>
    </div>
  )
}

export default App
