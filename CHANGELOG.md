# Changelog

## v1.16.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.15.0...v1.16.0)

## v1.15.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.14.2...v1.15.0)

## v1.14.2

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.14.1...v1.14.2)

## v1.14.1

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.14.0...v1.14.1)

## v1.14.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.13.0...v1.14.0)

### 🩹 Fixes

- **release:** Update release script to use pnpm instead of npm ([a68f052](https://github.com/LittleFoxCompany/usemods/commit/a68f052))
- **release:** Modify release script to skip git checks during publish ([20d628c](https://github.com/LittleFoxCompany/usemods/commit/20d628c))
- Enhance pluralize and singularize functions to handle words with consonants and vowels before 'y' ([7ddd0b4](https://github.com/LittleFoxCompany/usemods/commit/7ddd0b4))

### ❤️ Contributors

- Jeremy Butler <jeremy@jeremymbutler.com>

## v1.13.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.12.0...v1.13.0)

### 🚀 Enhancements

- Add countBy function and CountBy component for text analysis ([61a5131](https://github.com/LittleFoxCompany/usemods/commit/61a5131))

### 🏡 Chore

- **release:** V1.12.0 ([f732d1f](https://github.com/LittleFoxCompany/usemods/commit/f732d1f))

### ❤️ Contributors

- Jeremy Butler <jeremy@jeremymbutler.com>

## v1.12.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.11.0...v1.12.0)

### 🚀 Enhancements

- Add formatCombinedDates function and corresponding tests; remove animations package ([5103b4c](https://github.com/LittleFoxCompany/usemods/commit/5103b4c))
- Enhance formatCombinedDates function to support long and short formats ([f873635](https://github.com/LittleFoxCompany/usemods/commit/f873635))
- Update formatCombinedDates function to support format selection in the UI ([1c7ade4](https://github.com/LittleFoxCompany/usemods/commit/1c7ade4))
- Update formatCombinedDates function to include year in same year formatting and adjust short format ([fd77933](https://github.com/LittleFoxCompany/usemods/commit/fd77933))
- Enhance formatCombinedDates function to include time option for same day formatting ([7908597](https://github.com/LittleFoxCompany/usemods/commit/7908597))
- Update formatCombinedDates function to support datetime-local inputs and simplify options ([f4d912b](https://github.com/LittleFoxCompany/usemods/commit/f4d912b))
- Enhance formatCombinedDates function to handle optional parameters and improve date formatting logic ([b697b86](https://github.com/LittleFoxCompany/usemods/commit/b697b86))

### 🩹 Fixes

- Update condition for Tailwind documentation and add type definitions for injected links ([5954637](https://github.com/LittleFoxCompany/usemods/commit/5954637))
- Remove duplicate export for tailwind in index.ts ([395a10c](https://github.com/LittleFoxCompany/usemods/commit/395a10c))
- Update .gitignore to include the correct Tailwind documentation file and clean up unnecessary entries ([5f3174f](https://github.com/LittleFoxCompany/usemods/commit/5f3174f))
- Remove unused modDevices import from Tailwind configuration ([c33670f](https://github.com/LittleFoxCompany/usemods/commit/c33670f))

### 💅 Refactors

- Remove animations.ts and integrate animateText function into goodies.ts ([bbb3a05](https://github.com/LittleFoxCompany/usemods/commit/bbb3a05))

### 🏡 Chore

- Update version to 1.11.0 in package.json and dependencies ([ad6843c](https://github.com/LittleFoxCompany/usemods/commit/ad6843c))

### 🤖 CI

- Add nuxthub workflow ([b706ae5](https://github.com/LittleFoxCompany/usemods/commit/b706ae5))

### ❤️ Contributors

- Jeremy Butler <jeremy@jeremymbutler.com>

## v1.11.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.10.0...v1.11.0)

### 🚀 Enhancements

- Add debounce and throttle components with corresponding functionality ([3dd59dd](https://github.com/LittleFoxCompany/usemods/commit/3dd59dd))
- Add ClickLog component to display click and execution metrics ([cf9c818](https://github.com/LittleFoxCompany/usemods/commit/cf9c818))

### 🩹 Fixes

- Enhance function pattern regex to support generic type parameters ([fc7adbc](https://github.com/LittleFoxCompany/usemods/commit/fc7adbc))

### 💅 Refactors

- Simplify generateHighResolutionTime usage and update documentation ([bccc3c6](https://github.com/LittleFoxCompany/usemods/commit/bccc3c6))

### 📖 Documentation

- Update decodeUuid7 function documentation to clarify purpose ([eca58d0](https://github.com/LittleFoxCompany/usemods/commit/eca58d0))

### 🏡 Chore

- Update dependencies to latest versions ([6d6e766](https://github.com/LittleFoxCompany/usemods/commit/6d6e766))
- Update dependencies to latest versions ([50f496a](https://github.com/LittleFoxCompany/usemods/commit/50f496a))
- Specify Node.js engine version in package.json ([f97a720](https://github.com/LittleFoxCompany/usemods/commit/f97a720))
- Update Nuxt and Nitro build configuration ([f4260be](https://github.com/LittleFoxCompany/usemods/commit/f4260be))

### ✅ Tests

- Update throttle test to use async and fake timers ([2e2cf72](https://github.com/LittleFoxCompany/usemods/commit/2e2cf72))

### ❤️ Contributors

- Jeremy Butler <jeremy@jeremymbutler.com>

## v1.10.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.9.2...v1.10.0)

### 🚀 Enhancements

- **generators:** Rename UUID generator component and add Version 7 UUID and high-resolution time generators ([cc64165](https://github.com/LittleFoxCompany/usemods/commit/cc64165))
- **generators:** Add Version 4 and Version 7 UUID generation functions and URL-safe encoding/decoding ([f88e46c](https://github.com/LittleFoxCompany/usemods/commit/f88e46c))
- **generators:** Add components for encoding and decoding Short UUIDs; update Unix timestamp handling ([7cc2220](https://github.com/LittleFoxCompany/usemods/commit/7cc2220))
- **generators:** Add UUIDv7 decoding functionality and related tests ([2045fc6](https://github.com/LittleFoxCompany/usemods/commit/2045fc6))
- **generators:** Add result state and generate button to number generation components ([3477da6](https://github.com/LittleFoxCompany/usemods/commit/3477da6))
- **generators:** Add GetSecureRandomValues component for secure random value generation ([fea5f16](https://github.com/LittleFoxCompany/usemods/commit/fea5f16))

### 🩹 Fixes

- **formatters:** Set Unix timestamp to milliseconds by default ([04bad4d](https://github.com/LittleFoxCompany/usemods/commit/04bad4d))
- **formatters:** Handle undefined input in formatUnixTime function ([6d08b9c](https://github.com/LittleFoxCompany/usemods/commit/6d08b9c))

### 💅 Refactors

- **generators:** Remove old UUID generation and add Version 4 and Version 7 UUID functions ([2b5eaa0](https://github.com/LittleFoxCompany/usemods/commit/2b5eaa0))
- **generators:** Remove unused hrtime offset logic and improve UUID formatting ([f62bf2c](https://github.com/LittleFoxCompany/usemods/commit/f62bf2c))
- **generators:** Rename encodeShortUuid to generateShortUuid for clarity ([9cd2907](https://github.com/LittleFoxCompany/usemods/commit/9cd2907))
- **generators:** Rename encodeShortUuid to generateShortUuid for clarity and update tests ([651613a](https://github.com/LittleFoxCompany/usemods/commit/651613a))

### 🏡 Chore

- **release:** V1.10.0 ([71cf314](https://github.com/LittleFoxCompany/usemods/commit/71cf314))
- **release:** V1.10.0 ([45319bb](https://github.com/LittleFoxCompany/usemods/commit/45319bb))

### ✅ Tests

- **generators:** Add tests for UUID generation and Short UUID encoding/decoding ([13f7b62](https://github.com/LittleFoxCompany/usemods/commit/13f7b62))
- **generators:** Update UUID format validation in tests to match standard UUID structure ([b4f7c31](https://github.com/LittleFoxCompany/usemods/commit/b4f7c31))
- **formatters:** Update formatUnixTime tests to handle milliseconds and undefined input ([0c4e1fa](https://github.com/LittleFoxCompany/usemods/commit/0c4e1fa))

### ❤️ Contributors

- Jeremy Butler <jeremy@jeremymbutler.com>

## v1.9.2

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.9.1...v1.9.2)

## v1.9.1

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.9.0...v1.9.1)

## v1.9.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.8.0...v1.9.0)

### 🏡 Chore

- **release:** V1.8.1 ([1a4d0a2](https://github.com/LittleFoxCompany/usemods/commit/1a4d0a2))
- **release:** V1.8.2 ([58f269f](https://github.com/LittleFoxCompany/usemods/commit/58f269f))
- **release:** V1.8.3 ([04d2118](https://github.com/LittleFoxCompany/usemods/commit/04d2118))

### ❤️ Contributors

- Jeremy Butler <jeremy.butler@laravel.com>

## v1.8.3

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.8.0...v1.8.3)

### 🏡 Chore

- **release:** V1.8.0 ([6a26598](https://github.com/LittleFoxCompany/usemods/commit/6a26598))
- **release:** V1.8.1 ([1a4d0a2](https://github.com/LittleFoxCompany/usemods/commit/1a4d0a2))
- **release:** V1.8.2 ([58f269f](https://github.com/LittleFoxCompany/usemods/commit/58f269f))

### ❤️ Contributors

- Jeremy Butler <jeremy.butler@laravel.com>

## v1.8.2

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.8.0...v1.8.2)

### 🏡 Chore

- **release:** V1.8.0 ([6a26598](https://github.com/LittleFoxCompany/usemods/commit/6a26598))
- **release:** V1.8.1 ([1a4d0a2](https://github.com/LittleFoxCompany/usemods/commit/1a4d0a2))

### ❤️ Contributors

- Jeremy Butler <jeremy.butler@laravel.com>

## v1.8.1

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.8.0...v1.8.1)

### 🏡 Chore

- **release:** V1.8.0 ([6a26598](https://github.com/LittleFoxCompany/usemods/commit/6a26598))

### ❤️ Contributors

- Jeremy Butler <jeremy@littlefox.studio>

## v1.8.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.7.1...v1.8.0)

### 🚀 Enhancements

- Add cache configuration for hub ([d400603](https://github.com/LittleFoxCompany/usemods/commit/d400603))

### 🏡 Chore

- Update npm dependencies and package manager versions ([90a2cdf](https://github.com/LittleFoxCompany/usemods/commit/90a2cdf))
- Remove unused npmrc configuration and refactor FormatParagraphs.vue ([8e87cdd](https://github.com/LittleFoxCompany/usemods/commit/8e87cdd))
- Update npm dependencies and package manager versions ([030983d](https://github.com/LittleFoxCompany/usemods/commit/030983d))
- Add option to select locale in FormSelectLocale.vue and update placeholder in FormNumber.vue ([34635a2](https://github.com/LittleFoxCompany/usemods/commit/34635a2))
- Add computed property for formattedCode in FormatLength.vue ([bff9b7c](https://github.com/LittleFoxCompany/usemods/commit/bff9b7c))
- Remove unused Select components ([ecc3c95](https://github.com/LittleFoxCompany/usemods/commit/ecc3c95))
- Add overflow-hidden to Code.vue and Result.vue components ([ffa8150](https://github.com/LittleFoxCompany/usemods/commit/ffa8150))
- Update CSS classes for Button and Example components ([614f8f5](https://github.com/LittleFoxCompany/usemods/commit/614f8f5))
- Update utils/mods directory structure ([94c62a5](https://github.com/LittleFoxCompany/usemods/commit/94c62a5))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.7.1

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.7.0...v1.7.1)

## v1.7.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.6.1...v1.7.0)

### 🚀 Enhancements

- Improve formatParagraphs function to handle empty sentences ([8e9a99d](https://github.com/LittleFoxCompany/usemods/commit/8e9a99d))

### 🏡 Chore

- Bump module number to 1.6.1 ([f90b841](https://github.com/LittleFoxCompany/usemods/commit/f90b841))
- Update TableOfContents.vue to include table of contents in generated markdown ([ebfdcf7](https://github.com/LittleFoxCompany/usemods/commit/ebfdcf7))
- Update TableOfContents.vue to include table of contents in generated markdown ([4f4d0b8](https://github.com/LittleFoxCompany/usemods/commit/4f4d0b8))
- Refactor generateMarkdown function to include optional parameters ([51dc6ac](https://github.com/LittleFoxCompany/usemods/commit/51dc6ac))
- Update Vercel command to use 'generate' instead of 'build' ([1a50ff4](https://github.com/LittleFoxCompany/usemods/commit/1a50ff4))
- Update TableOfContents.vue to include item titles in generated markdown ([63b3718](https://github.com/LittleFoxCompany/usemods/commit/63b3718))
- **deps-dev:** Bump nuxt ([ee804b9](https://github.com/LittleFoxCompany/usemods/commit/ee804b9))
- Add @css-inline/css-inline ([1f4302b](https://github.com/LittleFoxCompany/usemods/commit/1f4302b))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.6.1

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.6.0...v1.6.1)

### 🏡 Chore

- Add validation for animation unit in animateText function ([ba0c076](https://github.com/LittleFoxCompany/usemods/commit/ba0c076))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.6.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.5.2...v1.6.0)

### 🚀 Enhancements

- Add lazy loading for images in index page ([d6ceca8](https://github.com/LittleFoxCompany/usemods/commit/d6ceca8))

### 💅 Refactors

- Improve accessibility in ThemeSwitch and MainNavigation components ([2588901](https://github.com/LittleFoxCompany/usemods/commit/2588901))
- Update unit and decimals initialization in FormatUnit.vue ([1d8cb35](https://github.com/LittleFoxCompany/usemods/commit/1d8cb35))
- Update temperature unit options in FormatTemperature.vue ([4b94cea](https://github.com/LittleFoxCompany/usemods/commit/4b94cea))

### 🏡 Chore

- Update usemods package version to 1.5.2 ([4a9d340](https://github.com/LittleFoxCompany/usemods/commit/4a9d340))
- Update file paths and imports for maps.ts ([e4afb50](https://github.com/LittleFoxCompany/usemods/commit/e4afb50))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.5.2

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.5.1...v1.5.2)

### 🩹 Fixes

- Ensure node detection before globalThis to remove explicit cypto import ([11b514e](https://github.com/LittleFoxCompany/usemods/commit/11b514e))

### 🏡 Chore

- Refactor generator components to use client-side rendering ([4692f8f](https://github.com/LittleFoxCompany/usemods/commit/4692f8f))
- Refactor getRandomValue function to handle different environments ([3ac00c1](https://github.com/LittleFoxCompany/usemods/commit/3ac00c1))
- Update Node.js version in CI workflow to support 18.x, 20.x, and 22.x ([b685f43](https://github.com/LittleFoxCompany/usemods/commit/b685f43))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.5.1

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.5.0...v1.5.1)

### 🏡 Chore

- Update npm dependency to latest stable version ([4c9d539](https://github.com/LittleFoxCompany/usemods/commit/4c9d539))
- **release:** V1.5.1 ([ae5e29e](https://github.com/LittleFoxCompany/usemods/commit/ae5e29e))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.5.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.4.3...v1.5.0)

### 🚀 Enhancements

- Add FormatLength component for formatting lengths ([e062f4b](https://github.com/LittleFoxCompany/usemods/commit/e062f4b))

### 🏡 Chore

- Update npm dependencies ([d6d0a95](https://github.com/LittleFoxCompany/usemods/commit/d6d0a95))
- Update npm dependencies and bump version ([dbd11ad](https://github.com/LittleFoxCompany/usemods/commit/dbd11ad))
- Refactor debounce function to use clearer variable names ([d66d728](https://github.com/LittleFoxCompany/usemods/commit/d66d728))
- Remove commented out code in devices.test.ts ([f3ab336](https://github.com/LittleFoxCompany/usemods/commit/f3ab336))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.4.3

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.4.2...v1.4.3)

### 🏡 Chore

- **release:** V1.4.3 ([208d0a1](https://github.com/LittleFoxCompany/usemods/commit/208d0a1))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.4.2

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.4.1...v1.4.2)

### 🚀 Enhancements

- Improve browser and OS detection logic ([1679a6c](https://github.com/LittleFoxCompany/usemods/commit/1679a6c))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.4.1

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.4.0...v1.4.1)

## v1.4.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.3.1...v1.4.0)

### 🚀 Enhancements

- Fix bug in clearAll function for document deletion ([25328c6](https://github.com/LittleFoxCompany/usemods/commit/25328c6))
- Add 'tailwind' file to the list of files for generating markdown ([1b22fda](https://github.com/LittleFoxCompany/usemods/commit/1b22fda))

### 💅 Refactors

- Refactor device detection and add user agent detection ([e65294c](https://github.com/LittleFoxCompany/usemods/commit/e65294c))
- Remove unnecessary test case for modDevices plugin ([5f524db](https://github.com/LittleFoxCompany/usemods/commit/5f524db))
- Remove unnecessary test case for modDevices plugin ([a5b2dda](https://github.com/LittleFoxCompany/usemods/commit/a5b2dda))
- Update Tailwind documentation with plugin usage ([e1d41fb](https://github.com/LittleFoxCompany/usemods/commit/e1d41fb))
- Remove unnecessary test case for modDevices plugin ([f7fcf71](https://github.com/LittleFoxCompany/usemods/commit/f7fcf71))
- Remove unnecessary test case for modDevices plugin ([186a3e4](https://github.com/LittleFoxCompany/usemods/commit/186a3e4))
- Remove unnecessary test case for modDevices plugin ([c16afee](https://github.com/LittleFoxCompany/usemods/commit/c16afee))
- Update Tailwind documentation with plugin usage ([5318110](https://github.com/LittleFoxCompany/usemods/commit/5318110))
- Remove unnecessary test case for modDevices plugin ([56ea552](https://github.com/LittleFoxCompany/usemods/commit/56ea552))
- Remove unused code for animating text ([f798966](https://github.com/LittleFoxCompany/usemods/commit/f798966))

### 📖 Documentation

- Update Tailwind plugin documentation ([9158e42](https://github.com/LittleFoxCompany/usemods/commit/9158e42))

### 🏡 Chore

- Update .gitignore and add device classes for device detection ([6fd8938](https://github.com/LittleFoxCompany/usemods/commit/6fd8938))
- Update file generation and cleanup process ([84795f1](https://github.com/LittleFoxCompany/usemods/commit/84795f1))
- Update npm dependencies and dev tools versions ([94fd1d6](https://github.com/LittleFoxCompany/usemods/commit/94fd1d6))
- Update npm dependencies and dev tools versions ([ef89c6e](https://github.com/LittleFoxCompany/usemods/commit/ef89c6e))
- Update optional dependency for @rollup/rollup-linux-x64-gnu to version 4.9.5 ([385ead1](https://github.com/LittleFoxCompany/usemods/commit/385ead1))
- Update npm dependencies to latest versions ([77caeef](https://github.com/LittleFoxCompany/usemods/commit/77caeef))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.3.1

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.3.0...v1.3.1)

## v1.3.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.2.1...v1.3.0)

### 💅 Refactors

- Remove unused code from playground page ([57be9e9](https://github.com/LittleFoxCompany/usemods/commit/57be9e9))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.2.1

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.2.0...v1.2.1)

### 🏡 Chore

- Bump version to 1.2.0 ([5f047b8](https://github.com/LittleFoxCompany/usemods/commit/5f047b8))
- Update dependencies and add CI badges ([dfc6d42](https://github.com/LittleFoxCompany/usemods/commit/dfc6d42))
- Remove unused dependency and update package.json ([4cc6506](https://github.com/LittleFoxCompany/usemods/commit/4cc6506))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.2.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.1.0...v1.2.0)

### 💅 Refactors

- Remove unused code from playground page ([365178c](https://github.com/LittleFoxCompany/usemods/commit/365178c))

### 🏡 Chore

- Update number calculation components to parse input as JSON ([5967f35](https://github.com/LittleFoxCompany/usemods/commit/5967f35))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.1.0

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v1.0.1...v1.1.0)

## v1.0.1

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.22...v1.0.1)

### 🏡 Chore

- **release:** V0.0.23 ([15f6b9a](https://github.com/LittleFoxCompany/usemods/commit/15f6b9a))
- **release:** V1.0.1 ([5b19273](https://github.com/LittleFoxCompany/usemods/commit/5b19273))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v1.0.1

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.22...v1.0.1)

### 🏡 Chore

- **release:** V0.0.23 ([15f6b9a](https://github.com/LittleFoxCompany/usemods/commit/15f6b9a))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v0.0.23

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.22...v0.0.23)

## v0.0.22

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.21...v0.0.22)

### 🏡 Chore

- **release:** V0.0.21 ([a7b0b7e](https://github.com/LittleFoxCompany/usemods/commit/a7b0b7e))

### ❤️ Contributors

- Phillip Hartin ([@philliphartin](http://github.com/philliphartin))

## v0.0.21

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.20...v0.0.21)

## v0.0.20

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.12...v0.0.20)

### 🚀 Enhancements

- Add Vue example in the Usage section for clarity and consistency with other sections. ([b96544b](https://github.com/LittleFoxCompany/usemods/commit/b96544b))

### 🩹 Fixes

- Correct regex pattern to match params in props object in order to correctly extract parameters for further processing. ([4d709d3](https://github.com/LittleFoxCompany/usemods/commit/4d709d3))

### 💅 Refactors

- Adjusted styling and content for homepage title and Get Started button to improve readability and user experience. ([516e7ce](https://github.com/LittleFoxCompany/usemods/commit/516e7ce))
- Change parameter name from 'value' to 'number' in formatNumber and formatCurrency functions to improve code readability. ([eb7d336](https://github.com/LittleFoxCompany/usemods/commit/eb7d336))
- Decreased font size on title to improve readability on smaller screens. ([bebdb80](https://github.com/LittleFoxCompany/usemods/commit/bebdb80))
- Update version to 0.0.12 and fix value parameter name for formatNumber and formatCurrency functions. ([b321324](https://github.com/LittleFoxCompany/usemods/commit/b321324))
- Rename argument 'value' to 'number' in formatValuation function for clarity and consistency. ([f229ebb](https://github.com/LittleFoxCompany/usemods/commit/f229ebb))
- Update version to 0.0.13 and introduce new enhancements and refactors for improved functionality and design consistency. ([ecc5f14](https://github.com/LittleFoxCompany/usemods/commit/ecc5f14))
- Adjust font size and spacing for better readability and responsiveness. ([98a7808](https://github.com/LittleFoxCompany/usemods/commit/98a7808))
- Remove unnecessary "docs:use-local-package" script ([b9e78b6](https://github.com/LittleFoxCompany/usemods/commit/b9e78b6))
- Renamed the test function from sortBy to dataSortBy to match the imported function name. ([9e5d79b](https://github.com/LittleFoxCompany/usemods/commit/9e5d79b))
- Improve date validation to handle 'Invalid Date' case and add Boolean type to props for better type checking. ([e04d41b](https://github.com/LittleFoxCompany/usemods/commit/e04d41b))
- Remove unnecessary "docs:use-local-package" script ([538ad85](https://github.com/LittleFoxCompany/usemods/commit/538ad85))
- Remove unnecessary "docs:use-local-package" script ([10cd435](https://github.com/LittleFoxCompany/usemods/commit/10cd435))
- Improve password generation method using window.crypto for better security. ([f184b77](https://github.com/LittleFoxCompany/usemods/commit/f184b77))
- Updated form inputs to have default empty values for user inputs. ([9d18391](https://github.com/LittleFoxCompany/usemods/commit/9d18391))
- Simplified the introduction section in the documentation for UseMods library to focus on the key features and benefits. ([57b56eb](https://github.com/LittleFoxCompany/usemods/commit/57b56eb))
- Updated toggleBodyScroll and toggleElementScroll to return promises instead of using callbacks. ([1c4a438](https://github.com/LittleFoxCompany/usemods/commit/1c4a438))
- Add touch-manipulation class to buttons for better touch responsiveness. ([6a286ca](https://github.com/LittleFoxCompany/usemods/commit/6a286ca))

### 📦 Build

- Update version to 0.0.14 for Nuxt module support and various enhancements, fixes, and refactors. ([ef57fbc](https://github.com/LittleFoxCompany/usemods/commit/ef57fbc))
- Update version to 0.0.14 for Nuxt module support and various enhancements, fixes, and refactors. ([596ddd6](https://github.com/LittleFoxCompany/usemods/commit/596ddd6))

### 🏡 Chore

- **release:** V0.0.15 ([cf5129e](https://github.com/LittleFoxCompany/usemods/commit/cf5129e))
- **release:** V0.0.16 ([1c2772d](https://github.com/LittleFoxCompany/usemods/commit/1c2772d))
- **release:** V0.0.17 ([c0e3b91](https://github.com/LittleFoxCompany/usemods/commit/c0e3b91))
- **release:** V0.0.18 ([c701886](https://github.com/LittleFoxCompany/usemods/commit/c701886))
- **release:** V0.0.19 ([ac20370](https://github.com/LittleFoxCompany/usemods/commit/ac20370))

### ❤️ Contributors

- Phillip Hartin ([@philliphartin](http://github.com/philliphartin))
- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v0.0.19

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.18...v0.0.19)

## v0.0.18

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.17...v0.0.18)

## v0.0.17

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.16...v0.0.17)

## v0.0.16

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.15...v0.0.16)

## v0.0.15

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.12...v0.0.15)

### 🚀 Enhancements

- Add Vue example in the Usage section for clarity and consistency with other sections. ([b96544b](https://github.com/LittleFoxCompany/usemods/commit/b96544b))

### 🩹 Fixes

- Correct regex pattern to match params in props object in order to correctly extract parameters for further processing. ([4d709d3](https://github.com/LittleFoxCompany/usemods/commit/4d709d3))

### 💅 Refactors

- Adjusted styling and content for homepage title and Get Started button to improve readability and user experience. ([516e7ce](https://github.com/LittleFoxCompany/usemods/commit/516e7ce))
- Change parameter name from 'value' to 'number' in formatNumber and formatCurrency functions to improve code readability. ([eb7d336](https://github.com/LittleFoxCompany/usemods/commit/eb7d336))
- Decreased font size on title to improve readability on smaller screens. ([bebdb80](https://github.com/LittleFoxCompany/usemods/commit/bebdb80))
- Update version to 0.0.12 and fix value parameter name for formatNumber and formatCurrency functions. ([b321324](https://github.com/LittleFoxCompany/usemods/commit/b321324))
- Rename argument 'value' to 'number' in formatValuation function for clarity and consistency. ([f229ebb](https://github.com/LittleFoxCompany/usemods/commit/f229ebb))
- Update version to 0.0.13 and introduce new enhancements and refactors for improved functionality and design consistency. ([ecc5f14](https://github.com/LittleFoxCompany/usemods/commit/ecc5f14))
- Adjust font size and spacing for better readability and responsiveness. ([98a7808](https://github.com/LittleFoxCompany/usemods/commit/98a7808))
- Remove unnecessary "docs:use-local-package" script ([b9e78b6](https://github.com/LittleFoxCompany/usemods/commit/b9e78b6))
- Renamed the test function from sortBy to dataSortBy to match the imported function name. ([9e5d79b](https://github.com/LittleFoxCompany/usemods/commit/9e5d79b))
- Improve date validation to handle 'Invalid Date' case and add Boolean type to props for better type checking. ([e04d41b](https://github.com/LittleFoxCompany/usemods/commit/e04d41b))
- Remove unnecessary "docs:use-local-package" script ([538ad85](https://github.com/LittleFoxCompany/usemods/commit/538ad85))
- Remove unnecessary "docs:use-local-package" script ([10cd435](https://github.com/LittleFoxCompany/usemods/commit/10cd435))
- Improve password generation method using window.crypto for better security. ([f184b77](https://github.com/LittleFoxCompany/usemods/commit/f184b77))
- Updated form inputs to have default empty values for user inputs. ([9d18391](https://github.com/LittleFoxCompany/usemods/commit/9d18391))
- Simplified the introduction section in the documentation for UseMods library to focus on the key features and benefits. ([57b56eb](https://github.com/LittleFoxCompany/usemods/commit/57b56eb))
- Updated toggleBodyScroll and toggleElementScroll to return promises instead of using callbacks. ([1c4a438](https://github.com/LittleFoxCompany/usemods/commit/1c4a438))
- Add touch-manipulation class to buttons for better touch responsiveness. ([6a286ca](https://github.com/LittleFoxCompany/usemods/commit/6a286ca))

### 📦 Build

- Update version to 0.0.14 for Nuxt module support and various enhancements, fixes, and refactors. ([ef57fbc](https://github.com/LittleFoxCompany/usemods/commit/ef57fbc))
- Update version to 0.0.14 for Nuxt module support and various enhancements, fixes, and refactors. ([596ddd6](https://github.com/LittleFoxCompany/usemods/commit/596ddd6))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))
- Phillip Hartin ([@philliphartin](http://github.com/philliphartin))

## v0.0.14

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.11...v0.0.14)

### 🚀 Enhancements

- Add Nuxt module support and Nuxt-Shiki highlighting ([79e9f50](https://github.com/LittleFoxCompany/usemods/commit/79e9f50))
- Add Vue example in the Usage section for clarity and consistency with other sections. ([b96544b](https://github.com/LittleFoxCompany/usemods/commit/b96544b))

### 🩹 Fixes

- Correct regex pattern to match params in props object in order to correctly extract parameters for further processing. ([4d709d3](https://github.com/LittleFoxCompany/usemods/commit/4d709d3))

### 💅 Refactors

- Update main container styling to allow for overflow clipping for better user experience. ([2e0ecaa](https://github.com/LittleFoxCompany/usemods/commit/2e0ecaa))
- Updated the border radius to rounded-xl for improved design consistency. ([0853eb4](https://github.com/LittleFoxCompany/usemods/commit/0853eb4))
- Update styling classes in template and pre elements for consistency and improved readability. ([2bed5e0](https://github.com/LittleFoxCompany/usemods/commit/2bed5e0))
- Adjusted styling and content for homepage title and Get Started button to improve readability and user experience. ([516e7ce](https://github.com/LittleFoxCompany/usemods/commit/516e7ce))
- Change parameter name from 'value' to 'number' in formatNumber and formatCurrency functions to improve code readability. ([eb7d336](https://github.com/LittleFoxCompany/usemods/commit/eb7d336))
- Decreased font size on title to improve readability on smaller screens. ([bebdb80](https://github.com/LittleFoxCompany/usemods/commit/bebdb80))
- Update version to 0.0.12 and fix value parameter name for formatNumber and formatCurrency functions. ([b321324](https://github.com/LittleFoxCompany/usemods/commit/b321324))
- Rename argument 'value' to 'number' in formatValuation function for clarity and consistency. ([f229ebb](https://github.com/LittleFoxCompany/usemods/commit/f229ebb))
- Update version to 0.0.13 and introduce new enhancements and refactors for improved functionality and design consistency. ([ecc5f14](https://github.com/LittleFoxCompany/usemods/commit/ecc5f14))
- Adjust font size and spacing for better readability and responsiveness. ([98a7808](https://github.com/LittleFoxCompany/usemods/commit/98a7808))
- Remove unnecessary "docs:use-local-package" script ([b9e78b6](https://github.com/LittleFoxCompany/usemods/commit/b9e78b6))
- Renamed the test function from sortBy to dataSortBy to match the imported function name. ([9e5d79b](https://github.com/LittleFoxCompany/usemods/commit/9e5d79b))
- Improve date validation to handle 'Invalid Date' case and add Boolean type to props for better type checking. ([e04d41b](https://github.com/LittleFoxCompany/usemods/commit/e04d41b))
- Remove unnecessary "docs:use-local-package" script ([538ad85](https://github.com/LittleFoxCompany/usemods/commit/538ad85))
- Remove unnecessary "docs:use-local-package" script ([10cd435](https://github.com/LittleFoxCompany/usemods/commit/10cd435))
- Improve password generation method using window.crypto for better security. ([f184b77](https://github.com/LittleFoxCompany/usemods/commit/f184b77))

### 🏡 Chore

- **release:** V1.0.1 ([ec7dbc8](https://github.com/LittleFoxCompany/usemods/commit/ec7dbc8))
- **release:** V0.0.12 ([b0341c2](https://github.com/LittleFoxCompany/usemods/commit/b0341c2))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))
- Phillip Hartin ([@philliphartin](http://github.com/philliphartin))

## v0.0.13

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.11...v0.0.13)

### 🚀 Enhancements

- Add Nuxt module support and Nuxt-Shiki highlighting ([79e9f50](https://github.com/LittleFoxCompany/usemods/commit/79e9f50))
- Add Vue example in the Usage section for clarity and consistency with other sections. ([b96544b](https://github.com/LittleFoxCompany/usemods/commit/b96544b))

### 💅 Refactors

- Update main container styling to allow for overflow clipping for better user experience. ([2e0ecaa](https://github.com/LittleFoxCompany/usemods/commit/2e0ecaa))
- Updated the border radius to rounded-xl for improved design consistency. ([0853eb4](https://github.com/LittleFoxCompany/usemods/commit/0853eb4))
- Update styling classes in template and pre elements for consistency and improved readability. ([2bed5e0](https://github.com/LittleFoxCompany/usemods/commit/2bed5e0))
- Adjusted styling and content for homepage title and Get Started button to improve readability and user experience. ([516e7ce](https://github.com/LittleFoxCompany/usemods/commit/516e7ce))
- Change parameter name from 'value' to 'number' in formatNumber and formatCurrency functions to improve code readability. ([eb7d336](https://github.com/LittleFoxCompany/usemods/commit/eb7d336))
- Decreased font size on title to improve readability on smaller screens. ([bebdb80](https://github.com/LittleFoxCompany/usemods/commit/bebdb80))
- Update version to 0.0.12 and fix value parameter name for formatNumber and formatCurrency functions. ([b321324](https://github.com/LittleFoxCompany/usemods/commit/b321324))

### 🏡 Chore

- **release:** V1.0.1 ([ec7dbc8](https://github.com/LittleFoxCompany/usemods/commit/ec7dbc8))
- **release:** V0.0.12 ([b0341c2](https://github.com/LittleFoxCompany/usemods/commit/b0341c2))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))
- Phillip Hartin ([@philliphartin](http://github.com/philliphartin))

## v0.0.12

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.11...v0.0.12)

### 🚀 Enhancements

- Add Nuxt module support and Nuxt-Shiki highlighting ([79e9f50](https://github.com/LittleFoxCompany/usemods/commit/79e9f50))

### 💅 Refactors

- Update main container styling to allow for overflow clipping for better user experience. ([2e0ecaa](https://github.com/LittleFoxCompany/usemods/commit/2e0ecaa))
- Updated the border radius to rounded-xl for improved design consistency. ([0853eb4](https://github.com/LittleFoxCompany/usemods/commit/0853eb4))
- Update styling classes in template and pre elements for consistency and improved readability. ([2bed5e0](https://github.com/LittleFoxCompany/usemods/commit/2bed5e0))

### 🏡 Chore

- **release:** V1.0.1 ([ec7dbc8](https://github.com/LittleFoxCompany/usemods/commit/ec7dbc8))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))
- Phillip Hartin ([@philliphartin](http://github.com/philliphartin))

## v0.0.11

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.8...v0.0.11)

### 🚀 Enhancements

- Update dependencies with new packages and versions, including floating-ui ([e56626d](https://github.com/LittleFoxCompany/usemods/commit/e56626d))

### 🩹 Fixes

- Add missing dependency '@vueuse/core' to package.json for mods-module-docs to resolve runtime issues ([c196a2e](https://github.com/LittleFoxCompany/usemods/commit/c196a2e))

### 💅 Refactors

- Update scrollToAnchor, toggleBodyScroll, toggleElementScroll, ([f08eb1c](https://github.com/LittleFoxCompany/usemods/commit/f08eb1c))
- Extract Jagger component for reusability and readability ([9a355b2](https://github.com/LittleFoxCompany/usemods/commit/9a355b2))

### 📖 Documentation

- Update titles and content in markdown files ([638a187](https://github.com/LittleFoxCompany/usemods/commit/638a187))

### 🏡 Chore

- Update version to v0.0.9 in changelog and package.json to reflect recent changes and additions. ([51c73c5](https://github.com/LittleFoxCompany/usemods/commit/51c73c5))
- Add configuration for Tailwind CSS and aliases in Nuxt.js project ([025552f](https://github.com/LittleFoxCompany/usemods/commit/025552f))

### 🎨 Styles

- Update component styles and refactor form input handling logic ([b3bd840](https://github.com/LittleFoxCompany/usemods/commit/b3bd840))
- Add js icons ([797e73b](https://github.com/LittleFoxCompany/usemods/commit/797e73b))
- Improve formatting and readability for numbers and input fields ([274c85f](https://github.com/LittleFoxCompany/usemods/commit/274c85f))
- Update lead descriptions for consistency and clarity ([33fdc50](https://github.com/LittleFoxCompany/usemods/commit/33fdc50))
- Improve dropdown menu layout and styling for better user experience ([75da6b8](https://github.com/LittleFoxCompany/usemods/commit/75da6b8))
- Update Tailwind CSS configuration and add clsx utility function ([8992891](https://github.com/LittleFoxCompany/usemods/commit/8992891))
- Add custom styles for input, body, container, and input number type ([aa96be1](https://github.com/LittleFoxCompany/usemods/commit/aa96be1))
- Reorganize Tailwind CSS imports for better readability ([d3dae81](https://github.com/LittleFoxCompany/usemods/commit/d3dae81))
- Update styles for links and dropdown items to improve consistency and readability ([93c5bc1](https://github.com/LittleFoxCompany/usemods/commit/93c5bc1))
- Refactor styling classes for consistency and readability ([15e0bfa](https://github.com/LittleFoxCompany/usemods/commit/15e0bfa))
- Improve code readability by formatting object return types in detectMousePosition and detectRelativeMousePosition functions ([8a91aec](https://github.com/LittleFoxCompany/usemods/commit/8a91aec))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v0.0.10

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.8...v0.0.10)

### 🚀 Enhancements

- Update dependencies with new packages and versions, including floating-ui ([e56626d](https://github.com/LittleFoxCompany/usemods/commit/e56626d))

### 🩹 Fixes

- Add missing dependency '@vueuse/core' to package.json for mods-module-docs to resolve runtime issues ([c196a2e](https://github.com/LittleFoxCompany/usemods/commit/c196a2e))

### 💅 Refactors

- Update scrollToAnchor, toggleBodyScroll, toggleElementScroll, ([f08eb1c](https://github.com/LittleFoxCompany/usemods/commit/f08eb1c))
- Extract Jagger component for reusability and readability ([9a355b2](https://github.com/LittleFoxCompany/usemods/commit/9a355b2))

### 📖 Documentation

- Update titles and content in markdown files ([638a187](https://github.com/LittleFoxCompany/usemods/commit/638a187))

### 🏡 Chore

- Update version to v0.0.9 in changelog and package.json to reflect recent changes and additions. ([51c73c5](https://github.com/LittleFoxCompany/usemods/commit/51c73c5))
- Add configuration for Tailwind CSS and aliases in Nuxt.js project ([025552f](https://github.com/LittleFoxCompany/usemods/commit/025552f))

### 🎨 Styles

- Update component styles and refactor form input handling logic ([b3bd840](https://github.com/LittleFoxCompany/usemods/commit/b3bd840))
- Add js icons ([797e73b](https://github.com/LittleFoxCompany/usemods/commit/797e73b))
- Improve formatting and readability for numbers and input fields ([274c85f](https://github.com/LittleFoxCompany/usemods/commit/274c85f))
- Update lead descriptions for consistency and clarity ([33fdc50](https://github.com/LittleFoxCompany/usemods/commit/33fdc50))
- Improve dropdown menu layout and styling for better user experience ([75da6b8](https://github.com/LittleFoxCompany/usemods/commit/75da6b8))
- Update Tailwind CSS configuration and add clsx utility function ([8992891](https://github.com/LittleFoxCompany/usemods/commit/8992891))
- Add custom styles for input, body, container, and input number type ([aa96be1](https://github.com/LittleFoxCompany/usemods/commit/aa96be1))
- Reorganize Tailwind CSS imports for better readability ([d3dae81](https://github.com/LittleFoxCompany/usemods/commit/d3dae81))
- Update styles for links and dropdown items to improve consistency and readability ([93c5bc1](https://github.com/LittleFoxCompany/usemods/commit/93c5bc1))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v0.0.9

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.8...v0.0.9)

### 💅 Refactors

- Update scrollToAnchor, toggleBodyScroll, toggleElementScroll, ([f08eb1c](https://github.com/LittleFoxCompany/usemods/commit/f08eb1c))

### 🎨 Styles

- Update component styles and refactor form input handling logic ([b3bd840](https://github.com/LittleFoxCompany/usemods/commit/b3bd840))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v0.0.8

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.6...v0.0.8)

### 💅 Refactors

- Simplify navigation links in Vue component to improve readability and maintainability ([b765066](https://github.com/LittleFoxCompany/usemods/commit/b765066))
- Update data references in template to use optional chaining for prev and next properties ([aecfa37](https://github.com/LittleFoxCompany/usemods/commit/aecfa37))

### ✅ Tests

- Add comprehensive test cases for password strength checking function ([a838810](https://github.com/LittleFoxCompany/usemods/commit/a838810))

### 🎨 Styles

- Remove unnecessary line in NavDropdownItem component ([a6b0cc8](https://github.com/LittleFoxCompany/usemods/commit/a6b0cc8))
- Add lead text to NavDropdownItem in Vue component ([537832f](https://github.com/LittleFoxCompany/usemods/commit/537832f))

### ❤️ Contributors

- Jeremy Butler ([@jrmymbtlr](http://github.com/jrmymbtlr))

## v0.0.6

[compare changes](https://github.com/LittleFoxCompany/usemods/compare/v0.0.5...v0.0.6)

## v0.0.5


### 🏡 Chore

- **app:** Initial commit by Nuxt Studio ([b6bf486](https://github.com/LittleFoxCompany/usemods/commit/b6bf486))
- **deployment:** Add workflow file ([f9539ba](https://github.com/LittleFoxCompany/usemods/commit/f9539ba))
- **release:** V0.0.4 ([b76bf86](https://github.com/LittleFoxCompany/usemods/commit/b76bf86))

### ❤️ Contributors

- Phillip Hartin ([@philliphartin](http://github.com/philliphartin))
- Jeremy Butler <jeremy@jeremymbutler.com>

## v0.0.4


### 🏡 Chore

- **app:** Initial commit by Nuxt Studio ([b6bf486](https://github.com/LittleFoxCompany/usemods/commit/b6bf486))
- **deployment:** Add workflow file ([f9539ba](https://github.com/LittleFoxCompany/usemods/commit/f9539ba))

### ❤️ Contributors

- Jeremy Butler <jeremy@jeremymbutler.com>

