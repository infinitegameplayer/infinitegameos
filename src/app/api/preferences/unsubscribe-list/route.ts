// Sovereign Email Preference Center, Phase 1. List-aware unsubscribe.
// Leaves one list: removes the tag and suppresses that audience while other
// lists stay live. Verifies the deterministic HMAC token (the expiring-token
// page entry lands in Phase 2). Mirror across lanebelone and IGOS.

import { NextRequest, NextResponse } from 'next/server'
import { verifyEmailToken } from '@/lib/unsubscribe-token'
import { applyListUnsubscribe } from '@/lib/email-lists'

export async function POST(req: NextRequest) {
  let body: { email?: string; token?: string; list?: string }
  try {
    body = (await req.json()) as { email?: string; token?: string; list?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const token = typeof body?.token === 'string' ? body.token.trim() : ''
  const list = typeof body?.list === 'string' ? body.list.trim() : ''

  if (!email || !token || !list) {
    return NextResponse.json({ error: 'Missing email, token or list' }, { status: 400 })
  }

  if (!verifyEmailToken(email, token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const result = await applyListUnsubscribe({ email, listKey: list, ip })

  if (!result.ok) {
    const status = result.status === 'unknown-list' ? 400 : 500
    return NextResponse.json({ error: result.error ?? 'Update failed' }, { status })
  }

  return NextResponse.json({ ok: true, status: result.status })
}
