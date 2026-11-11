'use client'

// The one-click undo. Takes the address off the updates list once a person is
// plainly on the page (useAutoAction), or shows one button when it cannot tell,
// so a mail scanner reading the welcome email never undoes a real join.

import { useState } from 'react'
import Link from 'next/link'
import { useAutoAction, type AutoOutcome } from '@/components/useAutoAction'

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

async function leave(email: string, token: string, mode: 'auto' | 'tap', gate?: unknown): Promise<Response> {
  return fetch('/api/updates/leave', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token, mode, gate }),
  })
}

export default function LeaveClient({ email, token }: { email: string; token: string }) {
  const [tapState, setTapState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')

  const phase = useAutoAction(async (gate): Promise<AutoOutcome> => {
    const res = await leave(email, token, 'auto', gate)
    if (!res.ok) return 'tap'
    const body = await res.json().catch(() => ({}))
    return body?.needsTap ? 'tap' : 'done'
  })

  const onTap = async () => {
    if (tapState === 'working') return
    setTapState('working')
    try {
      const res = await leave(email, token, 'tap')
      setTapState(res.ok ? 'done' : 'error')
    } catch {
      setTapState('error')
    }
  }

  if (phase === 'done' || tapState === 'done') {
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

  if (phase === 'tap') {
    return (
      <>
        <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
        <p style={lead}>One tap takes this address off the updates list. Every other list stays as it was.</p>
        <button type="button" onClick={onTap} disabled={tapState === 'working'} style={{ ...buttonStyle, opacity: tapState === 'working' ? 0.6 : 1 }}>
          {tapState === 'working' ? 'Removing…' : 'Take me off the updates'}
        </button>
        {tapState === 'error' && (
          <p style={{ color: 'rgba(220,80,80,0.85)', fontSize: '0.85rem', marginTop: '0.75rem' }}>
            Something stopped that. Reply to the welcome email and it will be handled by hand.
          </p>
        )}
      </>
    )
  }

  return (
    <>
      <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
      <p style={lead} aria-live="polite">Taking this address off the list…</p>
      <noscript>
        <p style={lead}>This page needs JavaScript to take you off. Reply to the welcome email and it will be handled by hand.</p>
      </noscript>
    </>
  )
}
