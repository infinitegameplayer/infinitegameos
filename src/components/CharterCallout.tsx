import Link from 'next/link'
import MobileBottomBar from '@/components/MobileBottomBar'

// The Your AI's Charter door, for pages where builders already are: every
// skill page, the Sovereign Ecosystem, Agentic Systems and the Ambassador
// Doctrine. One Alive Thing keeps its own places (the life and creative
// concepts). Both free doors lead to the same Side Quest Letter.
// King-approved 2026-09-29.

const DEFAULT_BODY =
  'Before your AI runs anything for you, give it a charter. Your AI’s Charter is a free CLAUDE.md for how Claude works with you: what it runs on its own, what it asks you first and how it acts in your name.'

// `bar="none"` renders the callout without its Charter bottom bar, for the pages
// where the updates letter holds the bar instead (the homepage, Agentic
// Systems, Sovereign Ecosystem).
export default function CharterCallout({
  body = DEFAULT_BODY,
  marginTop = '3.5rem',
  bar = 'charter',
  ring = false,
}: {
  body?: string
  marginTop?: string
  bar?: 'charter' | 'none'
  // The rotating nebula ring, with the inner fill on the base colour. The
  // homepage door only (IGOS Design Pass ruling 26, King-ruled 2026-11-12).
  ring?: boolean
}) {
  return (
    <>
    <div
      data-bar-anchor=""
      className={ring ? 'shimmer-card' : undefined}
      style={
        ring
          ? { marginTop, padding: '2rem' }
          : {
              marginTop,
              padding: '2rem',
              border: '1px solid rgba(34, 211, 238, 0.18)',
              borderRadius: '12px',
              background: 'rgba(34, 211, 238, 0.04)',
            }
      }
    >
      <p className="label" style={{ marginBottom: '0.75rem' }}>
        Free · Your AI&rsquo;s Charter
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--color-text)',
          lineHeight: 1.75,
          maxWidth: '62ch',
          marginBottom: '1.5rem',
        }}
      >
        {body}
      </p>
      <Link href="/charter" className="btn-soft-accent">
        Get the Charter · free
      </Link>
    </div>
    {/* Every page carrying the Charter door also carries the mobile bottom bar for it. */}
    {bar === 'charter' && (
      <MobileBottomBar
        kind="signup"
        list="igos-charter"
        endpoint="/api/charter-signup"
        event="charter_signup"
        line="Your AI’s Charter · free"
        button="Get the Charter"
        placeholder="you@example.com"
        thanks="You are in. The file and the guide are on their way from Side Quest HQ."
        fallbackUrl="https://www.sidequesthq.co/charter"
      />
    )}
    </>
  )
}
