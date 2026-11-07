// "Not you? One click to undo." from the welcome email lands here:
// /updates/leave?email=...&token=... The server checks the signed token and
// whether the address is on the list, and writes nothing. LeaveClient takes the
// address off the list once a person is plainly on the page, or shows its
// button when it cannot tell (the scanner-proof one-click, 2026-11-07).

import Link from 'next/link'
import { getContactMembership } from '@/lib/email-lists'
import { joinStatus } from '@/lib/join-status'
import { verifyAnyToken } from '@/lib/unsubscribe-token'
import LeaveClient from './LeaveClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Leave the updates',
  robots: { index: false, follow: false },
  referrer: 'no-referrer' as const,
}

const lead = { color: 'rgba(226, 232, 240, 0.75)', lineHeight: 1.65 }
const main = { minHeight: '70vh', padding: '7rem 1.5rem 4rem', maxWidth: '640px', margin: '0 auto' }

export default async function LeavePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string | string[]; token?: string | string[] }>
}) {
  const params = await searchParams
  // A "+" in an address can arrive decoded as a space, as on the join page.
  const email = typeof params.email === 'string' ? params.email.trim().toLowerCase().replace(/ /g, '+') : ''
  const token = typeof params.token === 'string' ? params.token.trim() : ''

  if (!email || !token || email.length > 254 || !verifyAnyToken(email, token)) {
    return (
      <main style={main}>
        <h1 style={{ fontSize: '1.75rem', margin: 0 }}>This link did not work</h1>
        <p style={lead}>
          To change what you receive, use Manage preferences at the bottom of any letter, or reply to it and it will be handled by hand.
        </p>
      </main>
    )
  }

  const onList = joinStatus(await getContactMembership(email)) === 'already'

  return (
    <main style={main}>
      <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Leave the Infinite Game OS updates</h1>
      {onList ? (
        <LeaveClient email={email} token={token} />
      ) : (
        <>
          <p style={{ ...lead, wordBreak: 'break-all' }}>{email}</p>
          <p style={lead}>
            This address is not on the updates list, so there is nothing to undo. The{' '}
            <Link href="/updates" style={{ color: 'var(--color-accent)' }}>latest updates</Link> are still here to read.
          </p>
        </>
      )}
    </main>
  )
}
