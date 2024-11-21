<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="value"
      class="count-badge"
      :class="{ 'large-count': valueLength > 3 }"
    >
      <b-spinner v-if="loading" class="loading-indicator" />

      <div v-else>
        <transition name="count-badge" mode="out-in">
          <span :key="value" class="count-badge-value">{{ value }}</span>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'

export default {
  components: { BSpinner },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Number, String],
      default: null,
    },
  },
  computed: {
    valueLength() {
      return this.value?.toString()?.length || 1
    },
  },
}
</script>

<style lang="scss" scoped>
.count-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1rem;
  height: 1rem;
  font-size: 0.5625rem;
  line-height: 1;
  text-align: center;
  border-radius: $rounded-pill;
  color: $white;
  background-color: $primary;
  overflow: hidden;
  border-radius: 50%;
  padding: 0.1875rem;
  &.large-count {
    right: -0.25rem;
  }
}

.count-badge-value {
  display: block;
}

.count-badge-enter-active,
.count-badge-leave-active {
  transition: transform 0.1s linear;
}
.count-badge-enter {
  transform: translateY(-100%);
}

.count-badge-leave-to {
  transform: translateY(100%);
}

.loading-indicator {
  width: 0.625rem;
  height: 0.625rem;
  border-width: $border-width;
}
</style>
