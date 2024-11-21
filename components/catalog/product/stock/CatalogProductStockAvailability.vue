<template>
  <div class="block-availability" :class="availability.class">
    <svg-icon
      :name="availability.icon"
      width="16"
      height="16"
      aria-hidden="true"
      class="mr-8"
    />
    <span class="fs-2">
      {{ $t(availability.message) }}
    </span>
  </div>
</template>

<script>
import { CUSTOM_STATUSES } from '~/components/constants/product'

const AVAILABILE = {
  class: 'alert-success text-success',
  icon: 'check-16',
  message: 'catalog.inOwnStock',
}
const UNAVAILABILE = {
  class: 'alert-danger text-danger',
  icon: 'cross-16',
  message: 'catalog.outOfOwnStock',
}
const TOORDER = {
  class: 'alert-secondary text-secondary',
  icon: 'info-16',
  message: 'catalog.toOrder',
}
export default {
  props: {
    inStock: {
      type: Boolean,
      required: true,
    },
    productStatus: {
      type: String,
      required: true,
    },
  },
  computed: {
    availability() {
      if (CUSTOM_STATUSES.includes(this.productStatus)) return TOORDER
      return this.inStock ? AVAILABILE : UNAVAILABILE
    },
  },
}
</script>

<style lang="scss" scoped>
.alert-secondary {
  background-color: $gray-100;
}
.block-availability {
  display: flex;
  padding: 1rem 2.25rem;
  align-items: center;
}

@include media-breakpoint-down(sm) {
  .block-availability {
    padding: 1rem 0;
    margin-bottom: 0.5rem;
    justify-content: center;
  }
}
</style>
