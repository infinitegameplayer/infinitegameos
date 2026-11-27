// The daily salt and the marker built from it. The salt lives in Supabase
// (page_request_salt(), one row per UTC day by the database clock, older rows
// deleted on every call). Each instance caches it until that UTC day ends, so
// the deletion rides the first write of each day and needs no cron.
//
// The marker is SHA-256 over the salt, the IP and the user agent, cut to 64
// bits. The site is left out, so one visitor reads as one marker across the
// three sites within a day (Decision 10). After the day ends and its salt is
// gone, no one can recompute it.

export type SaltRecord = { day: string; salt: string }

const RETRY_AFTER_MS = 60_000

export function createSaltSource(fetchSalt: () => Promise<SaltRecord>) {
  let cached: { salt: string; expires: number } | null = null
  let inflight: Promise<string | null> | null = null
  let failedUntil = 0

  async function load(nowMs: number): Promise<string | null> {
    try {
      const rec = await fetchSalt()
      if (!/^\d{4}-\d{2}-\d{2}$/.test(rec.day) || !/^[0-9a-f]{64}$/.test(rec.salt)) throw new Error('malformed salt record')
      // Valid until the end of the database's UTC day.
      const expires = Date.parse(`${rec.day}T00:00:00Z`) + 86_400_000
      cached = { salt: rec.salt, expires }
      return rec.salt
    } catch (err) {
      // A missing salt costs only the marker on this minute's rows; retry later.
      // One line per failure window, the error's name only, never the salt.
      console.error(`agent-log: salt unavailable (${err instanceof Error ? err.message.slice(0, 40) : 'error'}), markers blank for a minute`)
      failedUntil = nowMs + RETRY_AFTER_MS
      return null
    }
  }

  return {
    async get(now: Date): Promise<string | null> {
      const t = now.getTime()
      if (cached && t < cached.expires) return cached.salt
      if (t < failedUntil) return null
      if (!inflight) inflight = load(t).finally(() => { inflight = null })
      return inflight
    },
  }
}

export async function visitorDay(salt: string, ip: string, userAgent: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}\n${ip}\n${userAgent}`)
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', data))
  let hex = ''
  for (let i = 0; i < 8; i++) hex += digest[i].toString(16).padStart(2, '0')
  return hex
}
