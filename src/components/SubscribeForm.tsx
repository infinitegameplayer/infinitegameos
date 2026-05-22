'use client'

import { useEffect, useState } from 'react'
import { usePostHog } from 'posthog-js/react'

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void
      identify: (data: Record<string, unknown>) => void
    }
  }
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 'var(--radius, 8px)',
  color: 'var(--color-text)',
  fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
  fontSize: '0.95rem',
  padding: '0.7rem 1rem',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 0.2s ease',
}

const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  background: 'var(--color-accent)',
  color: '#06090e',
  fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
  fontSize: '0.875rem',
  fontWeight: 500,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding: '0.75rem 1.75rem',
  borderRadius: 'var(--radius, 8px)',
  border: 'none',
  cursor: 'pointer',
  transition: 'opacity 0.2s ease, transform 0.2s ease',
  marginTop: '0.25rem',
  width: 'auto',
  WebkitAppearance: 'none',
  appearance: 'none',
}

const styleId = 'igos-subscribe-style'

export default function SubscribeForm() {
  const posthog = usePostHog()
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [openedAt] = useState(() => Date.now())
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.getElementById(styleId)) return
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      .igos-subscribe-input::placeholder { color: rgba(226, 232, 240, 0.4); }
      .igos-subscribe-input:focus { border-color: rgba(34, 211, 238, 0.5) !important; }
      .igos-subscribe-button:hover { opacity: 0.92; transform: translateY(-1px); }
      .igos-subscribe-honeypot { position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden; }
    `
    document.head.appendChild(style)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return
    if (!email.trim()) {
      setErrorMessage('Please enter your email.')
      setStatus('error')
      return
    }
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/igos-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          honeypot: website,
          openedAt,
          source:
            typeof window !== 'undefined'
              ? window.location.pathname
              : 'unknown',
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || `Submission failed (${res.status})`)
      }
      setStatus('submitted')
      try {
        const normalizedEmail = email.trim().toLowerCase()
        const subscribePayload = {
          source: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
        }
        posthog?.identify(normalizedEmail, { email: normalizedEmail })
        posthog?.capture('igos_subscribe', subscribePayload)
        window.umami?.identify({ email: normalizedEmail })
        window.umami?.track('igos_subscribe', subscribePayload)
      } catch {
        /* analytics unavailable */
      }
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error'
      setErrorMessage(m)
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    return (
      <div
        style={{
          marginTop: '2rem',
          padding: '1.75rem',
          background: 'rgba(34, 211, 238, 0.06)',
          border: '1px solid rgba(34, 211, 238, 0.18)',
          borderRadius: 'var(--radius, 8px)',
          maxWidth: '640px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
            fontSize: '0.95rem',
            color: 'var(--color-text)',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          You are in. The welcome note is landing now. The next dispatch arrives from inside the practice.
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        marginTop: '2rem',
        padding: '1.75rem',
        background: 'rgba(34, 211, 238, 0.04)',
        border: '1px solid rgba(34, 211, 238, 0.12)',
        borderRadius: 'var(--radius, 8px)',
        maxWidth: '640px',
      }}
    >
      <p className="label" style={{ marginBottom: '0.5rem' }}>
        Subscribe
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
          fontSize: '0.95rem',
          color: 'rgba(226, 232, 240, 0.75)',
          lineHeight: 1.65,
          marginTop: 0,
          marginBottom: '1.25rem',
        }}
      >
        Receive new updates as they ship. Bi-monthly steady state. No hype, no upsell.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <input
          className="igos-subscribe-input"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...inputStyle, marginBottom: '0.75rem' }}
        />
        <input
          className="igos-subscribe-honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          name="website"
        />
        {status === 'error' && errorMessage && (
          <div
            style={{
              color: 'rgba(220,80,80,0.85)',
              fontSize: '0.85rem',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
            }}
          >
            {errorMessage}
          </div>
        )}
        <button
          type="submit"
          className="igos-subscribe-button"
          disabled={status === 'submitting'}
          style={{ ...buttonStyle, opacity: status === 'submitting' ? 0.6 : 1 }}
        >
          {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
        </button>
        <p
          style={{
            fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(226, 232, 240, 0.45)',
            marginTop: '0.75rem',
            lineHeight: 1.5,
          }}
        >
          One welcome email lands now. Unsubscribe link on every send.
        </p>
      </form>
    </div>
  )
}
