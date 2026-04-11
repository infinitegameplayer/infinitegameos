import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'This page does not exist.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <p className="label" style={{ marginBottom: '1.5rem' }}>
        404
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 600,
          marginBottom: '1rem',
        }}
      >
        This page is not in the OS.
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--color-muted)',
          maxWidth: '36ch',
          marginBottom: '2.5rem',
          lineHeight: 1.7,
        }}
      >
        The path you followed leads nowhere. The game keeps playing regardless.
      </p>
      <Link
        href="/"
        className="btn-accent"
        style={{ textDecoration: 'none' }}
      >
        Return to the OS
      </Link>
    </div>
  )
}
