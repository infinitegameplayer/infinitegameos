// Sovereign Email Preference Center, Phase 2. The subscriber-facing page.
// One row, every list, on-brand per domain. Entry is an expiring signed link.
// A valid token loads the contact row and renders the toggles. An expired or
// unknown token renders the identical fresh-link fallback, so the page never
// confirms list membership to a probe. No analytics on this route (gated in the
// layout via no-track). Mirror of the lanebelone page with the IGOS register.

import type { Metadata } from 'next'
import PreferencesClient, { type ListView } from './PreferencesClient'
import { verifyExpiringToken } from '@/lib/unsubscribe-token'
import { LISTS, getContactMembership, maskEmail } from '@/lib/email-lists'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Email preferences',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export default async function PreferencesPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>
}) {
  const params = await searchParams
  const email = typeof params.email === 'string' ? params.email : ''
  const token = typeof params.token === 'string' ? params.token : ''

  const status = email && token ? verifyExpiringToken(email, token) : 'invalid'
  const valid = status === 'valid'

  // Membership is read and the email is unmasked only on a valid token. An
  // expired or unknown token falls through to the same empty shape, so nothing
  // about the row reaches the rendered HTML.
  let lists: ListView[] = []
  let maskedEmail = ''
  if (valid) {
    const membership = await getContactMembership(email)
    maskedEmail = maskEmail(email)
    lists = LISTS.map((l) => ({
      key: l.key,
      label: l.label,
      description: l.description,
      site: l.site,
      joined: !membership.unsubscribed && membership.tags.includes(l.tag),
    }))
  }

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
          Email preferences
        </h1>
        <PreferencesClient
          valid={valid}
          email={valid ? email : ''}
          token={valid ? token : ''}
          maskedEmail={maskedEmail}
          lists={lists}
          currentSite="infinitegameos"
          prefillEmail={email}
        />
      </div>
    </main>
  )
}
