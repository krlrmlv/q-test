<template>
  <b-row class="mx-n4">
    <b-col sm="auto" class="mb-8 px-4">
      <b-button :href="catalogLink" target="_blank" variant="primary" block>
        {{ $t('catalog.downloadCatalogPDF') }}
      </b-button>
    </b-col>
    <b-col sm="auto" class="mb-8 px-4">
      <b-button :to="localePath('/catalog')" variant="gray-200" block>
        {{ $t('catalog.goToCatalog') }}
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    catalogLink: {
      type: String,
      default: null,
    },
  },
}
</script>
