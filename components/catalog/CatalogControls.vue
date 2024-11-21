<template>
  <div class="controls-wrapper">
    <b-button
      :href="masterCatalog"
      target="_blank"
      variant="outline-primary"
      class="btn-md-sm master-catalog-btn"
      @click="$gtm.push({ event: 'lnkCatalog' })"
    >
      {{ $t('global.downloadCatalog') }} (PDF)
      <svg-icon
        name="arrow-download-16"
        width="16"
        height="16"
        class="ml-8 d-md-none"
        aria-hidden="true"
      />
    </b-button>

    <b-button
      :href="priceXlsx"
      variant="gray-200"
      class="btn-md-sm text-gray-700"
      @click="$gtm.push({ event: 'lnkPrice' })"
    >
      {{ $t('global.downloadPriceList') }}
      <svg-icon
        name="arrow-download-16"
        width="16"
        height="16"
        class="ml-8 d-md-none"
        aria-hidden="true"
      />
    </b-button>

    <LinkMore
      href="https://etim.ekfgroup.com/"
      target="_blank"
      class="py-16 py-md-0 text-secondary"
    >
      {{ $t('global.goToEtimCatalog') }}
    </LinkMore>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['settingByKey']),

    masterCatalog() {
      return this.$getStaticFile(this.settingByKey('master_catalog'))
    },

    priceXlsx() {
      return this.$getStaticFile(this.settingByKey('price_xlsx'))
    },
  },
}
</script>

<style lang="scss" scoped>
.controls-wrapper {
  display: grid;
  grid-template-columns: 200px 200px 222px;
  gap: 1.5rem;
  margin-bottom: 2rem;

  .master-catalog-btn {
    font-weight: $font-weight-normal;
  }

  @include media-breakpoint-down(sm) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

    .master-catalog-btn {
      font-weight: $font-weight-medium;
    }
  }
}
</style>
