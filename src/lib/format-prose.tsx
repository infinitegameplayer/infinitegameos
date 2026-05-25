import React from 'react'

export function formatProse(text: string): React.ReactNode {
  if (!text.includes('`')) return text
  const parts = text.split('`')
  return parts.map((part, i) =>
    i % 2 === 1 ? <code key={i}>{part}</code> : part
  )
}

export function stripBackticks(text: string): string {
  return text.replace(/`/g, '')
}
