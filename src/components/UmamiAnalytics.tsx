'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useSyncExternalStore } from 'react'
import { isNoTrackPath, isNonPublicHost } from '@/lib/no-track'

// Umami pageview script, gated off privacy routes and off non-public hosts. The
// preference center entry URL carries the subscriber email and a live token, so
// the script never loads there. Development servers and Vercel deployment URLs
// were counting as audience in the canonical traffic baseline, so they are gated
// too. The host check reads window through useSyncExternalStore with a server
// snapshot of false, so the server render and the first client render agree
// and the real host is read once hydration completes. This replaces the
// setState-in-effect form, which react-hooks 7 flags.
const subscribeToNothing = () => () => {}
const readPublicHost = () => !isNonPublicHost(window.location.hostname)
const serverPublicHost = () => false

export function UmamiAnalytics() {
  const pathname = usePathname()
  const publicHost = useSyncExternalStore(subscribeToNothing, readPublicHost, serverPublicHost)
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  if (!websiteId || !publicHost || isNoTrackPath(pathname)) return null
  return (
    <Script
      defer
      src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  )
}
