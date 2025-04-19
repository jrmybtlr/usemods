<template>
  <Example>
    <ExampleResult>
      <ClientOnly>
        {{ fetchDeviceClasses() }}
      </ClientOnly>
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
function fetchDeviceClasses() {
  if (typeof window === 'undefined') return 'SSR: No classes available'
  
  const body = document.querySelector('body')
  const classes = body?.classList.value
  return classes || 'No classes found'
}
</script>
