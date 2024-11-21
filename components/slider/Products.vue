<template>
  <div class="swiper-overflow">
    <div ref="sliderWrapper" class="slider-wrapper slider-products">
      <swiper
        ref="swiper"
        :options="swiperOptions"
        :class="swiperClass"
        @slide-change="onSlideChange"
      >
        <swiper-slide
          v-for="(item, index) in items"
          :key="`slide-${index}`"
          :class="[checkIsReplacementEkfAnalog(item) ? 'slide-l' : '']"
        >
          <CatalogCategoryProductCard
            :product="item"
            suggestion-card
            view="grid"
          />
        </swiper-slide>
      </swiper>
    </div>

    <transition-group tag="div" class="swiper-navigation">
      <b-button
        v-show="!isBeginning"
        key="prev-btn"
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
        v-show="!isEnd"
        key="next-btn"
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
    </transition-group>
    <ComparePopup />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'
import { SWIPER_WITH_REPLACMENT_ANALOG_CLASS } from '../constants/product'
import { checkIsReplacementEkfAnalog } from '~/utils/product'
import debounce from '@/utils/debounce'
import 'swiper/css/swiper.min.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
    swiperClass: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      isEnd: false,
      isBeginning: true,
      hasNavigation: false,
    }
  },

  computed: {
    ...mapGetters('compare', ['isInCompare']),
    swiper() {
      return this.$refs.swiper.$swiper
    },

    swiperOptions() {
      let allowSlideNext = true
      let slidesPerView = 1.25
      let breakpoints = {
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
      }

      if (this.swiperClass === SWIPER_WITH_REPLACMENT_ANALOG_CLASS) {
        if (this.items.length < 3) allowSlideNext = false
        slidesPerView = 'auto'
        breakpoints = {
          768: {
            slidesOffsetAfter:
              this.items.length > 2 && this.items.length < 4 ? 220 : -12,
          },
          992: {
            slidesOffsetAfter:
              this.items.length > 2 && this.items.length < 4 ? 300 : -24,
          },
          1240: {
            slidesOffsetAfter:
              this.items.length > 3 && this.items.length < 5 ? 279 : -24,
          },
          1360: {
            slidesOffsetAfter:
              this.items.length > 3 && this.items.length < 5 ? 312 : -24,
          },
          1480: {
            slidesOffsetAfter:
              this.items.length > 3 && this.items.length < 5 ? 356 : -24,
          },
        }
      }

      return {
        autoplay: false,
        spaceBetween: 24,
        noSwiping: false,
        slidesPerView,
        breakpoints,
        allowSlideNext,
      }
    },
  },

  mounted() {
    if (this.swiper?.slides?.length > 2) {
      this.checkSlidesFit()
      window.addEventListener('resize', this.debouncedResizeHandler)
    } else this.isEnd = true
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.debouncedResizeHandler)
  },

  methods: {
    checkIsReplacementEkfAnalog,

    checkSlidesFit() {
      const breakpoint = this.swiper?.currentBreakpoint
      const max = this.swiperOptions.breakpoints[breakpoint]?.slidesPerView
      this.hasNavigation = this.items?.length > max
      this.onSlideChange()
    },

    debouncedResizeHandler: debounce(function () {
      this.checkSlidesFit()
    }, 500),

    onSlideChange() {
      this.isBeginning = this.swiper.isBeginning
      this.isEnd = this.swiper.isEnd
    },

    slidePrev() {
      this.swiper.slidePrev()
      this.onSlideChange()
    },

    slideNext() {
      this.swiper.slideNext()
      this.onSlideChange()
    },
  },
}
</script>

<style lang="scss" scoped>
.analogs-with-replacement-swiper {
  .slide-l {
    width: 50%;
    max-width: 688px;
  }

  .swiper-slide:not(.slide-l) {
    width: calc(25% - 12px);
    max-width: 332px;
  }

  @include media-breakpoint-down(lg) {
    .slide-l {
      width: calc(66.66% - 12px);
    }

    .swiper-slide:not(.slide-l) {
      width: calc(33.33% - 12px);
    }
  }
}

::v-deep {
  .swiper-container:not(.analogs-with-replacement-swiper) {
    .swiper-wrapper {
      .swiper-slide {
        max-width: 332px;
        margin-right: 1.5rem;
      }
    }
  }
}

.swiper-overflow {
  position: relative;

  ::v-deep {
    .swiper-slide {
      height: auto;
    }
  }
}

@each $breakpoint, $width in $grid-breakpoints {
  @include media-breakpoint-up($breakpoint) {
    .swiper-overflow {
      margin: 0 calc(#{$width * 0.5} - #{$grid-gutter-width * 0.5} - 50vw);
      padding: 0 calc(50vw + #{$grid-gutter-width * 0.5} - #{$width * 0.5});
    }

    .swiper-navigation {
      position: absolute;
      top: 50%;
      left: calc(50vw + #{$grid-gutter-width * 0.5} - #{$width * 0.5} - 2rem);
      right: calc(50vw + #{$grid-gutter-width * 0.5} - #{$width * 0.5} - 2rem);
      height: 0;
    }
  }
}

@include media-breakpoint-down(xs) {
  .swiper-overflow {
    margin-left: -$grid-gutter-width * 0.5;
    margin-right: -$grid-gutter-width * 0.5;
    padding-left: 0;
    padding-right: 0;
  }

  .swiper-navigation {
    display: none;
  }

  .swiper-slide {
    padding-left: $grid-gutter-width * 0.5;
    padding-right: $grid-gutter-width * 0.5;
  }
}

@include media-breakpoint-up(sm) {
  .swiper-navigation-btn {
    position: absolute;
    top: 0;
    margin: 0;
    transform: translateY(-50%);

    &.swiper-navigation-btn-prev {
      left: 0;
    }

    &.swiper-navigation-btn-next {
      right: 0;
    }
  }
}

@media (min-width: #{map-get($container-max-widths, 'xl') + 100px}) {
  .swiper-overflow {
    margin: 0 -50px;
    padding: 0 50px;

    ::v-deep {
      .slider-wrapper {
        margin: -1.25rem -1.5rem -1.75rem;
        padding: 1.25rem 1.5rem 1.75rem;
      }

      .swiper-container {
        overflow: visible;
      }
    }
  }

  .swiper-navigation {
    left: calc(50px - 2rem);
    right: calc(50px - 2rem);
  }
}
</style>
