<template>
  <div>
    <h5 class="mb-24 align-middle">
      {{ $t('calculators.masterCost.analogsTable') }}

      <b-spinner v-if="busy" variant="primary" class="ml-4" small />
    </h5>

    <b-table-simple
      :busy="busy"
      head-variant="light"
      responsive="xl"
      table-class="mastercost-table-results bg-white"
      thead-class="text-nowrap"
      borderless
    >
      <b-thead>
        <b-tr>
          <b-th
            v-for="field in fields"
            :id="field.key"
            :key="field.key"
            :class="field.thClass"
          >
            <b-button
              v-if="field.key === 'remove'"
              :title="$t('global.delete')"
              :aria-label="$t('global.delete')"
              variant="link"
              class="text-reset border-0 p-2"
              @click="removeAll"
            >
              <svg-icon
                name="trash-24"
                width="24"
                height="24"
                aria-hidden="true"
              />
            </b-button>

            <span v-else>{{ field.label }}</span>
          </b-th>
        </b-tr>
      </b-thead>

      <b-tbody v-for="(item, index) in paginatedItems" :key="`item-${index}`">
        <b-tr>
          <b-td
            v-for="field in fields"
            :key="`cell-${field.key}-${index}`"
            :rowspan="getRowspan(field, item)"
            :class="field.tdClass"
          >
            <template v-if="field.key === 'vendor_code'">
              <template v-if="item.short_name">
                <span
                  :id="`tooltipTarget-competitor-${index}`"
                  class="hover-cursor-pointer"
                >
                  {{ item.vendor_code || '-' }}
                </span>
                <TextOverflowTooltip
                  :target="`tooltipTarget-competitor-${index}`"
                  :title="item.short_name"
                />
              </template>

              <span v-else>
                {{ item.vendor_code || '-' }}
              </span>
            </template>

            <template v-else-if="field.key === 'price'">
              <template v-if="item.price">
                {{ formatSum(item.price, $i18n.locale) }}&nbsp;₽
              </template>

              <template v-else> – </template>
            </template>

            <template v-else-if="field.key === 'quantity'">
              <div class="d-flex justify-content-start">
                <FormSpinbutton
                  v-model="item.quantity"
                  size="sm"
                  class="w-auto"
                />
              </div>
            </template>

            <template v-else-if="field.key === 'vendorCodeEkf'">
              <MastercostTableResultProductSearch
                :vendor-code="
                  hasSelectedAnalog(item)
                    ? item.analogs[item.analog].vendor_code
                    : ''
                "
                :slug="
                  hasSelectedAnalog(item) ? item.analogs[item.analog].slug : ''
                "
                :has-analog="hasSelectedAnalog(item)"
                @selected="($event) => handleChangeAnalog(item, $event)"
              />

              <MastercostAssemblySelect
                v-if="
                  hasSelectedAnalog(item) &&
                  item.analogs[item.analog].assemblies &&
                  item.analogs[item.analog].assembliesLength
                "
                v-model="item.analogs[item.analog].assembly"
                :item="item.analogs[item.analog]"
              />
            </template>

            <template v-else-if="field.key === 'nameEkf'">
              <div
                v-if="
                  item.analogs && item.analogs.length && item.analogs.length < 2
                "
              >
                <span :id="`tooltipTargetName-${index}`" class="name">
                  {{ item.analogs[0].name }}
                </span>
                <TextOverflowTooltip
                  :target="`tooltipTargetName-${index}`"
                  :title="item.analogs[item.analog].name"
                  :placement="'top'"
                />
              </div>

              <MastercostAnalogSelect
                v-else-if="item.analogs && item.analogs.length"
                v-model="item.analog"
                :options="item.analogs"
              />

              <span v-else> – </span>
            </template>

            <template v-else-if="field.key === 'coefficient'">
              <div
                v-if="
                  !item.analogs.length ||
                  !item.analogs[item.analog]?.transportCoefficient
                "
              >
                -
              </div>
              <div v-else>
                <span
                  v-if="
                    CUSTOM_STATUSES.includes(item.analogs[item.analog]?.status)
                  "
                  >{{
                    formatSum(
                      item.analogs[item.analog]?.transportCoefficient,
                      $i18n.locale
                    )
                  }}</span
                >
                <span v-else>{{
                  formatSum(
                    item.analogs[item.analog]?.coefficient,
                    $i18n.locale
                  )
                }}</span>
              </div>
            </template>

            <template v-else-if="field.key === 'priceEkf'">
              <template v-if="hasSelectedAnalog(item)">
                <template v-if="hasSelectedAssembly(item)">
                  {{
                    formatSum(getSelectedAssemblyCost(item), $i18n.locale)
                  }}&nbsp;₽
                </template>

                <template v-else>
                  {{
                    formatSum(item.analogs[item.analog].price, $i18n.locale)
                  }}&nbsp;₽
                </template>
              </template>

              <template v-else> – </template>
            </template>

            <template v-else-if="field.key === 'remove'">
              <b-button
                :title="$t('global.delete')"
                :aria-label="$t('global.delete')"
                variant="link"
                class="text-secondary border-0 rounded-pill p-8"
                @click="removeRow(index)"
              >
                <svg-icon
                  name="close-16"
                  width="16"
                  height="16"
                  aria-hidden="true"
                />
              </b-button>
            </template>
          </b-td>
        </b-tr>

        <template
          v-if="
            item.analogs[item.analog] &&
            item.analogs[item.analog].assembly &&
            item.analogs[item.analog].assemblies[
              item.analogs[item.analog].assembly
            ] &&
            item.analogs[item.analog].assemblies[
              item.analogs[item.analog].assembly
            ].products
          "
        >
          <b-tr :key="`item-${index}-ap-divider`" class="assembly-divider">
            <b-td colspan="4">
              <div class="divider"></div>
            </b-td>
          </b-tr>

          <b-tr
            v-for="(assemblyProduct, apI) in item.analogs[item.analog]
              .assemblies[item.analogs[item.analog].assembly].products"
            :key="`item-${index}-ap-${apI}`"
            class="assembly-product-row"
          >
            <b-td class="vendor-code-ekf-cell text-nowrap">
              <b-link
                :to="
                  localePath(`/catalog/products/${assemblyProduct.vendor_code}`)
                "
                target="_blank"
                class="name text-reset"
              >
                {{ assemblyProduct.vendor_code }}
              </b-link>
            </b-td>

            <b-td class="cell-name">
              <div class="assembly-product-label">
                <span
                  :id="`tooltipTargetApName-${index}-${apI}`"
                  class="assembly-product-name"
                  >{{ assemblyProduct.name }}</span
                >
                <span class="assembly-product-qty"
                  >&#xD7;&nbsp;{{ assemblyProduct.assemblyQty }}</span
                >
              </div>
              <TextOverflowTooltip
                :target="`tooltipTargetApName-${index}-${apI}`"
                :title="assemblyProduct.name"
                :placement="'top'"
              />
            </b-td>

            <b-td class="cell-price">
              {{
                formatSum(
                  assemblyProduct.assemblyQty * assemblyProduct.price,
                  $i18n.locale
                )
              }}&nbsp;₽
            </b-td>

            <b-td class="text-left text-nowrap"> </b-td>
          </b-tr>

          <b-tr :key="`item-${index}-ap-foot`" class="assembly-foot">
            <b-td colspan="4"><div></div></b-td>
          </b-tr>
        </template>
      </b-tbody>
    </b-table-simple>

    <AppPagination
      v-if="items && items.length > perPage"
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="items.length"
      align="right"
      size="sm"
      class="mb-16"
    />
  </div>
</template>

<script>
import {
  BTableSimple,
  BTbody,
  BThead,
  BTr,
  BTd,
  BTh,
  BSpinner,
} from 'bootstrap-vue'
import formatSum from '@/utils/formatSum'
import { CUSTOM_STATUSES } from '~/components/constants/product'

export default {
  components: {
    BTableSimple,
    BTbody,
    BThead,
    BTr,
    BTd,
    BTh,
    BSpinner,
  },

  props: {
    busy: {
      type: Boolean,
      default: false,
    },
    fields: {
      type: Array,
      default() {
        /* _this doesn't work in arrow-style function props */
        return [
          {
            key: 'vendor_code',
            tdClass: 'text-nowrap',
            label: this.$t('calculators.masterCost.labelVendorCode'),
          },
          {
            key: 'price',
            label: this.$t('calculators.masterCost.labelPrice'),
            tdClass: 'cell-price',
          },
          {
            key: 'quantity',
            label: this.$t('calculators.masterCost.labelCount'),
            thClass: 'border-right',
            tdClass: 'border-right cell-form-control cell-count',
          },
          {
            key: 'vendorCodeEkf',
            tdClass: 'vendor-code-ekf-cell text-nowrap',
            label: this.$t('calculators.masterCost.labelVendorCodeEkf'),
          },
          {
            key: 'nameEkf',
            label: this.$t('calculators.masterCost.labelNameEkf'),
            tdClass: 'cell-name',
          },
          {
            key: 'coefficient',
            label: this.$t('calculators.masterCost.labelCoefficient'),
            thClass: 'cell-coefficient',
          },
          {
            key: 'priceEkf',
            label: this.$t('calculators.masterCost.labelPriceEkf'),
            tdClass: 'cell-price',
            thClass: 'text-nowrap',
          },
          {
            key: 'remove',
            label: this.$t('calculators.masterCost.labelCheck'),
            tdClass: 'cell-form-control',
          },
        ]
      },
    },
    items: {
      type: Array,
      default: () => [],
    },
    perPage: {
      type: [Number, String],
      default: 10,
    },
  },

  data() {
    return {
      checkAll: false,
      currentPage: 1,
      selectedRows: [],
      vendorCodeDropdownMenuWidth: null,
      CUSTOM_STATUSES,
    }
  },

  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.perPage
      const end = (this.currentPage - 1) * this.perPage + this.perPage
      return this.items.slice(start, end)
    },
    // perPage() {
    //   return parseInt(this.$route.query.perPage) || 10
    // },
  },

  mounted() {
    this.getDropdownMenuWidth()
  },

  methods: {
    getDropdownMenuWidth() {
      if (!this.vendorCodeDropdownMenuWidth) {
        const vendorCodeCol = document.getElementById('vendorCodeEkf')
        const nameCol = document.getElementById('nameEkf')
        this.vendorCodeDropdownMenuWidth = `${Math.round(
          vendorCodeCol.offsetWidth + nameCol.offsetWidth
        )}px`

        const doc = document.documentElement
        doc.style.setProperty(
          '--mastercost-analog-dropdown-width',
          this.vendorCodeDropdownMenuWidth
        )
      }
    },

    formatSum,

    getSelectedAssemblyCost(item) {
      return (
        item.analogs?.[item.analog]?.assemblies?.[
          item.analogs[item.analog].assembly
        ]?.products?.reduce((sum, ap) => sum + ap.assemblyQty * ap.price, 0) ||
        0
      )
    },

    getRowspan(field, item) {
      return ['vendor_code', 'price', 'quantity'].includes(field.key)
        ? this.hasSelectedAssembly(item)
          ? item.analogs[item.analog].assemblies[
              item.analogs[item.analog].assembly
            ].products.length + 3
          : 1
        : 1
    },

    hasSelectedAnalog(item) {
      return Boolean(
        item.analogs && item.analogs.length && item.analogs[item.analog]
      )
    },

    hasSelectedAssembly(item) {
      return (
        item.analogs?.[item.analog]?.assembly &&
        item.analogs?.[item.analog]?.assemblies?.[
          item.analogs[item.analog].assembly
        ]?.products?.length
      )
    },

    removeAll() {
      this.$emit('remove-all')
    },

    removeRow(index) {
      this.$emit('remove-row', index)
    },

    removeSelected() {
      this.$emit('remove-selected', this.selectedRows)
      this.checkAll = false
      this.currentPage = 1
      this.selectedRows = []
    },

    handleChangeAnalog(row, newAnalog) {
      this.$emit('change', { row, newAnalog })
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  thead th {
    vertical-align: middle;
  }

  tbody {
    &:nth-child(even) {
      background-color: inherit;
    }

    &:nth-child(odd) {
      background-color: $gray-100;
    }
  }

  th,
  td {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .cell-price {
    font-weight: $font-weight-medium;
  }

  .cell-count {
    padding-top: 0.625rem !important;
  }

  .cell-form-control {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
}
</style>

<style lang="scss">
.table.mastercost-table-results {
  .assembly-foot {
    td {
      padding: 0;

      div {
        margin-bottom: 0.875rem;
      }
    }
  }

  .assembly-product-row {
    background-color: inherit;
  }

  .cell-name {
    max-width: 17rem;

    .assembly-product-label {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      .assembly-product-name {
        flex: 1;
        display: block;
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .assembly-product-qty {
        margin-left: 0.5rem;
        font-weight: $font-weight-medium;
      }
    }
  }

  .cell-coefficient {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    max-width: 10.5rem;
  }

  .hover-cursor-pointer {
    &:hover {
      cursor: pointer;
    }
  }

  .vendor-code-ekf-cell {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
  }
}
</style>
