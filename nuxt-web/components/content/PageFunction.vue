<template>
  <section
    :id="name"
    ref="section"
    class="pb-12 text-gray-900 dark:text-white">
    <div
      :id="props.name.toLowerCase()"
      class="relative flex w-full cursor-pointer items-end gap-3"
      @click="copyToClipboard(`${detectHost()}${route.fullPath}#${props.name.toLowerCase()}`), copied()"
      @mouseover="showCopyToClipboard = true"
      @mouseout="showCopyToClipboard = false">
      <h2
        class="text-2xl font-semibold md:text-3xl">
        {{ name }}
      </h2>

      <div
        class="mb-1 flex size-6 items-center justify-center rounded-md border border-zinc-200 bg-white/[3%] text-zinc-500 transition-all hover:text-indigo-600 dark:border-white/5 dark:hover:border-white/20 dark:hover:text-white"
        :class="showCopyToClipboard ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'">
        <Icon
          name="heroicons:hashtag"
          class="size-4" />
      </div>

      <div
        class="absolute right-0 mt-1 flex h-6 items-center justify-center rounded-md border border-white/5 bg-white/[3%] px-1.5 text-zinc-500 transition-all"
        :class="showCopied ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'">
        Link Copied!
      </div>
    </div>

    <!-- Description -->
    <p class="mt-2.5 text-pretty md:text-lg">
      {{ description }}
    </p>

    <slot />

    <!-- Info -->
    <Callout
      v-if="info"
      class="mt-6">
      <Icon
        name="heroicons:information-circle-solid"
        class="size-5 shrink-0 text-indigo-500" />
      {{ info }}
    </Callout>
  </section>
</template>

<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'

const route = useRoute()

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  params: {
    type: String,
  },
  code: {
    type: String,
  },
  info: {
    type: String,
  },
})

const showCopyToClipboard = ref(false)
const showCopied = ref(false)
const section = ref<HTMLElement>()
const activeSections = useState<string[]>('activeSections', () => [])
const sectionIsVisible = useElementVisibility(section, { threshold: 0.5 })

function copied() {
  showCopied.value = true
  setTimeout(() => {
    showCopied.value = false
  }, 800)
}

watch(
  sectionIsVisible,
  (isVisible) => {
    try {
      if (isVisible) {
        if (!activeSections.value.includes(props.name)) {
          activeSections.value.push(props.name)
        }
      } else {
        activeSections.value = activeSections.value.filter(section => section !== props.name)
      }
    } catch (error) {
      console.warn(`[MODS] Failed to update active sections for ${props.name}:`, error)
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  try {
    activeSections.value = activeSections.value.filter(section => section !== props.name)
  } catch (error) {
    console.warn(`[MODS] Failed to cleanup active sections for ${props.name}:`, error)
  }
})
</script>
