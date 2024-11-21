<template>
  <main>
    <b-container>
      <AppBreadcrumbs :items="breadcrumbs" />

      <CatalogCategoryDescription
        :category="category"
        :ssr-description="!category.clientOnlyDescription"
        class="mb-48 mb-lg-64"
      />

      <CatalogCategoryChildren
        v-if="hasChildren"
        class="mb-72 mb-lg-96"
        :children="children"
      />

      <CatalogCategoryContent
        v-if="hasProducts"
        :category="category"
        :price="price"
        :price-range="priceRange"
        :price-range-available="priceRangeAvailable"
        :products="products"
        :products-total="productsTotal"
        :properties="properties"
        :show-all-products-title="hasChildren"
        @filters-reset="resetFilters"
        @filters-set="setFilters"
        @page-change="setPage"
        @price-set="setPrice"
      />
    </b-container>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { mindboxViewCatalogCategory } from '@/utils/mindbox'
import { getCartId } from '@/utils/cart'
import { parseFilters, parseFiltersObject } from '@/utils/catalog'
import { scrollToTarget } from '@/utils/window'

import CATEGORY_ONLY_QUERY from '@/graphql/catalog/CatalogCategoryOnly'
import CATEGORY_FILTER_PROPERTIES_QUERY from '@/graphql/catalog/CategoryFilterProperties'
import CATALOG_CATEGORY_QUERY from '@/graphql/catalog/CatalogCategory'
import CATALOG_PRODUCTS_QUERY from '@/graphql/catalog/CatalogCategoryProducts'
import CATALOG_PRODUCTS_AVAILABLE_FILTERS_QUERY from '@/graphql/catalog/CatalogProductsAvailableFilters'
import CATALOG_PRODUCTS_AVAILABLE_PRICE_RANGE_QUERY from '@/graphql/catalog/CatalogProductsAvailablePriceRange'
import CATALOG_BREADCRUMBS_QUERY from '@/graphql/catalog/CatalogBreadcrumbs'
import CATALOG_CART_PRODUCTS_QUERY from '@/graphql/catalog/CatalogCartProducts'

function buildWhereConditions(filters) {
  const whereConditions = []
  if (filters?.length) {
    filters.forEach((filter) => {
      /* Схлопывание одинаковых характеристик по id ищем сразу в обоих свойствах */
      let idCompareObject = {}
      if (filter.key.includes("|")) {
        const idArray = filter.key.split("|")
        idCompareObject = { _in: idArray }
      } else {
        idCompareObject = { _eq: filter.key }
      }
      whereConditions.push({
        product: {
          property_values: {
            property_id: idCompareObject,
            value: {
              _in: filter.selected.map((el) => el.toString()),
            },
          },
        },
      })
    })
  }
  return whereConditions
}

function buildWhereConditionsForAvailableFilters({
  priceRange,
  filter,
  propertyIds,
}) {
  const conditions = []
  if (filter && filter.key && filter.selected) {
    propertyIds = propertyIds.filter((id) => id !== filter.key)
    conditions.push({
      property_values: {
        property_id: { _eq: filter.key },
        value: { _in: filter.selected.map((el) => el.toString()) },
      },
    })
  }
  if (priceRange && priceRange.min && priceRange.max) {
    conditions.push({ price: { _lte: priceRange.max } })
    conditions.push({ price: { _gte: priceRange.min } })
  }
  return { conditions, propertyIds }
}

function buildWhereConditionsForAvailablePriceRange(filters) {
  const conditions = []
  filters?.forEach((filter) => {
    conditions.push({
      property_values: {
        property_id: { _eq: filter.key },
        value: { _in: filter.selected.map((el) => el.toString()) },
      },
    })
  })
  return { conditions }
}

function getRouteParams(route, perPage) {
  const { params, query } = route

  /** Get category slug from route, remove trailing slash */
  const slug = params?.pathMatch?.replace(/\/$/, '')

  /** Get initial pagination & sorting from route query */
  const page = parseInt(query.page) || 1
  const offset = (page - 1) * perPage

  return { offset, slug }
}

export default {
  name: 'PagesCatalogCategory',

  async asyncData({ app, error, redirect, route, store, $graphql }) {
    const isDev = app.context.isDev

    /** Restore category products perPage from cookie */
    let perPage = Number(app.$cookies.get('catalog-category-per-page')) || 24
    /** Since October 24 the minimum value is 24 */
    if (perPage === 18) perPage = 24

    const cartId = await getCartId(app.$cookies)
    const { offset, slug } = getRouteParams(route, perPage)
    const sortBy = store.getters['category/sortBy']
    const sortByProducts = Object.entries(sortBy?.value).map(([key, val]) => {
      const product = { [key]: val }
      return { product }
    })

    /** Get filters from route query */
    const filters = parseFilters(route.query.filters, isDev)
    const whereConditions = buildWhereConditions(filters)
    const locale = app.i18n.locale

    const categoryOnlyVariables = {
      slug,
    }

    const { categoryId } = await $graphql.default.request(
      CATEGORY_ONLY_QUERY,
      categoryOnlyVariables
    )

    if (!categoryId || !categoryId[0]) {
      return error({ statusCode: 404 })
    }

    const filterPropertiesVariables = {
      categoryId: categoryId[0].id,
    }

    const { filterProperties } = await $graphql.default.request(
      CATEGORY_FILTER_PROPERTIES_QUERY,
      filterPropertiesVariables
    )

    const propertiesIds = []

    filterProperties.forEach((property) => {
      propertiesIds.push(property.property_id)
    })

    const variables = {
      limit: perPage,
      locale,
      offset,
      slug,
      propertiesIds,
      sortBy: sortByProducts,
      where: { _and: whereConditions },
    }

    $graphql.default.setHeaders({
      'x-hasura-cart-id': cartId,
    })

    /** Fetch category with products filtered by query filters */
    const { categories } = await $graphql.default.request(
      CATALOG_CATEGORY_QUERY,
      variables
    )
    const category = categories?.[0]
    if (!category) return error({ statusCode: 404 })

    /** Redirect to canonical category if match was found
     ** by redirect_from field
     */
    if (slug !== category.slug) {
      const { query } = route
      // eslint-disable-next-line
      console.log('redirecting to default slug')
      return redirect({ path: `${locale}/catalog/${category.slug}`, query })
    }

    /** There are categories that should be in the database,
     * but are not displayed on the site
     * For this, the old redirect_from field is now used,
     * which is filled in hasura-admin
     * If this field is complete, it will redirect to the specified category. */
    if (category.redirect_from) {
      const { query } = route
      // eslint-disable-next-line
      console.log('redirecting to specified slug')
      return redirect({ path: `/${locale}${category.redirect_from}`, query })
    }

    const hasProducts = Boolean(category.hasProducts?.aggregate?.count)

    const priceRange = {
      min: Math.floor(category.price_min || 0),
      max: Math.ceil(category.price_max || 0),
    }

    const properties =
      category.properties?.filter(({ property }) => Boolean(property)) || []

    let rawProducts = category.products
    let productsTotal = category.productsTotal?.aggregate?.count

    const catalogCartProductsVariables = {
      cartId
    }

    const { cartProducts } = await $graphql.default.request(
      CATALOG_CART_PRODUCTS_QUERY,
      catalogCartProductsVariables
    )

    if (category.filters && hasProducts) {
      /** If returned category has filters field set in admin,
       ** refetch its products filtered by that field.
       */
      const filters = parseFilters(category.filters, app.context.isDev)
      const whereConditions = buildWhereConditions(filters)

      whereConditions.push(
        { product: { price: { _gte: priceRange.min } } },
        { product: { price: { _lte: priceRange.max } } }
      )

      const variables = {
        limit: perPage,
        locale: app.i18n.locale,
        offset,
        slug,
        sortBy: sortByProducts,
        where: { _and: whereConditions },
      }

      $graphql.default.setHeaders({
        'x-hasura-cart-id': cartId,
      })

      const { categories: _categories } = await $graphql.default.request(
        CATALOG_PRODUCTS_QUERY,
        variables
      )

      const _category = _categories[0]

      rawProducts = _category?.products
      productsTotal = _category?.productsTotal?.aggregate?.count
    }

    /** Filter out empty products and set cart products */
    const products = []
      rawProducts.forEach(({ product }) => {
      if (product) {
        product.carts = []
        cartProducts.forEach((cartProduct) => {
          if (cartProduct.product_id === product.id) {
            product.carts.push({ cart_id: cartProduct.cart_id, quantity: cartProduct.quantity })
          }
        })
        products.push(product)
      }
    })

    /** Build breadcrumbs */
    const breadcrumbs = [{ text: 'catalog.title', to: '/catalog' }]
    const response = await $graphql.default.request(CATALOG_BREADCRUMBS_QUERY, {
      category_id: category.id,
      locale: app.i18n.locale,
    })
    response.breadcrumbs?.forEach((item, index) => {
      if (item) {
        breadcrumbs.push({
          active: index >= response.breadcrumbs?.length - 1,
          text: item.name,
          to: `/catalog/${item.slug}`,
          slug: item.slug,
        })
      }
    })

    return {
      breadcrumbs,
      category,
      hasProducts,
      isDev,
      price: priceRange,
      priceRange,
      priceRangeAvailable: priceRange,
      products,
      productsTotal,
      properties,
      scroll: false,
    }
  },

  head() {
    return {
      title: this.category?.meta_title,
      link: this.$route.query.page
        ? [{ rel: 'canonical', href: this.$route.path }]
        : null,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.category?.meta_description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.category?.meta_keywords,
        },
      ],
    }
  },

  computed: {
    ...mapGetters('category', ['sortBy', 'perPage']),

    sortByProducts() {
      const sortByProducts = Object.entries(this.sortBy?.value).map(
        ([key, val]) => {
          const product = { [key]: val }
          return { product }
        }
      )
      return sortByProducts
    },

    children() {
      return this.category?.children ?? []
    },

    hasChildren() {
      return Boolean(this.children?.length)
    },

    localePrefix() {
      return this.$i18n.locale === this.$i18n.defaultLocale
        ? ''
        : `/${this.$i18n.locale}`
    },
  },

  watch: {
    /** Even in async functions, Vue router won't wait for query update,
     ** so we have to trigger refetch from watchers, after query
     ** have ACTUALLY changed.
     */
    async '$route.query.filters'() {
      await this.refetchProducts({
        refetchFilters: true,
        refetchPriceRange: true,
      })
    },

    async '$route.query.page'() {
      await this.refetchProducts({ refetchFilters: true })
    },

    async 'sortBy.key'() {
      await this.refetchProducts()
    },
    async perPage() {
      await this.refetchProducts({ clearPageQuery: true })
    },
  },

  watchQuery: false,

  async mounted() {
    /** Set source-category slug to store for seo-links in header menu */
    const parentCategorySlug = this.breadcrumbs?.[1]?.slug
    this.$store.commit('catalog/SET_CURRENT_CATEGORY_SLUG', parentCategorySlug)

    /** Restore category products view from cookie */
    const savedView = await this.$cookies.get('catalog-category-view')

    /** Run store actions after everything else to prevent content flashing */
    await this.$store.dispatch('category/setViewMode', savedView)
    await this.$store.dispatch('category/setPerPage', this.perPage)

    this.metrikaReachGoals()
    await this.fetchDisabledFilters()
    await this.fetchAvailablePriceRange()
    mindboxViewCatalogCategory(this.category?.id)
  },

  methods: {
    ...mapActions('category', ['setDisabledFilters', 'setLoading']),

    async fetchAvailablePriceRange() {
      const filters = parseFilters(this.$route.query.filters, this.isDev)
      const { slug } = getRouteParams(this.$route)

      let max = this.priceRange?.max
      let min = this.priceRange?.min

      if (filters?.length) {
        const { products_price_range } = await this.$graphql.default.request(
          CATALOG_PRODUCTS_AVAILABLE_PRICE_RANGE_QUERY,
          {
            locale: this.$i18n.locale,
            category_slug: slug,
            ...buildWhereConditionsForAvailablePriceRange(filters),
          }
        )
        max = Math.ceil(
          parseFloat(products_price_range?.aggregate?.max?.price) || 0
        )
        min = Math.floor(
          parseFloat(products_price_range?.aggregate?.min?.price) || 0
        )
      }

      this.priceRangeAvailable = { max, min }
    },

    async fetchDisabledFilters() {
      const filters = parseFilters(this.$route.query.filters, this.isDev)
      const { slug } = getRouteParams(this.$route)

      const disabledFilters = {}

      if (filters?.length >= 0) {
        const propertyIds = this.properties.map(({ property }) => property?.id)

        const availableFilters = {}
        const conditions = [
          { priceRange: this.price, propertyIds },
          ...filters.map((filter) => ({
            filter,
            propertyIds,
          })),
        ]

        try {
          await Promise.all(
            conditions.map(async (condition) => {
              const { product_property_values } =
                await this.$graphql.default.request(
                  CATALOG_PRODUCTS_AVAILABLE_FILTERS_QUERY,
                  {
                    locale: this.$i18n.locale,
                    category_slug: slug,
                    ...buildWhereConditionsForAvailableFilters(condition),
                  }
                )

              const availableFiltersIteration = {}
              product_property_values.forEach(({ property_id, value }) => {
                if (value) {
                  if (availableFiltersIteration[property_id]) {
                    availableFiltersIteration[property_id].values.add(value)
                  } else {
                    availableFiltersIteration[property_id] = {
                      property_id,
                      values: new Set([value]),
                    }
                  }
                }
              })

              Object.values(availableFiltersIteration).forEach(
                ({ property_id, values }) => {
                  if (availableFilters[property_id]) {
                    availableFilters[property_id].valueSets.push(values)
                    availableFilters[property_id].values = availableFilters[
                      property_id
                    ].values.filter((v) => values.has(v))
                  } else {
                    availableFilters[property_id] = {
                      valueSets: [values],
                      values: [...values],
                    }
                  }
                }
              )
            })
          )
        } catch (e) {}

        this.properties.forEach(({ property, property_values }) => {
          const propId = property?.id
          property_values.forEach(({ value }) => {
            if (disabledFilters[propId]) {
              disabledFilters[propId][value] =
                availableFilters[propId] &&
                !availableFilters[propId]?.values.includes(value)
            } else {
              disabledFilters[propId] = {
                [value]:
                  availableFilters[propId] &&
                  !availableFilters[propId]?.values.includes(value),
              }
            }
          })
        })
      }

      await this.setDisabledFilters(disabledFilters)
    },

    async refetchProducts({
      refetchFilters = false,
      refetchPriceRange = false,
      clearPageQuery = false,
    } = {}) {
      if (clearPageQuery)
        this.$router.push({ query: { ...this.$route.query, page: 1 } })
      const cartId = await getCartId(this.$cookies)
      const { offset, slug } = getRouteParams(this.$route, this.perPage)

      const sortBy = this.sortByProducts

      const filters = parseFilters(this.$route.query.filters, this.isDev)
      const whereConditions = buildWhereConditions(filters)

      if (this.price?.min) {
        whereConditions.push({
          product: { price: { _gte: this.price.min } },
        })
      }
      if (this.price?.max) {
        whereConditions.push({
          product: { price: { _lte: this.price.max } },
        })
      }

      const variables = {
        limit: this.perPage,
        locale: this.$i18n.locale,
        offset,
        slug,
        sortBy,
        where: { _and: whereConditions },
      }

      this.$graphql.default.setHeaders({
        'x-hasura-cart-id': cartId,
      })

      this.setLoading(true)

      const { categories } = await this.$graphql.default.request(
        CATALOG_PRODUCTS_QUERY,
        variables
      )
      const category = categories?.[0] ?? {}

      const catalogCartProductsVariables = {
        cartId
      }

      const { cartProducts } = await this.$graphql.default.request(
        CATALOG_CART_PRODUCTS_QUERY,
        catalogCartProductsVariables
      )

      /** Filter out empty products */
      const products = []
      category.products?.forEach(({ product }) => {
        if (product) {
          product.carts = []
          cartProducts.forEach((cartProduct) => {
            if (cartProduct.product_id === product.id) {
              product.carts.push({ cart_id: cartProduct.cart_id, quantity: cartProduct.quantity })
            }
          })
          products.push(product)
        }
      })

      this.products = products
      this.productsTotal = category.productsTotal?.aggregate?.count

      if (refetchFilters) {
        await this.fetchDisabledFilters()
      }
      if (refetchPriceRange) {
        await this.fetchAvailablePriceRange()
      }

      this.setLoading(false)

      if (this.scroll) {
        this.$nextTick(() => {
          this.scrollToTop()
          this.scroll = false
        })
      }
    },

    metrikaReachGoals() {
      this.$ym('reachGoal', 'category_view', {
        category: 'catalog',
      })
      this.$ym('reachGoal', 'category_view_w_products', {
        category_p: 'catalog',
      })
      if (!this.breadcrumbs?.length) return
      this.breadcrumbs.forEach(({ slug }) => {
        if (!slug) return
        this.$ym('reachGoal', 'category_view', {
          category: slug,
        })
        this.$ym('reachGoal', 'category_view_w_products', {
          category_p: slug,
        })
      })
    },

    async resetFilters() {
      const query = { ...this.$route.query }

      this.scroll = true

      if (!query.filters && !query.page) {
        return await this.refetchProducts({ refetchFilters: true })
      } else {
        delete query.filters
        delete query.page
        return this.$router.push({ query })
      }
    },

    scrollToTop() {
      if (!process.client) return
      const scrollTarget = document.querySelector('.catalog-category-controls')
      scrollToTarget(scrollTarget)
    },

    setFilters(event) {
      if (!event) return

      const { property_id, value } = event
      const query = { ...this.$route.query }

      /** Reset current page on filter change */
      if (query?.page) delete query.page

      const filters = parseFiltersObject(query.filters)
      if (value?.length) {
        filters[property_id] = value
      } else if (filters[property_id]) {
        delete filters[property_id]
      }

      if (Object.keys(filters)?.length) {
        query.filters = JSON.stringify(filters)
      } else {
        delete query.filters
      }

      return this.$router.push({ query })
    },

    setPage(event) {
      const query = { ...this.$route.query }

      if (event > 1) query.page = event
      else delete query.page

      this.scroll = true
      return this.$router.push({ query })
    },

    async setPrice({ max, min }) {
      this.price = { max, min }

      /** Reset current page on price change */
      const query = { ...this.$route.query }

      if (query.page) {
        delete query.page
        return this.$router.push({ query })
      } else {
        return await this.refetchProducts({ refetchFilters: true })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(md) {
  main {
    overflow: hidden;
  }
}
</style>
