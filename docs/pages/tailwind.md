# Tailwind

Utilities to use our utilities with their utilities.

**Lead:** I heard you like classes

## Overview

The Tailwind module provides a Tailwind CSS plugin that adds device-based variants. This allows you to use device detection classes directly in your Tailwind configuration for conditional styling based on device type, OS, browser, and orientation.

## Functions

### `modDevices`

Tailwind CSS plugin that adds device-based variants.

**Usage:**
```typescript
import { modDevices } from 'usemods'

// In your tailwind.config.js
export default {
  plugins: [
    modDevices,
    // ... other plugins
  ],
}
```

**Available Variants:**
- Operating Systems: `windows`, `linux`, `mac`, `ios`, `android`
- Browsers: `chrome`, `firefox`, `safari`, `edge`
- Device Types: `mobile`, `tablet`, `desktop`
- Orientation: `portrait`, `landscape`

## Usage Examples

### Basic Setup

```javascript
// tailwind.config.js
import { modDevices } from 'usemods'

export default {
  plugins: [
    modDevices,
  ],
}
```

### Using Device Variants

Once the plugin is configured, you can use device-based variants in your HTML:

```html
<!-- Mobile-specific styles -->
<div class="mobile:block desktop:hidden">
  Mobile content
</div>

<!-- OS-specific styles -->
<button class="mac:bg-blue-500 windows:bg-green-500">
  Platform-specific button
</button>

<!-- Browser-specific styles -->
<div class="chrome:shadow-lg safari:shadow-none">
  Browser-specific shadow
</div>

<!-- Orientation-specific styles -->
<div class="portrait:flex-col landscape:flex-row">
  Responsive layout
</div>
```

### Combined with Other Variants

Device variants work alongside Tailwind's built-in variants:

```html
<!-- Responsive + Device -->
<div class="md:flex mobile:block desktop:grid">
  Complex layout
</div>

<!-- Hover + Device -->
<button class="hover:bg-blue-500 chrome:hover:bg-blue-600">
  Enhanced hover for Chrome
</button>
```

### Vue/Nuxt Example

```vue
<template>
  <div class="mobile:p-4 desktop:p-8">
    <h1 class="ios:text-blue-500 android:text-green-500">
      Platform-specific heading
    </h1>
    
    <div class="portrait:flex-col landscape:flex-row">
      <div>Content 1</div>
      <div>Content 2</div>
    </div>
  </div>
</template>
```

### React Example

```jsx
function App() {
  return (
    <div className="mobile:p-4 desktop:p-8">
      <h1 className="chrome:text-blue-500 firefox:text-orange-500">
        Browser-specific heading
      </h1>
      
      <div className="portrait:flex-col landscape:flex-row">
        <div>Content 1</div>
        <div>Content 2</div>
      </div>
    </div>
  )
}
```

## How It Works

The plugin uses the device detection functions from the Devices module to add classes to the body element. Then, it creates Tailwind variants that target elements within those device classes.

For example:
- `.mobile .mobile\:block` - When body has `mobile` class, apply `block`
- `.chrome .chrome\:bg-blue-500` - When body has `chrome` class, apply `bg-blue-500`

## Setup with Device Detection

To use the device variants, you need to call `addDeviceClasses()` from the Devices module:

```typescript
import { addDeviceClasses } from 'usemods'

// In your app initialization
addDeviceClasses()
```

This adds the appropriate device classes to the `document.body` element, which the Tailwind variants then target.

## Complete Setup Example

```typescript
// main.ts / app.ts
import { addDeviceClasses } from 'usemods'

// Initialize device classes
if (typeof window !== 'undefined') {
  addDeviceClasses()
}
```

```javascript
// tailwind.config.js
import { modDevices } from 'usemods'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    modDevices,
  ],
}
```

## Available Device Variants

### Operating System Variants
- `windows:` - Windows OS
- `linux:` - Linux OS
- `mac:` - macOS
- `ios:` - iOS (iPhone/iPad)
- `android:` - Android

### Browser Variants
- `chrome:` - Google Chrome
- `firefox:` - Mozilla Firefox
- `safari:` - Safari
- `edge:` - Microsoft Edge

### Device Type Variants
- `mobile:` - Mobile devices
- `tablet:` - Tablets
- `desktop:` - Desktop computers

### Orientation Variants
- `portrait:` - Portrait orientation
- `landscape:` - Landscape orientation

## Notes

- Device classes are added to `document.body` by `addDeviceClasses()`
- Variants use Tailwind's variant system and work with all utility classes
- The plugin creates scoped variants that only apply when the body has the corresponding class
- Works seamlessly with Tailwind's JIT mode
- All variants are lowercase and match the device detection function names
- Orientation variants update automatically on window resize (if you add listeners)
