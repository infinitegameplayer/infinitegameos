// Sovereign Email Preference Center, Phase 3. Confirm landing page.
// A bare GET renders a button and nothing else. The change runs only on the
// POST the button fires, so a corporate scanner that auto-opens the link cannot
// complete a change. noindex and no-referrer, and the route sits under
// /preferences so it inherits the no-track gate. Mirror of the lanebelone page.

import type { Metadata } from 'next'
import ConfirmEmailChangeClient from './ConfirmEmailChangeClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Confirm email change',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export default async function ConfirmEmailChangePage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>
}) {
  const params = await searchParams
  const token = typeof params.t === 'string' ? params.t : ''

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
      <div style={{ maxWidth: '560px', width: '100%', textAlign: 'left' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display), Space Grotesk, sans-serif',
            fontSize: '1.9rem',
            marginBottom: '0.5rem',
            color: 'var(--color-text)',
          }}
        >
          Confirm your new email
        </h1>
        <ConfirmEmailChangeClient token={token} />
      </div>
    </main>
  )
}
