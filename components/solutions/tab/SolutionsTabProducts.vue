<template>
  <div>
    <h4 class="mb-40">
      {{ $t('solutions.tabs.products.necessaryProducts') }}
    </h4>

    <SolutionsCart
      :products="products"
      :solution-id="solutionId"
      :is-reseted="isReseted"
      @delete="handleProductDelete"
    />

    <CartDeleteConfirmation
      v-model="modalVisible"
      :index="productIndex"
      @delete="handleProductDelete"
      @reset="resetProductsQuantity"
    />
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    solutionId: {
      type: [Number, String],
      required: true,
    },
  },

  data() {
    return {
      isReseted: false,
      modalVisible: false,
      productIndex: null,
      products: [],
    }
  },

  created() {
    this.products = this.items?.map(({ product, quantity }) => ({
      ...product,
      cart: { quantity: Number(quantity) || 1 },
    }))
  },

  methods: {
    handleProductDelete(event) {
      if (this.isReseted) {
        this.products?.splice(event, 1)
      } else {
        this.modalVisible = true
        this.productIndex = event
      }
    },

    resetProductsQuantity() {
      this.products.forEach((product) => {
        product.cart.quantity = parseInt(product?.coefficient || 1)
      })

      this.isReseted = true
    },
  },
}
</script>
