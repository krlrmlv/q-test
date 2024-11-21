<template>
  <div class="card card-news-item mx-4 mx-sm-auto">
    <b-link
      :to="localePath(`/about/news/${article.slug}`)"
      class="card-img embed-responsive"
    >
      <picture>
        <source
          v-for="size in imageSizes"
          :key="`source-${size.breakpoint}`"
          :srcset="$getStaticImage(article.preview_image, size.size)"
          :media="size.breakpoint ? `(max-width: ${size.breakpoint}px)` : null"
        />
        <img
          :src="$getStaticImage(article.preview_image, 332)"
          alt=""
          loading="lazy"
          class="embed-responsive-item"
        />
      </picture>
    </b-link>
    <b-link :to="localePath(`/about/news/${article.slug}`)" class="card-body">
      {{ article.title }}
    </b-link>
    <div class="card-footer">
      <span class="published-at">
        {{ formatDate(article.published_at) }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      imageSizes: [
        { breakpoint: 360, size: 328 },
        { breakpoint: 575, size: 543 },
        { breakpoint: 767, size: 246 },
        { breakpoint: 991, size: 193 },
        { breakpoint: 1239, size: 296 },
        { breakpoint: 1359, size: 273 },
        { breakpoint: 1479, size: 306 },
        { breakpoint: null, size: 332 },
      ],
    }
  },

  methods: {
    formatDate(datestring) {
      const date = new Date(datestring)
      const options = { dateStyle: 'medium' }
      return date.toLocaleString(this.$i18n.localeProperties.iso, options)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-news-item {
  height: 100%;
  font-size: $font-size-2;
  line-height: 1.4;
  background-color: $white;
  transition: $transition-base;
  transition-property: box-shadow;

  .card-img {
    border: none;
    aspect-ratio: 328 / 180;
  }

  .card-body {
    padding: 1rem 1rem 0.5rem;
    color: inherit;
  }

  .card-footer {
    display: flex;
    align-items: center;
    padding: 0 1rem 1.5rem;
    background-color: transparent;
  }

  .published-at {
    color: $gray-500;
  }

  @media (hover: hover) {
    &:hover {
      box-shadow: $box-shadow;
    }
  }

  @media (hover: none) {
    box-shadow: $box-shadow;
  }

  @include media-breakpoint-up(sm) {
    .card-img {
      aspect-ratio: 332 / 191;
    }
  }
}
</style>
