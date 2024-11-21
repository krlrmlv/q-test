<template>
  <main class="page-landing page-landing-valencia">
    <b-container tag="section" class="section section-banner" fluid>
      <b-row align-v="center">
        <b-col md="6" lg="4" xl="3" offset-xl="1">
          <h1 class="banner-header">
            <span class="brand">Valencia</span>
            {{ $t('header') }}
          </h1>
          <div class="d-none d-md-block">
            <!-- <b-button
              variant="white"
              class="outline-brown-btn mb-8 mr-16"
              @click="modalShow = true"
            >
              {{ $t('order') }}
            </b-button> -->
            <b-button
              variant="white"
              class="brown-btn mb-8"
              href="https://ekfgroup.com/ru/catalog/valensiya"
            >
              {{ $t('toCatalog') }}
              <svg-icon
                name="valencia/arrow-right"
                stroke="white"
                width="24"
                height="24"
                class="ml-8"
                aria-hidden="true"
              />
            </b-button>
          </div>
        </b-col>
        <b-col md="6" lg="8" xl="7">
          <div class="banner-slide banner-slide-main">
            <transition name="fade" mode="out-in">
              <b-img-lazy
                :key="activeSlide"
                :srcset="`/images/valencia/${activeSlide}-sm.jpg 557w, /images/valencia/${activeSlide}.jpg 1494w`"
                :src="`/images/valencia/${activeSlide}.jpg`"
                sizes="(max-width: 575px) 557px, 1494px"
                class="banner-slide-img"
                aria-hidden="true"
              />
            </transition>
          </div>
          <div class="banner-slide-thumbnails">
            <b-link
              v-for="slide in slides"
              :key="slide"
              :class="{ active: slide === activeSlide }"
              class="banner-slide-wrapper"
              @click="activeSlide = slide"
            >
              <div class="banner-slide banner-slide-thumbnail">
                <b-img-lazy
                  :srcset="`/images/valencia/${slide}-sm-thumb.jpg 171w, /images/valencia/${slide}-thumb.jpg 309w`"
                  :src="`/images/valencia/${slide}-thumb.jpg`"
                  sizes="(max-width: 575px) 171px, 309px"
                  class="banner-slide-img"
                  aria-hidden="true"
                />
              </div>
            </b-link>
          </div>
          <div class="d-md-none">
            <!-- <b-button
              variant="white"
              class="outline-brown-btn mb-8"
              block
              @click="modalShow = true"
            >
              {{ $t('order') }}
            </b-button> -->
            <b-button
              variant="white"
              class="brown-btn"
              href="https://ekfgroup.com/ru/catalog/valensiya"
              block
            >
              {{ $t('toCatalog') }}
              <svg-icon
                name="valencia/arrow-right"
                stroke="#fff"
                width="24"
                height="24"
                class="ml-8"
                aria-hidden="true"
              />
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <section class="section">
      <b-container>
        <b-row>
          <b-col xl="3" class="d-none d-xl-block">
            <p class="brand text-center">Valencia</p>
          </b-col>
          <b-col md="5" class="d-none d-md-block">
            <div class="motion-wrapper">
              <b-aspect :aspect="0.92">
                <b-img-lazy
                  :alt="$t('mixAndCombine.title')"
                  src="/images/valencia/motion.gif"
                  class="img-fluid"
                />
              </b-aspect>
            </div>
          </b-col>
          <b-col md="7" xl="4">
            <p class="brand d-xl-none">Valencia</p>
            <h2 class="text-uppercase mb-24">
              {{ $t('mixAndCombine.title') }}
            </h2>
            <p
              class="mb-24 mb-md-40 mb-lg-56"
              v-html="$t('mixAndCombine.text')"
            />
            <b-button
              variant="white"
              class="outline-brown-btn mb-8"
              href="https://ekfgroup.com/ru/catalog/valensiya"
            >
              {{ $t('toCatalog') }}
              <svg-icon
                name="valencia/arrow-right"
                stroke="#3d2f31"
                width="24"
                height="24"
                class="ml-8"
                aria-hidden="true"
              />
            </b-button>
            <!-- <b-button
              class="brown-btn mb-8 d-md-none"
              block
              @click="modalShow = true"
            >
              {{ $t('order') }}
            </b-button> -->
            <!-- <b-button
              class="brown-btn mb-8 d-none d-md-block"
              @click="modalShow = true"
            >
              {{ $t('order') }}
            </b-button> -->
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-color-picker">
      <b-container class="container-color-picker">
        <h1 class="text-center brand d-md-none">Valencia</h1>
        <b-row>
          <b-col
            md="6"
            lg="5"
            xl="3"
            offset-xl="1"
            order-md="3"
            class="color-picker"
          >
            <h3 class="my-md-24 my-lg-40 mt-xl-56">
              {{ $t(`frames.${selectedFrame.key}.title`) }}
            </h3>
            <b-form-group label="Выберите цвет рамки">
              <b-button-group>
                <b-button
                  v-for="frame in frameOptions"
                  :key="frame.key"
                  :title="$t(`frames.${frame.key}.title`)"
                  :class="{ active: frame.key === selectedFrame.key }"
                  :style="{ backgroundColor: frame.color }"
                  variant="link"
                  class="btn-icon"
                  @click="setFrame(frame)"
                >
                  <span class="sr-only">
                    {{ $t(`frames.${selectedFrame.key}.title`) }}
                  </span>
                </b-button>
              </b-button-group>
            </b-form-group>
          </b-col>
          <b-col md="6" lg="5" xl="4" offset-lg="1" offset-xl="0" order-md="2">
            <div class="embed-responsive embed-responsive-1by1">
              <transition name="fade-in">
                <img
                  :key="selectedFrame.key"
                  :srcset="`/images/valencia/frame-${selectedFrame.key}-sm.png 360w, /images/valencia/frame-${selectedFrame.key}.png 700w`"
                  :src="`/images/valencia/frame-${selectedFrame.key}.png`"
                  :alt="`Рамка ${$t(`frames.${selectedFrame.key}.title`)}`"
                  sizes="(max-width: 575px) 360px, 700px"
                  class="embed-responsive-item"
                />
              </transition>
              <transition name="fade-in">
                <img
                  v-if="selectedComponent"
                  :key="selectedComponent"
                  :srcset="`/images/valencia/${selectedComponent}-sm.png 360w, /images/valencia/${selectedComponent}.png 700w`"
                  :src="`/images/valencia/${selectedComponent}.png`"
                  :alt="$t(`components.${selectedComponent}`)"
                  sizes="(max-width: 575px) 360px, 700px"
                  class="embed-responsive-item"
                />
              </transition>
            </div>
          </b-col>
          <b-col xl="4" order-md="1" class="d-none d-xl-block">
            <h1 class="brand my-24">Valencia</h1>
            <p
              class="mb-24 mb-md-40 mb-lg-56"
              v-html="$t(`frames.${selectedFrame.key}.text`)"
            />
            <b-button
              variant="white"
              class="outline-brown-btn mb-8"
              href="https://ekfgroup.com/ru/catalog/valensiya"
            >
              {{ $t('toCatalog') }}
              <svg-icon
                name="valencia/arrow-right"
                stroke="#3d2f31"
                width="24"
                height="24"
                class="ml-8"
                aria-hidden="true"
              />
            </b-button>
          </b-col>
        </b-row>
      </b-container>
      <b-container class="container-component-picker">
        <b-row class="component-picker-wrapper">
          <b-col cols="12" md="8" order-md="1" class="text-center text-md-left">
            <p class="font-size-4 mb-8 mb-lg-16">
              {{ $t('pickComponent') }}
            </p>
          </b-col>
          <b-col cols="12" order-md="3">
            <b-button-group
              class="row row-cols-5 row-cols-md-10 no-gutters component-picker"
            >
              <b-button
                v-for="component in componentOptions"
                :key="component"
                :title="$t(`components.${component}`)"
                :class="{ active: component === selectedComponent }"
                class="col mb-4"
                variant="link"
                @click="setComponent(component)"
              >
                <b-img-lazy
                  :src="`/images/valencia/${component}-thumb.jpg`"
                  :alt="$t(`components.${component}`)"
                  class="img-fluid"
                />
              </b-button>
            </b-button-group>
          </b-col>
          <b-col
            cols="12"
            md="4"
            order-md="2"
            class="text-center text-md-right"
          >
            <b-button
              variant="white"
              size="sm"
              class="btn-reset"
              @click="reset"
            >
              {{ $t('reset') }}
            </b-button>
          </b-col>
        </b-row>
        <div class="d-xl-none mt-16">
          <b-button
            variant="white"
            class="outline-brown-btn mb-8"
            href="https://ekfgroup.com/ru/catalog/valensiya"
            block
          >
            {{ $t('toCatalog') }}
            <svg-icon
              stroke="#3d2f31"
              name="valencia/arrow-right"
              width="24"
              height="24"
              class="ml-8 text-black"
              aria-hidden="true"
            />
          </b-button>
        </div>
      </b-container>
    </section>

    <section class="section section-equation my-lg-80">
      <b-container>
        <b-row>
          <b-col md="6" lg="4" order-xl="2">
            <h2 class="text-uppercase mb-24">
              {{ $t('assembleInterior.title') }}
            </h2>
            <p class="mb-8" v-html="$t('assembleInterior.text.1')" />
            <p
              class="mb-24 mb-md-40 mb-lg-56"
              v-html="$t('assembleInterior.text.2')"
            />
            <b-button
              variant="white"
              class="outline-brown-btn mb-8"
              href="https://ekfgroup.com/ru/catalog/valensiya"
            >
              {{ $t('toCatalog') }}
              <svg-icon
                name="valencia/arrow-right"
                stroke="#3d2f31"
                width="24"
                height="24"
                class="ml-8"
                aria-hidden="true"
              />
            </b-button>
            <!-- <b-button
              class="brown-btn mb-8 d-none d-md-block"
              @click="modalShow = true"
            >
              {{ $t('order') }}
            </b-button> -->
          </b-col>
          <b-col md="6" lg="8" xl="7" order-xl="1" class="text-center">
            <b-img-lazy
              :src="`/images/valencia/${$t('assembleInterior.image')}.svg`"
              sizes="(max-width: 991px) 220px, 570px"
              class="img-fluid d-none d-md-block mt-40 mt-md-0"
              :alt="$t('assembleInterior.imageAlt')"
            />

            <img
              src="/images/valencia/equation-sm.jpg"
              alt=""
              class="img-fluid d-md-none"
            />

            <!-- <b-button
              class="brown-btn mb-8 mt-32 d-md-none"
              block
              @click="modalShow = true"
            >
              {{ $t('order') }}
            </b-button> -->
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-benefits">
      <b-container>
        <h2 class="text-center text-lg-right text-uppercase mb-24">
          {{ $t('benefits.title') }}
        </h2>
        <div class="d-lg-none">
          <div class="img-wrapper mb-24">
            <img
              :alt="$t('benefits.title')"
              src="/images/valencia/benefits-sm.jpg"
              class="img-fluid"
            />
          </div>
          <ul class="list-unstyled">
            <li class="mb-16" v-html="$t('benefits.li1')"></li>
            <li class="mb-16" v-html="$t('benefits.li2')"></li>
            <li class="mb-16" v-html="$t('benefits.li3')"></li>
            <li class="mb-16" v-html="$t('benefits.li4')"></li>
            <li class="mb-16" v-html="$t('benefits.li5')"></li>
          </ul>
        </div>
        <div class="d-none d-lg-block">
          <img
            :src="`/images/valencia/${$t('benefits.image')}.svg`"
            :alt="$t('benefits.title')"
            class="img-fluid"
          />
        </div>
      </b-container>
    </section>

    <section class="section text-center py-56 pb-lg-96">
      <b-container>
        <b-row>
          <b-col lg="10" xl="8" offset-lg="1" offset-xl="2">
            <h2 class="font-weight-bold text-uppercase brand mb-0">Valencia</h2>
            <h4 class="text-uppercase mb-24">{{ $t('header') }}</h4>
            <div class="embed-responsive embed-responsive-16by9">
              <iframe
                src="https://www.youtube.com/embed/HI7Uc-ozQXI"
                allow="autoplay; encrypted-media"
                allowfullscreen="allowfullscreen"
                class="embed-responsive-item"
                frameborder="0"
              ></iframe>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- <section class="section valencia-form text-center py-64 py-lg-96">
      <b-container>
        <b-row>
          <b-col lg="5" offset-lg="1" cols="12">
            <h2 class="text-uppercase mb-32 text-left">
              {{ $t('order') }}
            </h2>
            <ValenciaForm
              mindbox-form-name="Оставить заявку- Форма в футере"
              @modal-sent="modalSuccessShow = true"
            />
          </b-col>
          <b-col class="d-none d-lg-block" lg="4" offset-lg="1">
            <img
              src="/images/valencia/valencia-form.jpg"
              alt="valencia-form"
              class="img-fluid"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>
    <ValenciaApplicationModal v-model="modalShow" @modal-sent="modalSent()" />
    <ValenciaModalSuccess v-model="modalSuccessShow" /> -->
  </main>
</template>

<script>
import { BAspect, BButtonGroup, BFormGroup, BImgLazy } from 'bootstrap-vue'
import sendToMindbox from '@/utils/mindbox'

export default {
  components: {
    BAspect,
    BButtonGroup,
    BFormGroup,
    BImgLazy,
  },
  data() {
    return {
      // modalShow: false,
      // modalSuccessShow: false,
      messageCenter: true,
      activeSlide: 'banner-1',
      catalogLink:
        '/catalog/rozetki-vykljuchateli/seriya-valensiya-skrytaya-ustanovka-ip20',
      componentOptions: [
        'socket-cashmere',
        'socket-graphite',
        'socket-steel',
        'socket-pearl',
        'socket-white',
        'switch-cashmere',
        'switch-graphite',
        'switch-steel',
        'switch-pearl',
        'switch-white',
      ],
      frameOptions: [
        { key: 'cashmere', color: '#8b746a' },
        { key: 'graphite', color: '#b1998c' },
        { key: 'steel', color: '#bdbab9' },
        { key: 'pearl', color: '#c8bdb6' },
        { key: 'white', color: '#e5e4e3' },
      ],
      slides: ['banner-1', 'banner-2', 'banner-3', 'banner-4'],
      selectedFrame: {},
      selectedComponent: null,
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
  computed: {
    apiUrl() {
      return `${process.env.REST_API_URL}/ekfgroup/form-request`
    },
  },
  created() {
    this.selectedFrame = this.frameOptions[0]
  },
  mounted() {
    sendToMindbox('EKFGroup.LandingView', {
      customerAction: {
        customFields: {
          LandingName: this.$t('pageTitle'),
        },
      },
    })
  },
  methods: {
    setFrame(frame) {
      const img = new Image()
      img.onload = () => {
        this.selectedFrame = frame
      }
      img.sizes = '(max-width: 575px) 360px, 700px'
      img.srcset = `/images/valencia/frame-${frame.key}-sm.png 360w, /images/valencia/frame-${frame.key}.png 700w`
    },
    setComponent(component) {
      const img = new Image()
      img.onload = () => {
        this.selectedComponent = component
      }
      img.sizes = '(max-width: 575px) 360px, 700px'
      img.srcset = `/images/valencia/${component.key}-sm.png 360w, /images/valencia/${component.key}.png 700w`
    },
    // modalSent() {
    //   this.modalShow = false
    //   this.modalSuccessShow = true
    // },
    reset() {
      this.selectedFrame = this.frameOptions[0]
      this.selectedComponent = null
    },
    showErrorToast(title, message) {
      this.$bvToast.toast(message, {
        title,
        toaster: 'b-toaster-bottom-right',
        variant: 'danger',
        autoHideDelay: 7000,
      })
    },
  },
}
</script>

<style lang="scss">
$valencia-brown: #3d2f31;
$valencia-blue: #98c4d7;

.page-landing-valencia {
  line-height: 1.2;
  color: $valencia-brown;

  .container-fluid {
    max-width: 2000px;
  }

  .custom-control {
    .custom-control-label {
      display: block;
      line-height: 1rem;
      text-align: left;
    }
  }

  .outline-brown-btn {
    color: $valencia-brown;
    border: 1px $valencia-brown solid;
  }

  .brown-btn {
    color: $white;
    background-color: $valencia-brown;
    &:active {
      background-color: $valencia-brown !important;
      color: $white !important;
    }
  }

  .brand {
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .link-catalog {
    display: flex;
    align-items: center;
    font-size: $font-size-4;
    font-weight: $font-weight-base;
    color: lighten($valencia-brown, 10%);

    .icon {
      fill: lighten($valencia-brown, 10%);
      transition: $transition-base;
      transition-property: fill;
    }

    &:hover {
      text-decoration: none;
      color: $black;

      .icon {
        fill: $black;
      }
    }
  }

  .section {
    padding-top: 1rem;
    padding-bottom: 1rem;

    &.valencia-form {
      background-color: #ebebeb;
      .file-btn-valencia {
        .custom-file-label {
          border: 1px solid $valencia-brown;
          color: $valencia-brown;
          background-color: #ebebeb;
          @include media-breakpoint-down(md) {
            background-position: left 5rem center;
          }
        }
      }
    }

    &.section-banner {
      padding-top: 2rem;
      padding-bottom: 2rem;
      color: $white;
      background-color: $valencia-brown;

      .banner-header {
        margin-bottom: 2.5rem;
        font-size: 2.5rem;

        .brand {
          display: block;
          width: 100%;
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
        }
      }

      .banner-slide {
        position: relative;
        box-shadow: 0 0 3rem rgba($black, 0.55);

        &::after {
          display: block;
          content: '';
          padding-bottom: 115%;
        }

        &.banner-slide-main {
          margin-bottom: 1rem;
        }
      }

      .banner-slide-img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
      }

      .banner-slide-thumbnails {
        display: flex;
        margin-left: -0.5rem;
        margin-right: -0.5rem;
        margin-bottom: 2rem;

        .banner-slide-wrapper {
          flex: 0 0 33.33333%;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          transition: $transition-base;

          &.active {
            flex-basis: 0;
            padding: 0;
          }

          &:focus {
            outline: none;
          }
        }
      }

      .link-catalog {
        color: $white;

        .icon {
          fill: $white;
        }

        &:hover {
          color: lighten($valencia-brown, 50%);

          .icon {
            fill: lighten($valencia-brown, 50%);
          }
        }
      }
    }

    &.section-color-picker {
      overflow: hidden;

      .container-color-picker {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }

      .color-picker {
        text-align: center;

        .col-form-label {
          font-weight: inherit;
          color: $gray-500;
        }

        .btn-group {
          .btn {
            width: 2.375rem;
            height: 2.375rem;
            margin: 0.25rem;
            border-radius: $rounded-pill;
            border-width: 3px;
            box-shadow: $box-shadow-sm;

            &:not(:disabled):not(.disabled) {
              &:focus {
                outline: none;
                box-shadow: $box-shadow-sm;
              }

              &:hover {
                box-shadow: $box-shadow;
              }
            }

            &.active {
              border-color: $valencia-blue;
            }
          }
        }
      }

      .component-picker {
        .btn {
          padding: 0;
          border-width: 3px;

          &:not(:disabled):not(.disabled) {
            &:focus,
            &.focus {
              outline: none;
              box-shadow: none;
            }
          }

          &.active {
            border-color: $valencia-blue;
          }
        }
      }

      .btn-reset {
        border-width: 0;
        color: #3d2f31;
      }
    }

    &.section-benefits {
      overflow: hidden;

      .img-wrapper {
        margin-left: -$grid-gutter-width * 0.5;
        margin-right: -$grid-gutter-width * 0.5;
        background-color: $valencia-blue;
        text-align: center;
      }
    }
  }

  @include media-breakpoint-up(sm) {
    .section {
      &.section-banner {
        .banner-slide {
          &::after {
            padding-bottom: 66.66667%;
          }
        }
      }

      &.section-benefits {
        overflow: hidden;

        .img-wrapper {
          margin-left: 0;
          margin-right: 0;
        }
      }
    }
  }

  @include media-breakpoint-up(md) {
    .section {
      padding-top: 2rem;
      padding-bottom: 2rem;

      &.section-color-picker {
        .container-color-picker {
          position: relative;
          margin-bottom: 1rem;
          padding-top: 3rem;
          padding-bottom: 3rem;

          &::before {
            display: block;
            content: '';
            position: absolute;
            left: 25%;
            right: calc(#{map-get($container-max-widths, 'md') * 0.5} - 50vw);
            top: 0;
            bottom: 0;
            border-top-left-radius: 1rem;
            background-color: $valencia-brown;
          }
        }

        .color-picker {
          text-align: left;
          color: $white;

          .col-form-label {
            font-weight: inherit;
            color: rgba($white, 0.5);
          }
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      &.section-banner {
        .banner-slide {
          &::after {
            padding-bottom: 42.86%;
          }

          &.banner-slide-main {
            margin-bottom: 2rem;
          }
        }

        .banner-slide-thumbnails {
          margin-left: 3rem;
          margin-right: 3rem;
          margin-bottom: 0;

          .banner-slide-wrapper {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      }

      &.section-color-picker {
        .container-color-picker {
          padding-top: 3.875rem;
          padding-bottom: 3.875rem;

          &::before {
            left: 29.16667%;
            right: calc(#{map-get($container-max-widths, 'lg') * 0.5} - 50vw);
          }
        }
      }

      &.section-benefits {
        position: relative;

        &::before {
          display: block;
          content: '';
          position: absolute;
          left: 0;
          top: 2rem;
          bottom: 2rem;
          width: calc(50vw - #{map-get($container-max-widths, 'lg') * 0.16667});
          border-top-right-radius: 1rem;
          background-color: $valencia-blue;
          background-image: url('/images/valencia/benefits-bg.svg');
          background-position: right top;
          background-repeat: repeat-x;
          background-size: auto;
          z-index: -1;
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    .motion-wrapper {
      position: relative;

      &::before,
      &::after {
        display: block;
        content: '';
        position: absolute;
        left: -1.125rem;
        width: 0.375rem;
        border-radius: 0.625rem 0 0.625rem 0;
      }

      &::before {
        top: 0;
        height: 216px;
        background-color: $valencia-brown;
      }

      &::after {
        top: 224px;
        height: 16px;
        background-color: $valencia-blue;
      }
    }

    .section {
      &.section-banner {
        .banner-slide-thumbnails {
          margin-left: 4rem;
          margin-right: 4rem;
        }
      }

      &.section-color-picker {
        .container-color-picker {
          padding-top: 7.5rem;
          padding-bottom: 7.5rem;

          &::before {
            left: 50%;
            right: calc(#{map-get($container-max-widths, 'xl') * 0.5} - 50vw);
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.15s ease-in-out;
}
.fade-in-enter {
  opacity: 0;
}
</style>

<i18n>
{
  "en": {
    "assembleInterior": {
      "image": "equation-en",
      "imageAlt": "Add to cart. Choose your color. Add overlay and frame",
      "text": {
        "1": "Color frame and&nbsp;overlay on&nbsp;the&nbsp;movement are&nbsp;purchased separately.",
        "2": "Combine colors to&nbsp;suit your interior and&nbsp;mood."
      },
      "title": "Assemble your interior"
    },
    "benefits": {
      "image": "benefits-en",
      "li1": "Can be used with both copper and aluminum wiring (Al/Cu)",
      "li2": "Universal symmetrical frames",
      "li3": "Protective shutters in all sockets",
      "li4": "Non-flammable base (laboratory tested)",
      "li5": "Polycarbonate body",
      "title": "Design benefits"
    },
    "components": {
      "socket-cashmere": "Cashmere socket",
      "socket-graphite": "Graphite socket",
      "socket-pearl": "Pearl socket",
      "socket-steel": "Steel socket",
      "socket-white": "White socket",
      "switch-cashmere": "Cashmere switch",
      "switch-graphite": "Graphite switch",
      "switch-pearl": "Pearl switch",
      "switch-steel": "Steel switch",
      "switch-white": "White switch"
    },
    "frames": {
      "cashmere": {
        "text": "Great base color! And&nbsp;how does it fit with&nbsp;other shades? Choose frame overlays from&nbsp;the&nbsp;options below and&nbsp;evaluate the&nbsp;result!",
        "title": "Cashmere"
      },
      "graphite": {
        "text": "This is interesting! Do you like non-standard solutions? Try playing on&nbsp;contrast!",
        "title": "Graphite"
      },
      "pearl": {
        "text": "What a&nbsp;tenderness! Just right for&nbsp;connoisseurs of&nbsp;sophisticated classics! By&nbsp;the&nbsp;way, we have even lighter shade.",
        "title": "Pearl"
      },
      "steel": {
        "text": "Brilliant! And&nbsp;what about playing with&nbsp;light shades? Might be interesting.",
        "title": "Steel"
      },
      "white": {
        "text": "A&nbsp;classic, we love it! How will it look with&nbsp;other colors?",
        "title": "White"
      }
    },
    "header": "Turn on your interior",
    "mixAndCombine": {
      "text": "The&nbsp;Valencia series was created for&nbsp;those who value quality without compromise and&nbsp;reliability in&nbsp;every detail. Strict design allows products of&nbsp;the&nbsp;series to&nbsp;organically fit into&nbsp;any interior. The Valencia series is available in&nbsp;6&nbsp;colors&nbsp;&ndash; classic white and&nbsp;cream, as&nbsp;well as&nbsp;Pearl, Graphite, Cashmere and&nbsp;Steel for&nbsp;the&nbsp;most daring design ideas.",
      "title": "Mix and combine"
    },
    "pageTitle": "Valencia wiring accessories from EKF",
    "pickComponent": "Pick a component",
    "reset": "Reset",
    "toCatalog": "Go to catalog",
    "order": "Order"
  },
  "ru": {
    "assembleInterior": {
      "image": "equation",
      "imageAlt": "Положи в корзину. Выбери свой цвет. Добавь накладку и рамку",
      "text": {
        "1": "Цветная рамка и&nbsp;накладка на&nbsp;механизм приобретаются отдельно.",
        "2": "Комбинируй цвета под&nbsp;свой интерьер и&nbsp;настроение."
      },
      "title": "Собери свой интерьер"
    },
    "benefits": {
      "image": "benefits",
      "li1": "Возможность использования как с медной, так и с алюминиевой проводкой (Al/Cu)",
      "li2": "Универсальные симметричные рамки",
      "li3": "Защитные шторки во всех розетках",
      "li4": "Негорючее основание (проверено в лабораторных условиях)",
      "li5": "Корпус из поликарбоната",
      "title": "Преимущества конструкции"
    },
    "components": {
      "socket-cashmere": "Розетка Кашемир",
      "socket-graphite": "Розетка Графит",
      "socket-pearl": "Розетка Жемчужный",
      "socket-steel": "Розетка Сталь",
      "socket-white": "Розетка Белый",
      "switch-cashmere": "Выключатель Кашемир",
      "switch-graphite": "Выключатель Графит",
      "switch-pearl": "Выключатель Жемчужный",
      "switch-steel": "Выключатель Сталь",
      "switch-white": "Выключатель Белый"
    },
    "frames": {
      "cashmere": {
        "text": "Отличный базовый цвет! А&nbsp;как он сочетается с&nbsp;другими оттенками? Выбирайте накладки на&nbsp;рамку из&nbsp;вариантов ниже и&nbsp;оценивайте результат!",
        "title": "Кашемир"
      },
      "graphite": {
        "text": "А&nbsp;это интересно! Вам нравятся нестандартные решения? Попробуйте сыграть на&nbsp;контрасте!",
        "title": "Графит"
      },
      "pearl": {
        "text": "Какая нежнятина! В&nbsp;самый раз для&nbsp;ценителей утонченной классики! Кстати, у&nbsp;нас есть оттенок и&nbsp;посветлее.",
        "title": "Жемчужный"
      },
      "steel": {
        "text": "Блестяще! А&nbsp;что&nbsp;если поиграть со&nbsp;светлыми оттенками? Это может быть интересно.",
        "title": "Сталь"
      },
      "white": {
        "text": "Классика жанра, нам очень нравится! А&nbsp;как она будет смотреться с&nbsp;другими цветами?",
        "title": "Белый"
      }
    },
    "header": "Включи свой интерьер",
    "mixAndCombine": {
      "text": "Серия Валенсия создана для&nbsp;тех, кто&nbsp;ценит качество без&nbsp;компромиссов и&nbsp;надежность в&nbsp;каждой детали. Строгий дизайн позволяет изделиям серии органично вписываться в&nbsp;любой интерьер. Серия Валенсия доступна в&nbsp;6&nbsp;цветовых решениях&nbsp;– классические белый и&nbsp;кремовый, а&nbsp;также Жемчуг, Графит, Кашемир и&nbsp;Сталь для&nbsp;реализации самых смелых дизайнерских идей.",
      "title": "Сочетай и комбинируй"
    },
    "pageTitle": "Электроустановочные изделия Валенсия от компании EKF",
    "pickComponent": "Выберите накладку на механизм",
    "reset": "Сбросить",
    "toCatalog": "В каталог",
    "order": "Оставить заявку"
  }
}
</i18n>
