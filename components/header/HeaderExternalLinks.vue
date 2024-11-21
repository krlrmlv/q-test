<template>
  <nav class="header-ext-links">
    <b-nav class="header-nav-top">
      <b-nav-item
        link-classes="header-nav-link font-weight-bold"
        :href="priceXlsx"
        @click="$ym('reachGoal', 'SKACHPRICEHEADER')"
        ><svg-icon
          name="arrow-download-16"
          width="16"
          height="16"
          class="d-none d-md-inline mr-4"
          aria-hidden="true"
        />{{ $t('global.downloadPrice') }}
      </b-nav-item>
      <b-nav-item
        :to="localePath('/calculators/mastercost')"
        link-classes="header-nav-link font-weight-bold"
      >
        {{ $t('global.analogsSelection') }}
      </b-nav-item>

      <li v-for="link in seoLinks" :key="link.title" class="nav-item">
        <SeoLink
          :href="link.href"
          target="_blank"
          class="nav-link header-nav-link"
          @click="$ym('reachGoal', link.ymEvent)"
        >
          {{ link.title }}
        </SeoLink>
      </li>
    </b-nav>
  </nav>
</template>

<script>
import { BNav, BNavItem } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BNav,
    BNavItem,
  },

  computed: {
    ...mapGetters(['settingByKey']),

    seoLinks() {
      return [
        {
          title: this.$t('global.b2b'),
          href: 'https://ims3.ekf.su/',
          ymEvent: 'CLKURLB2BHEADER',
        },
        {
          title: this.$t('global.education'),
          href: 'https://univer.ekfgroup.com/',
          ymEvent: 'CLKURLUNIVERHEADER',
        },
        {
          title: this.$t('global.onlineStore'),
          href: 'https://market.ekfgroup.com/?utm_source=ekfgroup_head',
          ymEvent: 'CLKURLMARKETHEADER',
        },
      ]
    },

    priceXlsx() {
      return this.$getStaticFile(this.settingByKey('price_xlsx'))
    },
  },
}
</script>

<style lang="scss" scoped>
.b-skeleton {
  width: 300px;
  height: 1.375rem;
  margin: 0.25rem 0;
}
</style>
