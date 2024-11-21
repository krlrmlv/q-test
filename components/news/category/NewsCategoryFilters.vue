<template>
  <div class="news-category-filters">
    <b-row align-v="center" class="d-md-none">
      <b-col cols="auto" class="d-flex">
        <b-spinner v-if="loading" variant="muted" class="spinner-loading" />
      </b-col>

      <b-col cols="auto" class="ml-auto">
        <b-button
          variant="link"
          class="text-secondary border-0 p-0"
          block
          @click="showSidebar"
        >
          {{ $t('filters.title') }}
          <svg-icon
            name="filters-24"
            width="24"
            height="24"
            class="ml-8"
            aria-hidden="true"
          />
        </b-button>
      </b-col>
    </b-row>

    <b-row class="d-none d-md-flex">
      <b-col cols="auto">
        <b-row class="mb-n12">
          <b-col
            v-for="(property, index) in properties"
            :key="`property-${index}`"
            cols="auto"
            class="mb-12"
          >
            <b-dropdown
              :text="property.name"
              toggle-class="custom-select text-decoration-none text-reset"
              variant="link"
              block
              no-caret
              no-flip
            >
              <template #button-content>
                <span class="mr-16">{{ property.name }}</span>
              </template>

              <template #default="{ hide }">
                <NewsCategoryFilterValues
                  :loading="loading"
                  :selected="selected[property.id]"
                  :values="property.property_values"
                  class="dropdown-body"
                  @input="handleValuesInput($event, property.id)"
                />

                <div class="dropdown-footer">
                  <b-button
                    :disabled="loading || isFilterEmpty(property.id)"
                    size="sm"
                    variant="primary"
                    block
                    @click="applyFilter(property.id, hide)"
                  >
                    {{ $t('global.apply') }}
                  </b-button>
                </div>
              </template>
            </b-dropdown>
          </b-col>
        </b-row>
      </b-col>

      <b-col v-if="loading" cols="auto" class="fs-2">
        <b-spinner variant="muted" class="spinner-loading" />
      </b-col>
    </b-row>

    <NewsCategoryFiltersSidebar
      v-model="sidebarVisible"
      :loading="loading"
      :properties="properties"
      :selected-values="selectedValues"
      @filter="applyFilterAll"
    />
  </div>
</template>

<script>
import { BDropdown, BSpinner } from 'bootstrap-vue'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import sortBy from 'lodash/sortBy'

export default {
  components: {
    BDropdown,
    BSpinner,
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
  },

  data() {
    return {
      selected: {},
      sidebarVisible: false,
    }
  },

  created() {
    this.selected = cloneDeep(this.selectedValues)
  },

  methods: {
    applyFilter(property_id, callback) {
      this.$emit('filter', {
        property_id,
        selected: this.selected[property_id],
      })

      if (typeof callback === 'function') {
        callback()
      }
    },

    applyFilterAll(event) {
      this.$emit('filter-all', event)
    },

    handleValuesInput(event, property_id) {
      this.selected[property_id] = event
    },

    isFilterEmpty(property_id) {
      return isEqual(
        sortBy(this.selectedValues[property_id]),
        sortBy(this.selected[property_id])
      )
    },

    showSidebar() {
      this.sidebarVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.news-category-filters {
  .dropdown-body {
    flex: 1 1 auto;
    min-height: 0;
    padding: 1rem 1rem 0.5rem;
    overflow-y: auto;
  }

  .dropdown-footer {
    flex: 0 0 auto;
    padding: 1rem 1.5rem;
    border-top: $border-width solid $border-color;
  }

  ::v-deep {
    .dropdown-toggle {
      min-width: 7.25rem;
      text-align: left;
    }

    .dropdown-menu {
      flex-direction: column;
      min-width: 15rem;
      max-height: 30rem;
      margin-top: 0.5rem;
      margin-left: $border-width;
      padding: 0;
      border: none;

      &.show {
        display: flex;
      }
    }
  }
}

.spinner-loading {
  width: 1rem;
  height: 1rem;
  border-width: $border-width * 2;
}

@include media-breakpoint-up(md) {
  .spinner-loading {
    position: absolute;
    left: $grid-gutter-width * 0.5;
    top: calc(-0.75rem + #{$input-height} * 0.5);
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
