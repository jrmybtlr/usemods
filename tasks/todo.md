# AI Bot Discoverability

## Goal
Make usemods.com easy for AI crawlers/agents to find, understand, and cite.

## Current state
- `llms.txt` / `llms-full.txt` exist but `llms.txt` is not llmstxt.org-compliant (no blockquote, not list-formatted, links HTML pages not markdown)
- No effective `robots.txt` (`robots.config.ts` present but `@nuxtjs/robots` not installed)
- Markdown docs live in `docs/pages/` but API serves from mostly-empty `content/2.docs/`
- SEO packages installed but not wired; no JSON-LD or HTML discovery links

## Plan
- [x] Update `docs/docs.mjs` `generateLLMsTxt()` to llmstxt.org format (H1, blockquote, list links to `.md`, Optional section, `llms-full.txt`)
- [x] Generate/copy AI-facing markdown into `nuxt-web/public/docs/` for static Cloudflare serving
- [x] Add `nuxt-web/public/robots.txt` allowing AI bots and advertising Sitemap + LLMs files
- [x] Add HTML head discovery links + SoftwareApplication JSON-LD in `nuxt.config.ts` / `app.vue`
- [x] Point `/api/docs` at the static public docs (or keep generating into content and public)
- [x] Regenerate `llms.txt` / ensure public assets are current
- [x] Commit, push, open PR

## Review
- Spec-compliant `/llms.txt` with markdown mirrors at `/docs/*.md` and `/intro/*.md`
- `/robots.txt` explicitly allows major AI crawlers and advertises sitemap + llms files
- JSON-LD WebSite + SoftwareApplication added site-wide
- Rich docs from `docs/pages` published to `public/docs` and inlined into `llms-full.txt`
- Regenerator: `pnpm --prefix docs ai-docs`
- PR: https://github.com/jrmybtlr/usemods/pull/206
- Validated llms.txt shape, robots.txt AI allows, public docs presence; eslint clean on new server routes + app.vue
- AI assets regenerate on build: Nuxt `build:before` hook, `nuxt-web` prebuild/pregenerate/predev, root `deploy`, and `docs` prebuild
- Fixed Workers Builds failure: prebuild now emits gitignored `utils/navigation.ts`; removed `.md.ts` server routes that hijacked HTML doc prerender
- Gitignored generated AI assets under `nuxt-web/public/{docs,intro,llms*.txt,sitemap.xml}`; source of truth remains `docs/pages` + generator

---

# Modernize `/src` to latest native JavaScript

## Goal
Update function bodies in `/src` to prefer modern native JS APIs (ES2023+) while preserving public APIs and intentional fallbacks. Target: Node `>=20`, `ESNext`.

## Plan
- [x] Modernize `generators.ts` — `crypto.randomUUID()`, `replaceAll`, `Number.isNaN`, `padEnd`, `??`, `.at(0)`
- [x] Modernize `formatters.ts` — `findLast`, `??`, `Number.isNaN`, `slice`, `.at(0)`, `for...of`
- [x] Modernize `actions.ts` — async/`await` over sync `new Promise`, `.at(-1)`
- [x] Modernize `data.ts` — drop `toSorted`/`toReversed` feature detection; use `toReversed`
- [x] Modernize `numbers.ts` — `toSorted`, `for...of`, `??`
- [x] Modernize `modifiers.ts` — `slice`, `replaceAll`, `.at(0)` / `[0]`
- [x] Modernize `goodies.ts` — optional chaining for match counts
- [x] Modernize `validators.ts` — `Number.isNaN`
- [x] Modernize `detections.ts` — `hash.slice(1)`
- [x] Run tests and fix regressions
- [x] Commit, push, open PR

## Do not change
- Crypto / Math.random degraded-environment fallbacks
- Fisher-Yates / rejection sampling loops
- `focusOnNth` `-1`-only special case
- `detectUrlParams` public return shape
- `userAgent || navigator...` empty-string fallback
- Commented-out `dataGroupBy` (Object.groupBy needs Node 21+)

## Review
- All 331 tests pass (`pnpm test`)
- `tsc --noEmit` clean
- Public APIs unchanged; updates are inside function bodies only
- MDN references added for non-obvious native methods (`findLast`, `toSorted`, `replaceAll`, `randomUUID`, etc.)

## Follow-up: safe leftovers
- [x] `Object.hasOwn` in `mergeFields` / `isServerSide`
- [x] `??=` in `standardDeviation`
- [x] Leftover `.at()` usage across formatters/numbers/modifiers/generators/actions
- [x] `Error.cause` in `focusOnNth` (+ test update)
- [x] `formatToParts` for timezone date components in `formatCombinedDates`
