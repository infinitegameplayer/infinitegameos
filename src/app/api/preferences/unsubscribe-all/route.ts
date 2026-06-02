// Sovereign Email Preference Center, Phase 1. Global unsubscribe.
// The master off-switch behind the bottom-of-page control. Sets the global flag,
// keeps tags as a suppression record, suppresses every audience. Verifies the
// deterministic HMAC token, the same one the RFC 8058 one-click header carries.
// Mirror across lanebelone and IGOS.

import { NextRequest, NextResponse } from 'next/server'
import { verifyAnyToken } from '@/lib/unsubscribe-token'
import { applyGlobalUnsubscribe } from '@/lib/email-lists'

export async function POST(req: NextRequest) {
  let body: { email?: string; token?: string }
  try {
    body = (await req.json()) as { email?: string; token?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const token = typeof body?.token === 'string' ? body.token.trim() : ''

  if (!email || !token) {
    return NextResponse.json({ error: 'Missing email or token' }, { status: 400 })
  }

  if (!verifyAnyToken(email, token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const result = await applyGlobalUnsubscribe({ email, ip })

  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? 'Update failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, status: result.status })
}
