<template>
  <b-table
    :busy="loading"
    :fields="fields"
    :items="items"
    tbody-class="fs-2"
    :thead-class="theadClass"
    class="table-stock mb-40"
    borderless
    show-empty
    striped
  >
    <template #cell(company)="{ item }">
      <p class="mb-0 fs-3 font-weight-medium">
        {{ item.partner.commercial_name || item.partner.short_name }}
      </p>
    </template>

    <template #cell(warehouse)="{ item }">
      <CatalogProductStockPartnerAddresses
        :addresses="item.addresses"
        :phone="item.partner.phone"
      />
    </template>

    <template #cell(quantity)="{ item }">
      <span v-if="item.stockIsActual">
        {{ formatQuantity(item.quantity) }}&nbsp;{{ productUnitName }}
      </span>
      <span v-else>
        {{ $t('catalog.partnerStocks.checkAvailability') }}
      </span>
    </template>

    <template #cell(partnerSiteUrl)="{ item }">
      <CatalogProductStockEkfMarketSite
        v-if="item.isOwn"
        :product-slug="item.slug"
      />
      <CatalogProductStockPartnerSite v-else :item="item" />
    </template>
  </b-table>
</template>

<script>
import { BTable } from 'bootstrap-vue'
import formatSum from '~/utils/formatSum'

export default {
  components: {
    BTable,
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    theadClass: {
      type: String,
      default: '',
    },
    unitName: {
      type: String,
      default: null,
    },
  },

  computed: {
    productUnitName() {
      if (this.unitName?.includes('.')) return this.unitName

      return this.unitName
        ? `${this.unitName}.`
        : this.$t('catalog.partnerStocks.pcs')
    },
  },

  methods: {
    formatQuantity(quantity) {
      return formatSum(quantity, this.$i18n.locale)
    },
  },
}
</script>
