<template>
  <div
    class="slider-tabs"
    :style="`--progress-transition-duration: ${(autoplay || 0) / 1000}s`"
  >
    <Swiper
      v-if="swiperReady"
      ref="swiper"
      :options="swiperOptions"
      class="swiper-no-swiping"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="`slide-${index}`">
        <HomeTabbedSliderSlide :slide="slide" />
      </SwiperSlide>
    </Swiper>

    <HomeTabbedSliderSlide v-else :slide="firstSlide" />

    <b-nav class="nav-slider-tabs d-none d-md-flex">
      <li
        v-for="(slide, index) in slides"
        :key="`tab-${index}`"
        class="nav-item"
      >
        <b-link
          :class="{ active: index === swiper.realIndex }"
          class="nav-link"
          @click="slideTo(index)"
        >
          <p class="mb-8 text-primary">
            {{ slide.title }}
          </p>
          <p class="mb-0">
            {{ slide.subtitle }}
          </p>
        </b-link>
        <span class="nav-item-progress"></span>
      </li>
    </b-nav>
  </div>
</template>

<script>
import { BNav } from 'bootstrap-vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'

const DELAY = 5000

export default {
  components: {
    BNav,
    Swiper,
    SwiperSlide,
  },

  props: {
    autoplay: {
      type: [Number, String, Boolean],
      default: 5000,
    },
    slides: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      swiper: {},
      swiperOptions: {
        autoHeight: true,
        autoplay: {
          delay: this.autoplay,
          disableOnInteraction: false,
        },
        breakpoints: {
          768: {
            autoHeight: false,
            noSwiping: true,
          },
        },
        init: false,
        loop: true,
        noSwiping: false,
        slidesPerView: 1,
        spaceBetween: 0,
        on: {
          init: () => {
            this.onSwiperInit()
          },
        },
      },
      swiperReady: false,
    }
  },

  computed: {
    firstSlide() {
      return this.slides?.[0] ?? {}
    },
  },

  mounted() {
    setTimeout(() => {
      this.initSwiper()
    }, DELAY)
  },

  methods: {
    initSwiper() {
      this.swiperReady = true
      this.$nextTick(() => {
        if (typeof this.$refs.swiper?.$swiper?.init === 'function') {
          this.$refs.swiper?.$swiper?.init()
        }
      })
    },

    onSwiperInit() {
      this.$nextTick(() => {
        this.swiper = this.$refs.swiper.$swiper
      })
    },

    slideTo(index) {
      if (typeof this.swiper?.slideToLoop === 'function') {
        this.swiper.slideToLoop(index)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.slider-tabs {
  .swiper-container:not(.swiper-container-initialized) {
    opacity: unset;
  }

  ::v-deep {
    .swiper-slide {
      height: auto;
    }
  }
}

.nav-slider-tabs {
  flex-wrap: nowrap;
  font-size: $font-size-2;
  line-height: 1.4;

  .nav-item {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
  }

  .nav-link {
    flex: 1 1 auto;
    padding: 1rem 1.25rem calc(1.25rem + #{$progress-height}) 1rem;
    color: inherit;
    background-color: $gray-300;

    &.active {
      // margin-top: -$progress-height;
      background-color: $white;
      box-shadow: $box-shadow;
    }
  }
}

.nav-item-progress {
  display: flex;
  align-self: flex-start;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  max-width: 100%;
  height: $progress-height;
  line-height: 0;
  background-color: $primary;
  z-index: 1;
  opacity: 0;
  transition: width 0s linear;
  transition-duration: var(--progress-transition-duration);
}

.active ~ .nav-item-progress {
  width: 100%;
  opacity: 1;
}
</style>
