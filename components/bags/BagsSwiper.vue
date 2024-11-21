<template>
  <b-row>
    <b-col lg="8" xl="9">
      <div class="slider-landing-bags">
        <div class="slider-overflow">
          <div ref="slider" class="slider-wrapper">
            <div
              v-for="(item, index) in items"
              :key="`slide-${index}`"
              :class="getSlideClass(index)"
              class="slider-slide"
            >
              <b-img-lazy
                :alt="item.title"
                :src="`/images/bags/${item.images.lg}`"
                class="slide-image"
              />
            </div>
          </div>
        </div>

        <div class="slider-navigation">
          <b-button
            :title="$t('global.back')"
            :aria-label="$t('global.back')"
            variant="link"
            class="btn-icon slider-navigation-btn slider-navigation-btn-prev"
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
            class="btn-icon slider-navigation-btn slider-navigation-btn-next"
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
    </b-col>

    <b-col lg="4" xl="3">
      <transition name="fade" mode="out-in">
        <div :key="slideIndex" class="product-info">
          <table class="table table-borderless">
            <thead>
              <tr>
                <th colspan="2" class="font-weight-bold">
                  {{ items[slideIndex].title }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td class="w-100">{{ $t('global.width') }}</td>
                <td>{{ items[slideIndex].width }}&nbsp;{{ $t('units.mm') }}</td>
              </tr>
              <tr>
                <td>{{ $t('global.height') }}</td>
                <td>
                  {{ items[slideIndex].height }}&nbsp;{{ $t('units.mm') }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('global.length') }}</td>
                <td>
                  {{ items[slideIndex].length }}&nbsp;{{ $t('units.mm') }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('global.material') }}</td>
                <td>{{ items[slideIndex].material }}</td>
              </tr>
            </tbody>
          </table>

          <p class="fs-5 text-right text-muted">
            <b-link
              :to="{ hash: `#product-${items[slideIndex].key}` }"
              class="text-reset text-underline"
            >
              {{ $t('global.more') }}
            </b-link>
          </p>
        </div>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'

export default {
  components: { BImgLazy },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      slideIndex: 0,
      startX: 0,
    }
  },

  methods: {
    slidePrev() {
      if (this.slideIndex >= 1) {
        this.slideIndex--
      } else {
        this.slideIndex = this.items.length - 1
      }
    },

    slideNext() {
      if (this.slideIndex <= this.items.length - 2) {
        this.slideIndex++
      } else {
        this.slideIndex = 0
      }
    },

    getSlideClass(index) {
      if (index === this.slideIndex) {
        return 'slider-slide-active'
      } else if (this.slideIndex === 0) {
        if (index === 1) return 'slider-slide-next'
        else if (index === 2) return 'slider-slide-prev'
      } else if (this.slideIndex === 1) {
        if (index === 2) return 'slider-slide-next'
        else if (index === 0) return 'slider-slide-prev'
      } else if (this.slideIndex === 2) {
        if (index === 0) return 'slider-slide-next'
        else if (index === 1) return 'slider-slide-prev'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$slide-image-size: 270px;
$slide-image-size-xl: 330px;
$slider-wrapper-width: 552px;
$slider-wrapper-width-xl: 641px;

.slider-landing-bags {
  position: relative;
  padding-left: 2rem;
  padding-right: 2rem;

  &::before {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 56.25%;
    border-radius: 50%;
    background-color: $white;
    box-shadow: 0 0.25rem 0.25rem $primary;
  }

  .slider-overflow {
    position: relative;
    overflow: hidden;
    height: $slide-image-size;
  }

  .slider-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: $slide-image-size;
    height: $slide-image-size;
    transition: all 0.3s ease-in-out;
    transition-property: transform, filter, z-index;
    transform-origin: center;

    &.slider-slide-prev,
    &.slider-slide-next {
      filter: brightness(200%) contrast(70%) saturate(80%)
        drop-shadow(0 0.25rem 0.375rem rgba($black, 0.15));
    }

    &.slider-slide-prev {
      transform: translateX(-20%) translateY(-5%) scale(0.5);
      z-index: 0;
    }

    &.slider-slide-next {
      transform: translateX(calc(#{$slider-wrapper-width} - 80%))
        translateY(-5%) scale(0.5);
      z-index: 1;
    }

    &.slider-slide-active {
      transform: translateX(calc(#{$slider-wrapper-width * 0.5} - 50%))
        translateY(0) scale(1);
      filter: brightness(100%) contrast(100%) saturate(100%)
        drop-shadow(0 0.25rem 0.375rem rgba($black, 0.25));
      z-index: 2;
    }

    .slide-image {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .slider-navigation {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;

    .slider-navigation-btn {
      position: absolute;

      &.slider-navigation-btn-prev {
        left: 0;
      }
      &.slider-navigation-btn-next {
        right: 0;
      }
    }
  }

  @include media-breakpoint-up(xl) {
    padding-left: 6.5rem;
    padding-right: 6.5rem;

    .slider-overflow {
      height: $slide-image-size-xl;
    }

    .slider-slide {
      width: $slide-image-size-xl;
      height: $slide-image-size-xl;

      &.slider-slide-prev {
        transform: translateX(-25%) translateY(-5%) scale(0.5);
      }

      &.slider-slide-next {
        transform: translateX(calc(#{$slider-wrapper-width-xl} - 75%))
          translateY(-5%) scale(0.5);
      }

      &.slider-slide-active {
        transform: translateX(calc(#{$slider-wrapper-width-xl * 0.5} - 50%))
          translateY(0) scale(1);
      }
    }
  }
}
</style>
