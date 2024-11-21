<template>
  <div class="links-wrapper">
    <b-button
      :href="masterCatalog"
      size="sm"
      target="_blank"
      variant="link"
      class="text-decoration-none p-0 border-0"
      @click="$gtm.push({ event: 'lnkCatalog' })"
    >
      {{ $t('global.downloadFullCatalog') }} (PDF)
      <svg-icon
        name="download-16"
        width="16"
        height="16"
        class="ml-8"
        aria-hidden="true"
      />
    </b-button>

    <CatalogPriceListLink
      :price-xlsx="priceXlsx"
      @analytics-events="sendEventsToAnalytics"
    >
      {{ $t('global.downloadFullPriceList') }}
    </CatalogPriceListLink>

    <b-button
      href="https://etim.ekfgroup.com/"
      size="sm"
      target="_blank"
      variant="link"
      class="text-decoration-none p-0 border-0"
    >
      {{ $t('global.goToEtimCatalog') }}
      <svg-icon
        name="arrow-right-16"
        width="16"
        height="16"
        class="ml-8"
        aria-hidden="true"
      />
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    lightingPriceList: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['settingByKey']),

    masterCatalog() {
      return this.$getStaticFile(this.settingByKey('master_catalog'))
    },

    priceXlsx() {
      const fileName = this.lightingPriceList
        ? 'price_lighting_xlsx'
        : 'price_xlsx'
      return this.$getStaticFile(this.settingByKey(fileName))
    },
  },
  methods: {
    sendEventsToAnalytics() {
      this.$gtm.push({ event: 'lnkPrice' })
      this.$ym('reachGoal', 'SKACHPRICEMENU')
    },
  },
}
</script>

<style lang="scss" scoped>
.links-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-bottom: 1.5rem;

  @include media-breakpoint-down(sm) {
    flex-direction: column;
    margin-bottom: 0;

    .btn {
      justify-content: flex-start;
    }
  }
}
</style>
