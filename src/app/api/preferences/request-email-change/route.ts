// Sovereign Email Preference Center, Phase 3. Start an email change.
// Token-gated on the OLD address (the preference page is entered with that
// token). Mints the dual-address request, then sends the confirmation to the new
// address and the notice plus cancel link to the old address. The change applies
// only when the new-address link is confirmed. Mirror across lanebelone and IGOS,
// with this site's send shell and SITE_URL.

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { verifyAnyToken, signEmailToken } from '@/lib/unsubscribe-token'
import { requestEmailChange } from '@/lib/email-lists'
import { renderEmailShell } from '@/lib/email-shell'

const SITE_URL = 'https://www.infinitegameos.io'
const FROM = 'Lane Belone <play@infinitegameos.io>'
const REPLY_TO = 'play@infinitegameos.io'

export async function POST(req: NextRequest) {
  let body: { email?: string; token?: string; newEmail?: string }
  try {
    body = (await req.json()) as { email?: string; token?: string; newEmail?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const token = typeof body?.token === 'string' ? body.token.trim() : ''
  const newEmail = typeof body?.newEmail === 'string' ? body.newEmail.trim().toLowerCase() : ''

  if (!email || !token || !newEmail) {
    return NextResponse.json({ error: 'Missing field' }, { status: 400 })
  }
  if (!verifyAnyToken(email, token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const result = await requestEmailChange({ oldEmail: email, newEmail, ip })

  if (!result.ok) {
    const code = result.status === 'rate-limited' ? 429 : 400
    return NextResponse.json({ ok: false, status: result.status }, { status: code })
  }

  // Send both legs. A send failure does not roll back the request; the links can
  // be re-requested. We still report ok so the page reveals no send internals.
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const confirmUrl = `${SITE_URL}/preferences/confirm-email-change?t=${result.confirmSecret}`
    const cancelUrl = `${SITE_URL}/preferences/cancel-email-change?t=${result.cancelSecret}`
    const newUnsub = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(result.newEmail!)}&token=${signEmailToken(result.newEmail!)}`
    const oldUnsub = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(result.oldEmail!)}&token=${signEmailToken(result.oldEmail!)}`

    await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: result.newEmail!,
      subject: 'Confirm your new email address',
      html: renderEmailShell({
        preview: 'Confirm the address change to start receiving here.',
        unsubscribeUrl: newUnsub,
        body: `
          <p>Someone, hopefully you, asked to move their email subscriptions to this address.</p>
          <p>Confirm to make it official. Until you do, nothing changes.</p>
          <p><a href="${confirmUrl}" style="color:#22d3ee;text-decoration:none">Confirm this address</a></p>
          <p>This link works for 72 hours. If you did not ask for this, you can ignore it and nothing happens.</p>
        `,
      }),
    })
    await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: result.oldEmail!,
      subject: 'A change to your email address was requested',
      html: renderEmailShell({
        preview: 'If this was not you, cancel it here.',
        unsubscribeUrl: oldUnsub,
        body: `
          <p>A request came in to move your email subscriptions to a new address.</p>
          <p>If that was you, confirm from the new address and the move completes. Nothing else is needed here.</p>
          <p>If it was not you, cancel it now. The change only applies once the new address is confirmed.</p>
          <p><a href="${cancelUrl}" style="color:#22d3ee;text-decoration:none">Cancel this change</a></p>
        `,
      }),
    })
  } catch (err) {
    console.error('email change send failed:', err instanceof Error ? err.message : err)
  }

  return NextResponse.json({ ok: true, status: 'pending' })
}
