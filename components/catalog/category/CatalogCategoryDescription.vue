<template>
  <div class="catalog-category-description">
    <b-row class="flex-nowrap">
      <b-col md="auto" class="d-none d-md-block px-32">
        <div class="category-image-wrapper">
          <img
            :alt="category.name"
            :src="$getStaticImage(category.image, 219)"
            width="219"
            height="219"
            class="category-image"
          />
        </div>
      </b-col>

      <b-col md="auto" class="flex-fill content-column">
        <h1 class="h2 mb-16">
          {{ category.name }}
        </h1>

        <div v-if="category.description" class="mb-32 mb-md-48">
          <TextCollapse
            v-if="ssrDescription"
            ref="textCollapse"
            class="category-description-text"
            @ready="collapseReady = true"
          >
            <div v-html="htmlContent" />
          </TextCollapse>

          <client-only v-else>
            <TextCollapse
              ref="textCollapse"
              class="category-description-text"
              @ready="collapseReady = true"
            >
              <div v-html="htmlContent" />
            </TextCollapse>
          </client-only>
        </div>

        <b-row align-v="center" class="mx-n16">
          <b-col v-if="categoryLink" xl="auto" class="mb-32 mb-xl-0 px-16">
            <CatalogDescriptionLink
              :link="categoryLink"
              :link-classes="'btn-block btn-outline-primary'"
              :gtm-event="'btnProductPage'"
            />
          </b-col>

          <b-col v-if="catalogFile" md="auto" class="mb-12 mb-xl-0 px-16">
            <CatalogCategoryDownloadButton :href="catalogFile">
              {{ $t('catalog.downloadCategoryCatalog') }} (PDF)
            </CatalogCategoryDownloadButton>
          </b-col>

          <b-col md="auto" class="mb-12 mb-xl-0 px-16">
            <CatalogCategoryDownloadButton :href="priceXlsx">
              {{ $t('global.downloadPriceList') }}
            </CatalogCategoryDownloadButton>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const LIGHTING_CATEGORY_ID = '84'

export default {
  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
    ssrDescription: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      collapseReady: false,
      htmlContent: this.category?.description,
      markdownReady: false,
    }
  },

  async fetch() {
    /* Render markdown with minimal set of rules enabled */
    const MarkdownIt = await import('markdown-it')
    /* eslint-disable new-cap */
    const md = new MarkdownIt.default('zero', { breaks: true }).enable([
      'normalize',
      'block',
      'inline',
      'emphasis',
      'link',
      'list',
      'newline',
      'paragraph',
      'strikethrough',
      'text',
    ])

    this.markdownReady = true
    this.htmlContent = md.render(this.category?.description)
  },

  computed: {
    ...mapGetters(['settingByKey']),

    catalogFile() {
      const files = this.category?.catalogFile
      if (!files?.length) return

      const path = `/uploads/products/${files[0].file}`
      return this.$getStaticFile(path, null, false)
    },

    categoryLink() {
      const url = this.category?.link
      if (!url) return

      /* i18nze link if it's relative */
      return url.startsWith('/') ? this.localePath(this.category.link) : url
    },

    priceXlsx() {
      const isLightingCategory =
        this.category?.id === LIGHTING_CATEGORY_ID ||
        this.category?.root?.id === LIGHTING_CATEGORY_ID

      const fileName = isLightingCategory ? 'price_lighting_xlsx' : 'price_xlsx'

      return this.$getStaticFile(this.settingByKey(fileName))
    },

    resetHeightTrigger() {
      return this.collapseReady && this.markdownReady
    },
  },

  watch: {
    /* Force update text collapse expanded height after markdown is rendered */
    resetHeightTrigger: {
      handler(event) {
        if (event) {
          this.$nextTick(() => {
            if (typeof this.$refs.textCollapse?.setFullHeight === 'function') {
              this.$refs.textCollapse.setFullHeight()
            }
          })
        }
      },

      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.catalog-category-description {
  position: relative;
}

.category-image-wrapper {
  width: 219px;
  height: 219px;
  overflow: hidden;
}

.category-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  font-size: $font-size-1;
  color: $text-muted;
}

.content-column {
  max-width: 944px;
}

.category-description-text {
  line-height: 1.4;
}

@include media-breakpoint-up(md) {
  .content-column {
    padding-inline: 0.5rem;
  }

  .catalog-category-description {
    padding-top: 3rem;
  }
}
</style>
