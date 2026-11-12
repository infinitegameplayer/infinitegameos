import { describe, expect, it } from 'vitest'
import {
  buildDeskRoute,
  buildLightModel,
  buildPhoneRoute,
  flattenPath,
  isClean,
  poly,
  type DeskAnchors,
  type PhoneAnchors,
} from './circuit-geom'

// Anchors for a page laid out the way the homepage lays out at a given width:
// a 1036 px column centred in the document, the hero as tall as the screen
// (at least 820), then the sections in order.
function deskAnchors(W: number, vh = 900): DeskAnchors {
  const cl = (W - 1036) / 2
  const heroB = Math.max(vh, 820)
  const cardT = heroB + 96
  const cardB = cardT + 190
  const cw = (1036 - 32) / 3
  const cards = [0, 1, 2].map((i) => ({
    l: cl + i * (cw + 16),
    r: cl + i * (cw + 16) + cw,
    t: cardT,
    b: cardB,
  }))
  const orientT = cardB + 32
  const thinkT = orientT + 560
  const thinkHeadB = thinkT + 100
  const thinkHeadT = thinkT + 16
  const thinkGridB = thinkHeadB + 40 + 440
  const doingT = thinkGridB + 112
  const charterB = doingT + 360
  const installT = charterB + 48
  const chipB = installT + 142
  const doingB = installT + 1500
  const horizonT = doingB + 360
  const horizonB = horizonT + 560
  return {
    W,
    hero: { l: 0, t: 0, r: W, b: heroB },
    col: { l: cl, r: cl + 1036 },
    cards,
    orientT,
    thinkHeadT,
    thinkLinkL: cl + 1036 - 150,
    thinkHeadB,
    thinkGridB,
    charterB,
    installT,
    chip: { r: cl + 760 + 192, b: chipB },
    doingT,
    doingB,
    horizonT,
    horizonB,
    footerT: horizonB + 1100,
  }
}

describe('poly', () => {
  const pts = [[0, 0], [100, 0], [100, 100]] as const
  it('chamfers a corner with two straight cuts', () => {
    expect(poly(pts, 'c', 24)).toBe('M0 0L76 0L100 24L100 100')
  })
  it('rounds a corner with a quadratic', () => {
    expect(poly(pts, 'r', 24)).toBe('M0 0L76 0Q100 0 100 24L100 100')
  })
  it('keeps a sharp corner sharp', () => {
    expect(poly(pts, 's', 24)).toBe('M0 0L100 0L100 100')
  })
  it('lets a point carry its own kind and size', () => {
    expect(poly([[0, 0], [100, 0, 'r', 10], [100, 100]], 'c', 24)).toContain('Q100 0 100 10')
  })
  it('appends with a line-to when noM is set', () => {
    expect(poly(pts, 'c', 24, true).startsWith('L0 0')).toBe(true)
  })
  it('shrinks a cut to fit a short segment (the end segments give a corner their full length)', () => {
    expect(poly([[0, 0], [10, 0], [10, 100], [20, 100]], 'c', 24)).toBe('M0 0L0 0L10 10L10 90L20 100L20 100')
  })
})

describe('desktop route', () => {
  const widths = [1280, 1440, 1920, 2400, 2470, 2480, 2560, 3440, 3840]

  it.each(widths)('holds no NaN at %i px wide', (W) => {
    const r = buildDeskRoute(deskAnchors(W))
    expect(r).not.toBeNull()
    expect(isClean(r!.d)).toBe(true)
    expect(r!.d).not.toMatch(/NaN|Infinity/)
    for (const p of r!.decor.paths) expect(isClean(p)).toBe(true)
    expect(isClean(r!.decor.orbit!.sky + r!.decor.orbit!.lit)).toBe(true)
  })

  it('the preview formula went negative at 2480 and the clamp does not', () => {
    const W = 2560
    const a = deskAnchors(W)
    const xR = (a.col.r + W) / 2
    const preview = Math.sqrt(360 * 360 - (xR - a.col.r) * (xR - a.col.r))
    expect(Number.isNaN(preview)).toBe(true)
    expect(buildDeskRoute(a)).not.toBeNull()
  })

  it('refuses a forced NaN or Infinity input', () => {
    const a = deskAnchors(1440)
    expect(buildDeskRoute({ ...a, footerT: NaN })).toBeNull()
    expect(buildDeskRoute({ ...a, hero: { ...a.hero, b: Infinity } })).toBeNull()
    expect(buildDeskRoute({ ...a, cards: [{ ...a.cards[0], l: NaN }] })).toBeNull()
    expect(buildDeskRoute({ ...a, chip: { r: 5, b: NaN } })).toBeNull()
  })

  it('draws no fan when the reframes are absent', () => {
    const a = deskAnchors(1440)
    const r = buildDeskRoute({ ...a, cards: [] })
    expect(r).not.toBeNull()
    expect(isClean(r!.d)).toBe(true)
    const withCards = buildDeskRoute(a)!
    expect(r!.decor.paths.length).toBeLessThan(withCards.decor.paths.length)
  })

  it.each(widths)('has no square V/H corner in any decor path at %i px', (W) => {
    const r = buildDeskRoute(deskAnchors(W))!
    for (const p of r.decor.paths) {
      expect(p).not.toMatch(/V[^A-Za-z]*H/)
      expect(p).not.toMatch(/H[^A-Za-z]*V/)
    }
    // The two paths under the concept grid are chamfered, not square.
    const pad = r.decor.paths.filter((p) => /^M[\d. -]+L[\d. -]+L[\d. -]+L[\d. -]+$/.test(p) && p.split('L').length === 4)
    expect(pad.length).toBeGreaterThanOrEqual(2)
  })

  it('every corner in the main route is a chamfer or a round', () => {
    const r = buildDeskRoute(deskAnchors(1440))!
    // A chamfer is two L's in a row at 45 degrees. Walk the straight pieces and
    // check no two orthogonal segments meet at a vertex.
    const s = flattenPath(r.d, 1)
    let sharp = 0
    for (let i = 2; i < s.X.length; i++) {
      const ax = s.X[i - 1] - s.X[i - 2]
      const ay = s.Y[i - 1] - s.Y[i - 2]
      const bx = s.X[i] - s.X[i - 1]
      const by = s.Y[i] - s.Y[i - 1]
      const dot = ax * bx + ay * by
      const m = Math.hypot(ax, ay) * Math.hypot(bx, by)
      if (m > 0 && dot / m < 0.2) sharp++
    }
    expect(sharp).toBe(0)
  })

  it('starts at the hero via and ends at the footer top', () => {
    const a = deskAnchors(1440)
    const r = buildDeskRoute(a)!
    const s = flattenPath(r.d, 6)
    expect(s.X[0]).toBeCloseTo(216, 0)
    expect(s.Y[0]).toBeCloseTo(672, 0)
    expect(s.Y[s.Y.length - 1]).toBeCloseTo(a.footerT - 1.5, 0)
  })
})

describe('phone route', () => {
  const base: PhoneAnchors = {
    W: 390,
    heroB: 844,
    orientB: 1500,
    thinkB: 2600,
    doingB: 5200,
    horizonT: 5900,
    horizonB: 6600,
    dispatchesB: 7600,
    letterB: 8100,
    footerT: 8800,
  }
  it('runs clean', () => {
    const r = buildPhoneRoute(base)
    expect(r).not.toBeNull()
    expect(isClean(r!.d)).toBe(true)
    expect(r!.decor.vias).toHaveLength(1)
  })
  it('skips the dispatches crossing when there are none', () => {
    const a = buildPhoneRoute(base)!
    const b = buildPhoneRoute({ ...base, dispatchesB: null })!
    expect(b.d.length).toBeLessThan(a.d.length)
    expect(isClean(b.d)).toBe(true)
  })
  it('refuses NaN', () => {
    expect(buildPhoneRoute({ ...base, W: NaN })).toBeNull()
  })
})

describe('light model', () => {
  it('picks a weight when the head can stay on screen', () => {
    const a = deskAnchors(1440, 900)
    const r = buildDeskRoute(a)!
    const s = flattenPath(r.d, 6)
    const docH = a.footerT + 600
    const m = buildLightModel(s, 900, docH)
    expect(m.mode).toBe('weight')
    // The head stays inside the viewport at every scroll position.
    for (let sc = 0; sc <= m.range; sc += 40) {
      const i = Math.round(m.sForScroll(sc) / s.step)
      const y = s.Y[Math.min(i, s.Y.length - 1)] - sc
      expect(y).toBeGreaterThanOrEqual(0)
      expect(y).toBeLessThanOrEqual(900)
    }
  })

  it('falls back to the reading line on a short viewport (1440 by 600)', () => {
    const a = deskAnchors(1440, 600)
    const r = buildDeskRoute(a)!
    const s = flattenPath(r.d, 6)
    const m = buildLightModel(s, 600, a.footerT + 600)
    expect(m.mode).toBe('reading')
    // Scrolled partway, the head sits near 45 percent down the screen.
    const sc = a.thinkHeadB - 0.45 * 600
    const i = Math.round(m.sForScroll(sc) / s.step)
    const y = s.Y[i] - sc
    expect(y).toBeGreaterThan(0)
    expect(y).toBeLessThan(600)
  })

  it('moves forward as the scroll grows, in both modes', () => {
    for (const vh of [900, 600]) {
      const a = deskAnchors(1440, vh)
      const s = flattenPath(buildDeskRoute(a)!.d, 6)
      const m = buildLightModel(s, vh, a.footerT + 600)
      let prev = -1
      for (let sc = 0; sc <= m.range; sc += 120) {
        const v = m.sForScroll(sc)
        expect(v).toBeGreaterThanOrEqual(prev - 1e-6)
        prev = v
      }
    }
  })
})
