// Mobile Bottom Bar: the rules for when the bar shows, and the reader's memory
// of closing it or signing up. Pure so the rules are tested apart from the DOM.
// Plan: Kingdom vault, PendingPlan - Mobile Bottom Bar (King-approved 2026-10-25).
// Mirror of the sidequesthq and IGOS copies. Keep them in step.

export const DISMISS_MS = 30 * 24 * 60 * 60 * 1000
// A scroll smaller than this reads as no direction, so a trackpad tremor never flickers the bar.
const DIRECTION_PX = 3

export type BarInput = {
  viewportBottom: number // scrollY + innerHeight, in document px
  triggerY: number // document y the viewport bottom must pass before the bar may show
  avoiding: boolean // something the bar gives way to is on screen: the page's own form or button, or the footer
  delta: number // scrollY change since the last read; positive is down
  focused: boolean // the bar's own field has focus
  dismissed: boolean
  subscribed: boolean
}

export type BarReason =
  | 'subscribed'
  | 'dismissed'
  | 'focused'
  | 'before-trigger'
  | 'giving-way'
  | 'scrolling-up'
  | 'scrolling-down'
  | 'resting'

export function nextBarState(prev: boolean, i: BarInput): { shown: boolean; reason: BarReason } {
  if (i.subscribed) return { shown: false, reason: 'subscribed' }
  if (i.dismissed) return { shown: false, reason: 'dismissed' }
  if (i.focused) return { shown: prev, reason: 'focused' }
  if (i.viewportBottom <= i.triggerY) return { shown: false, reason: 'before-trigger' }
  if (i.avoiding) return { shown: false, reason: 'giving-way' }
  if (i.delta < -DIRECTION_PX) return { shown: false, reason: 'scrolling-up' }
  if (i.delta > DIRECTION_PX) return { shown: true, reason: 'scrolling-down' }
  return { shown: prev, reason: 'resting' }
}

// Storage can throw (Safari private mode, a blocked origin). A failed read means
// the reader has neither closed the bar nor signed up; a failed write is dropped.
function read(s: Storage, key: string): string | null {
  try {
    return s.getItem(key)
  } catch {
    return null
  }
}

function write(s: Storage, key: string, value: string): void {
  try {
    s.setItem(key, value)
  } catch {
    // nothing to keep
  }
}

export function isDismissed(s: Storage, kind: string, now: number): boolean {
  const at = Number(read(s, `kbar:dismissed:${kind}`))
  return Number.isFinite(at) && at > 0 && now - at < DISMISS_MS
}

export function dismiss(s: Storage, kind: string, now: number): void {
  write(s, `kbar:dismissed:${kind}`, String(now))
}

export function isSubscribed(s: Storage, list: string): boolean {
  return read(s, `kbar:subscribed:${list}`) === '1'
}

export function markSubscribed(s: Storage, list: string): void {
  write(s, `kbar:subscribed:${list}`, '1')
}
