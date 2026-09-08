import { readonly, ref, onMounted, onUnmounted, type Ref } from 'vue'
import { detectColorScheme } from 'usemods'

/**
 * Reactive preferred color scheme (`'dark'` | `'light'`). Updates via matchMedia.
 * SSR-safe: starts as `null` until mounted.
 */
export function useColorScheme(): Readonly<Ref<string | null>> {
  const scheme = ref<string | null>(null)
  let media: MediaQueryList | null = null

  const update = (): void => {
    scheme.value = detectColorScheme()
  }

  onMounted(() => {
    update()
    media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', update)
  })

  onUnmounted(() => {
    media?.removeEventListener('change', update)
  })

  return readonly(scheme)
}
