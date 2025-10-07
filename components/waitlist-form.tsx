'use client'

import { useState } from 'react'

interface WaitlistFormProps {
  isVisible: boolean
}

export function WaitlistForm({ isVisible }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/waitlist' 
        : 'http://localhost:3001/api/waitlist';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        // Handle error (email already exists, etc.)
        console.error('Error:', data.error)
        alert(data.error || 'Failed to join waitlist')
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`fixed inset-0 flex items-center justify-end z-[130] transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-right max-w-sm w-full mx-8">
          <h2 className="text-xl font-sans font-medium text-white mb-4">
            Welcome to the new economy.
          </h2>
          <div className="text-white/70 font-sans text-sm space-y-3">
            <p>
              We will only contact you with info related to your account and only if you want, updates on progress towards our goals as an organization.
            </p>
            <p>
              We are happy to have you here.
            </p>
            <p className="text-white/80 font-medium">
              Let's build internet-native cryptographically secure and privacy-first money together.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-end z-[130] transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-right max-w-sm w-full mx-8">
        <h1 className="text-xl font-sans font-medium text-white mb-6">
          Join the Waitlist
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-0 py-3 bg-transparent border-b border-white/30 text-white placeholder-white/50 font-sans text-sm focus:outline-none focus:border-white/60 transition-colors duration-200"
          />
          
          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full py-3 bg-white text-black font-sans font-medium text-sm hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>
      </div>
    </div>
  )
}
