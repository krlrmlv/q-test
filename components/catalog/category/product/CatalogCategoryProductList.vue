<template>
  <div>
    <CatalogCategoryControls
      :has-filters="hasFilters"
      :has-per-page-settings="hasPerPageSettings"
      :products-total="productsTotal"
      @show-filters="$emit('show-filters')"
    />

    <CatalogCategoryProductCards
      :category-slug="categorySlug"
      :products="products"
      @show-analogs="$emit('show-analogs')"
    >
      <b-spinner variant="muted" class="spinner-loading" />
    </CatalogCategoryProductCards>

    <AppPagination
      v-if="productsTotal > perPage"
      :show-first-last-numbers="true"
      :per-page="perPage"
      :total-rows="productsTotal"
      :value="currentPage"
      align="center"
      size="sm"
      @change="$emit('page-change', $event)"
      @input="$emit('page-input', $event)"
    />

    <ComparePopup />
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: { BSpinner },

  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
    hasFilters: {
      type: Boolean,
      default: false,
    },
    hasPerPageSettings: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array,
      default: () => [],
    },
    productsTotal: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ...mapGetters('category', ['perPage']),

    categorySlug() {
      return this.category?.slug
    },

    currentPage() {
      return parseInt(this.$route.query.page) || 1
    },
  },
}
</script>

<style lang="scss" scoped>
.spinner-loading {
  position: absolute;
  top: 0;
  left: $grid-gutter-width * 0.5;
  width: 1.5rem;
  height: 1.5rem;
  border-width: $border-width * 2;
}

@include media-breakpoint-down(md) {
  .spinner-loading {
    width: 1rem;
    height: 1rem;
  }
}
::v-deep {
  @include media-breakpoint-down(xs) {
    .page-item {
      display: block !important;
    }
  }
  @media (max-width: 360px) {
    .page-link {
      padding: 0.05rem 0.45rem;
    }
  }
}
</style>
