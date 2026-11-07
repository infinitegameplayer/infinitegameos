// One-tap join for readers of the email letters. The link in the email carries
// the reader's address: /updates/join?email=... This page only shows it and
// asks for one confirming tap. Nothing is written on GET, so an email link
// scanner that opens the link joins no one. The button posts to the ordinary
// /api/igos-subscribe route, which carries the BotID check.

import Link from 'next/link'
import SubscribeForm from '@/components/SubscribeForm'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Join the updates',
  robots: { index: false, follow: false },
  referrer: 'no-referrer' as const,
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[] }>
}) {
  const params = await searchParams
  // An address never holds a space, so a space here is a "+" the query string
  // decoded (name+tag@example.com arriving unencoded from the email link).
  const raw = typeof params.email === 'string' ? params.email.trim().replace(/ /g, '+') : ''
  const email = raw.length <= 254 && EMAIL_REGEX.test(raw) ? raw : ''

  return (
    <main style={{ minHeight: '70vh', padding: '7rem 1.5rem 4rem', maxWidth: '640px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Join the Infinite Game OS updates</h1>
      {email ? (
        <>
          <p style={{ color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.65 }}>
            Real releases and real lessons from inside the practice, sent when there is one. One tap and this address is on the list.
          </p>
          <SubscribeForm prefilledEmail={email} />
        </>
      ) : (
        <>
          <p style={{ color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.65 }}>
            This link did not carry an email address. Enter yours below, or visit the{' '}
            <Link href="/updates" style={{ color: 'var(--color-accent)' }}>Updates page</Link>.
          </p>
          <SubscribeForm />
        </>
      )}
    </main>
  )
}
