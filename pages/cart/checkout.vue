<template>
  <main class="overflow-hidden pb-lg-32">
    <b-container>
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2 d-none d-sm-block mb-56">{{ $t('cart.title') }}</h1>

      <CartCheckoutForm
        :distributor="selectedDistributor"
        :is-legal="isLegal"
        :products="cartProductsInStock"
        :total="cartSumProductsInStock"
        :select-distributor-manually="selectDistributorManually"
        class="mb-64"
        @input-legal="isLegal = $event"
        @input-distributor-option="handleInputDistributorOption"
      />
    </b-container>

    <CartDistributorModal
      v-model="modalVisible"
      :is-legal="isLegal"
      @distributor-selected="handleDistributorSelected"
      @hide="handleModalHide"
    />
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      breadcrumbs: [
        { text: 'cart.title', to: '/cart' },
        { text: 'cart.orderFromDistributor', active: true },
      ],
      isLegal: false,
      modalVisible: false,
      selectDistributorManually: false,
      selectedDistributor: {},
    }
  },

  async fetch() {
    await this.fetchCart()
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },

  computed: {
    ...mapGetters('cart', ['cartProductsInStock', 'cartSumProductsInStock']),
  },

  methods: {
    ...mapActions('cart', ['fetchCart']),

    handleDistributorSelected(event) {
      this.selectedDistributor = event
      this.modalVisible = false
    },

    handleInputDistributorOption(event) {
      this.selectDistributorManually = event

      if (event) {
        this.modalVisible = true
      } else {
        this.selectedDistributor = {}
      }
    },

    handleModalHide() {
      /* After distributor modal closed, reset distributor select option to auto
       * if no distributor was selected in modal */
      this.modalVisible = false
      this.selectDistributorManually = Boolean(this.selectedDistributor?.id)
    },
  },
}
</script>

<i18n>
{
  "en": {
    "pageTitle": "Order from distributor — EKF"
  },
  "ru": {
    "pageTitle": "Заказать у дистрибьютора — EKF"
  }
}
</i18n>
