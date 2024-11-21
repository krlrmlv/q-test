<template>
  <b-row>
    <b-col md="7" lg="8" xl="9" class="mb-48" order-md="2">
      <CatalogCategoryProductList
        :category="category"
        :has-filters="hasFilters"
        has-per-page-settings
        :products="products"
        :products-total="productsTotal"
        @page-change="$emit('page-change', $event)"
        @show-filters="showFilters"
      />
    </b-col>

    <b-col md="5" lg="4" xl="3" class="mb-48" order-md="1">
      <CatalogFilterDistribution
        v-if="!hasChildren"
        class="d-none d-md-block mb-32"
      />

      <div ref="aside" class="aside">
        <CatalogFilterSubcategories v-if="hasChildren" :category="category" />

        <CatalogCategoryFilters
          v-if="hasFilters"
          :category="category"
          :price="price"
          :price-range="priceRange"
          :price-range-available="priceRangeAvailable"
          :properties="properties"
          :show="filtersVisible"
          @close="hideFilters"
          @filters-set="$emit('filters-set', $event)"
          @price-set="$emit('price-set', $event)"
          @reset="$emit('filters-reset')"
        />

        <InfoBlock v-else class="d-none d-md-block">
          <span> {{ $t('filters.subcategoryHint') }} </span>
        </InfoBlock>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
    price: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
    priceRange: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
    priceRangeAvailable: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
    products: {
      type: Array,
      default: () => [],
    },
    productsTotal: {
      type: Number,
      default: 0,
    },
    properties: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      filtersVisible: false,
    }
  },

  computed: {
    ...mapGetters('header', ['collapsed']),

    hasChildren() {
      return (
        this.category?.show_subcategories &&
        Boolean(this.category?.children?.length)
      )
    },

    hasFilters() {
      return this.category?.show_filters
    },
  },

  watch: {
    collapsed: {
      immediate: true,
      handler(value) {
        const aside = this.$refs.aside
        if (aside) {
          value
            ? aside.style.setProperty('--offset-top', '100px')
            : aside.style.setProperty('--offset-top', '158px')
        }
      },
    },
  },

  mounted() {
    if (this.isWindowWidthLowerThanMdBreakpoint()) return

    const aside = this.$refs.aside
    if (!aside) return

    const asideHeight = Math.round(aside.getBoundingClientRect().height)

    if (asideHeight > window.innerHeight) {
      const stickyTop = window.innerHeight - asideHeight - 32
      aside.style.setProperty('top', `${stickyTop}px`)
    }
  },

  methods: {
    hideFilters() {
      this.filtersVisible = false
    },

    showFilters() {
      this.filtersVisible = true
    },

    isWindowWidthLowerThanMdBreakpoint() {
      const style = getComputedStyle(document.body)
      const mdBreakpoint = style.getPropertyValue('--breakpoint-md')

      return parseInt(mdBreakpoint) > window.innerWidth
    },
  },
}
</script>

<style lang="scss" scoped>
.aside {
  --offset-top: 100px;
  top: var(--offset-top);

  @include media-breakpoint-up(md) {
    position: sticky;
    margin-bottom: 5rem;
  }
}

::v-deep {
  .info-block.alert-info {
    max-width: 17rem;
    padding: 0.5rem 1.5rem;
    font-size: $font-size-1;
  }
}
</style>
