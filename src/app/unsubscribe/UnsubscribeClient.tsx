'use client'

import { useEffect, useState } from 'react'

type Status =
  | 'idle'
  | 'pending'
  | 'success'
  | 'resubscribing'
  | 'resubscribed'
  | 'invalid'
  | 'error'

export default function UnsubscribeClient({
  email,
  token,
}: {
  email: string
  token: string
}) {
  const linkIsValid = Boolean(email && token)
  const [status, setStatus] = useState<Status>(linkIsValid ? 'pending' : 'invalid')
  const [message, setMessage] = useState(
    linkIsValid
      ? ''
      : 'This link is missing the information needed to unsubscribe. If you got here from an email, check that the full link copied through.'
  )

  useEffect(() => {
    if (!email || !token) {
      return
    }
    fetch('/api/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (res.ok) {
          setStatus('success')
          setMessage(`You're unsubscribed. No more emails to ${email}.`)
        } else if (res.status === 403) {
          setStatus('invalid')
          setMessage(
            "This link couldn't be verified. If you copied it from an email, try clicking it directly instead."
          )
        } else {
          setStatus('error')
          setMessage(
            typeof data?.error === 'string'
              ? data.error
              : 'Something went wrong. Please try again.'
          )
        }
      })
      .catch(() => {
        setStatus('error')
        setMessage('Network error. Please try again.')
      })
  }, [email, token])

  const handleResubscribe = async () => {
    if (status !== 'success') return
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
        setMessage(
          typeof data?.error === 'string'
            ? data.error
            : 'Resubscribe failed. Please try again.'
        )
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <div style={{ color: 'rgba(226, 232, 240, 0.85)' }}>
      <p
        style={{
          fontSize: '1.05rem',
          lineHeight: 1.7,
          margin: 0,
          fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
        }}
      >
        {status === 'pending' && 'Unsubscribing...'}
        {status === 'resubscribing' && 'Bringing you back...'}
        {(status === 'success' ||
          status === 'resubscribed' ||
          status === 'invalid' ||
          status === 'error') && message}
      </p>

      {status === 'success' && (
        <>
          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'rgba(226, 232, 240, 0.65)',
              marginTop: '1.75rem',
              marginBottom: 0,
              fontStyle: 'italic',
              fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
            }}
          >
            Travel well from here. If our paths cross again inside the practice, all the better.
          </p>
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
            <button
              type="button"
              onClick={handleResubscribe}
              style={{
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
              }}
            >
              Resubscribe
            </button>
          </div>
        </>
      )}
    </div>
  )
}
