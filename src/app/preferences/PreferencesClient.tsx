'use client'

import { useState } from 'react'

export type ListView = {
  key: string
  label: string
  description: string
  site: string
  joined: boolean
}

type Props = {
  valid: boolean
  email: string
  token: string
  maskedEmail: string
  lists: ListView[]
  pausedUntil?: string | null
  currentSite: string
  // Raw email from the entry URL. Used only to prefill the fallback input when a
  // tokenless or expired link lands here (broadcast links carry email, no token).
  // Echoing the URL back confirms nothing about list membership.
  prefillEmail?: string
}

// The playful wink for the curious soul who reads the under-the-hood page.
// A grace note, not a distraction. Swept for style.
const WINK = 'Most people never scroll a preferences page. You did. Consider this the loot.'

const SITE_LABELS: Record<string, string> = {
  lanebelone: 'lanebelone.com',
  infinitegameos: 'infinitegameos.io',
}

// The paused-until date, shown when a pause is active. Long form, no ambiguity.
function formatPauseDate(iso: string | null): string {
  if (!iso) return 'the pause date'
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return 'the pause date'
  }
}

const body = 'var(--font-body), Inter, system-ui, sans-serif'
const text = 'var(--color-text)'
const muted = 'rgba(226,232,240,0.75)'
const faint = 'rgba(226,232,240,0.5)'
const hairline = 'rgba(226,232,240,0.1)'
const accent = 'var(--color-accent)'

export default function PreferencesClient(props: Props) {
  if (!props.valid) return <FreshLinkFallback prefillEmail={props.prefillEmail} />
  return <PreferenceManager {...props} />
}

// ─── Valid entry: the preference manager ─────────────────────────────────

function PreferenceManager({ email, token, maskedEmail, lists, currentSite, pausedUntil: initialPaused }: Props) {
  const [items, setItems] = useState<ListView[]>(lists)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [confirmLeave, setConfirmLeave] = useState(false)
  const [leftAll, setLeftAll] = useState(false)
  const [pausedUntil, setPausedUntil] = useState<string | null>(initialPaused ?? null)
  const isPausedNow = !!pausedUntil && Date.parse(pausedUntil) > Date.now()
  const [newEmailInput, setNewEmailInput] = useState('')
  const [changeState, setChangeState] = useState<
    'idle' | 'sending' | 'sent' | 'error' | 'same' | 'invalid' | 'rate'
  >('idle')

  async function post(route: string, payload: Record<string, string>) {
    const res = await fetch(route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error('request failed')
  }

  async function toggle(item: ListView) {
    if (busy) return
    setError('')
    setBusy(item.key)
    const nextJoined = !item.joined
    setItems((prev) => prev.map((it) => (it.key === item.key ? { ...it, joined: nextJoined } : it)))
    const route = nextJoined
      ? '/api/preferences/resubscribe-list'
      : '/api/preferences/unsubscribe-list'
    try {
      await post(route, { email, token, list: item.key })
    } catch {
      setItems((prev) =>
        prev.map((it) => (it.key === item.key ? { ...it, joined: item.joined } : it)),
      )
      setError('That change did not save. Please try again.')
    } finally {
      setBusy(null)
    }
  }

  async function leaveAll() {
    if (busy) return
    setError('')
    setBusy('__all__')
    try {
      await post('/api/preferences/unsubscribe-all', { email, token })
      setItems((prev) => prev.map((it) => ({ ...it, joined: false })))
      setLeftAll(true)
      setConfirmLeave(false)
    } catch {
      setError('That did not save. Please try again.')
    } finally {
      setBusy(null)
    }
  }

  async function pause() {
    if (busy) return
    setError('')
    setBusy('__pause__')
    try {
      const res = await fetch('/api/preferences/pause', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      })
      if (!res.ok) throw new Error('request failed')
      const data = (await res.json()) as { pausedUntil?: string }
      setPausedUntil(data.pausedUntil ?? new Date(Date.now() + 30 * 86400000).toISOString())
    } catch {
      setError('That did not save. Please try again.')
    } finally {
      setBusy(null)
    }
  }

  async function resume() {
    if (busy) return
    setError('')
    setBusy('__pause__')
    try {
      await post('/api/preferences/resume', { email, token })
      setPausedUntil(null)
    } catch {
      setError('That did not save. Please try again.')
    } finally {
      setBusy(null)
    }
  }

  async function submitEmailChange(e: React.FormEvent) {
    e.preventDefault()
    const value = newEmailInput.trim().toLowerCase()
    if (!value || changeState === 'sending') return
    setChangeState('sending')
    try {
      const res = await fetch('/api/preferences/request-email-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newEmail: value }),
      })
      const data = (await res.json()) as { ok?: boolean; status?: string }
      if (res.ok && data.ok) setChangeState('sent')
      else if (data.status === 'same-email') setChangeState('same')
      else if (data.status === 'rate-limited') setChangeState('rate')
      else if (data.status === 'invalid-email') setChangeState('invalid')
      else setChangeState('error')
    } catch {
      setChangeState('error')
    }
  }

  return (
    <div style={{ fontFamily: body, color: muted }}>
      <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: muted, marginTop: 0, marginBottom: '0.35rem' }}>
        Choose what lands in your inbox. Changes save the moment you make them.
      </p>
      <p style={{ fontSize: '0.9rem', color: faint, marginTop: 0, marginBottom: '2rem' }}>
        Preferences for {maskedEmail}.
      </p>

      {leftAll && (
        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: text,
            background: 'rgba(34,211,238,0.07)',
            border: `1px solid ${hairline}`,
            borderRadius: '10px',
            padding: '0.9rem 1.1rem',
            marginBottom: '1.75rem',
          }}
        >
          Done. You are off every list. If that was a slip, flip any list back on above.
        </p>
      )}

      <div>
        {items.map((item) => {
          const crossDomain = item.site !== currentSite
          const isBusy = busy === item.key
          return (
            <div
              key={item.key}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '1.25rem',
                padding: '1.15rem 0',
                borderTop: `1px solid ${hairline}`,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '1.1rem', color: text }}>{item.label}</span>
                  {crossDomain && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: faint,
                      }}
                    >
                      {SITE_LABELS[item.site] ?? item.site}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: muted, margin: '0.3rem 0 0' }}>
                  {item.description}
                </p>
              </div>
              <Toggle on={item.joined} busy={isBusy} onClick={() => toggle(item)} label={item.label} />
            </div>
          )
        })}
      </div>

      {error && (
        <p style={{ fontSize: '0.9rem', color: '#f0b35b', marginTop: '1.25rem' }}>{error}</p>
      )}

      {!leftAll && (
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: `1px solid ${hairline}` }}>
          {changeState === 'sent' ? (
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: text, marginTop: 0, marginBottom: 0 }}>
              Check your new address for a confirmation link. Your current address stays active until you confirm, and a notice went to {maskedEmail} so you can stop the change if it was not you.
            </p>
          ) : (
            <>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: muted, marginTop: 0, marginBottom: '0.75rem' }}>
                Changing your email? Enter the new address and I will send a confirmation link to it. The change takes effect only after you open that link.
              </p>
              <form onSubmit={submitEmailChange} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  required
                  value={newEmailInput}
                  onChange={(e) => setNewEmailInput(e.target.value)}
                  placeholder="new@example.com"
                  data-private
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    background: 'rgba(226,232,240,0.04)',
                    border: `1px solid ${hairline}`,
                    borderRadius: '8px',
                    padding: '0.7rem 0.9rem',
                    color: text,
                    fontFamily: body,
                    fontSize: '1rem',
                  }}
                />
                <button type="submit" disabled={changeState === 'sending'} style={primaryButtonStyle}>
                  {changeState === 'sending' ? 'Sending...' : 'Send confirmation'}
                </button>
              </form>
              {changeState === 'same' && (
                <p style={{ fontSize: '0.9rem', color: faint, marginTop: '0.75rem' }}>That is already your address.</p>
              )}
              {changeState === 'invalid' && (
                <p style={{ fontSize: '0.9rem', color: '#f0b35b', marginTop: '0.75rem' }}>That does not look like a valid email. Check it and try again.</p>
              )}
              {changeState === 'rate' && (
                <p style={{ fontSize: '0.9rem', color: '#f0b35b', marginTop: '0.75rem' }}>That is a few change requests in a short window. Give it an hour and try again.</p>
              )}
              {changeState === 'error' && (
                <p style={{ fontSize: '0.9rem', color: '#f0b35b', marginTop: '0.75rem' }}>That did not go through. Please try again in a moment.</p>
              )}
            </>
          )}
        </div>
      )}

      {!leftAll && (
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: `1px solid ${hairline}` }}>
          {isPausedNow ? (
            <>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: text, marginTop: 0, marginBottom: '0.6rem' }}>
                Everything is paused until {formatPauseDate(pausedUntil)}. Your inbox stays quiet until then and your lists stay exactly as they are.
              </p>
              <button type="button" onClick={resume} disabled={busy === '__pause__'} style={linkButtonStyle}>
                {busy === '__pause__' ? 'Resuming...' : 'Resume now'}
              </button>
            </>
          ) : (
            <>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: muted, marginTop: 0, marginBottom: '0.6rem' }}>
                Need a breather? Pause every email for 30 days. Your lists stay exactly as they are and pick back up when the pause ends.
              </p>
              <button type="button" onClick={pause} disabled={busy === '__pause__'} style={linkButtonStyle}>
                {busy === '__pause__' ? 'Pausing...' : 'Pause for 30 days'}
              </button>
            </>
          )}
        </div>
      )}

      <div style={{ marginTop: '2.75rem', paddingTop: '1.5rem', borderTop: `1px solid ${hairline}` }}>
        {!confirmLeave && !leftAll && (
          <button type="button" onClick={() => setConfirmLeave(true)} style={linkButtonStyle}>
            Leave every list
          </button>
        )}
        {confirmLeave && !leftAll && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.95rem', color: muted }}>
              This stops every email to {maskedEmail}. Sure?
            </span>
            <button type="button" onClick={leaveAll} disabled={busy === '__all__'} style={dangerButtonStyle}>
              {busy === '__all__' ? 'Leaving...' : 'Yes, leave all'}
            </button>
            <button type="button" onClick={() => setConfirmLeave(false)} style={linkButtonStyle}>
              Keep my lists
            </button>
          </div>
        )}
      </div>

      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: 1.7,
          color: faint,
          fontStyle: 'italic',
          marginTop: '3rem',
        }}
      >
        {WINK}
      </p>
    </div>
  )
}

function Toggle({
  on,
  busy,
  onClick,
  label,
}: {
  on: boolean
  busy: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={`${on ? 'Leave' : 'Join'} ${label}`}
      onClick={onClick}
      disabled={busy}
      style={{
        position: 'relative',
        width: '52px',
        height: '30px',
        flexShrink: 0,
        borderRadius: '999px',
        border: `1px solid ${on ? accent : hairline}`,
        background: on ? accent : 'rgba(226,232,240,0.06)',
        cursor: busy ? 'default' : 'pointer',
        opacity: busy ? 0.6 : 1,
        transition: 'background 0.2s ease, border-color 0.2s ease',
        marginTop: '0.15rem',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '3px',
          left: on ? '25px' : '3px',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: on ? '#06090e' : 'rgba(226,232,240,0.65)',
          transition: 'left 0.2s ease, background 0.2s ease',
        }}
      />
    </button>
  )
}

// ─── Expired or unknown token: the fresh-link fallback ───────────────────

function FreshLinkFallback({ prefillEmail }: { prefillEmail?: string }) {
  const [email, setEmail] = useState(prefillEmail ?? '')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const value = email.trim()
    if (!value || state === 'sending') return
    setState('sending')
    try {
      const res = await fetch('/api/preferences/request-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      })
      // The route answers the same way for every address, so any clean
      // response is treated as sent. Membership is never confirmed here.
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div style={{ fontFamily: body, color: muted }}>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
          If that address is on one of these lists, a fresh link is on its way. Check your inbox.
        </p>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: body, color: muted }}>
      <p style={{ fontSize: '1.05rem', lineHeight: 1.7, marginTop: '0.5rem', marginBottom: '1.5rem' }}>
        This link has expired or is missing something. Enter your email and I will send a fresh one.
      </p>
      <form onSubmit={submit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          data-private
          style={{
            flex: 1,
            minWidth: '220px',
            background: 'rgba(226,232,240,0.04)',
            border: `1px solid ${hairline}`,
            borderRadius: '8px',
            padding: '0.7rem 0.9rem',
            color: text,
            fontFamily: body,
            fontSize: '1rem',
          }}
        />
        <button type="submit" disabled={state === 'sending'} style={primaryButtonStyle}>
          {state === 'sending' ? 'Sending...' : 'Send the link'}
        </button>
      </form>
      {state === 'error' && (
        <p style={{ fontSize: '0.9rem', color: '#f0b35b', marginTop: '1rem' }}>
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}

// ─── Shared button styles ────────────────────────────────────────────────

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

const linkButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  color: faint,
  fontFamily: body,
  fontSize: '0.95rem',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  cursor: 'pointer',
}

const dangerButtonStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid rgba(240,179,91,0.5)',
  borderRadius: '8px',
  padding: '0.5rem 1rem',
  color: '#f0b35b',
  fontFamily: body,
  fontSize: '0.8rem',
  letterSpacing: '0.04em',
  cursor: 'pointer',
}
