import { describe, expect, it } from 'vitest'
import { LETTERS, MERGE_EMAIL, lettersMapHtml, type LetterKey } from './letters-map'

// The letters map holds the King-edited copy (PendingPlan - The Letters Map and
// Welcome Back, 2026-11-07), typed here once as the check against the module.
// The vault's articles-card-selftest.mjs holds its own copy to the same text.
// Mirror across the three sites. Keep byte-identical.
const CANON: [LetterKey, string, string, string][] = [
  ['personal', 'Personal notes', "life, inner thoughts and what I'm learning, sent when there's something worth sending.", 'https://www.lanebelone.com/personal/join'],
  ['sqhq', 'The Side Quest Letter', "the business side of things: what I'm building, what I'm testing and what's next, a couple of times a month.", 'https://www.sidequesthq.co/letter/join'],
  ['infinite_game', 'Infinite Game OS', 'the AI and agent practice from the inside, for people building with it, sent as each piece ships.', 'https://www.infinitegameos.io/updates/join'],
  ['articles', 'Articles', 'each long-form piece in full, the day it publishes.', 'https://www.lanebelone.com/articles/join'],
]
const colors = { linkColor: '#111', textColor: '#222' }

describe('the letters map', () => {
  it('holds the King-edited copy, in order', () => {
    expect(LETTERS.map((l) => [l.key, l.name, l.line, l.join])).toEqual(CANON)
  })
  it('promises no cadence in print', () => {
    expect(LETTERS.some((l) => /every other|friday/i.test(l.line))).toBe(false)
  })
  for (const [key, name] of CANON) {
    it(`the ${key} email leaves out its own list and carries the other three`, () => {
      const html = lettersMapHtml({ omit: key, email: 'a+b@x.co', ...colors })
      expect(html).not.toContain(`<strong>${name}</strong>`)
      for (const [k, n, line, join] of CANON) {
        if (k === key) continue
        expect(html).toContain(`<a href="${join}?email=a%2Bb%40x.co" style="color:#111"><strong>${n}</strong></a>: ${line}`)
      }
    })
  }
  it('a broadcast keeps the merge tag unencoded', () => {
    const html = lettersMapHtml({ omit: 'infinite_game', email: MERGE_EMAIL, ...colors })
    expect(html).toContain('personal/join?email={{{contact.email}}}')
  })
  it('carries its title, and nothing when every list is left out', () => {
    expect(lettersMapHtml({ omit: 'personal', email: 'a@x.co', ...colors })).toContain('The letters')
    expect(lettersMapHtml({ omit: CANON.map((c) => c[0]), email: 'a@x.co', ...colors })).toBe('')
  })
})
