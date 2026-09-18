const isOpen = ref(false)

/**
 * Shared command palette open state for the header trigger and global shortcuts.
 */
export function useCommandPalette() {
  function open(): void {
    isOpen.value = true
  }

  function close(): void {
    isOpen.value = false
  }

  function toggle(): void {
    isOpen.value = !isOpen.value
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
