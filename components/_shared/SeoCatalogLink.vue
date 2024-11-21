<template>
  <component
    :is="tagName"
    :data-to="to"
    :class="linkClasses"
    class="seo-router-link"
    @click.stop="navigate"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<script>
export default {
  props: {
    to: {
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
    text: {
      type: String,
      default: null,
    },
  },
  methods: {
    navigate() {
      this.$emit('click')
      if (!this.to) return
      if (process.client) {
        this.$router.push(this.to)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.seo-router-link {
  cursor: pointer;

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
