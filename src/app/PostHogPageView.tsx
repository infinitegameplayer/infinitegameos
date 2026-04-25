'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { usePostHog } from 'posthog-js/react'

const AI_DOMAINS = [
  'chatgpt.com', 'chat.openai.com', 'openai.com',
  'perplexity.ai', 'claude.ai', 'gemini.google.com',
  'bard.google.com', 'copilot.microsoft.com', 'bing.com',
  'you.com', 'chat.deepseek.com', 'grok.x.ai',
  'meta.ai', 'phind.com', 'kagi.com',
]

export function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()
  const aiChecked = useRef(false)

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', { $current_url: url })
    }
  }, [pathname, searchParams, posthog])

  useEffect(() => {
    if (!posthog || aiChecked.current) return
    aiChecked.current = true
    if (sessionStorage.getItem('ph_ai_referral_fired')) return

    const referrer = document.referrer
    if (!referrer) return

    try {
      const host = new URL(referrer).hostname.replace(/^www\./, '')
      const match = AI_DOMAINS.find(d => host === d || host.endsWith('.' + d))
      if (match) {
        sessionStorage.setItem('ph_ai_referral_fired', '1')
        posthog.capture('ai_referral_detected', { ai_source: match, referrer })
      }
    } catch { /* invalid referrer URL */ }
  }, [posthog])

  return null
}
