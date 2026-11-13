'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { SkyAperture, colorAt, hex } from './board-parts'
import {
  buildDeskRoute,
  buildLightModel,
  buildPhoneRoute,
  type Box,
  type LightModel,
  type Route,
} from './circuit-geom'

// The homepage circuit: one continuous line from the hero to the footer, lit
// where the page is cosmic, with a light that follows the scroll.
//
// Everything on the page that the line has to meet carries a data-c name (see
// page.tsx). This component reads those boxes from LAYOUT (offsetTop and
// offsetLeft up the offsetParent chain), never getBoundingClientRect, which
// would include the scroll reveal's transform. circuit-geom.ts turns the
// numbers into paths. The paths live in React state and React renders the SVG.
// After a commit the light's few attributes are written through refs, and
// only while its head is moving toward its target.
//
// Reduced motion: the line is drawn, the light is not rendered and no scroll
// listener is attached.

const SEGLEN = 144
// The route switches on the same media query as the art in circuit.css. A media
// query counts a classic scrollbar and clientWidth does not, so choosing by
// clientWidth drew the phone route under the desktop art from 1280 to about
// 1294px on a desktop with a 15px scrollbar (PR #55 review, round 1).
const WIDE_MQ = '(min-width: 1280px)'
const STEP = 6
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
  H: number
  desk: boolean
  route: Route
  key: string
}

function layoutBox(el: HTMLElement): Box {
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

const one = (name: string) => document.querySelector<HTMLElement>(`[data-c="${name}"]`)

function measure(): Drawn | null {
  const W = document.documentElement.clientWidth
  const footerEl = document.querySelector<HTMLElement>('footer')
  const heroEl = one('hero')
  if (!footerEl || !heroEl) return null
  const footer = layoutBox(footerEl)
  const hero = layoutBox(heroEl)
  const H = footer.b

  let route: Route | null
  const desk = window.matchMedia(WIDE_MQ).matches
  if (desk) {
    const els = {
      orient: one('orient'),
      head: one('thinking-head'),
      link: one('thinking-link'),
      grid: one('thinking-grid'),
      charter: one('charter'),
      install: one('installrow'),
      chip: one('chip'),
      doing: one('doing'),
      horizon: one('horizon'),
    }
    if (Object.values(els).some((e) => !e)) return null
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-c="reframe-card"]')).map(layoutBox)
    const grid = layoutBox(els.grid!)
    const chip = layoutBox(els.chip!)
    const doing = layoutBox(els.doing!)
    const horizon = layoutBox(els.horizon!)
    route = buildDeskRoute({
      W,
      hero,
      col: { l: grid.l, r: grid.r },
      cards,
      orientT: layoutBox(els.orient!).t,
      thinkHeadT: layoutBox(els.head!).t,
      thinkLinkL: layoutBox(els.link!).l,
      thinkHeadB: layoutBox(els.head!).b,
      thinkGridB: grid.b,
      charterB: layoutBox(els.charter!).b,
      installT: layoutBox(els.install!).t,
      chip: { r: chip.r, b: chip.b },
      doingT: doing.t,
      doingB: doing.b,
      horizonT: horizon.t,
      horizonB: horizon.b,
      footerT: footer.t,
    })
  } else {
    const orient = one('orient')
    const think = one('thinking')
    const doing = one('doing')
    const horizon = one('horizon')
    const letter = one('letter')
    if (!orient || !think || !doing || !horizon || !letter) return null
    const disp = one('dispatches')
    const hz = layoutBox(horizon)
    route = buildPhoneRoute({
      W,
      heroB: hero.b,
      orientB: layoutBox(orient).b,
      thinkB: layoutBox(think).b,
      doingB: layoutBox(doing).b,
      horizonT: hz.t,
      horizonB: hz.b,
      dispatchesB: disp ? layoutBox(disp).b : null,
      letterB: layoutBox(letter).b,
      footerT: footer.t,
    })
  }
  if (!route) return null
  const key = [W, H, route.d, route.decor.paths.join('|')].join('#')
  return { W, H, desk, route, key }
}

// The lit gradient: transparent except along the cosmic stretches, where it
// walks the nebula from cyan to rose.
function litStops(ranges: Array<[number, number]>) {
  const y1 = ranges[0][0] - 2
  const y2 = ranges[ranges.length - 1][1] + 2
  const off = (y: number) => Math.max(0, Math.min(1, (y - y1) / (y2 - y1)))
  const stops: Array<{ o: number; c: string; a: number }> = [{ o: 0, c: '#14dff7', a: 0 }]
  ranges.forEach((r, ri) => {
    if (ri > 0) {
      stops.push({ o: off(ranges[ri - 1][1]), c: '#14dff7', a: 0 })
      stops.push({ o: off(r[0]), c: '#14dff7', a: 0 })
    }
    for (let k = 0; k <= 6; k++) {
      const t = k / 6
      stops.push({ o: off(r[0] + (r[1] - r[0]) * t), c: hex(colorAt(t)), a: 0.85 })
    }
  })
  stops.push({ o: 1, c: '#db7ba9', a: 0 })
  return { y1, y2, stops }
}

export default function HomeCircuit() {
  const [drawn, setDrawn] = useState<Drawn | null>(null)
  const reduced = useSyncExternalStore(subscribeReduced, reducedNow, reducedServer)
  const lastKey = useRef('')
  const pathRef = useRef<SVGPathElement>(null)
  const gradRef = useRef<SVGLinearGradientElement>(null)
  const glowRef = useRef<SVGPathElement>(null)
  const coreRef = useRef<SVGPathElement>(null)

  const redraw = useCallback(() => {
    const next = measure()
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
  }, [])

  // Measure, and measure again when the page changes shape.
  useEffect(() => {
    let dead = false
    let settle = 0
    redraw()
    const ro = new ResizeObserver(() => redraw())
    ro.observe(document.body)
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
    return () => {
      dead = true
      ro.disconnect()
      document.removeEventListener('transitionend', onEnd)
      window.clearTimeout(settle)
    }
  }, [redraw])

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
    let model: LightModel = buildLightModel({ X, Y, step: STEP, L }, window.innerHeight, drawn.H)
    const dash = `${SEGLEN} ${L + 500}`
    glow.style.strokeDasharray = dash
    core.style.strokeDasharray = dash

    let cur = model.sForScroll(window.scrollY)
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
      const tgt = model.sForScroll(window.scrollY)
      const d = tgt - cur
      cur = Math.abs(d) < 0.4 ? tgt : cur + d * 0.2
      write(cur)
      if (Math.abs(tgt - cur) > 0.4) raf = requestAnimationFrame(frame)
    }
    const onScroll = () => {
      if (raf) return
      // Cheap check first: no frame is scheduled unless the head has to move.
      if (Math.abs(model.sForScroll(window.scrollY) - cur) > 0.4) raf = requestAnimationFrame(frame)
    }
    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        model = buildLightModel({ X, Y, step: STEP, L }, window.innerHeight, drawn.H)
        onScroll()
      }, 150)
    }

    write(cur)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(resizeTimer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [drawn, reduced])

  if (!drawn) return null
  const { W, H, route } = drawn
  const { d, decor, ranges } = route
  const lit = litStops(ranges)
  const orbit = decor.orbit

  return (
    <svg
      className="hcirc ph-no-capture"
      data-art=""
      aria-hidden="true"
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
    >
      <defs>
        {orbit && (
          <>
            <SkyAperture id="hc-sky" x={orbit.pattern.x} y={orbit.pattern.y} w={orbit.pattern.w} h={orbit.pattern.h} />
            <linearGradient id="hc-litv" gradientUnits="userSpaceOnUse" x1={0} y1={orbit.litGrad.y1} x2={0} y2={orbit.litGrad.y2}>
              {[0, 0.22, 0.5, 0.76, 1].map((t) => (
                <stop key={t} offset={t} stopColor={hex(colorAt(t))} />
              ))}
            </linearGradient>
          </>
        )}
        <linearGradient id="hc-litg" gradientUnits="userSpaceOnUse" x1={0} y1={lit.y1} x2={0} y2={lit.y2}>
          {lit.stops.map((s, i) => (
            <stop key={i} offset={s.o} stopColor={s.c} stopOpacity={s.a} />
          ))}
        </linearGradient>
        <linearGradient ref={gradRef} id="hc-light" gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={1} y2={0}>
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
        {orbit && (
          <>
            <path d={orbit.sky} stroke="url(#hc-sky)" strokeWidth={6} fill="none" />
            <path d={orbit.lit} stroke="url(#hc-litv)" strokeWidth={3} opacity={0.6} fill="none" />
          </>
        )}
        {decor.vias.map(([x, y], i) => (
          <circle key={i} className="via" cx={x} cy={y} r={4} />
        ))}
      </g>
      <path ref={pathRef} className="cbase" d={d} />
      <path className="clit" d={d} stroke="url(#hc-litg)" />
      {!reduced && (
        <g className="hlight">
          <path ref={glowRef} className="hl-glow" d={d} />
          <path ref={coreRef} className="hl-core" d={d} />
        </g>
      )}
    </svg>
  )
}
