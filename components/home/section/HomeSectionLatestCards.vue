<template>
  <section class="section-home overflow-hidden">
    <b-container>
      <b-row align-v="center" class="mb-32 mb-md-64">
        <b-col md="8" lg="6">
          <h2 class="mb-0">
            {{ $t('latestCards.title') }}
          </h2>
        </b-col>
        <b-col md="4" lg="6" class="d-none d-lg-block text-right">
          <LinkMore :to="localePath('/catalog')" target="_blank">
            {{ $t('latestCards.linkText') }}
          </LinkMore>
        </b-col>
      </b-row>

      <div class="mb-8 mb-lg-0">
        <b-row>
          <b-col
            v-for="(product, index) in products"
            :key="`product-${index}`"
            cols="6"
            lg="3"
            class="mb-16 mb-lg-24"
          >
            <CatalogCategoryProductCard
              v-if="product"
              :product="product"
              view="grid"
            />
          </b-col>
        </b-row>
      </div>

      <div class="text-center d-lg-none mt-16">
        <LinkMore :to="localePath('/catalog')" target="_blank">
          {{ $t('latestCards.linkText') }}
        </LinkMore>
      </div>
    </b-container>

    <ComparePopup />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters('compare', ['isInCompare']),

    products() {
      return this.slides?.map(({ product }) => product) ?? []
    },
  },
}
</script>
