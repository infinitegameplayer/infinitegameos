import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { autoJoinAllowed, cleanGateReport, gateOpen, DWELL_MS, REQUEST_TIMEOUT_MS, TAP_AFTER_MS } from './auto-action-gate'

describe('autoJoinAllowed, the server half', () => {
  it('acts for a known contact BotID vouched for', () => {
    expect(autoJoinAllowed('human', { unsubscribed: false })).toBe(true)
    expect(autoJoinAllowed('human', { unsubscribed: null })).toBe(true)
  })
  it('hands a visitor BotID flagged to the button', () => {
    expect(autoJoinAllowed('bot', { unsubscribed: false })).toBe(false)
  })
  it('hands the button over when BotID itself failed, rather than letting it through', () => {
    expect(autoJoinAllowed('unchecked', { unsubscribed: false })).toBe(false)
  })
  it('never acts for an address the Kingdom has never seen', () => {
    expect(autoJoinAllowed('human', null)).toBe(false)
  })
  it('never acts for a reader who left every list', () => {
    expect(autoJoinAllowed('human', { unsubscribed: true })).toBe(false)
  })
})

describe('gateOpen, the page acts only when a person is plainly there', () => {
  it('opens for a visible, focused, ordinary browser', () => {
    expect(gateOpen({ visible: true, focused: true, automated: false })).toBe(true)
  })
  it('stays shut for a page that is not on screen', () => {
    expect(gateOpen({ visible: false, focused: true, automated: false })).toBe(false)
  })
  it('stays shut for a window without focus', () => {
    expect(gateOpen({ visible: true, focused: false, automated: false })).toBe(false)
  })
  it('stays shut for a browser driven by automation, even visible and focused', () => {
    expect(gateOpen({ visible: true, focused: true, automated: true })).toBe(false)
  })
})

describe('the timing', () => {
  it('shows the button only after the dwell has had its chance', () => {
    expect(TAP_AFTER_MS).toBeGreaterThan(DWELL_MS * 2)
  })
  it('gives a slow request a fair chance before handing over the button', () => {
    expect(REQUEST_TIMEOUT_MS).toBeGreaterThanOrEqual(8000)
  })
})

describe('cleanGateReport, what the server writes to its log', () => {
  it('keeps booleans and whole numbers only', () => {
    expect(cleanGateReport({ visible: true, focused: 'yes', automated: false, dwellMs: 712.4, sinceLoadMs: '<script>', extra: 'x' })).toEqual({
      visible: true,
      focused: false,
      automated: false,
      dwellMs: 712,
      sinceLoadMs: -1,
    })
  })
  it('returns null for anything that is not an object', () => {
    expect(cleanGateReport('visible')).toBeNull()
    expect(cleanGateReport(null)).toBeNull()
  })
})

// The join and undo pages must reach the server in automatic mode only through
// the gate. Read from source so a page that drops the hook fails here. The list
// names every site's pages, so this file stays identical on all three; each
// site checks the ones it has, and must have at least a join and an undo.
const EMAIL_LINK_PAGES = [
  'src/app/updates/join/JoinClient.tsx',
  'src/app/updates/leave/LeaveClient.tsx',
  'src/app/articles/join/JoinClient.tsx',
  'src/app/articles/leave/LeaveClient.tsx',
  'src/app/letter/join/JoinClient.tsx',
  'src/app/letter/leave/LeaveClient.tsx',
]
const present = EMAIL_LINK_PAGES.filter((f) => existsSync(join(process.cwd(), f)))

describe('the email-link pages use the gate', () => {
  it('this site has a join page and an undo page', () => {
    expect(present.some((f) => f.includes('/join/'))).toBe(true)
    expect(present.some((f) => f.includes('/leave/'))).toBe(true)
  })
  for (const file of present) {
    it(`${file} acts through useAutoAction`, () => {
      const src = readFileSync(join(process.cwd(), file), 'utf8')
      expect(src).toContain('useAutoAction(')
      expect(src).toContain("'auto'")
    })
  }
})
