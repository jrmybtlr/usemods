# Automate NPM publish on GitHub Actions

- [x] Rewrite `.github/workflows/release.yml` (pnpm, Node 20, publish both packages + changelogithub)
- [x] Change `release:patch|minor|major` to changelogen + `git push --follow-tags` (no local publish)
- [x] Document `NPM_TOKEN` secret setup

## Review

Tag push `v*` now publishes `usemods` + `usemods-nuxt` via Actions. Local release scripts only bump/tag/push.

### Workflow
1. `pnpm run release:patch` (or minor/major) — test, changelogen, push tag
2. Actions: changelogithub → publish root → sync-versions → publish `usemods-nuxt`

### Secret (manual)
Add repo secret **`NPM_TOKEN`**:
1. npmjs.com → Access Tokens → granular (or classic) with publish on `usemods` + `usemods-nuxt`
2. GitHub repo → Settings → Secrets and variables → Actions → `NPM_TOKEN`

### Manual fallback
`pnpm run nuxt-module:release` still available for emergency local Nuxt module publish.
