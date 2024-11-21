<template>
  <div class="menu-panel">
    <ul class="menu-mobile-nav">
      <li v-if="panel.name" class="nav-item nav-item-header">
        <b-button
          :title="$t('global.back')"
          :aria-label="$t('global.back')"
          variant="link"
          class="btn-icon nav-btn pl-0"
          @click="$emit('go-prev')"
        >
          <svg-icon
            name="chevron-left-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </b-button>
        <span class="caption">
          {{ $te(panel.name) ? $t(panel.name) : panel.name }}
        </span>
      </li>

      <li
        v-if="panel.id === 'catalog'"
        class="nav-item-text overflow-hidden py-16"
      >
        <MenuCatalogLinks />
      </li>

      <li v-if="lightingPriceXlsx" class="nav-item-text py-16">
        <CatalogPriceListLink :price-xlsx="lightingPriceXlsx">
          {{ $t('global.downloadLightingPriceList') }}
        </CatalogPriceListLink>
      </li>

      <MenuMobilePanelItem
        v-for="(child, index) in panel.children"
        :key="`child-${index}`"
        :item="child"
        @action="$emit('go-next', child)"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const LIGHTING_CATEGORY_ID = '84'

export default {
  props: {
    panel: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters(['settingByKey']),
    lightingPriceXlsx() {
      const isLightingCategory =
        this.panel?.id === LIGHTING_CATEGORY_ID ||
        this.panel?.parent_id === LIGHTING_CATEGORY_ID

      if (!isLightingCategory) return ''

      return this.$getStaticFile(this.settingByKey('price_lighting_xlsx'))
    },
  },
}
</script>
