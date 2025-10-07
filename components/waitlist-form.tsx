'use client'

import { useState, useRef, useEffect } from 'react'

interface WaitlistFormProps {
  isVisible: boolean
  onEmailFocus?: () => void
  onEmailBlur?: () => void
}

export function WaitlistForm({ isVisible, onEmailFocus, onEmailBlur }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Global keyboard listener to always receive input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If Enter is pressed and we have an email, submit the form
      if (e.key === 'Enter' && email && !isLoading && !isSubmitted) {
        e.preventDefault()
        handleSubmit(e as any)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [email, isLoading, isSubmitted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('📧 Waitlist form submitted with email:', email);
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
      <div className="fixed inset-0 flex items-center justify-end z-[200]" style={{ pointerEvents: 'none' }}>
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
    <div className="fixed inset-0 flex items-center justify-end z-[200]" style={{ pointerEvents: 'none' }}>
      <div className="text-right max-w-sm w-full mx-8">
        <h1 className="text-xl font-sans font-medium text-white mb-6">
          Join the Movement
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4" style={{ pointerEvents: 'auto' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={onEmailFocus}
            onBlur={onEmailBlur}
            placeholder="Enter an email"
            required
            className="w-full px-0 py-3 bg-transparent border-b border-white/30 text-white placeholder-white/50 font-sans text-sm focus:outline-none focus:border-white/60 transition-colors duration-200"
            style={{ pointerEvents: 'auto' }}
            ref={inputRef}
          />
          
          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full py-3 bg-white text-black font-sans font-medium text-sm hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            style={{ pointerEvents: 'auto' }}
          >
            {isLoading ? 'Joining waitlist...' : 'Get exclusive access'}
          </button>
        </form>
      </div>
    </div>
  )
}
