<template>
  <form @submit.stop.prevent="uploadList">
    <h6>{{ $t('calculators.masterCost.vendorCodesList') }}</h6>

    <b-row class="mx-n4">
      <b-col lg="8" xl="9" class="mb-8 mb-lg-0 px-4">
        <b-form-input
          v-model="search"
          :placeholder="$t('calculators.masterCost.vendorCodesList')"
        />
      </b-col>

      <b-col lg="4" xl="3" class="px-4">
        <b-button
          :disabled="!search"
          type="submit"
          variant="outline-primary"
          block
          @click="sendAnalyticsEvents"
        >
          {{ $t('calculators.masterCost.findAnalogs') }}
        </b-button>
      </b-col>
    </b-row>
  </form>
</template>

<script>
import { BFormInput } from 'bootstrap-vue'
import { sendMasterCostNoFound } from '@/utils/ym'

export default {
  components: { BFormInput },

  props: {
    apiUrl: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      search: null,
    }
  },

  methods: {
    sendAnalyticsEvents() {
      this.$ym('reachGoal', 'MASTERCOSTCLICKUPLOADLIST')
      this.$gtm.push({ event: 'btnFindAnalogsMascostDownList' })
    },

    analyticNoFoundVendorCodes(data, filteredVendorCodes) {
      const foundedVendorCodes = new Set(
        data?.map((product) => product?.vendor_code)
      )

      filteredVendorCodes?.forEach((vendor_code) => {
        if (!foundedVendorCodes?.has(vendor_code)) {
          sendMasterCostNoFound(this.$ym, vendor_code, 'list')
        }
      })
    },

    async uploadList() {
      if (!this.search) return

      this.$emit('upload-start')

      const sanitizedSearch = this.search.trim().replace(/[\t\n\s]/gm, ' ')
      const vendorCodes = sanitizedSearch.split(' ').filter((el) => Boolean(el))

      if (vendorCodes?.length) {
        // remove duplicate values
        const filteredVendorCodes = Array.from(new Set(vendorCodes))

        try {
          const { data } = await this.$axios.post(
            `${this.apiUrl}/filter-input`,
            { vendor_codes: filteredVendorCodes }
          )

          this.analyticNoFoundVendorCodes(data, filteredVendorCodes)

          this.updateRows(filteredVendorCodes)
          this.search = null
        } catch (error) {
          this.$emit('upload-error', error.response)
        }
      }
    },

    updateRows(rows) {
      const rowsToSend = rows?.map((row) => {
        return {
          price: null,
          quantity: 1,
          vendor_code: row.vendor_code || row,
        }
      })

      this.$emit('update', rowsToSend, 'list')
    },
  },
}
</script>
