<template>
  <b-modal
    v-model="localVisible"
    :size="size"
    modal-class="modal-product-stock"
    centered
    hide-footer
    hide-header
    @hidden="$emit('hidden')"
  >
    <template #default="{ close }">
      <slot />
      <b-button
        variant="white"
        size="sm"
        class="btn-icon modal-close text-secondary rounded-pill"
        @click="close"
      >
        <span class="sr-only">{{ $t('global.close') }}</span>
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  name: 'CatalogProductStockModal',
  components: { BModal },
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    size: {
      type: String,
      default: 'xl',
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
}
</script>

<style lang="scss" scoped>
::v-deep {
  .modal-product-stock {
    .modal-dialog {
      &.modal-lg {
        max-width: calc(
          #{map-get($container-max-widths, 'lg')} - #{$grid-gutter-width}
        );
      }

      &.modal-xl {
        max-width: map-get($container-max-widths, 'xl');
      }
    }
  }
}
</style>
