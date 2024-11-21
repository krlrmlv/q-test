<template>
  <div>
    <h5 class="pl-12 mb-32">{{ $t('title') }}</h5>

    <b-table-lite
      :fields="fields"
      :items="items"
      thead-class="d-none"
      borderless
      striped
    >
      <template #cell(key)="{ value }">
        {{ $t(value) }}
      </template>
    </b-table-lite>
  </div>
</template>

<script>
import { BTableLite } from 'bootstrap-vue'

export default {
  components: { BTableLite },

  props: {
    result: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      fields: [
        { key: 'key', label: '' },
        { key: 'value', label: '' },
      ],
      tableKeys: [
        'average_efficiency',
        'average_time',
        'consumption_with_converter',
        'consumption_without_converter',
        'costs_with_converter',
        'costs_without_converter',
        'kwt_price',
      ],
    }
  },

  computed: {
    items() {
      return Object.keys(this.result)
        ?.filter((key) => this.tableKeys.includes(key))
        ?.map((key) => ({
          key,
          value: this.result[key],
        }))
    },
  },
}
</script>

<i18n>
{
  "en": {
    "average_efficiency": "Average usage efficiency of freq converter",
    "average_time": "Average annual engine usage",
    "consumption_with_converter": "Energy consumption using converter, kW*h",
    "consumption_without_converter": "Energy consumption without converter, kW*h",
    "costs_with_converter": "Annual energy consumption cost using converter",
    "costs_without_converter": "Annual energy consumption cost without converter",
    "kwt_price": "Price per kW*h",
    "title": "Technical specifications"
  },
  "ru": {
    "average_efficiency": "Средняя эффективность использования преобразователя частоты, %",
    "average_time": "Среднее время использования двигателя, ч. в год",
    "consumption_with_converter": "Потребление с преобразователем, кВт*ч",
    "consumption_without_converter": "Потребление без преобразователя, кВт*ч",
    "costs_with_converter": "Затраты на электроэнергию с преобразователем, руб. в год",
    "costs_without_converter": "Затраты на электроэнергию без преобразователя, руб. в год",
    "kwt_price": "Цена за кВт*ч, руб",
    "title": "Техническая спецификация"
  }
}
</i18n>
