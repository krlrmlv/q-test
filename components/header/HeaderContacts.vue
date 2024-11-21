<template>
  <nav v-if="mounted" class="header-contacts">
    <b-nav class="header-nav-secondary">
      <b-nav-item href="tel:88003338815">
        <svg-icon
          name="phone-16"
          width="16"
          height="16"
          class="mr-8"
          aria-hidden="true"
        />
        8 800 333-88-15
      </b-nav-item>

      <li class="nav-item">
        <LocationIndicator size="sm">
          <template #default="{ caption, disabled, showModal }">
            <b-link :disabled="disabled" class="nav-link" @click="showModal">
              <div class="location-icon-wrapper">
                <b-spinner v-if="disabled" class="location-loading-indicator" />

                <svg-icon
                  v-else
                  name="map-pin-16"
                  width="16"
                  height="16"
                  aria-hidden="true"
                />
              </div>
              {{ caption }}
            </b-link>
          </template>
        </LocationIndicator>
      </li>

      <li class="nav-item">
        <SelectRegionIndicator size="sm">
          <template #default="{ showModal }">
            <b-link class="nav-link" @click="showModal"> EN </b-link>
          </template>
        </SelectRegionIndicator>
      </li>
    </b-nav>
  </nav>
</template>

<script>
import { BNav, BNavItem, BSpinner } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BNav,
    BNavItem,
    BSpinner,
  },

  computed: {
    ...mapGetters('header', ['mounted']),
  },
}
</script>

<style lang="scss" scoped>
.header-contacts {
  display: flex;
  align-items: center;
  margin-right: -0.25rem;
}

.location-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;

  .icon {
    flex: 0 0 auto;
    width: 1rem;
    height: 1rem;
  }
}

.location-loading-indicator {
  width: 0.875rem;
  height: 0.875rem;
  border-width: $border-width * 2;
}

::v-deep {
  .nav-link {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem;
    font-size: $font-size-1;
    line-height: math.div($font-size-base, $font-size-1) * 1.375;
    white-space: nowrap;
    color: $gray-800;

    &:disabled,
    &.disabled {
      opacity: 0.5;
    }

    &:hover {
      color: $brand-light;
    }

    &:focus-visible {
      color: $brand-light;
      outline: 1px solid $brand-light;
    }

    &:focus,
    &.focus,
    &:active {
      color: $brand;
    }
  }
}

@include media-breakpoint-up(xl) {
  .header-contacts {
    margin-right: -0.5rem;
  }

  ::v-deep {
    .nav-link {
      padding: 0.25rem 0.5rem;
      font-size: $font-size-2;
      line-height: math.div($font-size-base, $font-size-2) * 1.375;
    }
  }
}
</style>
