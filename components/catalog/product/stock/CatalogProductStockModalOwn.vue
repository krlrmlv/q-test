<template>
  <div class="mx-n16 mx-md-0">
    <header class="mx-16 mx-sm-0">
      <h4 class="title mb-8" v-html="$t('catalog.ownStocks.modalTitle')"></h4>

      <div class="vendor-code fs-3 mb-40">
        {{ `${$t('global.vendorCode')} ${vendorCode}` }}
      </div>
    </header>

    <transition name="fade" mode="out-in">
      <div v-if="loading" class="mb-32 text-center">
        <b-spinner class="spinner-loading ml-8" />
      </div>

      <b-table
        v-else
        class="table-stock mb-40"
        :busy="loading"
        :fields="tableFields"
        :items="stock"
        head-variant="light"
        tbody-class="fs-2"
        borderless
        show-empty
        striped
      >
        <template #cell(warehouse)="{ item }">
          <span>
            {{ item.warehouse.name }}
          </span>
        </template>

        <template #cell(quantity)="{ item }">
          {{ formatQuantity(item.quantity) }}&nbsp;{{ productUnitName }}
        </template>

        <template #cell(receipt)="{ item }">
          <div v-if="item.receipts?.length">
            <span class="d-block d-md-none mb-4"
              >{{ $t('catalog.ownStocks.fields.receipt') }}:</span
            >

            <ul v-if="item.receipts?.length" class="list-unstyled mb-0">
              <li
                v-for="(receipt, index) in item.receipts"
                :key="index"
                class="receipt-item"
              >
                {{ formatDate(receipt.date) }} -
                {{ formatQuantity(receipt.quantity_free) }} &nbsp;{{
                  productUnitName
                }}
              </li>
            </ul>
          </div>
        </template>

        <template #empty>
          <p class="text-center text-muted mb-0">
            {{ $t('global.tableEmpty') }}
          </p>
        </template>
      </b-table>
    </transition>

    <b-row tag="footer" class="mx-16 mx-sm-0" no-gutters>
      <b-col md="8">
        <p ref="hint" class="text-gray-800 fs-1 mb-0" v-html="hintHtml"></p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BTable, BSpinner } from 'bootstrap-vue'
import formatSum from '~/utils/formatSum'

export default {
  components: { BTable, BSpinner },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Array,
      default() {
        return []
      },
    },
    unitName: {
      type: String,
      default: null,
    },
    vendorCode: {
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

    hasReceiptField() {
      return this.stock.some(({ receipts }) => receipts?.length)
    },

    hintHtml() {
      const message = this.$t('catalog.ownStocks.hint')
      return message
        .replace(
          /\{\{(.+)\}\}/gi,
          '<a href="#" class="modal-toggle text-reset text-underline">$1</a>'
        )
        .replace(
          '8 800 333 88 15',
          '<a href="tel:88003338815" class="text-reset text-hover-primary" style="white-space: nowrap;">8 800 777-65-27</a>'
        )
    },

    tableFields() {
      const fields = [
        {
          key: 'warehouse',
          label: this.$t('catalog.ownStocks.fields.warehouse'),
          thClass: 'align-middle p-16 px-md-24',
          tdClass: 'p-md-24 pt-24 px-16 pb-12',
        },
        {
          key: 'quantity',
          label: this.$t('catalog.ownStocks.fields.stock'),
          thClass: 'align-middle p-16 px-md-24',
          tdClass: 'p-md-24 px-16',
        },
      ]

      if (this.hasReceiptField) {
        fields.push({
          key: 'receipt',
          label: this.$t('catalog.ownStocks.fields.receipt'),
          thClass: 'align-middle p-16 px-md-24',
          tdClass: 'p-md-24 pt-0 pr-0 pl-16 td-receipt',
        })
      }

      return fields
    },
  },

  mounted() {
    const link = this.$refs.hint.querySelector('.modal-toggle')
    if (link) link.addEventListener('click', this.linkClickHandler)
  },

  beforeDestroy() {
    const link = this.$refs.hint.querySelector('.modal-toggle')
    if (link) link.removeEventListener('click', this.linkClickHandler)
  },

  methods: {
    linkClickHandler(e) {
      e.preventDefault()
      this.$root.$emit('bv::show::modal', 'consultation-modal')
    },

    formatDate(datestring) {
      const date = new Date(datestring)
      return date
        .toLocaleDateString(this.$i18n.localeProperties.iso)
        .slice(0, 5)
    },

    formatQuantity(quantity) {
      return formatSum(quantity, this.$i18n.locale)
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .table.table-stock {
    thead tr > th {
      width: 36%;

      &:last-child {
        width: 28%;
      }
    }
  }

  @include media-breakpoint-down(sm) {
    .td-receipt {
      padding-bottom: 1.5rem;
      flex-direction: column;

      &:not(:has(:first-child)) {
        padding-bottom: 0.75rem;
      }
    }

    .table.table-stock {
      display: block;

      thead {
        display: block;

        tr {
          display: flex;

          > th {
            display: flex;
            flex-grow: 1;

            &:nth-child(2) {
              justify-content: flex-end;
            }

            &:nth-child(3) {
              display: none;
            }
          }
        }
      }

      tbody {
        display: block;

        tr {
          display: flex;
          flex-wrap: wrap;

          td {
            &:nth-child(1) {
              flex-grow: 1;
              font-size: $font-size-3;
              font-weight: $font-weight-medium;
            }

            &:nth-child(2) {
              justify-content: flex-end;
            }

            &:nth-child(3) {
              flex: 0 1 80%;
            }
          }
        }
      }
    }
  }
}

.receipt-item:not(:last-of-type) {
  margin-bottom: 0.5rem;
}
</style>
