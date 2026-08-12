// Routes and hosts that must carry no analytics and no pixels. The preference
// center is a privacy surface: its entry URL holds the subscriber email and a
// live signed token, so no pageview, session recording, pixel or click tracker
// may observe it. Mirror of the lanebelone and IGOS copies. Keep byte-identical.

export const NO_TRACK_PREFIXES = ['/preferences']

export function isNoTrackPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  return NO_TRACK_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

// Hosts that are not the live public site. Development servers and Vercel
// deployment URLs were writing real pageviews into the production analytics
// projects, so a local session and a preview build both counted as audience.
// The production sites are served on their custom domains, so gating the
// deployment URLs costs nothing and keeps the numbers about actual visitors.
export function isNonPublicHost(hostname: string | null | undefined): boolean {
  if (!hostname) return false
  const host = hostname.toLowerCase()
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '[::1]' ||
    host.endsWith('.local') ||
    host.endsWith('.vercel.app')
  )
}
