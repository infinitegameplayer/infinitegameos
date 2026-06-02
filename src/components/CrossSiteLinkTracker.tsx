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

export function CrossSiteLinkTracker() {
  const posthog = usePostHog()
  const pathname = usePathname()

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
