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
import {
  generateChangeSecret,
  hashChangeSecret,
  EMAIL_CHANGE_TTL_SECONDS,
} from '@/lib/unsubscribe-token'

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

// Subscriber-facing label and description copy. Voice pass and style sweep
// applied at the Phase 2 build session. Each description says what the list is
// in one breath, in Lane's voice.
export const LISTS: ListDef[] = [
  {
    key: 'personal',
    tag: 'personal_subscriber',
    label: 'Personal notes from Lane',
    description: 'Fresh updates and what I’m learning. Sent when there’s something worth sending.',
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
    description: 'Dispatches from inside the practice as the OS takes shape.',
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

// Partial mask for confirmation display. The preference page shows this, never
// the full address in visible text. Keeps the first and last character of the
// local part and the domain shape so the human recognizes their own address
// while a shoulder-surfer learns little. `lane@gmail.com` reads `l•••e@g•••.com`.
export function maskEmail(email: string): string {
  const e = (email || '').trim()
  const at = e.lastIndexOf('@')
  if (at < 1) return '•••'
  const local = e.slice(0, at)
  const domain = e.slice(at + 1)
  const maskedLocal =
    local.length <= 2 ? `${local[0]}•` : `${local[0]}•••${local[local.length - 1]}`
  const dot = domain.lastIndexOf('.')
  const maskedDomain = dot > 1 ? `${domain[0]}•••${domain.slice(dot)}` : domain
  return `${maskedLocal}@${maskedDomain}`
}

export type MembershipResult = {
  ok: boolean
  status: string
  error?: string
}

// True when paused_until is set and still in the future. NULL or a past
// timestamp reads active. Shared by the send-time gate and the page load.
export function isPaused(pausedUntil?: string | null, nowMs: number = Date.now()): boolean {
  if (!pausedUntil) return false
  const t = Date.parse(pausedUntil)
  return Number.isFinite(t) && t > nowMs
}

// Pure send-time gate. A list send reaches a contact only when all three gates
// pass: the global unsubscribed flag is clear, the global pause is null or past,
// and the list tag is present.
export function isSuppressedForList(
  contact: { unsubscribed?: boolean | null; paused_until?: string | null; tags?: string[] | null },
  tag: string,
  nowMs: number = Date.now(),
): boolean {
  if (contact.unsubscribed === true) return true
  if (isPaused(contact.paused_until, nowMs)) return true
  const tags = Array.isArray(contact.tags) ? contact.tags : []
  return !tags.includes(tag)
}

// ─── Membership read (preference page load) ──────────────────────────────

// Read one contact row for the preference page. Returns a list-agnostic view:
// which tags are present and whether the global flag is set. The page maps this
// over the LISTS registry to render every list as joined or not. A missing
// contact returns the same empty shape a never-subscribed email would, so the
// page reveals nothing to a probe that somehow reaches it with a valid token.
export async function getContactMembership(email: string): Promise<{
  exists: boolean
  tags: string[]
  unsubscribed: boolean
  pausedUntil: string | null
}> {
  const normalized = email.trim().toLowerCase()
  const supabase = getSupabaseAdmin()
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('tags, unsubscribed, paused_until')
      .eq('email', normalized)
      .maybeSingle()
    if (error || !data) return { exists: false, tags: [], unsubscribed: false, pausedUntil: null }
    return {
      exists: true,
      tags: Array.isArray(data.tags) ? data.tags : [],
      unsubscribed: data.unsubscribed === true,
      pausedUntil: data.paused_until ?? null,
    }
  } catch {
    return { exists: false, tags: [], unsubscribed: false, pausedUntil: null }
  }
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

// ─── Global pause and resume ──────────────────────────────────────────────

export const PAUSE_DAYS = 30

// Pause everything for 30 days. Writes paused_until = now + 30 days, which
// quiets every list without leaving any. Distinct from applyGlobalUnsubscribe,
// the explicit leave-all. Best-effort suppresses every Resend audience so the
// broadcast path goes quiet promptly, with the reconcile sweep as self-heal.
// The transactional path honors the pause immediately through Supabase reads.
// A missing contact is a no-op, only reached outside the token-gated entry path.
export async function applyPause(opts: {
  email: string
  ip?: string | null
}): Promise<MembershipResult & { pausedUntil?: string }> {
  const email = opts.email.trim().toLowerCase()
  const supabase = getSupabaseAdmin()
  const pausedUntil = new Date(Date.now() + PAUSE_DAYS * 24 * 60 * 60 * 1000).toISOString()
  try {
    const { error } = await supabase
      .from('contacts')
      .update({ paused_until: pausedUntil })
      .eq('email', email)
    if (error) throw error
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    await writeAudit(supabase, { email, action: 'pause_error', detail: { error: m }, ip: opts.ip })
    return { ok: false, status: 'error', error: m }
  }

  for (const list of LISTS) {
    await flipAudience(list, email, true)
  }
  await writeAudit(supabase, { email, action: 'pause', detail: { pausedUntil, days: PAUSE_DAYS }, ip: opts.ip })
  return { ok: true, status: 'paused', pausedUntil }
}

// Resume sending. Clears paused_until and best-effort restores only the Resend
// audiences the contact's current tags still claim, so resume never re-adds
// someone to a list they left. Pause is distinct from unsubscribe, so the
// global flag is untouched here. A missing contact is a no-op.
export async function applyResume(opts: {
  email: string
  ip?: string | null
}): Promise<MembershipResult> {
  const email = opts.email.trim().toLowerCase()
  const supabase = getSupabaseAdmin()
  let tags: string[] = []
  try {
    const { data: existing, error: selErr } = await supabase
      .from('contacts')
      .select('id, tags')
      .eq('email', email)
      .maybeSingle()
    if (selErr) throw selErr
    if (existing) tags = Array.isArray(existing.tags) ? existing.tags : []

    const { error: updErr } = await supabase
      .from('contacts')
      .update({ paused_until: null })
      .eq('email', email)
    if (updErr) throw updErr
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    await writeAudit(supabase, { email, action: 'resume_error', detail: { error: m }, ip: opts.ip })
    return { ok: false, status: 'error', error: m }
  }

  for (const list of LISTS) {
    if (tags.includes(list.tag)) await flipAudience(list, email, false)
  }
  await writeAudit(supabase, { email, action: 'resume', detail: {}, ip: opts.ip })
  return { ok: true, status: 'resumed' }
}

// ─── Email change (Phase 3, the security-owned surface) ───────────────────
// Dual-address confirmation backed by email_change_requests. requestEmailChange
// mints the pending row and returns the two raw secrets to the route so it can
// build and send the links. The raw secrets never touch storage, only their
// SHA-256 hashes do. confirmEmailChange applies the change with Supabase
// canonical first and a best-effort Resend mirror. cancelEmailChange and
// requestEmailMerge close the other branches. Every step writes an audit row.

const EMAIL_CHANGE_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Durable, DB-counted rate limit. Serverless in-memory counters die with the
// instance, so the floor lives in the table. A lighter per-IP in-memory throttle
// sits in the routes as a second layer.
const CHANGE_RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const CHANGE_MAX_PER_EMAIL = 3
const CHANGE_MAX_PER_IP = 10

export type EmailChangeResult = {
  ok: boolean
  status: string
  error?: string
  oldEmail?: string
  newEmail?: string
  confirmSecret?: string
  cancelSecret?: string
  expiresAt?: string
}

// Remove a contact from one list's Resend audience. Suppress first so a failed
// delete still stops mail, then delete. Best-effort, never throws. The reconcile
// sweep suppresses any survivor, since Supabase no longer holds the old address.
async function removeFromAudience(list: ListDef, email: string): Promise<void> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const audienceId = await resolveAudienceId(resend, list)
    if (!audienceId) return
    try {
      await resend.contacts.update({ audienceId, email, unsubscribed: true })
    } catch {
      // Not present in this audience is fine.
    }
    try {
      await resend.contacts.remove({ audienceId, email })
    } catch (err) {
      const m = err instanceof Error ? err.message : ''
      if (!/not found|404/i.test(m)) console.error('removeFromAudience remove:', m)
    }
  } catch (err) {
    console.error('removeFromAudience failed:', err instanceof Error ? err.message : err)
  }
}

// Start a change. Validates the new address, enforces the rate limits, cancels
// any outstanding pending request for this old address (one pending at a time)
// then inserts the new request. Returns the two raw secrets to the caller. Does
// not check whether new_email is already on file: that is handled at confirm so
// the request step cannot be used to probe who is on the list.
export async function requestEmailChange(opts: {
  oldEmail: string
  newEmail: string
  ip?: string | null
}): Promise<EmailChangeResult> {
  const oldEmail = opts.oldEmail.trim().toLowerCase()
  const newEmail = opts.newEmail.trim().toLowerCase()
  const ip = opts.ip ?? null

  if (!EMAIL_CHANGE_REGEX.test(newEmail)) return { ok: false, status: 'invalid-email' }
  if (newEmail === oldEmail) return { ok: false, status: 'same-email' }

  const supabase = getSupabaseAdmin()

  try {
    const since = new Date(Date.now() - CHANGE_RATE_WINDOW_MS).toISOString()
    const { count: emailCount } = await supabase
      .from('email_change_requests')
      .select('id', { count: 'exact', head: true })
      .eq('old_email', oldEmail)
      .gte('created_at', since)
    if ((emailCount ?? 0) >= CHANGE_MAX_PER_EMAIL) {
      await writeAudit(supabase, { email: oldEmail, action: 'email_change_rate_limited', detail: { by: 'email' }, ip })
      return { ok: false, status: 'rate-limited' }
    }
    if (ip) {
      const { count: ipCount } = await supabase
        .from('email_change_requests')
        .select('id', { count: 'exact', head: true })
        .eq('requester_ip', ip)
        .gte('created_at', since)
      if ((ipCount ?? 0) >= CHANGE_MAX_PER_IP) {
        await writeAudit(supabase, { email: oldEmail, action: 'email_change_rate_limited', detail: { by: 'ip' }, ip })
        return { ok: false, status: 'rate-limited' }
      }
    }
  } catch (err) {
    // A failed rate read should not hard-block a legitimate change. The one
    // pending per old_email index still bounds abuse.
    console.error('email change rate check failed:', err instanceof Error ? err.message : err)
  }

  const confirmSecret = generateChangeSecret()
  const cancelSecret = generateChangeSecret()
  const expiresAt = new Date(Date.now() + EMAIL_CHANGE_TTL_SECONDS * 1000).toISOString()

  try {
    // Invalidate any outstanding pending request for this old address before
    // inserting, so the partial unique index never collides.
    await supabase
      .from('email_change_requests')
      .update({ cancelled_at: new Date().toISOString() })
      .eq('old_email', oldEmail)
      .is('confirmed_at', null)
      .is('cancelled_at', null)

    const { error: insErr } = await supabase.from('email_change_requests').insert({
      old_email: oldEmail,
      new_email: newEmail,
      confirm_token_hash: hashChangeSecret(confirmSecret),
      cancel_token_hash: hashChangeSecret(cancelSecret),
      expires_at: expiresAt,
      requester_ip: ip,
    })
    if (insErr) throw insErr
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    await writeAudit(supabase, { email: oldEmail, action: 'email_change_request_error', detail: { error: m }, ip })
    return { ok: false, status: 'error', error: m }
  }

  await writeAudit(supabase, { email: oldEmail, action: 'email_change_requested', detail: { newEmail }, ip })
  return { ok: true, status: 'pending', oldEmail, newEmail, confirmSecret, cancelSecret, expiresAt }
}

// Apply the change. Looks the request up by the confirm secret's hash, validates
// it is still pending and unexpired, then updates Supabase first (canonical).
// The UNIQUE(email) constraint surfaces the already-on-file collision, which is
// rejected cleanly and never merged here. On success the Resend mirror adds the
// new address to the audiences its tags claim and removes the old address.
export async function confirmEmailChange(opts: {
  secret: string
  ip?: string | null
}): Promise<EmailChangeResult> {
  const ip = opts.ip ?? null
  const hash = hashChangeSecret(opts.secret)
  if (!hash) return { ok: false, status: 'invalid' }

  const supabase = getSupabaseAdmin()
  const nowIso = new Date().toISOString()

  let request: {
    id: string
    old_email: string
    new_email: string
    expires_at: string
    confirmed_at: string | null
    cancelled_at: string | null
  } | null = null
  try {
    const { data, error } = await supabase
      .from('email_change_requests')
      .select('id, old_email, new_email, expires_at, confirmed_at, cancelled_at')
      .eq('confirm_token_hash', hash)
      .maybeSingle()
    if (error) throw error
    request = data
  } catch (err) {
    return { ok: false, status: 'error', error: err instanceof Error ? err.message : 'Unknown error' }
  }

  if (!request) return { ok: false, status: 'invalid' }
  // Terminal already. A late second click against a resolved request is a no-op.
  if (request.confirmed_at || request.cancelled_at) {
    return { ok: false, status: 'resolved', oldEmail: request.old_email, newEmail: request.new_email }
  }
  if (Date.parse(request.expires_at) < Date.now()) return { ok: false, status: 'expired' }

  const oldEmail = request.old_email
  const newEmail = request.new_email

  // Capture list state before the swap. tags and flags do not change in an
  // email update, so this view drives the Resend mirror for the new address.
  let tags: string[] = []
  let unsubscribed = false
  let pausedUntil: string | null = null
  try {
    const { data: contact } = await supabase
      .from('contacts')
      .select('tags, unsubscribed, paused_until')
      .eq('email', oldEmail)
      .maybeSingle()
    if (contact) {
      tags = Array.isArray(contact.tags) ? contact.tags : []
      unsubscribed = contact.unsubscribed === true
      pausedUntil = contact.paused_until ?? null
    }
  } catch {
    // Mirror falls back to the reconcile sweep.
  }

  // Supabase first. The contacts row carries a UNIQUE(email) constraint and a
  // row lock, so exactly one concurrent confirm updates the row and any other
  // sees zero rows. A 23505 means new_email is already a contact (collision).
  let updatedCount = 0
  try {
    const { data, error } = await supabase
      .from('contacts')
      .update({ email: newEmail })
      .eq('email', oldEmail)
      .select('id')
    if (error) {
      if ((error as { code?: string }).code === '23505' || /duplicate key|already exists/i.test(error.message)) {
        await supabase.from('email_change_requests').update({ cancelled_at: nowIso }).eq('id', request.id)
        await writeAudit(supabase, { email: oldEmail, action: 'email_change_collision', detail: { newEmail }, ip })
        return { ok: false, status: 'collision', oldEmail, newEmail }
      }
      throw error
    }
    updatedCount = data?.length ?? 0
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    await writeAudit(supabase, { email: oldEmail, action: 'email_change_confirm_error', detail: { error: m, newEmail }, ip })
    return { ok: false, status: 'error', error: m }
  }

  if (updatedCount === 0) {
    // No contact at old_email. Either already moved or removed. Close the request.
    await supabase.from('email_change_requests').update({ cancelled_at: nowIso }).eq('id', request.id)
    await writeAudit(supabase, { email: oldEmail, action: 'email_change_no_contact', detail: { newEmail }, ip })
    return { ok: false, status: 'invalid' }
  }

  // Stamp confirmed terminal before the best-effort mirror, so a mirror hiccup
  // never leaves the request re-confirmable.
  await supabase.from('email_change_requests').update({ confirmed_at: nowIso }).eq('id', request.id)

  const contactView = { unsubscribed, paused_until: pausedUntil, tags }
  for (const list of LISTS) {
    if (!isSuppressedForList(contactView, list.tag)) {
      await flipAudience(list, newEmail, false)
    }
    await removeFromAudience(list, oldEmail)
  }

  await writeAudit(supabase, { email: newEmail, action: 'email_change_confirmed', detail: { oldEmail }, ip })
  await writeAudit(supabase, { email: oldEmail, action: 'email_change_applied', detail: { newEmail }, ip })
  return { ok: true, status: 'confirmed', oldEmail, newEmail }
}

// Cancel a change from the old address. Looks the request up by the cancel
// secret's hash. A request already confirmed or cancelled is a no-op, which
// closes the confirm-versus-cancel race from the cancel side.
export async function cancelEmailChange(opts: {
  secret: string
  ip?: string | null
}): Promise<EmailChangeResult> {
  const ip = opts.ip ?? null
  const hash = hashChangeSecret(opts.secret)
  if (!hash) return { ok: false, status: 'invalid' }

  const supabase = getSupabaseAdmin()
  let request: {
    id: string
    old_email: string
    new_email: string
    confirmed_at: string | null
    cancelled_at: string | null
  } | null = null
  try {
    const { data, error } = await supabase
      .from('email_change_requests')
      .select('id, old_email, new_email, confirmed_at, cancelled_at')
      .eq('cancel_token_hash', hash)
      .maybeSingle()
    if (error) throw error
    request = data
  } catch (err) {
    return { ok: false, status: 'error', error: err instanceof Error ? err.message : 'Unknown error' }
  }

  if (!request) return { ok: false, status: 'invalid' }
  if (request.confirmed_at) {
    return { ok: false, status: 'already-confirmed', oldEmail: request.old_email, newEmail: request.new_email }
  }
  if (request.cancelled_at) {
    return { ok: true, status: 'already-cancelled', oldEmail: request.old_email, newEmail: request.new_email }
  }

  try {
    await supabase
      .from('email_change_requests')
      .update({ cancelled_at: new Date().toISOString() })
      .eq('id', request.id)
  } catch (err) {
    return { ok: false, status: 'error', error: err instanceof Error ? err.message : 'Unknown error' }
  }
  await writeAudit(supabase, { email: request.old_email, action: 'email_change_cancelled', detail: { newEmail: request.new_email }, ip })
  return { ok: true, status: 'cancelled', oldEmail: request.old_email, newEmail: request.new_email }
}

// File a merge ticket when a change hit an already-on-file collision. The person
// holds the confirm secret (they proved control of the new address), so this is
// gated by that same hash. Writes a durable audit row. The route sends the
// internal notification and the acknowledgement. No contact data is mutated. The
// actual merge stays a manual step until a real case earns the automation.
export async function requestEmailMerge(opts: {
  secret: string
  ip?: string | null
}): Promise<EmailChangeResult> {
  const ip = opts.ip ?? null
  const hash = hashChangeSecret(opts.secret)
  if (!hash) return { ok: false, status: 'invalid' }

  const supabase = getSupabaseAdmin()
  let request: { old_email: string; new_email: string } | null = null
  try {
    const { data, error } = await supabase
      .from('email_change_requests')
      .select('old_email, new_email')
      .eq('confirm_token_hash', hash)
      .maybeSingle()
    if (error) throw error
    request = data
  } catch (err) {
    return { ok: false, status: 'error', error: err instanceof Error ? err.message : 'Unknown error' }
  }
  if (!request) return { ok: false, status: 'invalid' }

  await writeAudit(supabase, {
    email: request.old_email,
    action: 'email_change_merge_requested',
    detail: { newEmail: request.new_email },
    ip,
  })
  return { ok: true, status: 'merge-requested', oldEmail: request.old_email, newEmail: request.new_email }
}
