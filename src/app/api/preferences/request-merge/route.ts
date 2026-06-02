// Sovereign Email Preference Center, Phase 3. Merge ticket.
// When a change hit an already-on-file collision, the confirm page offers a
// one-click "combine them for me". This route files the durable audit ticket,
// notifies the Kingdom support inbox with full context and acknowledges to both
// the old and new addresses. No contact data is mutated. The merge itself stays
// a manual step until a real case earns the automation. Mirror across lanebelone
// and IGOS.

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { signEmailToken } from '@/lib/unsubscribe-token'
import { requestEmailMerge } from '@/lib/email-lists'
import { renderEmailShell } from '@/lib/email-shell'

const SITE_URL = 'https://www.infinitegameos.io'
const FROM = 'Lane Belone <play@infinitegameos.io>'
const REPLY_TO = 'play@infinitegameos.io'
// Fastmail catch-all routes any address on the domain, so support@ lands. Env
// override repoints it without a deploy.
const MERGE_NOTIFY_TO = process.env.MERGE_NOTIFY_TO || 'support@sidequesthq.co'

export async function POST(req: NextRequest) {
  let body: { t?: string }
  try {
    body = (await req.json()) as { t?: string }
  } catch {
    return NextResponse.json({ ok: false, status: 'invalid' }, { status: 400 })
  }

  const secret = typeof body?.t === 'string' ? body.t.trim() : ''
  if (!secret) return NextResponse.json({ ok: false, status: 'invalid' }, { status: 400 })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const result = await requestEmailMerge({ secret, ip })
  if (!result.ok) {
    return NextResponse.json({ ok: false, status: result.status }, { status: 400 })
  }

  // A deduped repeat (merge-already-requested) is a success, but it must not
  // re-notify support or re-acknowledge. Only a genuine first ticket sends.
  if (result.status !== 'merge-requested') {
    return NextResponse.json({ ok: true, status: result.status })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const when = new Date().toISOString()
    const notifyUnsub = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(MERGE_NOTIFY_TO)}&token=${signEmailToken(MERGE_NOTIFY_TO)}`
    await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: MERGE_NOTIFY_TO,
      subject: `Merge request: ${result.oldEmail} to ${result.newEmail}`,
      html: renderEmailShell({
        preview: 'A subscriber asked to combine two contact records.',
        unsubscribeUrl: notifyUnsub,
        body: `
          <p>A subscriber tried to change their email to an address already on file and asked to combine the two.</p>
          <p><strong>From:</strong> ${result.oldEmail}<br>
          <strong>To:</strong> ${result.newEmail}<br>
          <strong>When:</strong> ${when}<br>
          <strong>IP:</strong> ${ip ?? 'unknown'}</p>
          <p>Both addresses are real contacts. Merge by hand: union the tags, keep the most-subscribed state, then remove the spare row. Logged as email_change_merge_requested in preference_audit.</p>
        `,
      }),
    })

    const ackBody = `
      <p>Got it. That address is already on file, so I will combine the two for you by hand and follow up shortly.</p>
      <p>Nothing else is needed from you.</p>
    `
    for (const to of [result.oldEmail!, result.newEmail!]) {
      const unsub = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(to)}&token=${signEmailToken(to)}`
      await resend.emails.send({
        from: FROM,
        replyTo: REPLY_TO,
        to,
        subject: 'Combining your two email addresses',
        html: renderEmailShell({
          preview: 'Your request to combine addresses is in.',
          unsubscribeUrl: unsub,
          body: ackBody,
        }),
      })
    }
  } catch (err) {
    console.error('merge request send failed:', err instanceof Error ? err.message : err)
  }

  return NextResponse.json({ ok: true, status: 'merge-requested' })
}
