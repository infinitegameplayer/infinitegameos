'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { nextBarState, isDismissed, dismiss, isSubscribed, markSubscribed } from '@/lib/bottom-bar'
import { umamiTrack } from '@/lib/umami'

// The mobile bottom bar: a thin floating bar that fades in once the page's own
// form or callout has scrolled away (or after one screen when it sits lower),
// leaves on any scroll up, gives way whenever a page form, callout or the footer
// is on screen, and stays away 30 days after the x. From 768px it is the dock:
// one row centered on the reading column, under the same rules.
// Two kinds: signup (email only, the same route and body the page's form sends)
// and link (a door to a page elsewhere, used for One Alive Thing on concepts).
// Anchors are any element marked data-bar-anchor outside the bar.
// Plan: Kingdom vault, PendingPlan - Mobile Bottom Bar. Rules live in lib/bottom-bar.

type SignupProps = {
  kind: 'signup'
  list: 'igos-charter' | 'igos-subscribe' // the subscribed flag the page's own form also sets
  endpoint: '/api/charter-signup' | '/api/igos-subscribe'
  line: string
  button: string
  placeholder: string
  thanks: string
  fallbackUrl?: string // shown when the charter forward fails, as the page's form does
  sendSource?: boolean // the subscribe route records the page the sign-up came from
  event: 'charter_signup' | 'igos_subscribe' // the event the page's form sends, so the list's own count holds
}
type LinkProps = { kind: 'link'; barId: string; line: string; button: string; href: string }
type MobileBottomBarProps = SignupProps | LinkProps

const COLORS = {
  surface: 'rgba(10, 10, 24, 0.95)',
  hairline: 'rgba(34, 211, 238, 0.18)',
  text: '#e2e8f0',
  muted: 'rgba(226, 232, 240, 0.58)',
  field: '#12122a',
  fieldBorder: 'rgba(226, 232, 240, 0.14)',
}

const BAR_HEIGHT = 92
const DOCK_HEIGHT = 64
// Tailwind's md. The stylesheet below switches to the dock at the same width.
const DOCK = '(min-width: 48rem)'
const layoutNow = (): 'phone' | 'dock' => (window.matchMedia(DOCK).matches ? 'dock' : 'phone')

// Geometry lives here, never in the style prop: an inline style outranks a media
// query, the fault that once put the phone bar on desktop. Only opacity,
// visibility and the transition stay inline on the bar.
const SHEET = `
  .kingdom-bottom-bar { position: fixed; left: 10px; right: 10px; bottom: calc(10px + env(safe-area-inset-bottom, 0px)); z-index: 40; min-height: ${BAR_HEIGHT}px; padding: 12px 16px 13px; display: flex; flex-direction: column; justify-content: center; gap: 6px; border-radius: 14px; background: ${COLORS.surface}; -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); border: 1px solid ${COLORS.hairline}; box-shadow: 0 10px 34px rgba(0, 0, 0, 0.55); color: ${COLORS.text}; font-family: var(--font-body); }
  .kingdom-bottom-bar .kbar-x { position: absolute; top: 4px; right: 4px; width: 28px; height: 28px; display: grid; place-items: center; background: none; border: 0; padding: 0; color: ${COLORS.muted}; font-size: 17px; line-height: 1; cursor: pointer; }
  .kingdom-bottom-bar .kbar-body { display: flex; flex-direction: column; gap: 6px; }
  .kingdom-bottom-bar .kbar-line { font-size: 13.5px; font-weight: 500; line-height: 1.4; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 26px; }
  .kingdom-bottom-bar .kbar-note { font-size: 13.5px; line-height: 1.45; padding-right: 24px; }
  .kingdom-bottom-bar .kbar-thanks { font-size: 14px; color: #67e8f9; }
  .kingdom-bottom-bar .kbar-row { display: flex; justify-content: flex-end; }
  .kingdom-bottom-bar .kbar-form { display: flex; gap: 8px; align-items: center; }
  .kingdom-bottom-bar .kbar-field { flex: 1; min-width: 0; height: 38px; padding: 0 12px; border-radius: 8px; background: ${COLORS.field}; border: 1px solid ${COLORS.fieldBorder}; color: ${COLORS.text}; font-family: var(--font-body); font-size: 16px; outline: none; }
  .kingdom-bottom-bar .kbar-cta { height: 38px; padding: 0 14px; font-size: 12px; white-space: nowrap; display: inline-flex; align-items: center; justify-content: center; flex: none; }
  .kingdom-bottom-bar input::placeholder { color: rgba(226, 232, 240, 0.45); }
  .kingdom-bottom-bar input:focus { border-color: rgba(34, 211, 238, 0.5) !important; }
  /* the static free-action frame (globals.css .action-card): defined and still, no rotating shimmer */
  .kingdom-bottom-bar.kbar-frame {
    border: 1px solid rgba(34, 211, 238, 0.3) !important;
    border-left: 2px solid #22d3ee !important;
    background: linear-gradient(rgba(34, 211, 238, 0.05), rgba(34, 211, 238, 0.05)), rgba(10, 10, 24, 0.95) !important;
  }
  @media ${DOCK} {
    .kingdom-bottom-bar { left: 0; right: 0; margin-inline: auto; width: min(720px, 100vw - 40px); bottom: calc(20px + env(safe-area-inset-bottom, 0px)); min-height: ${DOCK_HEIGHT}px; padding: 12px 44px 12px 20px; flex-direction: row; align-items: center; gap: 12px; }
    .kingdom-bottom-bar .kbar-x { top: 50%; margin-top: -14px; right: 8px; }
    .kingdom-bottom-bar .kbar-body { flex: 1; min-width: 0; flex-direction: row; align-items: center; gap: 12px; }
    .kingdom-bottom-bar .kbar-line { flex: 1; min-width: 0; font-size: 14.5px; padding-right: 0; }
    .kingdom-bottom-bar .kbar-note { flex: 1; padding-right: 0; }
    .kingdom-bottom-bar .kbar-row, .kingdom-bottom-bar .kbar-form { flex: none; }
    .kingdom-bottom-bar .kbar-field { flex: none; width: 250px; }
  }
`

export default function MobileBottomBar(props: MobileBottomBarProps) {
  const barKey = props.kind === 'signup' ? `signup:${props.list}` : `link:${props.barId}`
  const [active, setActive] = useState(false)
  const [shown, setShown] = useState(false)
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [openedAt] = useState(() => Date.now())
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'forward_failed' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const shownRef = useRef(false)
  const focusedRef = useRef(false)
  const trackedRef = useRef(false)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const s = window.localStorage
    if (isDismissed(s, barKey, Date.now())) return
    if (props.kind === 'signup' && isSubscribed(s, props.list)) return
    setActive(true)
  }, [barKey]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!active) return
    let lastY = window.scrollY
    let frame = 0
    const read = () => {
      frame = 0
      const y = window.scrollY
      const vh = window.innerHeight
      const anchors = Array.from(document.querySelectorAll<HTMLElement>('[data-bar-anchor]')).filter(
        (el) => !el.closest('.kingdom-bottom-bar'),
      )
      const firstBottom = anchors.length ? anchors[0].getBoundingClientRect().bottom + y : vh
      const onScreen = (el: Element) => {
        const r = el.getBoundingClientRect()
        return r.bottom > 0 && r.top < vh
      }
      const footer = document.querySelector('footer')
      const next = nextBarState(shownRef.current, {
        viewportBottom: y + vh,
        // the page's first form or callout has scrolled off the top, or one screen has passed when it sits lower
        triggerY: Math.min(firstBottom, vh) + vh,
        avoiding: anchors.some(onScreen) || (footer !== null && footer.getBoundingClientRect().top < vh),
        delta: y - lastY,
        focused: focusedRef.current,
        dismissed: false,
        subscribed: false,
        wide: layoutNow() === 'dock',
      })
      lastY = y
      if (next.shown !== shownRef.current) {
        shownRef.current = next.shown
        setShown(next.shown)
        if (next.shown && !trackedRef.current) {
          trackedRef.current = true
          umamiTrack('bottom_bar_shown', { kind: barKey, path: window.location.pathname, layout: layoutNow() })
        }
      }
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [active, barKey])

  // Keep a focused field clear of the bar (WCAG 2.4.11) while it shows.
  useEffect(() => {
    const root = document.documentElement
    root.style.scrollPaddingBottom = shown ? `${layoutNow() === 'dock' ? DOCK_HEIGHT + 34 : BAR_HEIGHT + 24}px` : ''
    return () => {
      root.style.scrollPaddingBottom = ''
    }
  }, [shown])

  const leave = () => {
    shownRef.current = false
    setShown(false)
    window.setTimeout(() => setActive(false), 300)
  }

  const onClose = () => {
    dismiss(window.localStorage, barKey, Date.now())
    umamiTrack('bottom_bar_dismissed', { kind: barKey, path: window.location.pathname, layout: layoutNow() })
    leave()
  }

  const onFocusCapture = () => { focusedRef.current = true }
  const onBlurCapture = () => {
    window.setTimeout(() => {
      focusedRef.current = !!barRef.current && barRef.current.contains(document.activeElement)
    }, 0)
  }

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (props.kind !== 'signup' || status === 'submitting') return
    if (!email.trim()) {
      setErrorMessage('Please enter your email.')
      setStatus('error')
      return
    }
    setStatus('submitting')
    setErrorMessage('')
    try {
      const res = await fetch(props.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          honeypot: website,
          openedAt,
          ...(props.sendSource ? { source: window.location.pathname } : {}),
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (body?.error === 'forward_failed' && props.fallbackUrl) {
          setStatus('forward_failed')
          return
        }
        throw new Error(body?.error || `Submission failed (${res.status})`)
      }
      markSubscribed(window.localStorage, props.list)
      umamiTrack('bottom_bar_signup', { kind: barKey, path: window.location.pathname, layout: layoutNow() })
      umamiTrack(props.event, { source: `bottom-bar:${window.location.pathname}` })
      setStatus('submitted')
      focusedRef.current = false
      window.setTimeout(leave, 3200)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  if (!active) return null

  let body: React.ReactNode
  if (props.kind === 'link') {
    body = (
      <div className="kbar-body">
        <div className="kbar-line">{props.line}</div>
        <div className="kbar-row">
          <a
            href={props.href}
            className="btn-soft-accent kbar-cta"
            onClick={() => umamiTrack('bottom_bar_link_click', { kind: barKey, path: window.location.pathname, layout: layoutNow() })}
          >
            {props.button}
          </a>
        </div>
      </div>
    )
  } else if (status === 'submitted') {
    body = <div className="kbar-note kbar-thanks">{props.thanks}</div>
  } else if (status === 'forward_failed') {
    body = (
      <div className="kbar-note">
        The sign-up did not go through from here.{' '}
        <a href={props.fallbackUrl} style={{ color: '#67e8f9' }}>
          Get it at sidequesthq.co/charter
        </a>
        .
      </div>
    )
  } else {
    body = (
      <div className="kbar-body">
        <div className="kbar-line" style={status === 'error' ? { color: 'rgba(240, 130, 110, 0.95)' } : undefined}>
          {status === 'error' && errorMessage ? errorMessage : props.line}
        </div>
        <form onSubmit={onSignup} noValidate className="kbar-form">
          <input
            type="email"
            required
            autoComplete="email"
            aria-label="Email"
            placeholder={props.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="kbar-field" // 16px or more, or iOS Safari zooms the page on focus
          />
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            style={{ position: 'absolute', left: -10000, width: 1, height: 1, overflow: 'hidden' }}
          />
          <button type="submit" className="btn-soft-accent kbar-cta" disabled={status === 'submitting'} style={status === 'submitting' ? { opacity: 0.6 } : undefined}>
            {status === 'submitting' ? '...' : props.button}
          </button>
        </form>
      </div>
    )
  }

  // Rendered into body: a reveal wrapper's transform (SectionReveal ends on translateY(0))
  // would otherwise pin a fixed bar to the section instead of the screen.
  return createPortal(
    <div
      ref={barRef}
      className="kingdom-bottom-bar kbar-frame"
      role="region"
      aria-label={props.line}
      onFocusCapture={onFocusCapture}
      onBlurCapture={onBlurCapture}
      style={{
        opacity: shown ? 1 : 0,
        visibility: shown ? 'visible' : 'hidden',
        transition: shown ? 'opacity 260ms ease, visibility 0s linear 0s' : 'opacity 260ms ease, visibility 0s linear 260ms',
      }}
    >
      <style>{SHEET}</style>
      <button type="button" aria-label="Close" onClick={onClose} className="kbar-x">
        &times;
      </button>
      {body}
    </div>,
    document.body,
  )
}
