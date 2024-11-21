<template>
  <div class="solutions-solution-picture">
    <div class="active-picture-wrapper">
      <transition name="fade" mode="out-in">
        <b-skeleton
          v-if="!activeSlide.url"
          key="slide-skeleton"
          variant="light"
          class="active-picture active-picture-placeholder"
        />
        <b-link
          v-else
          :key="activeSlide.url"
          class="active-picture"
          @click="showModal"
        >
          <picture>
            <source
              v-for="size in imageSizes"
              :key="`source-${size.breakpoint}`"
              :srcset="$getStaticImage(activeSlide.url, size.size)"
              :media="size.breakpoint && `(max-width: ${size.breakpoint}px)`"
            />
            <img
              :src="$getStaticImage(activeSlide.url, 556)"
              :alt="activeSlide.alt"
              class="active-picture-image"
            />
          </picture>
        </b-link>
      </transition>
    </div>

    <div
      v-if="images.length > 1"
      :class="{ 'swiper-ready': swiperReady }"
      class="swiper-overflow"
    >
      <div ref="sliderWrapper" class="slider-wrapper swiper-no-swiping">
        <Swiper ref="swiper" :options="swiperOptions">
          <SwiperSlide v-for="(slide, index) in images" :key="`slide-${index}`">
            <b-link
              class="solution-thumbnail-wrapper"
              @click="setActiveSlide(slide)"
            >
              <picture>
                <source
                  v-for="size in thumbSizes"
                  :key="`source-${size.breakpoint}`"
                  :srcset="$getStaticImage(slide.url, size.size)"
                  :media="
                    size.breakpoint && `(max-width: ${size.breakpoint}px)`
                  "
                />
                <img
                  :src="$getStaticImage(slide.url, 86)"
                  :alt="slide.alt"
                  class="solution-thumbnail"
                />
              </picture>
            </b-link>
          </SwiperSlide>
          <div slot="pagination" class="swiper-pagination" />
        </Swiper>
      </div>

      <b-button
        :disabled="isBeginning || navigationDisabled"
        :title="$t('global.back')"
        :aria-label="$t('global.back')"
        variant="link"
        class="btn-swiper-nav btn-swiper-nav-prev"
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
        :disabled="isEnd || navigationDisabled"
        :title="$t('global.forward')"
        :aria-label="$t('global.forward')"
        variant="link"
        class="btn-swiper-nav btn-swiper-nav-next"
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

    <MediaModal
      v-model="modalVisible"
      :items="modalImages"
      :start="modalIndex"
    />
  </div>
</template>

<script>
import { BSkeleton } from 'bootstrap-vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { getViewportWidth } from '@/utils/window'
import 'swiper/css/swiper.min.css'

export default {
  components: {
    BSkeleton,
    Swiper,
    SwiperSlide,
  },

  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      activeSlide: {},
      imageSizes: [
        { breakpoint: 1199, size: 454 },
        { breakpoint: null, size: 556 },
      ],
      isBeginning: false,
      isEnd: false,
      modalVisible: false,
      modalIndex: 0,
      navigationDisabled: false,
      swiperInstance: null,
      swiperReady: false,
      swiperOptions: {
        autoplay: false,
        breakpoints: {
          992: {
            slidesPerView: 5,
            noSwiping: true,
          },
          1200: {
            slidesPerView: 6,
            noSwiping: true,
          },
        },
        grabCursor: true,
        noSwiping: false,
        on: {
          init: () => {
            this.handleSwiperInit()
          },
          progress: () => {
            this.handleSlideChange()
          },
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        roundLengths: true,
        slidesPerView: 1,
        spaceBetween: 16,
      },
      thumbSizes: [
        { breakpoint: 360, size: 334 },
        { breakpoint: 575, size: 549 },
        { breakpoint: 767, size: 514 },
        { breakpoint: 991, size: 346 },
        { breakpoint: 1199, size: 60 },
        { breakpoint: 1479, size: 78 },
        { breakpoint: null, size: 86 },
      ],
    }
  },

  computed: {
    modalImages() {
      return this.images?.map(({ alt, url }) => ({
        alt,
        url: this.$getStaticImage(url),
      }))
    },
  },

  mounted() {
    this.activeSlide = this.images[0] ?? {}

    this.setNavigationDisabled()
  },

  beforeUnmount() {
    this.swiperReady = false
  },

  methods: {
    handleSlideChange() {
      this.setNavigationPositions()
    },

    handleSwiperInit() {
      this.$nextTick(() => {
        this.swiperInstance = this.$refs.swiper?.$swiper
        this.swiperReady = true
        this.setNavigationPositions()
      })
    },

    setActiveSlide(slide) {
      this.activeSlide = slide
    },

    setNavigationDisabled() {
      const vw = getViewportWidth()
      const breakpoint = Object.keys(this.swiperOptions?.breakpoints)
        .sort((a, b) => Number(b) - Number(a))
        .find((key) => Number(key) <= vw)

      const maxSlides =
        (breakpoint
          ? this.swiperOptions?.breakpoints?.[breakpoint]?.slidesPerView
          : this.swiperOptions?.slidesPerView) ?? 1

      this.navigationDisabled = this.images?.length <= maxSlides
    },

    setNavigationPositions() {
      this.isBeginning = this.swiperInstance?.isBeginning
      this.isEnd = this.swiperInstance?.isEnd
    },

    showModal() {
      const index = this.images.indexOf(this.activeSlide)
      if (index >= 0) this.modalIndex = index
      this.modalVisible = true
    },

    slidePrev() {
      if (typeof this.swiperInstance?.slidePrev === 'function') {
        this.swiperInstance.slidePrev()
      }
    },

    slideNext() {
      if (typeof this.swiperInstance?.slideNext === 'function') {
        this.swiperInstance.slideNext()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$zoom-icon: url('data:image/svg+xml,<svg width="24" height="24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11 4c-3.866 0-7 3.134-7 7 0 3.866 3.134 7 7 7 3.866 0 7-3.134 7-7 0-3.866-3.134-7-7-7zm-9 7c0-4.9706 4.0294-9 9-9 4.9706 0 9 4.0294 9 9 0 2.125-0.7365 4.078-1.9681 5.6177l4.3823 4.3823-1.4142 1.4142-4.3823-4.3823c-1.5397 1.2316-3.4927 1.9681-5.6177 1.9681-4.9706 0-9-4.0294-9-9zm10-4h-2v3h-3v2h3v3h2v-3h3v-2h-3z" fill="#{$secondary}"/></svg>');

.swiper-overflow {
  transition: $transition-base;
  transition-property: opacity;

  &:not(.swiper-ready) {
    height: 0;
    opacity: 0;
  }
}

.active-picture-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  overflow: hidden;

  &::before {
    display: block;
    content: '';
    padding-bottom: 100%;
  }
}

.active-picture {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: $border-width solid $border-color;
  transition: $transition-base;
  transition-property: border-color;

  &.active-picture-placeholder {
    border-radius: 0;
    border-color: transparent;
  }

  &:not(.active-picture-placeholder) {
    &::after {
      display: block;
      content: '';
      position: absolute;
      right: 1.5rem;
      bottom: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      background-image: escape-svg($zoom-icon);
    }
  }

  &:hover {
    border-color: $gray-400;
  }
}

.active-picture-image {
  width: 100%;
  height: 100%;
  object-fit: none;
}

.solution-thumbnail-wrapper {
  display: block;
  position: relative;
  width: 100%;
  border: $border-width solid $border-color;
  transition: $transition-base;
  transition-property: border-color;

  &::before {
    display: block;
    content: '';
    padding-bottom: 100%;
  }

  &:hover {
    border-color: $gray-400;
  }
}

.solution-thumbnail {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-pagination {
  position: static;
  padding: 0.5rem 0;
}

@include media-breakpoint-down(md) {
  .active-picture-wrapper {
    display: none;
  }

  .btn-swiper-nav {
    display: none;
  }
}

@include media-breakpoint-up(lg) {
  .swiper-overflow {
    position: relative;
    padding: 0 2.5rem;
  }

  .swiper-pagination {
    display: none;
  }

  .btn-swiper-nav {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2.5rem;
    padding: 0;
    border: none;
    color: $secondary;
  }

  .btn-swiper-nav-prev {
    left: 0;
  }

  .btn-swiper-nav-next {
    right: 0;
  }
}
</style>
