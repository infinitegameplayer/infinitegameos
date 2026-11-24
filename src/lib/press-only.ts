// Every email-link page acts only on a person's press (King-ruled 2026-11-23,
// Email Codex Section 12). The automatic act retired that day: on 2026-11-09 a
// mail scanner (a Microsoft 365 style sandbox running real Chrome, which BotID
// vouched for as human) opened every link in an Articles email, joined two
// readers to the IGOS list and then undid one of them through the welcome's
// undo link. No check on the page or the server told it apart from a person,
// so the page no longer acts by itself: it shows its button, and only the
// press joins or leaves.
//
// A request that still says mode 'auto' comes from a page loaded before the
// change (an open tab, a cached copy) or from something imitating one. It
// changes nothing, answers needsTap so an old page shows its button, and leaves
// one `auto-refused` log line, so a scanner's visits stay countable.
// Mirror across the three sites.

import { NextResponse } from 'next/server'

export function refuseAutomatic(route: string, mode: unknown): NextResponse | null {
  if (mode !== 'auto') return null
  console.log(`auto-refused ${JSON.stringify({ route })}`)
  return NextResponse.json({ ok: true, needsTap: true }, { status: 200 })
}
