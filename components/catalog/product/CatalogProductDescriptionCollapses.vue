<template>
  <div class="catalog-product-description-collapses">
    <div v-if="productProperties.length" class="d-none d-lg-block mb-48">
      <CatalogProductPropertiesList :properties="productProperties" />

      <b-button
        variant="link"
        class="collapse-anchor"
        @click="handleAnchorClick('specs')"
      >
        {{ $t('catalog.tabs.specs.anchorText') }}
        <svg-icon name="caret" width="8" height="4" aria-hidden="true" />
      </b-button>
    </div>

    <div v-if="htmlContent || productDescription">
      <h5 class="d-md-none mb-12">
        {{ $t('catalog.tabs.description.title') }}
      </h5>

      <p
        ref="descriptionContent"
        class="description-excerpt"
        :class="{ 'hide-overlay': !collapseVisible }"
      >
        <span v-if="htmlContent" v-html="htmlContent"></span>
        <span v-else>{{ productDescription }}</span>
      </p>

      <transition name="fade">
        <b-button
          v-show="collapseVisible"
          variant="link"
          class="collapse-anchor"
          @click="handleAnchorClick('productDescription')"
        >
          {{ $t('global.readMore') }}
          <svg-icon name="caret" width="8" height="4" aria-hidden="true" />
        </b-button>
      </transition>
    </div>
  </div>
</template>

<script>
const AB_TEST_YM_EVENT = {
  specs: 'CLICKTHRUSPECTAB',
  productDescription: 'CLICKTHRUREADMORETAB',
}
const VISIBLE_PROPERTIES = 7

export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      collapseVisible: false,
      htmlContent: '',
    }
  },

  async fetch() {
    if (!this.product.html_description) return

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

    this.htmlContent = md.render(this.product.html_description)
  },

  computed: {
    productDescription() {
      return (
        this.product?.description ||
        this.product?.category?.category?.description
      )
    },

    productProperties() {
      const properties = []
      if (this.product?.status) {
        properties.push({
          property: { name: this.$t('catalog.status') },
          value: this.product.status,
        })
      }
      this.product?.property_values?.forEach((property) => {
        if (property?.property?.name && property?.value) {
          properties.push(property)
        }
      })
      return properties.slice(0, VISIBLE_PROPERTIES)
    },
  },

  mounted() {
    this.initDescriptionAnchor()
    window.addEventListener('resize', this.initDescriptionAnchor, {
      passive: true,
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.initDescriptionAnchor)
  },

  methods: {
    handleAnchorClick(tabKey) {
      /** A/B test for tabs order */
      this.$ym('reachGoal', AB_TEST_YM_EVENT[tabKey])

      this.$emit('tab-activate', tabKey)
    },
    initDescriptionAnchor() {
      const content = this.$refs.descriptionContent
      if (content) {
        const contentHeight = Math.ceil(content.scrollHeight)
        const contentVisibleHeight = Math.floor(
          content.getBoundingClientRect().height
        )
        this.collapseVisible = contentHeight > contentVisibleHeight
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.collapse-anchor {
  padding: 0;
  font-size: $font-size-2;
  font-weight: $font-weight-normal;
  color: $gray-800;
  border: none;

  &:not(:disabled):not(.disabled) {
    &:hover,
    &:focus {
      text-decoration: none;
      color: $secondary;
    }
  }

  .icon {
    margin-left: 0.5rem;
  }
}

.description-excerpt {
  position: relative;
  max-height: 5rem;
  margin-bottom: 0.5rem;
  font-size: $font-size-2;
  line-height: 1.25rem;
  color: $gray-800;
  overflow: hidden;

  &::after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 5rem;
    background-image: linear-gradient(to top, $white 10%, rgba($white, 0));
    transform: translateY(100%);
    transition: $transition-base;
    transition-property: transform;
    z-index: 1;
  }
  &:not(.hide-overlay) {
    &::after {
      transform: translateY(0);
    }
  }
}

@include media-breakpoint-down(sm) {
  .collapse-anchor {
    display: block;
    width: 100%;
  }
}
</style>
