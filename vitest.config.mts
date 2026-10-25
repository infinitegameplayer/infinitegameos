import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

// Vitest config, added for the email-change token guard (Site Defensibility
// Read 2026-10-25). Node environment for route handlers. The `@/` alias mirrors
// tsconfig paths. Mirrors the sidequesthq config.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
