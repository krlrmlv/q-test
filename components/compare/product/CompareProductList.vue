<template>
  <div class="compare-products">
    <CompareRow
      :max-offset="maxOffset"
      :offset="offset"
      show-navigation
      sticky
      @slide-next="handleSlideNext"
      @slide-prev="handleSlidePrev"
    >
      <CompareProductDescription
        v-for="product in products"
        :key="product.id"
        :product="product"
        @delete-product="$emit('delete-product', $event)"
      />
    </CompareRow>

    <!-- <CompareRow :offset="offset">
      <CompareProductRating
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </CompareRow> -->

    <b-container fluid="xl" class="pt-20 mb-16">
      <CompareControls
        :disabled="controlsDisabled"
        :value="showDifferent"
        @input="$emit('set-show-different', $event)"
      />
    </b-container>

    <CompareRow
      v-for="property in filteredProperties"
      :key="`row-${property.id}`"
      :offset="offset"
      :title="property.name"
    >
      <CompareProductPropertyValue
        v-for="product in products"
        :key="`property-${property.id}-${product.id}`"
        :product="product"
        :property-id="property.id"
        class="my-8"
      />
    </CompareRow>
  </div>
</template>

<script>
export default {
  props: {
    controlsDisabled: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array,
      default: () => [],
    },
    showDifferent: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      offset: 0,
      maxOffset: 0,
    }
  },

  computed: {
    filteredProperties() {
      return !this.showDifferent || this.products.length < 2
        ? this.properties
        : this.properties.filter(({ allEqual }) => !allEqual)
    },

    properties() {
      const allProperties = {}
      this.products?.forEach(({ property_values }) => {
        property_values?.forEach(({ property, value }) => {
          if (!property) return
          if (!allProperties[property.id]) {
            allProperties[property.id] = [{ ...property, value }]
          } else {
            allProperties[property.id].push({ ...property, value })
          }
        })
      })
      return Object.keys(allProperties).map((id) => {
        const propertyValues = allProperties[id]
        let allEqual = propertyValues.length >= this.products.length
        if (allEqual) {
          for (let i = 1; i < propertyValues.length; i++) {
            const currentValue = propertyValues[i]?.value
              ?.toString()
              ?.toLowerCase()
              ?.trim()
            const previousValue = propertyValues[i - 1].value
              ?.toString()
              ?.toLowerCase()
              ?.trim()
            if (currentValue !== previousValue) {
              allEqual = false
              break
            }
          }
        }
        return {
          allEqual,
          id,
          count: propertyValues.length,
          name: propertyValues[0].name,
        }
      })
    },
  },

  watch: {
    products: {
      deep: true,
      handler() {
        this.getMaxOffset()
      },
    },
  },

  mounted() {
    this.getMaxOffset()
    window.addEventListener('resize', this.getMaxOffset, { passive: true })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getMaxOffset)
  },

  methods: {
    getMaxOffset() {
      let visibleCount = 1

      const wrapper = document.querySelector('.compare-row-columns')
      const column = document.querySelector('.compare-row-columns > div')
      if (wrapper && column) {
        const wrapperStyles = getComputedStyle(wrapper)
        const wrapperWidth = wrapper.getBoundingClientRect().width
        const columnWidth = column.getBoundingClientRect().width

        const wrapperGapsCombinedWidth =
          (Math.floor(wrapperWidth / columnWidth) - 1) *
          parseInt(wrapperStyles.gap)

        visibleCount = Math.floor(
          (wrapperWidth - wrapperGapsCombinedWidth) / columnWidth
        )
      }
      this.maxOffset = Math.max((this.products?.length || 0) - visibleCount, 0)
      if (this.offset > this.maxOffset) this.offset = this.maxOffset
    },

    handleSlideNext() {
      if (this.offset < this.maxOffset) this.offset++
    },

    handleSlidePrev() {
      if (this.offset > 0) this.offset--
    },
  },
}
</script>
