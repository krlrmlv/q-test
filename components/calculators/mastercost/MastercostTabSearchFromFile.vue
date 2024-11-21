<template>
  <form @submit.stop.prevent="uploadFile">
    <h6>{{ $t('calculators.masterCost.uploadFileHint') }}</h6>

    <b-row class="mx-n4">
      <b-col lg="4" xl="3" class="mb-8 mb-xl-0 px-4">
        <b-button
          :href="`/files/${$t('calculators.masterCost.templateFile')}`"
          variant="gray-200"
          block
        >
          <svg-icon
            name="download-24"
            width="24"
            height="24"
            class="text-secondary mr-8"
            aria-hidden="true"
          />
          {{ $t('calculators.masterCost.downloadTemplate') }}
        </b-button>
      </b-col>

      <b-col lg="8" xl="6" class="mb-8 mb-xl-0 px-4">
        <FormFile
          v-model="file"
          :browse-text="$t('calculators.masterCost.uploadFile')"
          accept=".xls, .xlsx"
        />
      </b-col>

      <b-col xl="3" class="px-4">
        <b-button
          :disabled="!file || loading"
          type="submit"
          variant="outline-primary"
          block
          @click="sendAnalyticsEvents"
        >
          {{ $t('calculators.masterCost.findAnalogs') }}
          <b-spinner v-if="loading" variant="gray-200" class="ml-3" />
        </b-button>
      </b-col>
    </b-row>
  </form>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {
  components: { BSpinner },

  props: {
    apiUrl: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      file: null,
      loading: false,
    }
  },

  methods: {
    sendAnalyticsEvents() {
      this.$ym('reachGoal', 'MASTERCOSTCLICKUPLOADFILE')
      this.$gtm.push({ event: 'btnFindAnalogsMascostDownExcel' })
    },
    async uploadFile() {
      if (!this.file) return

      const formData = new FormData()
      formData.append('table', this.file)

      this.loading = true
      this.$emit('upload-start')

      try {
        const headers = { 'Content-Type': 'multipart/form-data' }

        const { data } = await this.$axios.post(
          `${this.apiUrl}/upload`,
          formData,
          { headers }
        )

        this.updateRows(data)
      } catch (error) {
        this.$emit('upload-error', error.response)
      }

      this.file = null
      this.loading = false
    },

    updateRows(rows) {
      const rowsToSend = []

      rows.forEach((row) => {
        rowsToSend.push({
          vendor_code: row[0] || '',
          name: row[1] || '',
          price: row[2] || 0,
          quantity: parseInt(row[3], 10) || 0,
        })
      })

      this.$emit('update', rowsToSend, 'excel')
    },
  },
}
</script>
