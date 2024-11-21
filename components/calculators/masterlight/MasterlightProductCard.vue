<template>
  <b-link
    role="button"
    class="card card-masterlight-product"
    @click="$emit('click')"
  >
    <div class="card-img">
      <picture>
        <source
          v-for="size in imageSizes"
          :key="`source-${size.breakpoint}`"
          :srcset="$getCdnImage(productImage, size.size)"
          :media="size.breakpoint ? `(max-width: ${size.breakpoint}px)` : null"
        />
        <img
          :src="$getCdnImage(productImage, 220)"
          :alt="product.name"
          width="218"
          height="218"
          loading="lazy"
          class="product-image img-fluid"
        />
      </picture>
    </div>
    <div class="card-body">
      {{ product.name }}
    </div>
  </b-link>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      imageSizes: [
        { breakpoint: 575, size: 204 },
        { breakpoint: 991, size: 230 },
        { breakpoint: 1239, size: 204 },
        { breakpoint: null, size: 219 },
      ],
    }
  },
  computed: {
    productImage() {
      return `/products/${this.product?.image}`
    },
  },
}
</script>

<style lang="scss" scoped>
.card-masterlight-product {
  height: 100%;
  line-height: 1.375;
  color: inherit;
}

.card-img {
  padding: 0.25rem 1.5rem;
  text-align: center;
}

.card-body {
  padding: 0 1.5rem 1.5rem;
}

.product-image {
  object-fit: contain;
}

@include media-breakpoint-down(md) {
  .card-masterlight-product {
    font-size: $font-size-1;
    box-shadow: $box-shadow-sm;
  }

  .card-img {
    padding: 0.25rem 0.5rem;
  }

  .card-body {
    padding: 0.5rem 0.5rem 1.25rem;
  }
}

@include media-breakpoint-up(lg) {
  .card-masterlight-product {
    transition: $transition-base;
    transition-property: box-shadow;

    &:hover {
      box-shadow: $box-shadow;
    }
  }
}
</style>
