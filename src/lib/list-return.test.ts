import { describe, expect, it } from 'vitest'
import type { SupabaseClient } from '@supabase/supabase-js'
import { isRealLeave, leftThisListBefore } from './list-return'

// Welcome back fires only for a reader who really left this list before
// (PendingPlan - The Letters Map and Welcome Back, step 2). Mirror across the
// three sites. Keep byte-identical.

function fakeAudit(rows: { detail: unknown }[] | null, error: unknown = null) {
  const seen: [string, string][] = []
  const chain = {
    select: () => chain,
    eq: (col: string, v: string) => {
      seen.push([col, v])
      return chain
    },
    limit: async () => ({ data: rows, error }),
  }
  return { client: { from: () => chain } as unknown as SupabaseClient, seen }
}

describe('isRealLeave', () => {
  it('counts a leave that took the tag off', () => {
    expect(isRealLeave([{ detail: { list: 'personal', removedTag: true } }])).toBe(true)
  })
  it('counts an older row that never recorded removedTag', () => {
    expect(isRealLeave([{ detail: { list: 'personal' } }])).toBe(true)
  })
  it('never counts a leave by someone who was not on the list', () => {
    expect(isRealLeave([{ detail: { list: 'personal', removedTag: false } }])).toBe(false)
    expect(isRealLeave([])).toBe(false)
  })
})

describe('leftThisListBefore', () => {
  it('asks for this address, a list leave and this list', async () => {
    const { client, seen } = fakeAudit([{ detail: { list: 'articles', removedTag: true } }])
    expect(await leftThisListBefore(client, ' A@X.co ', 'articles')).toBe(true)
    expect(seen).toEqual([['email', 'a@x.co'], ['action', 'list_unsubscribe'], ['detail->>list', 'articles']])
  })
  it('answers false on a read error, so the reader gets the first welcome', async () => {
    expect(await leftThisListBefore(fakeAudit(null, { message: 'down' }).client, 'a@x.co', 'articles')).toBe(false)
  })
})
