<template>
  <ul class="list-unstyled mb-0">
    <li v-for="(product, index) in products" :key="`product-${index}`">
      <b-link
        :to="localePath(`/catalog/products/${product.slug}`)"
        class="dropdown-item product-link"
        @click="$emit('click')"
      >
        <span :class="{ 'mr-4': product.vendor_code }" v-html="product.name" />
        <span
          v-if="product.vendor_code"
          class="text-secondary text-lowercase"
          v-html="product.vendor_code"
        />
      </b-link>
    </li>
  </ul>
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

<style lang="scss" scoped>
.product-link {
  white-space: normal;
}
</style>
