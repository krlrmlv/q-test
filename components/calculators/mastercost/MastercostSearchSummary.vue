<template>
  <div class="d-flex flex-column align-items-end text-sm-right mt-24">
    <table class="table table-borderless fs-4 w-auto mb-20">
      <tbody>
        <tr>
          <td class="p-0">
            {{ $t('calculators.masterCost.projectCostEkf') }}:
          </td>

          <td class="align-bottom py-0 pr-0 pl-8">
            <span class="h6">
              {{ formatSum(ekfTotal, $i18n.locale) }}&nbsp;₽
            </span>
          </td>
        </tr>

        <tr>
          <td class="p-0">{{ $t('calculators.masterCost.youSave') }}:</td>

          <td class="align-bottom py-0 pr-0 pl-8">
            <span class="h6 text-success">
              {{ formatSum(profit, $i18n.locale) }}&nbsp;₽
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <b-row class="mastercost-summary-price-comment">
      <b-col cols="12">
        {{ $t('calculators.masterCost.projectCostEkfComment') }}
      </b-col>
    </b-row>

    <b-row align-v="center" class="mx-n4">
      <b-col cols="12" sm="6" lg="auto" class="ml-lg-auto px-4 mb-8">
        <b-button
          variant="white"
          class="btn-icon text-secondary"
          block
          @click="$emit('delete-results')"
        >
          <svg-icon
            name="trash-24"
            width="24"
            height="24"
            class="mr-8"
            aria-hidden="true"
          />
          {{ $t('delete') }}
        </b-button>
      </b-col>

      <b-col cols="12" sm="6" lg="auto" class="ml-lg-auto px-4 mb-8">
        <b-button
          variant="white"
          class="btn-icon text-secondary"
          block
          @click="saveResult"
        >
          <svg-icon
            name="save-24"
            width="24"
            height="24"
            class="mr-8"
            aria-hidden="true"
          />
          {{ $t('global.save') }}
        </b-button>
      </b-col>

      <b-col cols="12" sm="6" lg="auto" class="px-4 mb-8">
        <LazyMastercostPrintResult
          :items="items"
          :profit="profit"
          :total="ekfTotal"
          @set-loading="$emit('set-loading', $event)"
        />
      </b-col>

      <b-col cols="12" sm="6" lg="auto" class="px-4 mb-8">
        <b-button variant="primary" block @click="$emit('add-to-cart')">
          {{ $t('cart.addToCart') }}
        </b-button>
      </b-col>
      <!--<b-col cols="12" sm="6" lg="auto" class="px-4 mb-8">
        <b-button variant="primary" block @click="$emit('submit-project')">
          <svg-icon
            name="folder-fill-24"
            width="24"
            height="24"
            class="mr-8"
            aria-hidden="true"
          />
          {{ $t('global.submitProject') }}
        </b-button>
      </b-col>-->
    </b-row>
  </div>
</template>

<script>
import formatSum from '@/utils/formatSum'
import sendToMindbox from '@/utils/mindbox'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ekfTotal() {
      return (
        Math.round(
          this.items
            .filter((item) => item.analogs && item.analogs.length)
            .reduce((total, item) => total + this.getRowSum(item), 0) * 100
        ) / 100
      )
    },

    profit() {
      return Math.max(
        Math.round((this.sourceTotal - this.ekfTotal) * 100) / 100,
        0
      )
    },

    sourceTotal() {
      return (
        Math.round(
          this.items
            .filter((item) => item.price && item.analogs && item.analogs.length)
            .reduce(
              (total, item) => total + parseFloat(item.price) * item.quantity,
              0
            ) * 100
        ) / 100
      )
    },
  },

  methods: {
    formatSum,

    getRowSum(item) {
      return item.analogs[item.analog].assembly &&
        item.analogs[item.analog].assemblies[item.analogs[item.analog].assembly]
        ? item.analogs[item.analog].assemblies[
            item.analogs[item.analog].assembly
          ].products.reduce(
            (total, ap) =>
              total +
              Math.round(parseFloat(ap.price)) * ap.assemblyQty * item.quantity,
            0
          )
        : Math.round(parseFloat(item.analogs[item.analog].price)) *
            item.quantity
    },

    saveResult() {
      this.$emit('save')
      this.$gtm.push({ event: 'ClSaveMascost' })

      sendToMindbox('EKFGroup.SaveCalculation', {
        customerAction: {
          customFields: {
            calculator: 'MasterCost',
          },
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.mastercost-summary-price-comment {
  font-size: 0.875rem;
  color: $gray-600;
  margin-bottom: 3rem;
}
</style>

<i18n>
{
  "en": {
    "delete": "Clear"
  },
  "ru": {
    "delete": "Очистить"
  }
}
</i18n>
