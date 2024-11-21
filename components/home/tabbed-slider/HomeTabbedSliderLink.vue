<template>
  <component
    :is="componentName"
    :href="link"
    :target="linkTarget"
    :class="componentClass"
    variant="primary"
    class="slide-link"
  >
    {{ text }}
    <svg-icon
      name="arrow-right-24"
      width="24"
      height="24"
      class="ml-8"
      aria-hidden="true"
    />
  </component>
</template>

<script>
import { isExternal } from '@/utils/link'

export default {
  props: {
    link: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
  },

  computed: {
    componentClass() {
      return isExternal(this.link) ? 'btn btn-primary' : null
    },

    componentName() {
      return isExternal(this.link) ? 'SeoLink' : 'BButton'
    },

    linkTarget() {
      return isExternal(this.link) ? '_blank' : null
    },
  },
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(md) {
  .slide-link {
    width: 100%;
  }
}
</style>
