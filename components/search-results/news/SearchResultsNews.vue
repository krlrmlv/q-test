<template>
  <div class="pb-md-48">
    <b-row>
      <b-col md="7" lg="8" xl="9" order-md="2" class="mb-md-48">
        <SearchResultsControls
          v-if="totalRows"
          :found="totalRows"
          :sort="orderBy"
          :sort-modes="sortModes"
          @sort-set="setSort"
          @show-filters="showFilters"
        />

        <b-row
          :class="{ loading: loading }"
          class="search-results-content mb-lg-8"
        >
          <b-spinner v-if="loading" variant="muted" class="spinner-loading" />

          <b-col
            v-for="article in news"
            :key="`news-card-${article.id}`"
            cols="12"
            sm="6"
            xl="4"
            class="mb-16 mb-lg-24"
          >
            <NewsCard :article="article" />
          </b-col>
        </b-row>

        <AppPagination
          v-if="totalRows > perPage"
          :per-page="perPage"
          :total-rows="totalRows"
          :value="currentPage"
          align="center"
          size="sm"
          @change="setPage"
        />
      </b-col>

      <b-col
        v-if="totalRows"
        md="5"
        lg="4"
        xl="3"
        order-md="1"
        class="mb-md-48"
      >
        <SearchResultsNewsFilter
          :categories="categories"
          :loading="loading"
          :selected-categories="selectedCategories"
          :show="filtersVisible"
          class="mb-md-48"
          @close="hideFilters"
          @filters-reset="setFilter([])"
          @filters-set="setFilter"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import { scrollToTarget } from '@/utils/window'
import SEARCH_NEWS_QUERY from '@/graphql/news/NewsSearch'

export default {
  components: { BSpinner },

  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      categories: [],
      currentPage: 1,
      filtersVisible: false,
      loading: false,
      news: [],
      orderBy: { published_at: 'desc' },
      perPage: 18,
      selectedCategories: [],
      sortModes: [
        { text: this.$t('sort.new'), value: { published_at: 'desc' } },
        { text: this.$t('sort.abc'), value: { title: 'asc' } },
      ],
      totalRows: 0,
    }
  },

  // computed: {
  //   perPage() {
  //     return parseInt(this.$route.query.perPage) || 18
  //   },
  // },

  watch: {
    '$route.query.q'() {
      this.selectedCategories = []
      this.fetchNews()
    },

    open: {
      immediate: true,
      handler(value) {
        if (value) this.fetchNews()
      },
    },
  },

  methods: {
    async fetchNews(scroll = false) {
      const offset = (this.currentPage - 1) * this.perPage
      const query = this.$route.query?.q?.split(' ')?.join('%') ?? ''

      const where = {}

      if (this.selectedCategories?.length) {
        where.category = { id: { _in: this.selectedCategories } }
      }

      const variables = {
        limit: this.perPage,
        locale: this.$i18n.locale,
        orderBy: this.orderBy,
        offset,
        query: `%${query}%`,
        where,
      }

      this.loading = true

      try {
        const { categories, news, totalRows } =
          await this.$graphql.default.request(SEARCH_NEWS_QUERY, variables)

        this.categories = categories
        this.news = news
        this.totalRows = totalRows?.aggregate?.count ?? 0
      } catch (error) {}

      if (scroll) {
        this.$nextTick(() => {
          this.scrollToTop()
        })
      }

      this.loading = false
    },

    hideFilters() {
      this.filtersVisible = false
    },

    scrollToTop() {
      if (!process.client) return
      const scrollTarget = document.querySelector('.search-results-controls')
      scrollToTarget(scrollTarget)
    },

    setFilter(event) {
      if (!Array.isArray(event)) return

      this.selectedCategories = [...event]
      this.currentPage = 1

      return this.fetchNews()
    },

    setPage(event) {
      this.currentPage = event ?? 1

      return this.fetchNews(true)
    },

    setSort(sort) {
      this.orderBy = sort

      return this.fetchNews()
    },

    showFilters() {
      this.filtersVisible = true
    },
  },
}
</script>
