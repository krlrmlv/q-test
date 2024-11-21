<template>
  <div class="mx-n16 mx-md-0">
    <CatalogProductStockPartnerModalHeader :vendor-code="vendorCode" />

    <transition name="fade" mode="out-in">
      <div v-if="loading" class="mb-32 text-center">
        <b-spinner class="spinner-loading ml-8" />
      </div>

      <div v-else>
        <InfoBlock v-if="hasInfo" class="p-24 mb-40 mx-16 mx-sm-0">
          <span>{{ infoText }}</span>
        </InfoBlock>

        <div v-if="showMarketStock">
          <CatalogProductStockPartnerModalTable
            class="market-table"
            :thead-class="'market-table-thead'"
            :items="ekfMarketStock"
            :loading="loading"
            :fields="fields"
            :unit-name="unitName"
          />
        </div>

        <div v-for="{ location, partners } in items" :key="location">
          <div v-if="partners.length">
            <p class="table-lable mb-16 mx-16 mx-sm-0">
              {{ location }}
            </p>

            <CatalogProductStockPartnerModalTable
              :items="partners"
              :loading="loading"
              :fields="fields"
              :unit-name="unitName"
            />
          </div>
        </div>
      </div>
    </transition>
    <p class="fs-1 text-gray-800 px-16 px-md-0 mb-0">
      * {{ $t('catalog.partnerStocks.priceDisclaimer') }}
    </p>
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {
  components: {
    BSpinner,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Object,
      default: () => ({}),
    },
    stockOwn: {
      type: Number,
      default: null,
    },
    showMarketStock: {
      type: Boolean,
      default: false,
    },
    unitName: {
      type: String,
      default: null,
    },
    vendorCode: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'company',
          label: this.$t('catalog.partnerStocks.fields.partner'),
          thClass: 'align-middle',
          tdClass: 'td-company',
        },
        {
          key: 'warehouse',
          label: this.$t('catalog.partnerStocks.fields.warehouse'),
          thClass: 'align-middle',
          tdClass: 'td-warehouse',
        },
        {
          key: 'quantity',
          label: this.$t('catalog.partnerStocks.fields.stockShort'),
          thClass: 'align-middle',
          tdClass: 'td-quantity',
        },
        {
          key: 'partnerSiteUrl',
          label: '',
          thClass: 'align-middle',
          tdClass: 'td-site-url',
        },
      ],
    }
  },
  computed: {
    items() {
      const items = []

      for (const location in this.stock) {
        items.push({
          location: this.$t(`catalog.partnerStocks.${location}`),
          partners: this.stock[location],
        })
      }

      return items
    },

    ekfMarketStock() {
      const marketAddress = {
        address:
          'Интернет-магазин EKF<br /> Москва, Сергия&nbsp;Радонежского,&nbsp;8',
        html: true,
      }

      return this.showMarketStock
        ? [
            {
              addresses: [marketAddress],
              isOwn: true,
              partner: {
                short_name: 'EKF Market',
              },
              quantity: this.stockOwn,
              stockIsActual: true,
              vendorCode: this.vendorCode,
              slug: this.slug,
            },
          ]
        : []
    },

    hasInfo() {
      return !this.stock?.city?.length
    },

    infoText() {
      let location = 'city'
      if (!this.stock?.region?.length) location = 'region'

      return this.$t(`catalog.partnerStocks.info.${location}`)
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .market-table {
    .market-table-thead {
      display: none;
    }

    .td-company {
      padding-inline: 0;
    }
  }

  .table.table-borderless thead tr:last-of-type {
    border-bottom: none;

    th {
      padding-top: 1.375rem;
      padding-bottom: 1.375rem;
      font-weight: $font-weight-normal;
      background-color: $gray-100;
    }
  }

  .td-company {
    width: 25%;
  }

  .td-warehouse {
    width: 36%;
  }

  .td-quantity {
    width: 16%;
  }

  .td-site-url {
    width: 16%;
    text-align: right;
    padding-left: 0 !important;
  }
}

.table-lable {
  font-weight: $font-weight-medium;
  font-size: $font-size-5;
}

@include media-breakpoint-up(lg) {
  ::v-deep {
    .seolink {
      font-size: $font-size-2;

      > .icon {
        &:not(.icon-sm) {
          display: none;
        }
      }
    }
  }
}
@include media-breakpoint-down(sm) {
  ::v-deep {
    .table.table-borderless {
      display: block;

      thead:not(.market-table-thead) {
        display: block;

        tr {
          display: flex;

          th {
            display: none;
            align-items: flex-end;
            min-width: 0;
            padding: 1rem;

            &:nth-child(2) {
              display: flex;
              flex: 0 0 70%;
            }
            &:nth-child(3) {
              display: flex;
              flex: 0 0 30%;
            }
          }
        }
      }

      tbody {
        display: block;

        tr {
          display: flex;
          flex-wrap: wrap;
          padding-top: 1rem;
          padding-bottom: 1rem;

          td {
            display: flex;
            flex: 0 0 100%;
            min-width: 0;
            padding: 1rem 1rem 0.5rem;

            &:nth-child(1) {
              padding-bottom: 0;
            }
            &:nth-child(2) {
              flex: 0 0 70%;
            }
            &:nth-child(3) {
              flex: 0 0 30%;
            }
            &:nth-child(4) {
              padding: 0;

              .seolink {
                display: block;
                margin: 1rem;
                font-size: $font-size-base;
              }
            }
          }
        }
      }
    }
  }
}
</style>
