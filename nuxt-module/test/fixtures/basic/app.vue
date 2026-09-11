<template>
  <div>
    <p data-testid="slug">{{ slugify('hello world') }}</p>
    <p data-testid="breakpoint">{{ breakpoint ?? 'ssr' }}</p>
  </div>
</template>

<script setup lang="ts">
const breakpoint = useBreakpoint()
</script>
