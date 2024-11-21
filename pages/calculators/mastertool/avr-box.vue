<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <b-row class="mb-32 mb-lg-64">
      <b-col lg="8" class="mb-32">
        <h1
          class="h2 mb-32"
          v-html="$t('calculators.masterTool.avrBox.title')"
        />

        <p class="lead mb-32" v-html="$t('description')"></p>
        <b-button
          href="https://ekfgroup.com/uploads/products/0B6A228EBA3DD7BB72D1164D5835BD9A.xlsx"
          variant="primary"
        >
          {{ $t('download') }}
        </b-button>
        <small class="form-text text-muted">
          {{ $t('fileFormat') }}, {{ $t('fileSize') }}
        </small>
      </b-col>
      <b-col lg="4" class="mb-32">
        <img
          :alt="$t('calculators.masterTool.avrBox.title')"
          src="https://ekfgroup.com/uploads/podderzhka/gray-box.jpg"
          class="img-fluid"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mindboxViewCalculator } from '@/utils/mindbox'

export default {
  data() {
    return {
      breadcrumbs: [
        { text: 'calculators.title', to: '/calculators' },
        { text: 'calculators.masterTool.title', to: '/calculators/mastertool' },
        { text: 'calculators.masterTool.avrBox.title', active: true },
      ],
    }
  },
  head() {
    return {
      title: `${this.$t('calculators.masterTool.avrBox.title')} — EKF`,
    }
  },
  mounted() {
    mindboxViewCalculator(this.$t('calculators.masterTool.avrBox.title'))
  },
}
</script>

<i18n>
{
  "en": {
    "description": "In&nbsp;the&nbsp;configurator, a&nbsp;shell is selected for&nbsp;installing a&nbsp;block ATS (automatic transfer switch)&nbsp;– ATS ТСР1 and&nbsp;ATS ТСМ. For&nbsp;the&nbsp;calculation, it is enough to&nbsp;indicate the&nbsp;dimensions of&nbsp;the&nbsp;device.",
    "download": "Download configurator",
    "fileFormat": "XLSX file",
    "fileSize": "20 KB"
  },
  "ru": {
    "description": "В&nbsp;конфигураторе подбирается оболочка для&nbsp;установки блочного АВР (автоматического ввода резерва)&nbsp;– АВР ТСР1 и&nbsp;АВР ТСМ. Для&nbsp;расчета достаточно указать габариты устройства.",
    "download": "Скачать конфигуратор",
    "fileFormat": "Файл XLSX",
    "fileSize": "20 КБ"
  }
}
</i18n>
