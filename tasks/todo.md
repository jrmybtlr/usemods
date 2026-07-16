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
