# Dependabot security fixes

- [x] Audit open alerts and classify safe patch upgrades
- [x] Fix root `pnpm-lock.yaml` vulns (defu, node-forge, unhead, serialize-javascript, picomatch)
- [x] Fix `nuxt-module/package-lock.json` vulns (ws, vite, launch-editor, esbuild)
- [x] Verify installs/tests still pass
- [x] Document results

## Review

Applied safe patch-level pins via package manager overrides (no major upgrades).

### Root (`pnpm.overrides`)
| Package | From | To |
|---|---|---|
| defu | 6.1.4 | 6.1.5 |
| node-forge | 1.3.3 | 1.4.0 |
| unhead | 2.1.12 | 2.1.13 |
| serialize-javascript | 7.0.4 | 7.0.5 |
| picomatch (v4 only) | 4.0.3 | 4.0.4 |

### nuxt-module
| Package | To | Notes |
|---|---|---|
| ws | 8.21.1 | override |
| launch-editor | 2.14.1 | override |
| esbuild (>=0.27.3) | 0.28.1 | override; 0.25.x left alone (not vulnerable) |
| vite 7 | 7.3.5 | nested under `@nuxt/vite-builder` / `vite-node` |
| vite 8 | 8.0.16 | pinned direct devDependency |

### Verification
- `pnpm test` — 338 passed
- `nuxt-module` `npm test` — 1 passed

### Left alone (not safe / not in open Dependabot list)
- Broader `npm audit` items in nuxt-module (nuxt/devalue/simple-git/tar/yaml bumps) — larger surface, not in the open Dependabot alert set reviewed
