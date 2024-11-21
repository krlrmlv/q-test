<template>
  <div class="catalog-filter">
    <p class="h7">
      {{ $t('global.price') }}
    </p>

    <FormRangeMultiple
      :available-range="priceRangeAvailable"
      :debounce="debounce"
      :disabled="disabled"
      :range="priceRange"
      :value="localPrice"
      class="mb-16"
      @change="$emit('change', $event)"
      @change-by-user="lastUserChangedPrice = $event"
    />

    <b-row :key="`price-input-filter-key-${key}`" class="mx-n8">
      <b-col cols="6" class="px-8">
        <b-form-input
          :disabled="disabled"
          :value="formattedMin"
          size="sm"
          class="no-appearance"
          lazy
          @change="setLocalMinByUser"
        />
      </b-col>
      <b-col cols="6" class="px-8">
        <b-form-input
          :disabled="disabled"
          :value="formattedMax"
          size="sm"
          class="no-appearance"
          lazy
          @change="setLocalMaxByUser"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BFormInput } from 'bootstrap-vue'
import { mapActions } from 'vuex'
import formatSum from '@/utils/formatSum'

export default {
  components: { BFormInput },

  props: {
    debounce: {
      type: [Number, String],
      default: 300,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
    priceRange: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
    priceRangeAvailable: {
      type: Object,
      default: () => ({ min: null, max: null }),
    },
  },

  data() {
    return {
      key: 0,
      lastUserChangedPrice: null,
      localPrice: {
        min: null,
        max: null,
      },
    }
  },

  computed: {
    formattedMin() {
      return `${formatSum(this.localPrice.min, this.$i18n.locale)} ₽`
    },

    formattedMax() {
      return `${formatSum(this.localPrice.max, this.$i18n.locale)} ₽`
    },
  },

  watch: {
    priceRangeAvailable: 'priceRangeAvailableChanged',

    lastUserChangedPrice: 'updatePrice',

    price: {
      deep: true,
      handler(event) {
        this.localPrice.min = this.getValidMin(event.min, event.max)
        this.localPrice.max = this.getValidMax(event.max, event.min)
      },
    },
  },

  created() {
    this.localPrice.min = this.getValidMin(this.price.min, this.price.max)
    this.localPrice.max = this.getValidMax(this.price.max, this.price.min)
  },

  methods: {
    ...mapActions('category', ['setPrice']),

    priceRangeAvailableChanged() {
      if (
        this.priceRangeAvailable &&
        typeof this.priceRangeAvailable.min === 'number' &&
        this.priceRangeAvailable.min >= parseInt(this.priceRange.min)
      ) {
        if (
          this.lastUserChangedPrice &&
          typeof this.lastUserChangedPrice.min === 'number' &&
          this.lastUserChangedPrice.min > this.priceRangeAvailable.min
        ) {
          this.localPrice.min = this.lastUserChangedPrice.min
        } else this.localPrice.min = this.priceRangeAvailable.min
      }

      if (
        this.priceRangeAvailable &&
        typeof this.priceRangeAvailable.max === 'number' &&
        this.priceRangeAvailable.max <= parseInt(this.priceRange.max)
      ) {
        if (
          this.lastUserChangedPrice &&
          typeof this.lastUserChangedPrice.max === 'number' &&
          this.lastUserChangedPrice.max < this.priceRangeAvailable.max
        ) {
          this.localPrice.max = this.lastUserChangedPrice.max
        } else this.localPrice.max = this.priceRangeAvailable.max
      }
    },

    getValidMax(newValue, min = null) {
      let max = this.valToInt(newValue)
      if (typeof max !== 'number' || max > parseInt(this.priceRange.max))
        max = parseInt(this.priceRange.max)
      if (
        this.priceRangeAvailable &&
        typeof this.priceRangeAvailable.min === 'number' &&
        this.priceRangeAvailable.max < parseInt(this.priceRange.max) &&
        max > this.priceRangeAvailable.max
      ) {
        max = this.priceRangeAvailable.max
      }
      const currentMin =
        min !== null ? this.valToInt(min) : this.valToInt(this.localPrice.min)
      if (typeof currentMin === 'number' && currentMin > max) max = currentMin
      return max
    },

    getValidMin(newValue, max = null) {
      let min = this.valToInt(newValue)
      if (typeof min !== 'number' || min < parseInt(this.priceRange.min))
        min = parseInt(this.priceRange.min)
      if (
        this.priceRangeAvailable &&
        typeof this.priceRangeAvailable.min === 'number' &&
        this.priceRangeAvailable.min > parseInt(this.priceRange.min) &&
        min < this.priceRangeAvailable.min
      ) {
        min = this.priceRangeAvailable.min
      }
      const currentMax =
        max !== null ? this.valToInt(max) : this.valToInt(this.localPrice.max)
      if (typeof currentMax === 'number' && currentMax < min) min = currentMax
      return min
    },

    rerender(oldVal, newVal) {
      if (oldVal !== newVal) {
        setTimeout(() => this.key++, this.debounce)
      }
    },

    setLocalMaxByUser(newValue) {
      const max = this.getValidMax(newValue)
      const oldMax = this.valToInt(this.localPrice.max)
      this.localPrice.max = max
      this.rerender(oldMax, max)
      this.lastUserChangedPrice = {
        min: this.localPrice.min,
        max: this.localPrice.max,
      }
    },

    setLocalMinByUser(newValue) {
      const min = this.getValidMin(newValue)
      const oldMin = this.valToInt(this.localPrice.min)
      this.localPrice.min = min
      this.rerender(oldMin, min)
      this.lastUserChangedPrice = {
        min: this.localPrice.min,
        max: this.localPrice.max,
      }
    },

    updatePrice(event) {
      const max = event?.max ?? this.priceRange?.max
      const min = event?.min ?? this.priceRange?.min
      this.$emit('update', { max, min })
    },

    valToInt(value) {
      return value
        ? typeof value === 'string'
          ? parseInt(value.replace(/[\s\n\t₽]/g, ''))
          : parseInt(value)
        : null
    },
  },
}
</script>
