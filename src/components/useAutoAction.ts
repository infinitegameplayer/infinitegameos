'use client'

// Runs an email link's action for the reader once a person is plainly on the
// page, and otherwise hands the page its one-tap button. The rule and the
// numbers live in src/lib/auto-action-gate.ts. Mirror across the three sites.

import { useEffect, useState } from 'react'
import { DWELL_MS, REQUEST_TIMEOUT_MS, TAP_AFTER_MS, gateOpen, type GateCause, type GateKind, type GateReading, type GateReport } from '@/lib/auto-action-gate'
import { isAutomatedBrowser } from '@/lib/no-track'

export type AutoOutcome = 'done' | 'already' | 'tap'
export type AutoPhase = 'waiting' | 'working' | AutoOutcome

function read(): GateReading {
  return {
    visible: document.visibilityState === 'visible',
    focused: document.hasFocus(),
    automated: isAutomatedBrowser(),
  }
}

// Tells the server why the button appeared when the server itself never heard
// (auto-action-gate.ts, GateBeacon). It goes by fetch first, so BotID can read
// it; if that fetch dies in the browser it goes again by sendBeacon, and the
// log line names which one arrived. It never throws and never changes the page.
function reportGate(
  cause: GateCause,
  reading: GateReading,
  extra: { firstReading: GateReading | null; events: number; sinceLoadMs: number; error?: unknown }
) {
  try {
    const nav = navigator as Navigator & { brave?: unknown }
    const payload = {
      cause,
      page: location.pathname,
      ...reading,
      webdriver: nav.webdriver === true,
      headless: /HeadlessChrome/i.test(nav.userAgent),
      brave: typeof nav.brave !== 'undefined',
      firstReading: extra.firstReading,
      events: extra.events,
      sinceLoadMs: extra.sinceLoadMs,
      error: extra.error === undefined ? null : String(extra.error instanceof Error ? `${extra.error.name}: ${extra.error.message}` : extra.error),
    }
    const beacon = () => {
      try {
        navigator.sendBeacon?.('/api/gate-reading', new Blob([JSON.stringify({ ...payload, transport: 'beacon' })], { type: 'application/json' }))
      } catch {}
    }
    fetch('/api/gate-reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, transport: 'fetch' }),
      keepalive: true,
    }).catch(beacon)
  } catch {}
}

// kind: 'join' for a page that adds the reader to a list, which acts without
// the focus check; anything else keeps the strict gate (auto-action-gate.ts).
export function useAutoAction(run: (report: GateReport) => Promise<AutoOutcome>, enabled = true, kind: GateKind = 'leave'): AutoPhase {
  const [phase, setPhase] = useState<AutoPhase>(enabled ? 'waiting' : 'tap')

  useEffect(() => {
    if (!enabled) return
    const loadedAt = performance.now()
    let settled = false
    let openSince = 0
    let dwellTimer: ReturnType<typeof setTimeout> | null = null
    let tapTimer: ReturnType<typeof setTimeout> | null = null
    // For the gate-reading line: what the page read first, and how many focus
    // and visibility events reached it after that.
    let firstReading: GateReading | null = null
    let events = 0
    const diag = (error?: unknown) => ({ firstReading, events, sinceLoadMs: performance.now() - loadedAt, error })

    const clear = () => {
      if (dwellTimer) clearTimeout(dwellTimer)
      if (tapTimer) clearTimeout(tapTimer)
      dwellTimer = tapTimer = null
    }

    const fire = () => {
      dwellTimer = null
      const reading = read()
      if (settled || !gateOpen(reading, kind)) return
      settled = true
      clear()
      setPhase('working')
      const now = performance.now()
      // A stalled connection hands over the button rather than holding the
      // reader on the waiting line.
      const timeout = new Promise<'timeout'>((resolve) => setTimeout(() => resolve('timeout'), REQUEST_TIMEOUT_MS))
      Promise.race([run({ ...reading, dwellMs: now - openSince, sinceLoadMs: now - loadedAt }), timeout])
        .then((outcome) => {
          if (outcome === 'timeout') {
            reportGate('request-timeout', reading, diag())
            setPhase('tap')
          } else setPhase(outcome)
        })
        .catch((err) => {
          reportGate('request-threw', reading, diag(err))
          setPhase('tap')
        })
    }

    const showTap = () => {
      tapTimer = null
      if (settled) return
      settled = true
      clear()
      reportGate('gate-closed', read(), diag())
      setPhase('tap')
    }

    const check = () => {
      if (settled) return
      const reading = read()
      if (!firstReading) firstReading = reading
      if (gateOpen(reading, kind)) {
        // A person is here: the dwell runs and the button waits, so focus that
        // arrives late (some in-app mail browsers) still gets the one click.
        if (tapTimer) {
          clearTimeout(tapTimer)
          tapTimer = null
        }
        if (!dwellTimer) {
          openSince = performance.now()
          dwellTimer = setTimeout(fire, DWELL_MS)
        }
        return
      }
      if (dwellTimer) {
        clearTimeout(dwellTimer)
        dwellTimer = null
      }
      // The button appears once the page has been on screen this long without
      // the checks passing. A background tab waits until it is seen.
      if (reading.visible) {
        if (!tapTimer) tapTimer = setTimeout(showTap, TAP_AFTER_MS)
      } else if (tapTimer) {
        clearTimeout(tapTimer)
        tapTimer = null
      }
    }

    const onEvent = () => {
      events++
      check()
    }

    check()
    document.addEventListener('visibilitychange', onEvent)
    window.addEventListener('focus', onEvent)
    window.addEventListener('blur', onEvent)
    return () => {
      settled = true
      clear()
      document.removeEventListener('visibilitychange', onEvent)
      window.removeEventListener('focus', onEvent)
      window.removeEventListener('blur', onEvent)
    }
    // run is read once, at mount: the page acts at most once per visit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  return phase
}
