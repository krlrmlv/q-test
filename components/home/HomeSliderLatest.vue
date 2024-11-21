<template>
  <div ref="sliderWrapper" class="slider-wrapper slider-home-latest">
    <Swiper ref="swiper" :options="swiperOptions">
      <SwiperSlide v-for="(slide, index) in slides" :key="`slide-${index}`">
        <b-container class="slider-home-latest-item">
          <b-row class="latest-item-row mb-md-24 mb-xl-56">
            <b-col
              md="6"
              lg="5"
              class="latest-item-content mt-md-64 pt-lg-32 pr-xl-64"
            >
              <h2 v-html="slide.title" />

              <p class="pb-md-16" v-html="slide.subtitle" />

              <div class="d-none d-md-block">
                <LinkMore
                  :href="slide.link"
                  class="link-home-latest-slider"
                  @click="gtmEvent('click')"
                >
                  {{ slide.link_text }}
                </LinkMore>
              </div>
            </b-col>

            <b-col md="6" lg="7" class="latest-item-image">
              <div class="mb-32 mb-md-24">
                <img
                  :alt="`${slide.title}. ${slide.subtitle}`"
                  :src="showImages && $getStaticImage(slide.image)"
                  class="img-fluid w-100"
                />
              </div>
            </b-col>
          </b-row>

          <div class="d-md-none text-center mb-48">
            <LinkMore
              :href="slide.link"
              class="link-home-latest-slider"
              @click="gtmEvent('click')"
            >
              {{ slide.link_text }}
            </LinkMore>
          </div>
        </b-container>
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
      alreadyShowedItems: [],
      showImages: false,
      slides: [],
      slidesLoaded: false,
      swiperIsIntersecting: false,
      swiperIsInViewport: false,
      swiperOptions: {
        autoplay: { delay: 8000 },
        grabCursor: true,
        init: false,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        slidesPerView: 1,
        spaceBetween: 0,
      },
    }
  },

  async fetch() {
    const variables = {
      slider_name: 'latest',
      locale: this.$i18n.locale,
    }

    this.$graphql.default.setHeaders({
      'x-hasura-cart-id': getCartId(this.$cookies),
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
    swiperState([loaded, intersecting]) {
      /* Manually init swiper when all images loaded & swiper in viewport */
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
    gtmEvent(eventType) {
      const bannerPosition = (this.$refs.swiper?.$swiper?.realIndex ?? 0) + 1
      const currentSlide = this.slides[bannerPosition - 1]
      if (!currentSlide) return

      const bannerName = currentSlide.title

      switch (eventType) {
        case 'show':
          if (
            this.swiperIsInViewport &&
            !this.alreadyShowedItems.includes(bannerPosition)
          ) {
            this.$gtm.push({ event: 'ShowBanner', bannerName, bannerPosition })
            this.alreadyShowedItems.push(bannerPosition)
          }
          break

        case 'click':
          this.$gtm.push({ event: 'ClickBanner', bannerName, bannerPosition })
          break

        default:
          break
      }
    },

    setObserver() {
      if ('IntersectionObserver' in window) {
        const sliderWrapper = this.$refs.sliderWrapper
        const observer = new IntersectionObserver((entries) => {
          const entry = entries[0]
          if (entry.isIntersecting) {
            this.swiperIsIntersecting = true
            this.swiperIsInViewport = true
            this.gtmEvent('show')
          } else {
            this.swiperIsInViewport = false
          }
        })
        observer.observe(sliderWrapper)
      } else {
        /* Init swiper immediately if intersectionObserver not supported */
        this.swiperIsIntersecting = true
        this.swiperIsInViewport = true
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
.item-category {
  margin-bottom: 2rem;
  font-size: $font-size-4;
  color: $secondary;
}

@include media-breakpoint-down(sm) {
  .slider-home-latest-item {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  .latest-item-row {
    flex-direction: column;
    flex: 1 1 auto;
  }

  .latest-item-content {
    flex: 1 1 auto;
  }

  .latest-item-image {
    flex: 0 0 auto;
  }

  ::v-deep {
    .swiper-slide {
      display: flex;
      flex-direction: column;
      height: auto;
    }
  }
}

@include media-breakpoint-down(md) {
  .swiper-navigation {
    display: none;
  }
}

@include media-breakpoint-up(md) {
  .item-category {
    margin-bottom: 4rem;
  }
}
</style>
