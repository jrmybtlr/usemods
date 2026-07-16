<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { introLinks, docLinks } from '~/utils/navigation'

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': 'https://usemods.com/#website',
            'url': 'https://usemods.com/',
            'name': 'UseMods',
            'description':
              'Zero-dependency JavaScript utilities for frontend and SSR applications.',
            'inLanguage': 'en',
          },
          {
            '@type': 'SoftwareApplication',
            '@id': 'https://usemods.com/#software',
            'name': 'UseMods',
            'applicationCategory': 'DeveloperApplication',
            'operatingSystem': 'Any',
            'url': 'https://usemods.com/',
            'downloadUrl': 'https://www.npmjs.com/package/usemods',
            'license': 'https://opensource.org/licenses/MIT',
            'codeRepository': 'https://github.com/LittleFoxCompany/usemods',
            'description':
              'Zero-dependency JavaScript utility library with formatters, validators, generators, modifiers, and browser helpers.',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD',
            },
          },
        ],
      }),
    },
  ],
})

onBeforeMount(() => {
  addDeviceClasses()
})

provide('intro-links', introLinks)
provide('doc-links', docLinks)
</script>
