// title: Tailwind
// description: Utilities to use our utilities with their utilities
// lead: I heard you like classes

const devices: ReadonlySet<string> = new Set([
  'windows', 'linux', 'mac',
  'ios', 'android',
  'chrome', 'firefox', 'safari', 'edge',
  'mobile', 'tablet', 'desktop',
  'portrait', 'landscape',
])

// Minimal Tailwind plugin API types, so the plugin stays dependency-free
type ModifySelectors = (modifier: (selector: { className: string }) => string) => void
type VariantGenerator = (api: { modifySelectors: ModifySelectors, separator: string }) => void
interface TailwindPluginApi {
  addVariant: (name: string, generator: VariantGenerator) => void
  e: (className: string) => string
}

// Define the plugin without dependencies
export const modDevices = function ({ addVariant, e }: TailwindPluginApi): void {
  for (const device of devices) {
    addVariant(device, ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => `.${device} .${e(`${device}${separator}${className}`)}`)
    })
  }
}
