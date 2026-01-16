# Devices

Client-side detections user's machines.

**Lead:** Nice device you got there!

## Overview

The Devices module provides functions to detect user's device type, operating system, browser, and other device-related information. These utilities help you personalize experiences, add device-specific classes, and handle device-specific logic.

## Functions

### `isServerSide(): boolean`

Check if you're a server-side user.

**Returns:** true if server-side, false if client-side

**Example:**
```typescript
import { isServerSide } from 'usemods'

if (isServerSide()) {
  // Server-side code
} else {
  // Client-side code
}
```

---

### `detectUserDevice(userAgent?: string): object | string`

Detects the user's device based on the user agent string and returns the information as an object.

**Parameters:**
- `userAgent` (string, optional): User agent string. If not provided, uses navigator.userAgent

**Returns:** Object with os, browser, and device, or 'server' if server-side

**Example:**
```typescript
import { detectUserDevice } from 'usemods'

const device = detectUserDevice()
// {
//   os: 'Mac',
//   browser: 'Chrome',
//   device: 'Desktop'
// }
```

---

### `addDeviceClasses(userAgent?: string): void`

Adds detected devices as classes to your project's body class.

**Parameters:**
- `userAgent` (string, optional): User agent string. If not provided, uses navigator.userAgent

**Returns:** void

**Example:**
```typescript
import { addDeviceClasses } from 'usemods'

addDeviceClasses()
// Adds classes like 'mac', 'chrome', 'desktop' to document.body
```

---

### `detectDevice(userAgent?: string): string`

Detect the current device type (Mobile or Desktop).

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** 'Mobile' or 'Desktop', or 'server' if server-side without userAgent

**Example:**
```typescript
import { detectDevice } from 'usemods'

detectDevice() // 'Desktop' or 'Mobile'
```

---

### `detectBrowser(userAgent?: string): string`

Detect the current browser.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** Browser name ('Chrome', 'Firefox', 'Safari', 'Edge'), 'unknown', or 'server'

**Example:**
```typescript
import { detectBrowser } from 'usemods'

detectBrowser() // 'Chrome', 'Firefox', 'Safari', 'Edge', etc.
```

---

### `detectOS(userAgent?: string): string`

Detect the current operating system.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** OS name ('iOS', 'Android', 'Windows', 'Mac', 'Linux', 'UNIX'), 'unknown', or 'server'

**Example:**
```typescript
import { detectOS } from 'usemods'

detectOS() // 'Mac', 'Windows', 'iOS', 'Android', etc.
```

---

### `isIos(userAgent?: string): boolean`

Check if you're a passionate iPhone fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if iOS device, false otherwise

**Example:**
```typescript
import { isIos } from 'usemods'

if (isIos()) {
  // iOS-specific code
}
```

---

### `isAndroid(userAgent?: string): boolean`

Check if you're a zealous Android fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Android device, false otherwise

**Example:**
```typescript
import { isAndroid } from 'usemods'

if (isAndroid()) {
  // Android-specific code
}
```

---

### `isMac(userAgent?: string): boolean`

Check if you're a staunch Mac fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Mac, false otherwise

**Example:**
```typescript
import { isMac } from 'usemods'

if (isMac()) {
  // Mac-specific code
}
```

---

### `isWindows(userAgent?: string): boolean`

Check if you're a fervent Windows fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Windows, false otherwise

**Example:**
```typescript
import { isWindows } from 'usemods'

if (isWindows()) {
  // Windows-specific code
}
```

---

### `isLinux(userAgent?: string): boolean`

Check if you're a devoted Linux fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Linux, false otherwise

**Note:** Fun fact, most Linux users will tell you they have Linux before the function does.

**Example:**
```typescript
import { isLinux } from 'usemods'

if (isLinux()) {
  // Linux-specific code
}
```

---

### `isChrome(userAgent?: string): boolean`

Check if you're a die-hard Chrome fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Chrome, false otherwise

**Example:**
```typescript
import { isChrome } from 'usemods'

if (isChrome()) {
  // Chrome-specific code
}
```

---

### `isFirefox(userAgent?: string): boolean`

Check if you're a dedicated Firefox fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Firefox, false otherwise

**Example:**
```typescript
import { isFirefox } from 'usemods'

if (isFirefox()) {
  // Firefox-specific code
}
```

---

### `isSafari(userAgent?: string): boolean`

Check if you're a lonely Safari fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Safari, false otherwise

**Example:**
```typescript
import { isSafari } from 'usemods'

if (isSafari()) {
  // Safari-specific code
}
```

---

### `isEdge(userAgent?: string): boolean`

Check if you're an ardent Edge fan.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if Edge, false otherwise

**Example:**
```typescript
import { isEdge } from 'usemods'

if (isEdge()) {
  // Edge-specific code
}
```

---

### `isMobile(userAgent?: string): boolean`

Check if you're rocking a mobile.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if mobile device, false otherwise

**Example:**
```typescript
import { isMobile } from 'usemods'

if (isMobile()) {
  // Mobile-specific code
}
```

---

### `isTablet(userAgent?: string): boolean`

Check if you're tablet user.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if tablet, false otherwise

**Example:**
```typescript
import { isTablet } from 'usemods'

if (isTablet()) {
  // Tablet-specific code
}
```

---

### `isDesktop(userAgent?: string): boolean`

Check if you're pro desktop user.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if desktop, false otherwise

**Example:**
```typescript
import { isDesktop } from 'usemods'

if (isDesktop()) {
  // Desktop-specific code
}
```

---

### `isPortrait(win?: { innerWidth: number, innerHeight: number }): boolean`

Check if you're portrait.

**Parameters:**
- `win` (object, optional): Window-like object for testability

**Returns:** true if portrait orientation, false otherwise

**Example:**
```typescript
import { isPortrait } from 'usemods'

if (isPortrait()) {
  // Portrait layout
}

// For reactivity
window.addEventListener('resize', () => {
  if (isPortrait()) {
    // Adjust layout
  }
})
```

---

### `isLandscape(win?: { innerWidth: number, innerHeight: number }): boolean`

Check if you're landscape.

**Parameters:**
- `win` (object, optional): Window-like object for testability

**Returns:** true if landscape orientation, false otherwise

**Example:**
```typescript
import { isLandscape } from 'usemods'

if (isLandscape()) {
  // Landscape layout
}
```

---

### `isBot(userAgent?: string): boolean`

Check if you're a cyborg or a bot.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if bot, false otherwise

**Example:**
```typescript
import { isBot } from 'usemods'

if (isBot()) {
  // Bot-specific handling
}
```

---

### `isHuman(userAgent?: string): boolean`

Check if you're a human.

**Parameters:**
- `userAgent` (string, optional): User agent string

**Returns:** true if human (not bot), false otherwise

**Example:**
```typescript
import { isHuman } from 'usemods'

if (isHuman()) {
  // Human-specific code
}
```

---

### `isDeveloper(): boolean`

Check if you're a developer by checking the environment variable.

**Returns:** true if NODE_ENV is 'development', false otherwise

**Example:**
```typescript
import { isDeveloper } from 'usemods'

if (isDeveloper()) {
  // Development-only code
  console.log('Debug mode enabled')
}
```

---

## Usage Examples

### Device-Specific Styling

```typescript
import { addDeviceClasses, detectUserDevice } from 'usemods'

// Add device classes to body
addDeviceClasses()
// Now you can use CSS like: .mobile .header { ... }

// Or check device programmatically
const device = detectUserDevice()
if (device.device === 'Mobile') {
  // Mobile-specific logic
}
```

### Platform Detection

```typescript
import { isIos, isAndroid, isMac, isWindows } from 'usemods'

if (isIos()) {
  // iOS-specific features
} else if (isAndroid()) {
  // Android-specific features
} else if (isMac()) {
  // Mac-specific features
} else if (isWindows()) {
  // Windows-specific features
}
```

### Browser Detection

```typescript
import { isChrome, isFirefox, isSafari, isEdge } from 'usemods'

if (isChrome()) {
  // Chrome-specific code
} else if (isFirefox()) {
  // Firefox-specific code
} else if (isSafari()) {
  // Safari-specific code (often needs special handling)
} else if (isEdge()) {
  // Edge-specific code
}
```

### Responsive Detection

```typescript
import { isMobile, isTablet, isDesktop, isPortrait, isLandscape } from 'usemods'

// Device type
if (isMobile()) {
  // Mobile layout
} else if (isTablet()) {
  // Tablet layout
} else if (isDesktop()) {
  // Desktop layout
}

// Orientation
window.addEventListener('resize', () => {
  if (isPortrait()) {
    // Portrait layout
  } else if (isLandscape()) {
    // Landscape layout
  }
})
```

### Bot Detection

```typescript
import { isBot, isHuman } from 'usemods'

if (isBot()) {
  // Don't load heavy resources for bots
  // Or provide simplified content
} else if (isHuman()) {
  // Full experience for humans
}
```

### Development Detection

```typescript
import { isDeveloper } from 'usemods'

if (isDeveloper()) {
  // Show debug panels
  // Enable verbose logging
  // Add development tools
}
```

---

## Notes

- All detection functions work with user agent strings
- Functions return appropriate defaults in server-side environments
- `addDeviceClasses()` automatically adds lowercase class names to body
- Device detection uses user agent parsing, which may not be 100% accurate
- Bot detection uses common bot user agent patterns
- Orientation detection requires window resize listeners for reactivity
- All functions accept optional userAgent parameter for testing or SSR
