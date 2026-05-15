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
