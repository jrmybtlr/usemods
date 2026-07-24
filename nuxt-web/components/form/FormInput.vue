<template>
  <div class="w-full" :class="{ 'opacity-50': disabled }">
    <FormLabel
      :label="label"
      :info="info"
      :for="id" />

    <input
      :id="id"
      class="input"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      v-bind="$attrs"
      @input="$event.target && emit('update:modelValue', ($event.target as HTMLInputElement).value)">
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

defineProps({
  modelValue: {
    type: [String, Number, Object, Boolean],
  },
  placeholder: {
    type: String,
  },
  label: {
    type: String,
  },
  type: {
    type: String,
    default: 'text',
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
