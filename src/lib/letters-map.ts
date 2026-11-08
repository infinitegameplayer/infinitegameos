// The letters map (PendingPlan - The Letters Map and Welcome Back, King-edited
// copy, 2026-11-07). Every Kingdom list email carries one line per letter, so a
// reader sees how the lists differ and joins another with one click; each email
// leaves out its own list, since its readers are on it already. Each name opens
// that list's scanner-proof one-click join page (Email Codex Section 12).
//
// The text is canonical in the Email Codex and in the vault's articles-card.mjs
// (LETTERS). letters-map.test.ts holds this copy to it, and the vault selftest
// reads this file back from each site. Never "every other Friday" in print
// (King-ruled 2026-11-07). Mirror across the three sites. Keep byte-identical.

export type LetterKey = 'personal' | 'sqhq' | 'infinite_game' | 'articles'

export const LETTERS: { key: LetterKey; name: string; line: string; join: string }[] = [
  { key: 'personal', name: 'Personal notes', line: "life, inner thoughts and what I'm learning, sent when there's something worth sending.", join: 'https://www.lanebelone.com/personal/join' },
  { key: 'sqhq', name: 'The Side Quest Letter', line: "the business side of things: what I'm building, what I'm testing and what's next, a couple of times a month.", join: 'https://www.sidequesthq.co/letter/join' },
  { key: 'infinite_game', name: 'Infinite Game OS', line: 'the AI and agent practice from the inside, for people building with it, sent as each piece ships.', join: 'https://www.infinitegameos.io/updates/join' },
  { key: 'articles', name: 'Articles', line: 'each long-form piece in full, the day it publishes.', join: 'https://www.lanebelone.com/articles/join' },
]

export const LETTERS_MAP_TITLE = 'The letters'

// A broadcast is rendered once, so its links carry Resend's merge tag and each
// reader's address fills in at send time. A one-to-one email (a welcome) passes
// the reader's own address, which is encoded.
export const MERGE_EMAIL = '{{{contact.email}}}'

export function lettersMapHtml({
  omit,
  email,
  linkColor,
  textColor,
}: {
  omit: LetterKey | LetterKey[]
  email: string
  linkColor: string
  textColor: string
}): string {
  const left = ([] as LetterKey[]).concat(omit)
  const addr = email === MERGE_EMAIL ? email : encodeURIComponent(email)
  const lines = LETTERS.filter((l) => !left.includes(l.key)).map(
    (l) =>
      `<p style="margin:0 0 10px 0;font-size:14px;line-height:1.55;color:${textColor}"><a href="${l.join}?email=${addr}" style="color:${linkColor}"><strong>${l.name}</strong></a>: ${l.line}</p>`
  )
  if (!lines.length) return ''
  return `<p style="margin:28px 0 12px 0;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:${textColor}">${LETTERS_MAP_TITLE}</p>
${lines.join('\n')}`
}
