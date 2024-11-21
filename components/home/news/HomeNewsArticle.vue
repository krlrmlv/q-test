<template>
  <div class="home-news-article">
    <p class="h5 article-title mb-0">
      <b-link
        :to="localePath(`/about/news/${article.slug}`)"
        class="text-reset"
      >
        {{ article.title }}
      </b-link>
    </p>
    <div v-if="publishedAt" class="article-footer mt-16">
      <span class="text-muted">{{ publishedAt }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeNewsArticle',

  serverCacheKey: ({ article, locale }) =>
    `${locale}::${article.id}::${article.created_at}`,

  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
    locale: {
      type: String,
      required: true,
    },
  },

  computed: {
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
.home-news-article {
  padding: 1.5rem 0;
  font-size: $font-size-2;
}

.article-title {
  color: inherit;

  &:hover {
    color: $secondary;
  }
}

@include media-breakpoint-down(sm) {
  .home-news-article {
    border-top: $border-width solid $gray-200;

    &:first-of-type {
      margin-top: 0.5rem;
    }
  }
}

@include media-breakpoint-down(md) {
  .home-news-article {
    font-size: $font-size-1;
  }

  .article-title {
    font-size: $font-size-base;
  }
}

@include media-breakpoint-up(md) {
  .home-news-article {
    margin-bottom: 1.5rem;
    padding-top: 0;
    border-bottom: $border-width solid $gray-200;

    &:last-of-type {
      margin-bottom: 0;
      border-bottom: none;
    }
  }
}

@include media-breakpoint-up(lg) {
  .home-news-article {
    margin-bottom: 2rem;
    padding-bottom: 2rem;

    &:last-of-type {
      margin-bottom: 1rem;
    }
  }
}
</style>
