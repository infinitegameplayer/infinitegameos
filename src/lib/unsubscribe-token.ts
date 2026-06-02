// HMAC-SHA256 token for unsubscribe links. Mirror of the lanebelone and
// SQHQ implementations. The same UNSUBSCRIBE_SECRET env var must be set
// across all three sites so a token minted on one can be redeemed on
// any. Kingdom Data OS contact ring consequence: one secret, one trust
// graph across surfaces.

import { createHmac, timingSafeEqual } from 'crypto'

function getSecret(): string {
  const secret = process.env.UNSUBSCRIBE_SECRET
  if (!secret) {
    throw new Error('UNSUBSCRIBE_SECRET env var is required for unsubscribe handling')
  }
  return secret
}

export function signEmailToken(email: string): string {
  const normalized = email.trim().toLowerCase()
  return createHmac('sha256', getSecret()).update(normalized).digest('hex').slice(0, 32)
}

export function verifyEmailToken(email: string, token: string): boolean {
  if (typeof token !== 'string' || token.length !== 32) return false
  const expected = signEmailToken(email)
  try {
    return timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(token, 'hex'))
  } catch {
    return false
  }
}

// ─── Expiring token (preference page entry) ──────────────────────────────
// The deterministic signEmailToken is a permanent key. Fine for one-click
// unsubscribe, whose worst case is a recoverable unsubscribe. The preference
// page exposes more, so its entry link expires. The token signs over the email
// and an expiry, so a leaked or forwarded link stops working after the window.
// Format: `<expBase36>.<sig32>`. The dot distinguishes it from the 32-hex
// deterministic token, so a route can accept either by shape.

const EXPIRING_TTL_DEFAULT_SECONDS = 60 * 60 * 24 * 30 // 30 days
const EXPIRING_TTL_MAGIC_LINK_SECONDS = 60 * 60 // 1 hour, for the fresh-link fallback

export { EXPIRING_TTL_DEFAULT_SECONDS, EXPIRING_TTL_MAGIC_LINK_SECONDS }

function signExpiringPayload(email: string, expSeconds: number): string {
  const normalized = email.trim().toLowerCase()
  return createHmac('sha256', getSecret())
    .update(`${normalized}:${expSeconds}`)
    .digest('hex')
    .slice(0, 32)
}

export function signExpiringToken(
  email: string,
  ttlSeconds: number = EXPIRING_TTL_DEFAULT_SECONDS,
  nowMs: number = Date.now(),
): string {
  const expSeconds = Math.floor(nowMs / 1000) + ttlSeconds
  const sig = signExpiringPayload(email, expSeconds)
  return `${expSeconds.toString(36)}.${sig}`
}

export type ExpiringTokenStatus = 'valid' | 'expired' | 'invalid'

// Signature is checked before expiry. A bad signature reads 'invalid', a good
// signature past its window reads 'expired'. The page treats 'expired' and
// 'invalid' identically (the fresh-link fallback), so a probe with a forged
// token learns nothing about whether the email is on file.
export function verifyExpiringToken(
  email: string,
  token: string,
  nowMs: number = Date.now(),
): ExpiringTokenStatus {
  if (typeof token !== 'string') return 'invalid'
  const parts = token.split('.')
  if (parts.length !== 2) return 'invalid'
  const [expPart, sig] = parts
  if (sig.length !== 32) return 'invalid'
  const expSeconds = parseInt(expPart, 36)
  if (!Number.isFinite(expSeconds)) return 'invalid'

  const expected = signExpiringPayload(email, expSeconds)
  let signatureOk = false
  try {
    signatureOk = timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(sig, 'hex'))
  } catch {
    return 'invalid'
  }
  if (!signatureOk) return 'invalid'
  if (expSeconds * 1000 < nowMs) return 'expired'
  return 'valid'
}

// Accept either token class. The list-aware preference routes call this so a
// page entered by an expiring link can drive the same toggles as a one-click
// link. Returns true only for a deterministic match or a valid (unexpired)
// expiring token.
export function verifyAnyToken(email: string, token: string): boolean {
  if (verifyEmailToken(email, token)) return true
  return verifyExpiringToken(email, token) === 'valid'
}
