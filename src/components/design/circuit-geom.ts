// Pure geometry for the homepage circuit. No DOM, no React, so every number here
// is testable. HomeCircuit measures the page, hands plain numbers to a builder
// below and draws what comes back.
//
// Corners: every right-angle turn is chamfered ('c') or rounded ('r'). The sharp
// kind ('s') exists for the port of the preview's helper and the builders never
// use it.

export type Kind = 'c' | 'r' | 's'
export type Pt =
  | readonly [number, number]
  | readonly [number, number, Kind]
  | readonly [number, number, Kind, number]

const n1 = (v: number) => Math.round(v * 10) / 10

/**
 * An orthogonal polyline with chamfered, rounded or sharp corners. A point may
 * carry its own kind and size as its third and fourth entries. `noM` starts the
 * string with a line-to so it can be appended to a path already under way.
 */
export function poly(points: readonly Pt[], kind: Kind, size: number, noM = false): string {
  const kept: Pt[] = [points[0]]
  for (let i = 1; i < points.length; i++) {
    const q = kept[kept.length - 1]
    if (Math.hypot(points[i][0] - q[0], points[i][1] - q[1]) > 0.5) kept.push(points[i])
  }
  const pts = kept
  let d = (noM ? 'L' : 'M') + n1(pts[0][0]) + ' ' + n1(pts[0][1])
  for (let j = 1; j < pts.length - 1; j++) {
    const a = pts[j - 1]
    const b = pts[j]
    const c = pts[j + 1]
    const k: Kind = (b[2] as Kind | undefined) ?? kind
    let s = (b[3] as number | undefined) ?? size
    const l1 = Math.hypot(b[0] - a[0], b[1] - a[1])
    const l2 = Math.hypot(c[0] - b[0], c[1] - b[1])
    s = Math.min(s, l1 * (j === 1 ? 1 : 0.5), l2 * (j === pts.length - 2 ? 1 : 0.5))
    const ux = (b[0] - a[0]) / l1
    const uy = (b[1] - a[1]) / l1
    const vx = (c[0] - b[0]) / l2
    const vy = (c[1] - b[1]) / l2
    const p1 = [b[0] - ux * s, b[1] - uy * s]
    const p2 = [b[0] + vx * s, b[1] + vy * s]
    if (k === 's') d += 'L' + n1(b[0]) + ' ' + n1(b[1])
    else if (k === 'r')
      d += 'L' + n1(p1[0]) + ' ' + n1(p1[1]) + 'Q' + n1(b[0]) + ' ' + n1(b[1]) + ' ' + n1(p2[0]) + ' ' + n1(p2[1])
    else d += 'L' + n1(p1[0]) + ' ' + n1(p1[1]) + 'L' + n1(p2[0]) + ' ' + n1(p2[1])
  }
  const last = pts[pts.length - 1]
  return d + 'L' + n1(last[0]) + ' ' + n1(last[1])
}

/** True when a string carries no NaN and no Infinity. */
export function isClean(s: string): boolean {
  return !/NaN|Infinity/.test(s)
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

export interface Box {
  l: number
  t: number
  r: number
  b: number
}

export interface Decor {
  /** Ink paths drawn at trace weight. */
  paths: string[]
  /** Via centres drawn on the route and its decor. */
  vias: Array<[number, number]>
  /** The desktop orbit set around the main arc, or null. */
  orbit: {
    sky: string
    lit: string
    pattern: { x: number; y: number; w: number; h: number }
    litGrad: { y1: number; y2: number }
  } | null
}

export interface Route {
  d: string
  decor: Decor
  /** Vertical stretches (y, y) where the route takes the cosmic nebula colours. */
  ranges: Array<[number, number]>
}

export interface DeskAnchors {
  /** The document's client width. */
  W: number
  hero: Box
  /** The content column the sections share (the thinking grid). */
  col: { l: number; r: number }
  /** The reframe cards. Empty when the section is absent. */
  cards: Box[]
  orientT: number
  /** Top of the thinking head and the left edge of its Browse link. */
  thinkHeadT: number
  thinkLinkL: number
  thinkHeadB: number
  thinkGridB: number
  charterB: number
  installT: number
  chip: { r: number; b: number }
  doingT: number
  doingB: number
  horizonT: number
  horizonB: number
  footerT: number
}

export interface PhoneAnchors {
  W: number
  heroB: number
  orientB: number
  thinkB: number
  doingB: number
  horizonT: number
  horizonB: number
  /** Null when there are no dispatches: that crossing is skipped. */
  dispatchesB: number | null
  letterB: number
  footerT: number
}

const RR = 360
const finiteAll = (...v: number[]) => v.every((x) => Number.isFinite(x))

/** A refused route: a non-finite number anywhere, or NaN/Infinity in any path. */
function sealed(route: Route): Route | null {
  if (!isClean(route.d)) return null
  for (const p of route.decor.paths) if (!isClean(p)) return null
  const o = route.decor.orbit
  if (o && !(isClean(o.sky) && isClean(o.lit))) return null
  for (const [x, y] of route.decor.vias) if (!finiteAll(x, y)) return null
  for (const [a, b] of route.ranges) if (!finiteAll(a, b)) return null
  return route
}

/**
 * The desktop route (1280 and wider). Returns null when any anchor is not a
 * finite number or when a path would carry NaN or Infinity.
 */
export function buildDeskRoute(a: DeskAnchors): Route | null {
  const nums = [
    a.W, a.hero.l, a.hero.t, a.hero.r, a.hero.b, a.col.l, a.col.r, a.orientT, a.thinkHeadT, a.thinkLinkL, a.thinkHeadB,
    a.thinkGridB, a.charterB, a.installT, a.chip.r, a.chip.b, a.doingT, a.doingB, a.horizonT,
    a.horizonB, a.footerT,
  ]
  for (const c of a.cards) nums.push(c.l, c.t, c.r, c.b)
  if (!finiteAll(...nums)) return null

  const xL = a.col.l - 48
  const xR = (a.col.r + a.W) / 2
  const y0 = a.hero.b
  const yM = y0 - 24
  const sx = a.hero.l + 216
  const sy = a.hero.t + 672
  const yA = Math.max(y0 - 126, sy + 24)

  // The orbit clamps to the margin: the arc only has to clear the cards while it
  // is within reach of them, and once the right margin is wider than the radius
  // it is not (the preview took a square root of a negative number here).
  const dx = Math.min(Math.abs(xR - a.col.r), RR)
  const cbm = a.cards.length > 0 ? Math.max(...a.cards.map((c) => c.b)) : y0
  let cy = Math.max(a.orientT + 330, cbm + 22 + Math.sqrt(RR * RR - dx * dx))
  // Room above the arc for the vertical that feeds it.
  cy = Math.max(cy, yM + 24 + 60 + Math.sqrt(RR * RR - 3600))
  const ye = cy - Math.sqrt(RR * RR - 3600)
  const yg = a.thinkHeadB + 20
  const yP = a.thinkGridB + 28
  const yG = (a.charterB + a.installT) / 2
  const cB = a.chip.b + 24
  const cRr = a.chip.r + 24
  const hT = a.horizonT + 0.75
  const hB = a.horizonB - 0.75
  const fT = a.footerT - 1.5
  const xH = xL

  // The leaving diagonal always runs downward. It jogs sideways first when the
  // left margin is wider than the room the hero leaves.
  const off = Math.max(0, Math.min(Math.abs(xL - sx), yM - yA - 24))
  const dir = xL >= sx ? 1 : -1
  let d = poly(
    [[sx, sy], [sx, yA], [sx + dir * off, yA + off], [xL, yA + off], [xL, yM], [xR, yM], [xR, ye - 60]],
    'c',
    24,
  )
  d += 'A60 60 0 0 1 ' + n1(xR - 60) + ' ' + n1(ye) + 'A360 360 0 0 0 ' + n1(xR - 360) + ' ' + n1(cy)
  // The vertical under the arc must not run through the head's Browse link: on
  // a wide screen it would. It jogs left above the head to clear the link.
  const xv = xR - 360
  const clash = xv >= a.thinkLinkL - 12 && xv <= a.col.r + 12
  const xv2 = clash ? a.thinkLinkL - 40 : xv
  const yJ = a.thinkHeadT - 30
  d += poly(
    [
      [xv, cy],
      ...(clash ? ([[xv, yJ, 'r', 30], [xv2, yJ, 'r', 30]] as const) : []),
      [xv2, yg, 'r', 40],
      [xR, yg, 'r', 40],
      [xR, yP, 'r', 32],
      [xL, yP, 'c', 24],
      [xL, yG, 'c', 24],
      [cRr, yG, 'c', 24],
      [cRr, cB, 'c', 24],
      [xR, cB, 'c', 24],
      [xR, hT, 'r', 34],
      [xH, hT, 'r', 34],
      [xH, hB, 'r', 34],
      [xR, hB, 'r', 34],
      [xR, fT, 'c', 24],
      [xL, fT],
    ],
    'c',
    24,
    true,
  )

  const paths: string[] = []
  const vias: Array<[number, number]> = []

  // The fan: one branch per card, ending at the card's own lead via. Skipped
  // unless every card shares one top (a wrapped row has no single fan).
  const c0 = a.cards[0]
  if (c0 && a.cards.every((c) => Math.abs(c.t - c0.t) < 2)) {
    paths.push('M' + n1(xL) + ' ' + n1(yM) + 'L' + n1(xL) + ' ' + n1(c0.t - 48))
    a.cards.forEach((c, i) => {
      const k = i + 1
      const vx = c.l + 24
      const vy = c.t - 24
      paths.push(
        'M' + n1(xL) + ' ' + n1(vy - 24 * k) + 'L' + n1(vx - 24 * k) + ' ' + n1(vy - 24 * k) + 'L' + n1(vx) + ' ' + n1(vy),
      )
    })
  }

  // The orbit set around the main arc: the sky at 6 px and the inner lit arc.
  const pt = (r: number, deg: number): [number, number] => [
    xR + r * Math.cos((deg * Math.PI) / 180),
    cy + r * Math.sin((deg * Math.PI) / 180),
  ]
  const p1 = pt(290, 215)
  const p2 = pt(290, 145)
  const q1 = pt(220, 215)
  const q2 = pt(220, 145)
  const orbit = {
    sky: 'M' + n1(p1[0]) + ' ' + n1(p1[1]) + 'A290 290 0 0 0 ' + n1(p2[0]) + ' ' + n1(p2[1]),
    lit: 'M' + n1(q1[0]) + ' ' + n1(q1[1]) + 'A220 220 0 0 0 ' + n1(q2[0]) + ' ' + n1(q2[1]),
    pattern: { x: n1(xR - 776), y: n1(cy - 243), w: 900, h: 506 },
    litGrad: { y1: n1(cy - 300), y2: n1(cy + 300) },
  }

  // Pads below the concept grid, chamfered at 24 px and 45 degrees.
  paths.push(poly([[xR + 20, yg], [xR + 20, yP + 24], [xR - 480, yP + 24]], 'c', 24))
  paths.push(poly([[xR + 40, yg + 40], [xR + 40, yP + 48], [xR - 980, yP + 48]], 'c', 24))
  vias.push([xR + 20, yP + 24], [xR + 40, yP + 48], [xR - 480, yP + 24], [xR - 980, yP + 48])

  // The left bus beside the main line at the top of the doing section.
  const yS = a.doingT + 6
  const yE = yG - 40
  if (yE - yS > 200) {
    for (let i = 1; i <= 4; i++) {
      paths.push(
        'M' + n1(xL) + ' ' + n1(yS + 16 * i) + 'L' + n1(xL - 8 * i) + ' ' + n1(yS + 24 * i) +
          'L' + n1(xL - 8 * i) + ' ' + n1(yE - 24 * i) + 'L' + n1(xL) + ' ' + n1(yE - 16 * i),
      )
    }
  }
  // The right bus beside the main line below the chip.
  const yb = cB + 24
  const ye2 = a.doingB - 60
  if (ye2 - yb > 200) {
    for (let i = 1; i <= 4; i++) {
      paths.push(
        'M' + n1(xR) + ' ' + n1(yb + 16 * i) + 'L' + n1(xR + 8 * i) + ' ' + n1(yb + 24 * i) +
          'L' + n1(xR + 8 * i) + ' ' + n1(ye2 - 24 * i) + 'L' + n1(xR) + ' ' + n1(ye2 - 16 * i),
      )
    }
  }

  // Vias on the main line.
  vias.push([xR, yP], [xL, yP], [xL, yG], [cRr, yG], [cRr, cB], [xR, cB], [xH, hT], [xH, hB], [xR, hB], [xL, fT])

  const ranges: Array<[number, number]> = [
    [ye - 60, yP],
    [hT - 8, hB + 8],
  ]
  return sealed({ d, decor: { paths, vias, orbit }, ranges })
}

/**
 * The phone and narrow route (below 1280): along the edges, crossing in the
 * gaps between sections. A missing dispatches section drops its crossing.
 */
export function buildPhoneRoute(a: PhoneAnchors): Route | null {
  const nums = [a.W, a.heroB, a.orientB, a.thinkB, a.doingB, a.horizonT, a.horizonB, a.letterB, a.footerT]
  if (a.dispatchesB !== null) nums.push(a.dispatchesB)
  if (!finiteAll(...nums)) return null

  const xa = 10
  const xb = a.W - 10
  type Cross = { y: number; kind: Kind; size: number }
  const cross: Cross[] = [
    { y: a.heroB - 40, kind: 'c', size: 14 },
    { y: a.orientB - 40, kind: 'r', size: 14 },
    { y: a.thinkB - 40, kind: 'r', size: 14 },
    { y: a.doingB - 40, kind: 'c', size: 14 },
    { y: a.horizonT + 0.75, kind: 'r', size: 18 },
    { y: a.horizonB - 0.75, kind: 'r', size: 18 },
  ]
  if (a.dispatchesB !== null) cross.push({ y: a.dispatchesB - 40, kind: 'c', size: 14 })
  cross.push({ y: a.letterB - 40, kind: 'c', size: 14 })
  cross.push({ y: a.footerT - 1.5, kind: 'c', size: 14 })

  let side = 0
  const pts: Pt[] = [[xa, 76]]
  for (const c of cross) {
    const from = side ? xb : xa
    const to = side ? xa : xb
    pts.push([from, c.y, c.kind, c.size], [to, c.y, c.kind, c.size])
    side = 1 - side
  }
  const d = poly(pts, 'c', 14)
  const end = pts[pts.length - 1]
  const ranges: Array<[number, number]> = [
    [a.orientB - 60, a.thinkB - 20],
    [a.horizonT - 8, a.horizonB + 8],
  ]
  return sealed({
    d,
    decor: { paths: [], vias: [[end[0], end[1]]], orbit: null },
    ranges,
  })
}

// ---------------------------------------------------------------------------
// The light: scroll to path length
// ---------------------------------------------------------------------------

export interface Samples {
  X: ArrayLike<number>
  Y: ArrayLike<number>
  /** Path length between neighbouring samples. */
  step: number
  /** Total path length. */
  L: number
}

export interface LightModel {
  mode: 'weight' | 'reading'
  /** Horizontal weight (weight mode). */
  h: number
  range: number
  /** Path length where the light's head sits for a scroll position. */
  sForScroll(scroll: number): number
}

const BOUNDS: Array<[number, number]> = [
  [0.12, 0.82],
  [0.08, 0.88],
  [0.05, 0.93],
  [0.03, 0.97],
]

/** Reading line: the head rides this far down the viewport in reading mode. */
export const READ_LINE = 0.45

/**
 * The light-weight solver. Finds the largest horizontal weight h that keeps the
 * light's head inside the viewport bounds the whole way (cost of a stretch is
 * its vertical travel plus h times its horizontal travel, scaled so the whole
 * route spans the scroll range). When no weight fits, a short viewport has no
 * mapping that keeps the head on screen, so the model falls back to the reading
 * line: the head sits at the point of the path nearest 45 percent down the
 * viewport.
 */
export function buildLightModel(s: Samples, vh: number, docH: number): LightModel {
  const n = s.X.length - 1
  const ax = new Float64Array(n + 1)
  const ay = new Float64Array(n + 1)
  for (let i = 1; i <= n; i++) {
    ax[i] = ax[i - 1] + Math.abs(s.X[i] - s.X[i - 1])
    ay[i] = ay[i - 1] + Math.abs(s.Y[i] - s.Y[i - 1])
  }
  const endY = s.Y[n]
  const range = Math.max(1, Math.min(docH - vh, endY - 0.6 * vh))

  let best: number | null = null
  for (let bi = 0; bi < BOUNDS.length && best === null; bi++) {
    for (let h = 1.6; h >= -1e-9; h -= 0.05) {
      const tot = ay[n] + h * ax[n]
      if (!(tot > 0)) continue
      let mn = Infinity
      let mx = -Infinity
      for (let j = 0; j <= n; j += 4) {
        const sc = ((ay[j] + h * ax[j]) / tot) * range
        const e = s.Y[j] - sc
        if (e < mn) mn = e
        if (e > mx) mx = e
      }
      if (mn >= BOUNDS[bi][0] * vh && mx <= BOUNDS[bi][1] * vh) {
        best = Math.max(0, h)
        break
      }
    }
  }

  if (best !== null) {
    const h = best
    const total = ay[n] + h * ax[n]
    const cost = (i: number) => ay[i] + h * ax[i]
    return {
      mode: 'weight',
      h,
      range,
      sForScroll(scroll) {
        const target = Math.max(0, Math.min(1, scroll / range)) * total
        let lo = 0
        let hi = n
        while (lo < hi) {
          const m = (lo + hi) >> 1
          if (cost(m) < target) lo = m + 1
          else hi = m
        }
        return Math.min(s.L, lo * s.step)
      },
    }
  }

  // Reading-line mapping.
  const ks = new Float64Array(n + 1)
  const ss = new Float64Array(n + 1)
  for (let i = 1; i <= n; i++) {
    const ds = i === n ? Math.max(0, s.L - (n - 1) * s.step) : s.step
    const dy = s.Y[i] - s.Y[i - 1]
    ks[i] = ks[i - 1] + Math.max(dy, 0.15 * ds)
    ss[i] = Math.min(s.L, i * s.step)
  }
  const y0 = s.Y[0]
  const yE = s.Y[n]
  return {
    mode: 'reading',
    h: 0,
    range,
    sForScroll(scroll) {
      const readY = scroll + READ_LINE * vh
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

// ---------------------------------------------------------------------------
// Flattening, for tests and tooling
// ---------------------------------------------------------------------------

/**
 * Walk a path made of M, L, Q and circular A commands into evenly spaced
 * points. Only the commands this file emits are understood.
 */
export function flattenPath(d: string, step: number): Samples {
  const toks = [...d.matchAll(/([MLQA])([^MLQA]*)/g)].map((m) => ({
    c: m[1],
    n: m[2].trim().split(/[\s,]+/).filter(Boolean).map(Number),
  }))
  const seg: Array<(t: number) => [number, number]> = []
  const lens: number[] = []
  let cx = 0
  let cy = 0
  for (const { c, n } of toks) {
    if (c === 'M') {
      cx = n[0]
      cy = n[1]
    } else if (c === 'L') {
      const x0 = cx
      const y0 = cy
      const [x1, y1] = n
      seg.push((t) => [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t])
      lens.push(Math.hypot(x1 - x0, y1 - y0))
      cx = x1
      cy = y1
    } else if (c === 'Q') {
      const x0 = cx
      const y0 = cy
      const [qx, qy, x1, y1] = n
      const f = (t: number): [number, number] => [
        (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * qx + t * t * x1,
        (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * qy + t * t * y1,
      ]
      let len = 0
      let p = f(0)
      for (let i = 1; i <= 20; i++) {
        const q = f(i / 20)
        len += Math.hypot(q[0] - p[0], q[1] - p[1])
        p = q
      }
      seg.push(f)
      lens.push(len)
      cx = x1
      cy = y1
    } else {
      // A r r rot large sweep x y: circular arc, endpoint form to centre form.
      const [r, , , large, sweep, x1, y1] = n
      const x0 = cx
      const y0 = cy
      const mx = (x0 - x1) / 2
      const my = (y0 - y1) / 2
      const q = Math.sqrt(Math.max(0, (r * r) / (mx * mx + my * my) - 1))
      const sgn = large === sweep ? -1 : 1
      const ccx = (x0 + x1) / 2 + sgn * q * my
      const ccy = (y0 + y1) / 2 - sgn * q * mx
      const a0 = Math.atan2(y0 - ccy, x0 - ccx)
      let da = Math.atan2(y1 - ccy, x1 - ccx) - a0
      if (sweep && da < 0) da += 2 * Math.PI
      if (!sweep && da > 0) da -= 2 * Math.PI
      seg.push((t) => [ccx + r * Math.cos(a0 + da * t), ccy + r * Math.sin(a0 + da * t)])
      lens.push(Math.abs(da) * r)
      cx = x1
      cy = y1
    }
  }
  const L = lens.reduce((a, b) => a + b, 0)
  const count = Math.max(1, Math.ceil(L / step))
  const X = new Float64Array(count + 1)
  const Y = new Float64Array(count + 1)
  let si = 0
  let acc = 0
  for (let i = 0; i <= count; i++) {
    const target = Math.min(L, i * step)
    while (si < seg.length - 1 && acc + lens[si] < target) {
      acc += lens[si]
      si++
    }
    const t = lens[si] > 0 ? Math.min(1, Math.max(0, (target - acc) / lens[si])) : 0
    const [x, y] = seg[si](t)
    X[i] = x
    Y[i] = y
  }
  return { X, Y, step, L }
}
