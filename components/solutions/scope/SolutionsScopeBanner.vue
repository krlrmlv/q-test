<template>
  <section class="solutions-banner">
    <img
      :src="$getStaticImage(image)"
      class="solutions-banner-bg"
      aria-hidden="true"
    />
    <b-container class="solutions-banner-content">
      <slot />

      <b-row class="pt-md-24 pt-xl-40">
        <b-col md="10" lg="8">
          <h1 class="h2 mb-32 mb-lg-56">
            {{ title }}
          </h1>
        </b-col>
      </b-row>

      <SolutionsScopeBenefits
        :benefits="benefits"
        class="mb-32 mb-lg-64 mt-lg-auto"
      />
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    benefits: {
      type: Array,
      default: () => [],
    },
    image: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .breadcrumb-item {
    color: $white;

    &::before,
    a {
      color: inherit;
    }
  }
}

@include media-breakpoint-down(md) {
  .h2 {
    font-size: 1.75rem;
  }
}

@include media-breakpoint-up(lg) {
  .solutions-banner {
    height: 600px;
  }

  .solutions-banner-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>
