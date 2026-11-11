// Bot check for the routes that send email. The browser half lives in
// instrumentation-client.ts, which attaches Vercel BotID's signal to the
// routes listed in botid-routes.ts; a script that calls one of those routes
// directly carries no signal and is refused before anything is sent. Basic
// level, free on every plan (Site Defensibility Read 2026-10-25).
//
// Every route listed in botid-routes.ts calls refuseBots(), and every route
// that calls it is listed there: a listed route without the check is
// unguarded, and a checked route missing from the list refuses every visitor.
//
// A BotID failure lets the request through and logs it, so a vendor hiccup
// never takes the forms down; the honeypot and fill-time checks still run.
// Mirror across the three sites.
//
// Every refusal writes one log line ("botid refused {route, verified, name,
// category}"), so a turned-away visitor shows up in the Vercel runtime logs.
// Before this, a refusal left no trace (2026-11-06, mirrored from sidequesthq
// #242). Only sidequesthq welcomes verified shopping agents, on its payment
// routes; this site has none, so every bot on an email route is refused.

import { checkBotId } from 'botid/server'
import { NextResponse } from 'next/server'

export type BotVerification = {
  isBot: boolean
  isVerifiedBot?: boolean
  verifiedBotName?: string
  verifiedBotCategory?: string
}

type Check = () => Promise<BotVerification>

// What BotID said about the visitor. 'unchecked' means BotID itself failed.
// refuseBots lets an unchecked request through (a form a person typed into).
// An automatic action from an email link (auto-action-gate.ts) acts only on
// 'human' and otherwise hands the page its one-tap button (2026-11-07).
export type BotVerdict = 'human' | 'bot' | 'unchecked'

export async function botVerdict(
  options: { route?: string } = {},
  check: Check = checkBotId as Check
): Promise<BotVerdict> {
  try {
    const v = await check()
    if (!v.isBot) return 'human'
    const line = JSON.stringify({
      route: options.route ?? 'unknown', // a caller that names no route still logs; the line just reads less precisely
      verified: v.isVerifiedBot === true,
      name: v.verifiedBotName ?? null,
      category: v.verifiedBotCategory ?? null,
    })
    console.warn(`botid refused ${line}`)
    return 'bot'
  } catch (err) {
    console.error('botid check failed:', err instanceof Error ? err.message : err)
    return 'unchecked'
  }
}

export async function refuseBots(
  options: { route?: string } = {},
  check: Check = checkBotId as Check
): Promise<NextResponse | null> {
  const verdict = await botVerdict(options, check)
  if (verdict === 'bot') return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  return null
}
