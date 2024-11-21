<template>
  <main>
    <b-container tag="section">
      <AppBreadcrumbs :items="breadcrumbs" />

      <div class="blog-article-row mb-16 mb-lg-48">
        <div class="blog-article-col blog-article-col-content mb-48">
          <BlogArticle :article="article" />
        </div>

        <div class="blog-article-col blog-article-col-aside mb-48">
          <BlogSidebar :latest="latest" :popular="popular" />
        </div>
      </div>
    </b-container>
  </main>
</template>

<script>
import BLOG_ARTICLE_QUERY from '@/graphql/blog/BlogArticle'

export default {
  async asyncData({ app, $graphql, error, params }) {
    const variables = {
      locale: app.i18n.locale,
      slug: params.slug,
    }

    const { articles, latest, popular } = await $graphql.default.request(
      BLOG_ARTICLE_QUERY,
      variables
    )

    const article = articles?.[0]
    if (!article) return error({ statusCode: 404 })

    return { article, latest, popular }
  },

  head() {
    return {
      title: `${this.article?.title} — ${this.$t('pageTitle')}`,
    }
  },

  computed: {
    breadcrumbs() {
      return [
        { text: 'blog.title', to: '/blog' },
        { text: this.article?.title, active: true },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.blog-article-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 #{-$grid-gutter-width * 0.5};
}

.blog-article-col {
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 #{$grid-gutter-width * 0.5};
}

@include media-breakpoint-up(lg) {
  .blog-article-row {
    flex-wrap: nowrap;
    margin: 0;
  }

  .blog-article-col-content {
    flex: 0 0 68%;
    max-width: 68%;
    padding: 0 $grid-gutter-width 0 0;
  }

  .blog-article-col-aside {
    flex: 0 0 32%;
    max-width: 32%;
    padding: 0 0 0 $grid-gutter-width;
    border-left: $border-width solid $border-color;
  }
}

@include media-breakpoint-up(xl) {
  .blog-article-col-content {
    flex: 0 0 72.28%;
    max-width: 72.28%;
    padding: 0 #{$grid-gutter-width * 2} 0 0;
  }

  .blog-article-col-aside {
    flex: 0 0 27.72%;
    max-width: 27.72%;
  }
}
</style>

<i18n>
{
  "en": {
    "pageTitle": "Blog — EKF"
  },
  "ru": {
    "pageTitle": "Блог — EKF"
  }
}
</i18n>
