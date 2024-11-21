<template>
  <main>
    <b-container tag="section">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h2 class="mb-0">{{ $t('about.news') }}</h2>
    </b-container>

    <NewsCategory
      v-for="(category, index) in categories"
      :key="category.slug"
      :category="category"
      :class="{ 'bg-light': index % 2 !== 0 }"
    />
  </main>
</template>

<script>
import NEWS_CATEGORIES_QUERY from '@/graphql/news/NewsCategories'

export default {
  name: 'PageAboutNews',

  async asyncData({ app, $graphql }) {
    const breadcrumbs = [{ text: 'about.news', active: true }]

    const variables = {
      articleLimit: 4,
      locale: app.i18n.locale,
      type: 'news',
    }

    const { categories } = await $graphql.default.request(
      NEWS_CATEGORIES_QUERY,
      variables
    )

    return { breadcrumbs, categories }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": "News — EKF"
  },
  "ru": {
    "pageTitle": "Новости — компания EKF"
  }
}
</i18n>
