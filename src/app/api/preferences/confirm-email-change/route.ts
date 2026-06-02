// Sovereign Email Preference Center, Phase 3. Confirm an email change.
// POST only. The confirm landing page renders a button and never executes on a
// bare GET, so a scanner prefetch cannot complete a change. The single-use
// secret in the body is the auth. Returns the outcome status so the page can
// show the result, including the already-on-file collision path. Mirror across
// lanebelone and IGOS.

import { NextRequest, NextResponse } from 'next/server'
import { confirmEmailChange } from '@/lib/email-lists'

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
  const result = await confirmEmailChange({ secret, ip })
  return NextResponse.json({ ok: result.ok, status: result.status })
}
