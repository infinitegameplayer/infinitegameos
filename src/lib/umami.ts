// Umami event helper. Mirror of the lanebelone and IGOS copies. Keep byte-identical.
//
// The Umami script loads with strategy="afterInteractive", which lands after
// React hydration. Any event sent from a mount-time useEffect therefore ran
// before window.umami existed, and `window.umami?.track(...)` discarded it with
// no error, no log and no failed request. Click-time events worked because by
// the time a human clicks, the script has arrived.
//
// The result held for three months without anything reporting a problem:
// cross_site_arrival recorded zero events in its first 82 days, and
// product_page_view fired on roughly a quarter of the page views it was
// counting. The optional chain was the silence.
//
// This queues events until the script is present, then flushes in order. It is
// a no-op wrapper when window.umami already exists, so click-time paths behave
// exactly as before. Verified by Council Chamber/scripts/verify-umami-mount-events.mjs,
// which was watched fail against production before this landed.

type UmamiPayload = Record<string, unknown>

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void
      identify: (data: Record<string, unknown>) => void
    }
  }
}

type Queued =
  | { kind: 'track'; name: string; data?: UmamiPayload }
  | { kind: 'identify'; data: UmamiPayload }

// The script is loaded by a component on the page, so it arrives within a few
// hundred milliseconds or it is blocked. Stop waiting rather than holding a
// timer open for the life of the session.
const MAX_WAIT_MS = 15000
const POLL_MS = 200

let queue: Queued[] = []
let polling = false

function flush(): boolean {
  if (typeof window === 'undefined' || !window.umami) return false
  const pending = queue
  queue = []
  for (const item of pending) {
    try {
      if (item.kind === 'track') window.umami.track(item.name, item.data)
      else window.umami.identify(item.data)
    } catch {
      // Analytics failure never breaks the page.
    }
  }
  return true
}

function startPolling(): void {
  if (polling || typeof window === 'undefined') return
  polling = true
  const startedAt = Date.now()
  const timer = window.setInterval(() => {
    if (flush() || Date.now() - startedAt > MAX_WAIT_MS) {
      window.clearInterval(timer)
      polling = false
    }
  }, POLL_MS)
}

function enqueue(item: Queued): void {
  if (typeof window === 'undefined') return
  queue.push(item)
  if (!flush()) startPolling()
}

export function umamiTrack(name: string, data?: UmamiPayload): void {
  enqueue({ kind: 'track', name, data })
}

export function umamiIdentify(data: UmamiPayload): void {
  enqueue({ kind: 'identify', data })
}
