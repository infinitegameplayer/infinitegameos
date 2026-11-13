import type { ReactNode } from 'react'
import { splitAround } from '@/data/design-map'
import SkyWord from './SkyWord'

/**
 * A data-driven H1 with its one word wrapped in a sky word. The text is the
 * input, character for character: the word sits in a span and nothing is added
 * or removed. A word that is not in the text, or no word, returns the text.
 */
export function skyTitle(text: string, word: string | null, kind: 'sky' | 'line' = 'sky'): ReactNode {
  const { before, hit, after } = splitAround(text, word)
  if (!hit) return text
  return (
    <>
      {before}
      <SkyWord kind={kind}>{hit}</SkyWord>
      {after}
    </>
  )
}
