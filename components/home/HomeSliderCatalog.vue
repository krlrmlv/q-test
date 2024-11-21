<template>
  <div ref="sliderWrapper" class="slider-wrapper slider-home-catalog">
    <Swiper ref="swiper" :options="swiperOptions">
      <SwiperSlide v-for="(slide, index) in slides" :key="`slide-${index}`">
        <b-link
          :to="localePath(slide.link)"
          class="card slider-home-catalog-item"
        >
          <div class="embed-responsive embed-responsive-1by1">
            <div v-if="!showImages" class="embed-responsive-item bg-light" />

            <img
              v-else
              :alt="slide.title"
              :src="$getStaticImage(slide.image, 270)"
              class="embed-responsive-item"
            />
          </div>

          <p class="h6 card-body">
            {{ slide.title }}
          </p>
        </b-link>
      </SwiperSlide>

      <div slot="pagination" class="swiper-pagination" />
    </Swiper>

    <b-container class="position-relative">
      <div class="swiper-navigation">
        <b-button
          :title="$t('global.back')"
          :aria-label="$t('global.back')"
          variant="link"
          @click="slidePrev"
        >
          <svg-icon
            name="arrow-left-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </b-button>

        <b-button
          :title="$t('global.forward')"
          :aria-label="$t('global.forward')"
          variant="link"
          @click="slideNext"
        >
          <svg-icon
            name="arrow-right-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </b-button>
      </div>
    </b-container>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'

import SLIDES_HOMEPAGE_QUERY from '@/graphql/home/HomeSlides'
import { getCartId } from '~/utils/cart'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      showImages: false,
      slides: [],
      slidesLoaded: false,
      swiperIsIntersecting: false,
      swiperOptions: {
        autoplay: false,
        breakpoints: {
          576: {
            slidesPerView: 2.5,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 4.5,
            spaceBetween: 24,
          },
          1200: {
            slidesPerView: 5.8,
            spaceBetween: 24,
            centeredSlides: true,
          },
          1600: {
            slidesPerView: 6.6,
            spaceBetween: 24,
            centeredSlides: true,
          },
        },
        grabCursor: true,
        init: false,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        roundLengths: true,
        slidesPerView: 1.5,
        spaceBetween: 0,
      },
    }
  },

  async fetch() {
    const variables = {
      slider_name: 'catalog',
      locale: this.$i18n.locale,
    }

    this.$graphql.default.setHeaders({
      'x-hasura-cart-id': await getCartId(this.$cookies),
    })

    const { slides } = await this.$graphql.default.request(
      SLIDES_HOMEPAGE_QUERY,
      variables
    )

    this.slides = slides
    this.slidesLoaded = true
  },

  computed: {
    swiper() {
      return this.$refs.swiper.$swiper
    },

    swiperState() {
      return [this.slidesLoaded, this.swiperIsIntersecting]
    },
  },

  watch: {
    /* Manually init swiper when all images loaded & swiper in viewport */
    swiperState([loaded, intersecting]) {
      if (loaded && intersecting && this.swiper) {
        this.showImages = true
        this.$nextTick(() => {
          this.swiper.init()
        })
      }
    },
  },

  mounted() {
    this.setObserver()
  },

  methods: {
    setObserver() {
      if ('IntersectionObserver' in window) {
        const sliderWrapper = this.$refs.sliderWrapper
        const observer = new IntersectionObserver((entries) => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            this.swiperIsIntersecting = true
            observer.unobserve(entry.target)
          }
        })

        observer.observe(sliderWrapper)
      } else {
        /* Init swiper immediately if intersectionObserver not supported */
        this.swiperIsIntersecting = true
      }
    },

    slidePrev() {
      this.swiper.slidePrev()
    },

    slideNext() {
      this.swiper.slideNext()
    },
  },
}
</script>

<style lang="scss" scoped>
.slider-home-catalog {
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
}

.slider-home-catalog-item {
  max-width: 100vw / 1.5;
  height: 100%;
  text-align: center;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: inherit;
  }
}

::v-deep {
  .swiper-slide {
    height: auto;
    margin-bottom: 3rem;
  }
}

@include media-breakpoint-down(xs) {
  ::v-deep {
    .swiper-slide {
      padding-left: $grid-gutter-width * 0.5;
      padding-right: $grid-gutter-width * 0.5;
    }
  }
}

@include media-breakpoint-up(sm) {
  .slider-home-catalog-item {
    max-width: calc((100vw - 36px) / 2.5);
  }
}

@include media-breakpoint-down(md) {
  .slider-home-catalog-item {
    box-shadow: $box-shadow;
  }

  .swiper-pagination,
  .swiper-navigation {
    display: none;
  }
}

@include media-breakpoint-up(md) {
  .slider-home-catalog-item {
    max-width: calc((100vw - 60px) / 3.5);
  }
}

@include media-breakpoint-up(lg) {
  .slider-home-catalog-item {
    max-width: calc((100vw - 84px) / 4.5);
    transition: $transition-base;
    transition-property: box-shadow;

    &:hover {
      box-shadow: $box-shadow;
    }
  }
}

@include media-breakpoint-up(xl) {
  .slider-home-catalog-item {
    max-width: calc((100vw - 115.2px) / 5.8);
  }

  ::v-deep {
    .swiper-slide {
      margin-bottom: 4rem;
    }
  }
}

@media screen and (min-width: 1600px) {
  .slider-home-catalog-item {
    max-width: calc((100vw - 134.4px) / 6.6);
  }
}
</style>
