<template>
  <b-row align-v="center" class="flex-lg-row-reverse mx-xl-n32">
    <b-col md="6" lg="auto" class="mb-8 px-xl-32">
      <b-button
        :disabled="loading"
        variant="primary"
        class="btn-xl-lg px-lg-48"
        block
        @click="$emit('cart-add')"
      >
        {{ $t('cart.addToCart') }}
      </b-button>
    </b-col>

    <b-col lg="auto" class="mb-8 px-xl-32">
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
