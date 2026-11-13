// Pure geometry for the interior circuits. No DOM, no React, so every number is
// testable. InteriorCircuit measures the page, hands plain numbers to a builder
// below and draws what comes back.
//
// All coordinates are local to the article: x from its left edge, y from its
// top. The circuit leaves the top band, runs down the right gutter and stops in
// a node at one third of the whole page. Cosmic circuits are curves with an
// orbit node; agentic circuits run the 24px lattice with 45 degree chamfers.

import { isClean, poly } from './circuit-geom'

const n1 = (v: number) => Math.round(v * 10) / 10
export const LATTICE = 24
export const DESK_FROM = 1360

export interface InteriorAnchors {
  /** Article width. */
  W: number
  /** Bottom of the fixed nav. */
  navB: number
  /** Right edge of the header section. */
  secR: number
  /** Bottom of the header's last block. */
  capB: number
  /** Where the node lands: one third of the whole page. */
  yE: number
  /** Headings of the first third whose right side is free: [centre y, free x]. */
  heads: ReadonlyArray<readonly [number, number]>
}

export interface InteriorDecor {
  paths: string[]
  rings: Array<[number, number, number]>
  pads: Array<[number, number]>
  vias: Array<[number, number]>
}

export interface InteriorRoute {
  d: string
  decor: InteriorDecor
  yE: number
  /** The points the path was built through. */
  pts: Array<[number, number]>
}

const snap = (v: number) => Math.ceil(v / LATTICE) * LATTICE
const snapN = (v: number) => Math.round(v / LATTICE) * LATTICE

/** A smooth curve through points (Catmull-Rom as cubic beziers). */
export function smooth(pts: ReadonlyArray<readonly [number, number]>): string {
  let d = 'M' + n1(pts[0][0]) + ' ' + n1(pts[0][1])
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += 'C' + n1(c1x) + ' ' + n1(c1y) + ' ' + n1(c2x) + ' ' + n1(c2y) + ' ' + n1(p2[0]) + ' ' + n1(p2[1])
  }
  return d
}

const empty = (): InteriorDecor => ({ paths: [], rings: [], pads: [], vias: [] })

function seal(r: InteriorRoute): InteriorRoute | null {
  const all = [r.d, ...r.decor.paths].join(' ')
  const nums = [...r.decor.rings.flat(), ...r.decor.pads.flat(), ...r.decor.vias.flat(), r.yE]
  if (!isClean(all) || !nums.every(Number.isFinite)) return null
  return r
}

/**
 * Cosmic desktop: curves only. Entry from the band at 62 percent, a crest over
 * the right margin, then a slow orbit down the right gutter. Short curved
 * branches reach toward a heading's side. Ends in a ringed node.
 */
export function cosDesk(a: InteriorAnchors): InteriorRoute | null {
  const { W, navB, secR, yE, heads } = a
  const xs = Math.round(W * 0.625)
  const xg = Math.round((secR + W) / 2)
  const amp = Math.min(30, (W - secR) / 2 - 24)
  const yT = navB + 22
  let pts: Array<[number, number]> = [
    [xs, yT],
    [xs + 190, yT - 12],
    [xg + amp, yT + 52],
  ]
  let sg = -1
  let y = yT + 52 + 150
  const bys = heads.map((h) => h[0])
  while (y < yE - 110) {
    if (!bys.some((b) => Math.abs(y - b) < 95)) {
      pts.push([xg + sg * amp, y])
      sg = -sg
    }
    y += 150
  }
  bys.forEach((b) => pts.push([xg, b]))
  pts.push([xg, yE])
  const head = pts.slice(0, 3)
  const rest = pts.slice(3).sort((p, q) => p[1] - q[1])
  pts = head.concat(rest)

  const decor = empty()
  decor.paths.push(
    `M${W + 10} ${yT + 170}C${secR + 90} ${yT + 190} ${secR + 80} ${yT + 300} ${W + 10} ${yT + 330}`,
    `M${xs - 24} ${yT + 6}C${xs + 100} ${yT - 14} ${xs + 160} ${yT - 14} ${xs + 200} ${yT - 6}`,
  )
  const yD = yE - 300
  if (!bys.some((b) => Math.abs(b - yD) < 120 || Math.abs(b - yD - 110) < 120)) {
    decor.paths.push(`M${W + 10} ${yD}C${secR + 100} ${yD + 20} ${secR + 100} ${yD + 100} ${W + 10} ${yD + 120}`)
  }
  heads.forEach(([cy, free]) => {
    const xh = Math.round(free + 70)
    const yb = Math.round(cy)
    decor.paths.push(`M${xg} ${yb}C${xg - 60} ${yb - 16} ${xh + 90} ${yb + 14} ${xh} ${yb}`)
    decor.rings.push([xh - 5, yb, 5])
    decor.pads.push([xh - 5, yb], [xg, yb])
  })
  decor.rings.push([xg, yE, 13])
  decor.pads.push([xg + 13, yE])
  decor.vias.push([xg, yE], [xs, yT])
  return seal({ d: smooth(pts), decor, yE, pts })
}

/** Cosmic phone: arcs across the band, then a long slow curve down the right edge. */
export function cosPhone(a: InteriorAnchors): InteriorRoute | null {
  const { W, navB, yE } = a
  const xg = W - 10
  const yb = navB + 8
  const amp = 2
  const pts: Array<[number, number]> = [
    [-10, yb + 44],
    [120, yb + 16],
    [W - 70, yb + 14],
    [xg + amp, yb + 70],
  ]
  for (let y = yb + 70 + 220, sg = -1; y < yE - 160; y += 220, sg = -sg) pts.push([xg + sg * amp, y])
  pts.push([xg, yE])
  const decor = empty()
  decor.paths.push(`M-10 ${yb + 30}C70 ${yb + 2} 220 ${yb - 6} ${W - 110} ${yb + 4}`)
  decor.rings.push([xg, yE, 6])
  decor.vias.push([xg, yE])
  return seal({ d: smooth(pts), decor, yE, pts })
}

/**
 * Agentic desktop: the 24px lattice with 45 degree chamfers and vias. Down the
 * right gutter with up to two dog-legs. Branches run toward a heading's side on
 * the lattice and end in a via.
 */
export function agDesk(a: InteriorAnchors): InteriorRoute | null {
  const { W, navB, secR, heads } = a
  const x0 = snap(W * 0.625)
  const xa = snapN((secR + W) / 2 - LATTICE)
  const xb = xa + 2 * LATTICE
  const y0 = snap(navB + 4)
  const yE = snapN(a.yE)
  const bys = heads.map((h) => snapN(h[0]))
  const jogs: number[] = []
  ;[y0 + 288, y0 + 288 + 528].forEach((j) => {
    let y = snapN(j)
    while (bys.some((b) => Math.abs(b - y) < 96)) y += LATTICE
    if (y < yE - 120) jogs.push(y)
  })
  const P: Array<[number, number]> = [
    [x0, y0],
    [xa, y0],
  ]
  let cx = xa
  jogs.forEach((y) => {
    const nx = cx === xa ? xb : xa
    P.push([cx, y], [nx, y])
    cx = nx
  })
  P.push([cx, yE])
  const xAt = (y: number) => {
    let x = xa
    jogs.forEach((j) => {
      if (y > j) x = x === xa ? xb : xa
    })
    return x
  }
  const decor = empty()
  decor.paths.push(
    `M${W + 10} ${y0 + 96}H${xa + 72}L${xa + 48} ${y0 + 120}`,
    `M${W + 10} ${y0 + 144}H${xa + 96}L${xa + 72} ${y0 + 168}`,
  )
  decor.vias.push([xa + 48, y0 + 120])
  decor.pads.push([W - 30, y0 + 96])
  heads.forEach(([, free], i) => {
    const yb = bys[i]
    const xs = xAt(yb)
    const xh = snap(free + 70)
    decor.paths.push(`M${xs} ${yb}H${xh + LATTICE}L${xh} ${yb + LATTICE}`)
    decor.vias.push([xh, yb + LATTICE], [xs, yb])
  })
  jogs.forEach((y) => decor.vias.push([xAt(y), y], [xAt(y + 1), y]))
  const last = P[P.length - 1]
  decor.vias.push([last[0], last[1]], [xa, y0])
  decor.paths.push(`M${last[0] - LATTICE} ${last[1]}H${last[0] + LATTICE}`)
  return seal({ d: poly(P, 'c', LATTICE), decor, yE, pts: P })
}

/** Agentic phone: across the band, then down the right edge gutter on the lattice. */
export function agPhone(a: InteriorAnchors): InteriorRoute | null {
  const { W, navB } = a
  const xg = Math.min(snap(W - 12), W - 6)
  const y0 = snap(navB + 4)
  const yE = snapN(a.yE)
  const P: Array<[number, number]> = [
    [-12, y0],
    [xg, y0],
    [xg, yE],
  ]
  const decor = empty()
  decor.paths.push(`M-12 ${y0 + LATTICE}H48L72 ${y0 + 2 * LATTICE}H120`)
  decor.vias.push([120, y0 + 2 * LATTICE], [xg, yE], [18, y0])
  return seal({ d: poly(P, 'c', LATTICE), decor, yE, pts: P })
}

export function buildInteriorRoute(lean: 'cosmic' | 'agentic', a: InteriorAnchors): InteriorRoute | null {
  const desk = a.W >= DESK_FROM
  if (lean === 'cosmic') return desk ? cosDesk(a) : cosPhone(a)
  return desk ? agDesk(a) : agPhone(a)
}

/**
 * Which headings of the first third get a branch. Input rows are
 * [centre y, free x, inGrid]. Takes at most two, each at least 260px below the
 * capsule and 170px above the node, and 260px apart.
 */
export function pickHeadings(
  rows: ReadonlyArray<readonly [number, number, boolean]>,
  capB: number,
  H3: number,
): Array<[number, number]> {
  const out: Array<[number, number]> = []
  for (const [c, r, inGrid] of rows) {
    if (inGrid) continue
    if (c < capB + 260 || c > H3 - 170) continue
    if (out.length && c - out[out.length - 1][0] < 260) continue
    out.push([c, r])
    if (out.length === 2) break
  }
  return out
}

// ---------------------------------------------------------------------------
// The light: the reading-line map
// ---------------------------------------------------------------------------

export interface ReadingModel {
  /** Path length where the light's head sits for a reading line at local y. */
  sFor(readY: number): number
  y0: number
  yE: number
}

/**
 * K grows with the path's downward travel (and a little with sideways travel),
 * so the head sits near the reading line while the path runs down and takes a
 * short scroll for each detour. 0 until the line reaches the circuit's start,
 * the full length when it reaches the node.
 */
export function buildReadingModel(X: ArrayLike<number>, Y: ArrayLike<number>, step: number, L: number): ReadingModel {
  const n = X.length - 1
  const ks = new Float64Array(n + 1)
  const ss = new Float64Array(n + 1)
  for (let i = 1; i <= n; i++) {
    const ds = i === n ? Math.max(0, L - (n - 1) * step) : step
    const dy = Y[i] - Y[i - 1]
    ks[i] = ks[i - 1] + Math.max(dy, 0.15 * ds)
    ss[i] = Math.min(L, i * step)
  }
  const y0 = Y[0]
  const yE = Y[n]
  return {
    y0,
    yE,
    sFor(readY) {
      const span = yE - y0
      const u = span > 0 ? Math.max(0, Math.min(1, (readY - y0) / span)) : 0
      const K = u * ks[n]
      let a = 0
      let b = n
      while (b - a > 1) {
        const c = (a + b) >> 1
        if (ks[c] <= K) a = c
        else b = c
      }
      const w = ks[b] - ks[a] || 1
      return ss[a] + ((ss[b] - ss[a]) * (K - ks[a])) / w
    },
  }
}
