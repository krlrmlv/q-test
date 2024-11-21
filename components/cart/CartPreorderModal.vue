<template>
  <b-modal v-model="localVisible" size="xl" centered hide-footer hide-header>
    <template #default="{ close }">
      <h4 class="mb-16">{{ $t('cart.outOfStock.title') }}</h4>
      <p class="mb-32">{{ $t('cart.outOfStock.subtitle') }}</p>

      <CartPreorderProducts :products="products" />

      <b-row>
        <b-col cols="12" lg="4" xl="3">
          <b-button
            variant="primary"
            :disabled="loading"
            block
            @click="$emit('cart-buy')"
          >
            <b-spinner v-if="loading" class="mr-8" small />
            {{ $t('global.continue') }}
          </b-button>
        </b-col>
      </b-row>

      <b-button
        :title="$t('global.close')"
        :aria-label="$t('global.close')"
        variant="white"
        size="sm"
        class="btn-icon modal-close text-secondary rounded-pill"
        @click="close"
      >
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { BModal, BSpinner } from 'bootstrap-vue'

export default {
  components: {
    BModal,
    BSpinner,
  },

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    products: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      fields: [
        { key: 'vendor_code', label: this.$t('cart.fields.vendorCode') },
        { key: 'name', label: this.$t('cart.fields.nameOnly') },
        { key: 'price', label: this.$t('cart.fields.price') },
      ],
    }
  },

  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(event) {
        this.$emit('change', event)
      },
    },
  },
}
</script>
