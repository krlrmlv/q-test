<template>
  <b-link class="card card-catalog-video">
    <div class="embed-responsive embed-responsive-16by9">
      <picture v-if="hasId">
        <source
          v-for="src in imageSources"
          :key="`source-${src.breakpoint}`"
          :srcset="src.src"
          :media="src.breakpoint ? `(max-width: ${src.breakpoint}px)` : null"
        />
        <img
          :alt="item.name"
          :src="imageDefault"
          class="embed-responsive-item"
        />
      </picture>
      <b-skeleton v-else class="embed-responsive-item" />
    </div>
    <div class="h6 card-body">
      <span v-if="item.name">{{ item.name }}</span>
      <div v-else>
        <b-skeleton width="100%" class="d-inline-block" />
        <b-skeleton width="100%" class="d-inline-block" />
        <b-skeleton width="50%" class="d-inline-block" />
      </div>
    </div>
  </b-link>
</template>

<script>
import { BSkeleton } from 'bootstrap-vue'

export default {
  components: { BSkeleton },

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      imageSizes: [
        { breakpoint: 360, size: 336 },
        { breakpoint: 575, size: 551 },
        { breakpoint: 767, size: 743 },
        { breakpoint: 991, size: 348 },
        { breakpoint: 1239, size: 296 },
        { breakpoint: 1359, size: 372 },
        { breakpoint: 1479, size: 416 },
        { breakpoint: null, size: 450 },
      ],
    }
  },

  computed: {
    hasId() {
      return Boolean(this.item?.id)
    },

    hasImage() {
      return Boolean(this.item?.image)
    },

    imageDefault() {
      return this.hasImage
        ? this.$getStaticImage(this.item.image, 450)
        : `https://img.youtube.com/vi/${this.item?.id}/0.jpg`
    },

    imageSources() {
      const sources = []

      if (this.hasImage) {
        this.imageSizes.forEach(({ breakpoint, size }) => {
          sources.push({
            breakpoint,
            src: this.$getStaticImage(this.item.image, size),
          })
        })
      } else {
        sources.push({
          breakpoint: null,
          src: `https://img.youtube.com/vi/${this.item?.id}/0.jpg`,
        })
      }

      return sources
    },
  },
}
</script>

<style lang="scss" scoped>
.card-catalog-video {
  height: 100%;
  color: inherit;

  &:link {
    transition: $transition-base;
    transition-property: color, box-shadow;
  }

  &:hover {
    text-decoration: none;
    color: inherit;
    box-shadow: $box-shadow;
  }
}

.card-img {
  border: $border-width solid $border-color;
}

.card-body {
  margin: 0;
  padding: 1rem 1.5rem;
}
</style>
