## Plan

- [x] Remove deprecated date formatters and related docs/tests/files
- [x] Implement `timeFrom` (relative time from “now”)
- [x] Implement `timeDifference` (difference between two datetimes; auto vs override unit)
- [x] Update exports + Nuxt docs pages/components
- [x] Run tests (Vitest) and verify Nuxt build/dev no longer errors

## Notes

- Use native `Intl.RelativeTimeFormat`, `Intl.PluralRules`, and `Intl.NumberFormat` where possible.
- Removed Nuxt demo components for `formatDateToParts`, `formatWeekday`, `formatMonthDay`, `formatMonthYear`, `formatDateNumeric`, `formatDateIsoLocal` (no longer in `src/dates.ts`).

## Review

- `pnpm test` (Vitest): 14 files, 337 tests passed.
