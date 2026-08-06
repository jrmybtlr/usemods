<template>
  <div class="relative w-full">
    <FormLabel
      :label="label"
      :for="id"
      :info="info" />
    <div
      class="group relative cursor-pointer"
      :class="{ 'pointer-events-none opacity-50': disabled }">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        class="input appearance-none"
        v-bind="$attrs"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
        <slot />
      </select>
      <Icon
        name="heroicons:chevron-down"
        class="pointer-events-none absolute top-3.5 right-3 size-4 text-gray-500 transition-all"
        class:group-hover="rotate-180"
        class:peer-open="rotate-180" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

defineProps({
  modelValue: {
    type: [String, Boolean, Number],
  },
  label: {
    type: String,
  },
  info: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const id = useId()
const emit = defineEmits(['update:modelValue'])
</script>
