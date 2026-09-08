<template>
  <div>
    <p data-testid="slug">{{ slugify('Welcome to the mods playground') }}</p>
    <p data-testid="breakpoint">{{ breakpoint ?? 'ssr' }}</p>
    <p data-testid="window-size">
      {{ windowSize ? `${windowSize.width}x${windowSize.height}` : 'ssr' }}
    </p>
  </div>
</template>

<script setup lang="ts">
const breakpoint = useBreakpoint()
const windowSize = useWindowSize()
</script>
