<template>
  <LinkMore
    :href="`${marketCatalogUrl}/${productSlug}?utm_source=ekfgroup_instock`"
    target="_blank"
    @click="$gtm.push({ event: 'btnOrderAvailability' })"
  >
    {{ $t('global.buy') }}
    <svg-icon
      name="arrow-right-16"
      width="16"
      height="16"
      class="icon-sm d-none d-lg-block ml-8"
      aria-hidden="true"
    />
  </LinkMore>
</template>

<script>
export default {
  props: {
    productSlug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      marketCatalogUrl: 'https://market.ekfgroup.com/catalog/products',
    }
  },
}
</script>
