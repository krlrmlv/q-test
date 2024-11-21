<template>
  <section class="catalog-product-tabs">
    <div v-if="loadingTabs"><b-spinner label="Spinning"></b-spinner></div>
    <div v-else>
      <b-nav class="catalog-sidebar-toggles d-md-none" vertical>
        <b-nav-item
          v-for="tab in visibleTabs"
          :key="`tab-mobile-${tab.key}`"
          @click="$emit('tab-activate', tab.key)"
        >
          <span class="flex-fill">
            {{ tab.title }}
          </span>

          <svg-icon
            name="chevron-right-24"
            width="24"
            height="24"
            class="ml-8"
            aria-hidden="true"
          />
        </b-nav-item>
      </b-nav>

      <ComboTabs
        ref="combo-tabs"
        v-model="tabIndex"
        :tabs="visibleTabs"
        content-class="pt-32 pt-lg-72"
        justified
        scrollable
        @scroll="scrollTo"
      >
        <template v-for="(tab, index) in visibleTabs" #[`tab(${index})`]>
          <CatalogOffcanvas
            :key="`sidebar-${index}`"
            :show="tabIndex === index"
            :title="tab.title"
            :tab-key="tab.key"
            @close="$emit('tab-clear')"
          >
            <component
              :is="tab.component"
              :has-software="hasSoftware"
              :items="tab.items"
              :locale="$i18n.locale"
              :parent="product"
              :product="product"
              :ssr-description="ssrDescription"
            />
          </CatalogOffcanvas>
        </template>
      </ComboTabs>
    </div>
  </section>
</template>

<script>
import { BNav, BNavItem, BSpinner } from 'bootstrap-vue'
import { scrollToTarget } from '@/utils/window'

export const SOFTWARE_FILE_TYPES = [
  '2cec8893-2a8f-11ec-a21d-00155d007700',
  'e4694427-f2ab-11ea-a219-00155dfa1116',
]

export default {
  components: {
    BNav,
    BNavItem,
    BSpinner,
  },

  props: {
    activeTab: {
      type: String,
      default: null,
    },
    courses: {
      type: Array,
      default: () => [],
    },
    product: {
      type: Object,
      default: () => ({}),
    },
    productSolutions: {
      type: Array,
      default: () => [],
    },
    ssrDescription: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      loadingTabs: false,
      visibleTabs: [],
    }
  },

  computed: {
    tabIndex: {
      get() {
        return this.visibleTabs?.findIndex(({ key }) => key === this.activeTab)
      },
      set(event) {
        const tabKey = this.visibleTabs?.[event]?.key ?? null
        this.$emit('tab-activate', tabKey)
      },
    },

    documentationTabTitle() {
      /** Change documentation tab title if documents also include software */
      return this.$t(
        `catalog.tabs.documentation.title${
          this.hasSoftware ? 'WithSoftware' : ''
        }`
      )
    },

    hasSoftware() {
      return this.documentation.some(({ file_type_id }) =>
        SOFTWARE_FILE_TYPES.includes(file_type_id)
      )
    },

    /* Files & parameters */
    accessories() {
      return this.getMergedField('accessories')?.map(({ text }) => text)
    },

    categoryCourses() {
      return (
        this.courses?.map(({ id, image, name, type }) => ({
          image: `https://univer.ekfgroup.com/400x400/uploads/${image}`,
          link: `https://univer.ekfgroup.com/course/${id}`,
          name,
          type,
        })) || []
      )
    },

    documentation() {
      const productDocumentFileTypes = new Set(
        this.product?.documents?.map(({ file_type_id }) => file_type_id)
      )

      const filteredCategoryDocuments =
        this.productCategory?.documents?.filter(
          ({ file_type_id }) => !productDocumentFileTypes.has(file_type_id)
        ) || []

      const documents =
        this.product?.documents
          ?.concat(filteredCategoryDocuments)
          ?.sort((a, b) => a?.file_type.sort_order - b?.file_type.sort_order) ||
        []

      return documents.map(
        ({ file, file_type_id, description, name, size, name_plural }) => ({
          file: this.$getStaticFile(`/uploads/products/${file}`, null, false),
          fileSize: size,
          file_type_id,
          name: description || name,
          name_plural,
        })
      )
    },

    productDescription() {
      return this.product?.description || this.productCategory?.description
    },

    productCategory() {
      return this.product?.category?.category
    },

    service() {
      return this.productCategory?.has_service ? [true] : []
    },

    solutions() {
      return this.productSolutions
    },

    specs() {
      return this.product?.property_values
    },

    usages() {
      return this.getMergedField('usages')?.map(({ text }) => text)
    },

    videos() {
      return this.getMergedField('videos')?.map(({ text }) => text)
    },
  },

  async created() {
    this.loadingTabs = true
    this.visibleTabs = await this.handleTabs()
    this.loadingTabs = false
  },

  methods: {
    handleTabs() {
      const tabs = [
        {
          key: 'productDescription',
          component: 'CatalogProductTabDescription',
          contentKeys: ['accessories', 'usages'], // 'descriptions'
          title: 'catalog.tabs.description.title',
          analyticEvents: () => this.$ym('reachGoal', 'CLICKDESCRIPTAB'),
        },
        {
          key: 'specs',
          component: 'CatalogProductTabSpecs',
          title: 'catalog.tabs.specs.title',
          analyticEvents: () => this.$ym('reachGoal', 'CLICKSPECTAB'),
        },
        {
          key: 'documentation',
          component: 'CatalogProductTabDocumentation',
        },
        {
          key: 'videos',
          component: 'CatalogTabVideo',
          title: 'catalog.tabs.video.title',
        },
        {
          key: 'categoryCourses',
          component: 'CatalogTabEducation',
          title: 'catalog.tabs.education.title',
        },
        {
          key: 'service',
          component: 'CatalogTabService',
          title: 'catalog.tabs.service.title',
        },
        {
          key: 'solutions',
          component: 'CatalogTabSolutions',
          title: 'catalog.tabs.solutions.title',
        },
      ]

      const getItems = ({ contentKeys, key }) => {
        return (
          contentKeys?.reduce(
            (acc, cur) => {
              acc[cur] = this[cur]
              return acc
            },
            { [key]: this[key] }
          ) ?? this[key]
        )
      }

      const availableTabs =
        tabs
          ?.filter(
            ({ key, contentKeys }) =>
              Boolean(this[key]?.length) ||
              contentKeys?.some((key) => this[key]?.length)
          )
          ?.map(({ component, contentKeys, key, title, analyticEvents }) => ({
            component,
            items: getItems({ contentKeys, key }),
            key,
            title: this.getTabTitle({ key, title }),
            analyticEvents,
          })) ?? []

      let changeOrder = this.$cookies.get('change_product_tabs_order')

      if (typeof changeOrder === 'undefined') {
        changeOrder = !!Math.round(Math.random())

        this.$cookies.set('change_product_tabs_order', changeOrder, {
          path: '/',
          sameSite: true,
        })
      }

      const descriptionTab = availableTabs[0]
      const specTab = availableTabs[1]

      if (changeOrder) {
        availableTabs[0] = specTab
        availableTabs[1] = descriptionTab
      } else {
        availableTabs[0] = descriptionTab
        availableTabs[1] = specTab
      }

      return availableTabs
    },

    scrollTo() {
      if (!process.client) return
      const scrollTarget = document.querySelector('.combo-tabs')
      scrollToTarget(scrollTarget)
    },

    getMergedField(field) {
      const items = this.product?.[field]?.length
        ? this.product?.[field]
        : this.productCategory?.[field] ?? []
      return items
    },

    getTabTitle(tab) {
      return tab.key === 'documentation'
        ? this.documentationTabTitle
        : this.$t(tab.title)
    },
  },
}
</script>

<style lang="scss" scoped>
.combo-tabs {
  ::v-deep {
    .nav-tabs-wrapper {
      position: sticky;
      top: $header-height-collapsed;
      z-index: 1;
    }

    .nav.nav-tabs {
      padding-top: 0.625rem;
    }

    @include media-breakpoint-down(md) {
      .nav-tabs-wrapper {
        top: $header-height-mobile;
      }
    }
  }
}

body:not(.header-collapsed) {
  .combo-tabs {
    @include media-breakpoint-up(lg) {
      ::v-deep {
        .nav-tabs-wrapper {
          position: sticky;
          top: $header-height-full;
          z-index: 1;
        }
      }
    }
  }
}
@include media-breakpoint-down(sm) {
  .catalog-product-tabs {
    margin-bottom: 1.5rem;
    ::v-deep {
      .nav-tabs {
        display: none;
      }

      .tab-pane {
        transition: none;

        &:not(.active) {
          position: initial;
          visibility: initial;
          opacity: initial;
          transform: initial;
        }
      }
    }
  }
}
</style>
