<template>
  <section class="position-relative">
    <b-spinner v-if="loading" variant="muted" class="spinner-loading" />

    <b-row
      v-if="orderedArticles.length"
      :class="{ loading: loading }"
      class="blog-articles mx-n12"
    >
      <b-col
        v-for="(article, index) in orderedArticles"
        :key="`${article.slug}-${index}`"
        :md="article.featured ? 12 : 6"
        :xl="article.featured ? 8 : 4"
        :style="{ order: article.order }"
        cols="12"
        class="mb-16 mb-lg-24 px-0 px-sm-12 overflow-hidden"
      >
        <BlogArticleCard :article="article" />
      </b-col>
    </b-row>

    <p v-else class="text-center text-muted mb-lg-24">
      {{ $t('search.empty') }}
    </p>
  </section>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {
  components: { BSpinner },

  props: {
    articles: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    orderedArticles() {
      const result = []
      let rowWidth = 0

      this.articles?.forEach((article, index) => {
        const colWidth = article.featured ? 8 : 4
        if (colWidth + rowWidth <= 12) {
          result.push({ ...article, order: index * 2 })
          rowWidth = colWidth + rowWidth === 12 ? 0 : colWidth + rowWidth
        } else {
          result.push({ ...article, order: (index + 1) * 2 + 1 })
          rowWidth = 0
        }
      })
      return result
    },
  },
}
</script>

<style lang="scss" scoped>
.blog-articles {
  transition: $transition-base;
  transition-property: opacity;

  &.loading {
    opacity: 0.5;
  }
}

.spinner-loading {
  position: absolute;
  left: $grid-gutter-width * 0.5;
  top: $grid-gutter-width * 0.5;
  border-width: $border-width * 2;
  z-index: 1;
}
</style>
