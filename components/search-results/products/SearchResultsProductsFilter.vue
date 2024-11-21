<template>
  <CatalogOffcanvas
    :show="show"
    :title="$t('filters.title')"
    @close="$emit('close')"
  >
    <CatalogFilterPrice
      v-if="!isOutOfProduction"
      :disabled="loading"
      :price="price"
      :price-range="priceRange"
      :price-range-available="priceRangeAvailable"
      class="mb-32"
      @update="$emit('price-set', $event)"
    />

    <SearchResultsCategories
      :categories="categories"
      :checked="selectedCategories"
      :disabled="loading"
      :title="$t('global.category')"
      class="mb-32"
      @change="$emit('filters-set', $event)"
    />

    <div class="pb-16 pb-md-0">
      <b-button
        :disabled="loading"
        variant="outline-primary"
        block
        @click="$emit('reset')"
      >
        {{ $t('filters.resetFilters') }}
      </b-button>
    </div>
  </CatalogOffcanvas>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
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
    selectedCategories: {
      type: Array,
      default: () => [],
    },
    show: {
      type: Boolean,
      default: false,
    },
    isOutOfProduction: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters('category', ['loading']),
  },
}
</script>
