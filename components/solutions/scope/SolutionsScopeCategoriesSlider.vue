<template>
  <Swiper
    ref="swiper"
    :options="swiperOptions"
    class="swiper-solution-categories"
  >
    <SwiperSlide v-for="(slide, index) in categories" :key="`slide-${index}`">
      <b-link
        :to="localePath(getCategoryLink(slide))"
        class="card card-solution-category"
      >
        <div class="embed-responsive embed-responsive-3by4">
          <picture>
            <source
              v-for="size in imageSizes"
              :key="`source-${size.breakpoint}`"
              :srcset="$getStaticImage(slide.image, size.size)"
              :media="
                size.breakpoint ? `(max-width: ${size.breakpoint}px)` : null
              "
            />
            <img
              :src="$getStaticImage(slide.image, 267)"
              :alt="slide.name"
              loading="lazy"
              class="embed-responsive-item"
            />
          </picture>
        </div>

        <div class="card-body">
          <p class="h6 card-title mb-0">
            {{ slide.name }}
          </p>
        </div>
      </b-link>
    </SwiperSlide>

    <template #pagination>
      <div class="swiper-nav-wrapper d-none d-lg-flex">
        <b-button
          :title="$t('global.back')"
          :aria-label="$t('global.back')"
          variant="link"
          class="btn-swiper-nav btn-swiper-prev"
        >
          <svg-icon
            name="arrow-left-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </b-button>

        <div class="swiper-pagination" />

        <b-button
          :title="$t('global.forward')"
          :aria-label="$t('global.forward')"
          variant="link"
          class="btn-swiper-nav btn-swiper-next"
        >
          <svg-icon
            name="arrow-right-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </b-button>
      </div>
    </template>
  </Swiper>
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
    categories: {
      type: Array,
      default: () => [],
    },
    scopeId: {
      type: [Number, String],
      default: null,
    },
  },

  data() {
    return {
      imageSizes: [
        { breakpoint: 767, size: 356 },
        { breakpoint: 991, size: 299 },
        { breakpoint: null, size: 356 },
      ],
      swiperOptions: {
        autoplay: false,
        loop: true,
        noSwiping: false,
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
          nextEl: '.btn-swiper-next',
          prevEl: '.btn-swiper-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
        },
        threshold: 30,
        breakpoints: {
          1200: { spaceBetween: 24 },
        },
      },
    }
  },

  methods: {
    getCategoryLink(category) {
      let link = `/solutions/${category?.slug}`
      if (this.scopeId) {
        link += `?scope=${this.scopeId}`
      }
      return link
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper-solution-categories {
  overflow: visible;
}

.embed-responsive {
  height: calc(267px * 4 / 3);
  transition: $transition-base;
  transition-property: filter;
  filter: brightness(0.7);

  &::before {
    position: absolute;
    width: 100%;
    z-index: 1;
    background: linear-gradient(
      to bottom,
      rgba($black, 0) 53.17%,
      rgba($black, 0.8) 100%
    );
  }
}

.card-solution-category {
  @media (hover: hover) {
    &:hover {
      .embed-responsive {
        filter: brightness(0.3);
      }
    }
  }

  @media (hover: none) {
    &:active {
      .embed-responsive {
        filter: brightness(0.3);
      }
    }
  }
}

.swiper-nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding-top: 2rem;
}

.swiper-pagination {
  position: static;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  ::v-deep {
    .swiper-pagination-bullet {
      width: 0.5rem;
      height: 0.5rem;
      border: none;
      background-color: $gray-300;
      transition: $transition-base;
      transition-property: background-color;

      &.swiper-pagination-bullet-active {
        background-color: $gray-600;
        transform: none;
      }
    }
  }
}

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

.card-body {
  text-align: left;
  color: $white;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
}

::v-deep {
  .swiper-slide {
    width: 267px;
    height: auto;
  }
}

@include media-breakpoint-down(md) {
  .embed-responsive {
    height: calc(224px * 4 / 3);
  }

  ::v-deep {
    .swiper-slide {
      width: 224px;
    }
  }
}

@include media-breakpoint-down(sm) {
  .embed-responsive {
    height: calc(267px * 4 / 3);
  }

  ::v-deep {
    .swiper-slide {
      width: 267px;
    }
  }

  .swiper-nav-wrapper {
    padding-top: 0;
  }

  .card-title {
    font-size: $font-size-3;
  }
}

@include media-breakpoint-up(xl) {
  .swiper-nav-wrapper {
    padding-top: 4rem;
  }
}
</style>
