<template>
  <iframe
    ref="iframe"
    :height="iframeHeight"
    :src="`${embedUrl}/${url}`"
    frameborder="0"
    class="w-100"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      iframeHeight: 400,
    }
  },

  computed: {
    embedUrl() {
      return process.env.EMBED_URL
    },
  },

  mounted() {
    this.resizeIframeToContent(this.$refs.iframe)
  },

  methods: {
    resizeIframeToContent(embed) {
      if (embed && embed.contentWindow) {
        embed.contentWindow.postMessage({ operation: 'getDocumentHeight' }, '*')
        window.addEventListener('message', ({ origin, data }) => {
          if (
            process.env.EMBED_URL.startsWith(origin) &&
            data.event === 'resize'
          ) {
            this.iframeHeight = data.payload
          }
        })
      }
    },
  },
}
</script>
