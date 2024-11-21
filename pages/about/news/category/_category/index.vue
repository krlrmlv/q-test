<template>
  <main>
    <b-container tag="section">
      <AppBreadcrumbs :items="breadcrumbs" />

      <div class="mb-32">
        <h2>{{ category.name }}</h2>

        <NewsProjectsDescription
          v-if="hasFilters"
          @anchor-click="handleDescriptionClick"
        />
      </div>

      <NewsCategoryFilters
        v-if="hasFilters"
        :loading="loading"
        :properties="properties"
        :selected-values="selectedValues"
        class="mb-32"
        @filter="handleFilter"
        @filter-all="handleFilterAll"
        @reset="resetFilters"
      />

      <div v-if="hasArticles">
        <b-row :class="{ loading: loading }" class="category-articles mb-32">
          <b-col
            v-for="article in category.articles"
            :key="`article-${article.id}`"
            sm="6"
            lg="3"
            class="mb-16"
          >
            <NewsCard :article="article" />
          </b-col>
        </b-row>

        <AppPagination
          v-if="numberOfPages > 1"
          :show-first-last-numbers="true"
          :per-page="perPage"
          :disabled="loading"
          :value="currentPage"
          :total-rows="totalRows"
          align="right"
          size="sm"
          class="mb-32"
          @change="handlePageChange"
        />
      </div>

      <p v-else class="text-muted mb-48">
        {{ $t('search.empty') }}
        <b-link @click="resetFilters">
          {{ $t('filters.resetFilters') }}
        </b-link>
      </p>
    </b-container>

    <section v-if="hasFilters" class="bg-light py-64 py-lg-96">
      <b-container>
        <a id="request-form" class="anchor" />

        <b-row>
          <b-col lg="10" xl="8" offset-lg="1" offset-xl="2">
            <h2 class="mb-32 mb-lg-64" v-text="$t('formTitle')" />

            <FormFeedback
              :code="formCode"
              gtm-event="frmRequestReference"
              disable-file-upload
              disable-mindbox
              @success="handleFormSuccess"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
import sortBy from 'lodash/sortBy'
import sendToMindbox from '@/utils/mindbox'
import NEWS_CATEGORY_QUERY from '@/graphql/news/NewsCategory'
import NEWS_ARTICLE_PROPERTIES_QUERY from '@/graphql/news/NewsArticleProperties'
import { trimUrl } from '@/utils/trim-url'
import { mindboxSubscriptions } from '~/components/constants/mindbox'

const CATEGORIES_WITH_FILTERS = ['projects']
const FORM_CODE = 931

export default {
  name: 'PageAboutNewsCategory',

  async asyncData({ error, i18n, params, query, route, $graphql }) {
    // const perPage = 16
    const perPage = parseInt(route.query.perPage) || 16
    const currentPage = parseInt(query.page) || 1
    const offset = perPage * (currentPage - 1)

    /* Fetch category data & articles */
    const { categories } = await $graphql.default.request(NEWS_CATEGORY_QUERY, {
      locale: i18n.locale,
      slug: params.category,
      limit: perPage,
      offset,
    })
    const category = categories?.[0]
    if (!category) return error({ statusCode: 404 })

    /* Fetch category properties if needed */
    let properties = []
    const hasFilters = CATEGORIES_WITH_FILTERS.includes(params.category)

    if (hasFilters) {
      const propertyData = await $graphql.default.request(
        NEWS_ARTICLE_PROPERTIES_QUERY,
        { locale: i18n.locale, slug: params.category }
      )
      properties =
        sortBy(
          propertyData?.properties.map((property) => {
            property.property_values = sortBy(
              property.property_values,
              'sort_order'
            )
            return property
          }),
          'sort_order'
        ) || []
    }

    const selectedValues = properties.reduce((selected, { id }) => {
      selected[id] = []
      return selected
    }, {})

    /* Set breadcrumbs and page meta data */
    const categoryType = route.name.startsWith('about-articles')
      ? 'articles'
      : 'news'
    const breadcrumbs = [
      { text: `about.${categoryType}`, to: `/about/${categoryType}` },
      { text: category?.name, active: true },
    ]

    return {
      breadcrumbs,
      category,
      categoryType,
      currentPage,
      formCode: FORM_CODE,
      hasFilters,
      loading: false,
      perPage,
      properties,
      selectedValues,
    }
  },

  head() {
    return {
      title: this.pageTitle,
      link: this.$route.query.page
        ? [{ rel: 'canonical', href: this.$route.path }]
        : null,
    }
  },

  computed: {
    description() {
      return this.$t('description').replace(
        /%(.+)%/gi,
        '<a href="#request-form" class="form-anchor">$1</>'
      )
    },

    hasArticles() {
      return Boolean(this.category?.articles?.length)
    },

    numberOfPages() {
      return Math.ceil(this.totalRows / this.perPage)
    },

    pageTitle() {
      let title = (this.category?.name && `${this.category.name} — `) || ''
      title += this.$t(`pageTitles.${this.categoryType}`)
      return title
    },

    totalRows() {
      return Number(this.category?.total?.aggregate?.count) || 0
    },
  },

  watch: {
    '$route.query': {
      deep: true,
      handler() {
        this.refetch()
      },
    },
  },

  methods: {
    async handleFormSuccess(form) {
      const pageUrl = `${trimUrl(process.env.SITE_URL)}${this.$route.fullPath}`

      await sendToMindbox('EKFGroup.EmailForm', {
        customerAction: {
          customFields: {
            formName: 'Запрос референс-листа - форма в футере',
            LandingName: pageUrl,
          },
        },
        customer: {
          fullName: form.fullName,
          email: form?.email,
          mobilePhone: form?.phonenumber || '',
          subscriptions: mindboxSubscriptions,
        },
      })
    },

    async refetch() {
      const offset = this.perPage * (this.currentPage - 1)
      const where = {}
      const whereConditions = []

      Object.keys(this.selectedValues).forEach((key) => {
        if (this.selectedValues[key]?.length) {
          whereConditions.push({
            property_values: {
              property_id: { _eq: key },
              value: { _in: this.selectedValues[key] },
            },
          })
        }
      })

      if (whereConditions?.length) {
        where._and = whereConditions
      }

      const variables = {
        limit: this.perPage,
        locale: this.$i18n.locale,
        offset,
        slug: this.$route.params.category,
        where,
      }

      this.loading = true

      const { categories } = await this.$graphql.default.request(
        NEWS_CATEGORY_QUERY,
        variables
      )
      this.category = categories[0]

      this.loading = false
    },

    handleDescriptionClick() {
      const target = document.getElementById('request-form')
      target?.scrollIntoView({ behavior: 'smooth' })
    },

    handleFilter({ property_id, selected }) {
      this.selectedValues[property_id] = selected
      this.currentPage = 1
      this.refetch()
    },

    handleFilterAll(event) {
      this.selectedValues = event
      this.currentPage = 1
      this.refetch()
    },

    handlePageChange(page) {
      this.currentPage = page
      this.$router.push({ query: { ...this.$route.query, page } })
      this.scrollToTop()
    },

    resetFilters() {
      this.selectedValues = this.properties.reduce((selected, { id }) => {
        selected[id] = []
        return selected
      }, {})
      this.currentPage = 1
      this.refetch()
    },

    scrollToTop() {
      if (!process.client) return
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style lang="scss" scoped>
.category-articles {
  position: relative;
  transition: $transition-base;
  transition-property: opacity;

  &.loading {
    opacity: 0.5;
  }
}

.spinner-loading {
  position: absolute;
  left: 1rem;
  top: 1rem;
  width: 2rem;
  height: 2rem;
  z-index: 1;
}
</style>

<i18n>
{
  "en": {
    "formTitle": "Request complete reference list",
    "pageTitles": {
      "articles": "Articles — EKF",
      "news": "News — EKF"
    }
  },
  "ru": {
    "formTitle": "Запросить полный референс-лист",
    "pageTitles": {
      "articles": "Статьи — компания EKF",
      "news": "Новости — компания EKF"
    }
  }
}
</i18n>
