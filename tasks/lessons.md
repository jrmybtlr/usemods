# Lessons

## UseClassy + Vue Router

- Never use static `*-class="…"` attributes (e.g. `active-class="active"`) alongside UseClassy.
- UseClassy’s `class=` regex uses `(?<![:\w])`, so it matches the `class=` suffix inside `active-class=`, merges the value into `class`, and drops the RouterLink prop — every link looks active.
- Prefer styling `.router-link-active` / `.router-link-exact-active`, or a camelCase binding that does not contain the literal `class=` substring.
