# AI discovery checklist

UseMods already ships LLM-oriented docs (`/llms.txt`, `/llms-full.txt`, `/docs/*.md`). Getting picked up more by coding agents still needs a few **operator** steps outside the repo, plus the files in this PR.

## 1. Cloudflare (required — currently blocking AI crawlers)

Live `https://usemods.com/robots.txt` prepends **Cloudflare Managed** rules that `Disallow: /` for GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot, Bytespider, meta-externalagent, and others, and sets `Content-Signal: …,ai-train=no,…`.

That overrides the allow-list in `nuxt-web/public/robots.txt`.

### Fix in Cloudflare dashboard

1. Open the **usemods.com** zone.
2. Go to **AI Crawl Control** (or **Bot Fight Mode** / managed robots settings, depending on plan).
3. **Allow** (or stop blocking) the major AI crawlers listed above.
4. Prefer Content Signals that allow at least **search** and **AI input / reference** for docs. Training can stay `no` if desired, but crawler `Disallow: /` must go.
5. Under **Security → WAF / Bot**, ensure markdown and LLM paths are **not** challenged:
   - `/llms.txt`, `/llms-full.txt`
   - `/docs/*`
   - `/intro/*.md`
   - `/api/docs*`
   - `/robots.txt`, `/sitemap.xml`
6. Re-check: `curl -sI https://usemods.com/robots.txt` should **not** show managed `Disallow: /` for GPTBot/ClaudeBot, and `curl -sI https://usemods.com/docs/formatters.md` should return `200` (not `cf-mitigated: challenge`).

## 2. Submit to Context7

Coding agents often pull library docs via [Context7](https://context7.com).

1. Open [context7.com/add-library](https://context7.com/add-library).
2. Paste: `https://github.com/LittleFoxCompany/usemods` (or the canonical GitHub URL for this repo).
3. Submit. Parsing respects root [`context7.json`](../context7.json).
4. Optionally claim the library for higher refresh limits.
5. Add repo secret `CONTEXT7_API_KEY` so [`.github/workflows/context7-refresh.yml`](../.github/workflows/context7-refresh.yml) can refresh docs on push to `main`.

Also submit the site corpus if useful:

- Website: `https://usemods.com`
- llms.txt: `https://usemods.com/llms.txt`

(API adds require a Context7 API key from the dashboard.)

## 3. npm / agent metadata (done in-repo)

- `homepage` → `https://usemods.com`
- Richer `description` + task-oriented `keywords`
- Root [`AGENTS.md`](../AGENTS.md) published with the npm package
- README section pointing agents at `/llms.txt`

After the next publish, agents that read `node_modules/usemods` will see `AGENTS.md`.

## 4. Keep the corpus fresh

Website build already regenerates AI assets via `docs/generate-ai-docs.mjs`. After Cloudflare is fixed, crawlers and Context7 can ingest:

- https://usemods.com/llms.txt
- https://usemods.com/llms-full.txt
- https://usemods.com/docs/all.md
