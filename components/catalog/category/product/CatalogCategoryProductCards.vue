<template>
  <transition name="fade" mode="out-in">
    <b-row
      :key="`row-${viewMode}`"
      :class="{ loading: loading }"
      class="product-list mb-lg-8"
    >
      <b-col
        v-for="(product, index) in products"
        :key="`card-${product.id}-${index}-${viewMode}`"
        :lg="viewMode === 'list' ? 12 : 6"
        :xl="viewMode === 'list' ? 12 : 4"
        :sm="checkIsReplacementEkfAnalog(product) ? 12 : 6"
        :cols="checkIsReplacementEkfAnalog(product) ? 12 : 6"
        class="mb-16 mb-lg-24"
      >
        <CatalogCategoryProductCard
          :product="product"
          :suggestion-card="suggestionCard"
          :view="view || viewMode"
          @show-analogs="$emit('show-analogs')"
        />
      </b-col>
      <slot v-if="loading"></slot>
    </b-row>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { checkIsReplacementEkfAnalog } from '~/utils/product'

export default {
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    suggestionCard: {
      type: Boolean,
      default: false,
    },
    view: {
      type: String,
      default: '',
    },
  },

  computed: {
    ...mapGetters('category', ['loading', 'viewMode']),
    ...mapGetters('compare', ['isInCompare']),
  },

  methods: {
    checkIsReplacementEkfAnalog,
  },
}
</script>

<style lang="scss" scoped>
.product-list {
  position: relative;
  transition: $transition-base;
  transition-property: opacity;

  &.loading {
    opacity: 0.5;
  }
}
</style>
