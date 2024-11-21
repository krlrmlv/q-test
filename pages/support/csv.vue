<template>
  <main>
    <form
      ref="xls_download_form"
      :action="`${apiUrl}/ekfgroup/csv-download`"
      method="POST"
    >
      <input :value="fileFormat" name="file_format" hidden="true" />
      <input :value="format" name="format" hidden="true" />
      <input :value="$i18n.locale" name="locale" hidden="true" />

      <input
        v-for="cat in selectedCategoriesWithChildren"
        :key="cat"
        :value="cat"
        hidden="true"
        name="categories[]"
      />

      <input
        v-for="prop in selectedPropertiesForQuery"
        :key="prop"
        :value="prop"
        hidden="true"
        name="properties[]"
      />
    </form>

    <b-container tag="section" class="pb-32 pb-lg-64">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2">{{ $t('support.csv.title') }}</h1>

      <p class="mb-32 mb-lg-64">
        {{ $t('support.csv.description') }}
      </p>

      <section class="mb-32 mb-lg-64">
        <h4 class="mb-32">{{ $t('selectCategories') }}</h4>

        <b-row align-v="center" class="mb-16 mb-lg-32">
          <b-col xl="auto">
            <b-row align-v="center" class="mb-n8">
              <b-col cols="12" lg="auto" order-lg="2" class="mb-8">
                <b-row class="mx-n4">
                  <b-col cols="6" lg="auto" class="px-4">
                    <b-button
                      size="sm"
                      variant="light"
                      block
                      @click="selectCategoriesNone"
                    >
                      {{ $t('uncheckAll') }}
                    </b-button>
                  </b-col>

                  <b-col cols="6" lg="auto" class="px-4">
                    <b-button
                      size="sm"
                      variant="light"
                      block
                      @click="selectCategoriesAll"
                    >
                      {{ $t('checkAll') }}
                    </b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>

          <b-col xl="auto" class="d-none d-xl-block ml-auto">
            <b-row align-v="center" class="mx-n8">
              <b-col cols="auto" class="text-nowrap px-8">
                {{ $t('format.title') }}
              </b-col>

              <b-col cols="auto" class="px-8">
                <b-form-radio-group v-model="format" :options="formatOptions" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-form-checkbox-group v-model="selectedCategories">
          <b-row class="mb-n8">
            <b-col
              v-for="(category, index) in subCategories"
              :key="`category-${index}`"
              lg="6"
              class="mb-8"
            >
              <b-form-checkbox :value="category.id">
                {{ category.name }}
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-form-checkbox-group>
      </section>

      <transition name="fade" mode="out-in">
        <section v-if="selectedCategories.length">
          <h4>{{ $t('selectProperties') }}</h4>

          <b-row align-v="center" class="mb-16 mb-lg-32">
            <b-col xl="auto">
              <b-row align-v="center" class="mb-n8">
                <b-col cols="12" lg="auto" order-lg="2" class="mb-8">
                  <b-row class="mx-n4">
                    <b-col cols="6" lg="auto" class="px-4">
                      <b-button
                        size="sm"
                        variant="light"
                        block
                        @click="selectPropertiesNone"
                      >
                        {{ $t('uncheckAll') }}
                      </b-button>
                    </b-col>

                    <b-col cols="6" lg="auto" class="px-4">
                      <b-button
                        size="sm"
                        variant="light"
                        block
                        @click="selectPropertiesAll"
                      >
                        {{ $t('checkAll') }}
                      </b-button>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col cols="12" lg="auto" order-lg="1" class="mb-8">
                  <p
                    class="fs-2 fs-lg-3 mb-0"
                    v-html="$t('propertiesByDefault')"
                  />
                </b-col>
              </b-row>
            </b-col>

            <b-col xl="auto" class="d-none d-xl-block ml-auto">
              <b-row align-v="center" class="mx-n8">
                <b-col cols="auto" class="text-nowrap px-8">
                  {{ $t('format.title') }}
                </b-col>

                <b-col cols="auto" class="px-8">
                  <b-form-radio-group
                    v-model="format"
                    :options="formatOptions"
                  />
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <div v-if="loading" class="text-center">
            <b-spinner variant="primary" />
          </div>

          <b-form-checkbox-group
            v-else
            v-model="selectedProperties"
            class="mb-lg-32"
          >
            <b-row class="mb-8 mb-lg-24">
              <b-col
                v-for="{ property } in properties"
                :key="`property-${property.id}`"
                md="6"
                xl="4"
                class="mb-8"
              >
                <b-form-checkbox :value="property.id">
                  {{ property.name }}
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-form-checkbox-group>

          <b-row class="mb-16">
            <b-col sm="6" md="4" class="mb-24">
              <b-row align-v="center" class="fs-2 d-xl-none mx-n8">
                <b-col cols="12" lg="auto" class="text-nowrap mb-8 px-8">
                  {{ $t('format.title') }}
                </b-col>

                <b-col cols="12" lg="auto" class="mb-8 px-8">
                  <b-form-radio-group
                    v-model="format"
                    :options="formatOptions"
                  />
                </b-col>
              </b-row>
            </b-col>

            <b-col sm="6" md="8">
              <b-row align-v="center" class="justify-content-end mx-n8">
                <b-col md="auto" order-lg="2" class="mb-16 px-8">
                  <b-button
                    variant="primary"
                    :disabled="loading || !properties.length"
                    @click="downloadFile(false)"
                  >
                    <svg-icon
                      name="file/csv-24"
                      width="24"
                      height="24"
                      class="mr-8"
                      aria-hidden="true"
                    />
                    {{ $t('saveToCsv') }}
                  </b-button>
                </b-col>

                <b-col md="auto" order-lg="1" class="mb-16 px-8">
                  <b-button
                    variant="link"
                    :disabled="loading || !properties.length"
                    class="text-secondary text-hover-dark text-decoration-none border-0 p-0"
                    @click="downloadFile(true)"
                  >
                    <svg-icon
                      name="file/xls-24"
                      width="24"
                      height="24"
                      class="mr-8"
                      aria-hidden="true"
                    />
                    {{ $t('saveToXls') }}
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </section>
      </transition>
    </b-container>
  </main>
</template>

<script>
import {
  BFormCheckbox,
  BFormCheckboxGroup,
  BFormRadioGroup,
  BSpinner,
} from 'bootstrap-vue'
import CATALOG_CATEGORIES from '@/graphql/catalog/CatalogCategoriesWithChildrenForCsv'
import CATALOG_CATEGORY_PROPERTIES from '@/graphql/catalog/CatalogCategoryPropertiesForCsv'
import debounce from '@/utils/debounce'

export default {
  components: {
    BFormCheckbox,
    BFormCheckboxGroup,
    BFormRadioGroup,
    BSpinner,
  },

  async asyncData({ app, $graphql }) {
    const variables = { locale: app.i18n.locale }

    const { data } = await $graphql.default.request(
      CATALOG_CATEGORIES,
      variables
    )

    return { categories: data }
  },

  data() {
    return {
      breadcrumbs: [{ text: 'support.csv.title', active: true }],
      fileFormat: 'xls',
      format: 'standart',
      formatOptions: [
        { value: 'standart', text: this.$t('format.standard') },
        { value: 'etim', text: this.$t('format.etim') },
      ],
      loading: false,
      properties: [],
      selectedCategories: [],
      selectedProperties: [],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },

  computed: {
    apiUrl() {
      return process.env.REST_API_URL
    },

    selectedCategoriesWithChildren() {
      const categories =
        this.subCategories?.filter(({ id }) =>
          this.selectedCategories?.includes(id)
        ) ?? []

      return this.getCategoriesArrayWithChildrenRecursive(categories)
    },

    selectedPropertiesForQuery() {
      return this.selectedProperties?.length
        ? this.selectedProperties
        : this.properties.map(({ property: { id } }) => id)
    },

    subCategories() {
      return this.categories
        ?.map((category) => category.children)
        ?.flatMap((category) => category)
    },
  },

  watch: {
    selectedCategories() {
      this.fetchPropertiesDebounce()
    },
  },

  methods: {
    async fetchProperties() {
      this.loading = true

      try {
        const variables = {
          categories: this.selectedCategoriesWithChildren,
          locale: this.$i18n.locale,
        }

        const { properties } = await this.$graphql.default.request(
          CATALOG_CATEGORY_PROPERTIES,
          variables
        )

        this.properties = properties
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    downloadFile(xls = false) {
      this.fileFormat = xls ? 'xls' : 'csv'

      this.$nextTick(() => {
        this.$refs.xls_download_form.submit()
      })
    },

    getCategoriesArrayWithChildrenRecursive(categories) {
      return (
        categories
          ?.map((category) => {
            if (category?.children?.length) {
              return [
                category.id,
                ...this.getCategoriesArrayWithChildrenRecursive(
                  category.children
                )?.flatMap((id) => id),
              ]
            } else {
              return [category.id]
            }
          })
          ?.flatMap((id) => id) ?? []
      )
    },

    selectCategoriesAll() {
      this.selectPropertiesNone()
      this.subCategories?.forEach(({ id }) => this.selectedCategories.push(id))
    },

    selectCategoriesNone() {
      this.selectedCategories = []
    },

    selectPropertiesAll() {
      this.selectPropertiesNone()
      this.properties?.forEach(({ property: { id } }) =>
        this.selectedProperties.push(id)
      )
    },

    selectPropertiesNone() {
      this.selectedProperties = []
    },

    fetchPropertiesDebounce: debounce(function () {
      this.selectedProperties = []
      this.fetchProperties()
    }, 1000),
  },
}
</script>

<i18n>
{
  "en": {
    "checkAll": "Check all",
    "csvDownloadErrorMessage": "Try to select fewer categories or properties",
    "csvDownloadErrorTitle": "Unexpected Error!",
    "format": {
      "etim": "ETIM",
      "standard": "Standard",
      "title": "Export format"
    },
    "pageTitle": "Export to CSV — EKF",
    "propertiesByDefault": "<strong>All properties</strong> are exported by&nbsp;default",
    "saveToCsv": "Export to CSV",
    "saveToXls": "Export to Excel",
    "selectCategories": "Select categories",
    "selectProperties": "Select properties",
    "uncheckAll": "Uncheck all"
  },
  "ru": {
    "checkAll": "Выбрать все метки",
    "csvDownloadErrorMessage": "Попробуйте выбрать меньшее кол-во категорий или свойств",
    "csvDownloadErrorTitle": "Неизвестная ошибка!",
    "format": {
      "etim": "ETIM",
      "standard": "Стандарт",
      "title": "Формат выгрузки данных"
    },
    "pageTitle": "Выгрузка в CSV — EKF",
    "propertiesByDefault": "По&nbsp;умолчанию выгружаются <strong>все параметры</strong>",
    "saveToCsv": "Выгрузить в CSV",
    "saveToXls": "Выгрузить в Excel",
    "selectCategories": "Выберите необходимые категории",
    "selectProperties": "Выгрузите необходимые параметры",
    "uncheckAll": "Снять все метки"
  }
}
</i18n>
