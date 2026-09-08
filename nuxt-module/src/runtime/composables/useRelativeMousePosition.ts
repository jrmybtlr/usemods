import { readonly, ref, onMounted, onUnmounted, type Ref } from 'vue'
import { detectRelativeMousePosition } from 'usemods'

/**
 * Reactive mouse position as a fraction of the viewport (0–1). Updates on `mousemove`.
 * SSR-safe: starts as `null` until the first mouse move.
 */
export function useRelativeMousePosition(): Readonly<Ref<{ x: number, y: number } | null>> {
  const position = ref<{ x: number, y: number } | null>(null)

  const update = (event: MouseEvent): void => {
    position.value = detectRelativeMousePosition(event)
  }

  onMounted(() => {
    window.addEventListener('mousemove', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return readonly(position)
}
