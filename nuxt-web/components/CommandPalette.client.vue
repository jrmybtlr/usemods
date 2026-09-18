<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-zinc-950/50 backdrop-blur-sm"
        @click="close" />

      <!-- Panel -->
      <div
        ref="panelRef"
        class="relative z-10 flex w-full max-w-xl flex-col overflow-hidden rounded-xl border border-black/5 bg-white/90 shadow-2xl backdrop-blur-xl"
        class:dark="border-white/10 bg-zinc-900/95">
        <!-- Search input -->
        <div class="flex items-center gap-3 border-b border-black/5 px-4"
          class:dark="border-white/10">
          <Icon
            name="heroicons:magnifying-glass"
            class="size-5 shrink-0 text-zinc-400" />
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            class="h-14 w-full bg-transparent text-base text-zinc-900 outline-none placeholder:text-zinc-400"
            class:dark="text-white placeholder:text-zinc-500"
            placeholder="Search functions and docs…"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
            aria-autocomplete="list"
            :aria-activedescendant="activeId"
            @keydown="onInputKeydown">
          <kbd
            class="hidden shrink-0 rounded border border-black/10 px-1.5 py-0.5 text-xs text-zinc-400"
            class:sm="inline-block"
            class:dark="border-white/15 text-zinc-500">
            esc
          </kbd>
        </div>

        <!-- Results -->
        <div
          ref="listRef"
          class="max-h-[50vh] overflow-y-auto overscroll-contain p-2"
          role="listbox">
          <template v-if="groupedResults.pages.length > 0">
            <p class="px-2 py-1.5 text-xs font-semibold tracking-wide text-zinc-400 uppercase"
              class:dark="text-zinc-500">
              Pages
            </p>
            <button
              v-for="(item, index) in groupedResults.pages"
              :id="resultId('page', index)"
              :key="item.path"
              type="button"
              role="option"
              class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
              :class="isActive('page', index)
                ? 'bg-indigo-500 text-white dark:bg-amber-400 dark:text-zinc-950'
                : 'text-zinc-800 hover:bg-zinc-100 dark:text-white dark:hover:bg-white/5'"
              :aria-selected="isActive('page', index)"
              @click="select(item)"
              @mouseenter="setActive('page', index)">
              <div class="min-w-0 flex-1">
                <div class="truncate font-medium">
                  {{ item.title }}
                </div>
                <div
                  v-if="item.description"
                  class="truncate text-xs opacity-70">
                  {{ item.description }}
                </div>
              </div>
            </button>
          </template>

          <template v-if="groupedResults.functions.length > 0">
            <p
              class="px-2 py-1.5 text-xs font-semibold tracking-wide text-zinc-400 uppercase"
              :class="groupedResults.pages.length > 0 ? 'mt-2' : ''"
              class:dark="text-zinc-500">
              Functions
            </p>
            <button
              v-for="(item, index) in groupedResults.functions"
              :id="resultId('function', index)"
              :key="item.path"
              type="button"
              role="option"
              class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
              :class="isActive('function', index)
                ? 'bg-indigo-500 text-white dark:bg-amber-400 dark:text-zinc-950'
                : 'text-zinc-800 hover:bg-zinc-100 dark:text-white dark:hover:bg-white/5'"
              :aria-selected="isActive('function', index)"
              @click="select(item)"
              @mouseenter="setActive('function', index)">
              <div class="min-w-0 flex-1">
                <div class="truncate font-medium">
                  {{ item.title }}
                </div>
                <div class="truncate text-xs opacity-70">
                  <span v-if="item.module">{{ item.module }}</span>
                  <span v-if="item.module && item.description"> · </span>
                  <span v-if="item.description">{{ item.description }}</span>
                </div>
              </div>
            </button>
          </template>

          <div
            v-if="flatResults.length === 0"
            class="px-3 py-8 text-center text-sm text-zinc-400"
            class:dark="text-zinc-500">
            No results for “{{ query }}”
          </div>
        </div>

        <!-- Footer hint -->
        <div
          class="flex items-center gap-4 border-t border-black/5 px-4 py-2 text-xs text-zinc-400"
          class:dark="border-white/10 text-zinc-500">
          <span class="flex items-center gap-1">
            <kbd class="rounded border border-black/10 px-1 dark:border-white/15">↑</kbd>
            <kbd class="rounded border border-black/10 px-1 dark:border-white/15">↓</kbd>
            navigate
          </span>
          <span class="flex items-center gap-1">
            <kbd class="rounded border border-black/10 px-1 dark:border-white/15">↵</kbd>
            open
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { searchIndex, type SearchItem } from '~/utils/search-index'
import { scrollToAnchor } from 'usemods'

const { isOpen, close } = useCommandPalette()

const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)

type ResultGroup = 'page' | 'function'

interface RankedItem extends SearchItem {
  score: number
}

function scoreItem(item: SearchItem, q: string): number {
  const title = item.title.toLowerCase()
  const description = item.description.toLowerCase()
  const module = (item.module || '').toLowerCase()

  if (title === q) return 100
  if (title.startsWith(q)) return 80
  if (title.includes(q)) return 60
  if (module.startsWith(q)) return 40
  if (module.includes(q)) return 30
  if (description.includes(q)) return 20
  return 0
}

const rankedResults = computed((): RankedItem[] => {
  const q = query.value.trim().toLowerCase()

  if (!q) {
    return searchIndex
      .filter(item => item.type === 'page')
      .map(item => ({ ...item, score: 0 }))
  }

  return searchIndex
    .map(item => ({ ...item, score: scoreItem(item, q) }))
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      // Prefer functions slightly when scores tie on name matches
      if (a.type !== b.type && a.score >= 60) {
        return a.type === 'function' ? -1 : 1
      }
      return a.title.localeCompare(b.title)
    })
})

const groupedResults = computed(() => {
  const pages = rankedResults.value.filter(item => item.type === 'page')
  const functions = rankedResults.value.filter(item => item.type === 'function')
  return { pages, functions }
})

const flatResults = computed((): SearchItem[] => [
  ...groupedResults.value.pages,
  ...groupedResults.value.functions,
])

watch(query, () => {
  activeIndex.value = 0
})

watch(isOpen, async (open) => {
  if (open) {
    query.value = ''
    activeIndex.value = 0
    await nextTick()
    inputRef.value?.focus()
    document.documentElement.style.overflow = 'hidden'
  }
  else {
    document.documentElement.style.overflow = ''
  }
})

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
})

function resultId(group: ResultGroup, index: number): string {
  return `command-palette-${group}-${index}`
}

function flatIndexFor(group: ResultGroup, index: number): number {
  if (group === 'page') return index
  return groupedResults.value.pages.length + index
}

function isActive(group: ResultGroup, index: number): boolean {
  return activeIndex.value === flatIndexFor(group, index)
}

function setActive(group: ResultGroup, index: number): void {
  activeIndex.value = flatIndexFor(group, index)
}

const activeId = computed((): string | undefined => {
  const pagesLen = groupedResults.value.pages.length
  if (flatResults.value.length === 0) return undefined
  if (activeIndex.value < pagesLen) {
    return resultId('page', activeIndex.value)
  }
  return resultId('function', activeIndex.value - pagesLen)
})

function moveActive(delta: number): void {
  const total = flatResults.value.length
  if (total === 0) return
  activeIndex.value = (activeIndex.value + delta + total) % total
  nextTick(() => {
    const el = document.getElementById(activeId.value || '')
    el?.scrollIntoView({ block: 'nearest' })
  })
}

async function select(item: SearchItem): Promise<void> {
  close()
  const hash = item.path.includes('#') ? item.path.split('#')[1] : undefined
  await navigateTo(item.path)

  if (hash) {
    try {
      await scrollToAnchor(hash)
    }
    catch {
      // Element may not exist yet; hash in URL still allows browser fallback
    }
  }
}

function selectActive(): void {
  const item = flatResults.value[activeIndex.value]
  if (item) void select(item)
}

function onInputKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveActive(1)
  }
  else if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveActive(-1)
  }
  else if (event.key === 'Enter') {
    event.preventDefault()
    selectActive()
  }
  else if (event.key === 'Escape') {
    event.preventDefault()
    close()
  }
  else if (event.key === 'Tab') {
    // Keep focus cycling inside the panel (input + result buttons)
    const focusable = panelRef.value?.querySelectorAll<HTMLElement>(
      'input, button[role="option"]',
    )
    if (!focusable || focusable.length === 0) return
    const elements = Array.from(focusable)
    const first = elements[0]
    const last = elements[elements.length - 1]
    const active = document.activeElement as HTMLElement | null

    if (event.shiftKey && active === first) {
      event.preventDefault()
      last?.focus()
    }
    else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first?.focus()
    }
  }
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return (
    tag === 'INPUT'
    || tag === 'TEXTAREA'
    || tag === 'SELECT'
    || target.isContentEditable
  )
}

useEventListener(document, 'keydown', (event: KeyboardEvent) => {
  const metaK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
  if (metaK) {
    event.preventDefault()
    isOpen.value = !isOpen.value
    return
  }

  if (event.key === '/' && !isOpen.value && !isTypingTarget(event.target)) {
    event.preventDefault()
    isOpen.value = true
    return
  }

  if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault()
    close()
  }
})
</script>
