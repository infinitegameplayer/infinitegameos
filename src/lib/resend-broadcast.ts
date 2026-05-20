// Resend Broadcasts API client. Thin wrapper over the SDK that returns
// typed result objects with consistent error shape. Used by the
// /api/internal/broadcast-trigger route to create and send Broadcasts to
// the Infinite Game audience.

import { Resend } from 'resend'

export type CreateBroadcastInput = {
  audienceId: string
  subject: string
  html: string
  from: string
  replyTo?: string
  previewText?: string
  name?: string
}

export type CreateBroadcastResult =
  | { ok: true; id: string }
  | { ok: false; error: string }

export type SendBroadcastResult =
  | { ok: true; id: string }
  | { ok: false; error: string }

function getApiKey(): string {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY env var is required')
  return key
}

export async function createBroadcast(
  input: CreateBroadcastInput
): Promise<CreateBroadcastResult> {
  const resend = new Resend(getApiKey())
  try {
    const result = await resend.broadcasts.create({
      audienceId: input.audienceId,
      from: input.from,
      replyTo: input.replyTo,
      subject: input.subject,
      html: input.html,
      previewText: input.previewText,
      name: input.name,
    })
    if (result.error || !result.data?.id) {
      return {
        ok: false,
        error: result.error?.message ?? 'broadcast create returned no id',
      }
    }
    return { ok: true, id: result.data.id }
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    return { ok: false, error: m }
  }
}

export async function sendBroadcast(broadcastId: string): Promise<SendBroadcastResult> {
  const resend = new Resend(getApiKey())
  try {
    const result = await resend.broadcasts.send(broadcastId)
    if (result.error) {
      return { ok: false, error: result.error.message }
    }
    return { ok: true, id: broadcastId }
  } catch (err) {
    const m = err instanceof Error ? err.message : 'Unknown error'
    return { ok: false, error: m }
  }
}
