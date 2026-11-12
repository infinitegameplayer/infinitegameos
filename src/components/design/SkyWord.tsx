import { preload } from 'react-dom'
import type { ReactNode } from 'react'

// A word that carries the book's nebula sky inside its letters. `sky` (the
// default) is the photograph held still to the viewport, driven by SkyField.
// `line` is the nebula line clipped to the text, with no photograph and no
// controller work. The markup is a bare span so the text never changes.
//
// The sky is preloaded only on pages that render a sky word. Each AVIF carries
// a media query so a browser fetches only the width its range will use.
const SKY_PRELOADS = [
  { w: 1280, media: '(max-width: 1023px)' },
  { w: 1920, media: '(min-width: 1024px) and (max-width: 1920px)' },
  { w: 2560, media: '(min-width: 1921px)' },
] as const

export default function SkyWord({
  children,
  kind = 'sky',
}: {
  children: ReactNode
  kind?: 'sky' | 'line'
}) {
  if (kind === 'line') return <span className="swn">{children}</span>
  for (const { w, media } of SKY_PRELOADS) {
    preload(`/sky/sky-vivid-${w}.avif`, {
      as: 'image',
      type: 'image/avif',
      media,
      fetchPriority: 'low',
    })
  }
  return <span className="sw">{children}</span>
}
