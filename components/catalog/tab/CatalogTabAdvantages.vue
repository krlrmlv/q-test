<template>
  <div class="lh-140 pb-md-48">
    <h4 class="border-bottom pb-8">
      {{ $t('catalog.tabs.specs.advantages') }}
    </h4>

    <b-row class="mb-8 mb-md-24">
      <b-col
        v-for="(benefit, index) in advantages"
        :key="`benefit-${index}`"
        cols="6"
        md="4"
        lg="2"
      >
        <div class="mb-8">
          <img :src="benefit.file" :alt="benefit.description" width="88" />
        </div>

        <p class="mb-24">{{ benefit.description }}</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'CatalogTabAdvantages',

  serverCacheKey: ({ locale, product }) =>
    `${locale}::${product.id}::${product.created_at}`,

  props: {
    advantages: {
      type: Array,
      default: () => [],
    },
    locale: {
      type: String,
      required: true,
    },
    product: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
