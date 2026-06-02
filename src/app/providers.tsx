'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { isNoTrackPath } from '@/lib/no-track'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Privacy surfaces (the preference center) never initialize analytics. The
    // entry URL carries a live token, so PostHog must not start here at all.
    if (isNoTrackPath(window.location.pathname)) return
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: false,
      capture_pageleave: true,
      capture_heatmaps: true,
      capture_dead_clicks: true,
      capture_performance: true,
      disable_session_recording: false,
      session_recording: {
        maskAllInputs: true,
        maskTextSelector: '[data-private]',
      },
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
