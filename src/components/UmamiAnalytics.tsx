'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { isNoTrackPath } from '@/lib/no-track'

// Umami pageview script, gated off privacy routes. The preference center entry
// URL carries the subscriber email and a live token, so the script never loads
// there. Everywhere else it behaves exactly as the inline layout tag did.
export function UmamiAnalytics() {
  const pathname = usePathname()
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
  if (!websiteId || isNoTrackPath(pathname)) return null
  return (
    <Script
      defer
      src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  )
}
