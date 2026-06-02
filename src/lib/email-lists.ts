// Sovereign Email Preference Center, Phase 1: the LISTS registry and the
// list-aware membership layer. Mirror of the lanebelone copy
// (C:\Users\User\sites\lanebelone\src\lib\email-lists.ts). Keep the two
// byte-identical until a shared kingdom-forms package lands.
//
// The registry is the single source the preference page and the routes iterate.
// It carries every Kingdom list across all sites so one contact row reads as the
// honest map of the whole ecosystem. One Resend account holds every audience, so
// a route on either site can flip any audience by name.
//
// Reconciliation model (the Phase 1 spine):
//   - unsubscribed (global bool) means leave everything. The master off-switch.
//     Only applyGlobalUnsubscribe sets it. Per-list leave never touches it.
//   - Per-list membership is tag presence. Leaving one list removes that tag and
//     suppresses that list's Resend audience contact. Other tags stay.
//   - Send-time suppression honors all gates (isSuppressedForList). Supabase is
//     the single truth. Per-action Resend flips are best-effort and self-heal at
//     the next reconcile sweep.

import { Resend } from 'resend'
import { getSupabaseAdmin } from '@/lib/supabase'

export type ListKey = 'personal' | 'articles' | 'infinite_game'
export type ListSite = 'lanebelone' | 'infinitegameos'

export interface ListDef {
  key: ListKey
  tag: string
  label: string
  description: string
  audienceName: string
  audienceEnv: string
  fromAddress: string
  site: ListSite
}

// Subscriber-facing label and description copy is functional here and gets the
// final voice pass plus style sweep when the preference page renders it (Phase 2).
export const LISTS: ListDef[] = [
  {
    key: 'personal',
    tag: 'personal_subscriber',
    label: 'Letters from Lane',
    description: 'Personal notes and what I am learning, sent now and then.',
    audienceName: 'Personal',
    audienceEnv: 'RESEND_AUDIENCE_PERSONAL_ID',
    fromAddress: 'Lane Belone <howdy@lanebelone.com>',
    site: 'lanebelone',
  },
  {
    key: 'articles',
    tag: 'article_subscriber',
    label: 'Articles',
    description: 'New essays in your inbox as they publish.',
    audienceName: 'Articles',
    audienceEnv: 'RESEND_AUDIENCE_ARTICLES_ID',
    fromAddress: 'Lane Belone <howdy@lanebelone.com>',
    site: 'lanebelone',
  },
  {
    key: 'infinite_game',
    tag: 'infinite_game_subscriber',
    label: 'Infinite Game OS',
    description: 'Dispatches from the practice as the OS evolves.',
    audienceName: 'Infinite Game',
    audienceEnv: 'RESEND_AUDIENCE_INFINITE_GAME_ID',
    fromAddress: 'Lane Belone <play@infinitegameos.io>',
    site: 'infinitegameos',
  },
]

export function getListByKey(key: string): ListDef | undefined {
  return LISTS.find((l) => l.key === key)
}

export function getListByTag(tag: string): ListDef | undefined {
  return LISTS.find((l) => l.tag === tag)
}

export type MembershipResult = {
  ok: boolean
  status: string
  error?: string
}

// Pure send-time gate. A list send reaches a contact only when the global flag
// is clear and the list tag is present. The paused_until gate folds in at Phase 4.
export function isSuppressedForList(
  contact: { unsubscribed?: boolean | null; tags?: string[] | null },
  tag: string,
): boolean {
  if (contact.unsubscribed === true) return true
  const tags = Array.isArray(contact.tags) ? contact.tags : []
  return !tags.includes(tag)
}

// ─── Resend audience resolution (env-first, name-fallback, cached) ──────

const audienceIdCache: Record<string, string> = {}

async function resolveAudienceId(resend: Resend, list: ListDef): Promise<string | null> {
  if (audienceIdCache[list.key]) return audienceIdCache[list.key]
  const overrideId = process.env[list.audienceEnv]
  if (overrideId) {
    audienceIdCache[list.key] = overrideId
    return overrideId
  }
  try {
    const res = await resend.audiences.list()
    const found = res.data?.data?.find((a) => a.name === list.audienceName)
    if (found?.id) {
      audienceIdCache[list.key] = found.id
      return found.id
    }
  } catch (err) {
    console.error('resolveAudienceId failed:', err instanceof Error ? err.message : err)
  }
  return null
}

// Best-effort suppress or unsuppress a contact in one list's Resend audience.
// Never throws. Drift self-heals at the reconcile sweep.
async function flipAudience(list: ListDef, email: string, unsubscribed: boolean): Promise<void> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const audienceId = await resolveAudienceId(resend, list)
    if (!audienceId) return
    if (unsubscribed) {
      await resend.contacts.update({ audienceId, email, unsubscribed: true })
    } else {
      // Ensure present and unsuppressed. create handles a missing contact, update
      // clears suppression on an existing one.
      try {
        await resend.contacts.create({ audienceId, email, unsubscribed: false })
      } catch (err) {
        const m = err instanceof Error ? err.message : ''
        if (!/already exists|409/i.test(m)) console.error('flipAudience create:', m)
      }
      await resend.contacts.update({ audienceId, email, unsubscribed: false })
    }
  } catch (err) {
    console.error('flipAudience failed:', err instanceof Error ? err.message : err)
  }
}

// ─── Preference audit ───────────────────────────────────────────────────

type SupabaseAdmin = ReturnType<typeof getSupabaseAdmin>

async function writeAudit(
  supabase: SupabaseAdmin,
  entry: { email: string; action: string; detail?: Record<string, unknown>; ip?: string | null },
): Promise<void> {
  try {
    await supabase.from('preference_audit').insert({
      email: entry.email,
      action: entry.action,
      detail: entry.detail ?? {},
      ip: entry.ip ?? null,
    })
  } catch (err) {
    console.error('preference_audit write failed:', err instanceof Error ? err.message : err)
  }
}

// ─── Membership operations ───────────────────────────────────────────────

// Leave one list. Removes the tag, suppresses that audience, never touches the
// global flag. Identical response whether or not the contact exists so the
// surface cannot confirm membership to a probe.
export async function applyListUnsubscribe(opts: {
  email: string
  listKey: string
  ip?: string | null
}): Promise<MembershipResult> {
  const email = opts.email.trim().toLowerCase()
  const list = getListByKey(opts.listKey)
  if (!list) return { ok: false, status: 'unknown-list', error: `Unknown list: ${opts.listKey}` }

  const supabase = getSupabaseAdmin()
  let removedTag = false
  try {
    const { data: existing, error: selErr } = await supabase
      .from('contacts')
      .select('id, tags')
      .eq('email', email)
      .maybeSingle()
    if (selErr) throw selErr

    if (existing) {
      const currentTags: string[] = Array.isArray(existing.tags) ? existing.tags : []
      const nextTags = currentTags.filter((t) => t !== list.tag)
      removedTag = nextTags.length !== currentTags.length
      if (removedTag) {
        const { error: updErr } = await supabase
          .from('contacts')
          .update({ tags: nextTags })
          .eq('id', existing.id)
        if (updErr) throw updErr
      }
    }
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    await writeAudit(supabase, { email, action: 'list_unsubscribe_error', detail: { list: list.key, error: m }, ip: opts.ip })
    return { ok: false, status: 'error', error: m }
  }

  await flipAudience(list, email, true)
  await writeAudit(supabase, { email, action: 'list_unsubscribe', detail: { list: list.key, removedTag }, ip: opts.ip })
  return { ok: true, status: removedTag ? 'unsubscribed' : 'not-subscribed' }
}

// Join or restore one list. Adds the tag to an existing row, clears the global
// flag and unsuppresses that audience. No welcome email. A missing contact is a
// no-op, which only happens outside the token-gated entry path.
export async function applyListResubscribe(opts: {
  email: string
  listKey: string
  ip?: string | null
}): Promise<MembershipResult> {
  const email = opts.email.trim().toLowerCase()
  const list = getListByKey(opts.listKey)
  if (!list) return { ok: false, status: 'unknown-list', error: `Unknown list: ${opts.listKey}` }

  const supabase = getSupabaseAdmin()
  let addedTag = false
  let found = false
  try {
    const { data: existing, error: selErr } = await supabase
      .from('contacts')
      .select('id, tags')
      .eq('email', email)
      .maybeSingle()
    if (selErr) throw selErr

    if (existing) {
      found = true
      const currentTags: string[] = Array.isArray(existing.tags) ? existing.tags : []
      const nextTags = currentTags.includes(list.tag) ? currentTags : [...currentTags, list.tag]
      addedTag = nextTags.length !== currentTags.length
      const { error: updErr } = await supabase
        .from('contacts')
        .update({ tags: nextTags, unsubscribed: false, unsubscribed_at: null })
        .eq('id', existing.id)
      if (updErr) throw updErr
    }
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    await writeAudit(supabase, { email, action: 'list_resubscribe_error', detail: { list: list.key, error: m }, ip: opts.ip })
    return { ok: false, status: 'error', error: m }
  }

  if (found) await flipAudience(list, email, false)
  await writeAudit(supabase, { email, action: 'list_resubscribe', detail: { list: list.key, addedTag, found }, ip: opts.ip })
  return { ok: true, status: found ? 'resubscribed' : 'no-contact' }
}

// Leave everything. The master off-switch behind RFC 8058 one-click and the
// bottom-of-page control. Sets the global flag, keeps tags as a suppression
// record, and suppresses every audience.
export async function applyGlobalUnsubscribe(opts: {
  email: string
  ip?: string | null
}): Promise<MembershipResult> {
  const email = opts.email.trim().toLowerCase()
  const supabase = getSupabaseAdmin()
  try {
    const { error } = await supabase
      .from('contacts')
      .update({ unsubscribed: true, unsubscribed_at: new Date().toISOString() })
      .eq('email', email)
    if (error) throw error
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    await writeAudit(supabase, { email, action: 'global_unsubscribe_error', detail: { error: m }, ip: opts.ip })
    return { ok: false, status: 'error', error: m }
  }

  for (const list of LISTS) {
    await flipAudience(list, email, true)
  }
  await writeAudit(supabase, { email, action: 'global_unsubscribe', detail: {}, ip: opts.ip })
  return { ok: true, status: 'unsubscribed-all' }
}
