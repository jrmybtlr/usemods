import { readonly, ref, onMounted, onUnmounted, type Ref } from 'vue'
import { detectNetworkStatus } from 'usemods'

/**
 * Reactive network status (`'Online'` | `'Offline'`). Updates on online/offline.
 * SSR-safe: starts as `null` until mounted.
 */
export function useNetworkStatus(): Readonly<Ref<string | null>> {
  const status = ref<string | null>(null)

  const update = (): void => {
    status.value = detectNetworkStatus()
  }

  onMounted(() => {
    update()
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
  })

  onUnmounted(() => {
    window.removeEventListener('online', update)
    window.removeEventListener('offline', update)
  })

  return readonly(status)
}
