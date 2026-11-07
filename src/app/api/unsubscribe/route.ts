// Unsubscribe handler for the IGOS welcome email and any future
// transactional surface that needs a manual unsubscribe link. Verifies
// the HMAC token, sets unsubscribed=true on the Supabase contact, and
// flips the Resend audience contact unsubscribed flag. Mirror of the
// lanebelone /api/unsubscribe pattern targeting the Infinite Game
// audience.
//
// The scanner-proof gate (Email Codex Section 12, 2026-11-07): mode 'auto' is
// the page acting by itself once a person is plainly there, and it acts only on
// BotID's human verdict, otherwise answering needsTap so the page shows its
// button. A mail scanner that runs the page's scripts therefore never takes a
// reader off every list. Any other request is the button: the ordinary BotID
// check, which lets the request through if BotID itself fails.

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { botVerdict, refuseBots } from '@/lib/bot-guard'
import { cleanGateReport } from '@/lib/auto-action-gate'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verifyEmailToken } from '@/lib/unsubscribe-token'

const AUDIENCE_NAME = 'Infinite Game'

export async function POST(req: NextRequest) {
  let body: { email?: string; token?: string; mode?: unknown; gate?: unknown }
  try {
    body = (await req.json()) as typeof body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
  const token = typeof body?.token === 'string' ? body.token.trim() : ''

  if (!email || !token) {
    return NextResponse.json({ error: 'Missing email or token' }, { status: 400 })
  }

  if (!verifyEmailToken(email, token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }

  if (body.mode === 'auto') {
    const verdict = await botVerdict({ route: '/api/unsubscribe' })
    console.log(`auto-leave ${JSON.stringify({ route: '/api/unsubscribe', verdict, gate: cleanGateReport(body.gate) })}`)
    if (verdict !== 'human') return NextResponse.json({ ok: true, needsTap: true }, { status: 200 })
  } else {
    const blocked = await refuseBots({ route: '/api/unsubscribe' })
    if (blocked) return blocked
  }

  const supabase = getSupabaseAdmin()
  try {
    const { error } = await supabase
      .from('contacts')
      .update({
        unsubscribed: true,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', email)
    if (error) throw error
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    console.error('igos unsubscribe supabase update error:', m)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const audienceId =
      process.env.RESEND_AUDIENCE_INFINITE_GAME_ID ||
      (await resolveAudienceIdByName(resend))
    if (audienceId) {
      await resend.contacts.update({
        audienceId,
        email,
        unsubscribed: true,
      })
    }
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    console.error('igos unsubscribe resend audience error:', m)
  }

  return NextResponse.json({ ok: true })
}

async function resolveAudienceIdByName(resend: Resend): Promise<string | null> {
  try {
    const list = await resend.audiences.list()
    const found = list.data?.data?.find((a) => a.name === AUDIENCE_NAME)
    return found?.id ?? null
  } catch {
    return null
  }
}
