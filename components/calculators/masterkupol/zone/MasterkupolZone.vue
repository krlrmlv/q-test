<template>
  <div
    :class="{ 'masterkupol-zone-filtered': hasFilter }"
    class="masterkupol-zone"
  >
    <b-button
      :title="buttonTitle"
      :aria-label="buttonTitle"
      variant="link"
      class="collapse-toggle"
      @click="toggleCollapse"
    >
      <svg-icon
        :name="`${collapseOpen ? 'minus' : 'plus'}-24`"
        width="24"
        height="24"
        class="text-primary mr-8"
        aria-hidden="true"
      />
      {{
        $te(`calculators.masterKupol.climateZones.${value}`)
          ? $t(`calculators.masterKupol.climateZones.${value}`)
          : value
      }}&nbsp;{{ $t('calculators.masterKupol.climateZones.zone') }}
    </b-button>
    <b-collapse v-model="collapseOpen">
      <ul class="list-regions list-unstyled">
        <li
          v-for="(region, index) in regions"
          :key="`region-${index}`"
          class="list-item"
        >
          <b-link class="text-reset" @click="$emit('select', value)">
            {{ region }}
          </b-link>
        </li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
import { BCollapse } from 'bootstrap-vue'

export default {
  components: { BCollapse },

  props: {
    hasFilter: {
      type: Boolean,
      default: false,
    },
    regions: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [Number, String],
      default: null,
    },
  },

  data() {
    return {
      collapseOpen: false,
    }
  },

  computed: {
    buttonTitle() {
      return this.$t(
        `calculators.masterKupol.climateZones.${
          this.collapseOpen ? 'hideRegions' : 'showRegions'
        }`
      )
    },
  },

  watch: {
    hasFilter: {
      immediate: true,
      handler(event) {
        if (event) {
          this.collapseOpen = true
        }
      },
    },
  },

  methods: {
    toggleCollapse() {
      if (this.hasFilter) return
      this.collapseOpen = !this.collapseOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.collapse-toggle {
  justify-content: flex-start;
  padding: 0;
  font-size: $font-size-4;
  font-weight: $font-weight-medium;
  text-align: left;
  border: none;
  color: inherit;

  &:hover,
  &:focus {
    text-decoration: none;
  }
}

.list-regions {
  margin: 0;
  font-size: $font-size-2;
}

.masterkupol-zone-filtered {
  display: flex;
  flex-direction: column-reverse;

  .collapse-toggle {
    margin-top: 0.25rem;
    font-size: $font-size-2;
    cursor: default;

    .icon {
      display: none;
    }
  }
}

.masterkupol-zone:not(.masterkupol-zone-filtered) {
  .list-regions {
    padding-top: 1rem;
    column-gap: $grid-gutter-width;

    .list-item {
      margin-bottom: 1rem;
      break-inside: avoid;
    }
  }
}

@include media-breakpoint-up(lg) {
  .masterkupol-zone:not(.masterkupol-zone-filtered) {
    .list-regions {
      padding-left: calc(24px + 0.5rem);
      column-count: 2;
    }
  }
}

@include media-breakpoint-up(xl) {
  .masterkupol-zone:not(.masterkupol-zone-filtered) {
    .list-regions {
      column-count: 3;
    }
  }
}
</style>
