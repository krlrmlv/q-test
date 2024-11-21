<template>
  <section class="section section-home">
    <b-container>
      <b-row class="mb-16">
        <b-col md="8" lg="6">
          <h2 class="mb-0">
            {{ $t('catalog.title') }}
          </h2>
        </b-col>
        <b-col md="4" lg="6" class="d-none d-lg-block text-right">
          <LinkMore :to="localePath('/catalog')" target="_blank">
            {{ $t('global.showAllProducts') }}
          </LinkMore>
        </b-col>
      </b-row>

      <b-row class="d-none d-xl-block">
        <b-col>
          <p class="mb-md-64">
            Более 19 000 позиций для энергообеспечения объектов различных
            отраслей
          </p>
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
