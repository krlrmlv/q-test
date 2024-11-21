<template>
  <div class="slider-wrapper slider-solutions">
    <swiper ref="swiper" :options="swiperOptions" class="swiper-no-swiping">
      <swiper-slide v-for="(slide, index) in slides" :key="`slide-${index}`">
        <ViewProjectSolutionsCard :solution="slide" />
      </swiper-slide>
    </swiper>
  </div>
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
      swiperOptions: {
        autoplay: false,
        breakpoints: {
          576: {
            slidesPerView: 1.8,
            spaceBetween: 24,
            grabCursor: true,
            noSwiping: false,
          },
          768: {
            slidesPerView: 2.4,
            spaceBetween: 24,
            grabCursor: true,
            noSwiping: false,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 24,
            grabCursor: true,
            noSwiping: false,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 24,
            grabCursor: false,
            noSwiping: true,
          },
        },
        grabCursor: true,
        noSwiping: false,
        observer: true,
        observeParents: true,
        slidesPerView: 1.25,
        spaceBetween: 0,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.slider-solutions {
  margin: -0.5rem (-$grid-gutter-width * 0.5) -1.5rem;
  padding: 0.5rem 0 1.5rem;
  overflow: hidden;
}

::v-deep {
  .swiper-container {
    overflow: visible;
  }

  .swiper-slide {
    height: auto;
    padding: 0 $grid-gutter-width * 0.5;
  }
}

@include media-breakpoint-up(sm) {
  .slider-solutions {
    margin: -1.25rem -1.5rem -1.75rem;
    padding: 1.25rem 1.5rem 1.75rem;
  }

  ::v-deep {
    .swiper-slide {
      padding: 0;
    }
  }
}
</style>
