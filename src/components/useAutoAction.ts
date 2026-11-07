'use client'

// Runs an email link's action for the reader once a person is plainly on the
// page, and otherwise hands the page its one-tap button. The rule and the
// numbers live in src/lib/auto-action-gate.ts. Mirror across the three sites.

import { useEffect, useState } from 'react'
import { DWELL_MS, REQUEST_TIMEOUT_MS, TAP_AFTER_MS, gateOpen, type GateReading, type GateReport } from '@/lib/auto-action-gate'
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

export function useAutoAction(run: (report: GateReport) => Promise<AutoOutcome>, enabled = true): AutoPhase {
  const [phase, setPhase] = useState<AutoPhase>(enabled ? 'waiting' : 'tap')

  useEffect(() => {
    if (!enabled) return
    const loadedAt = performance.now()
    let settled = false
    let openSince = 0
    let dwellTimer: ReturnType<typeof setTimeout> | null = null
    let tapTimer: ReturnType<typeof setTimeout> | null = null

    const clear = () => {
      if (dwellTimer) clearTimeout(dwellTimer)
      if (tapTimer) clearTimeout(tapTimer)
      dwellTimer = tapTimer = null
    }

    const fire = () => {
      dwellTimer = null
      const reading = read()
      if (settled || !gateOpen(reading)) return
      settled = true
      clear()
      setPhase('working')
      const now = performance.now()
      // A stalled connection hands over the button rather than holding the
      // reader on the waiting line.
      const timeout = new Promise<AutoOutcome>((resolve) => setTimeout(() => resolve('tap'), REQUEST_TIMEOUT_MS))
      Promise.race([run({ ...reading, dwellMs: now - openSince, sinceLoadMs: now - loadedAt }), timeout])
        .then(setPhase)
        .catch(() => setPhase('tap'))
    }

    const showTap = () => {
      tapTimer = null
      if (settled) return
      settled = true
      clear()
      setPhase('tap')
    }

    const check = () => {
      if (settled) return
      const reading = read()
      if (gateOpen(reading)) {
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

    check()
    document.addEventListener('visibilitychange', check)
    window.addEventListener('focus', check)
    window.addEventListener('blur', check)
    return () => {
      settled = true
      clear()
      document.removeEventListener('visibilitychange', check)
      window.removeEventListener('focus', check)
      window.removeEventListener('blur', check)
    }
    // run is read once, at mount: the page acts at most once per visit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  return phase
}
