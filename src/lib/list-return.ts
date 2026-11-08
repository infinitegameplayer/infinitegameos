// Welcome back (PendingPlan - The Letters Map and Welcome Back, step 2). A
// reader who rejoins a list they left gets "Welcome back" instead of the first
// welcome a second time. A leave is read from preference_audit: the row
// applyListUnsubscribe writes (action list_unsubscribe, detail { list,
// removedTag }). Only a leave that took the tag off counts, so a leave click by
// someone who was never on the list cannot turn their first join into a return.
//
// A reader who left every list still meets the existing "Want back in?" email,
// unchanged; that path runs before this one. A first join gets the first
// welcome. Mirror across the three sites. Keep byte-identical.

import type { SupabaseClient } from '@supabase/supabase-js'

export function isRealLeave(rows: { detail: unknown }[]): boolean {
  return rows.some((r) => {
    const d = r.detail as Record<string, unknown> | null
    return !!d && d.removedTag !== false
  })
}

// On a read error it answers false: the reader gets the first welcome, which is
// never wrong, only less specific.
export async function leftThisListBefore(supabase: SupabaseClient, email: string, listKey: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('preference_audit')
      .select('detail')
      .eq('email', email.trim().toLowerCase())
      .eq('action', 'list_unsubscribe')
      .eq('detail->>list', listKey)
      .limit(20)
    if (error || !data) return false
    return isRealLeave(data as { detail: unknown }[])
  } catch {
    return false
  }
}
