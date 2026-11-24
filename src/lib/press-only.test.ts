import { describe, expect, it, vi } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { refuseAutomatic } from './press-only'

// Every email-link page acts only on a person's press (King-ruled 2026-11-23,
// Email Codex Section 12). The lists name every site's pages and routes, so this
// file stays identical on all three; each site checks the ones it has, and must
// have at least a join page and an undo page.

describe('refuseAutomatic', () => {
  it('refuses a request that says it is automatic, answering needsTap', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})
    const res = refuseAutomatic('/api/x', 'auto')
    expect(res).not.toBeNull()
    expect(await res!.json()).toEqual({ ok: true, needsTap: true })
    expect(log.mock.calls.some(([l]) => typeof l === 'string' && l.startsWith('auto-refused ') && l.includes('/api/x'))).toBe(true)
    log.mockRestore()
  })
  it('lets a press through', () => {
    expect(refuseAutomatic('/api/x', 'tap')).toBeNull()
    expect(refuseAutomatic('/api/x', undefined)).toBeNull()
  })
})

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
const pages = EMAIL_LINK_PAGES.filter((f) => existsSync(join(process.cwd(), f)))

describe('the email-link pages act only on a press', () => {
  it('this site has a join page and an undo page', () => {
    expect(pages.some((f) => f.includes('/join/'))).toBe(true)
    expect(pages.some((f) => f.includes('/leave/'))).toBe(true)
  })
  for (const file of pages) {
    it(`${file} never acts on its own`, () => {
      const src = readFileSync(join(process.cwd(), file), 'utf8')
      // An effect could post the moment the page loads, which is what a scanner triggers.
      expect(src).not.toContain('useEffect')
      expect(src).not.toContain('useAutoAction')
      expect(src).not.toContain("'auto'")
      // Its own button, or the subscribe form's (the IGOS join page).
      expect(src.includes('onClick=') || src.includes('<SubscribeForm')).toBe(true)
    })
  }
})

const EMAIL_LINK_ROUTES = [
  'src/app/api/igos-subscribe/route.ts',
  'src/app/api/updates/leave/route.ts',
  'src/app/api/articles/join/route.ts',
  'src/app/api/articles/leave/route.ts',
  'src/app/api/letter/join/route.ts',
  'src/app/api/letter/leave/route.ts',
  'src/app/api/unsubscribe/route.ts',
  'src/app/api/personal/join/route.ts',
  'src/app/api/personal/leave/route.ts',
]
const routes = EMAIL_LINK_ROUTES.filter((f) => existsSync(join(process.cwd(), f)))

describe('the email-link routes refuse an automatic request', () => {
  it('this site has at least two such routes', () => {
    expect(routes.length).toBeGreaterThanOrEqual(2)
  })
  for (const file of routes) {
    it(`${file} calls refuseAutomatic before it writes`, () => {
      const src = readFileSync(join(process.cwd(), file), 'utf8')
      expect(src).toContain('refuseAutomatic(')
      expect(src).not.toContain('autoJoinAllowed')
      expect(src).not.toContain('botVerdict(')
    })
  }
})
