<template>
  <div class="news-category-filter-values">
    <b-link class="filter-value filter-value-all" @click="selectAll">
      {{ $t('global.selectAll') }}
    </b-link>

    <b-form-checkbox-group v-model="localSelected" stacked>
      <div
        v-for="(value, index) in values"
        :key="`value-${index}`"
        class="filter-value"
      >
        <b-form-checkbox :disabled="loading" :value="value.value">
          {{ value.value }}
        </b-form-checkbox>
      </div>
    </b-form-checkbox-group>
  </div>
</template>

<script>
import { BFormCheckbox, BFormCheckboxGroup } from 'bootstrap-vue'

export default {
  components: {
    BFormCheckbox,
    BFormCheckboxGroup,
  },

  model: {
    prop: 'selected',
    event: 'input',
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default: () => [],
    },
    values: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    localSelected: {
      get() {
        return this.selected
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },

  methods: {
    selectAll() {
      if (this.localSelected?.length < this.values.length) {
        this.localSelected = this.values.map(({ value }) => value)
      } else {
        this.localSelected = []
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-value {
  display: flex;
  align-items: center;
  min-height: 2.5rem;
  padding: 0.5rem;

  &.filter-value-all {
    text-decoration: underline;
    color: inherit;
  }
}
</style>
