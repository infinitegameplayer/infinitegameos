// Pure math for the sky words. The sky is a fixed photograph emulated with
// background-position: each word's background is offset so the sky holds still
// to the viewport while the word scrolls past it.

export type SkyBox = {
  /** Layout x of the anchor centre (the hero H1 centre, else the word's own). */
  ex: number
  /** Layout left of the word's box. */
  docLeft: number
  /** Layout top of the word's box. */
  docTop: number
  /** Box height (used by the parked window). */
  height?: number
}

/** The wide zoom (ruling 40): the sky always covers a 16:9 frame. */
export function skySize(vw: number, vh: number): number {
  return Math.max(vw, (vh * 16) / 9)
}

/** Horizontal offset of the sky inside the word's box. Same for both states. */
export function skyX(sz: number, box: SkyBox): number {
  return box.ex - 0.54 * sz - box.docLeft
}

/** Moving state: vertical offset at scroll 0. At scroll s the offset is y0 + s. */
export function skyY0(sz: number, vh: number, box: SkyBox): number {
  return vh * 0.5 - 0.27 * sz - box.docTop
}

/** Moving state: the vertical offset at scroll position s. */
export function skyYAt(sz: number, vh: number, box: SkyBox, scroll: number): number {
  return skyY0(sz, vh, box) + scroll
}

/**
 * Parked state (reduced motion): the window the word would show a third of the
 * way down the screen, above the sky's white core. Independent of scroll.
 */
export function skyYParked(sz: number, vh: number, height: number): number {
  return vh * (0.5 - 0.32) - 0.27 * sz + height / 2
}
