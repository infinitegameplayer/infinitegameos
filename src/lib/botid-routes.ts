// The routes Vercel BotID guards on infinitegameos.io. instrumentation-client.ts
// attaches the browser signal to exactly these, and each one calls
// refuseBots() from bot-guard.ts. Keep the two in step (Site Defensibility
// Read 2026-10-25).

export const BOTID_PROTECTED: { path: string; method: 'POST' }[] = [
  { path: '/api/igos-subscribe', method: 'POST' },
  { path: '/api/charter-signup', method: 'POST' },
  { path: '/api/preferences/request-link', method: 'POST' },
  { path: '/api/preferences/request-email-change', method: 'POST' },
]
