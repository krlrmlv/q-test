<template>
  <b-row align-v="center" class="h-100" no-gutters>
    <b-col md="6" class="py-md-16">
      <h2>{{ slide.title }}</h2>

      <p class="mb-md-32">{{ slide.subtitle }}</p>

      <div v-if="slide.link" class="d-none d-md-block">
        <HomeTabbedSliderLink :link="slide.link" :text="slide.link_text" />
      </div>
    </b-col>

    <b-col md="6" class="align-self-end text-center text-md-right">
      <div class="slide-image-wrapper">
        <img
          :src="$getStaticImage(slide.image)"
          :alt="slide.title"
          class="slide-image"
        />
      </div>
    </b-col>
    <b-col v-if="slide.link" cols="12" class="pt-32 d-md-none">
      <HomeTabbedSliderLink :link="slide.link" :text="slide.link_text" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    slide: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
.slide-image-wrapper {
  position: relative;
  width: 100%;

  &::before {
    display: block;
    content: '';
    padding-bottom: 70.175%;
  }
}

.slide-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: right top;
}

@include media-breakpoint-down(md) {
  .slide-image-wrapper {
    &::before {
      padding-bottom: 72%;
    }
  }
}
</style>
