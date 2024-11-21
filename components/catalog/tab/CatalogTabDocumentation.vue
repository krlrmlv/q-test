<template>
  <div class="lh-140 pb-md-48">
    <FileDownloadLink
      v-for="(file, index) in items"
      :key="`file-${index}`"
      :item="file"
      class="mb-16"
    />
  </div>
</template>

<script>
export default {
  name: 'CatalogTabDocumentation',

  serverCacheKey: ({ locale, parent }) =>
    `${locale}::${parent.id}::${parent.created_at}`,

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    locale: {
      type: String,
      required: true,
    },
    parent: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
