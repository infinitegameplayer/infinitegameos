import { describe, expect, it } from 'vitest'
import { skySize, skyX, skyY0, skyYAt, skyYParked } from './sky-math'

describe('sky-math', () => {
  it('uses the wide zoom', () => {
    expect(skySize(1440, 900)).toBe(1600)
    expect(skySize(390, 844)).toBeCloseTo(1500.444, 3)
    expect(skySize(2560, 1440)).toBe(2560)
  })

  it('computes moving values at 1440x900', () => {
    const sz = skySize(1440, 900)
    const box = { ex: 720, docLeft: 400, docTop: 220 }
    expect(skyX(sz, box)).toBeCloseTo(720 - 864 - 400, 6)
    expect(skyY0(sz, 900, box)).toBeCloseTo(450 - 432 - 220, 6)
    expect(skyYAt(sz, 900, box, 300)).toBeCloseTo(450 - 432 - 220 + 300, 6)
  })

  it('computes moving values at 390x844', () => {
    const sz = skySize(390, 844)
    const box = { ex: 195, docLeft: 20, docTop: 180 }
    expect(skyX(sz, box)).toBeCloseTo(195 - 0.54 * sz - 20, 6)
    expect(skyY0(sz, 844, box)).toBeCloseTo(422 - 0.27 * sz - 180, 6)
  })

  it('parks well away from the core at 1440x900', () => {
    const sz = skySize(1440, 900)
    const box = { ex: 720, docLeft: 400, docTop: 450, height: 80 }
    const parked = skyYParked(sz, 900, box.height)
    // Moving y with the word top at vh * 0.5 (sky core behind the word).
    const atCore = skyY0(sz, 900, box)
    expect(Math.abs(parked - atCore)).toBeGreaterThan(100)
    expect(parked).toBeCloseTo(900 * 0.18 - 432 + 40, 6)
  })
})
