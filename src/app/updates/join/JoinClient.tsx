'use client'

// The one-click join from an email letter. Once a person is plainly on the
// page (useAutoAction, auto-action-gate.ts) it joins them with no button at
// all. If the checks go unmet, or the server cannot vouch for the visitor, the
// one-tap button appears instead, so a person always gets in and a mail scanner
// that presses nothing joins no one.

import Link from 'next/link'
import SubscribeForm from '@/components/SubscribeForm'
import { useAutoAction, type AutoOutcome } from '@/components/useAutoAction'
import { markSubscribed } from '@/lib/bottom-bar'
import { umamiTrack } from '@/lib/umami'

const lead = { color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.65 }

export default function JoinClient({ email }: { email: string }) {
  const phase = useAutoAction(async (gate): Promise<AutoOutcome> => {
    const res = await fetch('/api/igos-subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, mode: 'auto', gate }),
    })
    if (!res.ok) return 'tap'
    const body = await res.json().catch(() => ({}))
    if (body?.needsTap) return 'tap'
    markSubscribed(window.localStorage, 'igos-subscribe')
    try {
      umamiTrack('igos_subscribe', { source: '/updates/join', mode: 'auto' })
    } catch {
      /* analytics unavailable */
    }
    return body?.alreadySubscribed ? 'already' : 'done'
  })

  if (phase === 'tap') {
    return (
      <>
        <p style={lead}>
          Real releases and real lessons from inside the practice, sent when there is one. One tap and this address is on the list.
        </p>
        <SubscribeForm prefilledEmail={email} />
      </>
    )
  }

  if (phase === 'done' || phase === 'already') {
    return (
      <>
        <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
        <p style={lead}>
          {phase === 'done'
            ? 'You are in. The welcome note is landing now, with a one-click undo if this was not you.'
            : 'You are already on the list. The next dispatch arrives from inside the practice.'}{' '}
          Meanwhile, the <Link href="/updates" style={{ color: 'var(--color-accent)' }}>latest updates</Link> are here.
        </p>
      </>
    )
  }

  return (
    <>
      <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
      <p style={lead} aria-live="polite">Adding you to the list…</p>
      <noscript>
        <p style={lead}>This page needs JavaScript to add you. Reply to the letter that brought you here and you will be added by hand.</p>
      </noscript>
    </>
  )
}
