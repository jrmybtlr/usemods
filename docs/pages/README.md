# UseMods Documentation

Welcome to the UseMods documentation! This directory contains comprehensive markdown documentation for each module in the UseMods package, designed to be AI-friendly and easily readable by both humans and LLM agents.

## Modules

### Core Modules

- **[Actions](./actions.md)** - Browser interactions, form handling, scrolling, and function control (debounce/throttle)
- **[Data](./data.md)** - Array and object manipulation (sort, reverse, flatten, deduplicate)
- **[Modifiers](./modifiers.md)** - String manipulation and transformation utilities
- **[Formatters](./formatters.md)** - Number, currency, date, duration, and text formatting
- **[Generators](./generators.md)** - Random number generation, UUIDs, passwords, and placeholder content
- **[Numbers](./numbers.md)** - Mathematical and statistical functions
- **[Validators](./validators.md)** - Data type and format validation

### Detection Modules

- **[Detections](./detections.md)** - Browser and user environment detection (scroll, mouse, window, color scheme, etc.)
- **[Devices](./devices.md)** - Device, OS, and browser detection

### Utility Modules

- **[Goodies](./goodies.md)** - Miscellaneous utilities (password checking, text animation, reading time, etc.)
- **[Tailwind](./tailwind.md)** - Tailwind CSS plugin for device-based variants

## Quick Start

```typescript
import { 
  formatNumber, 
  isEmail, 
  generateUuid4,
  detectBreakpoint 
} from 'usemods'

// Format numbers
formatNumber(1234567.89) // '1,234,567.89'

// Validate email
isEmail('user@example.com') // true

// Generate UUID
generateUuid4() // '550e8400-e29b-41d4-a716-446655440000'

// Detect breakpoint
detectBreakpoint() // 'md', 'lg', etc.
```

## Installation

```bash
npm install usemods
# or
pnpm add usemods
# or
bun add usemods
```

## For Nuxt Users

```bash
npx nuxi module add usemods-nuxt
```

## Documentation Structure

Each module documentation file includes:

1. **Overview** - High-level description of the module
2. **Functions** - Complete function reference with:
   - Function signature
   - Parameters and types
   - Return types
   - Usage examples
   - Important notes
3. **Usage Examples** - Real-world use cases
4. **Notes** - Important implementation details

## AI-Friendly Features

These documentation files are optimized for:

- **LLM Agents** - Clear structure, complete function signatures, and comprehensive examples
- **Code Completion** - Detailed parameter and return type information
- **Documentation Tools** - Standard markdown format that works with documentation generators
- **Search** - Well-organized headings and keywords for easy discovery

## Contributing

When adding new functions to UseMods:

1. Add JSDoc comments to your functions
2. Update the corresponding module's markdown file
3. Include usage examples
4. Document any special notes or edge cases

## License

MIT License - See the main repository for details.

## Links

- [GitHub Repository](https://github.com/LittleFoxCompany/usemods)
- [NPM Package](https://www.npmjs.com/package/usemods)
- [Nuxt Module](https://www.npmjs.com/package/usemods-nuxt)
