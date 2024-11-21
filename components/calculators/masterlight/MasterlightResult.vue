<template>
  <div class="masterlight-result">
    <div class="mb-32">
      <p class="fs-4 text-md-right mb-0">
        {{ $t('calculators.masterLight.result') }}:
        <span class="h4 mb-0"
          >{{ productsCount }}&nbsp;{{
            getDeclension(
              productsCount,
              $t('calculators.masterLight.lampsDeclensions')
            )
          }}</span
        >
      </p>
    </div>
    <b-row align-v="center" class="flex-lg-nowrap mx-xl-n16">
      <b-col cols="12" lg="auto" order-lg="2" class="px-xl-16 mb-16">
        <b-button
          :disabled="loading"
          size="lg"
          variant="primary"
          class="btn-submit"
          block
          @click="$emit('submit')"
        >
          {{ $t('global.sendRequest') }}
        </b-button>
      </b-col>
      <b-col cols="12" lg="auto" order-lg="1" class="ml-lg-auto px-xl-16">
        <b-row align-v="center">
          <b-col cols="12" lg="auto" class="mb-16">
            <b-button
              :disabled="loading"
              variant="link"
              @click="$emit('download')"
            >
              <div v-if="pdfLoading" class="spinner-wrapper mr-8">
                <b-spinner small />
              </div>
              <svg-icon
                v-else
                name="file/pdf-24"
                width="24"
                height="24"
                class="mr-8"
                aria-hidden="true"
              />
              {{ $t('calculators.masterLight.downloadPdf') }}
            </b-button>
          </b-col>
          <b-col cols="12" lg="auto" class="mb-16">
            <b-button
              :disabled="loading"
              variant="link"
              @click="$emit('print')"
            >
              <div v-if="printLoading" class="spinner-wrapper mr-8">
                <b-spinner small />
              </div>
              <svg-icon
                v-else
                name="print-24"
                width="24"
                height="24"
                class="mr-8"
                aria-hidden="true"
              />
              {{ $t('global.print') }}
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import getDeclension from '@/utils/declension'

export default {
  components: { BSpinner },
  props: {
    pdfLoading: {
      type: Boolean,
      default: false,
    },
    printLoading: {
      type: Boolean,
      default: false,
    },
    productsCount: {
      type: Number,
      default: null,
    },
  },
  computed: {
    loading() {
      return this.pdfLoading || this.printLoading
    },
  },

  methods: {
    getDeclension,
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .btn-link {
    padding: 0;
    border: none;
    color: $secondary;
  }
}

.spinner-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px; /* same size as icon */
  height: 24px;
}

@include media-breakpoint-down(lg) {
  .btn-submit {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
}
</style>
