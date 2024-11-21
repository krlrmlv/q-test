<template>
  <b-container>
    <b-row class="empty-result-section py-64 py-lg-104 mb-64 mb-lg-72">
      <b-col cols="12" lg="7">
        <i18n :path="i18nPath" tag="h3">
          <template #query>
            <span v-text="query" />
          </template>
        </i18n>

        <p v-if="suggestToSwitchLayout">
          <b-link
            :to="{ query: { q: suggestedQuery } }"
            class="text-reset switch-layout"
          >
            {{ $t('search.wrongLayoutHint') }}
            <span class="text-primary" v-text="`«${suggestedQuery}»`" />
          </b-link>
        </p>

        <i18n
          v-else
          :path="i18nHintPath"
          tag="p"
          class="mb-0 col-lg-9 col-xl-7 col-12 px-0"
        >
          <template #catalogLink>
            <b-button
              variant="link"
              class="p-0 mb-2 font-weight-normal"
              @click="handleAnchorClick"
              v-text="$t('search.emptyCatalogLink')"
            />
          </template>

          <template #phone>
            <b-link
              class="text-nowrap"
              href="tel:88003338815"
              v-text="'8 800 333-88-15'"
            />
          </template>

          <template #email>
            <b-link href="mailto:911@ekf.su" v-text="'911@ekf.su'" />
          </template>
        </i18n>
      </b-col>

      <picture class="loupe-picture">
        <source
          srcset="/images/search/loupe-lg.png"
          media="(max-width: 992px)"
        />
        <img src="/images/search/loupe.png" aria-hidden="true" />
      </picture>
    </b-row>

    <h2 class="mb-32 catalog-anchor">{{ $t('catalog.title') }}</h2>

    <CatalogControls />

    <b-row>
      <b-col
        v-for="(category, index) in categories"
        :key="`category-${index}`"
        lg="6"
        class="mb-32 mb-sm-24"
      >
        <CatalogCategoryCard :category="category" :locale="$i18n.locale" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ru from 'convert-layout/ru'
import { scrollToTarget } from '~/utils/window'

export default {
  props: {
    analogs: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters('catalog', ['categories']),

    query() {
      return this.$route.query.q
    },

    i18nPath() {
      return this.analogs
        ? 'search.emptyWithQueryAnalogs'
        : 'search.emptyWithQuery'
    },

    i18nHintPath() {
      return this.i18nPath + 'Hint'
    },

    suggestToSwitchLayout() {
      const isCyrillic = /^[\u0400-\u04FF\s\d.,-_?!+'"]+$/.test(this.query)
      return this.query?.length && !isCyrillic && !this.analogs
    },

    suggestedQuery() {
      if (this.query && this.suggestToSwitchLayout) {
        return ru.fromEn(this.query)
      }
      return null
    },
  },

  mounted() {
    this.analyticEvents()
  },

  methods: {
    analyticEvents() {
      this.analogs
        ? this.$ym('reachGoal', 'no-analogue-found')
        : this.$ym('reachGoal', 'nothing-was-found', {
            'request-without-result': this.query,
          })
    },

    handleAnchorClick() {
      if (process.client) {
        const scrollTarget = document.querySelector('.catalog-anchor')
        scrollToTarget(scrollTarget)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.empty-result-section {
  background-color: $gray-100;
  box-shadow: 0 0 0 100vmax $gray-100;
  clip-path: inset(0 -100vmax);
  position: relative;

  .loupe-picture {
    position: absolute;
    bottom: 0;
    right: 10rem;
    z-index: -1;

    @include media-breakpoint-down(lg) {
      right: 3rem;
    }

    @include media-breakpoint-down(md) {
      right: 0rem;
    }
  }
}

@include media-breakpoint-down(md) {
  h3 {
    font-size: $font-size-7;

    & + p {
      font-size: $font-size-4;
    }
  }
}
</style>
