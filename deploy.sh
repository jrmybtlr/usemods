#!/bin/bash
# Deploy script for Cloudflare Pages
set -euo pipefail
node docs/generate-ai-docs.mjs
cd nuxt-web
npx wrangler pages deploy dist
