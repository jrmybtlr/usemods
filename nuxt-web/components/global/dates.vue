<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24">
    <g :fill="fill">
      <path
        d="M19,4H18V2H16V4H8V2H6V4H5A2,2,0,0,0,3,6V20a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V6A2,2,0,0,0,19,4Zm0,16H5V10H19Z"
        :fill="fill" />
      <rect
        x="7"
        y="12"
        width="2"
        height="2"
        :fill="_secondaryfill" />
      <rect
        x="11"
        y="12"
        width="2"
        height="2"
        :fill="_secondaryfill" />
      <rect
        x="15"
        y="12"
        width="2"
        height="2"
        :fill="_secondaryfill" />
      <rect
        x="7"
        y="16"
        width="2"
        height="2"
        :fill="_secondaryfill" />
      <rect
        x="11"
        y="16"
        width="2"
        height="2"
        :fill="_secondaryfill" />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    fill: {
      type: String,
      default: 'currentColor',
    },
    secondaryfill: {
      type: String,
    },
  },
  computed: {
    _secondaryfill: function () {
      return this.secondaryfill || this.fill
    },
  },
}
</script>
