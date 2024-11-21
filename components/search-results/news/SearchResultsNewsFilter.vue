<template>
  <CatalogOffcanvas
    :show="show"
    :title="$t('filters.title')"
    @close="$emit('close')"
  >
    <SearchResultsCategories
      :categories="categories"
      :checked="selectedCategories"
      :disabled="loading"
      :title="$t('news.category')"
      class="mb-32"
      @change="$emit('filters-set', $event)"
    />

    <div class="pb-16 pb-md-0">
      <b-button
        :disabled="loading"
        variant="outline-primary"
        block
        @click="$emit('filters-reset')"
      >
        {{ $t('filters.resetFilters') }}
      </b-button>
    </div>
  </CatalogOffcanvas>
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
    show: {
      type: Boolean,
      default: false,
    },
    selectedCategories: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
