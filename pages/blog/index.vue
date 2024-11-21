<template>
  <b-container tag="main" class="mb-64 pb-lg-32">
    <AppBreadcrumbs :items="breadcrumbs" />

    <section>
      <h2 class="text-center">{{ $t('blog.title') }}</h2>

      <BlogTags
        :active-tag="activeTag"
        :tags="tags"
        :total-count="totalArticles"
        class="mb-16 mb-lg-64"
        @change="setActiveTag"
      />
    </section>

    <BlogArticleList :articles="articles" :loading="loading" />

    <b-button
      v-if="hasMore"
      :disabled="loading"
      variant="gray-200"
      block
      @click="fetchMore"
    >
      <b-spinner v-if="loading" class="mr-8" small />
      {{ $t('blog.showMore') }}
    </b-button>
  </b-container>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import BLOG_ARTICLES_QUERY from '@/graphql/blog/BlogArticles'

export default {
  components: { BSpinner },

  async asyncData({ app, query, $graphql }) {
    const perPage = 9
    const currentPage = query.page || 1
    const offset = (currentPage - 1) * perPage
    const activeTag = query.tag

    const variables = {
      offset,
      limit: perPage,
      locale: app.i18n.locale,
    }

    /* Add filter by selected tag if set */
    if (activeTag) {
      variables.where = { tags: { tag: { slug: { _eq: activeTag } } } }
    }

    const { articles, tags, totalArticles, totalRows } =
      await $graphql.default.request(BLOG_ARTICLES_QUERY, variables)

    return {
      activeTag,
      articles,
      currentPage,
      loading: false,
      perPage,
      tags,
      totalArticles: Number(totalArticles?.aggregate?.count) || 0,
      totalRows: Number(totalRows?.aggregate?.count) || 0,
    }
  },

  data() {
    return {
      breadcrumbs: [{ text: 'blog.title', active: true }],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },

  computed: {
    hasMore() {
      return this.totalRows > this.articles?.length
    },
  },

  watch: {
    activeTag() {
      this.refetch()
    },
  },

  methods: {
    async refetch(append = false) {
      if (!append) this.currentPage = 1

      this.loading = true

      try {
        const variables = {
          limit: this.perPage,
          offset: (this.currentPage - 1) * this.perPage,
          locale: this.$i18n.locale,
        }

        /* Add filter by selected tag if set */
        if (this.activeTag) {
          variables.where = { tags: { tag: { slug: { _eq: this.activeTag } } } }
        }

        const { articles, totalRows } = await this.$graphql.default.request(
          BLOG_ARTICLES_QUERY,
          variables
        )
        const baseArticles = append ? this.articles.slice() : []
        this.articles = baseArticles.concat(articles)
        this.totalRows = Number(totalRows?.aggregate?.count) || 0
      } catch (error) {}

      this.loading = false
    },

    fetchMore() {
      this.currentPage++
      this.refetch(true)
    },

    setActiveTag(tag) {
      this.activeTag = tag

      const query = { ...this.$route.query }

      if (tag) {
        query.tag = tag
      } else {
        delete query.tag
      }

      return this.$router.push({ query })
    },
  },
}
</script>

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
