import { readonly, ref, onMounted, onUnmounted, type Ref } from 'vue'
import { detectActiveBrowser } from 'usemods'

/**
 * Reactive document visibility (active vs hidden). Updates on `visibilitychange`.
 * SSR-safe: starts as `false` until mounted.
 */
export function useActiveBrowser(): Readonly<Ref<boolean>> {
  const isActive = ref(false)

  const update = (): void => {
    isActive.value = detectActiveBrowser()
  }

  onMounted(() => {
    update()
    document.addEventListener('visibilitychange', update)
  })

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', update)
  })

  return readonly(isActive)
}
