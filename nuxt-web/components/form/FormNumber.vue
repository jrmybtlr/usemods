<template>
  <div class="w-full">
    <!-- Label -->
    <FormLabel
      :label="label"
      :info="info"
      :for="id" />

    <!-- Input -->
    <div class="input !pr-3">
      <!-- Mask -->
      <span v-if="mask">{{ mask }}</span>
      <input
        v-if="!mask"
        :id="id"
        :value="modelValue"
        placeholder="∞"
        class="w-full bg-transparent text-left outline-none"
        type="number"
        :min="min"
        :max="max"
        @input="$event.target && $emit('update:modelValue', ($event.target as HTMLInputElement).value)">

      <!-- Buttons -->
      <div class="flex items-center gap-1">
        <button
          type="button"
          name="decrement"
          class="flex touch-manipulation select-none text-zinc-500 opacity-50 transition-all hover:text-white hover:opacity-100"
          @click.stop="decrementValue">
          <Icon
            name="heroicons:minus-circle-20-solid"
            class="size-5 text-indigo-600 dark:text-white" />
        </button>
        <button
          type="button"
          name="increment"
          class="flex touch-manipulation select-none text-zinc-500 opacity-50 transition-all hover:text-white hover:opacity-100"
          @click.stop="incrementValue">
          <Icon
            name="heroicons:plus-circle-20-solid"
            class="size-5 text-indigo-600 dark:text-white" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: [String, Number], default: 0 },
  placeholder: String,
  label: String,
  info: String,
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  mask: {
    type: [String, Number],
    default: '',
  },
})

const id = useId()
const emit = defineEmits(['update:modelValue'])

function incrementValue() {
  const newValue = Number(props.modelValue) + 1
  emit('update:modelValue', newValue)
}

function decrementValue() {
  const newValue = Number(props.modelValue) - 1

  if (props.min !== undefined && newValue < props.min) {
    return emit('update:modelValue', '')
  }
  emit('update:modelValue', newValue)
}
</script>

<style scoped>
@reference "~/assets/css/tailwind.css";

.disabled {
  @apply pointer-events-none cursor-not-allowed opacity-30;
}
</style>
