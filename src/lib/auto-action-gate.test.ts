import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { autoJoinAllowed, cleanGateBeacon, cleanGateReport, gateOpen, uaFamily, DWELL_MS, REQUEST_TIMEOUT_MS, TAP_AFTER_MS } from './auto-action-gate'

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

// King-ruled 2026-11-07, option A: Brave on iOS reported the King's own page
// unfocused, so a join drops the focus check and a leave keeps it.
describe('gateOpen by kind', () => {
  const braveReading = { visible: true, focused: false, automated: false }
  it('a join acts on a visible page Brave reports unfocused', () => {
    expect(gateOpen(braveReading, 'join')).toBe(true)
  })
  it('a leave still waits for focus', () => {
    expect(gateOpen(braveReading, 'leave')).toBe(false)
    expect(gateOpen(braveReading)).toBe(false)
  })
  it('a join still needs the page on screen and an ordinary browser', () => {
    expect(gateOpen({ visible: false, focused: false, automated: false }, 'join')).toBe(false)
    expect(gateOpen({ visible: true, focused: true, automated: true }, 'join')).toBe(false)
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

describe('cleanGateBeacon, the reading a closed gate sends', () => {
  const brave = {
    cause: 'gate-closed', page: '/personal/join', visible: true, focused: false, automated: false,
    webdriver: false, headless: false, brave: true, firstReading: { visible: true, focused: false, automated: false },
    events: 0, sinceLoadMs: 2503.7, error: null, transport: 'fetch',
  }
  it('keeps a well-formed reading', () => {
    expect(cleanGateBeacon(brave)).toEqual({ ...brave, sinceLoadMs: 2504 })
  })
  it('refuses a reading with no known cause', () => {
    expect(cleanGateBeacon({ ...brave, cause: 'anything' })).toBeNull()
    expect(cleanGateBeacon('gate-closed')).toBeNull()
  })
  it('never logs a query string, so the address and its token stay on the page', () => {
    expect(cleanGateBeacon({ ...brave, page: '/personal/join?email=a@b.co&token=x' })?.page).toBe('unknown')
  })
  it('trims the browser error to plain text', () => {
    const r = cleanGateBeacon({ ...brave, cause: 'request-threw', error: 'TypeError: Load failed <img src=x>' + 'y'.repeat(200) })
    expect(r?.error).toMatch(/^TypeError: Load failed img srcx/)
    expect(r?.error?.length).toBeLessThanOrEqual(80)
  })
})

describe('uaFamily', () => {
  it('names the browsers the King taps from', () => {
    expect(uaFamily('Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1')).toBe('ios-webkit')
    expect(uaFamily('Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0 Mobile/15E148 Safari/604.1')).toBe('chrome-ios')
    expect(uaFamily('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/131.0 Safari/537.36')).toBe('headless-chrome')
    expect(uaFamily(null)).toBe('none')
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
  'src/app/unsubscribe/UnsubscribeClient.tsx',
  'src/app/personal/join/JoinClient.tsx',
  'src/app/personal/leave/LeaveClient.tsx',
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
      // Its own effect could post on mount past the gate, the pattern the gate retired.
      expect(src).not.toContain('useEffect')
    })
    // A join page names itself, so it acts without the focus check; any other
    // page (an undo, an unsubscribe) never does (option A, 2026-11-07).
    it(`${file} ${file.includes('/join/') ? 'asks for the join gate' : 'keeps the strict gate'}`, () => {
      const src = readFileSync(join(process.cwd(), file), 'utf8')
      if (file.includes('/join/')) expect(src).toContain("}, true, 'join')")
      else expect(src).not.toContain("'join')")
    })
  }
})
