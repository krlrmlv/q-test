<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h1 class="masterlight-logo h2 d-flex align-items-center">
      <img
        src="/images/calculators/masterlight.svg"
        height="44"
        aria-hidden="true"
        class="mr-8"
      />
      {{ $t('calculators.masterLight.title') }}
    </h1>

    <p class="mb-32 mb-lg-64">
      {{ $t('calculators.masterLight.description') }}
    </p>

    <b-row class="mb-48 mb-lg-64">
      <b-col md="6" lg="5" xl="4" class="mb-16">
        <MasterlightForm
          :form="form"
          :options="options"
          @input="handleFormInput"
        />
      </b-col>
      <b-col md="6" lg="7" offset-xl="1" class="mb-16">
        <MasterlightProduct
          :loading="calculateLoading"
          :product="product"
          class="mb-32"
          @select="handleProductSelect"
          @submit="handleCalculateSubmit"
        />

        <transition name="fade" mode="out-in">
          <MasterlightResult
            v-if="hasResult"
            :pdf-loading="pdfLoading"
            :print-loading="printLoading"
            :products-count="result.products_count"
            @download="handleResultDownload"
            @print="handleResultDownload(true)"
            @submit="handleResultSubmit"
          />
        </transition>
      </b-col>
    </b-row>
    <MasterlightRequestModal v-model="modalVisible" />
  </b-container>
</template>

<script>
import ROOM_LUX_LEVELS_QUERY from '@/graphql/calculators/masterlight/MasterlightRoomLuxLevels'
import ROOM_SAFETY_FACTORS_QUERY from '@/graphql/calculators/masterlight/MasterlightRoomSafetyFactors'
import ROOM_REFLECTION_FACTORS_QUERY from '@/graphql/calculators/masterlight/MasterlightRoomReflectionFactors'
import MASTERLIGHT_CALCULATE_MUTATION from '@/graphql/calculators/masterlight/MasterlightCalculate'
import MASTERLIGHT_PRINT_MUTATION from '@/graphql/calculators/masterlight/MasterlightPrint'
import {
  mindboxViewCalculator,
  mindboxCalculateCalculator,
} from '@/utils/mindbox'

export default {
  async asyncData({ app, $graphql }) {
    const { room_groups } = await $graphql.default.request(
      ROOM_LUX_LEVELS_QUERY,
      { locale: app.i18n.locale }
    )
    const lux = app.i18n.locale === 'ru' ? 'лк' : 'lux'
    const roomLuxLevels =
      room_groups?.map(({ name, rooms }) => ({
        label: name,
        options: rooms.map(({ name, lux_level }) => ({
          text: `${name} - ${parseInt(lux_level) || 0} ${lux}`,
          value: { name, lux_level: parseFloat(lux_level) },
        })),
      })) ?? []

    const { room_safety_factors } = await $graphql.default.request(
      ROOM_SAFETY_FACTORS_QUERY,
      { locale: app.i18n.locale }
    )
    const roomSafetyFactors = room_safety_factors.map(
      ({ id, name, safety_factor }) => ({
        id,
        text: `${name} - ${parseFloat(safety_factor)}`,
        value: { name, safety_factor: parseFloat(safety_factor) },
      })
    )

    const { room_reflection_factors } = await $graphql.default.request(
      ROOM_REFLECTION_FACTORS_QUERY,
      { locale: app.i18n.locale }
    )
    const roomReflectionFactors = room_reflection_factors.map(
      ({
        id,
        ceil_reflection_factor: c,
        walls_reflection_factor: w,
        floor_reflection_factor: f,
      }) => ({
        value: { id, text: `${c} ${w} ${f}` },
        text: `${c} ${w} ${f}`,
      })
    )

    const form = {
      height: 0,
      length: 0,
      width: 0,
      workAreaHeight: 0,
      roomLuxLevel: roomLuxLevels[0]?.options?.[0]?.value,
      roomSafetyFactor: roomSafetyFactors[0].value,
      roomReflectionFactor: roomReflectionFactors[0].value,
    }
    const options = { roomReflectionFactors, roomSafetyFactors, roomLuxLevels }

    return { form, options }
  },

  data() {
    return {
      restApiHost: process.env.REST_API_URL,
      breadcrumbs: [
        { text: 'calculators.title', to: '/calculators' },
        { text: 'calculators.masterLight.title', active: true },
      ],
      calculateLoading: false,
      modalVisible: false,
      pdfLoading: false,
      printLoading: false,
      product: null,
      result: null,
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },

  computed: {
    hasResult() {
      return Boolean(this.result) || this.result === 0
    },

    pdfDate() {
      const now = new Date()
      const datestring = now.toLocaleDateString(this.$i18n.locale, {
        dateStyle: 'medium',
      })
      return `${this.$t('calculators.masterLight.estimateDate')} ${datestring}`
    },

    pdfDescription() {
      return this.$t('calculators.masterLight.description')
    },

    pdfTitle() {
      return this.$t('calculators.masterLight.title')
    },

    tableBody() {
      if (!this.product) return []

      const unitName = this.product.unit_storage?.name || this.$t('units.pc')
      return [
        [
          { content: this.product.name },
          { content: this.product.vendor_code || '—' },
          { content: `${this.result || 0} ${unitName}` },
        ],
      ]
    },

    tableHead() {
      const headStyles = { fillColor: 160 }
      return [
        [
          {
            content: this.$t('calculators.masterLight.fields.name'),
            styles: headStyles,
          },
          {
            content: this.$t('calculators.masterLight.fields.vendorCode'),
            styles: headStyles,
          },
          {
            content: this.$t('calculators.masterLight.fields.quantity'),
            styles: headStyles,
          },
        ],
      ]
    },
  },

  mounted() {
    mindboxViewCalculator(this.$t('pageTitle'))
  },

  methods: {
    handleFormInput(value, field) {
      this.form[field] = value
    },

    handleProductSelect(product) {
      this.product = product
      if (!product) {
        this.result = null
      }
    },

    async handleCalculateSubmit() {
      this.calculateLoading = true
      mindboxCalculateCalculator(this.$t('pageTitle'))

      try {
        const { masterlight_result } = await this.$graphql.default.request(
          MASTERLIGHT_CALCULATE_MUTATION,
          {
            room_length: parseFloat(this.form.length),
            room_width: parseFloat(this.form.width),
            room_height: parseFloat(this.form.height),
            work_area_height: parseFloat(this.form.workAreaHeight),
            reflection_factor_id: this.form.roomReflectionFactor.id,
            safety_factor: this.form.roomSafetyFactor.safety_factor,
            illumination_level: this.form.roomLuxLevel.lux_level,
            product_id: this.product.id,
          }
        )
        this.result = masterlight_result
      } catch (error) {
        let message = error?.response?.errors[0]?.message
        const parsed = this.safeJsonParse(message)
        if (parsed) {
          message = Object.values(parsed)
            .map((m) => m.join(', '))
            .join(', ')
        }
        this.$bvToast.toast(message, {
          title: `${this.$t('global.error')}`,
          toaster: 'b-toaster-bottom-right',
          variant: 'danger',
          autoHideDelay: 5000,
        })
      } finally {
        this.calculateLoading = false
      }
    },
    safeJsonParse(str) {
      try {
        return JSON.parse(str)
      } catch (e) {
        return null
      }
    },
    async handleResultDownload(print = false) {
      try {
        this[`${print ? 'print' : 'pdf'}Loading`] = true
        const { masterlight_print } = await this.$graphql.default.request(
          MASTERLIGHT_PRINT_MUTATION,
          {
            room_length: parseFloat(this.form.length),
            room_width: parseFloat(this.form.width),
            room_height: parseFloat(this.form.height),
            work_area_height: parseFloat(this.form.workAreaHeight),
            room_type: this.form.roomLuxLevel.name,
            room_category: this.form.roomSafetyFactor.name,
            room_reflection_factors: this.form.roomReflectionFactor.text,
            product_name: this.product.name,
            product_vendor_code: this.product.vendor_code,
            product_image: this.product.image,
            products_count: this.result.products_count,
            average_illumination: this.result.average_illumination,
          }
        )
        this[`${print ? 'print' : 'pdf'}Loading`] = false
        if (print) {
          const printWindow = window.open(
            `${this.restApiHost.replace('com/', 'com')}${
              masterlight_print.path
            }`
          )
          printWindow.print()
          printWindow.onafterprint = function () {
            printWindow.close()
          }
        } else
          window.open(
            `${this.restApiHost.replace('com/', 'com')}${
              masterlight_print.path
            }`
          )
      } catch (error) {
        const message = error?.response?.errors[0]?.message
        this.$bvToast.toast(message, {
          title: `${this.$t('global.error')}`,
          toaster: 'b-toaster-bottom-right',
          variant: 'danger',
          autoHideDelay: 5000,
        })
      }
    },

    handleResultSubmit() {
      this.modalVisible = true
    },
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": "MasterLight service — EKF"
  },
  "ru": {
    "pageTitle": "Сервис MasterLight — EKF"
  }
}
</i18n>
