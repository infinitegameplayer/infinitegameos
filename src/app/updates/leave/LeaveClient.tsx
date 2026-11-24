'use client'

// The one-click undo. The page shows one button and takes the address off the
// updates list only when a person presses it (Email Codex Section 12,
// press-only.ts), so a mail scanner reading the welcome email never undoes a
// real join.

import { useState } from 'react'
import Link from 'next/link'

const lead = { color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.65 }

const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  background: 'var(--color-accent)',
  color: '#06090e',
  fontSize: '0.875rem',
  fontWeight: 500,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding: '0.75rem 1.75rem',
  borderRadius: 'var(--radius, 8px)',
  border: 'none',
  cursor: 'pointer',
  marginTop: '0.5rem',
}

async function leave(email: string, token: string): Promise<Response> {
  return fetch('/api/updates/leave', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token, mode: 'tap' }),
  })
}

export default function LeaveClient({ email, token }: { email: string; token: string }) {
  const [tapState, setTapState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')

  const onTap = async () => {
    if (tapState === 'working') return
    setTapState('working')
    try {
      const res = await leave(email, token)
      setTapState(res.ok ? 'done' : 'error')
    } catch {
      setTapState('error')
    }
  }

  if (tapState === 'done') {
    return (
      <>
        <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
        <p style={lead}>
          Done. This address is off the Infinite Game OS updates. Every other list stays as it was.
        </p>
        <p style={lead}>
          Changed your mind?{' '}
          <Link href={`/updates/join?email=${encodeURIComponent(email)}`} style={{ color: 'var(--color-accent)' }}>
            Join again
          </Link>
          .
        </p>
      </>
    )
  }

  return (
    <>
      <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
      <p style={lead}>One tap takes this address off the updates list. Every other list stays as it was.</p>
      <button type="button" onClick={onTap} disabled={tapState === 'working'} style={{ ...buttonStyle, opacity: tapState === 'working' ? 0.6 : 1 }}>
        {tapState === 'working' ? 'Removing…' : 'Take me off the updates'}
      </button>
      <noscript>
        <p style={lead}>This page needs JavaScript to take you off. Reply to the welcome email and it will be handled by hand.</p>
      </noscript>
      {tapState === 'error' && (
        <p style={{ color: 'rgba(220,80,80,0.85)', fontSize: '0.85rem', marginTop: '0.75rem' }}>
          Something stopped that. Reply to the welcome email and it will be handled by hand.
        </p>
      )}
    </>
  )
}
