import { NextRequest, NextResponse } from 'next/server'
import { refuseBots } from '@/lib/bot-guard'

// Your AI's Charter signup. The form on /charter posts here, same origin, and
// this route forwards server to server to Side Quest HQ's form intake, which
// owns the list, the markers, the delivery email and the follow-ups. Neither
// site's CSP or CORS changes: the browser only ever talks to this site.
//
// The honeypot and openedAt travel intact so Side Quest HQ's bot checks run
// exactly as they do for its own forms. The Origin header names this site,
// which is what the sqhq-builders-gift form config allows.
//
// When the forward fails, the response says so and the form shows a link to
// sidequesthq.co/charter, which carries the same form posting directly.

const FORWARD_URL = 'https://www.sidequesthq.co/api/form-submit'
const ORIGIN = 'https://www.infinitegameos.io'
const FORM_NAME = 'sqhq-builders-gift'
const TIMEOUT_MS = 10000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const blocked = await refuseBots()
  if (blocked) return blocked
  let body: { email?: unknown; firstName?: unknown; honeypot?: unknown; openedAt?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
  }

  const payload = {
    formName: FORM_NAME,
    email,
    firstName: typeof body.firstName === 'string' && body.firstName.trim() ? body.firstName.trim() : undefined,
    honeypot: typeof body.honeypot === 'string' ? body.honeypot : '',
    openedAt: typeof body.openedAt === 'number' ? body.openedAt : undefined,
  }

  try {
    const res = await fetch(FORWARD_URL, {
      method: 'POST',
      // This call carries no browser signal, so Side Quest HQ's bot check
      // accepts it on the shared relay secret (Site Defensibility Read
      // 2026-10-25). The browser's own request was checked above.
      headers: {
        'Content-Type': 'application/json',
        Origin: ORIGIN,
        ...(process.env.FORM_RELAY_SECRET ? { 'x-kingdom-relay': process.env.FORM_RELAY_SECRET } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: 'no-store',
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error(`charter-signup forward failed: ${res.status} ${detail.slice(0, 200)}`)
      return NextResponse.json({ error: 'forward_failed' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    console.error('charter-signup forward error:', m)
    return NextResponse.json({ error: 'forward_failed' }, { status: 502 })
  }
}
