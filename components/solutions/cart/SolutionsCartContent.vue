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

    <CartProduct
      v-for="(product, index) in products"
      :key="`product-${product.id}`"
      :product="product"
      readonly
      @delete="$emit('delete', index)"
    />
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.cart-content-header {
  margin-bottom: 0.5rem;
  padding: 1.25rem $grid-gutter-width;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  color: $gray-800;
  background-color: $gray-100;
}

@include media-breakpoint-up(xxl) {
  // TODO: remove this block after reworking cart table

  $cartColWidthDiff: 4%;
  $colWidthPercent: calc(100% / $grid-row-columns);

  .cart-picture-col,
  .cart-product .product-picture {
    flex: 0 0 calc($colWidthPercent * 2 - $cartColWidthDiff);
    max-width: calc($colWidthPercent * 2 - $cartColWidthDiff);
  }

  .cart-title-col,
  .cart-product .product-title {
    flex: 0 0 calc($colWidthPercent * 3 + $cartColWidthDiff);
    max-width: calc($colWidthPercent * 3 + $cartColWidthDiff);
  }
}

@include media-breakpoint-down(md) {
  .cart-content-header {
    display: none;
  }
}
</style>
