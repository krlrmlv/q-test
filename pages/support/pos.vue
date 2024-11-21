<template>
  <main>
    <b-container tag="section" class="pb-32 pb-lg-64">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2">{{ pageHeading }}</h1>

      <p class="mb-32 mb-lg-64">
        {{ pageDescription }}
      </p>

      <ComboTabs
        v-model="activeTabIndex"
        :tabs="tabs"
        content-class="pt-32 pt-lg-64"
        justified
        scrollable
      >
        <template v-for="(category, index) in categories" #[`tab(${index})`]>
          <div :key="`tab-${index}`">
            <h4 class="d-none d-lg-block mb-32">{{ $t(category.title) }}</h4>

            <b-row class="row-pos mb-8">
              <b-col
                v-for="(item, itemIndex) in category.items"
                :key="`card-${index}-${itemIndex}`"
                cols="6"
                lg="3"
                class="mb-16 mb-lg-24"
              >
                <SupportPosCard
                  :item="item"
                  @click="$gtm.push({ event: 'Promotional' })"
                />
              </b-col>
            </b-row>
          </div>
        </template>
      </ComboTabs>
    </b-container>
  </main>
</template>

<script>
import POS_CATEGORIES from '@/graphql/support/PosCategories'

export default {
  async asyncData({ app, $graphql, query }) {
    const { categories } = await $graphql.default.request(POS_CATEGORIES, {
      locale: app.i18n.locale,
    })

    let activeTabIndex = Number(query.tab)
    if (!categories?.[activeTabIndex]) {
      activeTabIndex = 0
    }

    return { categories, activeTabIndex }
  },

  data() {
    return {
      breadcrumbs: [{ text: 'support.posMaterials.title', active: true }],
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },

  computed: {
    currentCategory() {
      return this.categories[this.activeTabIndex]
    },

    pageDescription() {
      return this.$t(
        `support.posMaterials.${
          this.currentCategory ? 'descriptionShort' : 'description'
        }`
      )
    },

    pageHeading() {
      return this.currentCategory?.name ?? this.$t('support.posMaterials.title')
    },

    pageTitle() {
      const lines = []

      if (this.currentCategory?.name) lines.push(this.currentCategory.name)
      lines.push(this.$t('pageTitle'))

      return lines.join(' — ')
    },

    tabs() {
      return this.categories?.map(({ name }) => name)
    },
  },

  watch: {
    activeTabIndex() {
      this.updateQuery()
    },
  },

  created() {
    this.updateQuery()
  },

  methods: {
    updateQuery() {
      this.$router.push({
        path: this.$route.path,
        query: { tab: this.activeTabIndex },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(xs) {
  ::v-deep {
    .row-pos {
      margin-left: -0.3125rem;
      margin-right: -0.3125rem;

      & > [class*='col'] {
        padding-left: 0.3125rem;
        padding-right: 0.3125rem;
      }
    }

    .card.card-pos {
      padding-left: 0;
      padding-right: 0;

      .card-body {
        font-size: 1rem;
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "pageTitle": "POS materials — EKF"
  },
  "ru": {
    "pageTitle": "POS-материалы — EKF"
  }
}
</i18n>
