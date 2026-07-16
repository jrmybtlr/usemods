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
