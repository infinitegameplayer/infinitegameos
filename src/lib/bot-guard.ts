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

import { checkBotId } from 'botid/server'
import { NextResponse } from 'next/server'

export async function refuseBots(): Promise<NextResponse | null> {
  try {
    const verification = await checkBotId()
    if (verification.isBot) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
  } catch (err) {
    console.error('botid check failed, request allowed:', err instanceof Error ? err.message : err)
  }
  return null
}
