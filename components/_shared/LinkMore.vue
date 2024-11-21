<template>
  <component
    :is="isExternal(href) ? 'SeoLink' : 'BButton'"
    :block="block"
    :href="href"
    :target="isExternal(href) ? '_blank' : target"
    :to="to"
    :variant="isExternal(href) ? null : 'link'"
    :class="[`btn btn-link btn-${size}`, { 'btn-block': block }]"
    @click="$emit('click')"
  >
    <slot />
    <svg-icon
      :name="`${icon}-${iconSize}`"
      :width="iconSize"
      :height="iconSize"
      class="ml-8"
      aria-hidden="true"
    />
  </component>
</template>

<script>
import { isExternal } from '@/utils/link'

export default {
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: 'arrow-right',
    },
    size: {
      type: String,
      default: 'md',
    },
    target: {
      type: String,
      default: null,
    },
    to: {
      type: String,
      default: null,
    },
  },

  computed: {
    iconSize() {
      return this.size === 'sm' ? 16 : 24
    },
  },

  methods: { isExternal },
}
</script>

<style lang="scss" scoped>
.btn {
  padding: 0;
  text-decoration: none;
  border: none;
}
</style>
