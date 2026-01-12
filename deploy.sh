#!/bin/bash
# Deploy script for Cloudflare Pages
cd nuxt-web
npx wrangler pages deploy dist
