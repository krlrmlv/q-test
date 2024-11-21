<template>
  <div class="product-specs lh-140">
    <dl class="mb-6">
      <div
        v-for="(prop, index) in properties"
        :key="`visible-${index}`"
        class="product-specs-item"
      >
        <dt>{{ getPropertyName(prop) }}</dt>
        <dd>
          {{ prop.value }}
          <span v-if="prop.property_unit">{{ prop.property_unit.name }}</span>
        </dd>
      </div>
    </dl>

    <b-collapse v-show="collapseVisible" v-model="collapseOpen">
      <dl class="mb-0 pb-6">
        <div
          v-for="(prop, index) in hiddenProperties"
          :key="`hidden-${index}`"
          class="product-specs-item"
        >
          <dt>{{ getPropertyName(prop) }}</dt>
          <dd>
            {{ prop.value }}&nbsp;
            <span v-if="prop.property_unit">
              {{ prop.property_unit.name }}
            </span>
          </dd>
        </div>
      </dl>
    </b-collapse>

    <b-button
      v-show="collapseVisible"
      :disabled="loading"
      :class="collapseOpen ? 'not-collapsed' : 'collapsed'"
      size="sm"
      variant="link"
      class="collapse-toggle"
      @click="toggleCollapse"
    >
      <span v-text="$t(`catalog.${collapseOpen ? 'collapse' : 'showAll'}`)" />

      <b-spinner v-if="loading" class="spinner-loading ml-8" small />

      <svg-icon
        v-else
        name="caret"
        width="8"
        height="4"
        class="icon-caret ml-8"
      />
    </b-button>
  </div>
</template>

<script>
import { BCollapse, BSpinner } from 'bootstrap-vue'
import CATALOG_PRODUCT_PROPERTIES_QUERY from '@/graphql/catalog/CatalogCategoryProductProperties'

const LIMIT = 8

export default {
  components: {
    BCollapse,
    BSpinner,
  },

  props: {
    productId: {
      type: String,
      required: true,
    },
    properties: {
      type: Array,
      default: () => [],
    },
    totalAvailableProperties: {
      type: [String, Number],
      default: 0,
    },
  },

  data() {
    return {
      collapseOpen: false,
      hiddenProperties: [],
      loading: false,
    }
  },

  computed: {
    collapseVisible() {
      return this.totalAvailableProperties > LIMIT
    },
  },

  methods: {
    async fetchProperties() {
      this.loading = true

      const variables = {
        locale: this.$i18n.locale,
        offset: LIMIT,
        product_id: this.productId,
      }

      try {
        const { properties } = await this.$graphql.default.request(
          CATALOG_PRODUCT_PROPERTIES_QUERY,
          variables
        )

        this.hiddenProperties = properties
      } catch (error) {}

      this.loading = false
    },

    async toggleCollapse() {
      if (
        !this.collapseOpen &&
        this.collapseVisible &&
        !this.hiddenProperties?.length
      ) {
        await this.fetchProperties()
      }

      this.collapseOpen = !this.collapseOpen
    },

    getPropertyName(property) {
      return property?.property?.name?.trim() || ''
    },
  },
}
</script>

<style lang="scss" scoped>
.collapse-toggle {
  margin-top: 0.25rem;
  padding: 0;
  text-decoration: none;
  border: none;
  color: $secondary;
}

.spinner-loading {
  width: 1em;
  height: 1em;
  border-width: $border-width * 2;
}
</style>
