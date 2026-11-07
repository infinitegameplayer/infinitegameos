// One-tap join for readers of the email letters. The link in the email carries
// the reader's address: /updates/join?email=... When the page opens it reads
// whether that address is already on the list (the check before the tap,
// 2026-11-07). A reader already on it is told so and sees no button. Everyone
// else sees the address and one confirming tap. Nothing is written on open, so
// an email link scanner that opens the link joins no one. The button posts to
// the ordinary /api/igos-subscribe route, which carries the BotID check.

import Link from 'next/link'
import SubscribeForm from '@/components/SubscribeForm'
import { getContactMembership } from '@/lib/email-lists'
import { joinStatus } from '@/lib/join-status'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Join the updates',
  robots: { index: false, follow: false },
  referrer: 'no-referrer' as const,
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const lead = { color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.65 }

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
  // getContactMembership returns the empty "never seen" shape on any read
  // error, so a database hiccup shows the button rather than breaking the page.
  const status = email ? joinStatus(await getContactMembership(email)) : null

  if (email && status === 'already') {
    return (
      <main style={{ minHeight: '70vh', padding: '7rem 1.5rem 4rem', maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.75rem', margin: 0 }}>You are already on the list</h1>
        <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
        <p style={lead}>
          The next dispatch arrives from inside the practice. To change what you receive, use Manage preferences at the bottom of any letter. Meanwhile, the{' '}
          <Link href="/updates" style={{ color: 'var(--color-accent)' }}>latest updates</Link> are here.
        </p>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '70vh', padding: '7rem 1.5rem 4rem', maxWidth: '640px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Join the Infinite Game OS updates</h1>
      {email ? (
        <>
          <p style={lead}>
            Real releases and real lessons from inside the practice, sent when there is one. One tap and this address is on the list.
          </p>
          <SubscribeForm prefilledEmail={email} />
        </>
      ) : (
        <>
          <p style={lead}>
            This link did not carry an email address. Enter yours below, or visit the{' '}
            <Link href="/updates" style={{ color: 'var(--color-accent)' }}>Updates page</Link>.
          </p>
          <SubscribeForm />
        </>
      )}
    </main>
  )
}
