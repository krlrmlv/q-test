<template>
  <div class="cart-content">
    <div class="cart-content-header">
      <b-row align-v="center">
        <b-col md="2" class="cart-picture-col">{{
          $t('cart.fields.photo')
        }}</b-col>
        <b-col md="3" class="cart-title-col">{{
          $t('cart.fields.name')
        }}</b-col>
        <b-col md="2">{{ $t('cart.fields.price') }}</b-col>
        <b-col md="2">{{ $t('cart.fields.count') }}</b-col>
        <b-col md="2">{{ $t('cart.fields.sum') }}</b-col>
        <b-col md="1" class="d-flex align-items-center justify-content-center">
          <span class="sr-only">{{ $t('cart.fields.remove') }}</span>
          <svg-icon name="trash-24" width="24" height="24" aria-hidden="true" />
        </b-col>
      </b-row>
    </div>

    <slot />
  </div>
</template>

<style lang="scss" scoped>
.cart-content-header {
  margin-bottom: 0.5rem;
  padding: 1.25rem $grid-gutter-width;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  color: $gray-800;
  background-color: $gray-100;
}

@include media-breakpoint-down(md) {
  .cart-content-header {
    display: none;
  }
}
</style>
