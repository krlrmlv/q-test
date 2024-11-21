<template>
  <div class="masterlight-category">
    <b-button
      variant="link"
      class="masterlight-category-header"
      @click="toggleCollapse"
    >
      <span class="d-flex align-self-start text-primary mr-8">
        <svg-icon
          :name="`${collapseOpen ? 'minus' : 'plus'}-24`"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </span>
      <span class="h6 mb-0">{{ category.name }}</span>
    </b-button>
    <b-collapse v-model="collapseOpen">
      <b-row class="mx-n8 mx-lg-n12 pt-24">
        <b-col
          v-for="product in category.products"
          :key="`${category.id}-${product.product_id}`"
          cols="6"
          md="4"
          xl="3"
          class="mb-16 mb-lg-24 px-8 px-lg-12"
        >
          <MasterlightProductCard
            :product="product.product"
            @click="$emit('product-click', product.product)"
          />
        </b-col>
      </b-row>
    </b-collapse>
  </div>
</template>

<script>
import { BCollapse } from 'bootstrap-vue'

export default {
  components: { BCollapse },

  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      collapseOpen: false,
    }
  },

  methods: {
    toggleCollapse() {
      this.collapseOpen = !this.collapseOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.masterlight-category-header {
  justify-content: initial;
  padding: 0;
  text-align: left;
  color: inherit;

  &:hover,
  &:focus {
    text-decoration: none;
  }
}
</style>
