<template>
  <div class="card home-news-featured embed-responsive embed-responsive-1by1">
    <b-img-lazy
      :alt="article.title"
      :src="$getStaticImage(articleImage)"
      class="card-img"
    />
    <div class="card-body">
      <h3 class="mb-lg-32">{{ article.title }}</h3>

      <p class="h6 mb-lg-32">{{ publishedAt }}</p>

      <p class="fs-2 fs-lg-4 mb-lg-32">
        {{ article.short_text }}
      </p>

      <b-button
        :to="`/about/news/${article.slug}`"
        target="_blank"
        variant="gray-200"
        block
      >
        {{ $t('global.readMore') }}
      </b-button>
    </div>
  </div>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'

export default {
  components: { BImgLazy },

  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    articleImage() {
      return this.article?.featured_image ?? this.article?.preview_image
    },

    publishedAt() {
      if (!this.article?.published_at) return

      const date = new Date(this.article.published_at)
      const options = { day: 'numeric', month: 'long', year: 'numeric' }
      return date.toLocaleString(this.$i18n.localeProperties.iso, options)
    },
  },
}
</script>

<style lang="scss" scoped>
.home-news-featured {
  min-height: 100%;
  color: $white;

  &::before {
    display: block;
    content: '';
    padding-top: 112%;
  }
}

.card-img,
.card-body {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.card-img {
  object-fit: cover;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image: linear-gradient(to top, rgba($black, 0.5), transparent);
  z-index: 1;
}

@include media-breakpoint-up(lg) {
  .card-body {
    padding: 2.5rem 2.5rem 3.5rem;
  }
}
</style>
