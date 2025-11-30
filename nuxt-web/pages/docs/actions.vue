<template>
  <DocsLayout>
    <PageTitle>
      <h1>Actions</h1>
      <p>A stack of handy functions you could write yourself, but don't want to.</p>
    </PageTitle>

    <PageFunction
      name="scrollToAnchor"
      description="Smoothly scrolls to the element with the specified ID without scuffing up your URLs."
      params='[{"name":"id","type":"string"}]'
    >
      <ScrollToAnchor />
    </PageFunction>

    <PageFunction
      name="toggleBodyScroll"
      description="Toggles the body scroll with specified class names and returns a promise"
      info="Use your own class names, or ensure fixed is within your Tailwindcss JIT"
      params='[{"name":"className","type":"string = &#39;fixed&#39;"},{"name":"action","type":"&#39;add&#39; | &#39;remove&#39; | &#39;toggle&#39; = &#39;toggle&#39;"}]'
    >
      <ToggleBodyScroll />
    </PageFunction>

    <PageFunction
      name="toggleElementScroll"
      description="Toggles the element scroll with specified class names and returns a promise"
      params='[{"name":"element","type":"HTMLElement"}]'
    >
      <ToggleElementScroll />
    </PageFunction>

    <PageFunction
      name="toggleFullScreen"
      description="Copies a convereted string to the clipboard"
      params='[]'
    >
      <ToggleFullScreen />
    </PageFunction>

    <PageFunction
      name="resetForm"
      description="Resets a form to its initial state"
      params='[{"name":"form","type":"HTMLFormElement"}]'
    >
      <ResetForm />
    </PageFunction>

    <PageFunction
      name="focusOnInvalid"
      description="Focuses on and scrolls to the first invalid input, select, or textarea element within a form."
      params='[{"name":"container","type":"HTMLElement"}]'
    >
      <FocusOnInvalid />
    </PageFunction>

    <PageFunction
      name="focusOnNth"
      description="Focuses on the nth element within the specified form, where 0 is the first element and -1 is the last element."
      params='[{"name":"container","type":"HTMLElement"},{"name":"index","type":"number = 0"}]'
    >
      <FocusOnNth />
    </PageFunction>

    <PageFunction
      name="focusTrap"
      description="Sets up a keyboard trap within an HTML element, allowing the focus to cycle between the first and last focusable elements when the Tab key is pressed."
      params='[{"name":"container","type":"HTMLElement"}]'
    >
      <FocusTrap />
    </PageFunction>

    <PageFunction
      name="debounce"
      description="Runs a function only if there are no new calls during the delay"
      params='[]'
    >
      <Debounce />
    </PageFunction>

    <PageFunction
      name="throttle"
      description="Throttles a function to ensure it only runs once per threshold"
      params='[]'
    >
      <Throttle />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import Debounce from '~/components/content/actions/Debounce.vue'
import FocusOnInvalid from '~/components/content/actions/FocusOnInvalid.vue'
import FocusOnNth from '~/components/content/actions/FocusOnNth.vue'
import FocusTrap from '~/components/content/actions/FocusTrap.vue'
import ResetForm from '~/components/content/actions/ResetForm.vue'
import ScrollToAnchor from '~/components/content/actions/ScrollToAnchor.vue'
import Throttle from '~/components/content/actions/Throttle.vue'
import ToggleBodyScroll from '~/components/content/actions/ToggleBodyScroll.vue'
import ToggleElementScroll from '~/components/content/actions/ToggleElementScroll.vue'
import ToggleFullScreen from '~/components/content/actions/ToggleFullScreen.vue'

const toc = ["scrollToAnchor","toggleBodyScroll","toggleElementScroll","toggleFullScreen","resetForm","focusOnInvalid","focusOnNth","focusTrap","debounce","throttle"]
const pageId = 'actions'

provide('toc', toc)
provide('pageId', pageId)
</script>
