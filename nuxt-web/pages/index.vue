<template>
  <main class="relative flex max-h-screen min-h-screen flex-col overflow-hidden text-clip">
    <NavMainNavigation class="relative z-20 shrink" />
    <div class="relative z-10 flex grow">
      <section class="flex grow flex-col">
        <header
          class="flex grow flex-col items-center justify-center p-8"
          class:md="py-24">
          <h1
            id="title"
            class="max-w-[1200px] text-center leading-[1em] font-bold text-balance text-gray-900"
            class:dark="text-white"
            class:md="leading-[1.25em]"
            style="font-size: clamp(2.3em,8vw,4.5rem);">
            Zippy little utils for your JavaScript projects.
          </h1>

          <div
            class="mt-10 flex items-center gap-3"
            class:max-md="flex-col"
            class:md="mt-16">
            <NuxtLink
              to="intro/introduction"
              prefetch>
              <Button
                size="lg"
                class="group rounded-full!"
                class:max-md="w-full">
                Get Started
                <Icon
                  name="heroicons:arrow-right"
                  class="size-5 text-white/50 transition-all duration-200"
                  class:group-hover="translate-x-1" />
              </Button>
            </NuxtLink>

            <!-- Packages -->
            <div
              id="packages"
              class="relative h-11 overflow-visible">
              <button
                type="button"
                class="flex h-11 cursor-pointer items-center gap-3 rounded-full border border-white/5 bg-black/5 px-6 font-mono whitespace-nowrap text-gray-900 backdrop-blur"
                class:dark="bg-white/3 text-white/90 shadow"
                class:max-md="w-full"
                @click="copyToClipboard('npm i usemods')">
                <Icon
                  name="lucide:terminal"
                  class="size-5"
                  class:dark="text-white/50" />
                npm i usemods
              </button>
            </div>
          </div>

          <div
            class="flex flex-col items-center gap-3 pt-12 opacity-50"
            class:md="pt-16">
            <div
              class="text-xs font-semibold tracking-wider text-gray-500 uppercase"
              class:dark="text-white/50">
              Plug and play with
            </div>
            <div class="flex items-center gap-3">
              <Icon
                name="logos:nuxt-icon"
                class="size-7 grayscale"
                class:hover="grayscale-0" />
              <Icon
                name="logos:nextjs-icon"
                class="size-8 grayscale"
                class:hover="grayscale-0" />
              <Icon
                name="logos:vue"
                class="size-5 grayscale"
                class:hover="grayscale-0" />
              <Icon
                name="logos:react"
                class="size-5 grayscale"
                class:hover="grayscale-0" />
              <Icon
                name="logos:svelte-icon"
                class="size-5 grayscale"
                class:hover="grayscale-0" />
              <Icon
                name="logos:solidjs-icon"
                class="size-5 grayscale"
                class:hover="grayscale-0" />
              <Icon
                name="logos:nodejs-icon"
                class="size-5 grayscale"
                class:hover="grayscale-0" />
            </div>
          </div>
        </header>
        <section class="shrink">
          <NuxtPicture
            provider="cloudflare"
            src="/big-scooter.png"
            format="webp"
            alt="A big mods scoooter"
            width="800px"
            height="510"
            size="50vw md:800px"
            densities="1x 2x"
            :modifiers="{ format: 'auto' }"
            class="mx-auto flex w-fit" />
        </section>
      </section>
    </div>

    <Floaters class="absolute top-20 left-1/2 z-0 -translate-x-1/2" />
    <div
      class="radial absolute bottom-0 left-1/2 z-0 hidden aspect-square w-full -translate-x-1/2 translate-y-1/2"
      class:dark="flex"
      class:max-lg="hidden" />
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.radial {
  background: radial-gradient(50% 50% at 50% 50%,
      #2a2a2a 0%,
      rgba(24, 24, 27, 0) 100%);
  background: radial-gradient(50% 50% at 50% 50%,
      color(display-p3 0.165 0.165 0.165) 0%,
      color(display-p3 0.094 0.094 0.106 / 0) 100%);
}
</style>
