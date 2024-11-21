<template>
  <b-modal
    v-model="localVisible"
    modal-class="modal-media"
    size="xl"
    centered
    hide-footer
    hide-header
    @show="handleModalShow"
  >
    <template v-if="items" #default="{ close }">
      <b-skeleton-img v-if="!ready" aspect="4:3" variant="light" />

      <div v-else-if="items.length > 1" class="swiper-overflow slider-gallery">
        <div ref="sliderWrapper" class="slider-wrapper">
          <Swiper ref="swiper" :options="swiperOptions">
            <SwiperSlide
              v-for="(slide, index) in items"
              :key="`slide-${index}`"
              class="text-center"
            >
              <img :src="slide.url" :alt="slide.alt" class="img-fluid" />
            </SwiperSlide>
          </Swiper>
        </div>

        <div class="swiper-navigation">
          <b-button
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
      </div>

      <div v-else class="text-center">
        <img :src="items[0].url" :alt="items[0].alt" class="img-fluid" />
      </div>

      <b-button
        :title="$t('global.close')"
        :aria-label="$t('global.close')"
        size="sm"
        variant="white"
        class="btn-icon modal-close text-secondary rounded-pill"
        @click="close"
      >
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { BModal, BSkeletonImg } from 'bootstrap-vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.min.css'

export default {
  components: {
    BModal,
    BSkeletonImg,
    Swiper,
    SwiperSlide,
  },

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    start: {
      type: [Number, String],
      default: 0,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      ready: false,
      swiper: null,
      swiperOptions: {
        autoplay: false,
        autoHeight: true,
        grabCursor: true,
        loop: true,
        on: {
          init: () => {
            this.handleSwiperInit()
          },
        },
        slidesPerView: 1,
        spaceBetween: 0,
      },
    }
  },

  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(event) {
        this.$emit('change', event)
      },
    },
  },

  methods: {
    handleModalShow() {
      this.swiperOptions.initialSlide = this.start
      this.preload()
    },

    handleSwiperInit() {
      this.$nextTick(() => {
        this.swiper = this.$refs.swiper.$swiper
      })
    },

    preload() {
      const firstImgUrl = this.items[this.start]
        ? this.items[this.start].url
        : null

      if (firstImgUrl) {
        const image = new Image()
        image.onload = () => {
          this.$nextTick(() => {
            this.ready = true
          })
        }
        image.src = firstImgUrl
      }
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
.swiper-navigation {
  left: 0;
  right: 0;
  bottom: 50%;
}

.swiper-navigation-btn {
  position: absolute;
  top: 0;
  padding: $input-btn-padding-y;
  border-radius: $rounded-pill;
  transform: translateY(-50%);
}

.swiper-navigation-btn-prev {
  left: 0;
}

.swiper-navigation-btn-next {
  right: 0;
}
</style>
