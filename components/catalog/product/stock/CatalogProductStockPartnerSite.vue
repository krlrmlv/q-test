<template>
  <LinkMore
    v-if="item.partner && item.partner.site_url"
    :href="getUrlWithPrefix(item.partner.site_url)"
    target="_blank"
    @click="$ym('reachGoal', 'CLKURLDISTPOPCARD')"
  >
    {{ $t('catalog.goToSite') }}
    <svg-icon
      name="arrow-right-16"
      width="16"
      height="16"
      class="d-none d-lg-block ml-8"
      aria-hidden="true"
    />
  </LinkMore>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getUrlWithPrefix(url) {
      return url.match(/http(s?):.+/) ? url : `http://${url}`
    },
  },
}
</script>
