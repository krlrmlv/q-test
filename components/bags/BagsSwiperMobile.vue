<template>
  <div ref="swiperRoot" class="swiper swiper-landing-bags-mobile">
    <div class="swiper-overflow">
      <Swiper ref="swiper" :options="swiperOptions" @ready="onSwiperReady">
        <SwiperSlide
          v-for="(item, index) in items"
          :key="`slide-${index}`"
          :style="item.slideStyle"
        >
          <b-row>
            <b-col md="6">
              <div class="swiper-image text-center mb-5">
                <img
                  :alt="item.title"
                  :data-src="`/images/bags/${item.images.sm}`"
                  class="swiper-lazy"
                />
              </div>
            </b-col>

            <b-col md="6">
              <div class="product-info">
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th colspan="2" class="font-weight-bold">
                        {{ item.title }}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td class="w-100">{{ $t('global.width') }}</td>
                      <td>{{ item.width }}&nbsp;{{ $t('units.mm') }}</td>
                    </tr>
                    <tr>
                      <td>{{ $t('global.height') }}</td>
                      <td>{{ item.height }}&nbsp;{{ $t('units.mm') }}</td>
                    </tr>
                    <tr>
                      <td>{{ $t('global.length') }}</td>
                      <td>{{ item.length }}&nbsp;{{ $t('units.mm') }}</td>
                    </tr>
                    <tr>
                      <td>{{ $t('global.material') }}</td>
                      <td>{{ item.material }}</td>
                    </tr>
                  </tbody>
                </table>

                <p class="font-size-5 text-right text-muted mb-0">
                  <b-link
                    :to="{ hash: `#product-${item.key}` }"
                    class="text-reset text-underline"
                  >
                    {{ $t('global.more') }}
                  </b-link>
                </p>
              </div>
            </b-col>
          </b-row>
        </SwiperSlide>

        <div slot="pagination" class="swiper-pagination" />
      </Swiper>
    </div>

    <div class="swiper-navigation">
      <b-button
        :title="$t('global.back')"
        :aria-label="$t('global.back')"
        variant="white"
        class="btn-icon rounded-pill swiper-navigation-btn swiper-navigation-btn-prev"
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
        :title="$t('global.forward')"
        :aria-label="$t('global.forward')"
        variant="white"
        class="btn-icon rounded-pill swiper-navigation-btn swiper-navigation-btn-next"
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
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      ready: false,
      swiperOptions: {
        autoplay: false,
        grabCursor: true,
        lazy: {
          loadPrevNext: true,
          loadOnTransitionStart: true,
          preloaderClass: 'preloader',
        },
        loop: true,
        pagination: false,
        preloadImages: false,
      },
    }
  },

  computed: {
    swiper() {
      return this.ready && this.$refs?.swiper?.$swiper
    },
  },

  methods: {
    onSwiperReady() {
      this.ready = true
    },

    slidePrev() {
      if (typeof this.swiper?.slidePrev === 'function') {
        this.swiper.slidePrev()
      }
    },

    slideNext() {
      if (typeof this.swiper?.slideNext === 'function') {
        this.swiper.slideNext()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper-landing-bags-mobile {
  position: relative;

  .swiper-image {
    height: 250px;
  }

  .swiper-navigation {
    display: flex;
    left: 0;
    right: 0;
    top: 125px;
    height: 0;

    .swiper-navigation-btn {
      position: absolute;
      color: $primary;

      &.swiper-navigation-btn-prev {
        left: 0;
      }

      &.swiper-navigation-btn-next {
        right: 0;
      }
    }
  }

  @include media-breakpoint-up(md) {
    .swiper-overflow {
      padding-left: 3rem;
      padding-right: 3rem;
    }
  }
}
</style>
