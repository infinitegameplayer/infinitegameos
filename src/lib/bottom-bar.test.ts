import { describe, it, expect } from 'vitest'
import {
  nextBarState,
  isDismissed,
  dismiss,
  isSubscribed,
  markSubscribed,
  DISMISS_MS,
  type BarInput,
} from './bottom-bar'

// The Mobile Bottom Bar rules (PendingPlan - Mobile Bottom Bar, The Shape).
// A reader sees the bar once past the trigger while scrolling down. It leaves on
// any scroll up, holds still while
// its field has focus, gives way to the page's own form or button and the footer,
// and stays away after the x or a sign-up.

const base: BarInput = {
  viewportBottom: 1000,
  triggerY: 2000,
  avoiding: false,
  delta: 0,
  focused: false,
  dismissed: false,
  subscribed: false,
  wide: false,
}

describe('nextBarState', () => {
  it('shows on a wide screen scrolling down past the trigger (the dock)', () => {
    const r = nextBarState(false, { ...base, viewportBottom: 2300, delta: 40, wide: true })
    expect(r.shown).toBe(true)
    expect(r.reason).toBe('scrolling-down')
  })

  it('hides on a wide screen scrolling up, as on a phone', () => {
    expect(nextBarState(true, { ...base, viewportBottom: 2300, delta: -40, wide: true }).shown).toBe(false)
  })

  it('keeps every other rule on a wide screen', () => {
    const wide = { ...base, viewportBottom: 2300, wide: true }
    expect(nextBarState(false, { ...wide, viewportBottom: 1500, delta: 40 }).shown).toBe(false)
    expect(nextBarState(true, { ...wide, avoiding: true, delta: 40 }).shown).toBe(false)
    expect(nextBarState(true, { ...wide, delta: -40, focused: true }).shown).toBe(true)
    expect(nextBarState(true, { ...wide, delta: 40, dismissed: true }).shown).toBe(false)
  })

  it('stays hidden before the trigger', () => {
    expect(nextBarState(false, { ...base, viewportBottom: 1500, delta: 40 }).shown).toBe(false)
  })

  it('shows when scrolling down past the trigger', () => {
    expect(nextBarState(false, { ...base, viewportBottom: 2300, delta: 40 }).shown).toBe(true)
  })

  it('hides on a scroll up past the trigger', () => {
    expect(nextBarState(true, { ...base, viewportBottom: 2300, delta: -40 }).shown).toBe(false)
  })

  it('keeps its state on a scroll too small to read as a direction', () => {
    expect(nextBarState(true, { ...base, viewportBottom: 2300, delta: 1 }).shown).toBe(true)
    expect(nextBarState(false, { ...base, viewportBottom: 2300, delta: -1 }).shown).toBe(false)
  })

  it('gives way while the page form, button or footer is on screen', () => {
    expect(nextBarState(true, { ...base, viewportBottom: 3100, avoiding: true, delta: 40 }).shown).toBe(false)
  })

  it('returns once nothing it gives way to is on screen', () => {
    expect(nextBarState(false, { ...base, viewportBottom: 2900, avoiding: false, delta: 40 }).shown).toBe(true)
  })

  it('holds still while its field has focus, even scrolling up', () => {
    expect(nextBarState(true, { ...base, viewportBottom: 2300, delta: -40, focused: true }).shown).toBe(true)
  })

  it('stays away after the x', () => {
    expect(nextBarState(true, { ...base, viewportBottom: 2300, delta: 40, dismissed: true }).shown).toBe(false)
  })

  it('stays away after a sign-up', () => {
    expect(nextBarState(true, { ...base, viewportBottom: 2300, delta: 40, subscribed: true }).shown).toBe(false)
  })

  it('names why it decided', () => {
    expect(nextBarState(false, { ...base, viewportBottom: 2300, delta: 40 }).reason).toBe('scrolling-down')
    expect(nextBarState(true, { ...base, viewportBottom: 3100, avoiding: true, delta: 40 }).reason).toBe('giving-way')
  })
})

function memoryStorage(): Storage {
  const m = new Map<string, string>()
  return {
    get length() { return m.size },
    clear: () => m.clear(),
    getItem: (k: string) => (m.has(k) ? (m.get(k) as string) : null),
    key: (i: number) => [...m.keys()][i] ?? null,
    removeItem: (k: string) => { m.delete(k) },
    setItem: (k: string, v: string) => { m.set(k, String(v)) },
  }
}

const throwing: Storage = {
  length: 0,
  clear: () => { throw new Error('denied') },
  getItem: () => { throw new Error('denied') },
  key: () => { throw new Error('denied') },
  removeItem: () => { throw new Error('denied') },
  setItem: () => { throw new Error('denied') },
}

describe('dismissal memory', () => {
  it('holds for 30 days, then lapses', () => {
    const s = memoryStorage()
    const t0 = Date.UTC(2026, 9, 25)
    dismiss(s, 'articles', t0)
    expect(isDismissed(s, 'articles', t0 + DISMISS_MS - 1)).toBe(true)
    expect(isDismissed(s, 'articles', t0 + DISMISS_MS + 1)).toBe(false)
    expect(DISMISS_MS).toBe(30 * 24 * 60 * 60 * 1000)
  })

  it('is kept per bar kind', () => {
    const s = memoryStorage()
    dismiss(s, 'articles', 0)
    expect(isDismissed(s, 'charter', 1)).toBe(false)
  })

  it('reads storage that throws as not dismissed, and writing to it does not throw', () => {
    expect(isDismissed(throwing, 'articles', 0)).toBe(false)
    expect(() => dismiss(throwing, 'articles', 0)).not.toThrow()
  })
})

describe('subscribed flag', () => {
  it('is kept per list', () => {
    const s = memoryStorage()
    markSubscribed(s, 'lanebelone-articles')
    expect(isSubscribed(s, 'lanebelone-articles')).toBe(true)
    expect(isSubscribed(s, 'lanebelone-newsletter')).toBe(false)
  })

  it('reads storage that throws as not subscribed', () => {
    expect(isSubscribed(throwing, 'lanebelone-articles')).toBe(false)
    expect(() => markSubscribed(throwing, 'lanebelone-articles')).not.toThrow()
  })
})
