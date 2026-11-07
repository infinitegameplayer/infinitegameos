// The footer unsubscribe link lands here: /unsubscribe?email=...&token=...
// Opening the page writes nothing. The server checks the signed token and
// whether the address has already left, and UnsubscribeClient takes it off
// every list once a person is plainly on the page, or shows one button when it
// cannot tell (Email Codex Section 12, the scanner-proof gate, 2026-11-07).
// Mirrors the lanebelone pattern with the IGOS visual register.

import { getContactMembership } from '@/lib/email-lists'
import { verifyEmailToken } from '@/lib/unsubscribe-token'
import UnsubscribeClient, { type LinkState } from './UnsubscribeClient'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Unsubscribe',
  robots: { index: false, follow: false },
  referrer: 'no-referrer' as const,
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[]; token?: string | string[] }>
}) {
  const params = await searchParams
  // A "+" in an address can arrive decoded as a space, as on the join page.
  const email = typeof params.email === 'string' ? params.email.trim().toLowerCase().replace(/ /g, '+') : ''
  const token = typeof params.token === 'string' ? params.token.trim() : ''

  let state: LinkState = 'ready'
  if (!email || !token || email.length > 254) state = 'missing'
  else if (!verifyEmailToken(email, token)) state = 'invalid'
  else if ((await getContactMembership(email)).unsubscribed) state = 'already'

  return (
    <main
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '7rem 1.5rem 4rem',
        fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
        color: 'var(--color-text)',
      }}
    >
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'left' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
            fontSize: '1.75rem',
            marginBottom: '1.25rem',
            color: 'var(--color-text)',
          }}
        >
          Unsubscribe
        </h1>
        <UnsubscribeClient email={email} token={token} state={state} />
      </div>
    </main>
  )
}
