'use client'

// The footer unsubscribe. Takes the address off every list once a person is
// plainly on the page (useAutoAction), or shows one button when it cannot tell,
// so a mail scanner that runs the page never unsubscribes a reader (Email
// Codex Section 12, 2026-11-07).

import { useState } from 'react'
import { useAutoAction, type AutoOutcome } from '@/components/useAutoAction'

export type LinkState = 'ready' | 'already' | 'missing' | 'invalid'

type Status = 'idle' | 'working' | 'success' | 'resubscribing' | 'resubscribed' | 'error'

const text: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.7,
  margin: 0,
  fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
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
}

async function unsubscribe(email: string, token: string, mode: 'auto' | 'tap', gate?: unknown): Promise<Response> {
  return fetch('/api/unsubscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token, mode, gate }),
  })
}

export default function UnsubscribeClient({
  email,
  token,
  state,
}: {
  email: string
  token: string
  state: LinkState
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const phase = useAutoAction(async (gate): Promise<AutoOutcome> => {
    const res = await unsubscribe(email, token, 'auto', gate)
    if (!res.ok) return 'tap'
    const body = await res.json().catch(() => ({}))
    return body?.needsTap ? 'tap' : 'done'
  }, state === 'ready')

  const onTap = async () => {
    if (status === 'working') return
    setStatus('working')
    try {
      const res = await unsubscribe(email, token, 'tap')
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setMessage('Something stopped that. Reply to any email from here and it will be handled by hand.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  const handleResubscribe = async () => {
    setStatus('resubscribing')
    try {
      const res = await fetch('/api/resubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      })
      if (res.ok) {
        setStatus('resubscribed')
        setMessage(`You're back in. No new welcome email, just picking up where we left off.`)
      } else {
        const data = await res.json().catch(() => ({}))
        setStatus('error')
        setMessage(typeof data?.error === 'string' ? data.error : 'Resubscribe failed. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  const resubscribeBlock = (
    <div style={{ marginTop: '2.5rem' }}>
      <p
        style={{
          fontSize: '0.95rem',
          lineHeight: 1.6,
          color: 'rgba(226, 232, 240, 0.5)',
          marginBottom: '1rem',
          fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
        }}
      >
        Didn&apos;t mean to part ways just yet? Resubscribing is one click.
      </p>
      <button type="button" onClick={handleResubscribe} style={buttonStyle}>
        Resubscribe
      </button>
    </div>
  )

  let body: React.ReactNode
  if (state === 'missing') {
    body = (
      <p style={text}>
        This link is missing the information needed to unsubscribe. If you got here from an email, check that the full link copied through.
      </p>
    )
  } else if (state === 'invalid') {
    body = <p style={text}>This link couldn&apos;t be verified. If you copied it from an email, try clicking it directly instead.</p>
  } else if (status === 'resubscribing') {
    body = <p style={text}>Bringing you back...</p>
  } else if (status === 'resubscribed' || status === 'error') {
    body = <p style={text}>{message}</p>
  } else if (state === 'already') {
    body = (
      <>
        <p style={text}>This address is already unsubscribed. No more emails go to {email}.</p>
        {resubscribeBlock}
      </>
    )
  } else if (phase === 'done' || status === 'success') {
    body = (
      <>
        <p style={text}>You&apos;re unsubscribed. No more emails to {email}.</p>
        <p
          style={{
            ...text,
            color: 'rgba(226, 232, 240, 0.65)',
            marginTop: '1.75rem',
            fontStyle: 'italic',
          }}
        >
          Travel well from here. If our paths cross again inside the practice, all the better.
        </p>
        {resubscribeBlock}
      </>
    )
  } else if (phase === 'tap') {
    body = (
      <>
        <p style={{ ...text, wordBreak: 'break-all' }}>{email}</p>
        <p style={{ ...text, marginTop: '1rem', marginBottom: '1.5rem' }}>One tap takes this address off every list.</p>
        <button
          type="button"
          onClick={onTap}
          disabled={status === 'working'}
          style={{ ...buttonStyle, opacity: status === 'working' ? 0.6 : 1 }}
        >
          {status === 'working' ? 'Unsubscribing…' : 'Unsubscribe me'}
        </button>
      </>
    )
  } else {
    body = (
      <>
        <p style={text} aria-live="polite">Unsubscribing...</p>
        <noscript>
          <p style={{ ...text, marginTop: '1rem' }}>
            This page needs JavaScript to unsubscribe you. Reply to any email from here and it will be handled by hand.
          </p>
        </noscript>
      </>
    )
  }

  return <div style={{ color: 'rgba(226, 232, 240, 0.85)' }}>{body}</div>
}
