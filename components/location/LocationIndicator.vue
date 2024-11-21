<template>
  <div :class="{ 'location-indicator-dark': dark }" class="location-indicator">
    <slot
      v-bind="{ caption: selectedLocationName, disabled: loading, showModal }"
    >
      <b-button
        :disabled="loading"
        :size="size"
        class="location-indicator-button text-reset border-0 p-0"
        variant="link"
        @click="showModal"
      >
        <svg-icon
          :name="`map-pin-${iconSize}`"
          :width="iconSize"
          :height="iconSize"
          class="mr-8"
        />

        <span class="caption">
          {{ selectedLocationName }}
        </span>
      </b-button>
    </slot>

    <LocationModal v-model="modalVisible" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      modalVisible: false,
    }
  },

  computed: {
    ...mapGetters('geo', ['loading', 'selectedLocationName']),

    iconSize() {
      return this.size === 'sm' ? 16 : 24
    },
  },

  methods: {
    showModal() {
      this.modalVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.location-indicator-button {
  justify-content: flex-start;
  max-width: 100%;
  font-weight: inherit;
  text-align: left;

  .icon {
    fill: $secondary;
    align-self: flex-start;
  }

  .caption {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.btn-sm {
    line-height: 1;
  }
}

.location-indicator-dark {
  color: $gray-500;

  @include hover {
    color: $white;
  }

  .location-indicator-button {
    text-decoration: none;
    .icon {
      fill: $white;
    }
  }
}
</style>
