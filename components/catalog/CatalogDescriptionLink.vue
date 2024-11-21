<template>
  <component
    :is="isExternalLink ? 'SeoLink' : 'BLink'"
    :href="link"
    target="_blank"
    class="btn"
    :class="linkClasses"
    @click="sendAnalyticEvent"
  >
    {{ linkTitle }}

    <svg-icon
      :name="`external-link-${iconSize}`"
      :width="iconSize"
      :height="iconSize"
      aria-hidden="true"
    />
  </component>
</template>

<script>
import { isExternal } from '@/utils/link'

export default {
  props: {
    gtmEvent: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      required: true,
    },
    linkClasses: {
      type: String,
      default: '',
    },
    iconSize: {
      type: [String, Number],
      default: 16,
    },
  },

  computed: {
    isExternalLink() {
      return isExternal(this.link)
    },

    linkTitle() {
      return this.isExternalLink
        ? this.$t(`catalog.goToProductLanding`)
        : this.$t(`catalog.goToProductPage`)
    },
  },
  methods: {
    sendAnalyticEvent() {
      if (!this.gtmEvent) return

      this.$gtm.push({ event: this.gtmEvent })
    },
  },
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  gap: 0.5rem;
  padding-block: 0.6875rem;

  &.btn-hyperlink {
    gap: 0.25rem;

    &:focus {
      box-shadow: none;
      text-decoration: underline;
    }
  }

  &.reverse {
    justify-content: left;
    flex-direction: row-reverse;

    @include media-breakpoint-down(sm) {
      justify-content: center;
    }
  }
}

.btn-outline-primary:focus {
  box-shadow: none;
}
.btn-link {
  text-decoration: none;
}
</style>
