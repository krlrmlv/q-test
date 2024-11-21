<template>
  <main>
    <b-container>
      <AppBreadcrumbs :items="breadcrumbs" />

      <h2 class="mb-32">{{ $t('compare.title') }}</h2>
    </b-container>

    <transition name="fade" mode="out-in">
      <div v-if="hasProducts">
        <b-container>
          <CompareCategories
            :categories="categories"
            :loading="loading"
            :selected-category="selectedCategory"
            class="mb-16"
            @input="selectedCategory = $event"
          />
        </b-container>

        <CompareProductList
          :controls-disabled="controlsDisabled"
          :products="filteredProducts"
          :show-different="showDifferent"
          @delete-product="deleteCompareProduct"
          @set-show-different="showDifferent = $event"
        />

        <b-container class="pt-48 pb-64">
          <b-row>
            <b-col cols="12" sm="auto">
              <b-button
                variant="outline-primary"
                block
                @click="clearCompareList"
              >
                {{ $t('compare.clear') }}
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>

      <b-container v-else>
        <p class="text-muted mb-64">{{ $t('compare.empty') }}</p>
      </b-container>
    </transition>
  </main>
</template>

<script>
import sortBy from 'lodash/sortBy'
import { mapActions, mapGetters } from 'vuex'

import { getCartId } from '@/utils/cart'
import sendToMindbox from '@/utils/mindbox'

import COMPARE_CATEGORIES_QUERY from '@/graphql/compare/CompareCategories'
import COMPARE_PRODUCTS_QUERY from '@/graphql/compare/CompareProducts'

async function fetchProducts({ client, cookies, locale, signal, store }) {
  const ids = store.getters['compare/compareProducts']
  const cartId = await getCartId(cookies)

  client.setHeaders({ 'x-hasura-cart-id': cartId })

  /* Fetch products by ids */
  const { categories, products } = await client.request({
    document: COMPARE_PRODUCTS_QUERY,
    variables: { cartId, ids, locale },
    signal,
  })

  /* Copy price & status to property values */
  products?.forEach((product) => {
    product.property_values.unshift(
      {
        property: { id: 'price', name: 'global.price' },
        value: `${product.price} ₽`,
      },
      {
        property: { id: 'status', name: 'catalog.status' },
        value: product.status,
      }
    )
  })

  /* Sort fetched products as they were saved to cookie */
  const sortedProducts = sortBy(products, ({ id }) => ids?.indexOf(id))

  return { categories, products: sortedProducts }
}

export default {
  name: 'PagesCompare',

  async asyncData({ app, store, $graphql }) {
    /* Restore compare products list from cookie */
    store.dispatch('compare/restoreCompareList')

    /* Fetch compare products & categories */
    const { categories, products } = await fetchProducts({
      client: $graphql.default,
      cookies: app.$cookies,
      locale: app.i18n.locale,
      store,
    })

    return { categories, products }
  },

  data() {
    return {
      abortController: null,
      breadcrumbs: [{ text: this.$t('compare.title'), active: true }],
      loading: false,
      selectedCategory: null,
      showDifferent: true,
    }
  },

  computed: {
    ...mapGetters('compare', ['compareProducts']),

    controlsDisabled() {
      return this.filteredProducts?.length < 2
    },

    filteredProducts() {
      return this.selectedCategory
        ? this.products.filter(({ categories }) =>
            categories
              ?.map(({ category: { id } }) => id)
              .includes(this.selectedCategory)
          )
        : this.products
    },

    hasProducts() {
      return Boolean(this.products?.length)
    },
  },

  watch: {
    compareProducts() {
      this.handleCompareProductsChange()
    },
  },

  mounted() {
    sendToMindbox('EKFGroupCompareVisits')
  },

  methods: {
    ...mapActions('compare', ['updateCompareProducts']),

    async fetchCategories() {
      this.$graphql.setHeaders({ 'x-hasura-cart-id': await getCartId(this.$cookies) })

      return await this.$graphql.default.request({
        document: COMPARE_CATEGORIES_QUERY,
        variables: {
          ids: this.compareProducts,
          locale: this.$i18n.locale,
        },
        signal: this.abortController?.signal,
      })
    },

    async handleCompareProductsChange() {
      /* Abort unfinished requests */
      if (typeof this.abortController?.abort === 'function') {
        this.abortController.abort()
      }

      /* Initialize abort controller if supported by browser */
      if (process.client && 'AbortController' in window) {
        this.abortController = new AbortController()
      }

      this.loading = true

      try {
        const [{ products }, { categories }] = await Promise.all([
          fetchProducts({
            client: this.$graphql.default,
            cookies: this.$cookies,
            locale: this.$i18n.locale,
            signal: this.abortController?.signal,
            store: this.$store,
          }),
          this.fetchCategories(),
        ])

        this.products = products
        this.categories = categories
      } catch (error) {
        /* Skip abort errors (shoud have { name: 'AbortError' }) */
      }

      this.loading = false
    },

    async refetchCategories() {
      this.loading = true

      try {
        const { categories } = await this.fetchCategories()
        this.categories = categories
      } catch (error) {}

      this.loading = false
    },

    clearCompareList() {
      this.updateCompareProducts({ products: [], updateCookie: true })
      this.products = []
      window.scrollTo({ top: 0 })
    },

    deleteCompareProduct(id) {
      const index = this.products.findIndex((product) => product.id === id)

      if (this.products?.length === 1) window.scrollTo({ top: 0 })

      if (index >= 0) {
        this.products.splice(index, 1)
        const products = this.products.map(({ id }) => id)
        this.updateCompareProducts({ products, updateCookie: true })

        return this.refetchCategories()
      }
    },
  },
}
</script>
