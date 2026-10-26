'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { nextBarState, isDismissed, dismiss, isSubscribed, markSubscribed } from '@/lib/bottom-bar'
import { umamiTrack } from '@/lib/umami'

// The mobile bottom bar: a thin floating bar that fades in once the page's own
// form or callout has scrolled away (or after one screen when it sits lower),
// leaves on any scroll up, gives way whenever a page form, callout or the footer
// is on screen, and stays away 30 days after the x. Phones only.
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

const compactButton: React.CSSProperties = {
  height: 38,
  padding: '0 14px',
  fontSize: 12,
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'none',
}

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
        wide: window.matchMedia('(min-width: 48rem)').matches, // Tailwind's md, where the class hides it too
      })
      lastY = y
      if (next.shown !== shownRef.current) {
        shownRef.current = next.shown
        setShown(next.shown)
        if (next.shown && !trackedRef.current) {
          trackedRef.current = true
          umamiTrack('bottom_bar_shown', { kind: barKey, path: window.location.pathname })
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
    root.style.scrollPaddingBottom = shown ? '116px' : ''
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
    umamiTrack('bottom_bar_dismissed', { kind: barKey, path: window.location.pathname })
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
      umamiTrack('bottom_bar_signup', { kind: barKey, path: window.location.pathname })
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

  const lineStyle: React.CSSProperties = {
    fontSize: 13.5,
    fontWeight: 500,
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: 26,
  }

  let body: React.ReactNode
  if (props.kind === 'link') {
    body = (
      <>
        <div style={lineStyle}>{props.line}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <a
            href={props.href}
            className="btn-soft-accent"
            style={compactButton}
            onClick={() => umamiTrack('bottom_bar_link_click', { kind: barKey, path: window.location.pathname })}
          >
            {props.button}
          </a>
        </div>
      </>
    )
  } else if (status === 'submitted') {
    body = <div style={{ fontSize: 14, lineHeight: 1.45, color: '#67e8f9', paddingRight: 24 }}>{props.thanks}</div>
  } else if (status === 'forward_failed') {
    body = (
      <div style={{ fontSize: 13.5, lineHeight: 1.45, paddingRight: 24 }}>
        The sign-up did not go through from here.{' '}
        <a href={props.fallbackUrl} style={{ color: '#67e8f9' }}>
          Get it at sidequesthq.co/charter
        </a>
        .
      </div>
    )
  } else {
    body = (
      <>
        <div style={{ ...lineStyle, color: status === 'error' ? 'rgba(240, 130, 110, 0.95)' : undefined }}>
          {status === 'error' && errorMessage ? errorMessage : props.line}
        </div>
        <form onSubmit={onSignup} noValidate style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="email"
            required
            autoComplete="email"
            aria-label="Email"
            placeholder={props.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              minWidth: 0,
              height: 38,
              padding: '0 12px',
              borderRadius: 8,
              background: COLORS.field,
              border: `1px solid ${COLORS.fieldBorder}`,
              color: COLORS.text,
              fontFamily: 'var(--font-body)',
              fontSize: 16, // 16px or more, or iOS Safari zooms the page on focus
              outline: 'none',
            }}
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
          <button type="submit" className="btn-soft-accent" disabled={status === 'submitting'} style={{ ...compactButton, opacity: status === 'submitting' ? 0.6 : 1 }}>
            {status === 'submitting' ? '...' : props.button}
          </button>
        </form>
      </>
    )
  }

  // Rendered into body: a reveal wrapper's transform (SectionReveal ends on translateY(0))
  // would otherwise pin a fixed bar to the section instead of the screen.
  return createPortal(
    <div
      ref={barRef}
      // display lives in the class, not the style: an inline display outranks md:hidden
      className="flex md:hidden kingdom-bottom-bar kbar-frame"
      role="region"
      aria-label={props.line}
      onFocusCapture={onFocusCapture}
      onBlurCapture={onBlurCapture}
      style={{
        position: 'fixed',
        left: 10,
        right: 10,
        bottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
        zIndex: 40,
        minHeight: 92,
        padding: '12px 16px 13px',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 6,
        borderRadius: 14,
        background: COLORS.surface,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid ${COLORS.hairline}`,
        boxShadow: '0 10px 34px rgba(0, 0, 0, 0.55)',
        color: COLORS.text,
        fontFamily: 'var(--font-body)',
        opacity: shown ? 1 : 0,
        visibility: shown ? 'visible' : 'hidden',
        transition: shown ? 'opacity 260ms ease, visibility 0s linear 0s' : 'opacity 260ms ease, visibility 0s linear 260ms',
      }}
    >
      <style>{`
        .kingdom-bottom-bar input::placeholder { color: rgba(226, 232, 240, 0.45); }
        .kingdom-bottom-bar input:focus { border-color: rgba(34, 211, 238, 0.5) !important; }
        /* the static free-action frame (globals.css .action-card): defined and still, no rotating shimmer */
        .kingdom-bottom-bar.kbar-frame {
          border: 1px solid rgba(34, 211, 238, 0.3) !important;
          border-left: 2px solid #22d3ee !important;
          background: linear-gradient(rgba(34, 211, 238, 0.05), rgba(34, 211, 238, 0.05)), rgba(10, 10, 24, 0.95) !important;
        }
      `}</style>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 4,
          right: 4,
          width: 28,
          height: 28,
          display: 'grid',
          placeItems: 'center',
          background: 'none',
          border: 0,
          padding: 0,
          color: COLORS.muted,
          fontSize: 17,
          lineHeight: 1,
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
      {body}
    </div>,
    document.body,
  )
}
