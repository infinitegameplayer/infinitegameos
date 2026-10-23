// Logs the Node.js runtime once per server cold start, so the patch level
// production actually runs is read from Vercel's runtime logs rather than
// assumed from the project's "24.x" setting. Added 2026-10-23 after the
// Node.js October security release (Site Update).
export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log(`[runtime] node ${process.version}`)
  }
}
