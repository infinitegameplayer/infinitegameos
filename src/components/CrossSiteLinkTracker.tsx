'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import { isNoTrackPath } from '@/lib/no-track'

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void
      identify: (data: Record<string, unknown>) => void
    }
  }
}

// Hosts whose outbound clicks we record (Kingdom + the social/code surfaces we publish to).
const KINGDOM_HOSTS = new Set([
  'sidequesthq.co',
  'www.sidequesthq.co',
  'lanebelone.com',
  'www.lanebelone.com',
  'infinitegameos.io',
  'www.infinitegameos.io',
  'lanebelone.substack.com',
  'github.com',
  'linkedin.com',
  'www.linkedin.com',
  'instagram.com',
  'www.instagram.com',
])

// Hosts we own on both ends. Only these receive the kref join key, because only
// our own sites read it on arrival. We never leak a distinct_id to a third party.
const OWNED_HOSTS = new Set([
  'sidequesthq.co',
  'www.sidequesthq.co',
  'lanebelone.com',
  'www.lanebelone.com',
  'infinitegameos.io',
  'www.infinitegameos.io',
])

export function CrossSiteLinkTracker() {
  const posthog = usePostHog()
  const pathname = usePathname()

  // Arrival side: read an inbound kref/ksrc stamped by the upstream Kingdom site,
  // record the cross-site stitch, persist it for checkout, then clean the URL.
  useEffect(() => {
    if (typeof window === 'undefined') return
    // First-touch: remember this session's entry UTMs and referrer once, so a
    // later cross-site hop can forward the true source even after same-site
    // navigation has dropped the query string.
    try {
      if (!sessionStorage.getItem('first_touch')) {
        const p = new URLSearchParams(window.location.search)
        const ft: Record<string, string> = {}
        for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'igshid', 'ttclid', 'msclkid']) {
          const v = p.get(k)
          if (v) ft[k] = v
        }
        if (document.referrer) ft.referrer = document.referrer
        if (Object.keys(ft).length) sessionStorage.setItem('first_touch', JSON.stringify(ft))
      }
    } catch {
      // first-touch capture is best-effort
    }
    try {
      const params = new URLSearchParams(window.location.search)
      const kref = params.get('kref')
      const ksrc = params.get('ksrc')
      if (!kref && !ksrc) return

      const arrival = {
        upstream_distinct_id: kref || '',
        upstream_host: ksrc || '',
        landing_path: window.location.pathname,
      }
      try {
        posthog?.capture('cross_site_arrival', arrival)
        window.umami?.track('cross_site_arrival', arrival)
        sessionStorage.setItem('kingdom_attribution', JSON.stringify({ ...arrival, ts: Date.now() }))
      } catch {
        // analytics persistence must never break the page
      }

      params.delete('kref')
      params.delete('ksrc')
      const qs = params.toString()
      const clean = window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash
      window.history.replaceState(null, '', clean)
    } catch {
      // a malformed URL must never break the page
    }
  }, [posthog])

  // Departure side: record every outbound Kingdom click and, for sites we own on
  // both ends, stamp the destination with our distinct_id so the journey stitches
  // across the domain boundary even when the referrer header is stripped.
  useEffect(() => {
    if (isNoTrackPath(pathname)) return
    function handler(e: MouseEvent) {
      const targetEl = e.target as HTMLElement | null
      const anchor = targetEl?.closest('a') as HTMLAnchorElement | null
      if (!anchor?.href) return

      let url: URL
      try {
        url = new URL(anchor.href)
      } catch {
        return
      }

      if (!['http:', 'https:'].includes(url.protocol)) return
      if (url.hostname === window.location.hostname) return

      const isKingdomDestination = KINGDOM_HOSTS.has(url.hostname)

      if (OWNED_HOSTS.has(url.hostname)) {
        try {
          if (!url.searchParams.has('kref')) {
            const did = posthog?.get_distinct_id?.()
            if (did) {
              url.searchParams.set('kref', did)
              url.searchParams.set('ksrc', window.location.hostname)
            }
          }
          // Forward this session's first-touch source so the destination and its
          // checkout see the true origin, not just the immediate referrer.
          const ft = JSON.parse(sessionStorage.getItem('first_touch') || '{}')
          for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'igshid', 'ttclid', 'msclkid']) {
            if (ft[k] && !url.searchParams.has(k)) url.searchParams.set(k, ft[k])
          }
          anchor.href = url.toString()
        } catch {
          // if the stamp fails, navigation proceeds unmodified
        }
      }

      const payload = {
        from_host: window.location.hostname,
        from_path: window.location.pathname,
        to_host: url.hostname,
        to_url: anchor.href,
        kingdom_internal: isKingdomDestination,
      }

      try {
        posthog?.capture('outbound_link_click', payload)
        window.umami?.track('outbound_link_click', payload)
      } catch {
        // analytics failure must not affect navigation
      }
    }

    document.addEventListener('click', handler, { capture: true })
    return () => document.removeEventListener('click', handler, { capture: true })
  }, [posthog, pathname])

  return null
}
