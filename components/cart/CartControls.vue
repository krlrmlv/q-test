<template>
  <b-row align-v="center" class="flex-lg-row-reverse">
    <b-col md="6" lg="auto" class="mb-8">
      <b-button
        :disabled="loading"
        variant="primary"
        class="px-lg-64 py-lg-20"
        block
        @click="$emit('cart-buy')"
      >
        <svg-icon
          name="cart-24"
          width="24"
          height="24"
          class="mr-8"
          aria-hidden="true"
        />
        {{ $t('cart.buy') }}
      </b-button>
    </b-col>

    <b-col md="6" lg="auto" class="mb-8">
      <b-button
        :disabled="loading"
        variant="link"
        block
        @click="$emit('cart-order-distributor')"
      >
        <svg-icon
          name="shop-24"
          width="24"
          height="24"
          class="mr-8"
          aria-hidden="true"
        />
        {{ $t('cart.buyFromDistributor') }}
      </b-button>
    </b-col>

    <b-col lg="auto" class="mb-8">
      <b-button
        :disabled="loading"
        variant="link"
        class="text-secondary border-0 px-0 py-8"
        block
        @click="$emit('cart-save')"
      >
        <svg-icon
          name="save-24"
          width="24"
          height="24"
          class="mr-8"
          aria-hidden="true"
        />
        {{ $t('cart.save') }}
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
