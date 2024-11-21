<template>
  <b-row class="catalog-category-controls align-items-center mx-n8 mb-16">
    <b-col cols="auto" class="d-none d-lg-block mb-16 px-8">
      <b-form-radio-group
        :checked="viewMode"
        button-variant="white"
        size="sm"
        buttons
        @input="handleViewInput"
      >
        <b-form-radio value="list" class="text-secondary border-0 mr-2 py-8">
          <span class="sr-only">
            {{ $t('catalog.tabs.assortment.list') }}
          </span>
          <svg-icon
            name="view-list-16"
            width="16"
            height="16"
            aria-hidden="true"
          />
        </b-form-radio>

        <b-form-radio value="grid" class="text-secondary border-0 mr-2 py-8">
          <span class="sr-only">
            {{ $t('catalog.tabs.assortment.grid') }}
          </span>
          <svg-icon
            name="view-grid-16"
            width="16"
            height="16"
            aria-hidden="true"
          />
        </b-form-radio>
      </b-form-radio-group>
    </b-col>

    <b-col cols="auto" class="flex-fill d-none d-lg-block mb-16 px-8">
      <p class="fs-2 text-secondary mb-0">
        {{ captionFound }}
        {{ productsTotal }}&nbsp;{{ captionProducts }}
      </p>
    </b-col>

    <b-col cols="auto" class="mb-16 px-8">
      <CatalogCategorySort />
    </b-col>

    <b-col
      v-if="hasPerPageSettings"
      cols="auto"
      class="d-none d-lg-block mb-16"
    >
      <CatalogCategoryPerPage />
    </b-col>

    <b-col cols="auto" class="flex-fill text-right d-md-none mb-16 px-8">
      <b-button
        v-if="hasFilters || isSearch"
        variant="link"
        class="text-decoration-none text-gray-700 border-0 p-0"
        @click="showFilters"
      >
        {{ $t('filters.title') }}
        <svg-icon
          name="filters-24"
          width="24"
          height="24"
          class="ml-8"
          aria-hidden="true"
        />
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import { BFormRadioGroup, BFormRadio } from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import getDeclension from '@/utils/declension'

export default {
  components: {
    BFormRadioGroup,
    BFormRadio,
  },

  props: {
    hasPerPageSettings: {
      type: Boolean,
      default: false,
    },
    hasFilters: {
      type: Boolean,
      default: false,
    },
    productsTotal: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ...mapGetters('category', ['viewMode', 'isSearch']),

    captionFound() {
      return getDeclension(
        this.productsTotal,
        this.$t('catalog.tabs.assortment.foundDeclensions')
      )
    },

    captionProducts() {
      return getDeclension(
        this.productsTotal,
        this.$t('catalog.tabs.assortment.productsDeclensions')
      )
    },
  },

  methods: {
    ...mapActions('category', ['setViewMode']),

    async handleViewInput(event) {
      await this.setViewMode(event)

      if (event === 'list') {
        this.$ym('reachGoal', 'HORIZONLIST')
      } else if (event === 'grid') {
        this.$ym('reachGoal', 'VERTICALLIST')
      }
    },

    showFilters() {
      this.$emit('show-filters')
    },
  },
}
</script>
