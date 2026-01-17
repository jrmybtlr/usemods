<template>
  <nav v-if="toc?.length > 0" class="text-gray-900 dark:text-white">
    <p class="pb-4 font-semibold">On this page</p>

    <ul>
      <li v-for="item in toc ?? []" :key="item" class="mt-0">
        <NuxtLink v-if="item"
          class="flex cursor-pointer gap-3 text-sm font-medium leading-none text-gray-500 hover:text-indigo-600 dark:hover:text-white/75"
          @click="scrollToAnchor(item)">
          <div class="w-2 border-l transition-all" :class="activeSections.includes(item)
            ? ' border-indigo-600 dark:border-amber-400 '
            : 'border-gray-200 dark:border-white/15'
            " />
          <div class="truncate py-1.5" :class="activeSections.includes(item)
            ? 'text-indigo-600 dark:text-amber-400'
            : 'text-gray-500 dark:text-white/50'
            ">
            {{ item }}
          </div>
        </NuxtLink>
      </li>
    </ul>

    <div class="flex flex-col py-8 gap-4">
      <NuxtLink v-if="pageId" :to="`https://github.com/LittleFoxCompany/usemods/blob/main/src/${pageId}.ts`"
        target="_blank" class="flex items-center gap-1.5 text-sm font-medium leading-none text-zinc-500">
        <Icon name="fa6-brands:github" class="-mt-px mr-1.5 size-4" />
        View on GitHub
      </NuxtLink>

      <NuxtLink v-if="pageId" :to="`/api/docs/${pageId}.md`" target="_blank"
        class="flex items-center gap-1.5 text-sm font-medium leading-none text-zinc-500">
        <Icon name="lucide:file-text" class="-mt-px mr-1.5 size-4" />
        View Markdown
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  toc?: string[];
  pageId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  toc: () => [],
  pageId: undefined,
});

const route = useRoute();
const activeSections = useState<string[]>("activeSections", () => []);

// Try to get toc and pageId from provide/inject as fallback
const injectedToc = inject<string[]>("toc", []);
const injectedPageId = inject<string>("pageId", "");

const toc = props.toc.length > 0 ? props.toc : injectedToc ?? [];
const pageId =
  props.pageId ??
  injectedPageId ??
  (route.params.slug?.at(-1) as string | undefined);

// Function to scroll to the anchor
function scrollToAnchor(id: string) {
  const element = document.getElementById(id.toLowerCase());
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
</script>
