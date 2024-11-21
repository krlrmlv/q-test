<template>
  <form id="location-partner-stock" ref="form" @submit.prevent="handleSubmit">
    <b-form-group
      class="mb-32"
      :label="$t('search.city')"
      label-cols-md="2"
      label-align-md="right"
      label-class="d-none d-md-block"
    >
      <b-input-group ref="inputGroupCity" class="input-group-flush">
        <b-form-input
          id="input-city"
          v-model="searchQuery"
          autocomplete="off"
          debounce="500"
          :placeholder="$t('form.city')"
          @click="inputClickHandler"
          @input="handleSearchInput"
        />
        <template #append>
          <b-button
            variant="link"
            class="btn-icon text-muted"
            :title="$t('filters.clear')"
            @click="inputAppendBtnHandler"
          >
            <svg-icon
              :name="appendIconName"
              width="24"
              height="24"
              aria-hidden="true"
            />
          </b-button>
        </template>
      </b-input-group>
      <b-form-text v-if="searchError" text-variant="danger">
        {{ searchError }}
      </b-form-text>
    </b-form-group>
    <transition name="fade" mode="out-in">
      <div
        v-show="dropdownVisible"
        ref="dropdown"
        class="location-list-wrapper"
        :style="{ '--input-width': cityInputWidth }"
      >
        <b-spinner
          v-if="searchLoading"
          variant="secondary"
          class="spinner-loading"
        />
        <Simplebar data-simplebar-auto-hide="false">
          <ul :class="{ loading: searchLoading }" class="location-list">
            <li v-if="!locations.length" class="text-muted">
              <p class="mb-8">{{ $t('search.empty') }}</p>
            </li>
            <li
              v-for="location in locations"
              :key="`location-${location.fias_id}`"
              class="mb-16"
            >
              <LocationLink
                :loading="searchLoading"
                :location="location"
                @click="selectLocation(location)"
              />
            </li>
          </ul>
        </Simplebar>
      </div>
    </transition>
  </form>
</template>

<script>
import {
  BFormGroup,
  BFormInput,
  BFormText,
  BInputGroup,
  BSpinner,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import orderBy from 'lodash/orderBy'
import Simplebar from 'simplebar-vue'
import CITIES_SEARCH from '@/graphql/geo/CitiesSearch'

export default {
  components: {
    BFormGroup,
    BFormInput,
    BFormText,
    BInputGroup,
    BSpinner,
    Simplebar,
  },

  data() {
    return {
      locations: [],
      searchError: null,
      searchLoading: false,
      searchQuery: null,
      timeout: null,
      dropdownVisible: false,
      cityInputWidth: null,
    }
  },
  computed: {
    ...mapGetters('geo', ['defaultLocations', 'selectedLocation']),

    appendIconName() {
      if (this.dropdownVisible && this.searchQuery) return 'close-24'
      return this.dropdownVisible ? 'chevron-up-24' : 'chevron-down-24'
    },
  },

  created() {
    this.locations = [...this.defaultLocations]
    this.searchQuery = this.selectedLocation?.name
  },
  mounted() {
    window.addEventListener('resize', this.getCityInputWidth, { passive: true })
    setTimeout(() => this.getCityInputWidth(), 500)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.getCityInputWidth)
  },

  methods: {
    ...mapActions('geo', ['setSelectedLocation']),

    getCityInputWidth() {
      const inputGroupCity = this.$refs.inputGroupCity
      if (inputGroupCity) {
        const inputCityBox = inputGroupCity?.getBoundingClientRect()
        this.cityInputWidth = `${Math.round(inputCityBox.width)}px`
      }
    },

    handleClickOutside(event) {
      const isInside = Boolean(
        event?.target?.closest('#location-partner-stock')
      )
      if (!isInside) {
        this.dropdownVisible = false
        this.searchQuery = this.selectedLocation?.name
        document.removeEventListener('click', this.handleClickOutside)
      }
    },

    handleClearSearch() {
      this.searchQuery = null
      this.searchError = null
      this.locations = [...this.defaultLocations]
    },

    handleSearchInput(event) {
      clearTimeout(this.timeout)
      if (event?.length) {
        this.timeout = setTimeout(() => {
          this.search(event)
        }, 500)
      } else {
        this.handleClearSearch()
      }
    },

    handleSubmit() {
      if (!this.searchLoading && Boolean(this.locations?.[0])) {
        this.selectLocation(this.locations[0])
      }
    },

    inputAppendBtnHandler() {
      if (this.appendIconName === 'close-24') {
        this.searchQuery = ''
        this.locations = [...this.defaultLocations]
        this.inputFocus()
        return
      }

      this.dropdownVisible = !this.dropdownVisible
      this.searchQuery = this.dropdownVisible ? '' : this.selectedLocation?.name

      if (this.dropdownVisible) {
        document.addEventListener('click', this.handleClickOutside)
        this.inputFocus()
      } else this.locations = [...this.defaultLocations]
    },

    inputClickHandler() {
      if (!this.dropdownVisible) this.inputAppendBtnHandler()
    },

    inputFocus() {
      const input = document.getElementById('input-city')
      if (input) input.focus()
    },

    selectLocation(location) {
      if (!location) return
      this.setSelectedLocation(location)
      this.$emit('submit')
      this.dropdownVisible = false
      this.searchQuery = this.selectedLocation?.name
    },

    async search(event) {
      this.searchLoading = true
      try {
        const { searchResults } = await this.$graphql.default.request({
          document: CITIES_SEARCH,
          variables: { q: `%${event}%` },
        })

        /** Sort cities by matching search query(event)
         * at the beginning of the city name */
        const sortedCities = orderBy(searchResults, (city) => {
          return city.name.toLowerCase().indexOf(event.toLowerCase()) === 0
            ? 0
            : 1
        })

        this.locations = sortedCities
      } catch (error) {
        this.searchError = 'Неизвестная ошибка'
      }
      this.searchLoading = false
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .simplebar-vertical {
    margin: 1rem 0;
  }
  .form-control:disabled {
    background-color: $white;
  }
  .col-form-label {
    font-weight: $font-weight-normal;
    color: $gray-600;
    font-size: $font-size-2;
    text-align: left;
  }

  @include media-breakpoint-down(sm) {
    .col-form-label {
      font-size: 1rem;
    }
    #input-city {
      font-size: 1rem;
    }
  }
}
#input-city {
  position: relative;
}
.location-list-wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 1rem;
  position: absolute;
  max-height: 29rem;
  top: 3.75rem;
  right: 0.75rem;
  text-align: left;
  width: var(--input-width);
  background: $white;
  box-shadow: $dropdown-box-shadow;

  & > * {
    min-height: 0;
  }
}

.location-list {
  margin: 1rem 0;
  padding: 0;
  list-style: none;
  transition: $transition-base;
  transition-property: opacity;
  &.loading {
    opacity: 0.5;
  }
}

.spinner-loading {
  position: absolute;
  right: 1rem;
  top: 0;
  width: 1.25rem;
  height: 1.25rem;
  border-width: $border-width * 2;
  opacity: 0.5;
}

@include media-breakpoint-up(md) {
  .location-list-wrapper {
    top: 3.5rem;
  }
}
</style>
