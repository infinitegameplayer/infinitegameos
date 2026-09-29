'use client'

import { useState } from 'react'

// Copies a block of text to the clipboard. The text is rendered on the page
// beside it, so nothing depends on this button working.
export default function CopyButton({ text, label = 'Copy the file' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch {
          /* clipboard unavailable; the text is on the page */
        }
      }}
      style={{
        background: 'transparent',
        border: '1px solid rgba(34, 211, 238, 0.4)',
        borderRadius: 'var(--radius, 8px)',
        color: 'var(--color-accent)',
        fontFamily: 'var(--font-body), Inter, system-ui, sans-serif',
        fontSize: '0.8rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
      }}
    >
      {copied ? 'Copied' : label}
    </button>
  )
}
