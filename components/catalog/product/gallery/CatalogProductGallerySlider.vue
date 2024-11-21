<template>
  <div class="catalog-product-gallery-slider swiper-no-swiping">
    <transition name="fade" mode="out-in">
      <b-skeleton
        v-if="loading"
        key="slide-skeleton"
        variant="light"
        class="gallery-slide-content"
      />

      <div v-else>
        <Swiper ref="swiper" :options="swiperOptions">
          <SwiperSlide
            v-for="(slide, index) in slides"
            :key="`slide-${index}`"
            class="gallery-slide"
          >
            <CatalogProductSpinner
              v-if="slide.spinner"
              key="slide-spinner"
              :folder="slide.spinner"
              :title="spinnerTitle"
              class="gallery-slide-content"
              inverse
            />

            <component
              :is="inModal ? 'div' : 'b-link'"
              v-else
              :class="{ 'gallery-modal-toggle': !inModal }"
              class="gallery-slide-content"
              @click="showModal"
            >
              <picture>
                <source
                  v-for="size in imageSizes"
                  :key="`source-${size.breakpoint}`"
                  :media="getPictureMedia(size)"
                  :srcset="getPictureSrcset(slide, size.size)"
                />
                <img
                  :alt="slide.name"
                  :src="getPictureSrcset(slide, 600)"
                  loading="lazy"
                  class="gallery-slide-image"
                />
              </picture>
            </component>
          </SwiperSlide>
        </Swiper>

        <svg-icon
          v-if="showZoomIcon"
          name="zoom-in-24"
          width="24"
          height="24"
          class="icon-zoom-in"
          aria-hidden="true"
        />

        <b-button
          v-show="inModal"
          :disabled="isBeginning"
          :title="$t('global.back')"
          :aria-label="$t('global.back')"
          variant="link"
          class="swiper-navigation-btn swiper-navigation-btn-prev"
          @click="slidePrev"
        >
          <svg-icon
            name="chevron-left-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </b-button>

        <b-button
          v-show="inModal"
          :disabled="isEnd"
          :title="$t('global.forward')"
          :aria-label="$t('global.forward')"
          variant="link"
          class="swiper-navigation-btn swiper-navigation-btn-next"
          @click="slideNext"
        >
          <svg-icon
            name="chevron-right-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </b-button>
      </div>
    </transition>
  </div>
</template>

<script>
import { BSkeleton } from 'bootstrap-vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    BSkeleton,
    Swiper,
    SwiperSlide,
  },

  props: {
    activeIndex: {
      type: [Number, String],
      default: 0,
    },
    inModal: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    slides: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isReady: false,
      swiper: null,
      swiperOptions: {
        autoplay: false,
        grabCursor: false,
        initialSlide: this.activeIndex,
        noSwiping: true,
        observer: true,
        observeParents: true,
        on: {
          init: () => {
            this.handleSwiperInit()
          },
          slideChange: () => {
            this.handleSlideChange()
          },
        },
        slidesPerView: 1,
      },
    }
  },

  computed: {
    imageSizes() {
      return this.inModal
        ? [
            { breakpoint: 991, size: 520 },
            { breakpoint: null, size: 600 },
          ]
        : [
            { breakpoint: 991, size: 346 },
            { breakpoint: 1239, size: 454 },
            { breakpoint: null, size: 438 },
          ]
    },

    isBeginning() {
      return this.swiper?.isBeginning
    },

    isEnd() {
      return this.swiper?.isEnd
    },

    showZoomIcon() {
      return !this.inModal && !this.slides[this.activeIndex]?.spinner
    },

    siteUrl() {
      return process.env.SITE_URL
    },

    spinnerTitle() {
      return this.slides?.[0]?.name
    },
  },

  watch: {
    activeIndex(event) {
      this.slideTo(event)
    },
  },

  methods: {
    getPictureMedia(size) {
      return size.breakpoint ? `(max-width: ${size.breakpoint}px)` : null
    },

    getPictureSrcset(image, size) {
      return this.$getCdnImage(`/products/${image?.file}`, size)
    },

    handleSlideChange() {
      this.$emit('slide-change', this.swiper?.activeIndex)
    },

    handleSwiperInit() {
      this.$nextTick(() => {
        this.swiper = this.$refs.swiper.$swiper
        this.isReady = true
      })
    },

    showModal() {
      if (this.inModal) return
      this.$emit('show-modal')
    },

    slidePrev() {
      this.swiper?.slidePrev()
    },

    slideNext() {
      this.swiper?.slideNext()
    },

    slideTo(index) {
      this.swiper?.slideTo(index)
    },
  },
}
</script>

<style lang="scss" scoped>
.catalog-product-gallery-slider {
  position: relative;
  color: $gray-300;
  transition: $transition-base;
  transition-property: color;

  .icon-zoom-in {
    position: absolute;
    left: 1rem;
    top: 1rem;
    z-index: 1;
    pointer-events: none;
  }

  &:hover {
    color: $gray-400;
  }

  ::v-deep {
    .swiper-container {
      opacity: initial;
    }
  }
}

.gallery-slide {
  position: relative;

  &::before {
    display: block;
    content: '';
    padding-bottom: 100%;
  }

  .gallery-slide-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.gallery-slide-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.gallery-modal-toggle {
  border: $border-width solid transparent;
  transition: $transition-base;
  transition-property: color, border-color;

  &:hover {
    border-color: $gray-200;
  }
}

.swiper-navigation-btn {
  position: absolute;
  top: 0;
  height: 100%;
  padding: 1rem;
  border: none;
  color: $gray-400;
  transition: $transition-base;
  transition-property: color, opacity;
  z-index: 1;

  &:not(:disabled):not(.disabled) {
    .icon {
      position: relative;
    }

    &::before {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 100%;
      background-image: linear-gradient(to left, transparent, $gray-200);
      opacity: 0;
      transition: $transition-base;
      transition-property: opacity;
    }

    &:hover {
      color: $gray-500;

      &::before {
        opacity: 1;
      }
    }
  }

  &:disabled {
    opacity: 0.2;
  }
}

.swiper-navigation-btn-prev {
  left: -1.5rem;
}

.swiper-navigation-btn-next {
  right: -1.5rem;

  &:not(:disabled):not(.disabled) {
    &::before {
      left: auto;
      right: 0;
      // transform: scaleX(-1);
    }
  }
}

@include media-breakpoint-down(sm) {
  ::v-deep {
    .gallery-slide,
    .swiper-navigation-btn {
      display: none;
    }
  }
}

@include media-breakpoint-up(lg) {
  .swiper-navigation-btn-prev {
    left: -3rem;
  }

  .swiper-navigation-btn-next {
    right: -3rem;
  }
}
</style>
