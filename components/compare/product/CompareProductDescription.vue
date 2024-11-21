<template>
  <div class="compare-product-description-wrapper">
    <b-link
      :title="product.name"
      :to="localePath(`/catalog/products/${product.slug}`)"
      class="compare-product-description"
    >
      <img
        :alt="product.name"
        :src="$getCdnImage(imageUrl, 128)"
        width="128"
        height="128"
        class="product-image mb-8"
      />

      <p
        ref="productName"
        :class="{ 'product-name-overflow': nameOverflows }"
        class="product-name mb-0"
      >
        {{ shortenedName }}
      </p>

      <p class="product-vendor-code mb-0">
        {{ product.vendor_code }}
      </p>
    </b-link>

    <b-button
      :title="$t('global.delete')"
      :aria-label="$t('global.delete')"
      size="sm"
      variant="white"
      class="btn-close btn-icon rounded-pill text-secondary"
      @click="$emit('delete-product', product.id)"
    >
      <svg-icon name="close-16" width="16" height="16" aria-hidden="true" />
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      nameOverflows: false,
      shortenedName: this.product?.name,
    }
  },

  computed: {
    imageUrl() {
      return `/products/${this.product?.image}`
    },
  },

  mounted() {
    this.getShortenedName()
    window.addEventListener('resize', this.getShortenedName, { passive: true })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getShortenedName)
  },

  methods: {
    getShortenedName() {
      const textFrame = this.$refs.productName
      const styles = window.getComputedStyle(textFrame)
      const rect = textFrame.getBoundingClientRect()

      const target = document.createElement('div')
      target.style.font = styles.font
      target.style.width = rect.width + 'px'
      target.style.height = rect.height + 'px'
      target.style.position = 'fixed'
      target.style.top = '-1000px'
      target.style.left = '-1000px'
      target.style.opacity = 0

      document.body.appendChild(target)

      const words = this.product?.name?.split(' ')
      const end = words.length - 1
      const shortenedNameArray = []
      let allFit = false

      for (let i = 0; i <= end; i++) {
        target.innerHTML = ''
        shortenedNameArray.push(words[i])
        let targetText = shortenedNameArray.join(' ')
        if (i < end) {
          targetText += '...'
        }
        target.innerHTML = targetText
        if (target.scrollHeight > target.clientHeight) {
          shortenedNameArray.pop()
          break
        } else if (i === end) {
          allFit = true
        }
      }

      this.shortenedName = `${shortenedNameArray.join(' ')}${
        allFit ? '' : '...'
      }`
    },
  },
}
</script>

<style lang="scss" scoped>
.compare-product-description-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
  transition: $transition-base;
  transition-property: margin-bottom;
}

.compare-product-description {
  display: block;
  line-height: 1.4;
  color: inherit;
  transition: $transition-base;
  transition-property: font-size;
}

.product-image {
  object-fit: contain;
  transition: $transition-base;
  transition-property: width, height;
}

.product-name {
  max-height: 4.2em;
  overflow: hidden;

  &.product-name-overflow {
    position: relative;

    &::after {
      display: block;
      content: '...';
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}

.product-vendor-code {
  font-size: 0.875em;
  color: $gray-600;
}

.btn-close {
  position: absolute;
  right: 0;
  top: 0;
}

@include media-breakpoint-down(xs) {
  .compare-row-collapsed {
    .compare-product-description-wrapper {
      margin-bottom: 1rem;
    }

    .compare-product-description {
      font-size: 0.875rem;
    }

    .product-image {
      width: 68px;
      height: 68px;
    }

    .product-vendor-code {
      font-size: 0.75rem;
    }
  }
}
</style>
