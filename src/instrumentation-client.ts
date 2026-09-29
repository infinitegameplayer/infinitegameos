// PostHog initialization. Mirror of the lanebelone and IGOS copies. Keep byte-identical.
//
// Next runs this file after the HTML loads and before React hydrates. PostHog
// used to initialize inside PostHogProvider's useEffect, and React runs child
// effects before parent effects, so every component that captured on mount
// called posthog.capture on a client that did not exist yet. posthog-js dropped
// those events with no error and no request. PostHogPageView survived only
// because it sits behind a Suspense boundary and mounts later.
//
// The result held for four months without anything reporting a problem:
// product_page_view landed on 25 of 344 product views, every one of them
// mid-session and none on a session's first page, and cross_site_arrival and
// checkout_complete almost never recorded at all. Same class as the Umami mount
// race fixed in src/lib/umami.ts. Verified by
// Council Chamber/scripts/verify-posthog-mount-events.mjs, which was watched
// fail against production before this landed.

import posthog from 'posthog-js'
import { isNoTrackPath, isNonPublicHost } from '@/lib/no-track'

// Privacy surfaces (the preference center) never initialize analytics. The
// entry URL carries a live signed token, so PostHog must not start here.
// Development servers and Vercel deployment URLs were writing pageviews into
// the production project, so a local session counted as a visitor.
if (!isNoTrackPath(window.location.pathname) && !isNonPublicHost(window.location.hostname)) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false,
    capture_pageleave: true,
    capture_heatmaps: true,
    capture_dead_clicks: true,
    capture_performance: true,
    // Error tracking. JavaScript exceptions on a product or checkout page are
    // otherwise invisible: the reader leaves and nothing records why.
    capture_exceptions: true,
    disable_session_recording: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-private]',
    },
  })
}
