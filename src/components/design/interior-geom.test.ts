import { describe, it, expect } from 'vitest'
import { isClean } from './circuit-geom'
import { buildInteriorRoute, buildReadingModel, pickHeadings, type InteriorAnchors } from './interior-geom'

const base = (W: number, yE: number): InteriorAnchors => ({
  W,
  navB: 64,
  secR: Math.min(W - 0, (W + 1100) / 2),
  capB: 440,
  yE,
  heads: W >= 1360 ? [[900, 800], [1250, 800]] : [],
})

describe('interior routes', () => {
  for (const lean of ['cosmic', 'agentic'] as const) {
    for (const W of [320, 390, 768, 1024, 1280, 1359, 1360, 1440, 1920, 2560]) {
      it(`${lean} at ${W} is clean, ends at the node and descends`, () => {
        const yE = 1700
        const r = buildInteriorRoute(lean, base(W, yE))
        expect(r).not.toBeNull()
        expect(isClean(r!.d)).toBe(true)
        expect(r!.decor.paths.every(isClean)).toBe(true)
        const ys = r!.pts.map((p) => p[1])
        expect(Math.max(...ys)).toBe(r!.yE)
        // The node sits at (or, on the lattice, within one cell of) the third.
        expect(Math.abs(r!.yE - yE)).toBeLessThanOrEqual(24)
        // After the lead-in across the band (the first four points) it only descends.
        for (let i = 4; i < ys.length; i++) expect(ys[i]).toBeGreaterThanOrEqual(ys[i - 1])
      })
    }
  }

  it('refuses a route with NaN', () => {
    expect(buildInteriorRoute('cosmic', { ...base(1440, NaN) })).toBeNull()
    expect(buildInteriorRoute('agentic', { ...base(1440, NaN) })).toBeNull()
  })

  it('picks at most two headings, spaced and inside the first third', () => {
    const rows: Array<[number, number, boolean]> = [
      [500, 900, false],
      [700, 900, false],
      [900, 900, true],
      [1000, 900, false],
      [1300, 900, false],
      [1560, 900, false],
    ]
    const got = pickHeadings(rows, 440, 1700)
    expect(got.length).toBeGreaterThan(0)
    expect(got.length).toBeLessThanOrEqual(2)
    expect(got.every(([c]) => c >= 700 && c <= 1530)).toBe(true)
    if (got.length === 2) expect(got[1][0] - got[0][0]).toBeGreaterThanOrEqual(260)
  })
})

describe('reading model', () => {
  const n = 100
  const X = new Float64Array(n + 1)
  const Y = new Float64Array(n + 1)
  for (let i = 0; i <= n; i++) {
    X[i] = 10
    Y[i] = 100 + i * 6
  }
  const m = buildReadingModel(X, Y, 6, 600)

  it('is 0 above the start and the full length at the node', () => {
    expect(m.sFor(0)).toBe(0)
    expect(m.sFor(m.y0)).toBe(0)
    expect(m.sFor(m.yE + 500)).toBeCloseTo(600, 3)
  })

  it('rises monotonically with the reading line', () => {
    let prev = -1
    for (let y = 0; y <= 800; y += 20) {
      const s = m.sFor(y)
      expect(s).toBeGreaterThanOrEqual(prev)
      prev = s
    }
  })
})
