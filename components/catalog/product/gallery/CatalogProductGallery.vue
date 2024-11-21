<template>
  <div class="catalog-product-gallery">
    <CatalogProductGallerySlider
      :active-index="activeIndex"
      :in-modal="inModal"
      :loading="showSkeleton"
      :slides="slides"
      @show-modal="showModal"
      @slide-change="handleSlideChange"
    />

    <CatalogProductGalleryThumbnails
      :active-index="activeIndex"
      :in-modal="inModal"
      :show-navigation="showNavigation"
      :slides="slides"
      :class="{ 'd-lg-none': !showThumbnails }"
      class="mt-md-8 mt-lg-16"
      @slide-click="setActiveIndex"
    />

    <CatalogProductGalleryModal
      v-if="!inModal"
      v-model="modalVisible"
      :images="images"
      :spinner="spinner"
      :start="activeIndex"
    />
  </div>
</template>

<script>
import { getViewportWidth } from '@/utils/window'

import 'swiper/css/swiper.min.css'

export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    inModal: {
      type: Boolean,
      default: false,
    },
    spinner: {
      type: String,
      default: null,
    },
    start: {
      type: [Number, String],
      default: 0,
    },
  },

  data() {
    return {
      activeIndex: 0,
      breakpoint: 768,
      modalVisible: false,
      vw: 0,
    }
  },

  computed: {
    activeSlide() {
      return this.slides?.[this.activeIndex] || {}
    },

    maxThumbnails() {
      let max = 4
      if (this.inModal) {
        max = this.vw >= 1200 ? 11 : this.vw >= 992 ? 9 : 6
      } else {
        max = this.vw >= 992 ? 5 : 4
      }
      return max
    },

    showNavigation() {
      return (
        this.slides?.length > this.maxThumbnails && this.vw >= this.breakpoint
      )
    },

    showSkeleton() {
      return !this.activeSlide?.file && !this.activeSlide?.spinner
    },

    showSpinner() {
      return Boolean(this.spinner) && this.vw >= this.breakpoint
    },

    showThumbnails() {
      return this.slides?.length > 1
    },

    slides() {
      const images = [...this.images]
      if (this.showSpinner) {
        images.splice(1, 0, { spinner: this.spinner })
      }
      return images
    },
  },

  created() {
    this.setStartIndex()
  },

  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize, { passive: true })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    handleResize() {
      this.vw = getViewportWidth()
    },

    handleSlideChange(index) {
      if (index !== null && !isNaN(index)) {
        this.activeIndex = index
      }
    },

    setActiveIndex(index) {
      this.activeIndex = index
    },

    setStartIndex() {
      this.setActiveIndex(this.start)
    },

    showModal() {
      if (this.inModal) return
      this.modalVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(sm) {
  .catalog-product-gallery-slider {
    display: none;
  }
}
</style>
