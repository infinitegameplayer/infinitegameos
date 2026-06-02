import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/lib/supabase'
import { signEmailToken, signExpiringToken } from '@/lib/unsubscribe-token'
import { renderEmailShell } from '@/lib/email-shell'

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

const WELCOME_SUBJECT = 'Welcome to Infinite Game OS updates'
const WELCOME_PREVIEW =
  'Dispatches from the practice will arrive as the OS evolves.'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function buildWelcomeHtml(opts: { unsubscribeUrl: string; preferencesUrl: string; firstName?: string }) {
  const greeting = opts.firstName ? `Hi ${opts.firstName}.` : 'Hi.'
  const body = `
    <p>${greeting}</p>
    <p>You signed up for Infinite Game OS updates. The real ones, from inside the practice. New skills as they ship. Concepts as they cohere. Playbooks as they prove out.</p>
    <p>Bi-monthly steady state. Sometimes faster when a release lands. No hype, no upsell.</p>
    <p>If a piece is useful, forward it. The unsubscribe link sits on every send.</p>
    <p>The Updates page lives here:<br><a href="${SITE_URL}/updates" style="color:#22d3ee;text-decoration:none">${SITE_URL}/updates</a></p>
    <p style="margin-top:2rem">With Joyful Sovereignty,</p>
    <p style="margin-top:0">Lane</p>
  `
  return renderEmailShell({
    body,
    unsubscribeUrl: opts.unsubscribeUrl,
    preferencesUrl: opts.preferencesUrl,
    preview: WELCOME_PREVIEW,
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
  try {
    const { email, firstName, honeypot, openedAt, source } = await req.json()

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
    const normalizedFirstName =
      typeof firstName === 'string' && firstName.trim() ? firstName.trim() : undefined
    const sourceForm = pathToSource(source)

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
      const token = signEmailToken(normalizedEmail)
      const unsubscribeUrl = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(normalizedEmail)}&token=${token}`
      const preferencesUrl = `${SITE_URL}/preferences?email=${encodeURIComponent(normalizedEmail)}&token=${signExpiringToken(normalizedEmail)}`
      await resend.emails.send({
        from: FROM,
        replyTo: REPLY_TO,
        to: normalizedEmail,
        subject: WELCOME_SUBJECT,
        html: buildWelcomeHtml({ unsubscribeUrl, preferencesUrl, firstName: normalizedFirstName }),
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
