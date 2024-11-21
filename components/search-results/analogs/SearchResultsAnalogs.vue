<template>
  <b-row>
    <b-col md="7" lg="8" xl="9" order-md="2" class="mb-md-48">
      <CatalogCategoryProductList
        :products="analogs"
        :products-total="analogsTotalRows"
        has-parent
        @page-change="$emit('analogs-page-change', $event)"
        @show-filters="showFilters"
      />
    </b-col>

    <b-col md="5" lg="4" xl="3" order-md="1" class="mb-md-48">
      <SearchResultsProductsFilter
        :categories="analogsCategories"
        :price="analogsPrice"
        :price-range="analogsPriceRange"
        :price-range-available="analogsPriceRangeAvailable"
        :selected-categories="analogsSelectedCategories"
        :show="filtersVisible"
        class="mb-md-48"
        @close="hideFilters"
        @filters-set="$emit('analogs-filters-set', $event)"
        @price-set="$emit('analogs-price-set', $event)"
        @reset="$emit('analogs-filters-reset')"
      />
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    analogsCategories: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    analogsPrice: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
    analogsPriceRange: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
    analogsPriceRangeAvailable: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
    analogs: {
      type: Array,
      default: () => [],
    },
    analogsSelectedCategories: {
      type: Array,
      default: () => [],
    },
    analogsTotalRows: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      filtersVisible: false,
    }
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
