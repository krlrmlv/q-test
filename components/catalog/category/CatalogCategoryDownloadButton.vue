<template>
  <b-button
    :href="href"
    target="_blank"
    variant="link"
    class="btn-download"
    block
  >
    <slot />

    <svg-icon name="download-24" width="24" height="24" aria-hidden="true" />
  </b-button>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-download {
  padding: 0;
  border: none;
  color: $dark;
  gap: 0.5rem;
  flex-direction: row-reverse;
}

@include media-breakpoint-up(md) {
  .btn-download {
    flex-direction: row;
  }
}
</style>
