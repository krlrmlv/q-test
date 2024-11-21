<template>
  <component
    :is="tagName"
    :data-href="href"
    :class="linkClasses"
    class="seolink"
    @click.stop="navigate"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: '#',
    },
    linkClasses: {
      type: [Array, String],
      default: null,
    },
    tagName: {
      type: String,
      default: 'span',
    },
    target: {
      type: String,
      default: '_self',
    },
    text: {
      type: String,
      default: null,
    },
  },

  methods: {
    navigate() {
      this.$emit('click')
      if (!this.href) return
      if (process.client) {
        if (this.target === '_blank') window.open(this.href)
        else window.location.assign(this.href)
      }
    },
  },
}
</script>

<style lang="scss">
.seolink {
  cursor: pointer;
  transition: 0.15s;

  &:not([class*='-']) {
    color: $primary;
    transition: $transition-base;

    &:hover {
      color: darken($primary, 15%);
      text-decoration: underline;
    }
  }
}
</style>
