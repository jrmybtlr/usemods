<template>
  <DocsLayout>
    <PageTitle>
      <h1>Devices</h1>
      <p>Client-side detections user's machines.</p>
    </PageTitle>

    <PageFunction
      name="isServerSide"
      description="Check if you're a server-side user."
      params='[]'
    >
      <IsServerSide />
    </PageFunction>

    <PageFunction
      name="detectUserDevice"
      description="Detects the user's device based on the user agent string and returns the information as an object."
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <DetectUserDevice />
    </PageFunction>

    <PageFunction
      name="addDeviceClasses"
      description="Adds detected devices as classes to your project's body class"
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <AddDeviceClasses />
    </PageFunction>

    <PageFunction
      name="detectDevice"
      description="Detect the current device type (Mobile or Desktop)"
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <DetectDevice />
    </PageFunction>

    <PageFunction
      name="detectBrowser"
      description="Detect the current browser"
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <DetectBrowser />
    </PageFunction>

    <PageFunction
      name="detectOS"
      description="Detect the current operating system"
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <DetectOS />
    </PageFunction>

    <PageFunction
      name="isIos"
      description="Check if you're a passionate iPhone fan."
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsIos />
    </PageFunction>

    <PageFunction
      name="isAndroid"
      description="Check if you're a zealous Android fan."
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsAndroid />
    </PageFunction>

    <PageFunction
      name="isMac"
      description="Check if you're a staunch Mac fan."
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsMac />
    </PageFunction>

    <PageFunction
      name="isWindows"
      description="Check if you're a fervent Windows fan."
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsWindows />
    </PageFunction>

    <PageFunction
      name="isLinux"
      description="Check if you're a devoted Linux fan."
      info="Fun fact, most Linux users will tell you they have Linux before the function does."
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsLinux />
    </PageFunction>

    <PageFunction
      name="isChrome"
      description="Check if you're a die-hard Chrome fan."
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsChrome />
    </PageFunction>

    <PageFunction
      name="isFirefox"
      description="Check if you're a dedicated Firefox fan."
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsFirefox />
    </PageFunction>

    <PageFunction
      name="isSafari"
      description="Check if you're a lonely Safari fan."
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsSafari />
    </PageFunction>

    <PageFunction
      name="isEdge"
      description="Check if you're an ardent Edge fan."
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsEdge />
    </PageFunction>

    <PageFunction
      name="isMobile"
      description="Check if you're rocking a mobile"
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsMobile />
    </PageFunction>

    <PageFunction
      name="isTablet"
      description="Check if you're tablet user"
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsTablet />
    </PageFunction>

    <PageFunction
      name="isDesktop"
      description="Check if you're pro desktop user"
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsDesktop />
    </PageFunction>

    <PageFunction
      name="isPortrait"
      description="Check if you're portrait"
      params='[{"name":"win?","type":"{ innerWidth: number, innerHeight: number }"}]'
    >
      <IsPortrait />
    </PageFunction>

    <PageFunction
      name="isLandscape"
      description="Check if you're landscape"
      params='[{"name":"win?","type":"{ innerWidth: number, innerHeight: number }"}]'
    >
      <IsLandscape />
    </PageFunction>

    <PageFunction
      name="isBot"
      description="Check if you're a cyborg or a bot"
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsBot />
    </PageFunction>

    <PageFunction
      name="isHuman"
      description="Check if you're a human"
      params='[{"name":"userAgent?","type":"string"}]'
    >
      <IsHuman />
    </PageFunction>

    <PageFunction
      name="isDeveloper"
      description="Check if you're a developer by checking the environment variable"
      params='[]'
    >
      <IsDeveloper />
    </PageFunction>

  </DocsLayout>
</template>

<script setup lang="ts">
import DocsLayout from '~/components/DocsLayout.vue'
import PageTitle from '~/components/content/PageTitle.vue'
import PageFunction from '~/components/content/PageFunction.vue'
import AddDeviceClasses from '~/components/content/devices/addDeviceClasses.vue'
import DetectBrowser from '~/components/content/devices/detectBrowser.vue'
import DetectDevice from '~/components/content/devices/detectDevice.vue'
import DetectOS from '~/components/content/devices/detectOS.vue'
import DetectUserDevice from '~/components/content/devices/detectUserDevice.vue'
import IsAndroid from '~/components/content/devices/isAndroid.vue'
import IsBot from '~/components/content/devices/isBot.vue'
import IsChrome from '~/components/content/devices/isChrome.vue'
import IsDesktop from '~/components/content/devices/isDesktop.vue'
import IsDeveloper from '~/components/content/devices/isDeveloper.vue'
import IsEdge from '~/components/content/devices/isEdge.vue'
import IsFirefox from '~/components/content/devices/isFirefox.vue'
import IsHuman from '~/components/content/devices/isHuman.vue'
import IsIos from '~/components/content/devices/isIos.vue'
import IsLandscape from '~/components/content/devices/isLandscape.vue'
import IsLinux from '~/components/content/devices/isLinux.vue'
import IsMac from '~/components/content/devices/isMac.vue'
import IsMobile from '~/components/content/devices/isMobile.vue'
import IsPortrait from '~/components/content/devices/isPortrait.vue'
import IsSafari from '~/components/content/devices/isSafari.vue'
import IsServerSide from '~/components/content/devices/isServerSide.vue'
import IsTablet from '~/components/content/devices/isTablet.vue'
import IsWindows from '~/components/content/devices/isWindows.vue'

const toc = ["isServerSide","detectUserDevice","addDeviceClasses","detectDevice","detectBrowser","detectOS","isIos","isAndroid","isMac","isWindows","isLinux","isChrome","isFirefox","isSafari","isEdge","isMobile","isTablet","isDesktop","isPortrait","isLandscape","isBot","isHuman","isDeveloper"]
const pageId = 'devices'

provide('toc', toc)
provide('pageId', pageId)
</script>
