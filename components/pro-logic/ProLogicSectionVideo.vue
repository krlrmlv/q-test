<template>
  <main>
    <section class="section pb-0">
      <b-container>
        <div :class="{ 'd-none': !ready }">
          <div class="position-relative">
            <div class="d-flex justify-content-between">
              <h2 class="mb-24 mb-lg-48">Обучающие видео</h2>

              <b-button
                :title="$t('global.showAll')"
                :aria-label="$t('global.showAll')"
                variant="link"
                href="https://www.youtube.com/watch?v=H9C1GMqfVhA&list=PLc8vd2e1R9O42KtQowVwLIHk_YpwIcBNx&index=1"
                class="align-items-start px-0"
              >
                {{ $t('global.showAll') }}
                <svg-icon
                  name="arrow-right-24"
                  width="24"
                  height="24"
                  class="ml-8"
                  aria-hidden="true"
                />
              </b-button>
            </div>

            <div class="overflow-hidden m-n40 p-40">
              <Swiper
                ref="swiper"
                :options="swiperOptions"
                class="row"
                @ready="handleSwiperReady"
              >
                <SwiperSlide
                  v-for="(video, index) in videos"
                  :key="`slide-${index}`"
                  class="col-12 col-lg-4 px-0"
                >
                  <ProLogicVideoCard
                    :video="video"
                    @click.native="showModal(video)"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        <b-modal
          v-model="modalShow"
          body-class="p-0"
          modal-class="modal-video"
          size="xl"
          centered
          hide-footer
          hide-header
        >
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              :src="`https://www.youtube.com/embed/${currentVideo.id}`"
              :title="currentVideo.title"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              frameborder="0"
              class="embed-responsive-item"
              allowfullscreen
            />
          </div>
        </b-modal>
      </b-container>
    </section>
  </main>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { BModal } from 'bootstrap-vue'
import 'swiper/css/swiper.min.css'

export default {
  components: {
    BModal,
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
      currentVideo: {},
      modalShow: false,
      ready: false,
      swiperOptions: {
        autoplay: false,
        breakpoints: {
          576: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        },
        grabCursor: true,
        observeParents: true,
        resizeObserver: true,
        slidesPerView: 1,
        spaceBetween: 10,
      },
      videos: [
        {
          id: 'H9C1GMqfVhA',
          title: 'Скачивание и\xA0установка\xA0ПО <br> PRO-Logic master',
        },
        {
          id: 'qThV1MNBG74',
          title:
            'Создание проекта и\xA0конфигурация оборудования в\xA0PRO-Logic master',
        },
        {
          id: 'Ri8fLHVk1Bo',
          title: 'Интерфейс программы и\xA0типы данных в\xA0PRO-Logic master',
        },
      ],
    }
  },

  computed: {
    swiper() {
      return this.$refs.swiper.$swiper
    },
  },

  methods: {
    handleSwiperReady() {
      this.ready = true
    },

    showModal(video) {
      this.currentVideo = video
      this.modalShow = true
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
::v-deep {
  .swiper-container.swiper-container-initialized {
    overflow: visible;
  }
}
</style>
