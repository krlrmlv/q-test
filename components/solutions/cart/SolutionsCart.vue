<template>
  <div>
    <SolutionsCartContent
      :products="products"
      class="mb-64"
      @delete="$emit('delete', $event)"
    />

    <b-row class="mb-32">
      <b-col lg="auto" class="ml-lg-auto mb-32">
        <CartTotal :total="cartTotalSum" />
      </b-col>
    </b-row>

    <SolutionsCartControls
      :loading="loading"
      class="mb-48"
      @cart-add="addToCart"
      @cart-save="saveXlsx"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getAnalyticData } from '~/utils/analytic'

export default {
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    solutionId: {
      type: [Number, String],
      required: true,
    },
    isReseted: {
      type: [Boolean],
      required: true
    }
  },

  data() {
    return {
      loading: false,
    }
  },

  computed: {
    ...mapGetters('cart', ['cartProducts']),

    cartTotalSum() {
      return this.products?.reduce(
        (sum, product) =>
          (sum +=
            Number(product?.cart?.quantity || 1) * Number(product?.price || 0)),
        0
      )
    },
  },

  methods: {
    ...mapActions('cart', ['cartUpsertSolution', 'fetchCart']),

    async addToCart() {
      this.loading = true

      try {
        if (this.isReseted) {
          const products = this.products.map(product => ({product_id: product.id, quantity: product.cart.quantity}));
          await this.$store.dispatch('cart/cartUpsertBulk', {
            products,
            source: 'Решения',
          });
        } else {
          await this.$store.dispatch('cart/cartUpsertSolution', {
            solutionId: this.solutionId,
            source: 'Решения',
          })
        }


        this.$bvToast.toast(this.$t('calculators.masterCost.addedToCart'), {
          title: this.$t('global.success'),
          toaster: 'b-toaster-bottom-right',
          variant: 'success',
        })
      } catch (error) {
        this.$bvToast.toast(this.$t('global.tryLater'), {
          title: this.$t('global.error'),
          toaster: 'b-toaster-bottom-right',
          variant: 'danger',
        })
      }

      this.loading = false
    },

    async saveXlsx() {
      if (!(this.products && this.products.length)) return
      const products = this.products.map(
        ({ cart, name, price, price_base, unit_storage, vendor_code, id }) => ({
          id,
          name,
          price,
          base_price: parseFloat(price_base),
          qty: cart.quantity,
          unit_storage_name: unit_storage?.name,
          vendor_code,
        })
      )
      const apiUrl = `${process.env.REST_API_URL}/ekfgroup/cart-xls-download`
      try {
        const { utm, referer } = getAnalyticData({
          utmPlugin: this.$utm,
          cookies: this.$cookies,
        })

        const { data } = await this.$axios.post(apiUrl, {
          products,
          locale: this.$i18n.locale,
          utm,
          referer,
        })
        this.$gtm.push({ event: 'btnSaveSpecification' })
        const filename = data.path.split('/').pop()
        const link = document.createElement('a')
        link.href = `${process.env.REST_API_URL}${data.path}`
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      } catch (e) {
        // eslint-disable-next-line
        console.log(e.response)
      }
    },
  },
}
</script>
