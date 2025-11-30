<template>
  <DocsLayout>
    <PageTitle>
      <h1>Detections</h1>
      <p>Client-side detections for various user and browser information. Perfect for personalisation, analytics or debugging weird and wonderful bugs. You will need to add a listeners for reactivity.</p>
    </PageTitle>

    <PageFunction
      name="detectScrollPosition"
      description="Detect the current scroll position of the window"
      params='[]'
    >
      <DetectScrollPosition />
    </PageFunction>

    <PageFunction
      name="detectMousePosition"
      description="Detect the absolute mouse position with the page"
      info="Don't forget to add a mousemove event listener to the window"
      params='[{"name":"event","type":"MouseEvent"}]'
    >
      <DetectMousePosition />
    </PageFunction>

    <PageFunction
      name="detectRelativeMousePosition"
      description="Detect the relative mouse position with the window size and returns a percentage value"
      info="Don't forget to add a mousemove event listener to the window"
      params='[{"name":"event","type":"MouseEvent"}]'
    >
      <DetectRelativeMousePosition />
    </PageFunction>

    <PageFunction
      name="detectWindowSize"
      description="Detect the browser's window size"
      params='[]'
    >
      <DetectWindowSize />
    </PageFunction>

    <PageFunction
      name="detectScreenSize"
      description="Detect the screen or monitor size"
      params='[]'
    >
      <DetectScreenSize />
    </PageFunction>

    <PageFunction
      name="detectActiveBrowser"
      description="Detect if the browser window is currently active or hidden."
      params='[]'
    >
      <DetectActiveBrowser />
    </PageFunction>

    <PageFunction
      name="detectColorScheme"
      description="Detect the current color scheme (Light or Dark)"
      params='[]'
    >
      <DetectColorScheme />
    </PageFunction>

    <PageFunction
      name="detectUserTimezone"
      description="Detect the current user's Timezone"
      params='[]'
    >
      <DetectUserTimezone />
    </PageFunction>

    <PageFunction
      name="detectBreakpoint"
      description="Detect the current breakpoint based on Tailwind CSS breakpoints"
      info="Add a listener to the window resize event to detect changes"
      params='[]'
    >
      <DetectBreakpoint />
    </PageFunction>

    <PageFunction
      name="detectContainerBreakpoint"
      description="Detect any container breakpoint based on Tailwind CSS breakpoints"
      info="Add a listener to the window resize event to detect changes"
      params='[{"name":"element","type":"HTMLElement"}]'
    >
      <DetectContainerBreakpoint />
    </PageFunction>

    <PageFunction
      name="detectNetworkStatus"
      description="Detect the current network status of the user (Online or Offline)"
      params='[]'
    >
      <DetectNetworkStatus />
    </PageFunction>

    <PageFunction
      name="detectUrl"
      description="Returns the current URL"
      params='[]'
    >
      <DetectUrl />
    </PageFunction>

    <PageFunction
      name="detectUrlPath"
      description="Returns the path of the current URL as an array or string"
      params='[{"name":"format","type":"&#39;array&#39; | &#39;string&#39; = &#39;array&#39;"}]'
    >
      <DetectUrlPath />
    </PageFunction>

    <PageFunction
      name="detectUrlParams"
      description="Returns a value from the URL by name"
      params='[{"name":"format","type":"&#39;string&#39; | &#39;object&#39; = &#39;string&#39;"}]'
    >
      <DetectUrlParams />
    </PageFunction>

    <PageFunction
      name="detectUrlHash"
      description="Returns a value from the URL hash by name"
      params='[]'
    >
      <DetectUrlHash />
    </PageFunction>

    <PageFunction
      name="detectHost"
      description="Returns the current host or domain name from the URL"
      params='[]'
    >
      <DetectHost />
    </PageFunction>

    <PageFunction
      name="detectHostName"
      description="Returns the current hostname from the URL"
      params='[]'
    >
      <DetectHostName />
    </PageFunction>

    <PageFunction
      name="detectPort"
      description="Returns the current port"
      params='[]'
    >
      <DetectPort />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import DetectActiveBrowser from '~/components/content/dectectors/DetectActiveBrowser.vue'
import DetectBreakpoint from '~/components/content/dectectors/DetectBreakpoint.vue'
import DetectColorScheme from '~/components/content/dectectors/DetectColorScheme.vue'
import DetectContainerBreakpoint from '~/components/content/dectectors/DetectContainerBreakpoint.vue'
import DetectHost from '~/components/content/dectectors/DetectHost.vue'
import DetectHostName from '~/components/content/dectectors/DetectHostName.vue'
import DetectMousePosition from '~/components/content/dectectors/DetectMousePosition.vue'
import DetectNetworkStatus from '~/components/content/dectectors/DetectNetworkStatus.vue'
import DetectPort from '~/components/content/dectectors/DetectPort.vue'
import DetectRelativeMousePosition from '~/components/content/dectectors/DetectRelativeMousePosition.vue'
import DetectScreenSize from '~/components/content/dectectors/DetectScreenSize.vue'
import DetectScrollPosition from '~/components/content/dectectors/DetectScrollPosition.vue'
import DetectUrl from '~/components/content/dectectors/DetectUrl.vue'
import DetectUrlHash from '~/components/content/dectectors/DetectUrlHash.vue'
import DetectUrlParams from '~/components/content/dectectors/DetectUrlParams.vue'
import DetectUrlPath from '~/components/content/dectectors/DetectUrlPath.vue'
import DetectUserTimezone from '~/components/content/dectectors/DetectUserTimezone.vue'
import DetectWindowSize from '~/components/content/dectectors/DetectWindowSize.vue'

const toc = ["detectScrollPosition","detectMousePosition","detectRelativeMousePosition","detectWindowSize","detectScreenSize","detectActiveBrowser","detectColorScheme","detectUserTimezone","detectBreakpoint","detectContainerBreakpoint","detectNetworkStatus","detectUrl","detectUrlPath","detectUrlParams","detectUrlHash","detectHost","detectHostName","detectPort"]
const pageId = 'detections'

provide('toc', toc)
provide('pageId', pageId)
</script>
