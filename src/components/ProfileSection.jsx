import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getAssetPath } from '../utils/paths'

function CountUp({ end, duration = 2 }) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return
    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min(1, (currentTime - startTime) / (duration * 500))
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(end)
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])
  
  return <span ref={nodeRef}>{count}</span>
}

function SocialIcon({ type, href }) {
  const getIconColor = () => {
    switch(type) {
      case 'instagram': return 'text-[#E4405F]'
      case 'facebook': return 'text-[#1877F2]'
      case 'whatsapp': return 'text-[#25D366]'
      case 'x': return 'text-[#000000]'
      case 'linkedin': return 'text-[#0A66C2]'
      case 'github': return 'text-[#181717]'
      default: return 'text-gray-600'
    }
  }

  const getIcon = () => {
    switch(type) {
      case 'instagram':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        )
      case 'facebook':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
          </svg>
        )
      case 'whatsapp':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )
      case 'x':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        )
      case 'linkedin':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
          </svg>
        )
      case 'github':
        return (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`${getIconColor()} transition-transform duration-200 block p-1`}
      style={{ touchAction: 'manipulation' }}
    >
      {getIcon()}
    </motion.a>
  )
}

export default function ProfileSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  
  const profiles = [
    {
      name: "Alok Srivastava",
      nameHi: "अलोक श्रीवास्तव",
      role: "Founder & Chief Editor",
      roleHi: "संस्थापक एवं प्रधान संपादक",
      experience: 24,
      imageAlign: "left",
      photo: "alok.png",
      bio: "A veteran journalist with over two decades of experience in broadcast news, Alok has shaped the editorial direction of leading news networks across India.",
      achievements: [
        "Got appreciation letter from BBC Broadcasting for the special news/article in 2007",
        "Conducted interviews of Famous Personalities - Sonia Gandhi, Rahul Gandhi, Priyanka Gandhi, Amit Shah, Manohar Parikar, AdityaNath Yogi (CM UP.), Nitin Gadkari, Smriti Irani, Rajnath singh, Kumar Vishwash, Sharad Yadaw, Ram Vilaas Paswan, Bharat Jagdev (President of Guyana), Mayawati, Raghuraj Pratap Singh (Raja bhaiya), Mulayam singh yadav, Akhilesh Yadav, Hema Malini, Ashok Singhal & many more. ",
        "Covered 6 National Elections (लोकसभा चुनाव) live",
        "Worked on Strengthening Indo-Russian relationships through Russian-Indian Friendship Society (DISHA)"
      ],
      education: {
        primary: "Master of Arts (MA) in Hindi Literature",
        secondary: "Diploma in Mass Communication"
      },
      socials: {
        instagram: "https://www.instagram.com/alokaajtak/",
        facebook: "https://www.facebook.com/alok.srivastava.988373",
        whatsapp: "https://wa.me/919839221161",
        x: "https://x.com/AlokAajtak",
        linkedin: "https://in.linkedin.com/in/alok-srivastava-57454a1a6"
      },
      workExperience: [
        {
          company: "Sahara Samay",
          role: "Bureau Chief Amethi",
          years: "2003 - 2005",
          logo: "saharasamay.png"
        },
        {
          company: "Aajtak (TV Today Network Ltd.)",
          role: "Reporter",
          years: "2005 - 2023",
          logo: "aajtak.png"
        },
        {
          company: "Times Now Navbharat",
          role: "Reporter",
          years: "2023 - Present",
          logo: "timesnownavbharat.png"
        }
      ]
    },
    {
      name: "Jagriti Srivastava",
      nameHi: "जागृति श्रीवास्तव",
      role: "CEO",
      roleHi: "मुख्य कार्यकारी अधिकारी",
      experience: 20,
      imageAlign: "right",
      photo: "jagriti.png",
      bio: "A pioneering voice in Indian journalism, Jagriti has led digital transformation initiatives and mentored generations of young reporters.",
      achievements: [
        "Got appreciation letter from Independent News Agency (INA) for organising their News Program.",
        "Conducted interviews of Famous Personalities - Rahul Gandhi, Priyanka Gandhi, Smriti Irani, Kumar Vishwas, Menka Gandhi, Varun Gandhi, Rakesh Bedi, Hemant Pandey, Baba Aniruddha Charya Ji Maharaj and many more.",
        "Covered 5 National Elections (लोकसभा चुनाव) live"
      ],
      education: {
        primary: "Master of Arts (MA) in Political Science",
        secondary: "Diploma in Mass Communication"
      },
      socials: {
        instagram: "https://www.instagram.com/jagriti__srivastava/?__pwa=1",
        facebook: "https://www.facebook.com/jagriti.srivastava.16",
        whatsapp: "https://wa.me/919919071777"
      },
      workExperience: [
        {
          company: "India TV News",
          role: "Reporter",
          years: "2006 - Present",
          logo: "indiatv.png"
        }
      ]
    },
    {
      name: "Aditya Srivastava",
      nameHi: "आदित्य श्रीवास्तव",
      role: "IT",
      roleHi: "सूचना प्रौद्योगिकी",
      experience: 5,
      imageAlign: "left",
      photo: "aditya.png",
      bio: "An Aerospace Engineering student with a passion for Embedded Hardwares, Web Applications and Cybersecurity.",
      achievements: [
        "4th place in IT Cup Russia by Changellenge in 2025",
        "7th place in Web Application Security Challenge by Positive Hack Days in 2025",
        "3rd place in Robotics Competition in BK Birla Center of Education Pune in 2019"
      ],
      education: {
        primary: "Bachelor in Spacecraft Engineering from Moscow Aviation Institute"
      },
      socials: {
        instagram: "https://www.instagram.com/samsepi0l_07/?__pwa=1",
        facebook: "https://www.facebook.com/pirates0ftware/",
        whatsapp: "https://wa.me/+79253165983",
        github: "https://github.com/samsepi0l-kali"
      },
      workExperience: [
        {
          company: "Eternora Enterprises",
          role: "Programmer & Systems Architect",
          years: "2021 - Present",
          logo: "eternora.png"
        }
      ]
    }
  ]
  
  return (
    <section ref={sectionRef} className="relative bg-[#faf9f7] py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-24 lg:mb-32"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-black px-4">
            हमारी टीम
          </h2>
          <div className="w-12 md:w-16 h-px bg-black/10 mx-auto mt-4 sm:mt-6 md:mt-8" />
        </motion.div>
        
        <div className="space-y-24 sm:space-y-28 md:space-y-36 lg:space-y-48">
          {profiles.map((profile, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center"
            >
              <div className={`${profile.imageAlign === 'right' ? 'lg:order-last' : ''} w-full flex justify-center px-4`}>
                <div className="relative">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 mx-auto rounded-full overflow-hidden bg-gray-100 shadow-sm">
                    <img 
                      src={getAssetPath(profile.photo)}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-center lg:text-left px-4 sm:px-6 lg:px-0">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-black break-words">
                    {profile.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">{profile.nameHi}</p>
                </div>
                
                <div className="mt-2 sm:mt-3 md:mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
                  <span className="text-red-600 text-[11px] sm:text-xs md:text-sm font-medium tracking-wide">
                    {profile.role}
                  </span>
                  <span className="text-gray-300 text-[10px] sm:text-xs">/</span>
                  <span className="text-gray-400 text-[11px] sm:text-xs md:text-sm">{profile.roleHi}</span>
                </div>
                
                <div className="mt-3 sm:mt-4 md:mt-6 inline-flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-black">
                    <CountUp end={profile.experience} />+
                  </span>
                  <span className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs tracking-wide uppercase ml-0.5 sm:ml-1">Years</span>
                </div>
                
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-3 sm:mt-4 md:mt-6 border-l-2 border-red-600/20 pl-3 sm:pl-4 text-left">
                  {profile.bio}
                </p>
                
                {Object.keys(profile.socials).length > 0 && (
                  <div className="flex gap-4 sm:gap-5 mt-4 sm:mt-5 md:mt-6 justify-center lg:justify-start">
                    {Object.entries(profile.socials).map(([type, url]) => (
                      <SocialIcon key={type} type={type} href={url} />
                    ))}
                  </div>
                )}
                
                <div className="mt-5 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200">
                  <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2 sm:mb-3 md:mb-4 text-left">
                    Experience
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    {profile.workExperience.map((job, i) => (
                      <div key={i} className="flex gap-3 sm:gap-4 items-center group">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-100 p-1.5 sm:p-2 flex items-center justify-center">
                          <img 
                            src={getAssetPath(job.logo)}
                            alt={job.company}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-2">
                            <p className="text-sm sm:text-base font-semibold text-black truncate">{job.company}</p>
                            <span className="text-[10px] sm:text-xs text-gray-400 group-hover:text-red-600 transition-colors">
                              {job.years}
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">{job.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200">
                  <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-2 sm:mb-3 md:mb-4 text-left">
                    Achievements
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {profile.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-gray-600 text-left">
                        <span className="text-red-500 mt-0.5 text-xs sm:text-sm flex-shrink-0">—</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 sm:mt-5 md:mt-6 pt-3 sm:pt-4">
                  <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-1.5 sm:mb-2 text-left">
                    Education
                  </p>
                  <div className="space-y-0.5 sm:space-y-1">
                    <p className="text-[10px] sm:text-xs text-gray-600 text-left break-words leading-relaxed">
                      {typeof profile.education === 'object' ? profile.education.primary : profile.education}
                    </p>
                    {typeof profile.education === 'object' && profile.education.secondary && (
                      <p className="text-[10px] sm:text-xs text-gray-600 text-left break-words leading-relaxed">
                        {profile.education.secondary}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  )
}