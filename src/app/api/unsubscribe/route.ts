// Unsubscribe handler for the IGOS welcome email and any future
// transactional surface that needs a manual unsubscribe link. Verifies
// the HMAC token, sets unsubscribed=true on the Supabase contact, and
// flips the Resend audience contact unsubscribed flag. Mirror of the
// lanebelone /api/unsubscribe pattern targeting the Infinite Game
// audience.

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verifyEmailToken } from '@/lib/unsubscribe-token'

const AUDIENCE_NAME = 'Infinite Game'

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

  if (!verifyEmailToken(email, token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
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
