<template>
  <div class="catalog-filter">
    <p class="h7">{{ title }}</p>

    <b-form-checkbox-group :checked="checked" @change="handleChange">
      <b-row :cols="columnCount" class="mx-n4">
        <b-col
          v-for="(option, index) in visibleOptions"
          :key="`option-visible-${index}`"
          class="pb-4 px-4"
        >
          <b-form-checkbox
            :disabled="loading || getDisabled(option)"
            :value="getField(option, 'value')"
          >
            {{ getField(option, 'text') }}
          </b-form-checkbox>
        </b-col>
      </b-row>

      <b-collapse v-if="collapseVisible" v-model="collapseOpen">
        <b-row :cols="columnCount" class="mx-n4">
          <b-col
            v-for="(option, index) in hiddenOptions"
            :key="`option-hidden-${index}`"
            class="pb-4 px-4"
          >
            <b-form-checkbox
              :disabled="getDisabled(option)"
              :value="getField(option, 'value')"
            >
              {{ getField(option, 'text') }}
            </b-form-checkbox>
          </b-col>
        </b-row>
      </b-collapse>

      <b-button
        v-show="collapseVisible"
        :class="collapseOpen ? 'not-collapsed' : 'collapsed'"
        size="sm"
        variant="link"
        class="collapse-toggle"
        @click="collapseOpen = !collapseOpen"
      >
        <span v-text="$t(`catalog.${collapseOpen ? 'collapse' : 'showAll'}`)" />
        <svg-icon
          name="caret"
          width="8"
          height="4"
          class="icon-caret ml-8"
          aria-hidden="true"
        />
      </b-button>
    </b-form-checkbox-group>
  </div>
</template>

<script>
import { BFormCheckboxGroup, BFormCheckbox, BCollapse } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CatalogFilterCheckbox',

  serverCacheKey: ({ cacheKey }) => cacheKey,

  components: {
    BFormCheckboxGroup,
    BFormCheckbox,
    BCollapse,
  },

  props: {
    cacheKey: {
      type: String,
      default: undefined,
    },
    property: {
      type: Object,
      default: () => ({}),
    },
    selected: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      collapseOpen: false,
    }
  },

  computed: {
    ...mapGetters('category', ['disabledFilters', 'loading']),

    checked() {
      return this.selected?.[this.property?.id] ?? []
    },

    collapseVisible() {
      return Boolean(this.hiddenOptions?.length)
    },

    columnCount() {
      const valueLength = this.property?.max_value_length
      if (valueLength <= 3) return 4
      else if (valueLength <= 6) return 3
      else if (valueLength <= 12) return 2
      else return 1
    },

    disabled() {
      return this.disabledFilters?.[this.property?.id] ?? {}
    },

    limit() {
      return this.columnCount * 5
    },

    options() {
      return this.property?.values ?? []
    },

    visibleOptions() {
      return this.options.slice(0, this.limit)
    },

    hiddenOptions() {
      return this.options.slice(this.limit)
    },

    title() {
      let title = this.property?.name
      if (this.property?.unit_name) title += ', ' + this.property?.unit_name
      return title
    },
  },

  methods: {
    getDisabled(option) {
      return this.disabled[option] && !this.checked.includes(option)
    },

    getField(item, fieldName) {
      if (!item) return
      return Object.prototype.hasOwnProperty.call(item, fieldName)
        ? item[fieldName]
        : item
    },

    handleChange(event) {
      this.$emit('change', { property_id: [this.property?.id], value: event })
    },
  },
}
</script>

<style lang="scss" scoped>
.collapse-toggle {
  margin-top: 0.25rem;
  padding: 0;
  text-decoration: none;
  border: none;
  color: $secondary;
}
</style>
