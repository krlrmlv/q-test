<template>
  <div class="catalog-product-stock-wrapper">
    <slot></slot>

    <b-button
      v-if="inStock"
      :disabled="isLoading"
      :size="size"
      variant="link"
      class="catalog-product-stock card-btn-link"
      @click="showModal(false)"
    >
      <svg-icon
        name="boxes-product-16"
        width="16"
        height="16"
        class="mr-4"
        aria-hidden="true"
      />
      {{ $t('catalog.inStockEkf') }}
    </b-button>

    <b-button
      :disabled="isLoading"
      :size="size"
      variant="link"
      class="catalog-product-stock card-btn-link"
      @click="redirectToDistributionBuy"
    >
      <svg-icon
        name="map-pin-16"
        width="16"
        height="16"
        class="mr-4"
        aria-hidden="true"
      />
      {{ $t('distribution.title') }}
    </b-button>

    <CatalogProductStockModal
      v-model="modalShow"
      :product="product"
      :size="partners ? 'xl' : 'lg'"
      @hidden="handleModalHidden"
    >
      <CatalogProductStockModalPartner
        v-if="partners"
        :loading="isLoading"
        :stock="stockPartners"
        :stock-own="stockOwnTotal"
        :unit-name="unitName"
        :vendor-code="vendorCode"
        :slug="slug"
        :show-market-stock="product.active_im"
      />

      <CatalogProductStockModalOwn
        v-else
        :loading="isLoading"
        :stock="stockOwn"
        :unit-name="unitName"
        :vendor-code="vendorCode"
      />
    </CatalogProductStockModal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CATALOG_PRODUCT_STOCK_QUERY from '@/graphql/catalog/CatalogProductStock'
import CATALOG_PRODUCT_STOCK_PARTNER_BY_LOCATION from '@/graphql/catalog/CatalogProductStockPartnerByLocation'

export default {
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
    size: {
      type: String,
      default: null,
    },
    onlyPartners: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: false,
    },
    stockOwnTotal: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      abortController: null,
      loading: false,
      modalShow: false,
      partners: false,
      stockOwn: [],
      stockPartners: {
        city: [],
        region: [],
        other: [],
      },
    }
  },
  computed: {
    ...mapGetters('geo', {
      locationLoading: 'loading',
      selectedLocation: 'selectedLocation',
    }),

    isLoading() {
      return this.loading || this.locationLoading
    },

    iconSize() {
      return this.size === 'sm' ? 16 : 24
    },

    slug() {
      return this.product?.slug
    },

    unitName() {
      return this.product?.unit_storage?.name
    },

    vendorCode() {
      return this.product?.vendor_code
    },
  },

  watch: {
    selectedLocation: {
      handler() {
        this.resetStockPartners()

        if (this.modalShow) this.fetchPartnerStock()
      },
    },
  },

  methods: {
    async fetchOwnStock() {
      this.loading = true

      const variables = {
        vendor_code: this.product.vendor_code,
        locale: this.$i18n.locale,
        filterDate: new Date().toISOString(),
      }

      try {
        if (process.client && 'AbortController' in window) {
          this.abortController = new AbortController()
        }
        const { stock } = await this.$graphql.default.request({
          document: CATALOG_PRODUCT_STOCK_QUERY,
          variables,
          signal: this.abortController?.signal,
        })
        this.stockOwn = stock?.[0]?.stocks || []
      } catch (error) {}

      this.loading = false
    },

    async fetchPartnerStock() {
      this.loading = true

      const where = {
        vendor_code: {
          _eq: this.product.vendor_code,
        },
        quantity: { _gt: '0' },
      }

      const cityWhere = {
        city_fias_id: {
          _eq: this.selectedLocation?.fias_id,
        },
        ...where,
      }

      const regionWhere = {
        region_fias_id: {
          _eq: this.selectedLocation?.region_fias_id ?? '',
        },
        city_fias_id: {
          _neq: this.selectedLocation?.fias_id,
        },
        ...where,
      }

      const otherWhere = {
        region_fias_id: {
          _neq: this.selectedLocation.region_fias_id ?? '',
        },
        city_fias_id: {
          _neq: this.selectedLocation?.fias_id,
        },
        ...where,
      }

      try {
        if (process.client && 'AbortController' in window) {
          this.abortController = new AbortController()
        }

        const { city, region, other } = await this.$graphql.default.request({
          document: CATALOG_PRODUCT_STOCK_PARTNER_BY_LOCATION,
          variables: { cityWhere, regionWhere, otherWhere },
          signal: this.abortController?.signal,
        })

        const locations = { city, region, other }

        for (const location in locations) {
          const groupedByPartner = this.groupByPartner(locations[location])
          const actualStockPartners = []
          const notActualStockPartners = []

          for (const partner in groupedByPartner) {
            groupedByPartner[partner]?.stockIsActual
              ? actualStockPartners.push(groupedByPartner[partner])
              : notActualStockPartners.push(groupedByPartner[partner])
          }
          this.stockPartners[location] = [
            ...actualStockPartners,
            ...notActualStockPartners,
          ]
        }
      } catch (error) {}

      this.loading = false
    },

    groupByPartner(place) {
      const groupedByPartner = {}
      const today = new Date()

      place.forEach(({ address, quantity, partner, date }) => {
        /** Check whether the product is currently in stock
         * The stock is current if the data has been updated within the last 7 days */
        const updatedAt = new Date(date)
        const updatedDaysAgo = Math.floor(
          (today - updatedAt) / (1000 * 60 * 60 * 24)
        )
        const stockIsActual = updatedDaysAgo < 7

        if (groupedByPartner[partner.id]) {
          groupedByPartner[partner.id].addresses.push({
            address,
          })
          groupedByPartner[partner.id].quantity += Math.round(
            parseFloat(quantity)
          )
          groupedByPartner[partner.id].stockIsActual = stockIsActual
          return
        }

        groupedByPartner[partner.id] = {
          partner,
          addresses: [{ address }],
          quantity: Math.round(parseFloat(quantity)),
          stockIsActual,
        }
      })
      return groupedByPartner
    },

    handleModalHidden() {
      if (typeof this.abortController?.abort === 'function') {
        this.abortController.abort()
      }
      this.partners = false
    },

    async showModal(partners = false) {
      if (!partners && !this.inStock) return

      this.partners = partners
      this.modalShow = true

      if (partners) {
        this.resetStockPartners()
        await this.fetchPartnerStock()
        this.sendAnalyticEvent()
      } else {
        this.fetchOwnStock()
      }
    },

    redirectToDistributionBuy() {
      // Временное решение взамен showModal(true)
      this.$ym('reachGoal', 'WHERETOBUYCLICK')
      this.$router.push(this.localePath('/distribution/buy'))
    },

    resetStockPartners() {
      this.stockPartners = {
        city: [],
        region: [],
        other: [],
      }
    },

    sendAnalyticEvent() {
      this.$gtm.push({
        event: 'btnAvailabilityOfPartners',
        product: this.product?.vendor_code,
      })
    },
  },
}
</script>
