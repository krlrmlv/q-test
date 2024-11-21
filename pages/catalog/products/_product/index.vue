<template>
  <main>
    <b-container>
      <AppBreadcrumbs :items="breadcrumbs" />

      <CatalogProductDescription
        :product="product"
        :is-mounted="true"
        class="mb-24 mb-lg-64"
        @tab-activate="handleTabActivate($event, true)"
      />

      <CatalogProductTabs
        ref="tabs"
        :product="product"
        :product-solutions="productSolutions"
        :active-tab="activeTab"
        :ssr-description="ssrProductDescription"
        class="mb-lg-32"
        @tab-activate="handleTabActivate"
        @tab-clear="handleTabActivate(null)"
      />
      <CatalogProductFeedbackHint class="d-block d-md-none mb-64" />
    </b-container>

    <div v-if="loadingAvailableSections">
      <b-spinner label="Spinning" />
    </div>

    <div v-else>
      <CatalogProductSuggestions
        v-for="(section, index) in availableSections"
        :key="section.title"
        :anchor-id="section.anchorId"
        :items="section.products"
        :title="section.title"
        :swiper-class="section.swiperClass"
        :class="[index % 2 ? '' : 'bg-light']"
      />
    </div>

    <ComparePopup />
  </main>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import { mindboxViewCatalogProduct } from '@/utils/mindbox'
import { getCartId } from '@/utils/cart'
import { scrollToTarget } from '@/utils/window'
import {
  ANALOG_TYPES,
  ANALOGS_FUNCTIONAL_TYPES,
  CUSTOM_STATUSES,
  OUT_OF_PRODUCTION_STATUSES,
  REGULAR_STATUSES,
  SWIPER_WITH_REPLACMENT_ANALOG_CLASS,
} from '~/components/constants/product'

import CATALOG_PRODUCT_QUERY from '@/graphql/catalog/CatalogProduct'
import CATALOG_BREADCRUMBS_QUERY from '@/graphql/catalog/CatalogBreadcrumbs'
import CATALOG_CART_PRODUCTS_QUERY from '@/graphql/catalog/CatalogCartProducts'

const buildAnalogsCondition = () => {
  return {
    additionalAnalogsWhere: {
      analog: {},
      analog_type: { _eq: ANALOG_TYPES.additionalProduct },
      functional_type: { _is_null: true },
    },

    ekfAnalogsWhere: {
      analog: {},
      analog_type: { _eq: ANALOG_TYPES.ekfAnalog },
      functional_type: {
        _is_null: false,
        _neq: ANALOGS_FUNCTIONAL_TYPES.replacement,
      },
    },

    relatedAnalogsWhere: {
      analog: {},
      analog_type: { _eq: ANALOG_TYPES.relatedProduct },
      functional_type: { _is_null: true },
    },

    replacementEkfAnalogWhere: {
      analog: {},
      analog_type: { _eq: ANALOG_TYPES.ekfAnalog },
      functional_type: { _eq: ANALOGS_FUNCTIONAL_TYPES.replacement },
    },
  }
}

export default {
  components: {
    BSpinner,
  },

  async asyncData({ app, error, $graphql, params, query, redirect, store }) {
    const isMounted = false
    let breadcrumbItems
    const locale = app.i18n.locale

    /** Used for suggestion sections products(analogs) */
    const analogsCondition = buildAnalogsCondition()
    const cartId = await getCartId(app.$cookies)

    const variables = {
      cartId,
      locale,
      slug: params.product,
      ...analogsCondition,
    }

    $graphql.default.setHeaders({
      'x-hasura-cart-id': cartId,
    })

    const catalogCartProductsVariables = {
      cartId
    }

    const { cartProducts } = await $graphql.default.request(
      CATALOG_CART_PRODUCTS_QUERY,
      catalogCartProductsVariables
    )

    const productData = await $graphql.default.request(
      CATALOG_PRODUCT_QUERY,
      variables
    )

    const [product] = productData.product
    if (!product) return error({ statusCode: 404 })

    if (params.product !== product.slug) {
      return redirect(302, `/catalog/products/${product.slug}`, query)
    }

    if (product && product.categories && product.categories[0]) {
      product.category = product.categories[0]
      const breadcrumbsData = await $graphql.default.request(
        CATALOG_BREADCRUMBS_QUERY,
        {
          category_id: product.category.category_id,
          locale: app.i18n.locale,
        }
      )

      breadcrumbItems = breadcrumbsData.breadcrumbs
    }

    product.carts = []
    cartProducts.forEach((cartProduct) => {
      if (cartProduct.product_id === product.id) {
        product.carts.push({ cart_id: cartId, quantity: cartProduct.quantity })
      }
    })

    /** The replacement analog should not be displayed
     * for products with the status regular and custom */
    if ([...REGULAR_STATUSES, ...CUSTOM_STATUSES]?.includes(product?.status)) {
      product.replacementEkfAnalog = []
    }

    /** Set source-category slug to store for seo-links in header menu */
    const parentCategorySlug = breadcrumbItems?.[0]?.slug
    store.commit('catalog/SET_CURRENT_CATEGORY_SLUG', parentCategorySlug)

    /** Do not index the category description if:
      1. it is taken from the category
      2. product description is equal to category description */
    let ssrProductDescription = true
    const categoryDescription = product?.category?.category?.description
    if (!product?.description) ssrProductDescription = false
    if (product?.description === categoryDescription)
      ssrProductDescription = false

    return {
      activeTab: query.tab || null,
      breadcrumbItems,
      isMounted,
      product,
      ssrProductDescription,
      productSolutions: productData.productSolutions ?? [],
    }
  },

  data() {
    return {
      loadingAvailableSections: false,
      availableSections: [],
    }
  },

  head() {
    return {
      title: this.product && this.product.meta_title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.product && this.product.meta_description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.product && this.product.meta_keywords,
        },
      ],
    }
  },

  computed: {
    breadcrumbs() {
      const breadcrumbs = [{ text: 'catalog.title', to: '/catalog' }]
      if (this.breadcrumbItems && this.breadcrumbItems.length) {
        breadcrumbs.push(
          ...this.breadcrumbItems.map((item) => {
            return {
              text: item.name,
              to: `/catalog/${item.slug}`,
            }
          })
        )
      }
      return breadcrumbs
    },
  },

  async created() {
    this.loadingAvailableSections = true
    this.availableSections = await this.prepareSections()
    this.loadingAvailableSections = false
  },

  mounted() {
    this.analyticEvents()

    mindboxViewCatalogProduct(this.product?.id)
  },

  methods: {
    analyticEvents() {
      if (OUT_OF_PRODUCTION_STATUSES.includes(this.product.status)) {
        this.$ym('reachGoal', 'out-of-stock-product', {
          'out-of-stock-product-slug': this.product?.slug,
        })
      }

      this.$ym('reachGoal', 'category_view_w_products', {
        category_p: 'catalog',
      })

      if (!this.breadcrumbItems?.length) return
      this.breadcrumbItems.forEach(({ slug }) => {
        this.$ym('reachGoal', 'category_view_w_products', {
          category_p: slug,
        })
      })
    },

    async getAnalogsSwiperClass() {
      return (await this.product?.replacementEkfAnalog?.length)
        ? SWIPER_WITH_REPLACMENT_ANALOG_CLASS
        : ''
    },

    handleTabActivate(event, scroll) {
      setTimeout(() => {
        this.activeTab = event
      }, 100)
      if (scroll && process.client) {
        const scrollTarget = document.querySelector('.combo-tabs')
        scrollToTarget(scrollTarget)
      }
    },

    async prepareSections() {
      const suggestionSections = [
        {
          show: await this.hasAccessories(),
          title: this.$t('global.accessories'),
          products: this.product?.relatedAnalogs,
        },
        {
          show: await this.hasAdditionals(),
          title: this.$t('global.relatedProducts'),
          products: this.product?.additionalAnalogs,
        },
        {
          anchorId: 'analogs-section',
          show: await this.hasAnalogs(),
          title: this.$t('global.analogs'),
          products: await this.productAnalogsSection(),
          swiperClass: await this.getAnalogsSwiperClass(),
        },
      ]

      return suggestionSections.filter(({ show }) => show)
    },

    async hasAccessories() {
      return await Boolean(this.product?.relatedAnalogs?.length)
    },

    async hasAnalogs() {
      const analogsSection = await this.productAnalogsSection()
      return Boolean(analogsSection.length)
    },

    async hasAdditionals() {
      return await Boolean(this.product?.additionalAnalogs?.length)
    },

    async productAnalogsSection() {
      return await [
        ...this.product?.replacementEkfAnalog,
        ...this.product?.ekfAnalogs,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/slider'; // For Product slider
@import '@/assets/scss/tables'; // For Product specs

@include media-breakpoint-up(md) {
  .catalog-product-tabs {
    margin-top: -100px;
    padding-top: 100px;
  }
}

@include media-breakpoint-up(xl) {
  ::v-deep {
    .catalog-product-gallery {
      width: 440px;
    }
  }
}
</style>
