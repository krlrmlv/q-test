<template>
  <b-container class="slider-section">
    <b-row class="slider-row m-0 text-white">
      <b-col md="6" class="text-column px-32 pt-32 pb-md-48 px-lg-48 pt-lg-48">
        <h3 class="mb-24">{{ slides[activeSlide]?.title }}</h3>
        <p class="mb-24">
          {{ slides[activeSlide]?.subtitle }}
        </p>
        <SeoLink href="https://lkp.ekfgroup.com/" target="_blank">
          <b-button
            variant="primary"
            @click="$ym('reachGoal', 'CLICKLKPBUTTONPROJECT')"
          >
            {{ $t('global.register') }}
          </b-button>
        </SeoLink>
      </b-col>
      <b-col
        md="5"
        class="slider-column pr-0 pt-sm-0 offset-2 offset-sm-3 offset-md-0 offset-lg-1"
      >
        <div ref="sliderWrapper" class="slider-wrapper slider-projects">
          <div class="iphone-12-pro"></div>
          <div class="iphone-12-pro-bg"></div>
          <Swiper
            ref="swiper"
            :options="swiperOptions"
            @slide-change="onSlideChange"
          >
            <SwiperSlide
              v-for="slide in slides.length"
              :key="`slide-${slide - 1}`"
            >
              <img
                :src="`/images/view/project/slide-${slide}.png`"
                class="card-img"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </b-col>
    </b-row>
    <div class="swiper-navigation">
      <b-button
        :title="$t('global.back')"
        :aria-label="$t('global.back')"
        variant="link"
        class="btn-swiper-nav btn-swiper-prev"
        @click="slidePrev"
      >
        <svg-icon
          class="navigation-chevron"
          name="chevron-left-24"
          width="40"
          height="40"
          aria-hidden="true"
        />
        <svg-icon
          class="navigation-arrow"
          name="arrow-left-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </b-button>
      <div class="swiper-pagination"></div>
      <b-button
        :title="$t('global.forward')"
        :aria-label="$t('global.forward')"
        variant="link"
        class="btn-swiper-nav btn-swiper-next"
        @click="slideNext"
      >
        <svg-icon
          class="navigation-chevron"
          name="chevron-right-24"
          width="40"
          height="40"
          aria-hidden="true"
        />
        <svg-icon
          class="navigation-arrow"
          name="arrow-right-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </b-button>
    </div>
  </b-container>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeSlide: 0,
      swiperOptions: {
        autoplay: false,
        grabCursor: true,
        noSwiping: false,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
        },
        navigation: {
          nextEl: '.btn-swiper-next',
          prevEl: '.btn-swiper-prev',
        },
        slidesPerView: 2,
        spaceBetween: 160,
        breakpoints: {
          421: {
            slidesPerView: 2,
            spaceBetween: 140,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 36,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 56,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 164,
          },
        },
      },
    }
  },

  computed: {
    swiper() {
      return this.$refs.swiper.$swiper
    },
  },
  mounted() {
    this.swiper.slideTo(1)
    this.swiper.slideTo(2)
  },
  methods: {
    slidePrev() {
      this.swiper.slidePrev()
    },
    slideNext() {
      this.swiper.slideNext()
    },
    onSlideChange() {
      this.activeSlide = this.swiper.realIndex
    },
  },
}
</script>

<style lang="scss" scoped>
.slider-section {
  position: relative;
}
.slider-row {
  position: relative;
  overflow: hidden;
  height: 780px;
  background-color: $gray-900;
}
.text-column {
  height: 396px;
}

.swiper-pagination {
  position: static;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  ::v-deep {
    .swiper-pagination-bullet {
      width: 0.5rem;
      height: 0.5rem;
      border: none;
      background-color: $gray-800;
      transition: $transition-base;
      transition-property: background-color;

      &.swiper-pagination-bullet-active {
        background-color: $gray-700;
        transform: none;
      }
    }
  }
}

.slider-projects {
  position: relative;
  overflow: visible;
  margin-top: 2rem;
}
.iphone-12-pro {
  background-image: url('/images/view/project/iphone-12-pro.png');
  height: 515px;
  width: 267px;
  position: absolute;
  top: -13px;
  left: -15px;
  z-index: 2;
  pointer-events: none;
}
.iphone-12-pro-bg {
  background-image: url('/images/view/project/iphone-12-pro-bg.png');
  background-repeat: no-repeat;
  z-index: 0;
  position: absolute;
  top: -10px;
  left: 0;
  height: 515px;
  width: 267px;
  pointer-events: none;
}
.card-img {
  width: 238px;
  height: 515px;
}
.navigation-chevron {
  display: none;
}
@media (max-width: 369px) {
  .slider-column {
    margin-top: 5vw;
  }
}
@media screen and (min-width: 388px) and (max-width: 420px) {
  .slider-column {
    margin-top: -1.5rem;
  }
}

@media (max-width: 420px) {
  .iphone-12-pro {
    background-size: 228px;
    top: -12px;
    left: -9px;
    background-repeat: no-repeat;
  }
  .iphone-12-pro-bg {
    background-size: 208px;
  }
  .card-img {
    width: 210px;
    height: 433px;
  }
}

@include media-breakpoint-down(sm) {
  .btn-swiper-nav {
    padding: 0;
    border: none;
    color: $gray-300;

    &:not(:disabled):not(.disabled) {
      &:hover {
        color: $gray-600;
      }
    }
  }
  .swiper-pagination {
    ::v-deep {
      .swiper-pagination-bullet {
        background-color: $gray-300;
        &.swiper-pagination-bullet-active {
          background-color: $gray-600;
        }
      }
    }
  }

  ::v-deep {
    .swiper-navigation {
      width: -moz-available;
      width: -webkit-fill-available;
      width: strech;
      display: flex;
      justify-content: space-between;
      bottom: -3rem;
      margin: 0 4.5rem 0 3rem;
    }
    .swiper-slide {
      width: 238px;
    }
  }
}
@include media-breakpoint-up(md) {
  .slider-row {
    height: 512px;
  }
  .swiper-navigation {
    bottom: 15px;
    left: 48px;
    gap: 2rem;
  }
  .slider-projects {
    width: 512px;
    margin-top: 4rem;
    margin-left: auto;
  }
}
@include media-breakpoint-up(lg) {
  .slider-row {
    height: 444px;
  }
}
@media (min-width: 1320px) {
  .btn-swiper-nav {
    color: $gray-300;

    &:not(:disabled):not(.disabled) {
      &:hover {
        color: $gray-600;
      }
    }
  }
  .swiper-pagination {
    position: absolute;
    top: 200px;
    left: 55%;
  }
  .swiper-navigation {
    position: absolute;
    width: inherit;
    top: 50%;
    left: -80px;
    height: 0;
  }
  .btn-swiper-next {
    position: absolute;
    right: -160px;
  }
  .navigation-chevron {
    display: block;
  }
  .navigation-arrow {
    display: none;
  }
}
</style>
