// The IGOS update broadcast body. The letters map sits at the foot of the body,
// just above the shell's footer. A broadcast is rendered once, so the map's
// links carry Resend's merge tag and each reader's address fills in at send time.
// The map leaves out the IGOS list itself (PendingPlan - The Letters Map and
// Welcome Back).

import { lettersMapHtml, MERGE_EMAIL } from '@/lib/letters-map'

const SITE_URL = 'https://www.infinitegameos.io'

function map() {
  return lettersMapHtml({ omit: 'infinite_game', email: MERGE_EMAIL, linkColor: '#22d3ee', textColor: '#94a3b8' })
}

export type Article = {
  slug: string
  title: string
  summary: string
  date: string
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function buildBroadcastBody(articles: Article[]): string {
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
    ${map()}
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
    ${map()}
  `
}

