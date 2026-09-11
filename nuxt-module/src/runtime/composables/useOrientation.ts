import { readonly, ref, onMounted, onUnmounted, type Ref } from 'vue'
import { isPortrait, isLandscape } from 'usemods'

export interface UseOrientationResult {
  readonly isPortrait: Readonly<Ref<boolean>>
  readonly isLandscape: Readonly<Ref<boolean>>
}

/**
 * Reactive portrait/landscape orientation. Updates on `resize`.
 * SSR-safe: both flags start as `false` until mounted.
 */
export function useOrientation(): UseOrientationResult {
  const portrait = ref(false)
  const landscape = ref(false)

  const update = (): void => {
    portrait.value = isPortrait()
    landscape.value = isLandscape()
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return {
    isPortrait: readonly(portrait),
    isLandscape: readonly(landscape),
  }
}
