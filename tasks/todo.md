# Consistent `/src` parameter language

## Goal
Align function parameter names across `/src` so related APIs read with the same vocabulary.

## Convention applied
| Input kind | Param name |
|---|---|
| Unknown / polymorphic validators | `value` |
| String content | `text` |
| Single number (format / math scalar) | `number` (or domain: `seconds`, `timestamp`) |
| Number arrays | `numbers` |
| Collections | `items` |
| Callbacks | `fn` |
| Wait interval (ms) | `delay` |
| Focus / query root | `container` |
| Specific DOM node | `element` |
| Inclusive ranges | `from` / `to` |
| User agent | `userAgent` |

## Plan
- [x] Align modifiers string params (`value`/`word` → `text`; `ordinalize` → `number`)
- [x] Align `debounce` / `throttle` (`func`→`fn`, `threshold`→`delay`)
- [x] Align password option keys between `generatePassword` and `checkPasswordStrength`
- [x] Align numbers scalar margin/markup params (`value` → `number`)
- [x] Update docs to match
- [x] Run tests
- [x] Commit, push, open PR

## Left as-is (intentional)
- Validator `value` — correct for polymorphic input
- Formatter `number` vs `text` split — intentional by type
- `devices` `win` — avoids shadowing `window`
- `copyToClipboard(value)` — accepts `string | number`
- Short/long defaults differ by domain (`display` default `long` for unit/duration/dates, `short` for file/length/temp)

## Follow-up: short/long display options
- [x] Unify all short/long options to `display`
- [x] Keep legacy aliases: `unitDisplay`, `labels`, `monthDisplay`, `format`
- [x] Update docs + nuxt-web demos/params
- [x] Tests for `display` + legacy aliases

## Review
- Positional renames are DX-only (call sites using positional args unchanged)
- Password options: preferred `numbers`/`symbols`, legacy `number`/`special` still accepted
- Short/long verbosity is always `display: 'short' | 'long'` across formatters
- All 331 tests pass; `tsc --noEmit` clean
