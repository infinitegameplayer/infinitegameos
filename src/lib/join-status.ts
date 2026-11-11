// What the one-tap join page shows when it opens (/updates/join?email=...).
// The check runs before the tap (King-directed 2026-11-07), so a reader already
// on the list is told so and sees no button. Reading is all it does: nothing is
// written on open, so an email link scanner still joins no one.
//
// Membership is tag presence (email-lists.ts). A paused reader is still on the
// list. A reader who left every list (unsubscribed) is shown the button, and the
// subscribe route answers them with its "Want back in?" email, never a silent
// re-add.

export const IGOS_LIST_TAG = 'infinite_game_subscriber'

export type JoinStatus = 'already' | 'invite'

export function joinStatus(membership: {
  exists: boolean
  tags: string[]
  unsubscribed: boolean
}): JoinStatus {
  if (membership.exists && !membership.unsubscribed && membership.tags.includes(IGOS_LIST_TAG)) {
    return 'already'
  }
  return 'invite'
}
