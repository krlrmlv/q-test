<template>
  <section class="section-home section-home-catalog">
    <b-container class="order-lg-1">
      <h2>{{ $t('title') }}</h2>
      <b-row>
        <b-col md="10" lg="8" xl="7">
          <p class="fs-2 fs-md-3 mb-32">
            {{ $t('subtitle') }}
          </p>
        </b-col>
      </b-row>
    </b-container>

    <HomeSliderCatalog class="order-lg-3" />

    <b-container class="order-lg-2">
      <b-row class="mx-n4 mb-lg-56">
        <b-col
          cols="12"
          sm="8"
          md="6"
          lg="auto"
          offset-sm="2"
          offset-md="3"
          offset-lg="0"
          class="px-4"
        >
          <b-button
            :href="masterCatalog"
            target="_blank"
            variant="primary"
            class="mb-8"
            block
            @click="$gtm.push({ event: 'lnkCatalog' })"
          >
            {{ $t('global.downloadCatalog') }} (PDF)
          </b-button>
        </b-col>
        <b-col
          cols="12"
          sm="8"
          md="6"
          lg="auto"
          offset-sm="2"
          offset-md="3"
          offset-lg="0"
          class="px-4"
        >
          <b-dropdown
            :text="$t('global.downloadPriceList')"
            variant="gray-200"
            class="mb-8"
            block
          >
            <b-dropdown-item
              :href="priceXls"
              @click="$gtm.push({ event: 'lnkPrice' })"
            >
              {{ $t('global.downloadXls') }}
            </b-dropdown-item>
            <b-dropdown-item
              :href="priceXlsx"
              @click="$gtm.push({ event: 'lnkPrice' })"
            >
              {{ $t('global.downloadXlsx') }}
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
        <b-col
          cols="12"
          sm="8"
          md="6"
          lg="auto"
          offset-sm="2"
          offset-md="3"
          offset-lg="0"
          class="mr-lg-auto px-4"
        >
          <b-button
            :to="localePath('/catalog')"
            variant="gray-200"
            class="mb-8"
            block
          >
            {{ $t('catalog.goToCatalog') }}
          </b-button>
        </b-col>
        <b-col
          cols="12"
          sm="8"
          md="6"
          lg="auto"
          offset-sm="2"
          offset-md="3"
          offset-lg="0"
          class="px-4"
        >
          <LinkMore href="https://etim.ekfgroup.com/" target="_blank" block>
            {{ $t('global.goToEtimCatalog') }}
          </LinkMore>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { BDropdown, BDropdownItem } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BDropdown,
    BDropdownItem,
  },

  computed: {
    ...mapGetters(['settingByKey']),

    masterCatalog() {
      return this.$getStaticFile(this.settingByKey('master_catalog'))
    },

    priceXls() {
      return this.$getStaticFile(this.settingByKey('price_xls'))
    },

    priceXlsx() {
      return this.$getStaticFile(this.settingByKey('price_xlsx'))
    },
  },
}
</script>

<style lang="scss" scoped>
.section-home-catalog {
  display: flex;
  flex-direction: column;
}
</style>

<i18n>
{
  "ru": {
    "subtitle": "Все для ввода и распределения электроэнергии, интернета вещей, автоматизации процессов, дистанционного управления, энергосбережения",
    "title": "Более 19 000 позиций в каталоге"
  },
  "en": {
    "subtitle": "Everything for the input and distribution of electricity, the Internet of things, process automation, remote control, energy saving",
    "title": "More than 19 000 SKUs in catalog"
  }
}
</i18n>
