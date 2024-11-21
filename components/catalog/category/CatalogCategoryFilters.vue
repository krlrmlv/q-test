<template>
  <CatalogOffcanvas
    :show="show"
    :title="$t('filters.title')"
    @close="$emit('close')"
  >
    <CatalogFilterPrice
      :price="price"
      :price-range="priceRange"
      :price-range-available="priceRangeAvailable"
      class="mb-32"
      @update="$emit('price-set', $event)"
    />

    <CatalogFilterCheckbox
      v-for="property in filteredProperties"
      :key="`filter-${property.id}`"
      :cache-key="getCacheKey(property)"
      :property="property"
      :selected="selected"
      class="mb-32"
      @change="$emit('filters-set', $event)"
    />

    <div class="pb-16 pb-md-0">
      <b-button variant="outline-primary" block @click="$emit('reset')">
        {{ $t('filters.resetFilters') }}
      </b-button>
      <b-button
        class="d-md-none"
        variant="primary"
        block
        @click="$emit('close')"
      >
        {{ $t('filters.showResults') }}
      </b-button>
    </div>
  </CatalogOffcanvas>
</template>

<script>
import { parseFiltersObject } from '@/utils/catalog'

export default {
  props: {
    category: {
      type: Object,
      default: () => ({}),
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
    properties: {
      type: Array,
      default: () => [],
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    filteredProperties() {
      const result = []
      this.properties?.forEach(({ name, property, property_values }) => {
        if (name && property && property_values?.length) {
          result.push({
            id: property?.id,
            max_value_length: property?.max_value_length,
            name,
            unit_name: property_values[0]?.unit?.name ?? '',
            values: property_values
              .map(({ value }) => value)
              .sort((a, b) => {
                if (a && b) {
                  if (typeof a === 'string' && typeof b === 'string') {
                    const _a = a.replace(/\s/, '')
                    const _b = b.replace(/\s/, '')
                    return parseFloat(_a) - parseFloat(_b)
                  } else return a.toString().localeCompare(b.toString())
                }
                return a - b
              }),
          })
        }
      })

      const repeatPropertiesObject = {}
      result.forEach((propertyObject) => {
        if (repeatPropertiesObject[propertyObject.name]) {
          repeatPropertiesObject[propertyObject.name].push(propertyObject)
        } else {
          repeatPropertiesObject[propertyObject.name] = [propertyObject]
        }
      })

      for (const [name, propertiesArray] of Object.entries(
        repeatPropertiesObject
      )) {
        if (propertiesArray.length < 2) {
          delete repeatPropertiesObject[name]
        }
      }

      const resultWithoutRepeat = []
      result.forEach((propertyObject, index) => {
        if (!repeatPropertiesObject[propertyObject.name]) {
          resultWithoutRepeat.push(propertyObject)
        }
      })

      // eslint-disable-next-line no-unused-vars
      for (const [name, propertiesArray] of Object.entries(
        repeatPropertiesObject
      )) {
        const propertyObjectRepeated = propertiesArray[0]
        const propertyObjectIdArray = []
        const maxValueLengthArray = []

        let propertyObjectValues = []
        propertiesArray.forEach((propertyObject) => {
          propertyObjectIdArray.push(propertyObject.id)
          propertyObjectValues = propertyObjectValues.concat(
            propertyObject.values
          )
          maxValueLengthArray.push(propertyObject.max_value_length)
        })

        propertyObjectRepeated.max_value_length = Math.max(
          ...maxValueLengthArray
        )
        propertyObjectRepeated.id = propertyObjectIdArray.join('|')
        propertyObjectRepeated.values = [...new Set(propertyObjectValues)]
        resultWithoutRepeat.push(propertyObjectRepeated)
      }

      return resultWithoutRepeat
    },

    selected() {
      return parseFiltersObject(this.$route.query.filters)
    },
  },

  methods: {
    getCacheKey(property) {
      return [
        this.$i18n.locale,
        this.category?.id,
        this.category?.created_at,
        property?.id,
      ].join('::')
    },
  },
}
</script>
