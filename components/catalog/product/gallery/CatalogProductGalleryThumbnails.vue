<template>
  <div
    :class="{ 'has-navigation': showNavigation }"
    class="catalog-product-gallery-thumbnails swiper-overflow"
  >
    <div
      ref="sliderWrapper"
      class="slider-wrapper slider-gallery-thumbnails swiper-no-swiping"
    >
      <Swiper ref="swiperThumbnails" :options="swiperOptions">
        <SwiperSlide v-for="(slide, index) in slides" :key="`slide-${index}`">
          <b-link
            :class="{ active: index === activeIndex }"
            class="gallery-thumbnail"
            @click="$emit('slide-click', index)"
          >
            <img
              v-if="slide.spinner"
              :alt="$t('catalog.view360')"
              src="/images/catalog/spinner-64.svg"
              class="gallery-thumbnail-image"
            />

            <picture v-else>
              <source
                v-for="size in imageSizes"
                :key="`source-${size.breakpoint}`"
                :media="getPictureMedia(size)"
                :srcset="getPictureSrcset(slide, size.size)"
              />
              <img
                :alt="slide.name"
                :src="getPictureSrcset(slide, 80)"
                class="gallery-thumbnail-image"
              />
            </picture>
          </b-link>
        </SwiperSlide>

        <div slot="pagination" class="swiper-pagination d-md-none" />
      </Swiper>
    </div>

    <b-button
      v-if="showNavigation"
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
      v-if="showNavigation"
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
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  props: {
    activeIndex: {
      type: Number,
      default: null,
    },
    inModal: {
      type: Boolean,
      default: false,
    },
    showNavigation: {
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
        breakpoints: {
          768: {
            slidesPerView: this.inModal ? 'auto' : 4,
            noSwiping: true,
          },
          992: {
            slidesPerView: this.inModal ? 'auto' : 5,
            noSwiping: true,
          },
        },
        grabCursor: true,
        noSwiping: false,
        observer: true,
        observeParents: true,
        on: {
          init: () => {
            this.handleSwiperInit()
          },
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        slidesPerView: 1,
        spaceBetween: 4,
      },
    }
  },

  computed: {
    imageSizes() {
      return this.inModal
        ? [
            { breakpoint: 767, size: 516 },
            { breakpoint: null, size: 77 },
          ]
        : [
            { breakpoint: 360, size: 336 },
            { breakpoint: 575, size: 551 },
            { breakpoint: 767, size: 516 },
            { breakpoint: null, size: 71 },
          ]
    },

    isBeginning() {
      return this.swiper?.isBeginning
    },

    isEnd() {
      return this.swiper?.isEnd
    },

    siteUrl() {
      return process.env.SITE_URL
    },
  },

  watch: {
    'slides.length'() {
      this.swiper?.update()
    },
    showNavigation() {
      this.swiper?.update()
    },
  },

  methods: {
    getPictureMedia(size) {
      return size.breakpoint ? `(max-width: ${size.breakpoint}px)` : null
    },

    getPictureSrcset(image, size) {
      return this.$getCdnImage(`/products/${image?.file}`, size)
    },

    handleSwiperInit() {
      this.$nextTick(() => {
        this.swiper = this.$refs.swiperThumbnails?.$swiper
        this.isReady = true
      })
    },

    slidePrev() {
      this.swiper?.slidePrev()
    },

    slideNext() {
      this.swiper?.slideNext()
    },
  },
}
</script>

<style lang="scss" scoped>
$nav-btn-width: 2rem;

::v-deep {
  .swiper-pagination-bullet {
    background: $gray-400;
    border: none;
    &.swiper-pagination-bullet-active {
      background: $gray-600;
      transform: none;
    }
  }
}

.catalog-product-gallery-thumbnails {
  ::v-deep {
    .swiper-container {
      opacity: initial;
    }
  }
}

.gallery-thumbnail {
  display: block;
  position: relative;
  width: 100%;

  &::before {
    display: block;
    content: '';
    padding-bottom: 100%;
  }
}

.gallery-thumbnail-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

@include media-breakpoint-down(sm) {
  .swiper-pagination-bullets {
    bottom: 0;
  }
  .gallery-thumbnail-image {
    height: 95%;
  }
  .swiper-navigation-btn {
    display: none;
  }
}

@include media-breakpoint-up(md) {
  .swiper-overflow {
    position: relative;

    &.has-navigation {
      padding: 0 $nav-btn-width;
    }
  }

  .swiper-slide {
    width: 72px !important;
  }

  .swiper-navigation-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    width: $nav-btn-width;
    padding: 0;
    border: none;
    color: $secondary;
    transition: $transition-base;
    transition-property: color, opacity;

    &:disabled {
      opacity: 0.2;
    }
  }

  .swiper-navigation-btn-prev {
    left: 0;
  }

  .swiper-navigation-btn-next {
    right: 0;
  }

  .gallery-thumbnail {
    display: block;
    position: relative;
    width: 100%;
    border: $border-width solid transparent;
    transition: $transition-base;
    transition-property: border-color;

    &::before {
      display: block;
      content: '';
      padding-bottom: 100%;
    }

    &:hover {
      border-color: $gray-200;
    }

    &.active {
      border-color: $gray-300;

      &:hover {
        border-color: $gray-400;
      }
    }
  }
}
</style>
