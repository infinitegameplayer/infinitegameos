'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

// PostHog initializes in src/instrumentation-client.ts, before hydration, so a
// component that captures on mount finds a live client. Initializing here in a
// useEffect ran after every child effect and dropped their events.
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>
}
