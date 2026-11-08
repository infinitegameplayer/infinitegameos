import { NextRequest, NextResponse } from 'next/server'
import { botVerdict, refuseBots } from '@/lib/bot-guard'
import { autoJoinAllowed, cleanGateReport } from '@/lib/auto-action-gate'
import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/lib/supabase'
import { signEmailToken, signExpiringToken } from '@/lib/unsubscribe-token'
import { renderEmailShell } from '@/lib/email-shell'
import { leftThisListBefore } from '@/lib/list-return'
import {
  LIST_WELCOME_BACK_SUBJECT,
  WELCOME_SUBJECT,
  buildListWelcomeBackHtml,
  buildWelcomeHtml,
  cleanName,
} from '@/lib/igos-welcome'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_INFINITE_GAME_ID
const FROM = 'Lane Belone <play@infinitegameos.io>'
const REPLY_TO = 'play@infinitegameos.io'
const TAG = 'infinite_game_subscriber'
// The contacts.source_site check constraint allows 'igos', not 'infinitegameos'.
// Inserting the long form failed the constraint and silently dropped new
// IGOS-only contacts at the mirror step. Phase 6 fold-in, fixed 2026-06-02.
const SOURCE_SITE = 'igos'
const SITE_URL = 'https://www.infinitegameos.io'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const WELCOME_BACK_SUBJECT = 'Want back in?'
const WELCOME_BACK_PREVIEW = 'One click and you are back.'

// Sent instead of a silent re-add when an address that unsubscribed signs up
// again through this public form, which cannot prove the person asked. The
// link opens their own preferences, where one click restores any list
// (Site Defensibility Read 2026-10-25).
function buildWelcomeBackHtml(opts: { unsubscribeUrl: string; preferencesUrl: string; firstName?: string }) {
  const name = cleanName(opts.firstName)
  const greeting = name ? `Hey ${name},` : 'Hey there,'
  const body = `
    <p>${greeting}</p>
    <p>This address just asked to join the list again. You unsubscribed a while back, so I wanted to hear it from you before adding you back.</p>
    <p>If that was you, <a href="${opts.preferencesUrl}" style="color:#22d3ee;text-decoration:none">pick what you want to receive</a>.</p>
    <p>If it wasn't you, ignore this and nothing changes.</p>
    <p style="margin-top:2rem">With Joyful Sovereignty,</p>
    <p style="margin-top:0">Lane</p>
  `
  return renderEmailShell({
    body,
    unsubscribeUrl: opts.unsubscribeUrl,
    preferencesUrl: opts.preferencesUrl,
    preview: WELCOME_BACK_PREVIEW,
  })
}

function pathToSource(source: unknown): string {
  if (typeof source !== 'string' || !source) return 'form:updates'
  if (source === '/updates') return 'form:updates-index'
  if (source.startsWith('/updates/')) return `form:updates-post:${source.slice('/updates/'.length)}`
  return `form:${source}`
}

async function applySupabaseMirror(opts: {
  email: string
  firstName?: string
  source: string
}): Promise<void> {
  const supabase = getSupabaseAdmin()
  const { data: existing, error: selectErr } = await supabase
    .from('contacts')
    .select('id, tags, first_name, unsubscribed')
    .eq('email', opts.email)
    .maybeSingle()
  if (selectErr) throw selectErr

  if (existing) {
    const currentTags: string[] = Array.isArray(existing.tags) ? existing.tags : []
    const mergedTags = currentTags.includes(TAG) ? currentTags : [...currentTags, TAG]
    const updates: Record<string, unknown> = {
      tags: mergedTags,
      unsubscribed: false,
      unsubscribed_at: null,
    }
    // Only fill first_name when the row lacks one, matching the lanebelone
    // opt-in guard so a later capture never overwrites an earlier name.
    if (opts.firstName && !existing.first_name) updates.first_name = opts.firstName
    const { error: updateErr } = await supabase
      .from('contacts')
      .update(updates)
      .eq('id', existing.id)
    if (updateErr) throw updateErr
    return
  }

  const { error: insertErr } = await supabase.from('contacts').insert({
    email: opts.email,
    first_name: opts.firstName ?? null,
    source_site: SOURCE_SITE,
    source_form: opts.source,
    tags: [TAG],
  })
  if (insertErr) throw insertErr
}

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>
  try {
    payload = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const auto = payload?.mode === 'auto'

  // The automatic join from an email link (/updates/join, auto-action-gate.ts)
  // acts only when BotID vouches for the visitor and the address is already a
  // Kingdom contact. Anything else answers needsTap and the page shows its
  // one-tap button. A typed form or a tap keeps the ordinary check below.
  if (auto) {
    const verdict = await botVerdict({ route: '/api/igos-subscribe' })
    const autoEmail = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : ''
    let contact: { unsubscribed: boolean | null } | null = null
    if (verdict === 'human' && EMAIL_REGEX.test(autoEmail)) {
      const { data, error } = await getSupabaseAdmin()
        .from('contacts')
        .select('unsubscribed')
        .eq('email', autoEmail)
        .maybeSingle()
      if (!error) contact = data
    }
    const allowed = autoJoinAllowed(verdict, contact)
    console.log(`auto-join ${JSON.stringify({ route: '/api/igos-subscribe', verdict, known: contact !== null, allowed, gate: cleanGateReport(payload.gate) })}`)
    if (!allowed) return NextResponse.json({ ok: true, needsTap: true }, { status: 200 })
  } else {
    const blocked = await refuseBots({ route: '/api/igos-subscribe' })
    if (blocked) return blocked
  }

  try {
    const { email, firstName, honeypot, openedAt, source } = payload
    // The fill-time check below catches scripts that post a typed form faster
    // than a person can type. The one-tap join page (/updates/join) arrives
    // prefilled, so its client sends no openedAt and a quick tap is not dropped.

    if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    if (typeof openedAt === 'number' && Date.now() - openedAt < 1500) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email.' },
        { status: 400 }
      )
    }

    if (!RESEND_API_KEY || !AUDIENCE_ID) {
      console.error(
        'igos-subscribe: missing RESEND_API_KEY or RESEND_AUDIENCE_INFINITE_GAME_ID'
      )
      return NextResponse.json(
        { error: 'Subscribe is offline. Try again later.' },
        { status: 500 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedFirstName = cleanName(firstName)
    const sourceForm = auto ? 'one-click:updates-join' : pathToSource(source)

    // An address that unsubscribed is not re-added from this form. It gets one
    // welcome-back email and the response stays the same, so the form never
    // reveals who opted out. A lookup failure falls through to the ordinary
    // path, as the mirror below already tolerates its own failure.
    let returning = false
    try {
      const { data: prior } = await getSupabaseAdmin()
        .from('contacts')
        .select('unsubscribed, first_name, tags')
        .eq('email', normalizedEmail)
        .maybeSingle()
      if (prior?.unsubscribed === true) {
        const unsubscribeUrl = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(normalizedEmail)}&token=${signEmailToken(normalizedEmail)}`
        const preferencesUrl = `${SITE_URL}/preferences?email=${encodeURIComponent(normalizedEmail)}&token=${signExpiringToken(normalizedEmail)}`
        await new Resend(RESEND_API_KEY).emails.send({
          from: FROM,
          replyTo: REPLY_TO,
          to: normalizedEmail,
          subject: WELCOME_BACK_SUBJECT,
          html: buildWelcomeBackHtml({
            unsubscribeUrl,
            preferencesUrl,
            firstName: normalizedFirstName ?? prior.first_name ?? undefined,
          }),
        })
        return NextResponse.json({ ok: true }, { status: 200 })
      }
      // Already on this list: no second welcome email. The one-tap join page
      // from an email letter shows the reader a friendly "already on the list".
      if (prior && Array.isArray(prior.tags) && prior.tags.includes(TAG)) {
        return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 })
      }
      // An existing contact being added here: if they left this list before,
      // they get "Welcome back" in place of the first welcome. A brand new
      // contact never queries it.
      if (prior) returning = await leftThisListBefore(getSupabaseAdmin(), normalizedEmail, 'infinite_game')
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error'
      console.error('igos-subscribe opt-out check error:', m)
    }

    try {
      await applySupabaseMirror({ email: normalizedEmail, firstName: normalizedFirstName, source: sourceForm })
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error'
      console.error('igos-subscribe supabase mirror error:', m)
    }

    const resend = new Resend(RESEND_API_KEY)

    try {
      await resend.contacts.create({
        audienceId: AUDIENCE_ID,
        email: normalizedEmail,
        firstName: normalizedFirstName,
        unsubscribed: false,
      })
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error'
      if (!/already exists|409/i.test(m)) {
        console.error('igos-subscribe contacts.create error:', m)
      }
    }
    try {
      // create leaves an existing contact as it was, so a reader who left and rejoins stayed unsubscribed in Resend until the next reconcile (observed 2026-11-07). update clears it, as flipAudience does.
      await resend.contacts.update({ audienceId: AUDIENCE_ID, email: normalizedEmail, unsubscribed: false })
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error'
      console.error('igos-subscribe contacts.update error:', m)
    }

    try {
      const token = signEmailToken(normalizedEmail)
      const unsubscribeUrl = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(normalizedEmail)}&token=${token}`
      const preferencesUrl = `${SITE_URL}/preferences?email=${encodeURIComponent(normalizedEmail)}&token=${signExpiringToken(normalizedEmail)}`
      const leaveUrl = `${SITE_URL}/updates/leave?email=${encodeURIComponent(normalizedEmail)}&token=${token}`
      const welcomeOpts = { unsubscribeUrl, preferencesUrl, leaveUrl, email: normalizedEmail, firstName: normalizedFirstName }
      await resend.emails.send({
        from: FROM,
        replyTo: REPLY_TO,
        to: normalizedEmail,
        subject: returning ? LIST_WELCOME_BACK_SUBJECT : WELCOME_SUBJECT,
        html: returning ? buildListWelcomeBackHtml(welcomeOpts) : buildWelcomeHtml(welcomeOpts),
      })
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error'
      console.error('igos-subscribe welcome send error:', m)
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    console.error('igos-subscribe error:', m)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
