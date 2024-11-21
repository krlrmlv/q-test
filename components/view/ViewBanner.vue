<template>
  <section class="solutions-banner view-banner">
    <picture>
      <source
        v-for="{ image, width } in banner.sources"
        :key="width"
        :srcset="`${banner.path}/${image}.jpg`"
        :media="`(max-width: ${width}px)`"
        type="image/jpg"
      />
      <img
        :src="`${banner.path}/${banner.image}.jpg`"
        class="solutions-banner-bg"
        aria-hidden="true"
        :loading="banner.lazy ? 'lazy' : 'eager'"
      />
    </picture>
    <b-container class="solutions-banner-content">
      <slot name="breadcrumbs" />

      <slot />
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    banner: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
.view-banner::before {
  background-color: rgba($black, 0.5);
}
</style>
