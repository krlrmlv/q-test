<template>
  <div>
    <CatalogCategoryTags
      v-if="hasTags"
      :tag-groups="tagGroups"
      class="mb-48 mb-lg-64"
    />

    <h2 v-if="showAllProductsTitle" class="h4 mb-lg-32">
      {{ $t('catalog.allCategoryProducts') }}
    </h2>

    <CatalogCategoryProductWrapper
      :category="category"
      :price="price"
      :price-range="priceRange"
      :price-range-available="priceRangeAvailable"
      :products="products"
      :products-total="productsTotal"
      :properties="properties"
      @filters-reset="$emit('filters-reset')"
      @filters-set="$emit('filters-set', $event)"
      @page-change="$emit('page-change', $event)"
      @price-set="$emit('price-set', $event)"
    />
  </div>
</template>

<script>
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
      default: () => ({}),
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
    showAllProductsTitle: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    tagGroups() {
      return this.category?.tag_groups ?? []
    },
    hasTags() {
      return Boolean(this.tagGroups?.length)
    },
  },
}
</script>
