<template>
  <main>
    <b-container tag="section" class="pb-32 pb-lg-64">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2">{{ $t('title') }}</h1>

      <p class="mb-32">
        {{ $t('description') }}
      </p>

      <DocumentationSearchForm
        v-model="query"
        :loading="loading"
        class="mb-32"
        @clear="clearSearch"
        @search="search"
      />

      <section class="mb-16 mb-lg-8">
        <transition name="fade" mode="out-in">
          <DocumentationList
            v-if="!searchDone"
            :categories="categories"
            class="mt-32 mt-lg-64"
          />

          <div v-else-if="hasSearchResults">
            <p class="fs-lg-4 mb-32">
              {{ $t('searchResults') }}
              <span class="h6 mb-0">{{ query }}</span>
            </p>

            <DocumentationSearchResults
              :items="searchResults"
              class="mt-32 mt-lg-64"
            />
          </div>

          <p v-else class="fs-lg-4 mb-32">
            {{ $t('searchEmpty') }}
            <b-link class="text-reset text-underline" @click="clearSearch">
              {{ $t('clearSearch') }}
            </b-link>
          </p>
        </transition>
      </section>
    </b-container>
  </main>
</template>

<script>
import DOCUMENTATION_CATEGORIES_QUERY from '@/graphql/documentation/DocumentationCategories'
import DOCUMENTATION_SEARCH_QUERY from '@/graphql/documentation/DocumentationSearch'

export default {
  async asyncData({ app, $graphql }) {
    const breadcrumbs = [{ text: 'support.documentation.title', active: true }]

    const variables = { locale: app.i18n.locale }

    const { categories } = await $graphql.default.request(
      DOCUMENTATION_CATEGORIES_QUERY,
      variables
    )

    return {
      breadcrumbs,
      categories,
      loading: false,
      query: null,
      searchDone: false,
      searchResults: [],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },

  computed: {
    hasSearchResults() {
      return Boolean(this.searchResults?.length)
    },
  },

  methods: {
    async search(event) {
      const variables = {
        locale: this.$i18n.locale,
        query: `%${event}%`,
      }

      this.loading = true

      try {
        const { results } = await this.$graphql.default.request(
          DOCUMENTATION_SEARCH_QUERY,
          variables
        )

        this.searchResults = results ?? []
        this.searchDone = true
        this.query = event
      } catch (error) {}

      this.loading = false
    },

    clearSearch() {
      this.query = null
      this.searchDone = false
      this.searchResults = []
    },
  },
}
</script>

<i18n>
{
  "en": {
    "clearSearch": "Reset search",
    "description": "Find passports, certificates, 3D models and catalogs for EKF products by search or by category",
    "pageTitle": "Documentation — EKF",
    "searchEmpty": "Documentation not found.",
    "searchResults": "Search results for",
    "title": "Documentation"
  },
  "ru": {
    "clearSearch": "Очистить поиск",
    "description": "Найдите паспорта, сертификаты, 3D модели и каталоги для продукции EKF с помощью поискового запроса или по категориям",
    "pageTitle": "Документация — EKF",
    "searchEmpty": "Ничего не найдено.",
    "searchResults": "Результаты поиска по запросу",
    "title": "Документация"
  }
}
</i18n>
