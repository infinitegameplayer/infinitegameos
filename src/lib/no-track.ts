// Routes that must carry no analytics and no pixels. The preference center is a
// privacy surface: its entry URL holds the subscriber email and a live signed
// token, so no pageview, session recording, pixel or click tracker may observe
// it. Mirror of the lanebelone copy. Keep the two byte-identical.

export const NO_TRACK_PREFIXES = ['/preferences']

export function isNoTrackPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  return NO_TRACK_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}
