// Unsubscribe confirmation page. Reads email + token from query string and
// POSTs to /api/unsubscribe. Mirrors the lanebelone pattern with the IGOS
// visual register.

import UnsubscribeClient from './UnsubscribeClient'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Unsubscribe',
  robots: { index: false, follow: false },
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>
}) {
  const params = await searchParams
  const email = typeof params.email === 'string' ? params.email : ''
  const token = typeof params.token === 'string' ? params.token : ''

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
        <UnsubscribeClient email={email} token={token} />
      </div>
    </main>
  )
}
