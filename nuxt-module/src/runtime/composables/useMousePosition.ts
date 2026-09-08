import { readonly, ref, onMounted, onUnmounted, type Ref } from 'vue'
import { detectMousePosition } from 'usemods'

/**
 * Reactive absolute mouse position (page coordinates). Updates on `mousemove`.
 * SSR-safe: starts as `null` until the first mouse move (or stays null on SSR).
 */
export function useMousePosition(): Readonly<Ref<{ x: number, y: number } | null>> {
  const position = ref<{ x: number, y: number } | null>(null)

  const update = (event: MouseEvent): void => {
    position.value = detectMousePosition(event)
  }

  onMounted(() => {
    window.addEventListener('mousemove', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return readonly(position)
}
