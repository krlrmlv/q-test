<template>
  <main>
    <b-container v-show="!resultsEmpty" class="pt-32">
      <p :class="{ 'text-muted': loading }" class="mb-lg-32 search-query">
        {{ $t('searchResults.results') }}
        <span class="h5 mb-0" v-text="query" />
        <b-spinner v-if="loading" class="ml-8" small />
      </p>

      <SearchResultsCatalogLinks
        v-if="downloadCatalogLink"
        :catalog-link="downloadCatalogLink"
        class="mb-32"
      />

      <ComboTabs
        v-model="tabIndex"
        :tabs="visibleTabTitles"
        content-class="pt-32 pt-lg-64"
        justified
        scrollable
      >
        <template v-for="(tab, index) in visibleTabs" #[`tab(${index})`]>
          <component
            :is="`search-results-${tab}`"
            :key="`tab-${index}`"
            :categories="filteredCategories"
            :loading="loading"
            :price="price"
            :price-range="priceRange"
            :price-range-available="priceRangeAvailable"
            :products="products"
            :selected-categories="selectedCategories"
            :total-rows="totalRows"
            :analogs="analogs"
            :analogs-price="analogsPrice"
            :analogs-price-range="analogsPriceRange"
            :open="tabIndex === index"
            :analogs-price-range-available="analogsPriceRangeAvailable"
            :analogs-categories="filteredAnalogsCategories"
            :analogs-selected-categories="analogsSelectedCategories"
            :analogs-total-rows="analogsTotalRows"
            @analogs-page-change="setAnalogsPage"
            @analogs-price-set="setAnalogsPrice"
            @analogs-filters-set="setAnalogsFilters"
            @analogs-filters-reset="resetAnalogsFilters"
            @filters-set="setFilters"
            @filters-reset="resetFilters"
            @page-change="setPage"
            @price-set="setPrice"
            @show-analogs="showAnalogs"
          />
        </template>
      </ComboTabs>
    </b-container>

    <LazySearchResultsEmpty
      v-if="resultsEmpty"
      :analogs="Boolean($route.query.showAnalogs)"
    />
  </main>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import uniqBy from 'lodash/uniqBy'
import { mapActions, mapGetters } from 'vuex'
import { getCartId } from '@/utils/cart'
import { trimUrl } from '@/utils/trim-url'
import { scrollToTarget } from '@/utils/window'
import { OUT_OF_PRODUCTION_STATUSES } from '~/components/constants/product'

import SEARCH_CATALOG_QUERY from '@/graphql/search/SearchCatalog'
import SEARCH_ANALOGS_QUERY from '@/graphql/search/SearchAnalogs'

function buildVariables({ locale, route, store }) {
  const { query } = route

  const currentPage = parseInt(query.page) || 1
  const perPage = parseInt(query.perPage) || 18
  const offset = (currentPage - 1) * perPage
  const q = query.q?.toString()?.trim() ?? ''

  const likeQuery = `%${q}%`
  const page_url = `${trimUrl(process.env.SITE_URL)}${route.fullPath}`

  const user_ip = store.getters?.clientIp

  return {
    likeQuery,
    limit: perPage,
    locale,
    offset,
    page_url,
    q,
    user_ip,
    where: { language: { code: { _eq: locale } }, show_by_link: { _eq: true } },
  }
}

function buildAnalogsVariables({ locale, route }) {
  const { query } = route

  const currentPage = parseInt(query.analogsPage) || 1
  const perPage = parseInt(query.perPage) || 18
  const offset = (currentPage - 1) * perPage
  const q = query.q?.toString()?.trim() ?? ''

  return {
    limit: perPage,
    offset,
    q,
    where: {
      language: { code: { _eq: locale } },
      price: { _gt: 0 },
      status: { _nin: OUT_OF_PRODUCTION_STATUSES },
      vendor_code: { _neq: q },
    },
  }
}

function checkProductInStock(products) {
  const stockOwnTotal = Number(
    products?.stocks_aggregate?.aggregate?.sum?.quantity || 0
  )
  return Boolean(stockOwnTotal)
}

function checkShouldSearchAnalogs(products) {
  if (!products?.length) return true
  if (OUT_OF_PRODUCTION_STATUSES.includes(products[0]?.status)) return true
  if (products?.length === 1 && !checkProductInStock(products[0])) return true
  return false
}

export default {
  name: 'PageSearchIndex',

  components: { BSpinner },

  async asyncData({ app, route, store, $graphql }) {
    const locale = app.i18n.locale

    const cartId = await getCartId(app.$cookies)
    const variables = buildVariables({ locale, route, store })

    $graphql.default.setHeaders({
      'x-hasura-cart-id': cartId,
    })

    const { products, totalDocumentation, totalNews, totalRows } =
      await $graphql.default.request(SEARCH_CATALOG_QUERY, {
        cartId,
        ...variables,
      })

    const max = Number(totalRows?.aggregate?.max?.price) ?? null
    const min = Number(totalRows?.aggregate?.min?.price) ?? null
    const categories = totalRows?.nodes

    let analogs, analogsTotalRows, analogsMax, analogsMin, analogsCategories

    const shouldSearchAnalogs = checkShouldSearchAnalogs(products)
    if (shouldSearchAnalogs) {
      const analogsVariables = buildAnalogsVariables({ locale, route })

      ;({ analogs, analogsTotalRows } = await $graphql.default.request(
        SEARCH_ANALOGS_QUERY,
        { cartId, ...analogsVariables }
      ))

      analogsMax = Number(analogsTotalRows?.aggregate?.max?.price) ?? null
      analogsMin = Number(analogsTotalRows?.aggregate?.min?.price) ?? null
      analogsCategories = analogsTotalRows?.nodes
    }

    /** Restore category products view from cookie */
    const savedView = app.$cookies.get('catalog-category-view')

    /** Run store actions after everything else to prevent content flashing */
    await store.dispatch('category/setViewMode', savedView)

    return {
      abortController: null,
      analogs,
      analogsCategories,
      analogsPrice: { max: analogsMax, min: analogsMin },
      analogsPriceRange: { max: analogsMax, min: analogsMin },
      analogsTotalRows: analogsTotalRows?.aggregate.count,
      analogsSelectedCategories: [],
      categories,
      price: { max, min },
      priceRange: { max, min },
      products,
      scroll: false,
      selectedCategories: [],
      shouldSearchAnalogs,
      tabIndex: 0,
      totalResults: {
        documentation: totalDocumentation?.aggregate?.count,
        news: totalNews?.aggregate?.count,
        products: totalRows?.aggregate?.count,
      },
      totalRows: totalRows?.aggregate?.count,
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
      link: this.$route.query.page
        ? [{ rel: 'canonical', href: this.$route.path }]
        : null,
    }
  },

  computed: {
    ...mapGetters(['settingByKey']),
    ...mapGetters('category', ['loading', 'sortBy', 'sortByKey']),

    downloadCatalogLink() {
      const baseUrl = trimUrl(process.env.REST_API_URL)

      if (this.query?.toLowerCase()?.includes('каталог')) {
        return `${baseUrl}${this.settingByKey('master_catalog')}`
      }

      return false
    },

    filteredAnalogsCategories() {
      const categories = this.analogsCategories
        ?.filter(({ categories }) => categories.length)
        .map(({ categories }) => ({
          value: categories[0]?.category?.id,
          text: categories[0]?.category?.name,
        }))

      return uniqBy(categories, (category) => category?.value)
    },

    filteredCategories() {
      const categories = this.categories
        ?.filter(({ categories }) => categories.length)
        .map(({ categories }) => ({
          value: categories[0]?.category?.id,
          text: categories[0]?.category?.name,
        }))

      return uniqBy(categories, (category) => category?.value)
    },

    hasDocumentation() {
      return Boolean(this.totalResults?.documentation)
    },

    hasNews() {
      return Boolean(this.totalResults?.news)
    },

    hasProducts() {
      return Boolean(this.totalResults?.products)
    },

    hasAnalogs() {
      return Boolean(this.analogsTotalRows)
    },

    isOutOfProduction() {
      return this.products.some((product) =>
        OUT_OF_PRODUCTION_STATUSES.includes(product.status)
      )
    },

    openAnalogsTab() {
      /** Open analogs tab if search result has analogs and
       * 1. products array hasn't out of production products
       * or
       * 2. redirected from EKF Product Page that is out of production */
      return Boolean(
        this.hasAnalogs &&
          (!this.isOutOfProduction || this.$route.query.showAnalogs)
      )
    },
    indexOfAnalogsTab() {
      /** if there is a search by competitor's article, then the products tab will be empty
       * and only the analog tab will be displayed on the screen */
      const index = this.visibleTabs.indexOf('analogs')
      return index !== -1 ? index : 0
    },
    priceRangeAvailable() {
      return this.priceRange ? { ...this.priceRange } : {}
    },
    analogsPriceRangeAvailable() {
      return this.analogsPriceRange ? { ...this.analogsPriceRange } : {}
    },

    query() {
      return this.$route.query.q
    },

    resultsEmpty() {
      /** if query.showAnalogs is in the request,
       * then the display is based on
       * the presence of analogues */
      if (this.$route.query.showAnalogs)
        return !this.$fetchState?.pending && !this.loading && !this.hasAnalogs

      const totalResultsCount = Object.values(this.totalResults ?? {})?.reduce(
        (total, value) => (total += Number(value)),
        0
      )

      return (
        !this.$fetchState?.pending &&
        !this.loading &&
        !totalResultsCount &&
        !this.hasAnalogs
      )
    },

    visibleTabs() {
      const tabs = []
      if (this.hasProducts) tabs.push('products')
      if (this.hasAnalogs) tabs.push('analogs')
      if (this.hasNews) tabs.push('news')
      if (this.hasDocumentation) tabs.push('documentation')
      return tabs
    },

    visibleTabTitles() {
      return this.visibleTabs.map((tab) => this.$t(`searchResults.${tab}`))
    },
  },

  watch: {
    '$route.query.page'() {
      this.refetchProducts()
    },

    '$route.query.analogsPage'() {
      this.refetchAnalogs()
    },

    '$route.query.q'() {
      this.price = { max: null, min: null }
      this.analogsPrice = { max: null, min: null }
      this.refetchProductsAndAnalogs()
    },

    priceRange: {
      deep: true,
      handler(value) {
        if (!isNaN(value.min)) this.price.min = value.min
        if (!isNaN(value.max)) this.price.max = value.max
      },
    },

    analogsPriceRange: {
      deep: true,
      handler(value) {
        if (!isNaN(value.min)) this.analogsPrice.min = value.min
        if (!isNaN(value.max)) this.analogsPrice.max = value.max
      },
    },

    sortByKey() {
      this.refetchProducts()
      if (this.shouldSearchAnalogs) this.refetchAnalogs()
    },
  },

  mounted() {
    if (this.shouldSearchAnalogs) this.analyticsEvents(this.products)
    if (this.openAnalogsTab) {
      this.tabIndex = this.indexOfAnalogsTab ?? 0
    }
  },

  methods: {
    ...mapActions('category', ['setLoading']),

    analyticsEvents(products) {
      if (!products?.length) return

      products.forEach((product) => {
        this.$ym('reachGoal', 'out-of-stock-product-search', {
          'out-of-stock-product-search-slug': product?.slug,
        })
      })
    },

    async refetchProducts(newQuery = false, updatePriceRange = false) {
      if (typeof this.abortController?.abort === 'function') {
        this.abortController.abort()
      }

      const cartId = await getCartId(this.$cookies)
      const locale = this.$i18n.locale
      const variables = buildVariables({
        locale,
        route: this.$route,
        store: this.$store,
      })

      /* Ignore filters if new search query is set */
      if (!newQuery) {
        const whereConditions = [
          { language: { code: { _eq: this.$i18n.locale } } },
        ]

        /* Filter by category */
        if (this.selectedCategories?.length) {
          whereConditions.push({
            categories: { category: { id: { _in: this.selectedCategories } } },
          })
        }

        /* Filter by price */
        if (this.price?.min && this.price?.max) {
          whereConditions.push({
            _and: [
              { price: { _gte: this.price.min } },
              { price: { _lte: this.price.max } },
            ],
          })
        }

        if (whereConditions?.length) {
          variables.where = { _and: whereConditions }
        }
      }

      /* Set sort order */
      if (this.sortBy?.value) {
        variables.sortBy = this.sortBy.value
      }

      this.setLoading(true)

      try {
        if (process.client && 'AbortController' in window) {
          this.abortController = new AbortController()
        }

        this.$graphql.default.setHeaders({
          'x-hasura-cart-id': cartId,
        })

        const { products, totalDocumentation, totalNews, totalRows } =
          await this.$graphql.default.request({
            document: SEARCH_CATALOG_QUERY,
            variables: { cartId, ...variables },
            signal: this.abortController?.signal,
          })

        this.products = products

        this.shouldSearchAnalogs = checkShouldSearchAnalogs(products)

        this.totalRows = totalRows?.aggregate?.count

        const max = Number(totalRows?.aggregate?.max?.price) ?? null
        const min = Number(totalRows?.aggregate?.min?.price) ?? null

        if (max) {
          if (!this.price?.max || max < this.price?.max) {
            this.price.max = max
          }
          if (updatePriceRange) {
            this.priceRange.max = max
          }
        }

        if (min) {
          if (!this.price?.min || min > this.price?.min) {
            this.price.min = min
          }
          if (updatePriceRange) {
            this.priceRange.min = min
          }
        }
        if (newQuery) {
          this.categories = totalRows?.nodes
          /* Update aggregation data if search query changed */
          this.totalResults = {
            documentation: totalDocumentation?.aggregate?.count,
            news: totalNews?.aggregate?.count,
            products: totalRows?.aggregate?.count,
          }
          this.totalRows = totalRows?.aggregate?.count
        }

        if (this.scroll) {
          this.$nextTick(() => {
            this.scrollToTop()
            this.scroll = false
          })
        }
      } catch (error) {}

      this.setLoading(false)
    },

    async refetchAnalogs(newQuery = false, updateAnalogsPriceRange = false) {
      if (typeof this.abortController?.abort === 'function') {
        this.abortController.abort()
      }

      const cartId = await getCartId(this.$cookies)
      const locale = this.$i18n.locale
      const analogsVariables = buildAnalogsVariables({
        locale,
        route: this.$route,
      })

      /* Ignore filters if new search query is set */
      if (!newQuery) {
        const whereConditions = [
          { language: { code: { _eq: this.$i18n.locale } } },
        ]

        /* Filter by category */
        if (this.analogsSelectedCategories?.length) {
          whereConditions.push({
            categories: {
              category: { id: { _in: this.analogsSelectedCategories } },
            },
          })
        }

        /* Filter by price */
        if (this.analogsPrice?.min && this.analogsPrice?.max) {
          whereConditions.push({
            _and: [
              { price: { _gte: this.analogsPrice?.min } },
              { price: { _lte: this.analogsPrice?.max } },
            ],
          })
        }

        if (whereConditions?.length) {
          analogsVariables.where = { _and: whereConditions }
        }
      }

      /* Set sort order */
      if (this.sortBy?.value) {
        analogsVariables.sortBy = this.sortBy.value
      }

      this.setLoading(true)

      try {
        if (process.client && 'AbortController' in window) {
          this.abortController = new AbortController()
        }

        this.$graphql.default.setHeaders({
          'x-hasura-cart-id': cartId,
        })

        const { analogs, analogsTotalRows } =
          await this.$graphql.default.request({
            document: SEARCH_ANALOGS_QUERY,
            variables: { cartId, ...analogsVariables },
            signal: this.abortController?.signal,
          })

        this.analogs = analogs
        this.analogsCategories = analogsTotalRows?.nodes
        this.analogsTotalRows = analogsTotalRows?.aggregate.count

        const analogsMax =
          Number(analogsTotalRows?.aggregate?.max?.price) ?? null
        const analogsMin =
          Number(analogsTotalRows?.aggregate?.min?.price) ?? null

        if (analogsMax) {
          if (!this.analogsPrice?.max || analogsMax < this.analogsPrice?.max) {
            this.analogsPrice.max = analogsMax
          }
          if (updateAnalogsPriceRange) {
            this.analogsPriceRange.max = analogsMax
          }
        }

        if (analogsMin) {
          if (!this.analogsPrice?.min || analogsMin > this.analogsPrice?.min) {
            this.analogsPrice.min = analogsMin
          }
          if (updateAnalogsPriceRange) {
            this.analogsPriceRange.min = analogsMin
          }
        }

        if (newQuery) {
          /* Update aggregation data if search query changed */
          this.analogsTotalRows = analogsTotalRows?.aggregate?.count
        }

        if (this.scroll) {
          this.$nextTick(() => {
            this.scrollToTop()
            this.scroll = false
          })
        }
      } catch (error) {}
      this.setLoading(false)
    },

    async refetchProductsAndAnalogs() {
      await this.refetchProducts(true, true)
      if (this.shouldSearchAnalogs) this.refetchAnalogs(true, true)
      else this.resetAnalogs()
    },

    resetAnalogs() {
      this.analogs = undefined
      this.analogsCategories = undefined
      this.analogsPrice = undefined
      this.analogsPriceRange = { max: undefined, min: undefined }
      this.analogsTotalRows = undefined
      this.analogsSelectedCategories = undefined
    },

    resetFilters() {
      const query = { ...this.$route.query }

      this.scroll = true
      this.selectedCategories = []
      this.price = { max: null, min: null }

      if (!query.filters && !query.page) {
        return this.refetchProducts()
      } else {
        delete query.page
        return this.$router.push({ query })
      }
    },
    resetAnalogsFilters() {
      const query = { ...this.$route.query }

      this.scroll = true
      this.analogsSelectedCategories = []
      this.analogsPrice = { max: null, min: null }

      if (!query.filters && !query.analogsPage) {
        return this.refetchAnalogs()
      } else {
        delete query.analogsPage
        return this.$router.push({ query })
      }
    },

    scrollToTop() {
      if (!process.client) return
      const scrollTarget = document.querySelector('.search-query')
      scrollToTarget(scrollTarget)
    },

    setFilters(event) {
      if (!Array.isArray(event)) return

      this.selectedCategories = [...event]
      this.scroll = true

      const query = { ...this.$route.query }

      if (!query.page) {
        return this.refetchProducts()
      } else {
        delete query.page
        return this.$router.push({ query })
      }
    },
    setAnalogsFilters(event) {
      if (!Array.isArray(event)) return
      this.analogsSelectedCategories = [...event]
      this.scroll = true

      const query = { ...this.$route.query }
      if (!query.analogsPage) {
        return this.refetchAnalogs()
      } else {
        delete query.analogsPage
        return this.$router.push({ query })
      }
    },

    setPage(event) {
      const query = { ...this.$route.query }

      if (event > 1) query.page = event
      else delete query.page

      this.scroll = true
      return this.$router.push({ query })
    },
    setAnalogsPage(event) {
      const query = { ...this.$route.query }
      if (event > 1) query.analogsPage = event
      else delete query.analogsPage

      this.scroll = true
      return this.$router.push({ query })
    },

    setPrice(price) {
      const { max, min } = price ?? this.priceRange
      this.price = { max, min }
      /** Reset current page on price change */
      const query = { ...this.$route.query }

      if (query.page) {
        delete query.page
        return this.$router.push({ query })
      } else {
        return this.refetchProducts()
      }
    },
    setAnalogsPrice(price) {
      const { max, min } = price ?? this.analogsPriceRange
      this.analogsPrice = { max, min }
      /** Reset current page on price change */
      const query = { ...this.$route.query }

      if (query.analogsPage) {
        delete query.analogsPage
        return this.$router.push({ query })
      } else {
        return this.refetchAnalogs()
      }
    },

    showAnalogs() {
      this.$ym('reachGoal', 'analogues-search-2')

      if (!this.hasAnalogs) {
        this.$ym('reachGoal', 'no-analogue-found')

        this.$bvToast.toast(this.$t('catalog.noAnalogsMessage'), {
          title: this.$t('catalog.noAnalogsTitle'),
          toaster: 'b-toaster-bottom-right',
          variant: 'danger',
          autoHideDelay: 3000,
        })
      } else {
        this.tabIndex = this.indexOfAnalogsTab
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.switch-layout {
  &:hover {
    .hover-underline {
      text-decoration: underline;
    }
  }
}

::v-deep {
  .search-results-content {
    position: relative;
    min-height: 2rem;
    transition: $transition-base;
    transition-property: opacity;

    &.loading {
      opacity: 0.5;
    }

    .spinner-loading {
      position: absolute;
      top: 0;
      left: $grid-gutter-width * 0.5;
      width: 1.5rem;
      height: 1.5rem;
      border-width: $border-width * 2;
      z-index: 1;
    }
  }
}

@include media-breakpoint-down(md) {
  ::v-deep {
    .search-results-content {
      .spinner-loading {
        width: 1rem;
        height: 1rem;
      }
    }

    .catalog-controls-sort {
      .dropdown-toggle {
        padding: 0;
        font-size: $font-size-base;
        border: none;
        color: $secondary;
        background-color: transparent;

        &:focus,
        &.focus,
        &:not(:disabled):not(.disabled):hover,
        &:not(:disabled):not(.disabled):active,
        &:not(:disabled):not(.disabled).active {
          background-color: transparent;
          box-shadow: none;
        }
      }

      &.show {
        & > .dropdown-toggle {
          color: $secondary;
          background-color: transparent;
        }
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "pageTitle": "Search results — EKF"
  },
  "ru": {
    "pageTitle": "Результаты поиска — EKF"
  }
}
</i18n>
