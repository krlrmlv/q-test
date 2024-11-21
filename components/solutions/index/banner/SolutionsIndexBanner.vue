<template>
  <section class="solutions-banner">
    <img
      :src="$getStaticImage(image)"
      class="solutions-banner-bg"
      aria-hidden="true"
    />
    <b-container class="solutions-banner-content">
      <slot />

      <b-row class="pt-lg-24">
        <b-col md="7" lg="6" class="mb-64 mb-md-0">
          <div class="pr-md-56 pr-lg-0">
            <h1 class="h2 mb-32 mb-lg-56">
              {{ title }}
            </h1>

            <b-row class="flex-md-nowrap mx-n4 mx-lg-n12 mb-n16">
              <b-col
                v-for="(point, index) in points"
                :key="`point-${index}`"
                cols="12"
                md="4"
                class="px-4 px-lg-12 mb-16"
              >
                <SolutionsIndexBannerPercent
                  :text="point.text"
                  :value="point.value"
                />
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col md="5" offset-lg="1">
          <slot name="form" />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: null,
    },
    points: {
      type: Array,
      default: () => [],
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
}
</style>
