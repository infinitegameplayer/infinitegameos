'use client'

// The one-click join from an email letter. The page shows one button and joins
// only when a person presses it (Email Codex Section 12, press-only.ts), so a
// mail scanner that opens the link joins no one.

import SubscribeForm from '@/components/SubscribeForm'

const lead = { color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.65 }

export default function JoinClient({ email }: { email: string }) {
  return (
    <>
      <p style={lead}>
        Real releases and real lessons from inside the practice, sent when there is one. One tap and this address is on the list.
      </p>
      <SubscribeForm prefilledEmail={email} />
      <noscript>
        <p style={lead}>This page needs JavaScript to add you. Reply to the letter that brought you here and you will be added by hand.</p>
      </noscript>
    </>
  )
}
