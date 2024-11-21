<template>
  <main class="page-landing-cabinet-equipment pb-32 pb-lg-64">
    <section class="section section-banner">
      <div class="banner-text-wrapper">
        <b-row align-v="center" class="h-100">
          <b-col md="10" lg="6" xl="4" offset-md="1">
            <div class="banner-text">
              <h1 class="mb-32">{{ $t('title') }}</h1>
              <b-link :to="localePath(catalogLink)" class="link-catalog">
                {{ $t('catalog.goToCatalog') }}
                <span class="icon-wrapper ml-8">
                  <svg-icon
                    name="cabinet-equipment/arrow-right"
                    width="125"
                    height="7"
                    aria-hidden="true"
                  />
                </span>
              </b-link>
              <p class="d-none d-md-block mt-24 mb-0">{{ $t('lead') }}</p>
            </div>
            <p class="d-md-none mb-24 px-12">{{ $t('lead') }}</p>
          </b-col>
        </b-row>
      </div>
      <b-row class="banner-image-wrapper d-none d-md-flex">
        <b-col lg="9" xl="10" offset-lg="3" offset-xl="2" class="h-100">
          <picture>
            <source
              srcset="/images/cabinet-equipment/banner-sm.jpg"
              media="(max-width: 767px)"
            />
            <source
              srcset="/images/cabinet-equipment/banner-md.jpg"
              media="(max-width: 1199px)"
            />
            <source srcset="/images/cabinet-equipment/banner.jpg" />
            <img
              src="/images/cabinet-equipment/banner-md.jpg"
              class="banner-image"
              aria-hidden="true"
            />
          </picture>
        </b-col>
      </b-row>
    </section>

    <section class="section">
      <b-row>
        <b-col
          md="5"
          lg="4"
          xl="3"
          offset-lg="1"
          offset-xl="3"
          class="d-none d-md-block"
        >
          <b-img-lazy
            :alt="$t('branch.title')"
            src="/images/cabinet-equipment/section1.jpg"
            class="section-image"
          />
        </b-col>
        <b-col md="7" xl="6">
          <div class="section-text">
            <h2 class="mb-24">{{ $t('branch.title') }}</h2>
            <p class="font-weight-bold mb-8">
              <b-link
                href="/catalog/otvetvitelnyj-szhim-ore"
                class="text-reset text-underline"
              >
                {{ $t('branch.walnut') }}
              </b-link>
            </p>
            <p class="font-weight-bold mb-24 mb-md-32">
              <b-link
                href="/catalog/raspredelitelnye-bloki-pro-odnye-rbp"
                class="text-reset text-underline"
              >
                {{ $t('branch.rbp') }}
              </b-link>
            </p>
            <b-img-lazy
              :alt="$t('branch.title')"
              src="/images/cabinet-equipment/section1.jpg"
              class="img-fluid d-md-none mb-24"
            />
            <div class="section-benefits">
              <h3>{{ $t('advantages') }}</h3>
              <ul class="list-unstyled">
                <li class="mb-16">{{ $t('branch.advantages.1') }}</li>
                <li class="mb-16">{{ $t('branch.advantages.2') }}</li>
                <li class="pb-2">{{ $t('branch.advantages.3') }}</li>
              </ul>
            </div>
            <div class="text-center text-md-left">
              <b-button :to="localePath(catalogLink)" variant="black">
                {{ $t('catalog.goToCatalog') }}
              </b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </section>

    <section class="section">
      <b-row>
        <b-col md="7" lg="6" xl="3" offset-lg="1" offset-xl="2">
          <div class="section-text">
            <h2 class="mb-24">{{ $t('terminals.title') }}</h2>
            <p class="font-weight-bold mb-8">
              <b-link
                href="/catalog/klemmy-silovye-vvodnye-ksv"
                class="text-reset text-underline"
              >
                {{ $t('terminals.ksv') }}
              </b-link>
            </p>
            <p class="font-weight-bold mb-8">
              <b-link
                href="/catalog/klemmnye-kolodki-jxb-vintovye"
                class="text-reset text-underline"
              >
                {{ $t('terminals.jxb') }}
              </b-link>
            </p>
            <p class="font-weight-bold mb-8">
              <b-link
                href="/catalog/klemmnye-kolodki-jxb-s-pruzhinnye"
                class="text-reset text-underline"
              >
                {{ $t('terminals.jxbs') }}
              </b-link>
            </p>
            <p class="font-weight-bold mb-24 mb-md-32">
              <b-link
                href="/catalog/klemmnye-kolodki-jxb-st-pruzhinnye"
                class="text-reset text-underline"
              >
                {{ $t('terminals.jxbst') }}
              </b-link>
            </p>
            <b-img-lazy
              :alt="$t('terminals.title')"
              src="/images/cabinet-equipment/section2.jpg"
              class="img-fluid d-md-none mb-24"
            />
            <b-button
              :to="localePath(catalogLink)"
              variant="black"
              class="d-none d-md-inline-flex"
            >
              {{ $t('catalog.goToCatalog') }}
            </b-button>

            <div class="section-benefits d-xl-none">
              <h3>{{ $t('advantages') }}</h3>
              <ul class="list-unstyled">
                <li class="mb-16">{{ $t('terminals.advantages.1') }}</li>
                <li class="mb-16">{{ $t('terminals.advantages.2') }}</li>
                <li class="mb-16">{{ $t('terminals.advantages.3') }}</li>
                <li class="pb-2">{{ $t('terminals.advantages.4') }}</li>
              </ul>
            </div>
            <div class="text-center d-md-none">
              <b-button :to="localePath(catalogLink)" variant="black">
                {{ $t('catalog.goToCatalog') }}
              </b-button>
            </div>
          </div>
        </b-col>
        <b-col md="5" lg="4" xl="6" class="d-none d-md-block">
          <b-row no-gutters>
            <b-col xl="6">
              <b-img-lazy
                :alt="$t('terminals.title')"
                src="/images/cabinet-equipment/section2.jpg"
                class="section-image"
              />
            </b-col>
            <b-col xl="6" class="bg-black d-none d-xl-block">
              <div class="section-benefits pr-24">
                <h3>{{ $t('advantages') }}</h3>
                <ul class="list-unstyled">
                  <li class="mb-16">{{ $t('terminals.advantages.1') }}</li>
                  <li class="mb-16">{{ $t('terminals.advantages.2') }}</li>
                  <li class="mb-16">{{ $t('terminals.advantages.3') }}</li>
                  <li class="pb-2">{{ $t('terminals.advantages.4') }}</li>
                </ul>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </section>

    <section class="section section-tiles">
      <b-row>
        <b-col md="5" xl="6" offset-xl="1" class="d-none d-md-block">
          <b-row>
            <b-col xl="6" class="mb-8 mb-xl-24">
              <b-img-lazy
                :alt="$t('busbars.distributionBlocks')"
                src="/images/cabinet-equipment/section3-1.jpg"
                class="section-image"
              />
            </b-col>
            <b-col xl="6" class="mb-8 mb-xl-24">
              <b-img-lazy
                :alt="$t('busbars.zeroHousing')"
                src="/images/cabinet-equipment/section3-2.jpg"
                class="section-image"
              />
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col xl="6">
              <b-img-lazy
                :alt="$t('busbars.title')"
                src="/images/cabinet-equipment/section3-3.jpg"
                class="section-image"
              />
            </b-col>
            <b-col xl="6" class="bg-black d-none d-xl-block">
              <div class="section-benefits pr-24">
                <h3>{{ $t('advantages') }}</h3>
                <ul class="list-unstyled">
                  <li class="mb-16">{{ $t('busbars.advantages.1') }}</li>
                  <li class="pb-2">{{ $t('busbars.advantages.2') }}</li>
                </ul>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="7" lg="6" xl="5">
          <h2 class="mb-5">{{ $t('busbars.title') }}</h2>
          <p class="font-weight-bold mb-8">
            <b-link
              href="/catalog/shiny-soedinitelnye-pin-fork-i-aksessuary-dlya-shin"
              class="text-reset text-underline"
            >
              {{ $t('busbars.connecting') }}
            </b-link>
          </p>
          <p class="font-weight-bold mb-8">
            <b-link
              href="/catalog/elektrote-nicheskie-shiny"
              class="text-reset text-underline"
            >
              {{ $t('busbars.electrical') }}
            </b-link>
          </p>
          <p class="font-weight-bold mb-8">
            <b-link
              href="/catalog/shiny-nulevye"
              class="text-reset text-underline"
            >
              {{ $t('busbars.zero') }}
            </b-link>
          </p>
          <p class="font-weight-bold mb-8">
            <b-link
              href="/catalog/nulevye-shiny-v-korpuse"
              class="text-reset text-underline"
            >
              {{ $t('busbars.zeroHousing') }}
            </b-link>
          </p>
          <p class="font-weight-bold mb-24 mb-md-32">
            <b-link
              href="/catalog/shinnye-raspredelitelnye-bloki-shrb"
              class="text-reset text-underline"
            >
              {{ $t('busbars.distributionBlocks') }}
            </b-link>
          </p>
          <b-img-lazy
            alt="Шины"
            src="/images/cabinet-equipment/section3.jpg"
            class="img-fluid d-md-none mb-24"
          />
          <div class="section-benefits d-xl-none">
            <h3>{{ $t('advantages') }}</h3>
            <ul class="list-unstyled">
              <li class="mb-16">{{ $t('busbars.advantages.1') }}</li>
              <li class="pb-2">{{ $t('busbars.advantages.2') }}</li>
            </ul>
          </div>
          <div class="text-center text-md-left">
            <b-button :to="localePath(catalogLink)" variant="black">
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </div>
        </b-col>
      </b-row>
    </section>

    <section class="section">
      <b-row>
        <b-col md="7" lg="6" xl="4" offset-lg="1" offset-xl="3">
          <div class="section-text">
            <h2 class="mb-24">{{ $t('glands.title') }}</h2>
            <p class="font-weight-bold mb-8">
              <b-link
                href="/catalog/salniki-germetichnye-pg-ip54-serye"
                class="text-reset text-underline"
              >
                {{ $t('glands.pg') }}
              </b-link>
            </p>
            <p class="font-weight-bold mb-8">
              <b-link
                href="/catalog/salniki-germetichnye-mg-ip68-chernye"
                class="text-reset text-underline"
              >
                {{ $t('glands.mg') }}
              </b-link>
            </p>
            <p class="font-weight-bold mb-8">
              <b-link
                href="/catalog/salniki-vvoda-vyvoda-elastichnye-ip54-serye"
                class="text-reset text-underline"
              >
                {{ $t('glands.inOut') }}
              </b-link>
            </p>
            <p class="font-weight-bold mb-24 mb-md-32">
              <b-link
                href="/catalog/salniki-germetichnye-metallicheskie-mgm-ip68"
                class="text-reset text-underline"
              >
                {{ $t('glands.mgm') }}
              </b-link>
            </p>
            <b-img-lazy
              :alt="$t('glands.title')"
              src="/images/cabinet-equipment/section4.jpg"
              class="img-fluid d-md-none mb-24"
            />
            <div class="section-benefits">
              <h3>{{ $t('advantages') }}</h3>
              <ul class="list-unstyled">
                <li class="mb-16">{{ $t('glands.advantages.1') }}</li>
                <li class="mb-16">{{ $t('glands.advantages.2') }}</li>
                <li class="pb-2">{{ $t('glands.advantages.3') }}</li>
              </ul>
            </div>
            <div class="text-center text-md-left">
              <b-button :to="localePath(catalogLink)" variant="black">
                {{ $t('catalog.goToCatalog') }}
              </b-button>
            </div>
          </div>
        </b-col>
        <b-col md="5" lg="4" xl="3" class="d-none d-md-block">
          <b-img-lazy
            :alt="$t('glands.title')"
            src="/images/cabinet-equipment/section4.jpg"
            class="section-image"
          />
        </b-col>
      </b-row>
    </section>

    <section class="section section-overlay">
      <b-row>
        <b-col md="5" offset-xl="2" class="d-none d-md-block position-relative">
          <b-img-lazy
            :alt="$t('marking.title')"
            src="/images/cabinet-equipment/section5.jpg"
            class="section-image"
          />
          <div class="bg-black benefits-overlay d-none d-xl-block">
            <div class="section-benefits pr-24">
              <h3>{{ $t('advantages') }}</h3>
              <ul class="list-unstyled">
                <li class="mb-16">{{ $t('marking.advantages.1') }}</li>
                <li class="pb-2">{{ $t('marking.advantages.2') }}</li>
              </ul>
            </div>
          </div>
        </b-col>
        <b-col md="7" xl="5">
          <h2 class="mb-24">{{ $t('marking.title') }}</h2>
          <p class="font-weight-bold mb-8">
            <b-link
              href="/catalog/birki-kabelnaya-markirovochnaya"
              class="text-reset text-underline"
            >
              {{ $t('marking.tag') }}
            </b-link>
          </p>
          <p class="font-weight-bold mb-8">
            <b-link
              href="/catalog/kabel-marker"
              class="text-reset text-underline"
            >
              {{ $t('marking.marker') }}
            </b-link>
          </p>
          <p class="font-weight-bold mb-8">
            <b-link
              href="/catalog/elementy-komplektacii-shkafov"
              class="text-reset text-underline"
            >
              {{ $t('marking.spiralTape') }}
            </b-link>
          </p>
          <p class="font-weight-bold mb-24 mb-md-32">
            <b-link
              href="/catalog/elementy-komplektacii-shkafov"
              class="text-reset text-underline"
            >
              {{ $t('marking.pad') }}
            </b-link>
          </p>
          <b-img-lazy
            :alt="$t('marking.title')"
            src="/images/cabinet-equipment/section5.jpg"
            class="img-fluid d-md-none mb-24"
          />
          <div class="section-benefits d-xl-none">
            <h3>{{ $t('advantages') }}</h3>
            <ul class="list-unstyled">
              <li class="mb-16">{{ $t('marking.advantages.1') }}</li>
              <li class="pb-2">{{ $t('marking.advantages.2') }}</li>
            </ul>
          </div>
          <div class="text-center text-md-left">
            <b-button :to="localePath(catalogLink)" variant="black">
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </div>
        </b-col>
      </b-row>
    </section>

    <section class="section">
      <b-row>
        <b-col md="7" lg="6" xl="3" offset-lg="1" offset-xl="2">
          <div class="section-text">
            <h2 class="mb-24">{{ $t('buttons.title') }}</h2>
            <p class="font-weight-bold mb-8">
              <b-link
                href="/catalog/potenciometry"
                class="text-reset text-underline"
              >
                {{ $t('buttons.potentiometers') }}
              </b-link>
            </p>
            <p class="font-weight-bold mb-8">
              <b-link
                href="/catalog/svetosignalnaya-armatura"
                class="text-reset text-underline"
              >
                {{ $t('buttons.lightSignal') }}
              </b-link>
            </p>
            <p class="font-weight-bold mb-8">
              <b-link
                href="/catalog/sbornaya-seriya-xb4"
                class="text-reset text-underline"
              >
                {{ $t('buttons.xb4') }}
              </b-link>
            </p>
            <p class="font-weight-bold mb-24 mb-md-32">
              <b-link
                href="/catalog/svetosignalnaya-armatura-s-pro67-ekf"
                class="text-reset text-underline"
              >
                {{ $t('buttons.spro67') }}
              </b-link>
            </p>
            <b-img-lazy
              :alt="$t('buttons.title')"
              src="/images/cabinet-equipment/section6.jpg"
              class="img-fluid d-md-none mb-24"
            />
            <div class="section-benefits d-xl-none">
              <h3>{{ $t('advantages') }}</h3>
              <ul class="list-unstyled">
                <li class="mb-16">{{ $t('buttons.advantages.1') }}</li>
                <li class="mb-16">{{ $t('buttons.advantages.2') }}</li>
                <li class="mb-16">{{ $t('buttons.advantages.3') }}</li>
                <li class="pb-2">{{ $t('buttons.advantages.4') }}</li>
              </ul>
            </div>
            <div class="text-center text-md-left">
              <b-button :to="localePath(catalogLink)" variant="black">
                {{ $t('catalog.goToCatalog') }}
              </b-button>
            </div>
          </div>
        </b-col>
        <b-col md="5" lg="4" xl="6" class="d-none d-md-block">
          <b-row no-gutters>
            <b-col xl="7">
              <b-img-lazy
                :alt="$t('buttons.title')"
                src="/images/cabinet-equipment/section6-1.jpg"
                class="section-image"
              />
            </b-col>
            <b-col xl="5" class="bg-black">
              <div class="section-benefits d-none d-xl-block pr-24">
                <h3>{{ $t('advantages') }}</h3>
                <ul class="list-unstyled">
                  <li class="mb-16">{{ $t('buttons.advantages.1') }}</li>
                  <li class="mb-16">{{ $t('buttons.advantages.2') }}</li>
                  <li class="mb-16">{{ $t('buttons.advantages.3') }}</li>
                  <li class="pb-2">{{ $t('buttons.advantages.4') }}</li>
                </ul>
              </div>
              <b-img-lazy
                :alt="$t('buttons.title')"
                src="/images/cabinet-equipment/section6-2.jpg"
                class="img-fluid"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </section>
  </main>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'
import sendToMindbox from '@/utils/mindbox'

export default {
  components: {
    BImgLazy,
  },
  data() {
    return {
      catalogLink: '/catalog/elementy-komplektacii-shkafov',
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
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
}
</script>

<style lang="scss">
.page-landing-cabinet-equipment {
  .section {
    max-width: 2000px;
    margin: 0 auto 2rem;
    padding-left: $grid-gutter-width * 0.5;
    padding-right: $grid-gutter-width * 0.5;
    font-size: $font-size-2;
    line-height: 1.2;

    &.section-banner {
      padding-left: 0;
      padding-right: 0;
      overflow: hidden;

      .banner-text {
        margin-bottom: 1rem;
        padding: 1.5rem 0.75rem 2rem;
        color: $white;
        background-color: rgba($black, 0.7);
        background-image: linear-gradient(rgba($black, 0.7), rgba($black, 0.7)),
          url('/images/cabinet-equipment/banner-sm.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .link-catalog {
        display: inline-flex;
        align-items: center;
        color: inherit;

        .icon-wrapper {
          display: inline-flex;
          justify-content: flex-end;
          width: 2rem;
          overflow: hidden;
        }

        .icon {
          flex: 0 0 auto;
          fill: $white;
          transition: $transition-base;
        }

        &:hover {
          text-decoration: none;
          color: darken($white, 15%);

          .icon {
            fill: darken($white, 15%);
          }
        }
      }
    }
  }

  .section-text {
    max-width: 600px;
  }

  .section-image {
    max-width: 100%;
    height: auto;
  }

  .section-benefits {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    border-left: 0.25rem solid $body-color;
  }

  .bg-black {
    .section-benefits {
      color: $white;
      border-left-color: $white;
    }
  }

  @include media-breakpoint-up(md) {
    .section {
      margin-bottom: 3rem;
      font-size: $font-size-3;

      &.section-banner {
        position: relative;
        height: 360px;
        margin-bottom: 2rem;
        padding-top: 2rem;

        .banner-text {
          margin-bottom: 0;
          padding: 2rem 2.5rem;
          background-color: rgba($black, 0.9);
          background-image: none;
        }

        .link-catalog {
          .icon-wrapper {
            width: 5.5rem;
          }
        }

        .banner-image-wrapper {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 100%;
          overflow: hidden;
          z-index: -1;
        }

        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .section-benefits {
      margin-top: 3rem;
      margin-bottom: 3rem;
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      margin-bottom: 3.75rem;

      &.section-banner {
        height: 640px;
        padding-top: 0;

        .banner-text-wrapper {
          height: 100%;
        }

        .banner-text {
          padding: 2.75rem 3rem;
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    .section {
      margin-bottom: 5.5rem;

      &.section-banner {
        height: 740px;
        margin-bottom: 3.75rem;

        .banner-text {
          padding: 3rem 3.5rem;
        }
      }

      &.section-tiles {
        .section-image {
          width: 100%;
          min-height: 0;
          max-height: 480px;
        }
      }

      &.section-overlay {
        .benefits-overlay {
          position: absolute;
          right: $grid-gutter-width * 0.5;
          bottom: 0;
          width: 320px;
        }
      }
    }

    .section-image {
      min-height: 360px;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (min-width: 1600px) {
    .section-image {
      min-height: 500px;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "advantages": "Advantages",
    "branch": {
      "advantages": {
        "1": "Organization of a branch from the main wire without violating the integrity of the conductor",
        "2": "The material of the contact plates allows both to connect and to be an adapter between aluminum and copper conductors",
        "3": "Convenient and reliable design"
      },
      "rbp": "RBP pass-through distribution blocks",
      "title": "Organization of a branch from the main conductor",
      "walnut": "StreamLine branch clamp (walnut)"
    },
    "busbars": {
      "advantages": {
        "1": "Convenient connection and power distribution",
        "2": "A wide assortment for a different number of connected conductors and amperage"
      },
      "connecting": "Connecting busbars (PIN, FORK) and busbar accessories",
      "distributionBlocks": "SHRB bus distribution blocks",
      "electrical": "Electrical busbars",
      "title": "Busbars",
      "zero": "Zero busbars",
      "zeroHousing": "Zero busbars with housing"
    },
    "buttons": {
      "advantages": {
        "1": "A wide range of light-signaling fittings made of plastic and metal for 16, 19, 22 mm holes",
        "2": "Quick installation",
        "3": "Protection up to IP67",
        "4": "Vandal proof stainless steel button series"
      },
      "lightSignal": "Light signal fittings",
      "potentiometers": "Potentiometers",
      "spro67": "s-pro67 EKF light signal fittings",
      "title": "Buttons",
      "xb4": "XB4 prefab series"
    },
    "glands": {
      "advantages": {
        "1": "Used for cable entry into switchboard equipment",
        "2": "Protection of the assembly against dust and moisture ingress to IP54/IP68",
        "3": "Wide range of products for different conductor cross-sections"
      },
      "inOut": "Elastic input-output glands (IP54), gray",
      "mg": "MG sealed glands (IP68), black",
      "mgm": "MGM sealed metal glands (IP68)",
      "pg": "PG sealed glands (IP54), gray",
      "title": "Glands"
    },
    "lead": "In the list of accessories produced by EKF: terminals and terminal blocks, busbars of various types (“plug” bus and “comb” bus, brass and N/PE bus, nickel-plated N/PE bus, zero bus for DIN-rail, etc.), busbar distribution blocks, busbar insulators and many other products.",
    "marking": {
      "advantages": {
        "1": "Convenient conductors marking and separation",
        "2": "Range of products for different conductor cross-sections"
      },
      "marker": "Cable marker",
      "pad": "Self-adhesive pad",
      "spiralTape": "SWB spiral mounting tape",
      "tag": "Cable marking tag",
      "title": "Marking products"
    },
    "terminals": {
      "advantages": {
        "1": "Made from high-quality polyamide, not subject to drying out and cracking",
        "2": "Convenient DIN rail mounting",
        "3": "Wide assortment for various sections",
        "4": "Screw and spring-loaded terminals ensure reliable contact"
      },
      "jxb": "JXB terminal blocks (screw)",
      "jxbs": "JXB-S terminal blocks (spring)",
      "jxbst": "JXB-ST terminal blocks (spring)",
      "ksv": "KSV power input terminals",
      "title": "Terminals"
    },
    "pageTitle": "Cabinet equipment — EKF",
    "title": "Cabinet equipment"
  },
  "ru": {
    "advantages": "Преимущества",
    "branch": {
      "advantages": {
        "1": "Организация ответвления от магистрального провода без нарушения целостности проводника",
        "2": "Материал контактных пластин позволяет как подключать, так и быть переходником между алюминиевыми и медными проводниками",
        "3": "Удобство и надежность конструкции"
      },
      "rbp": "Распределительные блоки проходные РБП",
      "title": "Организация ответвления от магистрального проводника",
      "walnut": "Ответвительный сжим (орех) StreamLine"
    },
    "busbars": {
      "advantages": {
        "1": "Удобство подключения и распределения энергии",
        "2": "Широкий ассортимент на различное количество подключаемых проводников и силу тока"
      },
      "connecting": "Шины соединительные (PIN, FORK) и аксессуары для шин",
      "distributionBlocks": "Шинные распределительные блоки ШРБ",
      "electrical": "Электротехнические шины",
      "title": "Шины",
      "zero": "Нулевые шины",
      "zeroHousing": "Нулевые шины в корпусе"
    },
    "buttons": {
      "advantages": {
        "1": "Широкий ассортимент светосигнальной арматуры из пластика и металла под отверстия 16, 19, 22 мм",
        "2": "Быстрый монтаж изделий",
        "3": "Степень защиты до IP67",
        "4": "Антивандальная серия кнопок из нержавеющей стали"
      },
      "lightSignal": "Светосигнальная арматура",
      "potentiometers": "Потенциометры",
      "spro67": "Светосигнальная арматура s-pro67 EKF",
      "title": "Кнопки",
      "xb4": "Сборная серия XB4"
    },
    "glands": {
      "advantages": {
        "1": "Используются для ввода кабелей в щитовое оборудование",
        "2": "Защита сборки от попадания пыли и влаги по степени IP54/IP68",
        "3": "Широкий ассортимент продукции на разные сечения проводников"
      },
      "inOut": "Сальники ввода-вывода эластичные (IP54) серые",
      "mg": "Сальники герметичные MG (IP68) черные",
      "mgm": "Сальники герметичные металлические MGM (IP68)",
      "pg": "Сальники герметичные PG (IP54) серые",
      "title": "Сальники"
    },
    "lead": "В списке аксессуаров, производимых компанией EKF: клеммы и клеммные колодки, шины различных видов (шина «вилка» и шина «гребенка», латунная и шина N/PE, шина N/PE никелированная, шина нулевая на дин-рейку и пр.), распределительные шинные блоки, шинные изоляторы и множество других изделий.",
    "marking": {
      "advantages": {
        "1": "Удобство маркировки и разделения проводников",
        "2": "Ассортимент изделий на разные сечения проводников"
      },
      "marker": "Кабель-маркер",
      "pad": "Площадка самоклеящаяся",
      "spiralTape": "Лента спиральная монтажная SWB",
      "tag": "Бирка кабельная маркировочная",
      "title": "Изделия для маркировки"
    },
    "terminals": {
      "advantages": {
        "1": "Материал корпуса – высококачественный полиамид, не подверженый иссыханию и растрескиванию",
        "2": "Удобство монтажа на DIN-рейку",
        "3": "Широкий ассортимент на различные сечения",
        "4": "Винтовые и пружинные зажимы обеспечивают надежный контакт"
      },
      "jxb": "Клеммные колодки JXB (винтовые)",
      "jxbs": "Клеммные колодки JXB-S (пружинные)",
      "jxbst": "Клеммные колодки JXB-ST (пружинные)",
      "ksv": "Клеммы силовые вводные КСВ",
      "title": "Клеммы"
    },
    "pageTitle": "Элементы комплектации шкафов — EKF",
    "title": "Элементы комплектации шкафов"
  }
}
</i18n>
