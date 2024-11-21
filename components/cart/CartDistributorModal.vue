<template>
  <b-modal
    v-model="localVisible"
    size="xl"
    body-class="px-24"
    modal-class="modal-cart-distributor"
    centered
    hide-footer
    hide-header
    @hide="$emit('hide')"
  >
    <template #default="{ close }">
      <h3 class="mb-32">{{ $t('cart.checkout.distributorSelect') }}</h3>

      <b-button
        :title="$t('global.close')"
        :aria-label="$t('global.close')"
        size="sm"
        variant="white"
        class="btn-icon modal-close text-secondary rounded-pill"
        @click="close"
      >
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>

      <DistributionDistributorSelect
        :is-legal="isLegal"
        is-checkout
        @distributor-selected="handleDistributorSelected"
      />
    </template>
  </b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  components: { BModal },

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    isLegal: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(newValue) {
        this.$emit('change', newValue)
      },
    },
  },

  methods: {
    handleDistributorSelected(event) {
      this.$emit('distributor-selected', event)
    },
  },
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-up(sm) {
  ::v-deep {
    .modal-cart-distributor {
      .modal-dialog {
        max-width: calc(100vw - #{$grid-gutter-width * 2});
      }
    }
  }
}

@include media-breakpoint-up(xl) {
  ::v-deep {
    .modal-cart-distributor {
      .modal-dialog {
        max-width: calc(
          #{map-get($container-max-widths, 'xl')} + #{$grid-gutter-width} + #{$border-width *
            2}
        );
      }
    }
  }
}
</style>
