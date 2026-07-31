import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Plugin tooling, not app code. CommonJS by design, so the TypeScript
    // no-require-imports rule reads it as a violation of a convention it was
    // never written to follow.
    "plugins/**",
  ]),
]);

export default eslintConfig;
