<template>
  <button
    class="flex translate-y-0 touch-manipulation items-center justify-center rounded-lg border text-lg font-medium whitespace-nowrap transition-all select-none"
    :type="type"
    :class="[colorClasses, sizeClasses]">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'reset' | 'submit'
  color?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  color: 'primary',
  size: 'md',
})

const colorClasses = {
  'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-white/20': props.color === 'primary',
  'bg-white text-indigo-600 dark:bg-white/[2%] hover:bg-white/[4%] hover:border-indigo-500 dark:text-white border-indigo-100/75 dark:border-white/10 dark:hover:bg-white/[3%]': props.color === 'secondary',
}

const sizeClasses = {
  'h-9 px-3 gap-2 text-sm': props.size === 'sm',
  'h-11 px-5 gap-3 text-base font-light': props.size === 'md',
  'h-14 px-6 gap-4 text-xl font-light': props.size === 'lg',
}
</script>
