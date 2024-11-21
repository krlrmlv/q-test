<template>
  <b-row class="lh-140 pb-md-48">
    <b-col lg="9" xl="8" class="col-xxl-7">
      <h4 class="table-title px-20 px-md-0 mb-16 mb-md-40">
        {{ $t('catalog.tabs.specs.dataSheet') }}
      </h4>

      <b-table-lite
        :fields="fields"
        :items="items"
        table-class="table-striped-odd"
        thead-class="d-none"
        class="table-product-specs mb-32 mb-lg-72"
        borderless
        striped
      />

      <CatalogProductTableLogistic :product="product" />
    </b-col>
  </b-row>
</template>

<script>
import { BTableLite } from 'bootstrap-vue'

export default {
  name: 'CatalogProductTabSpecs',

  serverCacheKey: ({ locale, product }) =>
    `${locale}::${product?.id}::${product?.created_at}`,

  components: { BTableLite },

  props: {
    locale: {
      type: String,
      required: true,
    },
    product: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      fields: [
        { key: 'property', label: '', tdClass: 'cell-property' },
        { key: 'value', label: '', tdClass: 'cell-value' },
      ],
    }
  },

  computed: {
    items() {
      const items = []

      if (this.product?.status) {
        items.push({
          property: this.$t('catalog.status'),
          value: this.product.status,
        })
      }

      this.product?.property_values?.forEach((row) => {
        let property = row?.property?.name ?? ''
        const value = row?.value ?? ''

        if (row?.property_unit?.name) {
          property += ', ' + row.property_unit.name
        }

        items.push({ property, value })
      })

      return items
    },
  },
}
</script>

<style lang="scss" scoped>
.table-product-specs {
  ::v-deep {
    thead tbody > tr > [data-label] > div {
      display: block !important;
      width: auto !important;
      padding: 0 !important;
    }
    .cell-value {
      width: 20%;
      max-width: 25%;
    }
  }
}

@include media-breakpoint-down(sm) {
  .table-title {
    font-size: $font-size-3;
  }
  .table-wrapper {
    margin-left: -0.75rem;
    margin-right: -0.75rem;
  }

  .table-product-specs {
    font-size: $font-size-2;
    line-height: 1.2;
  }
}
</style>
