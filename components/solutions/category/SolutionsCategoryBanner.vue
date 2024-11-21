<template>
  <section class="solutions-banner">
    <img
      :src="$getStaticImage(category.banner_image)"
      class="solutions-banner-bg"
      aria-hidden="true"
    />
    <b-container class="solutions-banner-content">
      <slot />

      <b-row align-v="center">
        <b-col cols="12" md="7" xl="6">
          <h1 class="h2">
            {{ setCategoryName() }}
          </h1>

          <p class="category-description mb-64 mb-md-56 mb-xl-40">
            {{ category.description }}
          </p>
        </b-col>

        <b-col cols="12" md="5" offset-xl="1" class="mb-32 mb-md-56 mb-xl-40">
          <slot name="form">
            <SolutionsCategoryBannerForm />
          </slot>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    setCategoryName() {
      if (this.$route.path.endsWith('/solutions/molniezashhita-i-zazemlenie')) {
        return 'Молниезащита и\xA0заземление'
      }
      return this.category.name
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

  .category-description {
    font-size: $font-size-2;
    line-height: 1.4;
  }
}

@include media-breakpoint-up(lg) {
  .solutions-banner-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>
