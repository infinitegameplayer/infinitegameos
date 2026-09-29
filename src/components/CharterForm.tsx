'use client'

// Your AI's Charter signup. Posts same-origin to /api/charter-signup, which
// forwards to Side Quest HQ, so the page never calls another site from the
// browser and the CSP stays as it is. The file itself is open on the page; the
// signup brings the companion guide and every new version, from Side Quest HQ.
// When the forward fails, the form offers the Side Quest HQ door instead.

import { useEffect, useState } from 'react'
import { usePostHog } from 'posthog-js/react'
import { umamiTrack, umamiIdentify } from '@/lib/umami'

const GUIDE_URL = 'https://www.sidequesthq.co/charter/guide'
const FALLBACK_URL = 'https://www.sidequesthq.co/charter'

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

const fine: React.CSSProperties = {
  fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
  fontSize: '0.8rem',
  color: 'rgba(226, 232, 240, 0.55)',
  marginTop: '0.75rem',
  lineHeight: 1.55,
}

const styleId = 'igos-subscribe-style'

export default function CharterForm() {
  const posthog = usePostHog()
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [openedAt] = useState(() => Date.now())
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error' | 'forward_failed'>('idle')
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
      const res = await fetch('/api/charter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim() || undefined,
          honeypot: website,
          openedAt,
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (body?.error === 'forward_failed') {
          setStatus('forward_failed')
          return
        }
        throw new Error(body?.error || `Submission failed (${res.status})`)
      }
      setStatus('submitted')
      try {
        const normalizedEmail = email.trim().toLowerCase()
        posthog?.identify(normalizedEmail, { email: normalizedEmail })
        posthog?.capture('charter_signup', { source: '/charter' })
        umamiIdentify({ email: normalizedEmail })
        umamiTrack('charter_signup', { source: '/charter' })
      } catch {
        /* analytics unavailable */
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error')
      setStatus('error')
    }
  }

  if (status === 'submitted') {
    return (
      <p style={{ fontFamily: 'var(--font-body), Inter, system-ui, sans-serif', fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.65, margin: 0 }}>
        You&rsquo;re in. The file and the guide are on their way from Side Quest HQ. The guide is also here:{' '}
        <a href={GUIDE_URL} style={{ color: 'var(--color-accent)' }}>
          fitting your AI&rsquo;s Charter to your work
        </a>
        .
      </p>
    )
  }

  if (status === 'forward_failed') {
    return (
      <p style={{ fontFamily: 'var(--font-body), Inter, system-ui, sans-serif', fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.65, margin: 0 }}>
        The signup didn&rsquo;t go through from here. The same form lives on Side Quest HQ and takes ten seconds:{' '}
        <a href={FALLBACK_URL} style={{ color: 'var(--color-accent)' }}>
          get the guide at sidequesthq.co/charter
        </a>
        .
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        className="igos-subscribe-input"
        type="text"
        autoComplete="given-name"
        placeholder="First name (optional)"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={{ ...inputStyle, marginBottom: '0.75rem' }}
      />
      <input
        className="igos-subscribe-input"
        type="email"
        aria-label="Email"
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
        <div style={{ color: 'rgba(220,80,80,0.85)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{errorMessage}</div>
      )}
      <button
        type="submit"
        className="igos-subscribe-button"
        disabled={status === 'submitting'}
        style={{ ...buttonStyle, opacity: status === 'submitting' ? 0.6 : 1 }}
      >
        {status === 'submitting' ? 'Sending…' : 'Send me the guide'}
      </button>
      <p style={fine}>
        Free. The file, the companion guide and every new version come from Side Quest HQ, Lane&rsquo;s business,
        with the Side Quest Letter. Unsubscribe from any email.
      </p>
    </form>
  )
}
