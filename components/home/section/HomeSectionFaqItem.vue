<template>
  <CardCollapse :title="item.question" class="mb-32">
    <div v-if="ready" class="md-content" v-html="htmlContent" />
  </CardCollapse>
</template>

<script>
import { mdLight } from '@/utils/markdown'

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
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
    this.htmlContent = md.render(this.item?.answer ?? '')
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
