import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FIRST_TOUCH_KEY, FIRST_TOUCH_TTL_MS, readFirstTouch, rememberFirstTouch } from './client-attribution'

class FakeStorage {
  map = new Map<string, string>()
  getItem(k: string) {
    return this.map.has(k) ? this.map.get(k)! : null
  }
  setItem(k: string, v: string) {
    this.map.set(k, String(v))
  }
  removeItem(k: string) {
    this.map.delete(k)
  }
}

class ThrowingStorage {
  getItem(): string | null {
    throw new Error('SecurityError')
  }
  setItem() {
    throw new Error('QuotaExceededError')
  }
  removeItem() {
    throw new Error('SecurityError')
  }
}

let local: FakeStorage
let session: FakeStorage
const NOW = Date.UTC(2026, 10, 4)

beforeEach(() => {
  local = new FakeStorage()
  session = new FakeStorage()
  vi.stubGlobal('localStorage', local)
  vi.stubGlobal('sessionStorage', session)
  vi.stubGlobal('location', { hostname: 'www.infinitegameos.io' })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

const kept = () => JSON.parse(local.getItem(FIRST_TOUCH_KEY) || 'null')

describe('first touch kept for a year', () => {
  it('writes the record to localStorage with a numeric ts', () => {
    rememberFirstTouch({ utm_source: 'substack', referrer: 'https://lanebelone.substack.com/p/x' }, NOW)
    expect(kept()).toEqual({ utm_source: 'substack', referrer: 'https://lanebelone.substack.com/p/x', ts: NOW })
  })

  it('keeps the first record over a later visit with other UTMs', () => {
    rememberFirstTouch({ utm_source: 'substack', utm_medium: 'email' }, NOW)
    rememberFirstTouch({ utm_source: 'linkedin' }, NOW + 30 * 24 * 3600 * 1000)
    expect(kept()).toEqual({ utm_source: 'substack', utm_medium: 'email', ts: NOW })
    expect(readFirstTouch(NOW + 31 * 24 * 3600 * 1000)).toEqual({ utm_source: 'substack', utm_medium: 'email' })
  })

  it('drops a record older than 365 days and lets the current visit become first touch', () => {
    local.setItem(FIRST_TOUCH_KEY, JSON.stringify({ utm_source: 'old', ts: NOW - FIRST_TOUCH_TTL_MS - 1 }))
    expect(readFirstTouch(NOW)).toEqual({})
    expect(local.getItem(FIRST_TOUCH_KEY)).toBeNull()
    rememberFirstTouch({ utm_source: 'new' }, NOW)
    expect(kept()).toEqual({ utm_source: 'new', ts: NOW })
  })

  it('removes an entry with no numeric ts or that does not parse', () => {
    local.setItem(FIRST_TOUCH_KEY, JSON.stringify({ utm_source: 'x', ts: '123' }))
    expect(readFirstTouch(NOW)).toEqual({})
    expect(local.getItem(FIRST_TOUCH_KEY)).toBeNull()
    local.setItem(FIRST_TOUCH_KEY, '{not json')
    expect(readFirstTouch(NOW)).toEqual({})
    expect(local.getItem(FIRST_TOUCH_KEY)).toBeNull()
  })

  it('carries a session-only record into localStorage in place of the current visit', () => {
    session.setItem(FIRST_TOUCH_KEY, JSON.stringify({ utm_source: 'earlier', utm_campaign: 'fall' }))
    expect(readFirstTouch(NOW)).toEqual({ utm_source: 'earlier', utm_campaign: 'fall' })
    rememberFirstTouch({ utm_source: 'current' }, NOW)
    expect(kept()).toEqual({ utm_source: 'earlier', utm_campaign: 'fall', ts: NOW })
  })

  it('does not keep an own-host, Stripe or unparseable referrer', () => {
    rememberFirstTouch({ utm_source: 'a', referrer: 'https://www.infinitegameos.io/the-os' }, NOW)
    expect(kept()).toEqual({ utm_source: 'a', ts: NOW })
    local.map.clear()
    rememberFirstTouch({ utm_source: 'b', referrer: 'https://checkout.stripe.com/c/pay' }, NOW)
    expect(kept()).toEqual({ utm_source: 'b', ts: NOW })
    local.map.clear()
    rememberFirstTouch({ utm_source: 'c', referrer: 'not a url' }, NOW)
    expect(kept()).toEqual({ utm_source: 'c', ts: NOW })
    local.map.clear()
    rememberFirstTouch({ referrer: 'https://infinitegameos.io/' }, NOW)
    expect(local.getItem(FIRST_TOUCH_KEY)).toBeNull()
  })

  it('returns an empty object when nothing is kept', () => {
    expect(readFirstTouch(NOW)).toEqual({})
  })

  it('never throws when storage throws', () => {
    vi.stubGlobal('localStorage', new ThrowingStorage())
    vi.stubGlobal('sessionStorage', new ThrowingStorage())
    expect(() => rememberFirstTouch({ utm_source: 'x' }, NOW)).not.toThrow()
    expect(readFirstTouch(NOW)).toEqual({})
  })

  it('never throws when storage is missing', () => {
    vi.stubGlobal('localStorage', undefined)
    vi.stubGlobal('sessionStorage', undefined)
    expect(() => rememberFirstTouch({ utm_source: 'x' }, NOW)).not.toThrow()
    expect(readFirstTouch(NOW)).toEqual({})
  })
})
