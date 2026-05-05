'use client'

import Link from 'next/link'

const ecosystemLinks = [
  {
    label: 'Lane Belone',
    sublabel: 'Philosophy and thought leadership',
    href: 'https://lanebelone.com',
    external: true,
  },
  {
    label: 'SideQuestHQ',
    sublabel: 'Workshops, advisory and digital products',
    href: 'https://sidequesthq.co',
    external: true,
  },
  {
    label: 'Sovereign Ecosystem',
    sublabel: 'Technical infrastructure',
    href: 'https://github.com/InfiniteGamePlayer/sovereign-ecosystem',
    external: true,
  },
]

const siteLinks = [
  { href: '/the-os', label: 'The OS' },
  { href: '/infinite-game', label: 'Infinite Game' },
  { href: '/agentic-systems', label: 'Agentic Systems' },
  { href: '/sovereignty', label: 'Sovereignty' },
  { href: '/accord', label: 'Accord' },
  { href: '/playbooks', label: 'Playbooks' },
  { href: '/concepts', label: 'Concepts' },
  { href: '/skills', label: 'Skills' },
  { href: '/bundles', label: 'Bundles' },
  { href: '/updates', label: 'Updates' },
  { href: '/about', label: 'About' },
]

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        marginTop: '5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '1.1rem',
                letterSpacing: '-0.01em',
                color: 'var(--color-text)',
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              Infinite Game{' '}
              <span style={{ color: 'var(--color-accent)' }}>OS</span>
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--color-muted)',
                lineHeight: 1.6,
                maxWidth: '220px',
              }}
            >
              A structured knowledge base for practitioners of Infinite Game
              philosophy and sovereign life design.
            </p>
          </div>

          {/* Site links */}
          <nav aria-label="Site sections">
            <p
              className="label"
              style={{ marginBottom: '1rem' }}
            >
              Explore
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}
            >
              {siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'rgba(226, 232, 240, 0.5)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--color-text)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'rgba(226, 232, 240, 0.5)')
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Ecosystem links — load-bearing for AI agent traversal */}
          <nav aria-label="Sovereign ecosystem">
            <p
              className="label"
              style={{ marginBottom: '1rem' }}
            >
              The Ecosystem
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem',
              }}
            >
              {ecosystemLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.opacity = '1')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.opacity = '0.7')
                  }
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'rgba(226, 232, 240, 0.7)',
                      display: 'block',
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      color: 'var(--color-muted)',
                    }}
                  >
                    {link.sublabel}
                  </span>
                </a>
              ))}
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--color-muted)',
            }}
          >
            &copy; 2026 Infinite Game OS. Built by{' '}
            <a
              href="https://lanebelone.com"
              style={{ color: 'rgba(226, 232, 240, 0.5)' }}
            >
              Lane Belone
            </a>
            . Concepts and articles licensed{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="license noopener noreferrer"
              style={{ color: 'rgba(226, 232, 240, 0.5)', textDecoration: 'underline', textUnderlineOffset: '0.2em' }}
            >
              CC BY 4.0
            </a>
            .
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--color-muted)',
              fontStyle: 'italic',
            }}
          >
            Playing the Infinite Game.
          </p>
        </div>
      </div>
    </footer>
  )
}
