<template>
  <div>
    <CatalogProductStockPartnerAddress
      v-for="(address, index) in visibleAddresses"
      :key="address.address + index"
      class="mb-12"
      :address="address"
      :phone-text="phoneText"
      :phone-url="phoneUrl"
    />
    <b-collapse v-show="collapseVisible" v-model="collapseOpen">
      <CatalogProductStockPartnerAddress
        v-for="(address, index) in hiddenAddresses"
        :key="address.address + index"
        class="mb-12"
        :address="address"
        :phone-text="phoneText"
        :phone-url="phoneUrl"
      />
    </b-collapse>

    <b-button
      v-show="collapseVisible"
      :disabled="loading"
      :class="collapseOpen ? 'not-collapsed' : 'collapsed'"
      size="sm"
      variant="link"
      class="collapse-toggle mb-12"
      @click="toggleCollapse"
    >
      <span
        v-text="
          $t(`catalog.partnerStocks.${collapseOpen ? 'collapse' : 'showAll'}`)
        "
      />

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
import { BCollapse } from 'bootstrap-vue'
const LIMIT = 1

export default {
  components: { BCollapse },
  props: {
    addresses: {
      type: Array,
      default: () => [],
    },
    phone: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      collapseOpen: false,
      loading: false,
    }
  },

  computed: {
    collapseVisible() {
      return this.addresses?.length > LIMIT
    },

    visibleAddresses() {
      return this.addresses.slice(0, LIMIT)
    },

    hiddenAddresses() {
      return this.addresses.slice(LIMIT)
    },

    phoneText() {
      if (!this.phone) return ''
      return this.phone.toString().replace(/,\s*$/gi, '')
    },

    phoneUrl() {
      if (!this.phone) return ''
      return `tel:${this.phone.replace(/[^0-9+]/gi, '')}`
    },
  },
  methods: {
    toggleCollapse() {
      this.collapseOpen = !this.collapseOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.collapse-toggle {
  padding: 0;
  text-decoration: none;
  border: none;
  color: $gray-600;
}
</style>
