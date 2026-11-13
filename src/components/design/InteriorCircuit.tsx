'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { READ_LINE } from './circuit-geom'
import {
  DESK_FROM,
  buildInteriorRoute,
  buildReadingModel,
  pickHeadings,
  type InteriorRoute,
  type ReadingModel,
} from './interior-geom'

// The interior circuit: one SVG in the article, from the band down the right
// gutter to a node at one third of the whole page, with a light that follows
// the reading line.
//
// The article carries class "iart" (position: relative), and every number here
// is local to it. Boxes are read from LAYOUT (offsetTop and offsetLeft up the
// offsetParent chain), never getBoundingClientRect, which would include the
// scroll reveal's translateY(20px). The route lives in React state and React
// renders the SVG. After a commit the light's few attributes are written
// through refs, and only while its head is moving toward its target.
//
// Reduced motion: the line is drawn, the light is not rendered and no scroll
// listener is attached.

const SEGLEN = 144
const STEP = 6
const NAV = 64
const REDUCED = '(prefers-reduced-motion: reduce)'

function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(REDUCED)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const reducedNow = () => window.matchMedia(REDUCED).matches
const reducedServer = () => false

interface Drawn {
  W: number
  SH: number
  top: number
  route: InteriorRoute
  key: string
}

interface LBox {
  l: number
  t: number
  r: number
  b: number
}

function layoutBox(el: HTMLElement): LBox {
  let l = 0
  let t = 0
  let node: HTMLElement | null = el
  while (node) {
    l += node.offsetLeft
    t += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { l, t, r: l + el.offsetWidth, b: t + el.offsetHeight }
}

function measure(lean: 'cosmic' | 'agentic'): Drawn | null {
  const article = document.querySelector<HTMLElement>('article.iart')
  const footerEl = document.querySelector<HTMLElement>('footer')
  const headerEl = article?.querySelector<HTMLElement>(':scope > header')
  if (!article || !footerEl || !headerEl) return null
  const art = layoutBox(article)
  const W = article.offsetWidth
  const pageH = layoutBox(footerEl).b
  const H3 = Math.round(pageH / 3)
  const yE = H3 - art.t
  const hb = layoutBox(headerEl)
  const capB = hb.b - art.t - 32

  let heads: Array<[number, number]> = []
  if (W >= DESK_FROM) {
    const rows: Array<[number, number, boolean]> = []
    article.querySelectorAll<HTMLElement>('.prose h2').forEach((h) => {
      const b = layoutBox(h)
      const p = h.parentElement ? layoutBox(h.parentElement) : b
      rows.push([(b.t + b.b) / 2 - art.t, p.r - art.l, !!h.closest('[style*="grid"]')])
    })
    heads = pickHeadings(rows, capB, yE)
  }

  const route = buildInteriorRoute(lean, {
    W,
    navB: NAV - art.t,
    secR: hb.r - art.l,
    capB,
    yE,
    heads,
  })
  if (!route) return null
  const SH = Math.round(yE + 60)
  const key = [W, SH, route.d, route.decor.paths.join('|')].join('#')
  return { W, SH, top: art.t, route, key }
}

export default function InteriorCircuit({ lean }: { lean: 'cosmic' | 'agentic' }) {
  const pathname = usePathname()
  const [drawn, setDrawn] = useState<Drawn | null>(null)
  const reduced = useSyncExternalStore(subscribeReduced, reducedNow, reducedServer)
  const lastKey = useRef('')
  const pathRef = useRef<SVGPathElement>(null)
  const gradRef = useRef<SVGLinearGradientElement>(null)
  const glowRef = useRef<SVGPathElement>(null)
  const coreRef = useRef<SVGPathElement>(null)

  const redraw = useCallback(() => {
    const next = measure(lean)
    if (!next) {
      if (lastKey.current !== '') {
        lastKey.current = ''
        setDrawn(null)
      }
      return
    }
    if (next.key === lastKey.current) return
    lastKey.current = next.key
    setDrawn(next)
  }, [lean])

  // Measure, and measure again when the page changes shape. Runs again for each
  // route so a slug change on the same page component draws its own circuit.
  useEffect(() => {
    let dead = false
    let settle = 0
    lastKey.current = ''
    redraw()
    const ro = new ResizeObserver(() => redraw())
    ro.observe(document.body)
    const article = document.querySelector('article.iart')
    if (article) ro.observe(article)
    void document.fonts?.ready.then(() => {
      if (!dead) redraw()
    })
    // Reveals move blocks by a transform only, but a late image or font can
    // still shift layout; one redraw after the reveals settle catches it.
    const onEnd = (e: TransitionEvent) => {
      const t = e.target
      if (!(t instanceof Element) || !t.classList.contains('reveal')) return
      window.clearTimeout(settle)
      settle = window.setTimeout(redraw, 150)
    }
    document.addEventListener('transitionend', onEnd)
    const late = window.setTimeout(redraw, 400)
    return () => {
      dead = true
      ro.disconnect()
      document.removeEventListener('transitionend', onEnd)
      window.clearTimeout(settle)
      window.clearTimeout(late)
    }
  }, [redraw, pathname])

  // The light. Set up after each commit that changes the path.
  useLayoutEffect(() => {
    if (!drawn || reduced) return
    const path = pathRef.current
    const grad = gradRef.current
    const glow = glowRef.current
    const core = coreRef.current
    if (!path || !grad || !glow || !core) return

    const L = path.getTotalLength()
    const n = Math.ceil(L / STEP)
    const X = new Float32Array(n + 1)
    const Y = new Float32Array(n + 1)
    for (let i = 0; i <= n; i++) {
      const q = path.getPointAtLength(Math.min(i * STEP, L))
      X[i] = q.x
      Y[i] = q.y
    }
    const model: ReadingModel = buildReadingModel(X, Y, STEP, L)
    const dash = `${SEGLEN} ${L + 500}`
    glow.style.strokeDasharray = dash
    core.style.strokeDasharray = dash

    const target = () => model.sFor(window.scrollY + READ_LINE * window.innerHeight - drawn.top)
    let cur = target()
    let written = NaN
    let raf = 0
    const at = (s: number) => Math.max(0, Math.min(n, Math.round(s / STEP)))
    const write = (s: number) => {
      if (s === written) return
      written = s
      const ih = at(s)
      const it = at(s - SEGLEN)
      grad.setAttribute('x1', String(X[it]))
      grad.setAttribute('y1', String(Y[it]))
      grad.setAttribute('x2', String(X[ih]))
      grad.setAttribute('y2', String(Y[ih]))
      const off = String(-(s - SEGLEN))
      glow.style.strokeDashoffset = off
      core.style.strokeDashoffset = off
    }
    const frame = () => {
      raf = 0
      const tgt = target()
      const d = tgt - cur
      cur = Math.abs(d) < 0.4 ? tgt : cur + d * 0.2
      write(cur)
      if (Math.abs(tgt - cur) > 0.4) raf = requestAnimationFrame(frame)
    }
    const onScroll = () => {
      if (raf) return
      // Cheap check first: no frame is scheduled unless the head has to move.
      if (Math.abs(target() - cur) > 0.4) raf = requestAnimationFrame(frame)
    }

    write(cur)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [drawn, reduced])

  if (!drawn) return null
  const { W, SH, route } = drawn
  const { d, decor } = route

  return (
    <svg
      className="hcirc icirc ph-no-capture"
      data-art=""
      aria-hidden="true"
      width={W}
      height={SH}
      viewBox={`0 0 ${W} ${SH}`}
      fill="none"
    >
      <defs>
        <linearGradient ref={gradRef} id="ic-light" gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0" stopColor="#14dff7" stopOpacity="0" />
          <stop offset=".22" stopColor="#14dff7" stopOpacity=".85" />
          <stop offset=".6" stopColor="#e9dcff" stopOpacity="1" />
          <stop offset=".85" stopColor="#db7ba9" stopOpacity=".75" />
          <stop offset="1" stopColor="#db7ba9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g>
        {decor.paths.map((p, i) => (
          <path key={i} className="cdec" d={p} />
        ))}
        {decor.rings.map(([x, y, r], i) => (
          <circle key={`r${i}`} className="ring" cx={x} cy={y} r={r} />
        ))}
        {decor.pads.map(([x, y], i) => (
          <circle key={`p${i}`} className="pad" cx={x} cy={y} r={2.5} />
        ))}
        {decor.vias.map(([x, y], i) => (
          <circle key={`v${i}`} className="via" cx={x} cy={y} r={4} />
        ))}
      </g>
      <path ref={pathRef} className="cbase" d={d} />
      {!reduced && (
        <g className="hlight">
          <path ref={glowRef} className="il-glow" d={d} />
          <path ref={coreRef} className="il-core" d={d} />
        </g>
      )}
    </svg>
  )
}
