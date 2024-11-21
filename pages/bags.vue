<template>
  <main class="page-landing-bags pb-32 pb-lg-64">
    <section class="section section-banner">
      <b-container class="h-100 position-relative">
        <b-row align-v="center" class="h-100">
          <b-col lg="7" xl="8">
            <h1 class="mb-24">{{ $t('title') }}</h1>
            <p class="h4 font-weight-normal mb-32 mb-lg-40">
              {{ $t('subtitle') }}
            </p>
            <div class="text-center d-lg-none">
              <picture>
                <source
                  srcset="/images/bags/banner-sm.jpg"
                  media="(max-width: 575px)"
                />
                <source srcset="/images/bags/banner.jpg" />
                <img
                  :alt="$t('title')"
                  src="/images/bags/banner.jpg"
                  class="img-fluid mb-5"
                />
              </picture>
            </div>
            <div class="text-center text-lg-left">
              <b-button :to="localePath(catalogLink)" variant="primary">
                {{ $t('catalog.goToCatalog') }}
              </b-button>
            </div>
          </b-col>
        </b-row>
        <img
          :alt="$t('title')"
          src="/images/bags/banner.jpg"
          class="banner-image d-none d-lg-block"
        />
      </b-container>
    </section>

    <section class="section bg-light text-center">
      <b-container>
        <h2 class="h1 mb-32">{{ $t('convenient.title') }}</h2>
        <b-row class="mb-n24">
          <b-col md="4" class="mb-24">
            <div class="mb-24">
              <img
                src="/images/bags/battery.svg"
                width="100"
                aria-hidden="true"
              />
            </div>
            <div class="mb-24 px-xl-24">
              <p class="h4">{{ $t('convenient.home.title') }}</p>
              <p class="fs-5 mb-0">
                {{ $t('convenient.home.description') }}
              </p>
            </div>
          </b-col>
          <b-col md="4" class="mb-24">
            <div class="mb-24">
              <img
                src="/images/bags/electric-tower.svg"
                width="100"
                aria-hidden="true"
              />
            </div>
            <div class="mb-24 px-xl-24">
              <p class="h4">{{ $t('convenient.outdoor.title') }}</p>
              <p class="fs-5 mb-0">
                {{ $t('convenient.outdoor.description') }}
              </p>
            </div>
          </b-col>
          <b-col md="4">
            <div class="mb-24">
              <img
                src="/images/bags/industry.svg"
                width="100"
                aria-hidden="true"
              />
            </div>
            <div class="mb-24 px-xl-24">
              <p class="h4">{{ $t('convenient.production.title') }}</p>
              <p class="fs-5 mb-0">
                {{ $t('convenient.production.description') }}
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-swiper">
      <b-container>
        <h2 class="h1 text-center mb-24">{{ $t('chooseYourBag') }}</h2>
        <BagsSwiperMobile :items="products" class="d-lg-none mb-16" />
        <BagsSwiper :items="products" class="d-none d-lg-flex mb-16" />
      </b-container>
    </section>

    <section class="section text-white bg-dark section-product">
      <a id="product-c07" class="anchor"></a>
      <b-container>
        <b-row align-v="center">
          <b-col sm="6" md="5" lg="4" offset-lg="1" class="text-center">
            <b-img-lazy
              :alt="$t('c07.title')"
              srcset="/images/bags/c07-sm.png 220w, /images/bags/c07.png 360w"
              src="/images/bags/c07.png"
              sizes="(max-width: 767px) 220px, 360px"
              class="product-image mb-24 mb-sm-0"
            />
          </b-col>
          <b-col sm="6" md="7" lg="6">
            <div class="product-text">
              <h2 class="mb-32">{{ $t('c07.title') }}</h2>
              <ul class="list-check mb-24">
                <li>{{ $t('c07.points.1') }}</li>
                <li>{{ $t('c07.points.2') }}</li>
                <li>{{ $t('c07.points.3') }}</li>
              </ul>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-product-benefits">
      <b-container>
        <b-row class="justify-content-center">
          <b-col
            v-for="(benefit, index) in products[0].benefits"
            :key="`c07-${index}`"
            sm="6"
            lg="4"
            class="mb-24"
          >
            <b-img-lazy
              :src="`/images/bags/c07-benefit-${index}.jpg`"
              :alt="$t(`c07.benefits.${index + 1}.title`)"
              class="img-fluid benefit-image mb-24"
            />
            <p class="h5">{{ $t(`c07.benefits.${index + 1}.title`) }}</p>
            <p>{{ $t(`c07.benefits.${index + 1}.description`) }}</p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section
      class="section text-white bg-dark section-product section-product-reversed"
    >
      <a id="product-c03" class="anchor"></a>
      <b-container>
        <b-row align-v="center">
          <b-col sm="6" md="5" lg="4" order-sm="2" class="text-center">
            <b-img-lazy
              :alt="$t('c03.title')"
              srcset="/images/bags/c03-sm.png 220w, /images/bags/c03.png 360w"
              src="/images/bags/c03.png"
              sizes="(max-width: 767px) 220px, 360px"
              class="product-image mb-24 mb-sm-0"
            />
          </b-col>
          <b-col sm="6" md="7" lg="6" offset-lg="1" order-sm="1">
            <div class="product-text">
              <h2 class="mb-32">{{ $t('c03.title') }}</h2>
              <ul class="list-check mb-24">
                <li>{{ $t('c03.points.1') }}</li>
                <li>{{ $t('c03.points.2') }}</li>
                <li>{{ $t('c03.points.3') }}</li>
              </ul>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-product-benefits">
      <b-container>
        <b-row class="justify-content-center">
          <b-col
            v-for="(benefit, index) in products[1].benefits"
            :key="`c03-${index}`"
            sm="6"
            lg="4"
            class="mb-24"
          >
            <b-img-lazy
              :src="`/images/bags/c03-benefit-${index}.jpg`"
              :alt="$t(`c03.benefits.${index + 1}.title`)"
              class="img-fluid benefit-image mb-24"
            />
            <p class="h5">{{ $t(`c03.benefits.${index + 1}.title`) }}</p>
            <p>{{ $t(`c03.benefits.${index + 1}.description`) }}</p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section text-white bg-dark section-product">
      <a id="product-c12" class="anchor"></a>
      <b-container>
        <b-row align-v="center">
          <b-col sm="6" md="5" lg="4" offset-lg="1" class="text-center">
            <b-img-lazy
              :alt="$t('c12.title')"
              srcset="/images/bags/c12-sm.png 220w, /images/bags/c12.png 360w"
              src="/images/bags/c12.png"
              sizes="(max-width: 767px) 220px, 360px"
              class="product-image mb-24 mb-sm-0"
            />
          </b-col>
          <b-col sm="6" md="7" lg="6">
            <div class="product-text">
              <h2 class="mb-32">{{ $t('c12.title') }}</h2>
              <ul class="list-check mb-24">
                <li>{{ $t('c12.points.1') }}</li>
                <li>{{ $t('c12.points.2') }}</li>
                <li>{{ $t('c12.points.3') }}</li>
              </ul>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-product-benefits">
      <b-container>
        <b-row class="justify-content-center">
          <b-col
            v-for="(benefit, index) in products[2].benefits"
            :key="`c12-${index}`"
            sm="6"
            lg="4"
            class="mb-5"
          >
            <b-img-lazy
              :src="`/images/bags/c12-benefit-${index}.jpg`"
              :alt="$t(`c12.benefits.${index + 1}.title`)"
              class="img-fluid benefit-image mb-24"
            />
            <p class="h5">{{ $t(`c12.benefits.${index + 1}.title`) }}</p>
            <p>{{ $t(`c12.benefits.${index + 1}.description`) }}</p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section text-white bg-dark text-center">
      <b-container>
        <h2 class="h1 mb-24">{{ $t('benefits.title') }}</h2>
        <b-row class="mb-n24">
          <b-col md="4" class="mb-24">
            <div class="mb-24">
              <img
                src="/images/bags/guarantee.svg"
                width="100"
                aria-hidden="true"
              />
            </div>
            <div class="mb-24 px-xl-24">
              <p class="h4">{{ $t('benefits.durability.title') }}</p>
              <p class="fs-5 mb-0">
                {{ $t('benefits.durability.description') }}
              </p>
            </div>
          </b-col>
          <b-col md="4" class="mb-24">
            <div class="mb-24">
              <img
                src="/images/bags/packing.svg"
                width="100"
                aria-hidden="true"
              />
            </div>
            <div class="mb-24 px-xl-24">
              <p class="h4">{{ $t('benefits.spaciousness.title') }}</p>
              <p class="fs-5 mb-0">
                {{ $t('benefits.spaciousness.description') }}
              </p>
            </div>
          </b-col>
          <b-col md="4">
            <div class="mb-24">
              <img src="/images/bags/hand.svg" width="100" aria-hidden="true" />
            </div>
            <div class="mb-24 px-xl-24">
              <p class="h4">{{ $t('benefits.convenience.title') }}</p>
              <p class="fs-5 mb-0">
                {{ $t('benefits.convenience.description') }}
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-closing">
      <div class="section-bg">
        <b-container>
          <b-row align-v="center" class="section-content">
            <b-col cols="12" sm="6" order-sm="2" class="text-sm-center">
              <p class="h4 mb-lg-32" v-html="$t('tagline')"></p>
              <div class="d-none d-lg-block mb-64 pb-16 pb-xl-32">
                <b-button
                  :to="localePath(catalogLink)"
                  variant="primary"
                  class="rounded px-24"
                >
                  {{ $t('catalog.goToCatalog') }}
                </b-button>
              </div>
            </b-col>
            <b-col cols="6" sm="3" order-sm="1">
              <b-img-lazy
                srcset="/images/bags/backpack1-sm.png 120w, /images/bags/backpack1.png 240w"
                src="/images/bags/backpack1.png"
                sizes="(max-width: 767px) 120px, 240px"
                class="img-fluid"
                aria-hidden="true"
              />
            </b-col>
            <b-col cols="6" sm="3" order-sm="3" class="text-right">
              <b-img-lazy
                srcset="/images/bags/backpack2-sm.png 120w, /images/bags/backpack2.png 240w"
                src="/images/bags/backpack2.png"
                sizes="(max-width: 767px) 120px, 240px"
                class="img-fluid"
                aria-hidden="true"
              />
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="d-lg-none text-center">
        <b-button
          :to="localePath(catalogLink)"
          variant="primary"
          class="rounded px-24"
        >
          {{ $t('catalog.goToCatalog') }}
        </b-button>
      </div>
    </section>
  </main>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'

export default {
  components: {
    BImgLazy,
  },
  data() {
    return {
      catalogLink: '/catalog/sumki-i-ryukzaki',
      products: [
        {
          key: 'c07',
          title: this.$t('c07.shortTitle'),
          width: 150,
          height: 450,
          length: 400,
          material: this.$t('c07.material'),
          images: { sm: 'slider-c07-sm.jpg', lg: 'slider-c07.png' },
          benefits: 6,
        },
        {
          key: 'c03',
          title: this.$t('c03.shortTitle'),
          width: 260,
          height: 200,
          length: 330,
          material: this.$t('c03.material'),
          images: { sm: 'slider-c03-sm.jpg', lg: 'slider-c03.png' },
          benefits: 5,
        },
        {
          key: 'c12',
          title: this.$t('c12.shortTitle'),
          width: 135,
          height: 280,
          length: 300,
          material: this.$t('c12.material'),
          images: { sm: 'slider-c12-sm.jpg', lg: 'slider-c12.png' },
          benefits: 6,
        },
      ],
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
}
</script>

<style lang="scss">
@import '~/assets/scss/tables';

$bags-icon-check: url('data:image/svg+xml,<svg width="20" height="20" fill="none" version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M 17.5,0 7,14 2.5,7.5 0,9 7,19 20,2 Z" fill="#fa5b5a"/></svg>');

.page-landing-bags {
  line-height: 1.2;

  .product-info {
    padding-left: 2rem;
    padding-right: 2rem;

    .table {
      text-transform: uppercase;

      &.table-borderless {
        th,
        td {
          &:first-of-type {
            padding-left: 0;
          }

          &:last-of-type {
            padding-right: 0;
          }
        }
      }
    }
  }

  .section {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;

    &.section-product {
      font-weight: $font-weight-medium;

      & > .container {
        position: relative;
        z-index: 0;

        &::after {
          display: block;
          content: '';
          position: absolute;
          left: 2.125rem;
          right: 2.125rem;
          bottom: 0.625rem;
          top: 140px;
          border: 2px solid $white;
          z-index: -1;
        }
      }

      .list-check {
        list-style: none;
        padding-left: 0;

        & > li {
          position: relative;
          margin-bottom: 0.625rem;
          padding-left: 1rem;
          background-image: escape-svg($bags-icon-check);
          background-position: left;
          background-repeat: no-repeat;
          background-size: 0.625rem;
        }
      }

      .product-text {
        padding: 0 2.5rem 1.5rem;
      }
    }

    &.section-product-benefits {
      text-align: center;

      .benefit-image {
        width: 150px;
      }
    }

    &.section-closing {
      padding-top: 0;
      padding-bottom: 0;

      .section-bg {
        margin-bottom: 1.5rem;
        padding-top: 2.5rem;
        background-color: $gray-200;
        background-image: linear-gradient(
          to top,
          $white 23px,
          transparent 23px
        );
      }
    }
  }

  @include media-breakpoint-up(sm) {
    .section {
      &.section-product {
        & > .container {
          &::after {
            left: map-get($container-max-widths, 'sm') * 0.25;
            right: $grid-gutter-width * 0.5;
            bottom: 0;
            top: 0;
          }
        }

        .product-text {
          padding: 1.5rem 2.5rem 0 1rem;
        }

        &.section-product-reversed {
          & > .container {
            &::after {
              left: $grid-gutter-width * 0.5;
              right: map-get($container-max-widths, 'sm') * 0.25;
            }
          }

          .product-text {
            padding: 1.5rem 1rem 0 2.5rem;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(md) {
    .section {
      &.section-product {
        & > .container {
          &::after {
            left: map-get($container-max-widths, 'md') * 0.20833;
          }
        }

        .product-image {
          max-width: 100%;
          height: auto;
        }

        &.section-product-reversed {
          & > .container {
            &::after {
              right: map-get($container-max-widths, 'md') * 0.20833;
            }
          }
        }
      }

      &.section-closing {
        .section-bg {
          background-image: linear-gradient(
            to top,
            $white 33px,
            transparent 33px
          );
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      padding-top: 3.5rem;
      padding-bottom: 3.5rem;

      &.section-banner {
        height: 610px;
        padding-top: 2.5rem;

        .banner-image {
          position: absolute;
          right: 0;
          top: calc(50% - 240px);
          width: 480px;
          height: 480px;
          object-fit: contain;
          z-index: -1;
        }
      }

      &.section-swiper {
        padding-top: 5.5rem;
        padding-bottom: 4.5rem;
      }

      &.section-product {
        font-size: $font-size-4;

        & > .container {
          &::after {
            left: map-get($container-max-widths, 'lg') * 0.25;
            right: map-get($container-max-widths, 'lg') * 0.08333;
          }
        }

        .list-check {
          & > li {
            margin-bottom: 1rem;
            padding-left: 2rem;
            background-size: 1.25rem;
          }
        }

        &.section-product-reversed {
          & > .container {
            &::after {
              left: map-get($container-max-widths, 'lg') * 0.08333;
              right: map-get($container-max-widths, 'lg') * 0.25;
            }
          }
        }
      }

      &.section-product-benefits {
        padding-top: 4.5rem;
        padding-bottom: 4.5rem;
        font-size: $font-size-4;

        .benefit-image {
          width: 200px;
        }
      }

      &.section-closing {
        .section-bg {
          background-image: linear-gradient(
            to top,
            $white 47px,
            transparent 47px
          );
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    .section {
      &.section-product {
        & > .container {
          &::after {
            left: map-get($container-max-widths, 'xl') * 0.25;
            right: map-get($container-max-widths, 'xl') * 0.08333;
          }
        }

        &.section-product-reversed {
          & > .container {
            &::after {
              left: map-get($container-max-widths, 'xl') * 0.08333;
              right: map-get($container-max-widths, 'xl') * 0.25;
            }
          }
        }
      }

      &.section-closing {
        .section-bg {
          background-image: linear-gradient(
            to top,
            $white 53px,
            transparent 53px
          );
        }
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "benefits": {
      "convenience": {
        "description": "Wide and soft adjustable shoulder straps, anatomical inserts on the back and backpack straps",
        "title": "Convenience"
      },
      "durability": {
        "description": "Increased wear resistance due to the use of modern materials and technologies",
        "title": "Durability"
      },
      "spaciousness": {
        "description": "Spacious interior pockets, wide and sturdy bottom",
        "title": "Spaciousness"
      },
      "title": "Advantages"
    },
    "c03": {
      "benefits": {
        "1": {
          "description": "Interior space with convenient tool pockets",
          "title": "Large volume"
        },
        "2": {
          "description": "Reinforced with strong links guarantees long service life",
          "title": "Reliable zipper"
        },
        "3": {
          "description": "Extra stitching on the handles allows you to carry heavy tools",
          "title": "Strong seams"
        },
        "4": {
          "description": "Shoulder pad is made of a special material that prevents the bag from slipping off the shoulder",
          "title": "Non-slip strap"
        },
        "5": {
          "description": "Steel carabiners provide reliability when transporting heavy loads",
          "title": "Steel fasteners"
        }
      },
      "material": "PVC",
      "points": {
        "1": "Durable strap",
        "2": "Reinforced zipper",
        "3": "Steel fasteners"
      },
      "shortTitle": "EKF Professional С-03 bag",
      "title": "EKF Professional С-03 assembler bag"
    },
    "c07": {
      "benefits": {
        "1": {
          "description": "Protects the backpack from oil and moisture",
          "title": "Rubber bottom"
        },
        "2": {
          "description": "Placed on the outside of the backpack for your safety while on the move",
          "title": "Reflective elements"
        },
        "3": {
          "description": "The bag is made of dirt-repellent and moisture-proof material. It will keep a neat look for a long time and the tools inside will not rust.",
          "title": "Durable material"
        },
        "4": {
          "description": "Anatomical inserts on the back and shoulder straps for comfort",
          "title": "Comfortable shoulder straps"
        },
        "5": {
          "description": "Fabric fastener reduces arm strain",
          "title": "Reinforced handle"
        },
        "6": {
          "description": "Spacious with separate tool pockets",
          "title": "Inner space"
        }
      },
      "material": "PVC",
      "points": {
        "1": "Rubber bottom",
        "2": "Water repellent fabric",
        "3": "Reflective elements"
      },
      "shortTitle": "EKF Master С-07 backpack",
      "title": "EKF Master С-07 assembler backpack"
    },
    "c12": {
      "benefits": {
        "1": {
          "description": "Durable and wear-resistant material that keeps the shape of pockets well",
          "title": "EVA material"
        },
        "2": {
          "description": "The waist belt has a special extension to reduce pressure on the lower back",
          "title": "Extension belt"
        },
        "3": {
          "description": "Convenient for storing tools and consumables, provide quick access",
          "title": "Deep pockets"
        },
        "4": {
          "description": "Double-pinned belt withstands heavy loads, metal eyelets allow for longer belt life",
          "title": "Durable belt"
        },
        "5": {
          "description": "Separate mount provides quick and easy access to the instrument",
          "title": "Hammer mount"
        },
        "6": {
          "description": "Stitching of places that carry the main weight load",
          "title": "Additional stitching"
        }
      },
      "material": "PVC",
      "points": {
        "1": "Many pockets",
        "2": "Belt rings",
        "3": "Strong belt"
      },
      "shortTitle": "EKF Professional С-12 belt bag",
      "title": "EKF Professional С-12 belt bag"
    },
    "chooseYourBag": "Choose your bag",
    "convenient": {
      "home": {
        "description": "Small parts and tools won't get lost",
        "title": "At home"
      },
      "outdoor": {
        "description": "Lots of pockets to fit your essentials",
        "title": "On outdoor facilities"
      },
      "production": {
        "description": "Due to the different types of fastening of belts and handles, bags are convenient when moving",
        "title": "In production"
      },
      "title": "Convenient in any situation"
    },
    "pageTitle": "Tool bags and backpacks — EKF",
    "subtitle": "Durable. Roomy. Convenient",
    "tagline": "EKF bags and&nbsp;backpacks&nbsp;– comfortable working conditions",
    "title": "Tool bags and backpacks"
  },
  "ru": {
    "benefits": {
      "convenience": {
        "description": "Широкие и мягкие регулирующиеся лямки, анатомические вставки на спинке и лямках рюкзака",
        "title": "Удобство"
      },
      "durability": {
        "description": "Повышенная износостойкость за счет использования современных материалов и технологий",
        "title": "Прочность"
      },
      "spaciousness": {
        "description": "Просторные внутренние карманы, широкое и прочное дно",
        "title": "Вместительность"
      },
      "title": "Преимущества"
    },
    "c03": {
      "benefits": {
        "1": {
          "description": "Внутреннее пространство с удобными карманами для инструментов",
          "title": "Большой объем"
        },
        "2": {
          "description": "Усиленная, с прочными звеньями гарантирует долгую службу",
          "title": "Надежная молния"
        },
        "3": {
          "description": "Дополнительная прострочка на ручках позволяет переносить тяжелые инструменты",
          "title": "Прочные швы"
        },
        "4": {
          "description": "Наплечник сделан из специального материала, не дающего сумке соскальзывать с плеча",
          "title": "Нескользящий ремень"
        },
        "5": {
          "description": "Стальные карабины обеспечивают надёжность при транспортировке тяжелых грузов",
          "title": "Стальные крепления"
        }
      },
      "material": "Полиэстер",
      "points": {
        "1": "Прочный ремень",
        "2": "Усиленная молния",
        "3": "Стальные крепления"
      },
      "shortTitle": "Сумка С-03 EKF Professional",
      "title": "Сумка монтажника С-03 EKF Professional"
    },
    "c07": {
      "benefits": {
        "1": {
          "description": "Защита рюкзака от попадания масла и влаги",
          "title": "Резиновое дно"
        },
        "2": {
          "description": "Размещены на внешней стороне рюкзака для вашей безопасности при движении",
          "title": "Светоотражающие элементы"
        },
        "3": {
          "description": "Сумка изготовлена из грязеотталкивающего и влагозащитного материала. Она долго будет сохранять опрятный вид и инструмент внутри не заржавеет",
          "title": "Прочный материал"
        },
        "4": {
          "description": "Анатомические вставки на спинке и лямках рюкзака для комфорта",
          "title": "Удобные лямки"
        },
        "5": {
          "description": "Тканевая застежка уменьшает давление на руку",
          "title": "Усиленная ручка"
        },
        "6": {
          "description": "Просторное, с отдельными карманами для инструментов",
          "title": "Внутреннее пространство"
        }
      },
      "material": "Полиэстер",
      "points": {
        "1": "Прорезиненное дно",
        "2": "Водоотталкивающая ткань",
        "3": "Светоотражающие элементы"
      },
      "shortTitle": "Рюкзак С-07 EKF Professional",
      "title": "Рюкзак монтажника С-07 EKF Professional"
    },
    "c12": {
      "benefits": {
        "1": {
          "description": "Прочный и износостойкий материал, который хорошо держит форму карманов",
          "title": "Материал EVA"
        },
        "2": {
          "description": "На поясном ремне есть специальное расширение для снижения давления на поясницу",
          "title": "Пояс с расширением"
        },
        "3": {
          "description": "Удобны для хранения инструмента и расходников, обеспечивают быстрый доступ",
          "title": "Глубокие карманы"
        },
        "4": {
          "description": "Двухшпеньковый ремень позволяет выдержать большие нагрузки, металические люверсы для более долгой службы ремня",
          "title": "Прочный ремень"
        },
        "5": {
          "description": "Отдельный подвес обеспечивает быстрый и удобный доступ к инструменту",
          "title": "Крепление для молотка"
        },
        "6": {
          "description": "Прошивка мест, несущих основную весовую нагрузку",
          "title": "Дополнительная прошивка"
        }
      },
      "material": "Полиэстер",
      "points": {
        "1": "Много карманов",
        "2": "Кольца для ремней",
        "3": "Прочный ремень"
      },
      "shortTitle": "Сумка-пояс С-12 EKF Professional",
      "title": "Сумка-пояс С-12 EKF Professional"
    },
    "chooseYourBag": "Выбери свою сумку",
    "convenient": {
      "home": {
        "description": "Мелкие детали и инструменты не потеряются",
        "title": "В быту"
      },
      "outdoor": {
        "description": "Много карманов, чтобы уместить самое необходимое",
        "title": "На уличных объектах"
      },
      "production": {
        "description": "За счет разного вида крепления ремней и ручек удобны при перемещении",
        "title": "На производстве"
      },
      "title": "Удобно в любой ситуации"
    },
    "pageTitle": "Сумки и рюкзаки для монтажного инструмента — EKF",
    "subtitle": "Прочные. Вместительные. Удобные",
    "tagline": "Сумки и&nbsp;рюкзаки EKF&nbsp;–<br />комфортные условия для&nbsp;работы",
    "title": "Сумки и рюкзаки для монтажного инструмента"
  }
}
</i18n>
