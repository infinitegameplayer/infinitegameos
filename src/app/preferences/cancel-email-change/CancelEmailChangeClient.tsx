'use client'

// The cancel button and outcome. The cancel never runs on page load, only when
// this button posts the single-use cancel secret. Mirror of the lanebelone
// client with the IGOS palette.

import { useState } from 'react'

type Outcome = 'idle' | 'working' | 'cancelled' | 'already-confirmed' | 'invalid' | 'error'

const text = 'var(--color-text)'
const muted = 'rgba(226,232,240,0.75)'
const body = 'var(--font-body), Inter, system-ui, sans-serif'
const accent = 'var(--color-accent)'

function mapStatus(ok: boolean, status: string): Outcome {
  if (status === 'cancelled' || status === 'already-cancelled') return 'cancelled'
  if (status === 'already-confirmed') return 'already-confirmed'
  if (ok) return 'cancelled'
  return 'invalid'
}

export default function CancelEmailChangeClient({ token }: { token: string }) {
  const [outcome, setOutcome] = useState<Outcome>(token ? 'idle' : 'invalid')

  async function cancel() {
    if (!token) return
    setOutcome('working')
    try {
      const res = await fetch('/api/preferences/cancel-email-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ t: token }),
      })
      const data = (await res.json()) as { ok?: boolean; status?: string }
      setOutcome(mapStatus(!!data.ok, data.status ?? 'invalid'))
    } catch {
      setOutcome('error')
    }
  }

  if (outcome === 'cancelled') {
    return <Note>Done. The change is cancelled and your address stays exactly as it is.</Note>
  }
  if (outcome === 'already-confirmed') {
    return <Note>This change was already confirmed and is active now. If that was not you, reach out and we will sort it right away.</Note>
  }
  if (outcome === 'invalid') {
    return <Note>This link is invalid or has already been used.</Note>
  }
  if (outcome === 'error') {
    return <Note>Something went wrong. Please try the link again in a moment.</Note>
  }

  return (
    <div style={{ fontFamily: body, color: muted }}>
      <p style={{ fontSize: '1.05rem', lineHeight: 1.7, marginTop: '0.5rem', marginBottom: '1.5rem' }}>
        Click to cancel the email change. Your current address stays in place and nothing moves.
      </p>
      <button type="button" onClick={cancel} disabled={outcome === 'working'} style={primaryButtonStyle}>
        {outcome === 'working' ? 'Cancelling...' : 'Cancel this change'}
      </button>
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: body, fontSize: '1.05rem', lineHeight: 1.7, color: text, marginTop: '0.5rem', marginBottom: '1.5rem' }}>
      {children}
    </p>
  )
}

const primaryButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  background: accent,
  color: '#06090e',
  fontFamily: body,
  fontSize: '0.85rem',
  fontWeight: 500,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding: '0.7rem 1.5rem',
  borderRadius: 'var(--radius, 8px)',
  border: 'none',
  cursor: 'pointer',
}
