<template>
  <section class="section-news">
    <b-container>
      <b-row>
        <b-col sm="6" class="mb-16 mb-lg-24">
          <h4 class="mb-0">{{ category.name }}</h4>
        </b-col>

        <b-col sm="6" class="d-none d-sm-block text-right mb-16 mb-lg-24">
          <LinkMore :to="categoryLink">
            {{ $t('news.showAll') }}
          </LinkMore>
        </b-col>
      </b-row>

      <b-row v-if="hasArticles" class="mb-sm-n16">
        <b-col
          v-for="(article, index) in category.articles"
          :key="`article-${index}`"
          sm="6"
          lg="3"
          class="mb-16"
        >
          <NewsCard :article="article" />
        </b-col>
      </b-row>

      <p v-else class="text-muted">
        {{ $t('news.empty') }}
      </p>

      <div class="d-sm-none text-center">
        <LinkMore :to="categoryLink">
          {{ $t('news.showAll') }}
        </LinkMore>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    parent: {
      type: String,
      default: 'news',
    },
    category: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    categoryLink() {
      return this.localePath(
        `/about/${this.parent}/category/${this.category?.slug}`
      )
    },

    hasArticles() {
      return Boolean(this.category?.articles?.length)
    },
  },
}
</script>

<style lang="scss" scoped>
.section-news {
  padding-top: 2rem;
  padding-bottom: 2rem;

  &:last-of-type {
    padding-bottom: 4rem;
  }
}

@include media-breakpoint-up(lg) {
  .section-news {
    padding-top: 4rem;
    padding-bottom: 4rem;

    &:last-of-type {
      padding-bottom: 6rem;
    }
  }
}
</style>
