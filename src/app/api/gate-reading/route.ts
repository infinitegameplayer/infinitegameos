// The gate's own reading, sent by an email-link page when its one-tap button
// appears for a reason the server never saw (useAutoAction.ts; GateBeacon in
// src/lib/auto-action-gate.ts). Before this, a closed gate logged nothing:
// Brave on iOS showed the button on 2026-11-07 and no line said which check it
// failed. Each reading writes one `gate-reading` line to the Vercel runtime log
// and changes nothing else.
//
// It is in BOTID_PROTECTED like every route a page posts to, and the line is
// written before the bot check answers, so a reading BotID refuses still
// leaves its line (with botid: 'refused'). A scanner that renders the page and
// presses nothing shows up here too, which is the point.

import { NextRequest, NextResponse } from 'next/server'
import { refuseBots } from '@/lib/bot-guard'
import { cleanGateBeacon, uaFamily } from '@/lib/auto-action-gate'

const MAX_BYTES = 2048

export async function POST(req: NextRequest) {
  const text = await req.text().catch(() => '')
  if (!text || text.length > MAX_BYTES) return new NextResponse(null, { status: 400 })
  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch {
    return new NextResponse(null, { status: 400 })
  }
  const reading = cleanGateBeacon(raw)
  if (!reading) return new NextResponse(null, { status: 400 })

  const blocked = await refuseBots({ route: '/api/gate-reading' })
  console.log(`gate-reading ${JSON.stringify({ ...reading, ua: uaFamily(req.headers.get('user-agent')), botid: blocked ? 'refused' : 'passed' })}`)
  return blocked ?? new NextResponse(null, { status: 204 })
}
