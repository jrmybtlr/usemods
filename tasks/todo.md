# Fix PR #219 merge conflicts + consistency gaps

## Plan
- [x] Resolve conflicts: drop `formatCombinedDates` from formatters (keep dates)
- [x] Align `combineDates` to `display` + legacy `format` alias
- [x] Update dates demo/docs/tests for `display`
- [x] Sweep stale demos (password numbers/symbols, throttle delay, unitDisplay → display)
- [x] Delete `FormatCombinedDates.vue`; verify tests

## Review
- Conflicts cleared in `formatters.ts`, `formatters.test.ts`, `formatters.md`, `formatters.vue`
- Canonical API remains `combineDates` in `dates.ts` with deprecated `formatCombinedDates` alias
- `display` preferred; `format` kept as legacy alias
- Demo/docs updated for password, throttle, formatter display defaults
- 339 tests passed; `tsc --noEmit` clean; no conflict markers left
