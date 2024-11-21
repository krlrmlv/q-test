<template>
  <div class="mastercost-wrapper">
    <b-row class="flex-lg-nowrap">
      <b-col cols="12" lg="auto" class="flex-lg-fill">
        <nav class="nav-tabs-scrollable">
          <ul class="nav nav-tabs nav-justified" role="tablist">
            <li class="nav-item" role="presentation">
              <b-link
                :aria-selected="tabIndex === 0 ? true : false"
                :class="{ active: tabIndex === 0 }"
                role="tab"
                class="nav-link"
                @click="tabIndex = 0"
              >
                {{ $t('calculators.masterCost.searchManually') }}
              </b-link>
            </li>

            <li class="nav-item" role="presentation">
              <b-link
                :aria-selected="tabIndex === 1 ? true : false"
                :class="{ active: tabIndex === 1 }"
                role="tab"
                class="nav-link"
                @click="tabIndex = 1"
              >
                {{ $t('calculators.masterCost.searchFromFile') }}
              </b-link>
            </li>

            <li class="nav-item" role="presentation">
              <b-link
                :aria-selected="tabIndex === 2 ? true : false"
                :class="{ active: tabIndex === 2 }"
                role="tab"
                class="nav-link"
                @click="tabIndex = 2"
              >
                {{ $t('calculators.masterCost.searchFromList') }}
              </b-link>
            </li>
          </ul>
        </nav>
      </b-col>

      <b-col v-if="showDownloadButton" cols="12" lg="auto">
        <nav>
          <ul class="nav nav-tabs nav-justified" role="tablist">
            <li class="nav-item" role="presentation">
              <MastercostBtnDownload
                icon="download-24"
                class="nav-link font-weight-medium"
              />
            </li>
          </ul>
        </nav>
      </b-col>
    </b-row>

    <transition-group tag="div" name="custom-tabs" class="tab-content">
      <div
        v-show="tabIndex === 0"
        key="tab-0"
        :class="{ active: tabIndex === 0 }"
        :aria-hidden="tabIndex !== 0 ? true : false"
        role="tabpanel"
        class="tab-pane pt-32"
      >
        <MastercostTabSearchManual :loading="loading" @update="addRows" />
      </div>

      <div
        v-show="tabIndex === 1"
        key="tab-1"
        :class="{ active: tabIndex === 1 }"
        :aria-hidden="tabIndex !== 1 ? true : false"
        role="tabpanel"
        class="tab-pane pt-32"
      >
        <MastercostTabSearchFromFile
          :api-url="internalApi"
          @update="addRows"
          @upload-start="handleUploadStart"
          @upload-error="handleUploadError"
        />
      </div>

      <div
        v-show="tabIndex === 2"
        key="tab-2"
        :class="{ active: tabIndex === 2 }"
        :aria-hidden="tabIndex !== 2 ? true : false"
        role="tabpanel"
        class="tab-pane pt-32"
      >
        <MastercostTabSearchFromList
          :api-url="internalApi"
          @update="addRows"
          @upload-start="handleUploadStart"
          @upload-error="handleUploadError"
        />
      </div>
    </transition-group>

    <transition name="fade" mode="out-in">
      <div v-if="results && results.length">
        <LazyMastercostTableResults
          :busy="loading"
          :items="results"
          :per-page="perPage"
          class="my-32"
          @remove-all="deleteModalVisible = true"
          @remove-row="removeRow"
          @change="handleChangeResultItem"
        />

        <InfoBlock v-if="hasProductsToOrder" class="mcost-info-block mb-64">
          <span v-html="infoMessage" />
        </InfoBlock>

        <LazyMastercostSearchSummary
          :items="results"
          class="mt-40"
          @add-to-cart="addResultToCart"
          @delete-results="deleteModalVisible = true"
          @save="saveResultToFile"
          @set-loading="loading = $event"
          @submit-project="submitResultAsProject"
        />
      </div>

      <div v-else-if="loading" class="mt-3 text-center">
        <b-spinner variant="primary" />
      </div>
    </transition>

    <b-modal v-model="deleteModalVisible" centered hide-footer hide-header>
      <template #default="{ close }">
        <h5 class="text-center mb-32">{{ $t('deleteMessage') }}</h5>

        <div class="text-center">
          <b-button variant="primary" @click="removeAll(close)">
            <svg-icon
              name="trash-24"
              width="24"
              height="24"
              class="mr-8"
              aria-hidden="true"
            />

            {{ $t('delete') }}
          </b-button>
        </div>

        <b-button
          variant="white"
          size="sm"
          class="btn-icon modal-close text-secondary rounded-pill"
          @click="close"
        >
          <span class="sr-only">{{ $t('cancel') }}</span>

          <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
        </b-button>
      </template>
    </b-modal>

    <!--    <MastercostSubmitProjectModal-->
    <!--      v-model="modalVisible"-->
    <!--      :api-url="internalApi"-->
    <!--      :items="results"-->
    <!--    />-->
  </div>
</template>

<script>
import { BSpinner, BModal } from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import { CUSTOM_STATUSES } from '~/components/constants/product'

import MASTERCOST_PRODUCTS_WITH_ASSEMBLIES from '@/graphql/calculators/mastercost/ProductsWithAssemblies'
import sendToMindbox, { mindboxCalculateCalculator } from '@/utils/mindbox'
import { sendMasterCostFound, sendMasterCostNoFound } from '@/utils/ym'

export default {
  components: { BSpinner, BModal },

  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    showDownloadButton: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      deleteModalVisible: false,
      hasProductsToOrder: false,
      internalApi: `${process.env.REST_API_URL}/ekfgroup/programs/master-cost`,
      loading: false,
      modalVisible: false,
      perPage: 30,
      products: {},
      results: [],
      rows: [],
      tabIndex: 0,
    }
  },

  computed: {
    ...mapGetters('cart', ['cartProducts']),

    infoMessage() {
      const message = this.$t('calculators.masterCost.infoMessage')

      return message
        .replace(
          '911@ekf.su',
          '<a href="mailto:911@ekf.su" class="info-message-link">911@ekf.su</a>'
        )
        .replace(
          '8 800 333-88-15',
          '<a href="tel:88003338815" class="info-message-link info-message-link-phone">8 800 333-88-15</a>'
        )
    },
  },

  watch: {
    results: {
      deep: true,
      handler(newVal) {
        const mindboxProductList = []

        this.hasProductsToOrder = false
        newVal?.forEach((product) => {
          this.hasProductToOrder(product?.analogs)

          /** Build array for sending to minbox */
          mindboxProductList.push({
            product: {
              ids: {
                eKFGroup: product?.analogs[0]?.id,
              },
            },
            count: product?.quantity,
          })
        })
        sendToMindbox('EKFGroup.SetAnalogList', {
          productList: mindboxProductList,
        })
      },
    },
  },

  mounted() {
    if (this.$route.path === '/ru/view/distributor') {
      this.tabIndex = 0
    }
  },

  created() {
    if (this.collapsed) this.tabIndex = -1
  },

  methods: {
    ...mapActions('cart', ['cartUpsertBulk', 'fetchCart']),

    hasProductToOrder(analogs) {
      analogs?.some((analog) => {
        if (CUSTOM_STATUSES.includes(analog.status)) {
          this.hasProductsToOrder = true
          return true
        }
        return false
      })
    },
    async addResultToCart() {
      this.loading = true

      /* Get cart contents */
      await this.fetchCart()

      const products = this.results
        /* Filter out results with no analogs found */
        ?.filter(({ analogs }) => Boolean(analogs?.length))
        /* Get product ids & quantity for currently selected analogs */
        ?.map(({ analog, analogs, quantity }) => ({
          product_id: analogs[analog]?.id,
          quantity: this.quantityByCoefficient(
            quantity,
            parseInt(analogs[analog]?.coefficient, 10)
          ),
        }))
        /* Sum quantity for all rows with same product ids... */
        ?.reduce((acc, cur) => {
          const found = acc.find(
            ({ product_id }) => product_id === cur.product_id
          )
          if (found) {
            found.quantity += cur.quantity
          } else {
            /* ...then check if product is already in cart, add quantity if it is */
            const foundInCart = this.cartProducts.find(
              ({ id }) => id === cur.product_id
            )
            cur.quantity += parseInt(foundInCart?.cart?.quantity || 0)
            acc.push(cur)
          }
          return acc
        }, [])

      if (products?.length) {
        const source = 'Калькулятор - MasterCost'
        await this.$store.dispatch('cart/cartUpsertBulk', {
          products,
          source,
        })

        this.$bvToast.toast(this.$t('calculators.masterCost.addedToCart'), {
          title: this.$t('global.success'),
          toaster: 'b-toaster-bottom-right',
          variant: 'success',
          autoHideDelay: 5000,
        })

        this.$gtm.push({ event: 'ClAddToBasketMascost' })
      } else {
        this.$bvToast.toast(this.$t('calculators.masterCost.nothingToCart'), {
          title: this.$t('global.warning'),
          toaster: 'b-toaster-bottom-right',
          variant: 'warning',
          autoHideDelay: 5000,
        })
      }

      this.loading = false
    },

    async fetchProducts() {
      let vendorCodes = []

      this.results.forEach((item) => {
        if (item.vendor_code && item.brand) {
          vendorCodes.push(item.vendor_code)
        }
        if (item.analogs?.length) {
          item.analogs.forEach((analog) => {
            if (analog.vendor_code) {
              vendorCodes.push(analog.vendor_code)
            }
          })
        }
      })

      vendorCodes = Array.from(new Set(vendorCodes))

      const { products } = await this.$graphql.default.request(
        MASTERCOST_PRODUCTS_WITH_ASSEMBLIES,
        { vendorCodes, locale: this.$i18n.locale }
      )

      if (products?.length) {
        products.forEach((product) => {
          if (!this.products[product.vendor_code]) {
            this.products[product.vendor_code] = product
          }
        })
      }

      this.mergeResults()
    },

    async saveResultToFile() {
      try {
        const { data } = await this.$axios.post(`${this.internalApi}/export`, {
          analogs: this.results,
        })

        const link = document.createElement('a')

        link.href = data.link
        link.setAttribute('download', data.name)
        document.body.appendChild(link)

        link.click()
      } catch (error) {
        this.handleError(error)
      }
    },

    addRows(rows, source) {
      /** Source is used only for analytic events
       *  source = 'manual' | 'excel' | 'list'
       */

      mindboxCalculateCalculator('MasterCost')

      const filteredRows = rows
        ?.filter(({ vendor_code, name }) => vendor_code || name)
        ?.map((row) => ({
          ...row,
          vendor_code: row.vendor_code?.toString().trim() || '',
          name: row.name?.toString().trim() || '',
        }))

      if (filteredRows?.length) {
        this.loading = true
        this.getAnalogs(filteredRows, source)
      } else {
        this.loading = false
      }
    },

    chunk(arr, size) {
      const newArray = []

      for (let i = 0; i < arr.length; i += size) {
        newArray.push(arr.slice(i, i + size))
      }

      return newArray
    },

    deleteArrayDuplicates(arr, prop) {
      const map = {}

      arr.forEach((item) => {
        if (!map[item[prop]]) map[item[prop]] = item
      })

      return Object.values(map)
    },

    getAnalogs(inputRows, source) {
      const rowsCount = inputRows.length
      const chunkSize = rowsCount <= 600 ? 30 : Math.ceil(rowsCount / 20)

      let filledChunks = 0
      const mergedChunks = []
      const inputChunks = this.chunk(inputRows, chunkSize)

      inputChunks.forEach(async (chunk, index) => {
        try {
          const response = await this.$axios.post(
            `${this.internalApi}/analogs`,
            { rows: chunk }
          )

          Object.values(response.data).forEach((result) => {
            if (!mergedChunks[index]) mergedChunks[index] = []
            mergedChunks[index].push(result)

            /** Ananlytic events */
            result?.analogs?.length
              ? sendMasterCostFound(this.$ym, result?.vendor_code, source)
              : sendMasterCostNoFound(this.$ym, result?.vendor_code, source)
          })

          filledChunks++

          if (inputChunks.length === filledChunks) {
            const result = this.deleteArrayDuplicates(
              mergedChunks.flat(),
              'vendor_code'
            )
            this.results.push(...result)
            await this.fetchProducts()
            this.loading = false
          }
        } catch (error) {
          this.handleError(error)
          this.loading = false
        }
      })
    },

    handleError(error) {
      const status = error?.response?.status
      const message = error?.response?.data?.message

      this.$bvToast.toast(message, {
        title: `${this.$t('global.error')} ${status}`,
        toaster: 'b-toaster-bottom-right',
        variant: 'danger',
        autoHideDelay: 5000,
      })
    },

    handleUploadError(error) {
      this.handleError(error)
      this.loading = false
    },

    handleUploadStart() {
      this.loading = true
    },

    mergeResults() {
      this.results = this.results.map((result) => ({
        ...result,
        analogs:
          result?.analogs?.map((analog) => {
            const prod = this.products?.[analog?.vendor_code] || null

            return {
              ...analog,
              id: prod?.id || null,
              parent_id: prod?.parent_id || null,
              price: Math.round(parseFloat(analog.price)),
              assembly: null,
              status: prod?.status,
              coefficient: prod?.coefficient,
              transportCoefficient: prod?.unit_transport_packaging?.coefficient,
              ...this.getProductAssemblies(prod),
            }
          }) ?? [],
      }))

      this.sendAnalogsToGtm()
    },

    getProductAssemblies(product) {
      let assembliesLength = 0
      const assemblies = {}

      product?.assemblies?.forEach((asm) => {
        assemblies[asm.id] = {
          id: asm.id,
          name: asm.name,
          is_main: asm.is_main,
          products: asm.products.map(({ qty: assemblyQty, product }) => {
            const asm_pr_price = parseFloat(product?.price_base) || 0
            return {
              id: product?.id || null,
              parent_id: product?.parent_id || null,
              vendor_code: product?.vendor_code || '-',
              name: product?.name || '-',
              image: product?.images?.[0]?.file || null,
              unit: product?.unitStorage?.name || '-',
              multiplicity: parseFloat(product?.multiplicity) || 1,
              price: asm_pr_price,
              status: product?.status,
              coefficient: product?.coefficient,
              transportCoefficient:
                product?.unit_transport_packaging?.coefficient,
              assemblyQty,
            }
          }),
        }
        assembliesLength++
      })

      return {
        assembliesLength,
        assemblies,
      }
    },

    quantityByCoefficient(quantity, coefficient = 1) {
      if (coefficient <= 1) return quantity
      return Math.ceil(quantity / coefficient) * coefficient
    },

    removeAll(callback) {
      if (typeof callback === 'function') {
        callback()
      }

      this.results = []
    },

    removeRow(index) {
      this.results.splice(index, 1)
    },

    removeRows(rows) {
      const filteredResults = []

      this.results.forEach((result, index) => {
        if (!rows.includes(index)) filteredResults.push(result)
      })

      this.results = filteredResults
    },

    replaceRows(rows) {
      this.results = []
      this.getAnalogs(rows)
    },

    handleChangeResultItem({ row, newAnalog }) {
      this.results = this.results.map((result) => {
        if (result.vendor_code === row.vendor_code) {
          const analog = {
            ...newAnalog,
            transportCoefficient:
              newAnalog?.unit_transport_packaging?.coefficient,
            id: newAnalog?.id || null,
            parent_id: newAnalog?.parent_id || null,
            price: Math.round(parseFloat(newAnalog.price)),
            assembly: null,
            ...this.getProductAssemblies(newAnalog),
          }
          return {
            ...result,
            analog: 0,
            analogs: [analog],
          }
        } else {
          return result
        }
      })
    },

    sendAnalogsToGtm() {
      const analogs = this.results.map(({ vendor_code, analogs }) => ({
        vendorAnalog: vendor_code,
        vendorEKF: analogs?.[0]?.vendor_code,
      }))

      this.$gtm.push({ event: 'ResearchAnalogs', analogs })
    },

    submitResultAsProject() {
      this.modalVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
$file-upload-icon: url('data:image/svg+xml,<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.4697 2.46967H12.5303L18.0607 8L17 9.06066L12.75 4.81066V15.75H11.25V4.81066L7 9.06066L5.93934 8L11.4697 2.46967ZM2.25 20.25H21.75V21.75H2.25V20.25Z" fill="#{$secondary}"/></svg>');

.mastercost-wrapper {
  ::v-deep {
    .custom-file {
      .custom-file-label::before {
        background-image: escape-svg($file-upload-icon);
      }
    }
  }
}

.mcost-info-block {
  ::v-deep {
    .info-text {
      color: $gray-800 !important;
    }
    .info-message-link {
      color: inherit;
      border-bottom: 1px solid currentColor;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "delete": "Clear",
    "cancel": "Cancel",
    "deleteMessage": "Are you sure you want to clear the content?"
  },
  "ru": {
    "delete": "Очистить",
    "cancel": "Отмена",
    "deleteMessage": "Вы уверены что хотите очистить содержимое?"
  }
}
</i18n>
