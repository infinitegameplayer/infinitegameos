// Sovereign Email Preference Center, Phase 3. Cancel an email change.
// POST only, reached from the cancel landing page button. The single-use cancel
// secret in the body is the auth. A request already confirmed or cancelled is a
// no-op, which closes the confirm-versus-cancel race. Mirror across lanebelone
// and IGOS.

import { NextRequest, NextResponse } from 'next/server'
import { cancelEmailChange } from '@/lib/email-lists'

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
  const result = await cancelEmailChange({ secret, ip })
  return NextResponse.json({ ok: result.ok, status: result.status })
}
