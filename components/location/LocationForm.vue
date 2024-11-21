<template>
  <form @submit.prevent="handleSubmit">
    <b-form-group class="mb-32">
      <b-input-group class="input-group-flush">
        <b-form-input
          v-model="searchQuery"
          autocomplete="off"
          debounce="500"
          :placeholder="$t('form.city')"
          @input="handleSearchInput"
        />
        <template #append>
          <b-button
            variant="link"
            class="btn-icon text-secondary"
            :disabled="!hasFilter"
            :title="$t('filters.clear')"
            @click="handleClearSearch"
          >
            <svg-icon
              name="close-16"
              width="16"
              height="16"
              aria-hidden="true"
            />
          </b-button>
        </template>
      </b-input-group>
      <b-form-text v-if="searchError" text-variant="danger">
        {{ searchError }}
      </b-form-text>
    </b-form-group>
    <div class="location-list-wrapper">
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
            class="mb-8"
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
    }
  },

  computed: {
    ...mapGetters('geo', ['defaultLocations']),
    hasFilter() {
      return Boolean(this.searchQuery?.length)
    },
  },

  created() {
    this.locations = [...this.defaultLocations]
  },

  methods: {
    ...mapActions('geo', ['setSelectedLocation']),

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

    selectLocation(location) {
      if (!location) return
      this.setSelectedLocation(location)
      this.$emit('submit')
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
.location-list-wrapper {
  position: relative;
}

.location-list {
  margin: 0;
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

@include media-breakpoint-up(lg) {
  .location-list-wrapper {
    display: flex;
    flex-direction: column;
    max-height: 24rem;
    overflow: hidden;

    & > * {
      min-height: 0;
    }
  }
}
</style>
