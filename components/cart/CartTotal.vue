<template>
  <table class="table table-borderless table-cart-total fs-4 lh-140">
    <tbody>
      <tr>
        <td class="pr-16">{{ $t('cart.total.cost') }}:</td>
        <td class="h6">{{ formatSum(total, $i18n.locale) }}&nbsp;₽</td>
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
    total: {
      type: [Number, String],
      default: 0,
    },
  },

  computed: {
    discountAbsolute() {
      return this.discount ? Math.round((this.total * this.discount) / 100) : 0
    },

    sumFinal() {
      return this.total - this.discountAbsolute
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
