// The two IGOS welcomes for the updates list: the first welcome and "Welcome
// back" for a reader who rejoins after leaving it (PendingPlan - The Letters Map
// and Welcome Back). Both carry the letters map without the IGOS list itself,
// just above the undo line. The subscribe route picks between them.

import { renderEmailShell } from '@/lib/email-shell'
import { lettersMapHtml } from '@/lib/letters-map'

const SITE_URL = 'https://www.infinitegameos.io'
const LINK = '#22d3ee'
const MUTED = '#94a3b8'

export const WELCOME_SUBJECT = 'Welcome to Infinite Game OS updates'
export const WELCOME_PREVIEW = 'Dispatches from the practice will arrive as the OS evolves.'

export const LIST_WELCOME_BACK_SUBJECT = 'Welcome back'
export const LIST_WELCOME_BACK_PREVIEW = 'The door swings both ways.'

// A visitor's name is set into the welcome email's HTML, so it is cleaned
// first: letters, marks, spaces, hyphens and apostrophes only, at most 40
// characters. Tags, links and domains cannot ride a name into a real email
// from this address (Site Defensibility Read 2026-10-25). Built at runtime
// because the ES2017 target rejects a Unicode property escape in a literal.
const NAME_STRIP = new RegExp("[^\\p{L}\\p{M}\\s'\\u2019-]", 'gu')

export function cleanName(raw?: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined
  const name = raw.normalize('NFC').replace(NAME_STRIP, '').replace(/\s+/g, ' ').trim().slice(0, 40).trim()
  return name.length > 0 ? name : undefined
}

function map(email: string) {
  return lettersMapHtml({ omit: 'infinite_game', email, linkColor: LINK, textColor: MUTED })
}

// The undo line (King-ruled 2026-11-07): a join can start from one click on
// an email link, so the welcome carries a one-click way back. Its page
// (/updates/leave) acts under the same checks as the join page.
function undoLine(leaveUrl: string) {
  return `<p style="margin-top:2rem;font-size:13px;color:${MUTED}">Not you? <a href="${leaveUrl}" style="color:${MUTED}">One click to undo.</a></p>`
}

export function buildWelcomeHtml(opts: {
  unsubscribeUrl: string
  preferencesUrl: string
  leaveUrl: string
  email: string
  firstName?: string
}) {
  const name = cleanName(opts.firstName)
  const greeting = name ? `Hey ${name},` : 'Hey there,'
  const body = `
    <p>${greeting}</p>
    <p>You signed up for Infinite Game OS updates. The real ones, from inside the practice. New skills as they ship. Concepts as they cohere. Playbooks as they prove out.</p>
    <p>Each one is a real release or a real lesson, sent when there is one.</p>
    <p>If a piece is useful, forward it. The unsubscribe link sits on every send.</p>
    <p>The Updates page lives here:<br><a href="${SITE_URL}/updates" style="color:${LINK};text-decoration:none">${SITE_URL}/updates</a></p>
    <p style="margin-top:2rem">With Joyful Sovereignty,</p>
    <p style="margin-top:0">Lane</p>
    ${map(opts.email)}
    ${undoLine(opts.leaveUrl)}
  `
  return renderEmailShell({
    body,
    unsubscribeUrl: opts.unsubscribeUrl,
    preferencesUrl: opts.preferencesUrl,
    preview: WELCOME_PREVIEW,
  })
}

// Sent instead of the first welcome when a reader rejoins the list after
// leaving it (src/lib/list-return.ts reads the earlier leave). Distinct from the
// route's "Want back in?" email, which stays the door for a reader who left
// every list.
export function buildListWelcomeBackHtml(opts: {
  unsubscribeUrl: string
  preferencesUrl: string
  leaveUrl: string
  email: string
  firstName?: string
}) {
  const name = cleanName(opts.firstName)
  const greeting = name ? `Hey ${name},` : 'Hey there,'
  const body = `
    <p>${greeting}</p>
    <p>You're back on the Infinite Game OS updates. The door swings both ways, and you just proved it.</p>
    <p>Nothing to set up. The next one lands when it ships, and everything you missed is here: <a href="${SITE_URL}/updates" style="color:${LINK};text-decoration:none">infinitegameos.io/updates</a></p>
    <p style="margin-top:2rem">With Joyful Sovereignty,</p>
    <p style="margin-top:0">Lane</p>
    ${map(opts.email)}
    ${undoLine(opts.leaveUrl)}
  `
  return renderEmailShell({
    body,
    unsubscribeUrl: opts.unsubscribeUrl,
    preferencesUrl: opts.preferencesUrl,
    preview: LIST_WELCOME_BACK_PREVIEW,
  })
}
