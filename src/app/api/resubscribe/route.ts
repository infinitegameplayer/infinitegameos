// One-click resubscribe via the same HMAC token used to unsubscribe.
// Exists so the /unsubscribe page can offer a "didn't mean to leave"
// button without asking the visitor to retype their email. No welcome
// email re-sends. This is a restore, not a fresh opt-in.

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/lib/supabase'
import { verifyEmailToken } from '@/lib/unsubscribe-token'

const TAG = 'infinite_game_subscriber'
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
    const { data: existing, error: selectErr } = await supabase
      .from('contacts')
      .select('id, tags')
      .eq('email', email)
      .maybeSingle()
    if (selectErr) throw selectErr

    const currentTags: string[] = Array.isArray(existing?.tags) ? existing!.tags : []
    const mergedTags = currentTags.includes(TAG) ? currentTags : [...currentTags, TAG]

    const { error: updateErr } = await supabase
      .from('contacts')
      .update({
        unsubscribed: false,
        unsubscribed_at: null,
        tags: mergedTags,
      })
      .eq('email', email)
    if (updateErr) throw updateErr
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    console.error('igos resubscribe supabase update error:', m)
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
        unsubscribed: false,
      })
    }
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    console.error('igos resubscribe resend audience error:', m)
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
