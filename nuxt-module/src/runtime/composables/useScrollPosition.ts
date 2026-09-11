import { readonly, ref, onMounted, onUnmounted, type Ref } from 'vue'
import { detectScrollPosition } from 'usemods'
import { createAnimationFrameScheduler } from '../createAnimationFrameScheduler'

/**
 * Reactive scroll position. Updates on window `scroll`, coalesced to animation frames.
 * SSR-safe: starts as `null` until mounted.
 */
export function useScrollPosition(): Readonly<Ref<{ x: number, y: number } | null>> {
  const position = ref<{ x: number, y: number } | null>(null)
  const raf = createAnimationFrameScheduler()

  const update = (): void => {
    position.value = detectScrollPosition()
  }

  const onScroll = (): void => {
    raf.schedule(update)
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onUnmounted(() => {
    raf.cancel()
    window.removeEventListener('scroll', onScroll)
  })

  return readonly(position)
}
