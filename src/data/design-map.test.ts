import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { concepts } from '@/data/concepts'
import {
  AGENTIC_TITLE,
  CONCEPT_WORDS,
  MEASUREMENT_HOLD,
  STANDALONE,
  TOKENS_ONLY,
  splitAround,
  treatmentFor,
  updateLean,
} from '@/data/design-map'

describe('design map', () => {
  it('every mapped concept word is a substring of its title', () => {
    for (const c of concepts) {
      const w = CONCEPT_WORDS[c.slug]
      if (w) expect(c.title, c.slug).toContain(w)
    }
  })

  it('every concept slug is listed (a slug not in the map is reported here)', () => {
    const missing = concepts.filter(c => !(c.slug in CONCEPT_WORDS)).map(c => c.slug)
    expect(missing).toEqual([])
    const stale = Object.keys(CONCEPT_WORDS).filter(s => !concepts.some(c => c.slug === s))
    expect(stale).toEqual([])
  })

  it('splitAround keeps the text character for character', () => {
    for (const c of concepts) {
      const { before, hit, after } = splitAround(c.title, CONCEPT_WORDS[c.slug])
      expect(before + hit + after).toBe(c.title)
    }
    expect(splitAround('Plain', null)).toEqual({ before: 'Plain', hit: '', after: '' })
    expect(splitAround('Plain', 'absent')).toEqual({ before: 'Plain', hit: '', after: '' })
    // First occurrence only.
    expect(splitAround('Play the Play', 'Play')).toEqual({ before: '', hit: 'Play', after: ' the Play' })
  })

  it('held and utility routes map to none', () => {
    for (const slug of MEASUREMENT_HOLD) {
      expect(treatmentFor(`/updates/${slug}`, 'Anything with AI in it')).toMatchObject({ lean: null, word: null })
    }
    for (const p of TOKENS_ONLY) {
      expect(treatmentFor(p), p).toMatchObject({ lean: null, word: null })
    }
    expect(treatmentFor('/not-a-route')).toMatchObject({ lean: null, word: null })
  })

  it('ai-first-vs-ai-complemented carries a band and no word', () => {
    expect(treatmentFor('/concepts/ai-first-vs-ai-complemented')).toMatchObject({ lean: 'cosmic', word: null })
  })

  it('the standalone words match the ruled table', () => {
    expect(treatmentFor('/accord')).toEqual({ lean: 'cosmic', word: 'Accord', kind: 'sky' })
    expect(treatmentFor('/charter')).toEqual({ lean: 'agentic', word: 'Charter', kind: 'line' })
    expect(Object.keys(STANDALONE)).toHaveLength(9)
  })

  it('skills and bundles wear Install in the nebula line, protocols no word, updates never a word', () => {
    expect(treatmentFor('/skills/x')).toEqual({ lean: 'agentic', word: 'Install', kind: 'line' })
    expect(treatmentFor('/bundles/x')).toEqual({ lean: 'agentic', word: 'Install', kind: 'line' })
    expect(treatmentFor('/protocols/x')).toEqual({ lean: 'agentic', word: null, kind: 'line' })
    expect(treatmentFor('/updates/some-post', 'Using Claude Code well').word).toBeNull()
  })

  it('classifies update titles by lean', () => {
    expect(updateLean('How AI agents change a solo practice')).toBe('agentic')
    expect(updateLean('Build your website with Claude')).toBe('agentic')
    expect(updateLean('What is a practical alternative to follow your passion')).toBe('cosmic')
    expect(updateLean('The slow year of making one thing')).toBe('cosmic')
    // Whole words only: "said" and "email" carry no match.
    expect(AGENTIC_TITLE.test('Said and mailed')).toBe(false)
  })

  it('reads a business model as cosmic, not agentic', () => {
    expect(updateLean('What is a positive-sum business model?')).toBe('cosmic')
  })

  it('gives an update about a ruled page that page’s lean (ruling 3)', () => {
    expect(treatmentFor('/updates/what-is-the-benevolent-human-ai-accord', 'What is the Benevolent Human-AI Accord?').lean).toBe('cosmic')
    expect(treatmentFor('/updates/what-is-a-sovereign-ecosystem-for-creators', 'What is a sovereign ecosystem for creators?').lean).toBe('agentic')
    expect(treatmentFor('/updates/infinite-game-os-architecture', 'Infinite Game OS architecture').lean).toBe('agentic')
  })
})

describe('page wiring agrees with the map', () => {
  const src = (rel: string) => fs.readFileSync(path.join(process.cwd(), 'src', 'app', rel, 'page.tsx'), 'utf8')

  it('each standalone page mounts its leaned band and wraps its word', () => {
    for (const [route, { lean, word }] of Object.entries(STANDALONE)) {
      const text = src(route.slice(1))
      expect(text, route).toContain(`<InteriorArt lean="${lean}" />`)
      const kind = lean === 'agentic' ? ' kind="line"' : ''
      expect(text, route).toContain(`<SkyWord${kind}>${word}</SkyWord>`)
    }
  })

  it('tokens-only index and utility pages mount no band', () => {
    for (const route of TOKENS_ONLY) {
      if (route === '/') continue
      const file = path.join(process.cwd(), 'src', 'app', route.slice(1), 'page.tsx')
      expect(fs.readFileSync(file, 'utf8'), route).not.toContain('InteriorArt')
    }
  })
})
