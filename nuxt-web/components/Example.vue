<template>
  <div
    class="mt-6 flex flex-col divide-y overflow-hidden rounded-xl border bg-indigo-50/40 shadow-indigo-300/[50%] transition-all"
    class:dark="divide-white/5 border-white/[8%] bg-white/[3%] shadow-black/10">
    <slot />
  </div>
</template>
