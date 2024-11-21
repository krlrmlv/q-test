<template>
  <main>
    <b-container tag="section">
      <AppBreadcrumbs :items="breadcrumbs" />

      <b-row class="mx-xl-0 mb-lg-32">
        <b-col lg="8" xl="7" class="px-xl-0">
          <NewsContent :article="article" />
        </b-col>

        <b-col lg="4" offset-xl="1" class="px-xl-0">
          <aside class="mb-64">
            <NewsSidebarCategory
              v-for="sidebarCategory in categories"
              :key="sidebarCategory.slug"
              :category="sidebarCategory"
              class="mb-48"
            />

            <h3>{{ $t('news.subscribe') }}</h3>
            <p class="lh-140" v-html="$t('form.sidebarSubscribeLabel')" />

            <NewsFormSubscribe />
          </aside>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
import NEWS_ARTICLE_QUERY from '@/graphql/news/NewsArticle'
import NEWS_CATEGORIES_QUERY from '@/graphql/news/NewsCategories'

export default {
  async asyncData({ app, error, params, $graphql }) {
    /* Fetch article */
    const variables = {
      locale: app.i18n.locale,
      slug: params.slug,
    }
    const { articles } = await $graphql.default.request(
      NEWS_ARTICLE_QUERY,
      variables
    )
    const article = articles?.[0]
    if (!article) return error({ statusCode: 404 })

    /* Fetch sidebar news, skipping currently displayed article */
    const sidebarVariables = {
      articleLimit: 4,
      limit: 2,
      locale: app.i18n.locale,
      type: 'news',
      where: { slug: { _neq: params.slug } },
    }
    const { categories } = await $graphql.default.request(
      NEWS_CATEGORIES_QUERY,
      sidebarVariables
    )

    return { article, categories }
  },

  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaDescription,
        },
      ],
    }
  },

  computed: {
    breadcrumbs() {
      const breadcrumbs = []

      if (this.categoryType) {
        breadcrumbs.push({
          text: `about.${this.categoryType}`,
          to: `/about/${this.categoryType}`,
        })

        if (this.category?.name) {
          breadcrumbs.push({
            text: this.category?.name,
            to: `/about/${this.categoryType}/category/${this.category?.slug}`,
          })
        }
      }

      breadcrumbs.push({ text: this.article?.title, active: true })
      return breadcrumbs
    },

    category() {
      return this.article?.category || {}
    },

    categoryType() {
      return this.category?.parent?.slug
    },

    pageTitle() {
      let title = this.article?.title
      if (this.category?.name) {
        title += ` — ${this.category.name}`
      }
      if (this.category?.parent?.slug) {
        title += ' — '
        title += this.$t(`about.${this.category.parent.slug}`)
      }
      title += this.$t('pageTitle')
      return title
    },

    metaDescription() {
      if (this.article?.meta_description) return this.article?.meta_description

      const firstSentence = this.article?.text?.split('.')[0]?.trim()
      return firstSentence
    },
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": " — EKF"
  },
  "ru": {
    "pageTitle": " — компания EKF"
  }
}
</i18n>
