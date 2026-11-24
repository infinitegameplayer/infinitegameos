// The one-click undo behind "Not you? One click to undo." in the welcome email
// (King-ruled 2026-11-07). Leaves the Infinite Game OS updates list only; every
// other list stays. The signed token proves the link came from our own email.
//
// Acts only on a person's press of the page's button (press-only.ts), so a mail
// scanner reading the welcome email never undoes a join a person wanted. The
// press passes the ordinary BotID check, which lets it through if BotID itself
// fails.

import { NextRequest, NextResponse } from 'next/server'
import { refuseBots } from '@/lib/bot-guard'
import { refuseAutomatic } from '@/lib/press-only'
import { verifyAnyToken } from '@/lib/unsubscribe-token'
import { applyListUnsubscribe } from '@/lib/email-lists'

const LIST_KEY = 'infinite_game'

export async function POST(req: NextRequest) {
  let body: { email?: unknown; token?: unknown; mode?: unknown }
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

  const refused = refuseAutomatic('/api/updates/leave', body.mode)
  if (refused) return refused
  const blocked = await refuseBots({ route: '/api/updates/leave' })
  if (blocked) return blocked

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const result = await applyListUnsubscribe({ email, listKey: LIST_KEY, ip })
  if (!result.ok) {
    return NextResponse.json({ error: 'Something went wrong. Try again in a moment.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true, status: result.status })
}
