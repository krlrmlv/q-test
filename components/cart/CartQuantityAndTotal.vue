<template>
  <table class="table table-borderless table-cart-total fs-4 lh-140">
    <tbody>
      <tr>
        <td class="pr-16">{{ $t('cart.total.products') }}:</td>
        <td class="h6">
          {{ formatSum(totalProducts, $i18n.locale) }}&nbsp;{{
            $t('cart.total.pcs')
          }}
        </td>
      </tr>

      <tr v-if="discountAbsolute">
        <td class="pr-16">{{ $t('cart.total.discount') }} {{ discount }}%:</td>
        <td class="h6 text-primary">
          {{ formatSum(discountAbsolute, $i18n.locale) }}&nbsp;₽
        </td>
      </tr>

      <tr>
        <td class="pr-16">{{ $t('cart.total.sum') }}:</td>
        <td class="h3">{{ formatSum(sumFinal, $i18n.locale) }}&nbsp;₽</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import formatSum from '@/utils/formatSum'

export default {
  props: {
    discount: {
      type: [Number, String],
      default: 0,
    },
    totalSum: {
      type: [Number, String],
      default: 0,
    },
    products: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    discountAbsolute() {
      return this.discount
        ? Math.round((this.totalSum * this.discount) / 100)
        : 0
    },

    sumFinal() {
      return this.totalSum - this.discountAbsolute
    },
    totalProducts() {
      return this.products.reduce(
        (acc, product) => acc + product?.cart?.quantity,
        0
      )
    },
  },

  methods: { formatSum },
}
</script>

<style lang="scss" scoped>
.table.table-cart-total {
  margin-bottom: 0;

  td {
    padding: 0.1875rem 0;
    vertical-align: baseline;
  }
}
</style>
