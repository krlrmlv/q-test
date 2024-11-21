<template>
  <form @submit.stop.prevent="addRow">
    <h6>{{ $t('calculators.masterCost.addNextVendorCode') }}</h6>

    <b-row class="mx-n4">
      <b-col md="6" lg="3" xl="3" class="mb-8 mb-lg-0 px-4">
        <b-form-input
          v-model="search.vendor_code"
          :disabled="loading"
          :placeholder="$t('calculators.masterCost.otherVendorCode')"
          @paste="handlePaste"
        />
      </b-col>

      <b-col md="6" lg="3" xl="4" class="mb-8 mb-lg-0 px-4">
        <b-form-input
          v-model="search.name"
          :disabled="loading"
          :placeholder="$t('calculators.masterCost.otherName')"
        />
      </b-col>

      <b-col md="6" lg="2" xl="2" class="mb-8 mb-lg-0 px-4">
        <b-form-input
          v-model="search.price"
          :disabled="loading"
          :placeholder="$t('calculators.masterCost.itemPrice')"
          type="number"
          class="no-appearance"
        />
      </b-col>

      <b-col md="6" lg="4" xl="3" class="mb-8 mb-lg-0 px-4">
        <b-row class="mx-n4">
          <b-col cols="auto" class="px-4">
            <FormSpinbutton v-model="search.quantity" :disabled="loading" />
          </b-col>

          <b-col cols="auto" class="flex-fill px-4">
            <b-button
              :disabled="loading || isEmptySearchData"
              type="submit"
              variant="outline-primary"
              block
              @click="sendAnalyticsEvents"
            >
              {{ $t('calculators.masterCost.findAnalog') }}
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </form>
</template>

<script>
import { BFormInput } from 'bootstrap-vue'

export default {
  components: { BFormInput },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      rows: [],
      search: {
        vendor_code: null,
        name: null,
        price: null,
        quantity: 1,
      },
    }
  },

  computed: {
    isEmptySearchData() {
      return !this.search?.vendor_code?.trim() && !this.search?.name?.trim()
    },
  },

  methods: {
    addRow() {
      this.rows = [this.search]
      this.updateRows()
    },

    handlePaste(event) {
      event.preventDefault()

      const text = event?.clipboardData?.getData('text/plain') ?? ''
      const arrayText = this.textToArray(text)

      if (arrayText && arrayText.length) {
        /* Do not update automatically if only one line is pasted */
        if (arrayText.length > 1) {
          arrayText.forEach((row) => {
            this.rows.push({
              vendor_code: row[0] || '',
              name: row[1] || '',
              price: row[2] || 0,
              quantity: parseInt(row[3], 10) || 1,
            })
          })

          this.updateRows()
        } else {
          const row = arrayText[0]
          const words = row.filter((word) => word.length)

          if (words.length === 1) {
            this.search.vendor_code = words[0]
          } else if (words.length > 1) {
            this.search.vendor_code = row[0]
            this.search.name = row[1]
            this.search.price = row[2] || 0
            this.search.quantity = parseInt(row[3], 10) || 1
          }
        }
      }
    },

    sendAnalyticsEvents() {
      this.$ym('reachGoal', 'MASTERCOSTCLICKSEARCHMANUALLY')
      this.$gtm.push({ event: 'btnFindAnalogsMascostmanually' })
    },

    textToArray(str) {
      return str
        .split('\n')
        .filter((row) => row.replace(/\s/g, '').length)
        .map((row) => row.split('\t').map((c) => c.trim()))
    },

    updateRows() {
      this.$emit('update', this.rows, 'manual')

      this.rows = []

      this.search = {
        vendor_code: null,
        name: null,
        price: null,
        quantity: 1,
      }
    },
  },
}
</script>
