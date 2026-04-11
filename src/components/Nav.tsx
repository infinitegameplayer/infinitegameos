'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/the-os', label: 'The OS' },
  { href: '/infinite-game', label: 'Infinite Game' },
  { href: '/agentic-systems', label: 'Agentic Systems' },
  { href: '/sovereignty', label: 'Sovereignty' },
  { href: '/playbooks', label: 'Playbooks' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s ease, border-color 0.3s ease',
        backgroundColor:
          scrolled || menuOpen ? 'rgba(6, 9, 14, 0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
        borderBottom:
          scrolled || menuOpen
            ? '1px solid rgba(226, 232, 240, 0.06)'
            : '1px solid transparent',
      }}
    >
      <nav
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: '-0.01em',
            color: 'var(--color-text)',
            opacity: 0.9,
            transition: 'opacity 0.2s ease',
          }}
        >
          Infinite Game{' '}
          <span style={{ color: 'var(--color-accent)' }}>OS</span>
        </Link>

        {/* Desktop nav */}
        <div
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: '2rem' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                color: 'rgba(226, 232, 240, 0.6)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--color-text)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'rgba(226, 232, 240, 0.6)')
              }
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/updates"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius)',
              border: '1px solid rgba(34, 211, 238, 0.25)',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.5)'
              e.currentTarget.style.background = 'rgba(34, 211, 238, 0.06)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.25)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Updates
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                backgroundColor: 'rgba(226, 232, 240, 0.75)',
                transition: 'all 0.2s ease',
                transform:
                  menuOpen
                    ? i === 0
                      ? 'rotate(45deg) translate(4.5px, 4.5px)'
                      : i === 1
                      ? 'scaleX(0)'
                      : 'rotate(-45deg) translate(4.5px, -4.5px)'
                    : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            borderTop: '1px solid rgba(226, 232, 240, 0.06)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {[...navLinks, { href: '/updates', label: 'Updates' }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'rgba(226, 232, 240, 0.75)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
