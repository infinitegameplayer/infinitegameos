import Link from 'next/link'
import SectionReveal from '@/components/SectionReveal'
import SubscribeForm from '@/components/SubscribeForm'
import MobileBottomBar from '@/components/MobileBottomBar'
import CopyButton from '@/components/CopyButton'
import ThreadLink from '@/components/ThreadLink'
import { CLOSE_TITLE, SLOT_KICKER, TOP_KICKER, type Thread, type ThreadCard, type ThreadSlot } from '@/data/threads'
import { resolvePage, type ResolvedPage } from '@/lib/thread-resolve'

// The web of intrigue on one page (PendingPlan - IGOS Web of Intrigue): the
// trail line and one onward card at the top, for the reader about to leave, and
// the close for the reader who finishes: three cards, the updates letter, then
// "Also in the lab". Rendered only on pages with a thread-map entry.

const SITE = 'https://www.infinitegameos.io'

// The trail line: where the page sits, in the same order as its BreadcrumbList
// JSON-LD (Home, section, page). The page itself is the H1 below it.
export function TrailLine({ section, sectionHref, from }: { section: string; sectionHref: string; from: string }) {
  const link = { color: 'var(--color-muted)', textDecoration: 'none' }
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem' }}>
      <ol
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          color: 'var(--color-muted)',
        }}
      >
        <li>
          <ThreadLink href="/" event="trail_click" from={from} style={link}>
            Infinite Game OS
          </ThreadLink>
        </li>
        <li aria-hidden>›</li>
        <li>
          <ThreadLink href={sectionHref} event="trail_click" from={from} style={link}>
            {section}
          </ThreadLink>
        </li>
      </ol>
    </nav>
  )
}

const kickerStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.8125rem',
  letterSpacing: '0.01em',
  color: 'var(--color-accent)',
  margin: '0 0 0.75rem',
} as const

const questionStyle = {
  fontFamily: 'var(--font-display)',
  fontWeight: 500,
  fontSize: '1.3rem',
  lineHeight: 1.35,
  color: 'var(--color-text)',
  margin: '0 0 0.85rem',
} as const

const titleStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.9rem',
  lineHeight: 1.5,
  color: 'var(--color-muted)',
  margin: 0,
} as const

// One onward card above the fold, in the place the pathBridge holds on the
// pages that carry one.
export function TopCard({ card, from }: { card: NonNullable<Thread['top']>; from: string }) {
  const dest = resolvePage(card.href)
  if (!dest) return null
  return (
    <div className="section" style={{ paddingTop: 0, paddingBottom: '1rem' }}>
      <SectionReveal>
        <ThreadLink
          href={dest.href}
          event="thread_card"
          from={from}
          slot="top"
          style={{
            display: 'block',
            textDecoration: 'none',
            padding: '1.5rem 1.75rem',
            border: '1px solid var(--color-border)',
            borderLeft: '3px solid var(--color-accent)',
            borderRadius: '12px',
            background: 'var(--color-card, rgba(255, 255, 255, 0.02))',
          }}
        >
          <p className="label" style={{ marginBottom: '0.85rem' }}>
            {TOP_KICKER}
          </p>
          <p style={questionStyle}>{card.question}</p>
          <p style={{ ...titleStyle, color: 'var(--color-accent)' }}>
            <span aria-hidden style={{ marginRight: '0.5rem' }}>→</span>
            {dest.title}
          </p>
        </ThreadLink>
      </SectionReveal>
    </div>
  )
}

const cardFrame = {
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem',
  border: '1px solid var(--color-border)',
  borderRadius: '12px',
  background: 'var(--color-card, rgba(255, 255, 255, 0.02))',
  textDecoration: 'none',
  height: '100%',
  boxSizing: 'border-box',
} as const

function CloseCard({ slot, card, from }: { slot: Exclude<ThreadSlot, 'top'>; card: ThreadCard; from: string }) {
  const kicker = <p style={kickerStyle}>{SLOT_KICKER[slot]}</p>

  if (card.kind === 'page') {
    const dest = resolvePage(card.href)
    if (!dest) return null
    return (
      <ThreadLink href={dest.href} event="thread_card" from={from} slot={slot} className="card" style={cardFrame}>
        {kicker}
        <p style={questionStyle}>{card.question}</p>
        <p style={{ ...titleStyle, marginTop: 'auto', color: 'var(--color-accent)' }}>
          <span aria-hidden style={{ marginRight: '0.5rem' }}>→</span>
          {dest.title}
        </p>
      </ThreadLink>
    )
  }

  if (card.kind === 'external') {
    return (
      <a href={card.href} className="card" style={cardFrame}>
        {kicker}
        <p style={questionStyle}>{card.question}</p>
        <p style={{ ...titleStyle, marginTop: 'auto', color: 'var(--color-accent)' }}>
          <span aria-hidden style={{ marginRight: '0.5rem' }}>→</span>
          {card.title}
        </p>
      </a>
    )
  }

  if (card.kind === 'install') {
    const lines = `/plugin marketplace add ${SITE}/marketplace.json\n/plugin install ${card.skill}@igos-library`
    return (
      <div className="action-card" style={{ ...cardFrame, border: undefined, background: undefined }}>
        {kicker}
        <p style={questionStyle}>{card.question}</p>
        <p style={{ ...titleStyle, marginBottom: '0.75rem' }}>Two lines in Claude Code:</p>
        <pre
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '0.85rem',
            borderRadius: '6px',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'anywhere',
            fontSize: '0.75rem',
            lineHeight: 1.6,
            margin: '0 0 1rem',
          }}
        >
          <code style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{lines}</code>
        </pre>
        <div style={{ marginTop: 'auto' }}>
          <CopyButton text={lines} label="Copy both lines" />
        </div>
      </div>
    )
  }

  // practice: the move itself, on the page, nothing to click.
  return (
    <div className="action-card" style={{ ...cardFrame, border: undefined, background: undefined }}>
      {kicker}
      <p style={questionStyle}>{card.question}</p>
      <p style={{ ...titleStyle, color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: 1.65 }}>{card.text}</p>
    </div>
  )
}

// The close: the three cards, the updates letter, then "Also in the lab". The
// also-list drops any page a card already leads to.
export function LabClose({ thread, from, also }: { thread: Thread; from: string; also: ResolvedPage[] }) {
  const carded = new Set(
    [thread.deeper, thread.angle, thread.home].flatMap(c => (c.kind === 'page' ? [c.href] : [])),
  )
  const alsoList = also.filter((p, i, all) => !carded.has(p.href) && all.findIndex(q => q.href === p.href) === i)

  return (
    <>
      <SectionReveal>
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
          <h2 className="label" style={{ marginBottom: '1.25rem' }}>
            {CLOSE_TITLE}
          </h2>
          {/* An anchor, so the bottom bar gives way while the cards are on screen. */}
          <div
            data-bar-anchor=""
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            <CloseCard slot="deeper" card={thread.deeper} from={from} />
            <CloseCard slot="angle" card={thread.angle} from={from} />
            <CloseCard slot="home" card={thread.home} from={from} />
          </div>
        </div>
      </SectionReveal>

      <SectionReveal>
        <SubscribeForm />
      </SectionReveal>
      <MobileBottomBar
        kind="signup"
        list="igos-subscribe"
        endpoint="/api/igos-subscribe"
        event="igos_subscribe"
        sendSource
        line="New dispatches as they ship"
        button="Subscribe"
        placeholder="you@example.com"
        thanks="You are in. The welcome note is landing now."
      />

      <AlsoInLab pages={alsoList} />
    </>
  )
}

// "Also in the lab": a title link and one muted line per page. One
// implementation, used by the close and by the unwoven update fallback. Renders
// nothing for an empty list.
export function AlsoInLab({ pages }: { pages: ResolvedPage[] }) {
  if (pages.length === 0) return null
  return (
    <SectionReveal>
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
        <h2 className="label" style={{ marginBottom: '1.25rem' }}>
          Also in the lab
        </h2>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '1rem' }}>
          {pages.map(p => (
            <li key={p.href} style={{ fontFamily: 'var(--font-body)', lineHeight: 1.55 }}>
              <Link
                href={p.href}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  color: 'var(--color-accent)',
                  textDecoration: 'none',
                }}
              >
                {p.title}
              </Link>
              <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-muted)' }}>{p.line}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionReveal>
  )
}
