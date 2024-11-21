<template>
  <CardCollapse
    :accordion="accordion"
    :appear="appear"
    :title="contact.title"
    :visible="visible"
    @toggle-collapse="$emit('toggle-collapse')"
  >
    <div v-if="ready" class="md-content" v-html="htmlContent" />
  </CardCollapse>
</template>

<script>
import { mdLight } from '@/utils/markdown'

export default {
  props: {
    accordion: {
      type: String,
      default: null,
    },
    appear: {
      type: Boolean,
      default: false,
    },
    contact: {
      type: Object,
      default: () => ({}),
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      htmlContent: null,
      ready: false,
    }
  },

  async fetch() {
    const md = await mdLight()
    this.htmlContent = md.render(this.contact?.description)
    this.ready = true
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .md-content {
    p:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
