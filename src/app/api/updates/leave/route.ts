// The one-click undo behind "Not you? One click to undo." in the welcome email
// (King-ruled 2026-11-07). Leaves the Infinite Game OS updates list only; every
// other list stays. The signed token proves the link came from our own email.
//
// mode 'auto' is the page acting by itself (auto-action-gate.ts): it acts only
// when BotID vouches for the visitor, and otherwise answers needsTap so the
// page shows its button. A mail scanner reading the welcome email therefore
// never undoes a join a person wanted. mode 'tap' is the button: the ordinary
// BotID check, which lets the request through if BotID itself fails.

import { NextRequest, NextResponse } from 'next/server'
import { botVerdict, refuseBots } from '@/lib/bot-guard'
import { cleanGateReport } from '@/lib/auto-action-gate'
import { verifyAnyToken } from '@/lib/unsubscribe-token'
import { applyListUnsubscribe } from '@/lib/email-lists'

const LIST_KEY = 'infinite_game'

export async function POST(req: NextRequest) {
  let body: { email?: unknown; token?: unknown; mode?: unknown; gate?: unknown }
  try {
    body = (await req.json()) as typeof body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const token = typeof body.token === 'string' ? body.token.trim() : ''
  if (!email || !token) {
    return NextResponse.json({ error: 'Missing email or token' }, { status: 400 })
  }
  if (!verifyAnyToken(email, token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }

  if (body.mode === 'auto') {
    const verdict = await botVerdict({ route: '/api/updates/leave' })
    console.log(`auto-leave ${JSON.stringify({ route: '/api/updates/leave', verdict, gate: cleanGateReport(body.gate) })}`)
    if (verdict !== 'human') return NextResponse.json({ ok: true, needsTap: true }, { status: 200 })
  } else {
    const blocked = await refuseBots({ route: '/api/updates/leave' })
    if (blocked) return blocked
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const result = await applyListUnsubscribe({ email, listKey: LIST_KEY, ip })
  if (!result.ok) {
    return NextResponse.json({ error: 'Something went wrong. Try again in a moment.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true, status: result.status })
}
