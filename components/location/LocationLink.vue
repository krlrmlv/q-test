<template>
  <b-link
    :class="{ disabled: loading }"
    class="location-link"
    @click="$emit('click')"
  >
    <span class="location-name">{{ locationName(location) }}</span>
    <span v-if="parent" class="location-parent">
      {{ locationName(parent) }}
    </span>
  </b-link>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    location: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters('geo', ['locationName']),

    parent() {
      return {
        name: this.location?.region_name,
        type: this.location?.region_type,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.location-link {
  display: flex;
  flex-direction: column;
  min-height: 2.5rem;
  line-height: 1.33;
  color: inherit;
  text-decoration: none;

  .location-name {
    font-size: $font-size-4;
  }

  .location-parent {
    font-size: $font-size-1;
    color: $gray-600;
  }

  &:hover {
    text-decoration: none;
    color: inherit;

    .location-name {
      text-decoration: underline;
    }
  }

  &.disabled {
    text-decoration: none;
    cursor: default;
  }
}
</style>
