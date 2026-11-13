'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { skySize, skyX, skyY0, skyYParked } from './sky-math'

// Mounted once in the root layout. Holds the sky still to the viewport behind
// every `.sw` word (SkyWord). Inserts no DOM nodes.
//
// Moving: each word gets --sky-sz, --sky-x and --sky-y once (layout position,
// so the scroll reveal's transform does not matter). While at least one word is
// near the viewport, a passive scroll listener schedules one rAF that writes
// --sky-scroll on the root. When no word is near it writes nothing.
//
// Parked (reduced motion): --sky-y is written once per word, --sky-scroll is
// set to 0 once, no scroll listener and no glint. After that the words are
// measured again only when the fonts finish loading and on a resize.

const SEL = '.sw'
const REDUCED = '(prefers-reduced-motion: reduce)'
const FINE = '(hover: hover) and (pointer: fine)'
const GLINT_MS = 1500
const GLINT_DELAY_MS = 250

// Once per word per page load. Words are new elements after a route change.
const glintDone = new WeakSet<Element>()

type Box = { left: number; top: number; width: number; height: number }

function layoutBox(el: HTMLElement): Box {
  let left = 0
  let top = 0
  let node: HTMLElement | null = el
  while (node) {
    left += node.offsetLeft
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { left, top, width: el.offsetWidth, height: el.offsetHeight }
}

const smooth = (p: number) => p * p * (3 - 2 * p)

function setup(): () => void {
  const words = Array.from(document.querySelectorAll<HTMLElement>(SEL))
  if (words.length === 0) return () => {}

  const root = document.documentElement
  const parked = window.matchMedia(REDUCED).matches
  const cleanups: Array<() => void> = []

  // ---- measure and write the per-word properties ----
  const measure = () => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const sz = skySize(vw, vh)
    for (const el of words) {
      const box = layoutBox(el)
      const anchor = el.closest<HTMLElement>('[data-sky-center]')
      const ex = anchor
        ? layoutBox(anchor).left + anchor.offsetWidth / 2
        : box.left + box.width / 2
      const b = { ex, docLeft: box.left, docTop: box.top }
      const y = parked ? skyYParked(sz, vh, box.height) : skyY0(sz, vh, b)
      el.style.setProperty('--sky-sz', String(sz))
      el.style.setProperty('--sky-x', String(skyX(sz, b)))
      el.style.setProperty('--sky-y', String(y))
      el.classList.add('sw-ready')
    }
  }
  measure()
  if (parked) root.style.setProperty('--sky-scroll', '0')

  let resizeTimer = 0
  const onResize = () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(measure, 150)
  }
  window.addEventListener('resize', onResize)
  cleanups.push(() => {
    window.removeEventListener('resize', onResize)
    window.clearTimeout(resizeTimer)
  })

  let cancelled = false
  void document.fonts?.ready.then(() => {
    if (!cancelled) measure()
  })
  cleanups.push(() => {
    cancelled = true
  })

  if (parked || typeof IntersectionObserver === 'undefined') {
    return () => cleanups.forEach((fn) => fn())
  }

  // ---- moving: scroll listener only while a word is near the viewport ----
  const near = new Set<Element>()
  let listening = false
  let frame = 0
  const write = () => {
    frame = 0
    root.style.setProperty('--sky-scroll', String(window.scrollY))
  }
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(write)
  }
  const nearObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) near.add(e.target)
        else near.delete(e.target)
      }
      if (near.size > 0 && !listening) {
        listening = true
        write()
        window.addEventListener('scroll', onScroll, { passive: true })
      } else if (near.size === 0 && listening) {
        listening = false
        window.removeEventListener('scroll', onScroll)
        if (frame) cancelAnimationFrame(frame)
        frame = 0
      }
    },
    { rootMargin: '25% 0px 25% 0px' },
  )
  words.forEach((el) => nearObserver.observe(el))
  cleanups.push(() => {
    nearObserver.disconnect()
    window.removeEventListener('scroll', onScroll)
    if (frame) cancelAnimationFrame(frame)
  })

  // ---- glint ----
  const running = new Map<HTMLElement, number>()
  let glintFrame = 0
  const clearGlint = (el: HTMLElement) => {
    el.classList.remove('sw-glint')
    el.style.removeProperty('--gl-x')
    el.style.removeProperty('--gl-w')
    el.style.removeProperty('--gl-h')
  }
  const step = (t: number) => {
    glintFrame = 0
    for (const [el, t0] of running) {
      const p = (t - t0) / GLINT_MS
      if (p >= 1) {
        running.delete(el)
        clearGlint(el)
        continue
      }
      const w = el.offsetWidth
      const gw = Math.max(60, w * 0.55)
      const g = smooth(Math.max(0, p))
      el.style.setProperty('--gl-w', String(gw))
      el.style.setProperty('--gl-h', String(el.offsetHeight))
      el.style.setProperty('--gl-x', String(-gw + g * (w + gw)))
      el.classList.add('sw-glint')
    }
    if (running.size > 0) glintFrame = requestAnimationFrame(step)
  }
  const startGlint = (el: HTMLElement) => {
    if (running.has(el) || window.matchMedia(REDUCED).matches) return
    running.set(el, performance.now())
    if (!glintFrame) glintFrame = requestAnimationFrame(step)
  }
  cleanups.push(() => {
    if (glintFrame) cancelAnimationFrame(glintFrame)
    running.forEach((_, el) => clearGlint(el))
    running.clear()
  })

  const timers = new Set<number>()
  const glintObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting || glintDone.has(e.target)) continue
        glintDone.add(e.target)
        glintObserver.unobserve(e.target)
        const id = window.setTimeout(() => {
          timers.delete(id)
          startGlint(e.target as HTMLElement)
        }, GLINT_DELAY_MS)
        timers.add(id)
      }
    },
    { threshold: 1, rootMargin: '0px 0px -15% 0px' },
  )
  words.forEach((el) => {
    if (!glintDone.has(el)) glintObserver.observe(el)
  })
  cleanups.push(() => {
    glintObserver.disconnect()
    timers.forEach((id) => window.clearTimeout(id))
    timers.clear()
  })

  // Hover replays the glint on a fine pointer only.
  if (window.matchMedia(FINE).matches) {
    for (const el of words) {
      const enter = () => startGlint(el)
      el.addEventListener('mouseenter', enter)
      cleanups.push(() => el.removeEventListener('mouseenter', enter))
    }
  }

  return () => cleanups.forEach((fn) => fn())
}

export default function SkyField() {
  const pathname = usePathname()

  useEffect(() => {
    let teardown = setup()
    // A change in reduced-motion preference re-runs the setup in the new mode.
    const mq = window.matchMedia(REDUCED)
    const onChange = () => {
      teardown()
      teardown = setup()
    }
    mq.addEventListener('change', onChange)
    return () => {
      mq.removeEventListener('change', onChange)
      teardown()
    }
  }, [pathname])

  return null
}
