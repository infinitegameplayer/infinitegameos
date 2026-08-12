'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { isNoTrackPath, isNonPublicHost } from '@/lib/no-track'

// Umami pageview script, gated off privacy routes and off non-public hosts. The
// preference center entry URL carries the subscriber email and a live token, so
// the script never loads there. Development servers and Vercel deployment URLs
// were counting as audience in the canonical traffic baseline, so they are gated
// too. The host check runs after mount because the server render has no window,
// and a server-client disagreement here would be a hydration error.
export function UmamiAnalytics() {
  const pathname = usePathname()
  const [publicHost, setPublicHost] = useState(false)
  useEffect(() => {
    setPublicHost(!isNonPublicHost(window.location.hostname))
  }, [])
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
