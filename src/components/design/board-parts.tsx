import type { CSSProperties, ReactNode } from 'react'

// Small SVG parts for the circuit boards: the hero flanks, the phone orbit, the
// chip and the junction rules. Plain server-safe components, no state. Every
// SVG that uses them is decorative, so the roots below carry aria-hidden,
// data-art (the line-under-text instrument hides [data-art] to tell line art
// from text) and ph-no-capture (PostHog session recording skips them).
//
// Strokes take their weight and colour from the `svg.b` rules in circuit.css.

// The nebula, as the gradient helper's stops: [offset, [r, g, b]].
const STOPS: Array<[number, [number, number, number]]> = [
  [0, [20, 223, 247]],
  [0.22, [103, 146, 191]],
  [0.5, [185, 148, 194]],
  [0.76, [203, 122, 189]],
  [1, [219, 123, 169]],
]

export function colorAt(t: number): [number, number, number] {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [a, ca] = STOPS[i]
    const [b, cb] = STOPS[i + 1]
    if (t >= a && t <= b) {
      const k = (t - a) / (b - a)
      return ca.map((v, j) => Math.round(v + (cb[j] - v) * k)) as [number, number, number]
    }
  }
  return STOPS[STOPS.length - 1][1]
}

export const hex = (c: [number, number, number]) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('')

/** A user-space gradient across (x1,y1)-(x2,y2) using the nebula stops from t0 to t1. */
export function NebGrad({
  id,
  x1,
  y1,
  x2,
  y2,
  t0 = 0,
  t1 = 1,
}: {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  t0?: number
  t1?: number
}) {
  const ts = [t0, ...STOPS.map((s) => s[0]).filter((t) => t > t0 && t < t1), t1]
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
      {ts.map((t) => (
        <stop key={t} offset={((t - t0) / (t1 - t0)).toFixed(3)} stopColor={hex(colorAt(t))} />
      ))}
    </linearGradient>
  )
}

/**
 * The gold glow of a lit via: a radial gradient painted on a circle. Never a
 * CSS blur filter (WebKit draws a blur filter on an SVG circle as a flat grey
 * disc). Put one in each SVG's defs and pass its id to Via.
 */
export function LitGlowDef({ id }: { id: string }) {
  return (
    <radialGradient id={id}>
      <stop offset="0" stopColor="#f0d080" stopOpacity=".55" />
      <stop offset=".45" stopColor="#f0d080" stopOpacity=".24" />
      <stop offset="1" stopColor="#f0d080" stopOpacity="0" />
    </radialGradient>
  )
}

export function Via({ x, y, glow }: { x: number; y: number; glow?: string }) {
  return (
    <>
      {glow && <circle className="glow" cx={x} cy={y} r={13} fill={`url(#${glow})`} />}
      <circle className={glow ? 'via lit' : 'via'} cx={x} cy={y} r={4} />
    </>
  )
}

export const Pad = ({ x, y }: { x: number; y: number }) => <circle className="pad" cx={x} cy={y} r={2.5} />
export const Ink = ({ d }: { d: string }) => <path className="ink" d={d} />
export const Light = ({ d, g, w = 1.5, o = 0.7 }: { d: string; g: string; w?: number; o?: number }) => (
  <path className="light" d={d} stroke={`url(#${g})`} strokeWidth={w} opacity={o} />
)
export const Xh = ({ x, y }: { x: number; y: number }) => (
  <path className="xh" d={`M${x - 4.5} ${y}h9M${x} ${y - 4.5}v9`} />
)
export const Dim = ({ x1, x2, y }: { x1: number; x2: number; y: number }) => (
  <Ink d={`M${x1} ${y}H${x2}M${x1} ${y - 6}v12M${x2} ${y - 6}v12`} />
)

/** Arc from angle a0 to a1 (degrees, screen coordinates). */
export function arc(cx: number, cy: number, R: number, a0: number, a1: number): string {
  const p = (a: number) =>
    [cx + R * Math.cos((a * Math.PI) / 180), cy + R * Math.sin((a * Math.PI) / 180)].map((v) => +v.toFixed(1))
  const [x0, y0] = p(a0)
  const [x1, y1] = p(a1)
  return `M${x0} ${y0}A${R} ${R} 0 0 ${a1 > a0 ? 1 : 0} ${x1} ${y1}`
}

/**
 * A pattern that paints the sky aperture inside the pattern box. The box keeps
 * the preview's size and place (W by H at x, y); the aperture image is that
 * crop of the band sky: x = 0.2W, y = 0, width = 0.45W, height = 0.85H, stretched
 * to fit. The image is WebP because an SVG image takes one format.
 */
export function SkyAperture({ id, x, y, w, h }: { id: string; x: number; y: number; w: number; h: number }) {
  return (
    <pattern id={id} patternUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
      <image
        className="sky-img"
        href="/sky/sky-aperture.webp"
        x={0.2 * w}
        y={0}
        width={0.45 * w}
        height={0.85 * h}
        preserveAspectRatio="none"
      />
    </pattern>
  )
}

/** The decorative SVG root. */
export function Board({
  cls,
  w,
  h,
  vb,
  style,
  children,
}: {
  cls?: string
  w: number
  h: number
  vb?: string
  style?: CSSProperties
  children: ReactNode
}) {
  return (
    <svg
      className={`b ph-no-capture${cls ? ' ' + cls : ''}`}
      data-art=""
      aria-hidden="true"
      width={w}
      height={h}
      viewBox={vb ?? `0 0 ${w} ${h}`}
      fill="none"
      style={style}
    >
      {children}
    </svg>
  )
}

/** The chip: a 168 by 120 package with a die and three pins a side. */
export function Chip({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect className="ink4" x={x} y={y} width={168} height={120} rx={6} />
      <rect className="ink" x={x + 40} y={y + 32} width={88} height={56} rx={2} />
      {[0, 1, 2].map((i) => (
        <Ink key={i} d={`M${x} ${y + 36 + i * 24}h-12M${x + 168} ${y + 36 + i * 24}h12`} />
      ))}
    </>
  )
}
