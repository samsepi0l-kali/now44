import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function JoinPopup({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    jobRole: '',
    cv: null
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const jobRoles = [
    'Anchor',
    'Editor',
    'Video Editor',
    'Cameraman',
    'Sound Engineer',
    'Drone Pilot',
    'Reporter',
    'Producer',
    'News Writer',
    'Social Media Manager'
  ]

  const validateName = (name) => {
    if (!name) return 'Name is required'
    if (name.length < 2) return 'Name must be at least 2 characters'
    return ''
  }

  const validatePhone = (phone) => {
    if (!phone) return 'Phone number is required'
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(phone)) return 'Enter valid 10-digit Indian mobile number'
    return ''
  }

  const validateEmail = (email) => {
    if (!email) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return 'Enter a valid email address'
    return ''
  }

  const validateAddress = (address) => {
    if (!address) return 'Address is required'
    if (address.length < 10) return 'Please enter complete address'
    return ''
  }

  const validateJobRole = (jobRole) => {
    if (!jobRole) return 'Please select a job role'
    return ''
  }

  const validateCV = (cv) => {
    if (!cv) return 'Please upload your CV'
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!validTypes.includes(cv.type)) return 'Please upload PDF or DOC file'
    if (cv.size > 5 * 1024 * 1024) return 'File size must be less than 5MB'
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({ ...prev, cv: file }))
    if (errors.cv) {
      setErrors(prev => ({ ...prev, cv: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = {
      name: validateName(formData.name),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
      address: validateAddress(formData.address),
      jobRole: validateJobRole(formData.jobRole),
      cv: validateCV(formData.cv)
    }
    
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key]
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('phone', formData.phone)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('address', formData.address)
    formDataToSend.append('jobRole', formData.jobRole)
    formDataToSend.append('cv', formData.cv)
    
    try {
      const response = await fetch('https://formspree.io/f/xbdbqgqk', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
          setFormData({
            name: '',
            phone: '',
            email: '',
            address: '',
            jobRole: '',
            cv: null
          })
          setSubmitStatus(null)
        }, 2000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus(null), 3000)
      }
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 3000)
    }
    
    setIsSubmitting(false)
  }

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
            <div className="bg-black rounded-none w-full max-w-lg max-h-[90vh] overflow-y-auto">
              
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
              
              {/* Form - Minimal styling */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-0 py-2 bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors duration-200 text-base`}
                    placeholder="full name *"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-0 py-2 bg-transparent border-b ${errors.phone ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors duration-200 text-base`}
                    placeholder="phone number *"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                
                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-0 py-2 bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors duration-200 text-base`}
                    placeholder="email address *"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                {/* Address */}
                <div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-0 py-2 bg-transparent border-b ${errors.address ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors duration-200 text-base`}
                    placeholder="address *"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                
                {/* Job Role */}
                <div>
                  <select
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleChange}
                    className={`w-full px-0 py-2 bg-transparent border-b ${errors.jobRole ? 'border-red-500' : 'border-gray-700'} text-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-200 text-base cursor-pointer appearance-none`}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0 center',
                      backgroundSize: '20px'
                    }}
                  >
                    <option value="" className="bg-black">select role *</option>
                    {jobRoles.map(role => (
                      <option key={role} value={role} className="bg-black">{role}</option>
                    ))}
                  </select>
                  {errors.jobRole && <p className="text-red-500 text-xs mt-1">{errors.jobRole}</p>}
                </div>
                
                {/* CV Upload */}
                <div>
                  <label className="block text-gray-500 text-xs uppercase tracking-wider mb-2">upload cv *</label>
                  <input
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full text-gray-400 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-sm file:font-normal file:bg-transparent file:text-white hover:file:text-red-500 file:cursor-pointer cursor-pointer"
                  />
                  {errors.cv && <p className="text-red-500 text-xs mt-1">{errors.cv}</p>}
                  <p className="text-gray-600 text-xs mt-1">PDF or DOC, max 5MB</p>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 py-3 bg-white text-black text-sm font-medium uppercase tracking-wider hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'submitting...' : 'send application'}
                </button>
                
                {/* Success/Error Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center pt-4"
                    >
                      <p className="text-green-500 text-sm">✓ submitted</p>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center pt-4"
                    >
                      <p className="text-red-500 text-sm">✗ error — try again</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
