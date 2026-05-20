// Internal API endpoint that triggers a Resend Broadcast for one or more
// IGOS update articles. Authenticated via a shared secret in the
// Authorization header. Reads article frontmatter from content/updates,
// generates the Broadcast HTML from the shared email shell, then creates
// and sends the Broadcast through the Resend Broadcasts API.
//
// Companion script: Council Chamber/scripts/igos-broadcast-trigger.mjs

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { renderEmailShell } from '@/lib/email-shell'
import { createBroadcast, sendBroadcast } from '@/lib/resend-broadcast'

const SITE_URL = 'https://www.infinitegameos.io'
const FROM = 'Lane Belone <play@infinitegameos.io>'
const REPLY_TO = 'play@infinitegameos.io'
const UPDATES_DIR = path.join(process.cwd(), 'content', 'updates')
const RESEND_UNSUBSCRIBE_PLACEHOLDER = '{{{RESEND_UNSUBSCRIBE_URL}}}'

type Article = {
  slug: string
  title: string
  summary: string
  date: string
}

type RequestBody = {
  slug?: string
  slugs?: string[]
  audience?: 'production' | 'test'
  dryRun?: boolean
}

function loadArticle(slug: string): Article | null {
  const files = fs.readdirSync(UPDATES_DIR).filter((f) => f.endsWith('.mdx'))
  for (const filename of files) {
    const raw = fs.readFileSync(path.join(UPDATES_DIR, filename), 'utf8')
    const { data } = matter(raw)
    if (data.slug === slug) {
      return {
        slug: data.slug as string,
        title: data.title as string,
        summary: (data.summary as string) ?? '',
        date: String(data.date),
      }
    }
  }
  return null
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildBroadcastBody(articles: Article[]): string {
  if (articles.length === 1) {
    const a = articles[0]
    const title = escapeHtml(a.title)
    const summary = escapeHtml(a.summary)
    const url = `${SITE_URL}/updates/${a.slug}`
    return `
    <p>Hi.</p>
    <p>A new piece just landed on Infinite Game OS.</p>
    <p style="margin-top:1.5rem"><a href="${url}" style="color:#22d3ee;text-decoration:none;font-weight:600">${title}</a></p>
    <p>${summary}</p>
    <p style="margin-top:1.5rem">Read it here:<br><a href="${url}" style="color:#22d3ee;text-decoration:none">${url}</a></p>
    <p style="margin-top:2rem">With Joyful Sovereignty,</p>
    <p style="margin-top:0">Lane</p>
  `
  }
  const items = articles
    .map((a) => {
      const title = escapeHtml(a.title)
      const summary = escapeHtml(a.summary)
      const url = `${SITE_URL}/updates/${a.slug}`
      return `
    <p style="margin-top:1.5rem"><a href="${url}" style="color:#22d3ee;text-decoration:none;font-weight:600">${title}</a></p>
    <p>${summary}</p>
    <p><a href="${url}" style="color:rgba(34,211,238,0.7);text-decoration:none;font-size:14px">${url}</a></p>`
    })
    .join('')
  return `
    <p>Hi.</p>
    <p>New pieces just landed on Infinite Game OS.</p>
    ${items}
    <p style="margin-top:2rem">With Joyful Sovereignty,</p>
    <p style="margin-top:0">Lane</p>
  `
}

function buildSubject(articles: Article[]): string {
  if (articles.length === 1) return articles[0].title
  return `${articles.length} new pieces on the Infinite Game`
}

function buildPreview(articles: Article[]): string {
  if (articles.length === 1) {
    const s = articles[0].summary
    return s.length > 140 ? `${s.slice(0, 137)}...` : s
  }
  return `${articles.length} new articles from inside the practice.`
}

function getRequestSecret(req: NextRequest): string | null {
  const header = req.headers.get('authorization')
  if (!header) return null
  const match = header.match(/^Bearer\s+(.+)$/i)
  return match ? match[1].trim() : null
}

export async function POST(req: NextRequest) {
  const expectedSecret = process.env.BROADCAST_TRIGGER_SECRET
  if (!expectedSecret) {
    return NextResponse.json(
      { error: 'BROADCAST_TRIGGER_SECRET is not configured on this deployment.' },
      { status: 500 }
    )
  }

  const provided = getRequestSecret(req)
  if (!provided || provided !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: RequestBody
  try {
    body = (await req.json()) as RequestBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const slugs = Array.isArray(body.slugs)
    ? body.slugs.filter((s): s is string => typeof s === 'string' && s.trim().length > 0)
    : typeof body.slug === 'string' && body.slug.trim().length > 0
      ? [body.slug]
      : []
  if (slugs.length === 0) {
    return NextResponse.json(
      { error: 'Provide slug or slugs in the request body.' },
      { status: 400 }
    )
  }

  const audienceTarget = body.audience === 'production' ? 'production' : 'test'
  const audienceId =
    audienceTarget === 'production'
      ? process.env.RESEND_AUDIENCE_INFINITE_GAME_ID
      : process.env.RESEND_AUDIENCE_TEST_ID
  if (!audienceId) {
    return NextResponse.json(
      {
        error: `Missing audience env var for target "${audienceTarget}". Set RESEND_AUDIENCE_${audienceTarget === 'production' ? 'INFINITE_GAME_ID' : 'TEST_ID'}.`,
      },
      { status: 500 }
    )
  }

  const articles: Article[] = []
  for (const slug of slugs) {
    const a = loadArticle(slug)
    if (!a) {
      return NextResponse.json(
        { error: `Article not found for slug: ${slug}` },
        { status: 404 }
      )
    }
    articles.push(a)
  }

  const subject = buildSubject(articles)
  const preview = buildPreview(articles)
  const bodyHtml = buildBroadcastBody(articles)
  const html = renderEmailShell({
    body: bodyHtml,
    unsubscribeUrl: RESEND_UNSUBSCRIBE_PLACEHOLDER,
    preview,
  })

  if (body.dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      audienceTarget,
      audienceId,
      subject,
      preview,
      slugs,
      htmlLength: html.length,
    })
  }

  const created = await createBroadcast({
    audienceId,
    subject,
    html,
    from: FROM,
    replyTo: REPLY_TO,
    previewText: preview,
    name: `${audienceTarget}: ${subject}`,
  })
  if (!created.ok) {
    return NextResponse.json(
      { error: `Broadcast create failed: ${created.error}` },
      { status: 502 }
    )
  }

  const sent = await sendBroadcast(created.id)
  if (!sent.ok) {
    return NextResponse.json(
      {
        error: `Broadcast send failed: ${sent.error}`,
        broadcastId: created.id,
        note: 'The Broadcast exists as a draft in the Resend dashboard. Send it manually or retry.',
      },
      { status: 502 }
    )
  }

  return NextResponse.json({
    ok: true,
    audienceTarget,
    broadcastId: created.id,
    slugs,
    subject,
  })
}
