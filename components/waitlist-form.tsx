'use client'

import { useState, useRef, useEffect } from 'react'
type WaitlistMessages = {
  successTitle: string
  successP1: string
  successP2: string
  successP3: string
  overlayTitle: string
  placeholder: string
  submit: string
  loading: string
  errorJoin: string
  errorNetwork: string
}

const defaultWaitlist: WaitlistMessages = {
  successTitle: 'Welcome to the new economy.',
  successP1:
    'We will only contact you with info related to your account and only if you want, updates on progress towards our goals as an organization.',
  successP2: 'We are happy to have you here.',
  successP3:
    "Let's build internet-native cryptographically secure and privacy-first money together.",
  overlayTitle: 'Join the Movement',
  placeholder: 'Enter an email',
  submit: 'Get exclusive access',
  loading: 'Joining waitlist...',
  errorJoin: 'Failed to join waitlist',
  errorNetwork: 'Network error. Please try again.',
}

interface WaitlistFormProps {
  isVisible: boolean
  /** Overlay: fixed full-screen (original). Inline: flows in page layout (e.g. final CTA). */
  variant?: 'overlay' | 'inline'
  messages?: WaitlistMessages
  onEmailFocus?: () => void
  onEmailBlur?: () => void
}

export function WaitlistForm({
  isVisible: _isVisible,
  variant = 'overlay',
  messages: messagesProp,
  onEmailFocus,
  onEmailBlur,
}: WaitlistFormProps) {
  const isInline = variant === 'inline'
  const m = messagesProp ?? defaultWaitlist
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
      // Use relative URL for production, absolute for development
      const apiUrl =
        typeof window !== 'undefined' && window.location.hostname === 'localhost'
          ? `${window.location.origin}/api/waitlist`
          : '/api/waitlist'
      
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
        alert(data.error || m.errorJoin)
      }
    } catch (error) {
      console.error('Network error:', error)
      alert(m.errorNetwork)
    } finally {
      setIsLoading(false)
    }
  }

  const shellClass = isInline
    ? 'relative w-full text-left'
    : 'fixed inset-0 flex items-center justify-end z-[200]'

  const innerClass = isInline ? 'max-w-full w-full' : 'text-right max-w-sm w-full mx-8'

  if (isSubmitted) {
    return (
      <div
        className={shellClass}
        style={{ pointerEvents: isInline ? 'auto' : 'none' }}
      >
        <div className={innerClass}>
          <h2 className="text-xl font-sans font-medium text-foreground mb-4">
            {m.successTitle}
          </h2>
          <div className="text-foreground/70 font-sans text-sm space-y-3">
            <p>{m.successP1}</p>
            <p>{m.successP2}</p>
            <p className="text-foreground/80 font-medium">{m.successP3}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={shellClass}
      style={{ pointerEvents: isInline ? 'auto' : 'none' }}
    >
      <div className={innerClass}>
        {!isInline ? (
          <h1 className="text-xl font-sans font-medium text-foreground mb-6">
            {m.overlayTitle}
          </h1>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4" style={{ pointerEvents: 'auto' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={onEmailFocus}
            onBlur={onEmailBlur}
            placeholder={m.placeholder}
            required
            className="w-full px-0 py-3 bg-transparent border-b border-foreground/25 text-foreground placeholder-foreground/45 font-sans text-sm focus:outline-none focus:border-primary transition-colors duration-200"
            style={{ pointerEvents: 'auto' }}
            ref={inputRef}
          />
          
          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full py-3 bg-primary text-black font-sans font-medium text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            style={{ pointerEvents: 'auto' }}
          >
            {isLoading ? m.loading : m.submit}
          </button>
        </form>
      </div>
    </div>
  )
}
