<template>
  <div
    ref="root"
    :style="{
      '--progress-duration': progressDuration,
      '--swiper-height': swiperHeight,
    }"
  >
    <Swiper
      ref="swiper"
      :options="swiperOptions"
      class="swiper-solution-benefits"
    >
      <SwiperSlide
        v-for="(slide, index) in slides"
        :key="`slide-${index}`"
        ref="slides"
        :class="{ fullwidth: index === currentSlide }"
      >
        <div
          v-if="!slide.hidden"
          class="card card-solution-benefit"
          @click="handleSlideClick(index)"
        >
          <div class="card-body">
            <span class="card-icon-wrapper">
              <img
                :src="$getStaticImage(slide.icon)"
                alt=""
                aria-hidden="true"
                class="card-icon"
              />
            </span>
            <p class="h6 card-title">
              {{ slide.title }}
            </p>
            <p class="card-description mb-0">
              {{ slide.description }}
            </p>
          </div>
          <span class="slide-progress" />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'

const AUTOPLAY_DELAY = 5000

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  props: {
    benefits: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      currentSlide: -1,
      swiperHeight: null,
      swiperInstance: null,
      swiperOptions: {
        autoplay: {
          delay: AUTOPLAY_DELAY,
          disableOnInteraction: false,
        },
        breakpoints: {
          576: {
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 16,
            slidesOffsetAfter: 136,
          },
          1200: {
            spaceBetween: 16,
            slidesOffsetAfter: 201,
          },
        },
        loop: false,
        on: {
          init: () => {
            this.handleSwiperInit()
          },
          reachEnd: () => {
            this.handleReachEnd()
          },
          slideChange: () => {
            this.handleSlideChange()
          },
        },
        slidesOffsetAfter: 21,
        slidesPerView: 'auto',
        spaceBetween: 8,
      },
    }
  },

  computed: {
    progressDuration() {
      return `${AUTOPLAY_DELAY / 1000}s`
    },

    slides() {
      /* Add empty slide to always offset swiper by one slide width */
      return [{ hidden: true }, ...this.benefits]
    },
  },

  mounted() {
    this.getMaxSlideHeight()
    window.addEventListener('resize', this.getMaxSlideHeight, { passive: true })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getMaxSlideHeight)
  },

  methods: {
    getMaxSlideHeight() {
      /* Calculate height of tallest fully expanded ('.fullwidth') slide
       * to prevent swiper height change when slides change width */
      const wrapper = document.createElement('div')

      wrapper.style.setProperty('display', 'flex')
      wrapper.style.setProperty('position', 'fixed')
      wrapper.style.setProperty('left', '-1000vw')
      wrapper.style.setProperty('top', '-1000vh')
      wrapper.style.setProperty('opacity', '0')

      this.$refs.slides?.forEach((slide) => {
        const clone = slide?.$el?.cloneNode(true)
        clone.classList.add('fullwidth')
        wrapper.appendChild(clone)
      })

      this.$refs.root.appendChild(wrapper)

      this.swiperHeight = wrapper?.clientHeight
        ? `${Math.ceil(wrapper.clientHeight)}px`
        : null

      wrapper.remove()
    },

    handleReachEnd() {
      if (typeof this.swiperInstance?.slideTo === 'function') {
        this.swiperInstance.slideTo(0, 300)
      }
    },

    handleSlideChange() {
      const index = this.swiperInstance?.activeIndex ?? 0
      this.currentSlide = index + 1
    },

    handleSlideClick(index) {
      if (
        typeof this.swiperInstance?.slideTo === 'function' &&
        index <= this.slides?.length
      ) {
        /* index - 1 due to 1st slide always being hidden */
        this.swiperInstance.slideTo(index - 1)
      }
    },

    handleSwiperInit() {
      this.$nextTick(() => {
        this.swiperInstance = this.$refs.swiper?.$swiper
        this.currentSlide = 1
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper-solution-benefits {
  width: 260px;
  margin: 0;
  margin-left: -256px;
  overflow: visible;
}

.card-solution-benefit {
  height: 100%;
  min-height: var(--swiper-height);
  font-size: $font-size-2;
  line-height: 1.4;
  border: $border-width solid $white;
  color: $white;
  background-color: transparent;
  transition: $transition-base;
  transition-property: color, background-color;
  cursor: pointer;
}

.card-body {
  padding: 1.5rem;
}

.card-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin-bottom: 0.5rem;
  border-radius: $rounded-pill;
  background-color: $white;
  transition: $transition-base;
  transition-property: background-color;
}

.card-icon {
  transition: $transition-base;
  transition-property: filter;
}

.card-description {
  font-size: 0;
  opacity: 0;
  transition: $transition-base;
  transition-property: opacity;
}

.card-title {
  margin-bottom: 0.5rem;
}

.slide-progress {
  display: block;
  position: absolute;
  left: -$border-width;
  right: -$border-width;
  bottom: -$border-width;
  height: 0.25rem;
  background-color: $primary;
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: $transition-base;
  transition-property: transform;
  transition-duration: var(--progress-duration);
}

::v-deep {
  .swiper-slide {
    width: 240px;
    height: auto;

    &.fullwidth {
      width: 260px;

      .card-solution-benefit {
        color: $body-color;
        background-color: $white;
      }

      .card-icon-wrapper {
        background-color: $primary;
      }

      .card-icon {
        filter: invert(100%);
      }

      .card-description {
        font-size: inherit;
        opacity: 1;
      }

      .slide-progress {
        opacity: 1;
        transform: scaleX(1);
      }
    }
  }
}

@include media-breakpoint-down(xs) {
  .swiper-solution-benefits {
    margin-left: -248px;
  }
}

@include media-breakpoint-up(md) {
  .swiper-solution-benefits {
    width: 375px;
  }

  ::v-deep {
    .swiper-slide {
      &.fullwidth {
        width: 375px;
      }
    }
  }
}

@include media-breakpoint-up(xl) {
  .swiper-solution-benefits {
    width: 440px;
  }

  ::v-deep {
    .swiper-slide {
      &.fullwidth {
        width: 440px;

        .card-body {
          padding: 1.5rem 2.5rem;
        }
      }
    }
  }
}
</style>
