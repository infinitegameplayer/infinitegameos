import { describe, expect, it } from 'vitest'
import { joinStatus, IGOS_LIST_TAG } from './join-status'

describe('joinStatus, the check before the tap', () => {
  it('tells a reader already on the list so, with no button', () => {
    expect(joinStatus({ exists: true, tags: ['personal_subscriber', IGOS_LIST_TAG], unsubscribed: false })).toBe('already')
  })
  it('invites a contact on other lists who is not on this one', () => {
    expect(joinStatus({ exists: true, tags: ['personal_subscriber', 'sqhq'], unsubscribed: false })).toBe('invite')
  })
  it('invites an address the list has never seen', () => {
    expect(joinStatus({ exists: false, tags: [], unsubscribed: false })).toBe('invite')
  })
  it('shows the button to a reader who left every list, so the route can ask them back', () => {
    expect(joinStatus({ exists: true, tags: [IGOS_LIST_TAG], unsubscribed: true })).toBe('invite')
  })
})
