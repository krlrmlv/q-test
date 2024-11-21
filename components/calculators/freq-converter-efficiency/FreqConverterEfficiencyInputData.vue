<template>
  <section class="bg-light py-56 pt-lg-64 px-16 px-lg-96">
    <h5 class="mb-32">{{ $t('inputData') }}</h5>

    <b-row>
      <b-col cols="12" lg="6">
        <b-form-group label-class="pb-8" class="mb-24">
          <template #label>
            <p class="h6 mb-0">{{ $t('applicationArea') }}</p>
          </template>

          <b-form-select v-model="selectedScope" :options="scopeOptions" />
        </b-form-group>
      </b-col>

      <b-col cols="12" lg="6">
        <b-form-group label-class="pb-8" class="mb-24">
          <template #label>
            <p class="h6 mb-0">{{ $t('powerSupply') }}</p>
          </template>

          <b-form-select
            v-model="selectedPower"
            :options="powerOptions"
            @change="handlePowerChange"
          />
        </b-form-group>
      </b-col>

      <b-col cols="12" lg="6">
        <b-form-group label-class="pb-8" class="mb-24">
          <template #label>
            <p class="h6 mb-0">{{ $t('engineSpecs') }}</p>
          </template>

          <b-form-select
            v-model="selectedEngineSpec"
            :options="engineSpecOptions[selectedPower]"
          />
        </b-form-group>
      </b-col>

      <b-col cols="12" lg="6">
        <b-form-group label-class="pb-8" class="mb-24">
          <template #label>
            <p class="h6 mb-0">{{ $t('annualUseHours') }}</p>
          </template>

          <b-form-input
            v-model="averageTime"
            :formatter="averageTimeFormatter"
            :max="maxHoursInYear"
            min="1"
            type="number"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-button
      :disabled="loading"
      variant="primary"
      class="mt-lg-16"
      block
      @click="handleSubmit"
    >
      {{ $t('calculate') }}
      <b-spinner v-if="loading" class="ml-8" small />
    </b-button>

    <b-button
      :disabled="loading"
      variant="link"
      class="mt-lg-16 text-secondary"
      block
      @click="$emit('reset')"
    >
      <svg-icon name="refresh-16" width="16" height="16" class="mr-8" />
      {{ $t('reset') }}
    </b-button>
  </section>
</template>

<script>
import { BFormGroup, BFormInput, BFormSelect, BSpinner } from 'bootstrap-vue'
import { mindboxCalculateCalculator } from '@/utils/mindbox'

const MAX_HOURS_IN_YEAR = 8784 // 24 hrs * 366 days

export default {
  components: {
    BFormGroup,
    BFormInput,
    BFormSelect,
    BSpinner,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      averageTime: 6000,
      maxHoursInYear: MAX_HOURS_IN_YEAR,
      scopeValues: ['0.3', '0.27', '0.33'],
      selectedEngineSpec: null,
      selectedPower: null,
      selectedScope: '0.3',
    }
  },

  computed: {
    engineSpecOptions() {
      const result = this.powerOptions?.reduce((acc, cur) => {
        acc[cur] = []
        return acc
      }, {})

      this.options?.forEach(({ amperage, power, power_supply, text }) => {
        result[power_supply].push({
          text,
          value: {
            power: parseFloat(power),
            amperage: parseFloat(amperage),
          },
        })
      })

      return result
    },

    powerOptions() {
      return Array.from(
        new Set(this.options?.map(({ power_supply }) => power_supply) ?? [])
      )
    },

    scopeOptions() {
      return this.scopeValues?.map((value) => ({
        text: this.$t(`scopes[${value}]`),
        value,
      }))
    },
  },

  watch: {
    options: {
      deep: true,
      immediate: true,
      handler() {
        this.initSelected()
      },
    },
  },

  methods: {
    averageTimeFormatter(event) {
      /* Average time of use per year cannot be less than 1 or more than
       * 24 hours × 366 days (in leap year) */

      if (Number(event) < 1) {
        return 1
      } else if (Number(event) > this.maxHoursInYear) {
        return this.maxHoursInYear
      } else {
        return event
      }
    },

    handlePowerChange() {
      this.selectedEngineSpec =
        this.engineSpecOptions?.[this.selectedPower]?.[0]?.value
    },

    handleSubmit() {
      mindboxCalculateCalculator(this.$t('calculatorName'))

      const formData = {
        average_time: this.averageTime,
        engine_amperage: this.selectedEngineSpec?.amperage ?? null,
        engine_power: this.selectedEngineSpec?.power ?? null,
        power_supply: this.selectedPower,
        scope_of_use_value: this.selectedScope,
      }

      this.$emit('submit', formData)
    },

    initSelected() {
      const defaultOption = this.options?.[0] ?? {}
      const { amperage, power, power_supply } = defaultOption

      this.selectedPower = power_supply
      this.selectedEngineSpec = {
        power: parseFloat(power),
        amperage: parseFloat(amperage),
      }
    },
  },
}
</script>

<i18n>
{
  "en": {
    "annualUseHours": "Annual use hours",
    "applicationArea": "Application area",
    "calculate": "Calculate",
    "calculatorName": "Calculation of economic efficiency from the application frequency converter VECTOR EKF PROXima",
    "engineSpecs": "Engine specs",
    "inputData": "Input data",
    "powerSupply": "Power supply",
    "reset": "Reset",
    "scopes": {
      "0.27": "Compressor",
      "0.3": "Ventilation",
      "0.33": "Pump"
    }
  },
  "ru": {
    "annualUseHours": "Среднее время использования двигателя, ч. в год",
    "applicationArea": "Область использования",
    "calculate": "Рассчитать",
    "calculatorName": "Расчет экономической эффективности от применения преобразователя частоты VECTOR EKF PROXima",
    "engineSpecs": "Характеристики двигателя",
    "inputData": "Входные данные",
    "powerSupply": "Питающая сеть",
    "reset": "Сбросить",
    "scopes": {
      "0.27": "Компрессор",
      "0.3": "Вентиляция",
      "0.33": "Насос"
    }
  }
}
</i18n>
