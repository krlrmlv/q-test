<template>
  <section class="section section-home">
    <b-container>
      <b-row class="mb-32 mb-lg-64">
        <b-col md="10" lg="8">
          <h2 class="mb-0">
            {{ $t('catalog.title') }}
          </h2>
          <p v-if="subtitle" class="mt-24">{{ subtitle }}</p>
        </b-col>
        <b-col lg="4" class="d-none d-lg-block text-right mb-auto">
          <LinkMore :to="localePath('/catalog')" target="_blank">
            {{ $t('global.showAllProducts') }}
          </LinkMore>
        </b-col>
      </b-row>

      <b-row>
        <b-col
          v-for="(category, index) in visibleCategories"
          :key="`category-${index}`"
          lg="6"
          class="mb-32 mb-sm-24"
        >
          <CatalogCategoryCard :category="category" :locale="$i18n.locale" />
        </b-col>
      </b-row>

      <div class="text-center d-lg-none">
        <LinkMore :to="localePath('/catalog')" target="_blank">
          {{ $t('global.showAllProducts') }}
        </LinkMore>
      </div>
    </b-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    subtitle: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters('catalog', ['categories']),

    visibleCategories() {
      return this.categories?.slice(0, 4)
    },
  },
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(xs) {
  ::v-deep {
    .card-catalog-category {
      background-color: transparent;
    }
  }
}
</style>
