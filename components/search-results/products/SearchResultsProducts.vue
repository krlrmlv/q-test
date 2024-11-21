<template>
  <b-row>
    <b-col md="7" lg="8" xl="9" order-md="2" class="mb-md-48">
      <CatalogCategoryProductList
        :products="products"
        :products-total="totalRows"
        has-parent
        @page-change="$emit('page-change', $event)"
        @show-filters="showFilters"
        @show-analogs="$emit('show-analogs')"
      />
    </b-col>

    <b-col md="5" lg="4" xl="3" order-md="1" class="mb-md-48">
      <SearchResultsProductsFilter
        :is-out-of-production="isOutOfProduction"
        :categories="categories"
        :price="price"
        :price-range="priceRange"
        :price-range-available="priceRangeAvailable"
        :selected-categories="selectedCategories"
        :show="filtersVisible"
        class="mb-md-48"
        @close="hideFilters"
        @filters-set="$emit('filters-set', $event)"
        @price-set="$emit('price-set', $event)"
        @reset="$emit('filters-reset')"
      />
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
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
    selectedCategories: {
      type: Array,
      default: () => [],
    },
    totalRows: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      filtersVisible: false,
    }
  },
  computed: {
    isOutOfProduction() {
      return this.products.some(
        (product) => product.status === 'Cнята с производства'
      )
    },
  },
  methods: {
    hideFilters() {
      this.filtersVisible = false
    },
    showFilters() {
      this.filtersVisible = true
    },
  },
}
</script>
