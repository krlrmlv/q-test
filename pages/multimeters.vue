<template>
  <main class="page-landing-multimeters pb-32 pb-lg-64">
    <section class="section section-banner">
      <b-container class="d-flex flex-column h-100">
        <h1 class="banner-header">
          <strong>{{ $t('title') }}</strong
          ><br />
          <span v-html="$t('subtitle')"></span>
        </h1>
        <b-row class="d-none d-md-flex mt-auto mx-xl-n8">
          <b-col xl="2" class="mb-xl-32 px-xl-8">
            <div class="benefit">
              <svg-icon
                name="multimeters/benefit-assortment"
                width="24"
                height="24"
                aria-hidden="true"
              />
              {{ $t('advantages.assortment') }}
            </div>
          </b-col>
          <b-col xl="3" class="mb-xl-32 pr-xl-8">
            <div class="benefit">
              <svg-icon
                name="multimeters/benefit-precision"
                width="24"
                height="24"
                aria-hidden="true"
              />
              {{ $t('advantages.precision') }}
            </div>
          </b-col>
        </b-row>
        <b-row class="d-none d-md-flex mb-56 mx-xl-n8">
          <b-col xl="2" class="mb-xl-32 px-xl-8">
            <div class="benefit">
              <svg-icon
                name="multimeters/benefit-functionality"
                width="24"
                height="24"
                aria-hidden="true"
              />
              {{ $t('advantages.features') }}
            </div>
          </b-col>
          <b-col xl="3" class="mb-xl-32 pr-xl-8">
            <div class="benefit">
              <svg-icon
                name="multimeters/benefit-quality"
                width="24"
                height="24"
                aria-hidden="true"
              />
              {{ $t('advantages.quality') }}
            </div>
          </b-col>
        </b-row>
        <div class="mt-auto mt-md-0 mb-md-auto">
          <b-button :to="localePath(catalogLink)" variant="primary">
            {{ $t('catalog.goToCatalog') }}
          </b-button>
        </div>
        <p class="fs-4 d-none d-md-block mb-0" v-html="$t('lead')"></p>
      </b-container>
    </section>
    <section class="section pb-0 d-md-none">
      <b-container>
        <p class="text-center mb-40" v-html="$t('lead')"></p>
        <b-row>
          <b-col sm="6">
            <div class="benefit">
              <svg-icon
                name="multimeters/benefit-assortment"
                width="24"
                height="24"
                aria-hidden="true"
              />
              <span class="mx-auto">{{ $t('advantages.assortment') }}</span>
            </div>
          </b-col>
          <b-col sm="6">
            <div class="benefit">
              <svg-icon
                name="multimeters/benefit-precision"
                width="24"
                height="24"
                aria-hidden="true"
              />
              <span class="mx-auto">{{ $t('advantages.precision') }}</span>
            </div>
          </b-col>
          <b-col sm="6">
            <div class="benefit">
              <svg-icon
                name="multimeters/benefit-functionality"
                width="24"
                height="24"
                aria-hidden="true"
              />
              <span class="mx-auto">{{ $t('advantages.features') }}</span>
            </div>
          </b-col>
          <b-col sm="6">
            <div class="benefit">
              <svg-icon
                name="multimeters/benefit-quality"
                width="24"
                height="24"
                aria-hidden="true"
              />
              <span class="mx-auto">{{ $t('advantages.quality') }}</span>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section pb-0">
      <b-container>
        <b-row>
          <b-col lg="10" xl="8" offset-lg="2" offset-xl="4">
            <h2 class="h1 text-center text-md-right text-uppercase mb-24">
              {{ $t('safety.title') }}
            </h2>
            <p class="fs-4 text-center text-md-right mb-24">
              {{ $t('safety.description') }}
            </p>
          </b-col>
        </b-row>
        <p class="h2 text-center text-md-left header-warning">
          {{ $t('remember.title') }}
        </p>
        <b-row class="text-center">
          <b-col sm="6" xl="3">
            <div class="mb-40 mb-xl-0">
              <svg-icon
                name="multimeters/safety-dcv"
                width="75"
                height="75"
                class="icon-safety mb-16"
                aria-hidden="true"
              />
              <p>
                DCV = DC Voltage<br />
                (Direct Current Voltage)<br />
                {{ $t('remember.dcv') }}
              </p>
            </div>
          </b-col>
          <b-col sm="6" xl="3">
            <div class="mb-40 mb-xl-0">
              <svg-icon
                name="multimeters/safety-acv"
                width="75"
                height="75"
                class="icon-safety mb-16"
                aria-hidden="true"
              />
              <p>
                ACV = AC Voltage<br />
                (Alternating Current Voltage)<br />
                {{ $t('remember.acv') }}
              </p>
            </div>
          </b-col>
          <b-col sm="6" xl="3">
            <div class="mb-40 mb-xl-0">
              <svg-icon
                name="multimeters/safety-dca"
                width="75"
                height="75"
                class="icon-safety mb-16"
                aria-hidden="true"
              />
              <p>
                DCA (Direct Current Amperage)<br />
                {{ $t('remember.dca') }}
              </p>
            </div>
          </b-col>
          <b-col sm="6" xl="3">
            <div class="mb-40 mb-xl-0">
              <svg-icon
                name="multimeters/safety-aca"
                width="75"
                height="75"
                class="icon-safety mb-16"
                aria-hidden="true"
              />
              <p>
                ACA (Alternating Current Amperage)<br />
                {{ $t('remember.aca') }}
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-usage pb-0">
      <b-container>
        <h2 class="h1 text-center mb-24">{{ $t('usage.title') }}</h2>
        <b-row>
          <b-col lg="6">
            <div class="usage-item">
              <p class="usage-item-header">Master</p>
              <div class="usage-item-content">
                <div class="d-flex mb-24">
                  <svg-icon
                    name="multimeters/usage-cat1"
                    width="40"
                    height="40"
                    aria-hidden="true"
                  />
                  <p class="fs-lg-4 mb-0">
                    <strong>CAT&nbsp;I</strong> {{ $t('usage.cati') }}
                  </p>
                </div>
                <div class="d-flex">
                  <svg-icon
                    name="multimeters/usage-cat2"
                    width="40"
                    height="40"
                    aria-hidden="true"
                  />
                  <p class="fs-lg-4 mb-0">
                    <strong>CAT&nbsp;II</strong>&nbsp;{{ $t('usage.catii') }}
                  </p>
                </div>
              </div>
            </div>
          </b-col>
          <b-col lg="6">
            <div class="usage-item">
              <p class="usage-item-header">Expert / Professional</p>
              <div class="usage-item-content">
                <div class="d-flex mb-24">
                  <svg-icon
                    name="multimeters/usage-cat3"
                    width="40"
                    height="40"
                    aria-hidden="true"
                  />
                  <p class="fs-lg-4 mb-0">
                    <strong>CAT&nbsp;III</strong>&nbsp;{{ $t('usage.catiii') }}
                  </p>
                </div>
                <div class="d-flex">
                  <svg-icon
                    name="multimeters/usage-cat4"
                    width="40"
                    height="40"
                    aria-hidden="true"
                  />
                  <p class="fs-lg-4 mb-0">
                    <strong>CAT&nbsp;IV</strong>&nbsp;{{ $t('usage.cativ') }}
                  </p>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-product">
      <b-container>
        <b-row>
          <b-col
            xl="10"
            offset-xl="1"
            class="text-left text-lg-center mb-lg-40"
          >
            <h2 class="h1 header-product">{{ $t('master.title') }}</h2>
            <p class="fs-4 mb-lg-24">{{ $t('master.description') }}</p>
            <p class="fs-4 font-weight-bold mb-lg-24">{{ $t('master.cat') }}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="7" xl="5" order-md="2">
            <b-button
              variant="outline-white"
              class="mb-16 d-md-none"
              block
              @click="collapseMasterShow = !collapseMasterShow"
            >
              + {{ $t('additionalInfo') }}
            </b-button>
            <b-collapse v-model="collapseMasterShow" class="d-md-block">
              <ul class="product-benefits">
                <li>{{ $t('master.advantages.1') }}</li>
                <li>{{ $t('master.advantages.2') }}</li>
                <li>{{ $t('master.advantages.3') }}</li>
                <li>{{ $t('master.advantages.4') }}</li>
                <li>{{ $t('master.advantages.5') }}</li>
              </ul>
            </b-collapse>
          </b-col>
          <b-col md="5" xl="7" order-md="1">
            <b-img-lazy
              :alt="$t('master.title')"
              srcset="/images/multimeters/master-sm.png 360w, /images/multimeters/master.png 720w"
              src="/images/multimeters/master.png"
              sizes="(max-width: 767px) 360px, 720px"
              class="img-fluid"
            />
          </b-col>
          <b-col cols="12" order="3" class="text-center">
            <b-button :to="localePath(catalogLink)" variant="primary">
              {{ $t('buy') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-product">
      <b-container>
        <b-row>
          <b-col
            xl="10"
            offset-xl="1"
            class="text-left text-lg-center mb-lg-40"
          >
            <h2 class="h1 header-product">{{ $t('expert.title') }}</h2>
            <p class="fs-4 mb-lg-24">{{ $t('expert.description') }}</p>
            <p class="fs-4 font-weight-bold mb-lg-24">{{ $t('expert.cat') }}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="7" xl="5">
            <b-button
              variant="outline-white"
              class="mb-16 d-md-none"
              block
              @click="collapseExpertShow = !collapseExpertShow"
            >
              + {{ $t('additionalInfo') }}
            </b-button>
            <b-collapse v-model="collapseExpertShow" class="d-md-block">
              <ul class="product-benefits">
                <li>{{ $t('expert.advantages.1') }}</li>
                <li>{{ $t('expert.advantages.2') }}</li>
                <li>{{ $t('expert.advantages.3') }}</li>
                <li>{{ $t('expert.advantages.4') }}</li>
                <li>{{ $t('expert.advantages.5') }}</li>
                <li>{{ $t('expert.advantages.6') }}</li>
                <li v-html="$t('expert.advantages.7')"></li>
              </ul>
            </b-collapse>
          </b-col>
          <b-col md="5" xl="7">
            <b-img-lazy
              :alt="$t('expert.title')"
              srcset="/images/multimeters/expert-sm.png 360w, /images/multimeters/expert.png 720w"
              src="/images/multimeters/expert.png"
              sizes="(max-width: 767px) 360px, 720px"
              class="img-fluid"
            />
          </b-col>
          <b-col cols="12" order="3" class="text-center">
            <b-button :to="localePath(catalogLink)" variant="primary">
              {{ $t('buy') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-product">
      <b-container>
        <b-row>
          <b-col
            xl="10"
            offset-xl="1"
            class="text-left text-lg-center mb-lg-40"
          >
            <h2 class="h1 header-product">{{ $t('pro.title') }}</h2>
            <p class="fs-4 mb-lg-24">{{ $t('pro.description') }}</p>
            <p class="fs-4 font-weight-bold mb-lg-24">{{ $t('pro.cat') }}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="7" xl="5" order-md="2">
            <b-button
              variant="outline-white"
              class="d-md-none mb-16"
              block
              @click="collapseProfessionalShow = !collapseProfessionalShow"
            >
              + {{ $t('additionalInfo') }}
            </b-button>
            <b-collapse v-model="collapseProfessionalShow" class="d-md-block">
              <ul class="product-benefits">
                <li>{{ $t('pro.advantages.1') }}</li>
                <li>{{ $t('pro.advantages.2') }}</li>
                <li>{{ $t('pro.advantages.3') }}</li>
                <li>{{ $t('pro.advantages.4') }}</li>
                <li v-html="$t('pro.advantages.5')"></li>
                <li v-html="$t('pro.advantages.6')"></li>
              </ul>
            </b-collapse>
          </b-col>
          <b-col md="5" xl="7" order-md="1">
            <b-img-lazy
              :alt="$t('pro.title')"
              srcset="/images/multimeters/professional-sm.png 360w, /images/multimeters/professional.png 720w"
              src="/images/multimeters/professional.png"
              sizes="(max-width: 767px) 360px, 720px"
              class="img-fluid"
            />
          </b-col>
          <b-col cols="12" order="3" class="text-center">
            <b-button :to="localePath(catalogLink)" variant="primary">
              {{ $t('buy') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
import { BImgLazy, BCollapse } from 'bootstrap-vue'
import sendToMindbox from '@/utils/mindbox'

export default {
  components: {
    BImgLazy,
    BCollapse,
  },
  data() {
    return {
      catalogLink: '/catalog/multimetry',
      collapseMasterShow: false,
      collapseExpertShow: false,
      collapseProfessionalShow: false,
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
.page-landing-multimeters {
  line-height: 1.2;
  color: $white;
  background-color: #414c56;
  background-image: linear-gradient(
    180deg,
    #283440 1000px,
    #414c56 2150px,
    #505a64 3300px,
    #48535d 4450px,
    #283340 5600px
  );

  .benefit {
    display: flex;
    align-items: center;
    position: relative;
    height: 100%;
    padding: 1.25rem 0;
    text-align: center;

    &::before {
      display: block;
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      width: 180px;
      height: 1px;
      transform: translateX(-50%);
      background-image: linear-gradient(to right, $primary-light, transparent);
    }

    .icon {
      flex: 0 0 auto;
      margin-right: 1rem;
    }
  }

  .btn {
    min-width: 9rem;
  }

  .header-warning {
    margin-left: -$grid-gutter-width * 0.5;
    margin-right: -$grid-gutter-width * 0.5;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid $primary-light;
    color: $primary-light;
  }

  .header-product {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    text-transform: uppercase;
    border-bottom: 1px solid $primary-light;
  }

  .icon {
    fill: $white;
  }

  .icon-safety {
    filter: drop-shadow(0 0 0.5rem rgba($white, 0.5));
  }

  .product-benefits {
    list-style: none;
    padding-left: 0;

    & > li {
      position: relative;
      padding: 0.75rem 0;
      margin-bottom: 1.25rem;

      &::before {
        display: block;
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right, $white, transparent);
      }

      & > ul {
        list-style-type: disc;
      }
    }
  }

  .section {
    padding-top: 2rem;
    padding-bottom: 2rem;

    &.section-banner {
      height: 100vh;
      min-height: 600px;
      max-height: 800px;
      background-color: #25313d;
      background-image: url('/images/multimeters/banner-sm.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      .banner-header {
        font-size: 1.125rem;
        line-height: 1.25rem;
        text-transform: uppercase;
        opacity: 0.9;

        strong {
          font-size: 1.33333em;
        }
      }
    }
  }

  .usage-item {
    margin-bottom: 2rem;

    .usage-item-header {
      margin-bottom: 1rem;
      font-size: 2rem;
      font-weight: $font-weight-medium;
      letter-spacing: 1px;
      text-align: center;
      text-transform: uppercase;
      opacity: 0.65;
    }

    .icon {
      flex: 0 0 auto;
      margin-right: 1.25rem;
    }
  }

  @include media-breakpoint-up(sm) {
    .section {
      &.section-banner {
        .banner-header {
          font-size: 1.5rem;
          line-height: 1.75rem;
        }
      }
    }

    .header-warning {
      margin-left: 0;
      margin-right: 0;
    }

    .usage-item {
      padding: 1.75rem 2rem;
      border: 1px solid $white;

      .usage-item-header {
        text-align: left;
      }
    }
  }

  @include media-breakpoint-up(md) {
    .section {
      &.section-banner {
        background-image: url('/images/multimeters/banner-md.jpg');

        .banner-header {
          font-size: 2rem;
          line-height: 2.25rem;
        }
      }
    }

    .benefit {
      font-size: $font-size-4;
      text-align: left;

      &::before {
        left: 0;
        transform: none;
      }

      .icon {
        margin-right: 1.25rem;
      }
    }

    .header-warning {
      position: relative;
      border-bottom-color: transparent;

      &::after {
        display: block;
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(
          to right,
          $primary-light,
          transparent
        );
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      padding-top: 3rem;

      &.section-banner {
        .banner-header {
          font-size: 2.25rem;
          line-height: 2.75rem;

          strong {
            font-size: 1.75em;
          }
        }
      }
    }

    .usage-item {
      position: relative;
      min-height: 21rem;
      height: 100%;
      margin-bottom: 0;
      padding-left: 7rem;

      .usage-item-header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        position: absolute;
        left: 1rem;
        right: 2rem;
        top: 2rem;
        max-width: 18rem;
        height: 5rem;
        line-height: 1;
        text-align: right;
        transform: rotate(-90deg) translateX(-100%);
        transform-origin: top left;
      }
    }
  }

  @include media-breakpoint-up(xl) {
    .section {
      padding-top: 4rem;
      padding-bottom: 3rem;

      &.section-banner {
        padding-top: 4.5rem;
        background-image: url('/images/multimeters/banner.jpg');
        background-size: auto 100%;
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "additionalInfo": "Additional info",
    "advantages": {
      "assortment": "Wide range of products",
      "features": "Large feature set",
      "precision": "High measurement accuracy",
      "quality": "High quality materials"
    },
    "buy": "Buy",
    "expert": {
      "advantages": {
        "1": "Direct analogues of the Mastech and UNI-T brands.",
        "2": "Increased service life of the device and high measurement accuracy.",
        "3": "Rubberized case protects the device from falling, plastic stops increase ease of use.",
        "4": "Ports for holding test leads.",
        "5": "Premium class structural elements, test leads, monitors and circuits.",
        "6": "Availability of devices of the True RMS class and devices with automatic selection of measurement limits.",
        "7": "Special functions:<ul class='mb-0 pl-16'><li>non-contact voltage detection (NCV)</li><li>automatic shutdown of the device</li><li>DATA HOLD function</li><li>display backlight / work area backlight</li></ul>"
      },
      "cat": "Safety category: 1. 600V CATIII 2. 1000V CATIII / 600V CATIV",
      "description": "Mid-range models are made of better materials, and some are additionally dressed in a shockproof case. The wires to the test leads are much longer and stronger.",
      "title": "Expert series – a tool that is always up to par"
    },
    "lead": "With the help of multimeters it is possible to measure the voltage, resistance<br /> and current strength of various electrical appliances at home.",
    "master": {
      "advantages": {
        "1": "The battery is individually packaged for extended life.",
        "2": "The battery and fuse type are additionally indicated on the product body.",
        "3": "Easy to use. Basic set of functions.",
        "4": "The presence of a passport in Russian and the information content of individual packaging.",
        "5": "Leads with increased flexibility and special anti-slip stops."
      },
      "cat": "Safety category: CATI 1000V / CATII 600V",
      "description": "An entry-level multimeter is most often purchased for home use. Such models cannot boast of a special quality of probes, screen or even body. Over time, entry-level testers have cables cracking and breaking.",
      "title": "Master series – simple and tasteful"
    },
    "pageTitle": "Multimeters for professionals and amateurs — EKF",
    "pro": {
      "advantages": {
        "1": "Direct analogues of the Mastech, UNI-T, Fluke brands.",
        "2": "True RMS class.",
        "3": "The ability to connect to a computer and analyze the nature and dynamics of the measurements.",
        "4": "Premium class structural elements, test leads, monitors and circuits.",
        "5": "Extended equipment:<ul class='mb-0 pl-16'><li>Software CD.</li><li>USB cable.</li><li>Carrying bag.</li></ul>",
        "6": "Special functions:<ul class='mb-0 pl-16'><li>automatic range selection (AUTO)</li><li>relative measurement mode (REL)</li><li>measurement and recording of maximum and minimum values (MAX/MIN)</li><li>USB-interface (USB)</li><li>auto power off (APO)</li></ul>"
      },
      "cat": "Safety category: 1000V CATIII / 600V CATIV",
      "description": "They have the highest quality case, most often shockproof, the screen is characterized by maximum information content. The test leads are soft and comfortable and retain their strength over time. Communication with PC via USB, relative measurement mode, linear scale, reduced power consumption, up to 5 digits of indication, wide operating range.",
      "title": "Professional series – for connoisseurs"
    },
    "remember": {
      "aca": " ",
      "acv": " ",
      "dca": " ",
      "dcv": " ",
      "title": "Remember this!"
    },
    "safety": {
      "description": "When choosing a device, it is important to understand what voltages you will have to work with. Depending on the safety requirements, measuring equipment is assigned to certain categories. The higher the safety category, the lower the risk of injury.",
      "title": "Safety"
    },
    "subtitle": "for professionals<br /> and amateurs",
    "title": "EKF multimeters",
    "usage": {
      "cati": "designed for low-voltage networks and standard office equipment (telephony, alarms, printers, copiers).",
      "catii": "– for in-house networks and for testing equipment designed for single-phase networks, including construction power tools and household appliances (punchers, washing machines).",
      "catiii": "– for three-phase networks and three-phase equipment (household electricity meters, motors of industrial machines, welding machines, single-phase lighting lines).",
      "cativ": "– for work with overhead power lines (LEP), underground cables, industrial electricity meters, transformer substations.",
      "title": "Areas of use"
    }
  },
  "ru": {
    "additionalInfo": "Дополнительная информация",
    "advantages": {
      "assortment": "Широкий ассортимент",
      "features": "Большой набор функций",
      "precision": "Высокая точность измерений",
      "quality": "Высококачественные материалы"
    },
    "buy": "Купить",
    "expert": {
      "advantages": {
        "1": "Прямые аналоги брендов Mastech и UNI-T.",
        "2": "Повышенный ресурс работы прибора и высокая точность измерений.",
        "3": "Наличие прорезиненного корпуса, защищающего прибор от падения, и пластиковых упоров для удобства эксплуатации.",
        "4": "Наличие портов удержания измерительных щупов.",
        "5": "Использование конструктивных элементов, измерительных щупов, мониторов и схем класса премиум.",
        "6": "Наличие приборов класса True RMS и приборов с автоматическим выбором пределов измерений.",
        "7": "Наличие специальных функций:<ul class='mb-0 pl-16'><li>бесконтактное определение напряжения (NCV)</li><li>автоматическое отключение прибора</li><li>функция DATA HOLD</li><li>подсветка дисплея / подсветка рабочей области</li></ul>"
      },
      "cat": "Категория безопасности: 1. 600V CATIII 2. 1000V CATIII / 600V CATIV",
      "description": "Модели среднего уровня изготавливаются из более качественных материалов, а некоторые дополнительно облачены в противоударный чехол. Провода к измерительным щупам куда длиннее и крепче.",
      "title": "Серия Expert – инструмент, который всегда на уровне"
    },
    "lead": "C пoмoщью мyльтимeтpoв мoжнo в дoмaшних ycлoвиях измepить нaпpяжeниe,<br /> coпpoтивлeниe и cилy тoкa paзличных элeктpичecких пpибopoв.",
    "master": {
      "advantages": {
        "1": "Батарея в отдельной индивидуальной упаковке для увеличения срока службы.",
        "2": "На корпусе изделия дополнительно указаны тип батареи и предохранителя.",
        "3": "Простота в использовании. Базовый набор функций.",
        "4": "Наличие паспорта на русском языке и информативность индивидуальной упаковки.",
        "5": "Щупы с повышенной гибкостью и специальными упорами от соскальзывания."
      },
      "cat": "Категория безопасности: CATI 1000V / CATII 600V",
      "description": "Мультиметр начального уровня чаще всего приобретается для домашнего использования. Такие модели не могут похвастаться особым качеством щупов, экрана или даже корпуса. Со временем у тестеров начального уровня трескаются и ломаются кабели.",
      "title": "Серия Master – просто и со вкусом"
    },
    "pageTitle": "Мультиметры для профессионалов и любителей — EKF",
    "pro": {
      "advantages": {
        "1": "Прямые аналоги брендов Mastech и UNI-T, Fluke.",
        "2": "Прибор класса True RMS.",
        "3": "Возможность подключения к компьютеру и анализа характера и динамики производимых измерений.",
        "4": "Использование конструктивных элементов, измерительных щупов, мониторов и схем класса премиум.",
        "5": "Расширенная комплектация:<ul class='mb-0 pl-16'><li>Диск с программным обеспечением.</li><li>Кабель USB.</li><li>Сумка для переноски.</li></ul>",
        "6": "Наличие специальных функций:<ul class='mb-0 pl-16'><li>автоматический выбор диапазонов (AUTO)</li><li>режим относительных измерений (REL)</li><li>измерение и запись максимальных и минимальных значений (MAX/MIN)</li><li>USB-интерфейс (USB)</li><li>автоматическое отключение питания (APO)</li></ul>"
      },
      "cat": "Категория безопасности: 1000V CATIII / 600V CATIV",
      "description": "Обладают самым качественным корпусом, чаще всего противоударным, экран отличается максимальной информативностью. Измерительные провода мягкие и удобные, со временем сохраняют свою прочность. Связь с ПК через USB, режим относительного измерения, линейная шкала, пониженное электропотребление, до 5 разрядов индикации, широкий диапазон работы.",
      "title": "Серия Professional – для ценителей"
    },
    "remember": {
      "aca": "Сила тока переменного напряжения (в амперах)",
      "acv": "Переменное напряжение",
      "dca": "Сила тока постоянного напряжения (в амперах)",
      "dcv": "Постоянное напряжение",
      "title": "Это нужно запомнить!"
    },
    "safety": {
      "description": "При выборе прибора важно понимать, с какими напряжениями придется работать. В зависимости от требований по безопасности измерительное оборудование относится к определенным категориям. Чем выше категория безопасности, тем меньше риск получить электротравму.",
      "title": "Безопасность"
    },
    "subtitle": "для профессионалов<br /> и любителей",
    "title": "Мультиметры EKF",
    "usage": {
      "cati": "рассчитана под низковольтные сети и стандартную офисную технику (телефония, сигнализация, принтеры, копировальные аппараты).",
      "catii": "– для внутридомовых сетей и для проверки оборудования, рассчитанного под однофазные сети, в том числе строительные электроинструменты и бытовая техника (перфораторы, стиральные машины).",
      "catiii": "– для трехфазных сетей и трехфазного оборудования (бытовые электросчетчики, двигатели промышленных станков, сварочные аппараты, однофазные линии освещения).",
      "cativ": "– для работ с воздушными линиями электропередач (ЛЭП), подземными кабелями, промышленными электросчетчиками, трансформаторными подстанциями.",
      "title": "Области применения"
    }
  }
}
</i18n>
