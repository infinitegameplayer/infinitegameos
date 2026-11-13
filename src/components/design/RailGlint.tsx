'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Mounted once in the root layout. Adds `glint` to each nebula rail (.action-card
// and .card-rail) when 60 percent of it is in view, so the glint runs once on
// arrival. One IntersectionObserver, each element unobserved after it fires,
// re-scanned on route change. Does nothing at all under reduced motion.
const RAIL_SELECTOR = '.action-card, .card-rail'

export default function RailGlint() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rails = document.querySelectorAll<HTMLElement>(RAIL_SELECTOR)
    if (rails.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('glint')
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.6 },
    )
    rails.forEach((el) => {
      if (!el.classList.contains('glint')) io.observe(el)
    })
    return () => io.disconnect()
  }, [pathname])

  return null
}
