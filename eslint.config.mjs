import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

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
 ]),
 {
  rules: {
   // Disable HTML entity escaping rule - allow regular apostrophes
   "react/no-unescaped-entities": "off",
   // Allow require() style imports
   "@typescript-eslint/no-require-imports": "off",
  },
 },
]);

export default eslintConfig;
