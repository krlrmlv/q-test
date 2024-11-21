<template>
  <b-sidebar
    v-model="localVisible"
    bg-variant="white"
    body-class="overflow-hidden"
    width="100%"
    no-close-on-esc
    no-header
    right
    @change="initSidebar"
  >
    <template #default="{ hide }">
      <div :class="`level-${level}`" class="filters-sidebar-content">
        <NewsCategoryFiltersPanel
          :title="$t('filters.title')"
          @back="hide"
          @close="hide"
        >
          <b-nav vertical>
            <b-nav-item
              v-for="(property, index) in properties"
              :key="`property-${property.id}`"
              link-classes="filters-sidebar-property"
              @click="setActiveProperty(index)"
            >
              <div class="property-title">
                <p class="property-name mb-0">{{ property.name }}</p>

                <p
                  v-if="selected[property.id].length"
                  class="property-values mb-0"
                >
                  {{ selected[property.id].join(', ') }}
                </p>
              </div>

              <span class="text-secondary ml-8">
                <svg-icon
                  name="chevron-right-24"
                  width="24"
                  height="24"
                  aria-hidden="true"
                />
              </span>
            </b-nav-item>
          </b-nav>
        </NewsCategoryFiltersPanel>

        <NewsCategoryFiltersPanel
          :title="activeProperty.name"
          @back="level = 0"
          @close="hide"
        >
          <NewsCategoryFilterValues
            :loading="loading"
            :selected="selected[activeProperty.id]"
            :values="activeProperty.property_values"
            class="mt-12"
            @input="handleValuesInput($event, activeProperty.id)"
          />
        </NewsCategoryFiltersPanel>
      </div>
    </template>

    <template #footer="{ hide }">
      <b-row class="mx-n4">
        <b-col class="px-4">
          <b-button
            :disabled="isFilterEmpty"
            variant="gray-200"
            block
            @click="resetFilters"
          >
            {{ $t('global.resetAll') }}
          </b-button>
        </b-col>

        <b-col class="px-4">
          <b-button
            :disabled="loading || isFilterUnchanged"
            variant="primary"
            block
            @click="applyFilter(hide)"
          >
            {{ $t('global.apply') }}
          </b-button>
        </b-col>
      </b-row>
    </template>
  </b-sidebar>
</template>

<script>
import { BNav, BNavItem, BSidebar } from 'bootstrap-vue'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

export default {
  components: {
    BNav,
    BNavItem,
    BSidebar,
  },

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    properties: {
      type: Array,
      default: () => [],
    },
    selectedValues: {
      type: Object,
      default: () => ({}),
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      activeProperty: {},
      level: 0,
      selected: {},
    }
  },

  computed: {
    isFilterEmpty() {
      return Object.values(this.selected).every((arr) => !arr?.length)
    },

    isFilterUnchanged() {
      return isEqual(this.selectedValues, this.selected)
    },

    localVisible: {
      get() {
        return this.visible
      },
      set(newValue) {
        this.$emit('change', newValue)
      },
    },
  },

  created() {
    this.initSidebar()
  },

  methods: {
    applyFilter(callback) {
      this.$emit('filter', this.selected)
      if (typeof callback === 'function') {
        callback()
      }
    },

    handleValuesInput(event, property_id) {
      this.selected[property_id] = event
    },

    initSidebar() {
      this.selected = cloneDeep(this.selectedValues)
      this.activeProperty = this.properties[0] || {}
      this.level = 0
    },

    resetFilters() {
      Object.keys(this.selected).forEach((key) => {
        this.selected[key] = []
      })
      this.level = 0
    },

    setActiveProperty(index) {
      this.activeProperty = this.properties[index] || {}
      this.level = 1
    },
  },
}
</script>

<style lang="scss" scoped>
.filters-sidebar-content {
  display: flex;
  width: 200%;
  height: 100%;
  font-size: $font-size-2;
  transition: $transition-base;
  transition-property: transform;
  transform: translateX(0);

  &.level-1 {
    transform: translateX(-50%);
  }

  ::v-deep {
    .filters-sidebar-panel {
      flex: 0 0 50%;
      min-width: 0;
      max-width: 50%;
    }
  }
}

.filters-sidebar-property {
  display: flex;
  align-items: center;
  min-height: 3rem;
  padding-left: 0;
  padding-right: 0;
  border-bottom: $border-width solid $border-color;
  color: inherit;

  .property-title {
    flex: 1 1 auto;
    min-width: 0;
  }

  .property-values {
    max-width: 100%;
    font-size: $font-size-1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: $gray-600;
  }
}

::v-deep {
  .nav {
    .nav-item {
      max-width: 100%;
    }
  }

  .b-sidebar-footer {
    padding: 1rem $grid-gutter-width * 0.5;
    border-top: $border-width solid $border-color;
  }
}
</style>
