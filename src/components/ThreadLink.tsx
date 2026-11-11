'use client'

import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { umamiTrack } from '@/lib/umami'

// A link that reports its click to Umami before it navigates: `thread_card`
// (from, to, slot) for a thread card, `trail_click` for the trail line. Umami
// loads only on the public host, so preview clicks count nothing.
export default function ThreadLink({
  href,
  event,
  from,
  slot,
  className,
  style,
  children,
}: {
  href: string
  event: 'thread_card' | 'trail_click'
  from: string
  slot?: string
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  const onClick = () => {
    try {
      umamiTrack(event, slot ? { from, to: href, slot } : { from, to: href })
    } catch {
      /* analytics unavailable */
    }
  }
  return (
    <Link href={href} className={className} style={style} onClick={onClick}>
      {children}
    </Link>
  )
}
