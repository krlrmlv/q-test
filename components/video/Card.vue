<template>
  <b-link class="card card-video" @click="$emit('click', video)">
    <div class="card-img embed-responsive embed-responsive-16by9">
      <picture>
        <source
          v-for="image in images"
          :key="`source-${image.breakpoint}`"
          :srcset="image.url"
          :media="image.media"
        />
        <img
          :src="fallbackImageUrl"
          :alt="video.title"
          class="embed-responsive-item"
        />
      </picture>
    </div>
    <h6 class="card-body">
      {{ video.title }}
    </h6>
  </b-link>
</template>

<script>
import { getYoutubeId } from '@/utils/youtube'

export default {
  props: {
    video: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      imageSizes: [
        { breakpoint: 360, size: 336 },
        { breakpoint: 575, size: 551 },
        { breakpoint: 767, size: 516 },
        { breakpoint: 991, size: 228 },
        { breakpoint: 1199, size: 296 },
        { breakpoint: null, size: 364 },
      ],
    }
  },
  computed: {
    fallbackImageUrl() {
      return this.images[this.images.length - 1]?.url
    },
    images() {
      return this.imageSizes.map(({ breakpoint, size }) => ({
        breakpoint,
        media: breakpoint ? `(max-width: ${breakpoint}px)` : null,
        url: this.video?.image
          ? this.$getStaticImage(this.video.image, size)
          : `https://img.youtube.com/vi/${getYoutubeId(
              this.video?.url
            )}/sddefault.jpg`,
      }))
    },
  },
}
</script>

<style lang="scss" scoped>
.card-video {
  height: 100%;
  text-decoration: none;
  color: inherit;
  transition: $transition-base;
  transition-property: box-shadow;

  &:hover {
    box-shadow: $box-shadow;
  }
}
</style>
