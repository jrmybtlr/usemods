<template>
  <DocsLayout>
    <PageTitle>
      <h1>Generators</h1>
      <p>A collection of magical functions that conjure data out of thin air.</p>
    </PageTitle>

    <PageFunction
      name="generateNumber"
      description="Generate a random number"
      params='[{"name":"length","type":"number"}]'
    >
      <GenerateNumber />
    </PageFunction>

    <PageFunction
      name="generateNumberBetween"
      description="Generate a random number within an inclusive range."
      params='[{"name":"from","type":"number"},{"name":"to","type":"number"}]'
    >
      <GenerateNumberBetween />
    </PageFunction>

    <PageFunction
      name="generateUuid4"
      description="Generate a Version 4 UUID (cryptographically random)"
      params='[]'
    >
      <GenerateUuid4 />
    </PageFunction>

    <PageFunction
      name="generateUuid7"
      description="Generate a Version 7 UUID encoding a Unix timestamp in the first 6 bytes and filling the rest with random bytes."
      params='[]'
    >
      <GenerateUuid7 />
    </PageFunction>

    <PageFunction
      name="decodeUuid7"
      description="Decode a UUIDv7 string into a timestamp"
      params='[{"name":"uuid","type":"string"}]'
    >
      <decodeUuid7 />
    </PageFunction>

    <PageFunction
      name="generateShortUuid"
      description="Encodes a standard UUID (with dashes) into a URL-safe Base64 variant"
      params='[{"name":"uuid","type":"string"}]'
    >
      <generateShortUuid />
    </PageFunction>

    <PageFunction
      name="decodeShortUuid"
      description="Decodes a short URL-safe Base64-encoded string back into a standard UUID"
      params='[{"name":"shortUuid","type":"string"}]'
    >
      <decodeShortUuid />
    </PageFunction>

    <PageFunction
      name="generateShortId"
      description="Generate a unique short ID based on the current timestamp"
      params='[{"name":"length","type":"number = 19"}]'
    >
      <GenerateShortId />
    </PageFunction>

    <PageFunction
      name="generatePassword"
      description="Generate a random, secure password with a mix of character types and pleasant special characters."
      info="Don't forget to use our Password Checker in the Goodies section"
      params='[{"name":"options","type":"{ length?: number, uppercase?: number, numbers?: number, number?: number, symbols?: number, special?: number } = {}"}]'
    >
      <GeneratePassword />
    </PageFunction>

    <PageFunction
      name="generateRandomIndex"
      description="Random number generator using cryptographic methods to avoid random()."
      params='[{"name":"max","type":"number"}]'
    >
      <generateRandomIndex />
    </PageFunction>

    <PageFunction
      name="generateLoremIpsum"
      description="Generate Lorem Ipsum text in various formats."
      params='[{"name":"count","type":"number = 5"},{"name":"options?","type":"{ format: &#39;words&#39; | &#39;sentences&#39; | &#39;paragraphs&#39; }"}]'
    >
      <GenerateLoremIpsum />
    </PageFunction>

    <PageFunction
      name="generateHighResolutionTime"
      description="Helper function to get high-resolution time using process.hrtime, or performance.now as a fallback."
      info="Node.js times generated are in nanoseconds, browser-based falls back to converting performance.now to microseconds."
      params='[]'
    >
      <generateHighResolutionTime />
    </PageFunction>

    <PageFunction
      name="getSecureRandomValues"
      description="Returns an array filled with cryptographic random bytes."
      params='[{"name":"buffer","type":"Uint8Array"}]'
    >
      <GetSecureRandomValues />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import GenerateLoremIpsum from '~/components/content/generators/GenerateLoremIpsum.vue'
import GenerateNumber from '~/components/content/generators/GenerateNumber.vue'
import GenerateNumberBetween from '~/components/content/generators/GenerateNumberBetween.vue'
import GeneratePassword from '~/components/content/generators/GeneratePassword.vue'
import GenerateShortId from '~/components/content/generators/GenerateShortId.vue'
import GenerateUuid4 from '~/components/content/generators/GenerateUuid4.vue'
import GenerateUuid7 from '~/components/content/generators/GenerateUuid7.vue'
import GetSecureRandomValues from '~/components/content/generators/GetSecureRandomValues.vue'
import decodeShortUuid from '~/components/content/generators/decodeShortUuid.vue'
import decodeUuid7 from '~/components/content/generators/decodeUuid7.vue'
import generateHighResolutionTime from '~/components/content/generators/generateHighResolutionTime.vue'
import generateRandomIndex from '~/components/content/generators/generateRandomIndex.vue'
import generateShortUuid from '~/components/content/generators/generateShortUuid.vue'

const toc = ["generateNumber","generateNumberBetween","generateUuid4","generateUuid7","decodeUuid7","generateShortUuid","decodeShortUuid","generateShortId","generatePassword","generateRandomIndex","generateLoremIpsum","generateHighResolutionTime","getSecureRandomValues"]
const pageId = 'generators'

provide('toc', toc)
provide('pageId', pageId)
</script>
