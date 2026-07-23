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
- `formatDurationLabels` `labels` option — public API alias for display style
- `devices` `win` — avoids shadowing `window`
- `copyToClipboard(value)` — accepts `string | number`

## Review
- Positional renames are DX-only (call sites using positional args unchanged)
- Password options: preferred `numbers`/`symbols`, legacy `number`/`special` still accepted
- All 331 tests pass; `tsc --noEmit` clean
