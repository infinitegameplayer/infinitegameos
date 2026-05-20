import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/lib/supabase'
import { signEmailToken } from '@/lib/unsubscribe-token'
import { renderEmailShell } from '@/lib/email-shell'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_INFINITE_GAME_ID
const FROM = 'Lane Belone <play@infinitegameos.io>'
const REPLY_TO = 'play@infinitegameos.io'
const TAG = 'infinite_game_subscriber'
const SOURCE_SITE = 'infinitegameos'
const SITE_URL = 'https://www.infinitegameos.io'

const WELCOME_SUBJECT = 'Welcome to Infinite Game OS updates'
const WELCOME_PREVIEW =
  'Dispatches from the practice will arrive as the OS evolves.'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function buildWelcomeHtml(opts: { unsubscribeUrl: string }) {
  const body = `
    <p>Hi.</p>
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
  source: string
}): Promise<void> {
  const supabase = getSupabaseAdmin()
  const { data: existing, error: selectErr } = await supabase
    .from('contacts')
    .select('id, tags, unsubscribed')
    .eq('email', opts.email)
    .maybeSingle()
  if (selectErr) throw selectErr

  if (existing) {
    const currentTags: string[] = Array.isArray(existing.tags) ? existing.tags : []
    const mergedTags = currentTags.includes(TAG) ? currentTags : [...currentTags, TAG]
    const { error: updateErr } = await supabase
      .from('contacts')
      .update({
        tags: mergedTags,
        unsubscribed: false,
        unsubscribed_at: null,
      })
      .eq('id', existing.id)
    if (updateErr) throw updateErr
    return
  }

  const { error: insertErr } = await supabase.from('contacts').insert({
    email: opts.email,
    source_site: SOURCE_SITE,
    source_form: opts.source,
    tags: [TAG],
  })
  if (insertErr) throw insertErr
}

export async function POST(req: NextRequest) {
  try {
    const { email, honeypot, openedAt, source } = await req.json()

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
    const sourceForm = pathToSource(source)

    try {
      await applySupabaseMirror({ email: normalizedEmail, source: sourceForm })
    } catch (err) {
      const m = err instanceof Error ? err.message : 'Unknown error'
      console.error('igos-subscribe supabase mirror error:', m)
    }

    const resend = new Resend(RESEND_API_KEY)

    try {
      await resend.contacts.create({
        audienceId: AUDIENCE_ID,
        email: normalizedEmail,
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
      await resend.emails.send({
        from: FROM,
        replyTo: REPLY_TO,
        to: normalizedEmail,
        subject: WELCOME_SUBJECT,
        html: buildWelcomeHtml({ unsubscribeUrl }),
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
