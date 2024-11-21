<template>
  <main class="page-landing-power-sleeves">
    <section class="section section-dark section-banner">
      <b-container>
        <b-row>
          <b-col md="6" xl="5" offset-xl="1">
            <h1>{{ $t('title') }}</h1>
            <div class="text-center mb-24 d-md-none">
              <b-img-lazy
                :alt="$t('title')"
                srcset="/images/power-sleeves/banner-sm.jpg 360w, /images/power-sleeves/banner.jpg 560w"
                src="/images/power-sleeves/banner.jpg"
                sizes="(max-width: 767px) 360px, 560px"
                class="img-fluid"
              />
            </div>
            <ul class="list-unstyled fs-2 mb-40">
              <li class="d-flex align-items-center mb-12">
                <div class="align-self-start mr-16" aria-hidden="true">
                  <svg-icon
                    name="power-sleeves/benefit-ru"
                    width="32"
                    height="32"
                  />
                </div>
                {{ $t('advantages.madeInRussia') }}
              </li>
              <li class="d-flex align-items-center mb-12">
                <div class="align-self-start mr-16" aria-hidden="true">
                  <svg-icon
                    name="power-sleeves/benefit-check"
                    width="32"
                    height="32"
                  />
                </div>
                {{ $t('advantages.standards') }}
              </li>
              <li class="d-flex align-items-center mb-12">
                <div class="align-self-start mr-16" aria-hidden="true">
                  <svg-icon
                    name="power-sleeves/benefit-wide"
                    width="32"
                    height="32"
                  />
                </div>
                {{ $t('advantages.range') }}
              </li>
              <li class="d-flex align-items-center mb-12">
                <div class="align-self-start mr-16" aria-hidden="true">
                  <svg-icon
                    name="power-sleeves/benefit-cable"
                    width="32"
                    height="32"
                  />
                </div>
                {{ $t('advantages.cuAl') }}
              </li>
            </ul>
            <b-button :to="localePath(catalogLink)" variant="white">
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
          <b-col md="6" xl="6" class="d-none d-md-block">
            <b-img-lazy
              :alt="$t('title')"
              srcset="/images/power-sleeves/banner-sm.jpg 360w, /images/power-sleeves/banner.jpg 560w"
              src="/images/power-sleeves/banner.jpg"
              sizes="(max-width: 767px) 360px, 560px"
              class="img-fluid"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section pb-0">
      <b-container>
        <b-row class="mb-5 pb-sm-5">
          <b-col md="6">
            <h2 class="text-primary">{{ $t('usage.title') }}</h2>
            <p>{{ $t('usage.p1') }}</p>
            <p>{{ $t('usage.p2') }}</p>
            <p class="mb-24">{{ $t('usage.p3') }}</p>
          </b-col>
          <b-col md="6">
            <b-img-lazy
              :alt="$t('usage.title')"
              srcset="/images/power-sleeves/breakers-sm.jpg 360w, /images/power-sleeves/breakers.jpg 560w"
              src="/images/power-sleeves/breakers.jpg"
              sizes="(max-width: 767px) 360px, 560px"
              class="img-fluid rounded-lg"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" order-md="2">
            <p>{{ $t('usage.p4') }}</p>
            <ul>
              <li>{{ $t('usage.li1') }}</li>
              <li>{{ $t('usage.li2') }}</li>
              <li>{{ $t('usage.li3') }}</li>
              <li>{{ $t('usage.li4') }}</li>
              <li>{{ $t('usage.li5') }}</li>
            </ul>
          </b-col>
          <b-col md="6" order-md="1">
            <b-img-lazy
              srcset="/images/power-sleeves/usage-sm.jpg 360w, /images/power-sleeves/usage.jpg 498w"
              src="/images/power-sleeves/usage.jpg"
              sizes="(max-width: 767px) 360px, 498px"
              class="img-fluid rounded-lg"
              aria-hidden="true"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-dark">
      <b-container>
        <b-row>
          <b-col lg="10" xl="8" offset-lg="1" offset-xl="2">
            <h3 class="text-center">{{ $t('usage.subtitle') }}</h3>
          </b-col>
        </b-row>
        <b-row class="text-center mb-24">
          <b-col md="4">
            <b-img-lazy
              :alt="$t('usage.subtitle')"
              src="/images/power-sleeves/usage1.jpg"
              class="img-fluid rounded-lg mb-24"
            />
          </b-col>
          <b-col md="4">
            <b-img-lazy
              :alt="$t('usage.subtitle')"
              src="/images/power-sleeves/usage2.jpg"
              class="img-fluid rounded-lg mb-24"
            />
          </b-col>
          <b-col md="4">
            <b-img-lazy
              :alt="$t('usage.subtitle')"
              src="/images/power-sleeves/usage3.jpg"
              class="img-fluid rounded-lg mb-24"
            />
          </b-col>
        </b-row>
        <div class="text-sm-center">
          <b-button :to="localePath(catalogLink)" variant="white">
            {{ $t('catalog.goToCatalog') }}
          </b-button>
        </div>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2 class="text-primary text-md-center">
          {{ $t('convenience.title') }}
        </h2>
        <div class="text-center mb-5 d-md-none">
          <b-img-lazy
            :alt="$t('convenience.marking.title')"
            srcset="/images/power-sleeves/convenience-sm.jpg 360w, /images/power-sleeves/convenience.jpg 638w"
            src="/images/power-sleeves/convenience.jpg"
            sizes="(max-width: 767px) 360px, 638px"
            class="img-fluid"
          />
        </div>
        <b-row>
          <b-col md="6" xl="5">
            <ul class="list-unstyled">
              <li>
                <p class="h5 text-primary">
                  {{ $t('convenience.marking.title') }}
                </p>
                <p>{{ $t('convenience.marking.description') }}</p>
              </li>
              <li>
                <p class="h5 text-primary">
                  {{ $t('convenience.chamfer.title') }}
                </p>
                <p>{{ $t('convenience.chamfer.description') }}</p>
              </li>
              <li>
                <p class="h5 text-primary">
                  {{ $t('convenience.options.title') }}
                </p>
                <p>{{ $t('convenience.options.description') }}</p>
              </li>
              <li>
                <p class="h5 text-primary">
                  {{ $t('convenience.madeInRussia.title') }}
                </p>
                <p>{{ $t('convenience.madeInRussia.description') }}</p>
              </li>
            </ul>
          </b-col>
          <b-col md="6" xl="7" class="d-none d-md-block">
            <b-img-lazy
              :alt="$t('convenience.marking.title')"
              srcset="/images/power-sleeves/convenience-sm.jpg 360w, /images/power-sleeves/convenience.jpg 638w"
              src="/images/power-sleeves/convenience.jpg"
              sizes="(max-width: 767px) 360px, 638px"
              class="img-fluid"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-light">
      <b-container>
        <h2 class="text-primary text-md-center">{{ $t('materials.title') }}</h2>
        <b-row>
          <b-col md="4">
            <b-img-lazy
              :alt="$t('materials.alt1')"
              src="/images/power-sleeves/material1.jpg"
              class="img-fluid rounded-lg mb-16"
            />
            <p class="fs-1 mb-24 mb-md-0 px-xl-24">{{ $t('materials.1') }}</p>
          </b-col>
          <b-col md="4">
            <b-img-lazy
              :alt="$t('materials.alt2')"
              src="/images/power-sleeves/material2.jpg"
              class="img-fluid rounded-lg mb-16"
            />
            <p class="fs-1 mb-24 mb-md-0 px-xl-24">{{ $t('materials.2') }}</p>
          </b-col>
          <b-col md="4">
            <b-img-lazy
              :alt="$t('materials.alt3')"
              src="/images/power-sleeves/material3.jpg"
              class="img-fluid rounded-lg mb-16"
            />
            <p class="fs-1 mb-24 mb-md-0 px-xl-24">{{ $t('materials.3') }}</p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2 class="text-primary text-md-center">
          {{ $t('nshal.title') }}
        </h2>
        <b-row class="mb-16 pb-xl-16">
          <b-col md="6" offset-xl="1">
            <p v-html="$t('nshal.p1')"></p>
          </b-col>
          <b-col md="4" lg="3" xl="2" class="text-center">
            <b-img-lazy
              :alt="`× ${$t('nshal.caption1')}`"
              src="/images/power-sleeves/nsha1.jpg"
              class="img-fluid d-block mx-auto mb-8"
            />
            <div
              class="d-inline-flex align-items-center fs-1 lh-120 text-left mb-16"
            >
              <div class="align-self-start mr-8" aria-label="×">
                <svg-icon
                  name="power-sleeves/cross"
                  width="16"
                  height="16"
                  aria-hidden="true"
                />
              </div>
              {{ $t('nshal.caption1') }}
            </div>
          </b-col>
        </b-row>
        <b-row align-v="center" class="mb-16 pb-xl-16">
          <b-col md="6" order-md="2">
            <p v-html="$t('nshal.p2')"></p>
          </b-col>
          <b-col
            md="4"
            lg="3"
            xl="2"
            offset-md="2"
            offset-lg="3"
            class="text-center"
          >
            <b-img-lazy
              :alt="`× ${$t('nshal.caption2')}`"
              src="/images/power-sleeves/nsha2.jpg"
              class="img-fluid d-block mx-auto mb-8"
            />
            <div
              class="d-inline-flex align-items-center fs-1 lh-120 text-left mb-16"
            >
              <div class="align-self-start mr-8" aria-label="×">
                <svg-icon
                  name="power-sleeves/cross"
                  width="16"
                  height="16"
                  aria-hidden="true"
                />
              </div>
              {{ $t('nshal.caption2') }}
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col xl="10" offset-xl="1">
            <p v-html="$t('nshal.p3')"></p>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="6"
            md="4"
            xl="3"
            offset-md="4"
            offset-xl="5"
            class="text-center"
          >
            <b-img-lazy
              :alt="`✓ ${$t('nshal.caption3')}`"
              src="/images/power-sleeves/nsha3.jpg"
              class="img-fluid d-block mx-auto mb-2"
            />
            <div
              class="d-inline-flex align-items-center fs-1 lh-120 text-left mb-16"
            >
              <div class="align-self-start mr-8" aria-label="✓">
                <svg-icon
                  name="power-sleeves/check"
                  width="16"
                  height="16"
                  aria-hidden="true"
                />
              </div>
              {{ $t('nshal.caption3') }}
            </div>
          </b-col>
          <b-col cols="6" md="4" xl="3" class="text-center">
            <b-img-lazy
              :alt="`✓ ${$t('nshal.caption4')}`"
              src="/images/power-sleeves/nsha4.jpg"
              class="img-fluid d-block mx-auto mb-2"
            />
            <div
              class="d-inline-flex align-items-center fs-1 lh-120 text-left mb-16"
            >
              <div class="align-self-start mr-8" aria-label="✓">
                <svg-icon
                  name="power-sleeves/check"
                  width="16"
                  height="16"
                  aria-hidden="true"
                />
              </div>
              {{ $t('nshal.caption4') }}
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-dark">
      <b-container>
        <h2 class="text-md-center">{{ $t('nshml.title') }}</h2>
        <b-row class="mb-32">
          <b-col md="4" lg="6" xl="4" offset-xl="1">
            <b-row>
              <b-col cols="6" md="12" lg="6">
                <b-img-lazy
                  :alt="$t('nshml.title')"
                  src="/images/power-sleeves/nshml1.jpg"
                  class="img-fluid rounded-lg mb-24 mb-lg-16"
                />
              </b-col>
              <b-col cols="6" md="12" lg="6">
                <b-img-lazy
                  :alt="$t('nshml.title')"
                  src="/images/power-sleeves/nshml2.jpg"
                  class="img-fluid rounded-lg mb-24 mb-lg-16"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col md="8" lg="6" xl="5" offset-xl="1">
            <ul class="mb-16">
              <li>{{ $t('nshml.1') }}</li>
              <li>{{ $t('nshml.2') }}</li>
              <li class="mb-16">{{ $t('nshml.3') }}</li>
            </ul>
          </b-col>
        </b-row>
        <div class="text-sm-center">
          <b-button :to="localePath(catalogLink)" variant="white">
            {{ $t('catalog.goToCatalog') }}
          </b-button>
        </div>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2 class="text-primary text-md-center">{{ $t('types.title') }}</h2>
      </b-container>
      <div class="flex-table">
        <div class="thead">
          <div class="trow">
            <b-container>
              <b-row>
                <b-col cols="4" xl="2">
                  {{ $t('types.fields.type') }}
                </b-col>
                <b-col cols="4" xl="2">
                  {{ $t('types.fields.image') }}
                </b-col>
                <b-col xl="3" class="d-none d-xl-block">
                  {{ $t('types.fields.description') }}
                </b-col>
                <b-col cols="4" xl="2">
                  {{ $t('types.fields.crossSection') }}
                </b-col>
                <b-col xl="3" class="d-none d-xl-block">
                  {{ $t('types.fields.tools') }}
                </b-col>
              </b-row>
            </b-container>
          </div>
        </div>
        <div class="tbody">
          <div
            v-for="(type, index) in types"
            :key="`row-${index}`"
            class="trow"
          >
            <b-container>
              <b-row>
                <b-col cols="4" xl="2">
                  {{ $t(`types.${type.key}.type`) }}<br />
                  <strong class="text-primary">
                    {{ $t(`types.${type.key}.name`) }}
                  </strong>
                </b-col>
                <b-col cols="4" xl="2">
                  <b-img-lazy
                    :src="`/images/power-sleeves/${type.image}`"
                    :alt="
                      $t(`types.${type.key}.type`) +
                      ' ' +
                      $t(`types.${type.key}.name`)
                    "
                    class="img-fluid"
                  />
                </b-col>
                <b-col xl="3" class="d-none d-xl-block">
                  {{ $t(`types.${type.key}.description`) }}
                </b-col>
                <b-col v-if="type.key !== 'sham'" cols="4" xl="2">
                  {{ type.crossSection }}&nbsp;{{ $t('units.mm') }}<sup>2</sup>
                </b-col>
                <b-col
                  v-if="type.key !== 'sham'"
                  xl="3"
                  class="d-none d-xl-block"
                >
                  {{ $t(`types.${type.key}.tools`) }}
                </b-col>
              </b-row>
            </b-container>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <b-container>
        <h2 class="text-md-center">{{ $t('legend.title') }}</h2>
        <b-row class="mb-32">
          <b-col lg="6">
            <p>{{ $t('legend.1') }}</p>
          </b-col>
          <b-col lg="6">
            <p>{{ $t('legend.2') }}</p>
          </b-col>
        </b-row>
        <b-row class="mb-32">
          <b-col sm="6" lg="5" xl="4" offset-lg="1" offset-xl="2">
            <b-img-lazy
              :src="`/images/power-sleeves/${$t('legend.image1')}`"
              :alt="$t('legend.alt1')"
              class="img-fluid mb-16"
            />
          </b-col>
          <b-col sm="6" lg="5" xl="4">
            <b-img-lazy
              :src="`/images/power-sleeves/${$t('legend.image2')}`"
              :alt="$t('legend.alt2')"
              class="img-fluid mb-16"
            />
          </b-col>
        </b-row>
        <b-row class="mb-32">
          <b-col md="4">
            <b-img-lazy
              :src="`/images/power-sleeves/${$t('legend.image3')}`"
              :alt="$t('legend.alt3')"
              class="img-fluid mb-16"
            />
          </b-col>
          <b-col md="4">
            <b-img-lazy
              :src="`/images/power-sleeves/${$t('legend.image4')}`"
              :alt="$t('legend.alt4')"
              class="img-fluid mb-16"
            />
          </b-col>
          <b-col md="4">
            <b-img-lazy
              :src="`/images/power-sleeves/${$t('legend.image5')}`"
              :alt="$t('legend.alt5')"
              class="img-fluid mb-16"
            />
          </b-col>
        </b-row>
        <div class="text-sm-center">
          <b-button :to="localePath(catalogLink)" variant="white">
            {{ $t('catalog.goToCatalog') }}
          </b-button>
        </div>
      </b-container>
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
      catalogLink: '/catalog/nakonechniki-i-gilzy-silovye',
      fields: ['type', 'image', 'description', 'crossSection', 'tools'],
      types: [
        { key: 'tmlDin', image: 'spec01.jpg', crossSection: '6–625' },
        { key: 'tmlGost', image: 'spec02.jpg', crossSection: '2,5–400' },
        { key: 'tmGost', image: 'spec03.jpg', crossSection: '2,5–400' },
        { key: 'nshml', image: 'spec04.jpg', crossSection: '6–95' },
        { key: 'taGost', image: 'spec05.jpg', crossSection: '10–300' },
        { key: 'nshaGost', image: 'spec06.jpg', crossSection: '16–35' },
        { key: 'nshalGost', image: 'spec07.jpg', crossSection: '16–35' },
        { key: 'tamGost', image: 'spec08.jpg', crossSection: '16–240' },
        { key: 'tml90', image: 'spec09.jpg', crossSection: '10–70' },
        { key: 'gty', image: 'spec10.jpg', crossSection: '10–185' },
        { key: 'gt', image: 'spec11.jpg', crossSection: '10–185' },
        { key: 'taGost2', image: 'spec12.jpg', crossSection: '16–240' },
        { key: 'sham', image: 'spec13.jpg' },
      ],
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
.page-landing-power-sleeves {
  font-size: $font-size-2;
  line-height: 1.4;
  color: $gray-700;

  h1,
  .h1,
  h2,
  .h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  h3,
  .h3 {
    margin-bottom: 2rem;
    font-size: 1.25rem;
  }

  h5,
  .h5 {
    margin-bottom: 0.25rem;
    font-size: 1rem;
  }

  ul:not(.list-unstyled) {
    margin-bottom: 1rem;
    padding-left: 0;
    list-style: none;

    & > li {
      position: relative;
      margin-bottom: 1rem;
      padding-left: 1.5rem;

      &::before {
        display: block;
        content: '';
        position: absolute;
        left: 0;
        top: calc(0.7em - 0.25rem);
        width: 0.5rem;
        height: 0.5rem;
        border-radius: $rounded-pill;
        background-color: #4570ff;
      }
    }
  }

  .btn {
    min-width: 9rem;
  }

  .text-primary {
    color: #4570ff !important;
  }

  .flex-table {
    font-size: $font-size-1;

    .thead {
      .trow {
        padding-top: 0.625rem;
        padding-bottom: 0.625rem;
        font-weight: $font-weight-bold;
        line-height: 1.2;
        color: #4570ff;
        background-color: #edf1ff;
      }
    }

    .tbody {
      .trow {
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(69, 112, 255, 0.3);
      }
    }
  }

  .section {
    padding-top: 3rem;
    padding-bottom: 3rem;

    &.section-dark {
      color: $white;
      background-color: #4570ff;

      .icon {
        fill: $white;
      }

      ul:not(.list-unstyled) {
        & > li {
          &::before {
            background-color: $white;
          }
        }
      }
    }

    &.section-light {
      background-color: #edf1ff;
    }
  }

  @include media-breakpoint-up(lg) {
    font-size: $font-size-3;

    h1,
    .h1 {
      margin-bottom: 3rem;
      font-size: 2.875rem;
    }

    h2,
    .h2 {
      margin-bottom: 3rem;
      font-size: 2.25rem;
    }

    h3,
    .h3 {
      margin-bottom: 3rem;
      font-size: 1.75rem;
    }

    h5,
    .h5 {
      font-size: 1.125rem;
    }

    p {
      margin-bottom: 1.5rem;
    }

    ul:not(.list-unstyled) {
      margin-bottom: 1.5rem;

      & > li {
        margin-bottom: 1.5rem;
      }
    }

    .flex-table {
      .thead {
        .trow {
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
      }

      .tbody {
        .trow {
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
        }
      }
    }

    .section {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "advantages": {
      "cuAl": "For copper and aluminum conductors",
      "madeInRussia": "Made in Russia",
      "range": "Wide range of standard sizes",
      "standards": "GOST and EKF standards"
    },
    "convenience": {
      "chamfer": {
        "description": "The tip shank is machined and chamfered, which speeds up installation and improves usability.",
        "title": "The chamfer makes it easier to insert the cable core"
      },
      "madeInRussia": {
        "description": "A reliable production site in Russia guarantees prompt replenishment of stocks.",
        "title": "Made in Russia"
      },
      "marking": {
        "description": "For the convenience of the user, the tip type and size are marked on the paddle of each tip.",
        "title": "Size markings on each tip"
      },
      "options": {
        "description": "according to GOST and EKF standards.",
        "title": "Two implementation options:"
      },
      "title": "Convenience of use"
    },
    "legend": {
      "1": "Copper, tinned copper and aluminum cable tips and EKF PROxima crimped cable tips and sleeves are designed for termination or connection of wires and cables with conductors with a cross-section from 2.5 to 400 mm² for voltages up to 35 kV.",
      "2": "They are made of copper pipes of the M2 brand (TML, TML (90), TM, JG, DT, GT, GTY) and round drawn aluminum pipes of the AD1M brand (TA, GA, TAM).",
      "alt1": "TML 16 8 6",
      "alt2": "TM TA TAM",
      "alt3": "GA 25 7",
      "alt4": "GT GTY",
      "alt5": "SHAM 28 / 13",
      "image1": "notation1-en.svg",
      "image2": "notation2-en.svg",
      "image3": "notation3-en.svg",
      "image4": "notation4-en.svg",
      "image5": "notation5-en.svg",
      "title": "Tips naming notation"
    },
    "materials": {
      "1": "Copper products (DT / TM GOST / GT) are used to connect copper wires. For aluminum wires aluminum products are used (TA GOST).",
      "2": "If the connection will be exposed to an aggressive environment or high humidity, it is recommended to use tinned products (JG / TML GOST / GTY).",
      "3": "In the case when it is necessary to connect aluminum with copper, aluminum-copper tips and washers are used.",
      "alt1": "Copper and aluminum tips",
      "alt2": "Tinned tips",
      "alt3": "Aluminum copper tips",
      "title": "Product materials"
    },
    "nshal": {
      "caption1": "Aluminum tip",
      "caption2": "Copper tip",
      "caption3": "NSHA – Aluminum pin tip – inside buildings and structures",
      "caption4": "NSHAL – Tinned aluminum pin tip – inside buildings and structures and outdoors",
      "p1": "In 90% of cases, a self-supporting insulated wire with a section of 16 mm<sup>2</sup> is used to enter the house. It would seem that it is easy to just take a standard 16 mm<sup>2</sup> aluminum tip (since a self-supporting insulated wire is an aluminum wire), crimp and connect. However, modular equipment is almost always used at the entrance to the house. And for its contacts <strong class='text-primary'>the standard 16 mm<sup>2</sup> tips simply do not fit the overall dimensions.<strong>",
      "p2": "<strong class='text-primary'>There are other brands of tips</strong> that might be perfect for these needs at first glance, but there is a problem with them too – <strong class='text-primary'>all of them are designed for copper wires.</strong>",
      "p3": "We have a solution – <strong class='text-primary'>aluminum pin tip</strong> for SSIW with 16–35 cross-section:",
      "title": "NSHA / NSHAL pin tips"
    },
    "nshml": {
      "1": "The easiest and most convenient way to connect a copper cable / wire to the device",
      "2": "Solves the problem of connecting the power wire to small devices",
      "3": "No technological seam",
      "title": "NSHML pin tips"
    },
    "pageTitle": "Power tips and sleeves — EKF",
    "title": "Power tips and sleeves",
    "types": {
      "fields": {
        "crossSection": "Conductor cross-section",
        "description": "Description",
        "image": "Image",
        "tools": "Crimping tools",
        "type": "Tip type"
      },
      "gt": {
        "description": "Designed for crimping copper cables and wires.",
        "name": "GT",
        "tools": "PGR-70 EKF Master; PGR-120 EKF Master; PGR-300 EKF Master; PK-16 EKF Master; PK-35 EKF Master; PK-50 EKF Expert",
        "type": "Copper"
      },
      "gty": {
        "description": "Designed for crimping copper cables and wires. It is allowed to use for crimping aluminum wires, as well as connections of the AL-Cu type.",
        "name": "GTY",
        "tools": "PGR-70 EKF Master; PGR-120 EKF Master; PGR-300 EKF Master; PK-16 EKF Master; PK-35 EKF Master; PK-50 EKF Expert",
        "type": "Tinned copper"
      },
      "nshaGost": {
        "description": "Designed for crimping aluminum cables and wires and connecting them to the terminals of circuit breakers and other electrical devices with a limited width of the contact terminal.",
        "name": "NSHA GOST",
        "tools": "PGR-70 EKF Master; PGR-120 EKF Master; PGR-300 EKF Master; PK-16 EKF Master; PK-35 EKF Master; PK-50 EKF Expert",
        "type": "Aluminum"
      },
      "nshalGost": {
        "description": "Designed for crimping aluminum cables and wires and connecting them to the terminals of circuit breakers and other electrical devices with a limited width of the contact terminal.",
        "name": "NSHAL GOST",
        "tools": "PGR-70 EKF Master; PGR-120 EKF Master; PGR-300 EKF Master; PK-16 EKF Master; PK-35 EKF Master; PK-50 EKF Expert",
        "type": "Aluminum"
      },
      "nshml": {
        "description": "Designed for crimping copper cables and wires and connecting them to the terminals of circuit breakers and other electrical devices with a limited width of the contact terminal.",
        "name": "NSHML",
        "tools": "PGR-70 EKF Master; PGR-120 EKF Master; PGR-300 EKF Master; PK-16 EKF Master; PK-05 EKF Expert; PK-35 EKF Master; PK-50 EKF Expert",
        "type": "Tinned copper"
      },
      "sham": {
        "description": "Designed for connecting aluminum lugs to copper busbars and terminals of electrical devices.",
        "name": "SHAM",
        "type": "Copper aluminum washer"
      },
      "taGost": {
        "description": "Designed for crimping wires and cables with aluminum conductors. Material – AD1 grade aluminum.",
        "name": "TA GOST",
        "tools": "PGR-70 EKF Master; PGR-120 EKF Master; PGR-300 EKF Master; PK-16 EKF Master; PK-35 EKF Master; PK-50 EKF Expert",
        "type": "Aluminum"
      },
      "taGost2": {
        "description": "Designed for butt-joining of wires and cables with aluminum conductors without axial load.",
        "name": "TA GOST",
        "tools": "PGR-70 EKF Master; PGR-120 EKF Master; PGR-300 EKF Master; PK-16 EKF Master; PK-35 EKF Master; PK-50 EKF Expert",
        "type": "Aluminum"
      },
      "tamGost": {
        "description": "Designed for crimping aluminum cables and wires and then connecting them to copper buses and terminals of electrical devices, preventing the galvanic pair effect.",
        "name": "TAM GOST",
        "tools": "PGR-70 EKF Master; PGR-120 EKF Master; PGR-300 EKF Master; PK-16 EKF Master; PK-35 EKF Master; PK-50 EKF Expert",
        "type": "Aluminum copper"
      },
      "title": "Types of tips",
      "tmGost": {
        "description": "Designed for crimping copper cables and wires. Material – M2 electrical copper.",
        "name": "DT (EKF standard) / TM GOST",
        "tools": "PGR-70 EKF Master; PGR-120 EKF Master; PGR-300 EKF Master; PK-16 EKF Master; PK-05 EKF Expert; PK-35 EKF Master; PK-50 EKF Expert",
        "type": "Copper"
      },
      "tml90": {
        "description": "Designed for connection by crimping copper cables and wires during installation in hard-to-reach places and limited working space.",
        "name": "TML (90 deg.)",
        "tools": "PGR-70 EKF Master; PGR-120 EKF Master; PGR-300 EKF Master; PK-16 EKF Master; PK-35 EKF Master; PK-50 EKF Expert",
        "type": "Angled tinned copper"
      },
      "tmlDin": {
        "description": "Designed for crimping copper cables and wires. Material – M1 electrical copper.",
        "name": "TML DIN",
        "tools": "PGR-70 EKF Master; PGR-120 EKF Master; PGR-300 EKF Master; PK-16 EKF Master; PK-05 EKF Expert; PK-35 EKF Master; PK-50 EKF Expert",
        "type": "Tinned copper"
      },
      "tmlGost": {
        "description": "Designed for crimping copper cables and wires. Material – M2 electrical copper.",
        "name": "JG (EKF standard) / TML ГОСТ",
        "tools": "PGR-70 EKF Master; PGR-120 EKF Master; PGR-300 EKF Master; PK-16 EKF Master; PK-05 EKF Expert; PK-35 EKF Master; PK-50 EKF Expert",
        "type": "Tinned copper"
      }
    },
    "usage": {
      "li1": "Increased contact surface",
      "li2": "Separable connection",
      "li3": "Prevention of oxide build-up",
      "li4": "Reduced heating at the transition point",
      "li5": "Decreased contact resistance",
      "p1": "Tips and sleeves occupy a large share in the volume of switched connections with clamps of various electrical devices, as well as for connecting several wires or cables.",
      "p2": "Connecting conductors using tips and sleeves is a common method of connection.",
      "p3": "Tips are used for terminating solid and stranded cables with subsequent safe connection of the conductor to the equipment.",
      "p4": "Unlike twisting or winding, use of a ferrule significantly improves the quality of the connection between the conductor and the equipment and provides:",
      "subtitle": "Tips are widely used in assemblies when switching with backbone buses",
      "title": "Application area"
    }
  },
  "ru": {
    "advantages": {
      "cuAl": "Для медных и алюминиевых проводников",
      "madeInRussia": "Российское производство",
      "range": "Широкая линейка типоразмеров",
      "standards": "Стандарты ГОСТ и EKF"
    },
    "convenience": {
      "chamfer": {
        "description": "Хвостовик наконечника обработан, снята фаска, что ускоряет монтаж и повышает удобство использования.",
        "title": "Фаска облегчает заведение кабельной жилы"
      },
      "madeInRussia": {
        "description": "Надежная производственная площадка в России гарантирует оперативное пополнение складских запасов.",
        "title": "Российское производство"
      },
      "marking": {
        "description": "Для удобства пользователя на лопатке каждого наконечника нанесен тип наконечника и его типоразмер.",
        "title": "Маркировка типоразмера на каждом наконечнике"
      },
      "options": {
        "description": "по нормативам ГОСТ и стандартам EKF.",
        "title": "Два типа исполнений:"
      },
      "title": "Удобство использования"
    },
    "legend": {
      "1": "Медные, медные луженые и алюминиевые кабельные наконечники и гильзы EKF PROxima, закрепляемые опрессовкой, предназначены для оконцевания или соединения проводов и кабелей с жилами сечением от 2,5 до 400 мм² на напряжение до 35 кВ.",
      "2": "Изготавливаются из медных труб марки М2 (ТМЛ, ТМЛ (90), ТМ, JG, DT, GT, GTY) и круглых тянутых алюминиевых труб марки АД1М (ТА, ГА, ТАМ).",
      "alt1": "ТМЛ 16 8 6",
      "alt2": "ТМ ТА ТАМ",
      "alt3": "ГА 25 7",
      "alt4": "GT(ГМ) GTY(ГМЛ)",
      "alt5": "ШАМ 28 / 13",
      "image1": "notation1.svg",
      "image2": "notation2.svg",
      "image3": "notation3.svg",
      "image4": "notation4.svg",
      "image5": "notation5.svg",
      "title": "Расшифровка наименования наконечников"
    },
    "materials": {
      "1": "Для соединения и подключения медных проводов используются изделия из меди (DT/ТМ ГОСТ/GT). Для алюминиевых проводов – из алюминия, соответственно (ТА ГОСТ).",
      "2": "Если соединение будет подвержено воздействию агрессивной среды или повышенной влажности, то рекомендуется использовать луженые изделия (JG/ТМЛ ГОСТ/GTY).",
      "3": "В случае, когда необходимо перейти с алюминия на медь, применяются алюмомедные наконечники и шайбы.",
      "alt1": "Наконечники из меди и алюминия",
      "alt2": "Луженые наконечники",
      "alt3": "Алюмомедные наконечники",
      "title": "Материалы изделий"
    },
    "nshal": {
      "caption1": "Алюминиевый наконечник",
      "caption2": "Медный наконечник",
      "caption3": "НША – Наконечник штифтовой алюминиевый – внутри зданий и сооружений",
      "caption4": "НШАЛ – Наконечник штифтовой алюминиевый луженый – внутри зданий и сооружений и на улице",
      "p1": "Для ввода в дом в 90 % случаев используется СИП сечением 16 мм<sup>2</sup>. Казалось бы, что проще, взять стандартный алюминиевый наконечник на 16 мм<sup>2</sup> (т.к. СИП — это алюминиевый провод), опрессовать и подключить. Однако на вводе в дом практически всегда используется модульная аппаратура. И для ее контактов <strong class='text-primary'>стандартные наконечники на 16 мм<sup>2</sup> просто не подходят по габаритным размерам.<strong>",
      "p2": "<strong class='text-primary'>Есть другие марки наконечников,</strong> которые с первого взгляда идеально могли бы подойти под эти нужды, но и с ними есть проблема — <strong class='text-primary'>они все рассчитаны для медных проводов.</strong>",
      "p3": "У нас есть решение —<strong class='text-primary'>алюминиевый штифтовой наконечник</strong> для СИП сечением 16–35:",
      "title": "Наконечники штифтовые: НША/НШАЛ"
    },
    "nshml": {
      "1": "Самый простой и удобный способ подключения кабеля/провода медного к автомату",
      "2": "Решает проблему подключения силового провода к автоматам маленького габарита",
      "3": "Отсутствует технологический шов",
      "title": "Наконечники штифтовые: НШМЛ"
    },
    "pageTitle": "Наконечники и гильзы силовые — EKF",
    "title": "Наконечники и гильзы силовые",
    "types": {
      "fields": {
        "crossSection": "Сечение проводников",
        "description": "Описание",
        "image": "Изображение",
        "tools": "Инструмент для опрессовки",
        "type": "Тип наконечника"
      },
      "gt": {
        "description": "Пред­наз­на­че­ны для соединения опрессовкой медных ка­бе­лей и про­во­дов.",
        "name": "GT",
        "tools": "ПГР-70 EKF Master; ПГР-120 EKF Master; ПГР-300 EKF Master; ПК-16 EKF Master; ПК-35 EKF Master; ПК-50 EKF Expert",
        "type": "Медные"
      },
      "gty": {
        "description": "Пред­наз­на­че­ны для соединения опрессовкой медных ка­бе­лей и про­во­дов. Допускается применение при опрессовке алюминиевых проводов, а также соединения типа AL-Cu.",
        "name": "GTY",
        "tools": "ПГР-70 EKF Master; ПГР-120 EKF Master; ПГР-300 EKF Master; ПК-16 EKF Master; ПК-35 EKF Master; ПК-50 EKF Expert",
        "type": "Медные луженые"
      },
      "nshaGost": {
        "description": "Предназначены для оконцевания опрессовкой алюминиевых кабелей и проводов и подключения их к выводам автоматических выключателей и прочих электрических устройств с ограниченной шириной контактной клеммы.",
        "name": "НША ГОСТ",
        "tools": "ПГР-70 EKF Master; ПГР-120 EKF Master; ПГР-300 EKF Master; ПК-16 EKF Master; ПК-35 EKF Master; ПК-50 EKF Expert",
        "type": "Алюминиевые"
      },
      "nshalGost": {
        "description": "Предназначены для оконцевания опрессовкой алюминиевых кабелей и проводов и подключения их к выводам автоматических выключателей и прочих электрических устройств с ограниченной шириной контактной клеммы.",
        "name": "НШАЛ ГОСТ",
        "tools": "ПГР-70 EKF Master; ПГР-120 EKF Master; ПГР-300 EKF Master; ПК-16 EKF Master; ПК-35 EKF Master; ПК-50 EKF Expert",
        "type": "Алюминиевые"
      },
      "nshml": {
        "description": "Предназначены для оконцевания опрессовкой медных кабелей и проводов и подключения их к выводам автоматических выключателей и прочих электрических устройств с ограниченной шириной контактной клеммы.",
        "name": "НШМЛ",
        "tools": "ПГР-70 EKF Master; ПГР-120 EKF Master; ПГР-300 EKF Master; ПК-16 EKF Master; ПК-05 EKF Expert; ПК-35 EKF Master; ПК-50 EKF Expert",
        "type": "Медные луженые"
      },
      "sham": {
        "description": "Предназначены для подключения алюминиевых наконечникнов к медным шинам и клеммам электротехнических устройств.",
        "name": "ШАМ",
        "type": "Шайба алюмомедная"
      },
      "taGost": {
        "description": "Предназначены для оконцевания опрессовкой проводов и кабелей с алюминиевыми жилами. Материал – алюминий марки АД1.",
        "name": "ТА ГОСТ",
        "tools": "ПГР-70 EKF Master; ПГР-120 EKF Master; ПГР-300 EKF Master; ПК-16 EKF Master; ПК-35 EKF Master; ПК-50 EKF Expert",
        "type": "Алюминиевые"
      },
      "taGost2": {
        "description": "Предназначены для соединения встык проводов и кабелей с алюминиевыми жилами без осевой нагрузки.",
        "name": "ТА ГОСТ",
        "tools": "ПГР-70 EKF Master; ПГР-120 EKF Master; ПГР-300 EKF Master; ПК-16 EKF Master; ПК-35 EKF Master; ПК-50 EKF Expert",
        "type": "Алюминиевые"
      },
      "tamGost": {
        "description": "Предназначены для оконцевания опрессовкой алюминиевых кабелей и проводов и последующего подключения их к медным шинам и клеммам электротехнических устройств, предотвращая появление эффекта гальванической пары.",
        "name": "ТАМ ГОСТ",
        "tools": "ПГР-70 EKF Master; ПГР-120 EKF Master; ПГР-300 EKF Master; ПК-16 EKF Master; ПК-35 EKF Master; ПК-50 EKF Expert",
        "type": "Алюмомедные"
      },
      "title": "Виды наконечников",
      "tmGost": {
        "description": "Предназначены для оконцевания опрессовкой медных кабелей и проводов. Материал – электротехническая медь М2.",
        "name": "DT (стандарт EKF) / ТМ ГОСТ",
        "tools": "ПГР-70 EKF Master; ПГР-120 EKF Master; ПГР-300 EKF Master; ПК-16 EKF Master; ПК-05 EKF Expert; ПК-35 EKF Master; ПК-50 EKF Expert",
        "type": "Медные"
      },
      "tml90": {
        "description": "Пред­наз­на­че­ны для соединения опрессовкой медных ка­бе­лей и про­во­дов при монтаже в труднодоступных местах и ограниченном рабочем пространстве.",
        "name": "ТМЛ (90 гр.)",
        "tools": "ПГР-70 EKF Master; ПГР-120 EKF Master; ПГР-300 EKF Master; ПК-16 EKF Master; ПК-35 EKF Master; ПК-50 EKF Expert",
        "type": "Медные луженые угловые"
      },
      "tmlDin": {
        "description": "Предназначены для оконцевания опрессовкой медных кабелей и проводов. Материал – электротехническая медь М1.",
        "name": "ТМЛ DIN",
        "tools": "ПГР-70 EKF Master; ПГР-120 EKF Master; ПГР-300 EKF Master; ПК-16 EKF Master; ПК-05 EKF Expert; ПК-35 EKF Master; ПК-50 EKF Expert",
        "type": "Медные луженые"
      },
      "tmlGost": {
        "description": "Предназначены для оконцевания опрессовкой медных кабелей и проводов. Материал – электротехническая медь М2.",
        "name": "JG (стандарт EKF) / ТМЛ ГОСТ",
        "tools": "ПГР-70 EKF Master; ПГР-120 EKF Master; ПГР-300 EKF Master; ПК-16 EKF Master; ПК-05 EKF Expert; ПК-35 EKF Master; ПК-50 EKF Expert",
        "type": "Медные луженые"
      }
    },
    "usage": {
      "li1": "Увеличение пятна контакта",
      "li2": "Разборность соединения",
      "li3": "Предотвращение появления окиси",
      "li4": "Снижение нагрева в точке перехода",
      "li5": "Снижение переходного сопротивления",
      "p1": "Наконечники и гильзы занимают большую долю в объеме коммутируемых подключений с зажимами различных электротехнических устройств, а также для соединения нескольких проводов или кабелей.",
      "p2": "Соединение проводников с помощью наконечников и гильз является распространенным способом коммутации.",
      "p3": "Наконечники применяются для оконцевания моно- и многопроволочного кабеля с последующим безопасным подключением проводника к оборудованию.",
      "p4": "В отличие от скрутки или наматывания, применение наконечника значительно улучшает качество соединения токопроводящей жилы с оборудованием и обеспечивает:",
      "subtitle": "Наконечники широко применяются в сборках, при коммутации с магистральными шинами",
      "title": "Область применения"
    }
  }
}
</i18n>
