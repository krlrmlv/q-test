<template>
  <main class="page-landing page-landing-modular-automation pb-32 pb-lg-64">
    <section class="section section-banner">
      <b-container class="h-100">
        <b-row
          align-v="center"
          class="justify-content-center h-100 text-md-center"
        >
          <b-col xl="10">
            <h1 class="text-uppercase mb-24 py-lg-16">{{ $t('title') }}</h1>
            <b-row>
              <b-col md="4">
                <p>
                  {{ $t('numbers.1.before') }}
                  <strong class="benefit-number">{{
                    $t('numbers.1.number')
                  }}</strong>
                  {{ $t('numbers.1.after') }}
                </p>
              </b-col>
              <b-col md="4">
                <p>
                  {{ $t('numbers.2.before') }}
                  <strong class="benefit-number">{{
                    $t('numbers.2.number')
                  }}</strong>
                  {{ $t('numbers.2.after') }}
                </p>
              </b-col>
              <b-col md="4">
                <p>
                  {{ $t('numbers.3.before') }}
                  <strong class="benefit-number">{{
                    $t('numbers.3.number')
                  }}</strong>
                  {{ $t('numbers.3.after') }}
                </p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-anchors pb-0">
      <b-container>
        <b-button-group class="mx-n4">
          <div
            v-for="tab in groups"
            :key="`tab-${tab.key}`"
            class="btn-group-item px-4 pb-8"
          >
            <b-button
              :to="{ hash: `#group-${tab.key}` }"
              variant="outline-gray-500"
              class="rounded-pill"
            >
              <span>
                <span v-if="tab.new" class="label-new">new</span>
                {{ $t(`${tab.key}.tabCaption`) }}
              </span>
            </b-button>
          </div>
        </b-button-group>
      </b-container>
    </section>

    <section
      v-for="(group, groupIndex) in groups"
      :key="`group-${group.key}`"
      class="section lh-120 pb-0"
    >
      <a :id="`group-${group.key}`" class="anchor"></a>
      <b-container>
        <b-row class="mx-lg-n16">
          <b-col
            :order-lg="groupIndex % 2 === 0 ? 2 : null"
            lg="6"
            xl="7"
            class="mb-24 px-lg-16"
          >
            <h3 class="h4 text-uppercase mb-0">
              {{ $t(`${group.key}.title`) }}
            </h3>
            <p class="h5 font-weight-normal text-gray-600 mb-24">
              {{ $t(`${group.key}.subtitle`) }}
            </p>
            <p class="fs-4">
              {{ $t(`${group.key}.description`) }}
            </p>
            <b-row class="mx-n16 py-16">
              <b-col
                v-for="item in group.series"
                :key="`series-${group.key}-${item}`"
                cols="4"
                md="auto"
                class="px-16"
              >
                <img
                  :alt="item"
                  :src="`/images/logo-${item}.svg`"
                  height="24"
                  class="mb-16"
                />
                <p class="mb-24">
                  {{ $t('warranty') }}<br />
                  {{ $t(item) }}
                </p>
              </b-col>
            </b-row>
            <b-button :to="localePath(group.link)" variant="primary">
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
          <b-col
            :order-lg="groupIndex % 2 === 0 ? 1 : null"
            lg="6"
            xl="5"
            class="mb-24 px-lg-16"
          >
            <b-img-lazy
              :alt="$t(`${group.key}.title`)"
              :srcset="`/images/modular-automation/${group.image}-sm.jpg 360w, /images/modular-automation/${group.image}.jpg 720w`"
              :src="`/images/modular-automation/${group.image}.jpg`"
              sizes="(max-width: 767px) 360px, 720px"
              class="img-fluid border rounded-lg"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2 class="text-center text-uppercase mb-5">
          {{ $t('video.title') }}
        </h2>
        <b-row>
          <b-col lg="4">
            <YoutubeEmbed
              video-id="5w3ftqZJqXc"
              aspect="4by3"
              class="mb-16 mb-md-0"
            >
              <p class="h5 text-center embed-thumbnail-caption">
                {{ $t('video.1') }}
              </p>
            </YoutubeEmbed>
          </b-col>
          <b-col lg="4">
            <YoutubeEmbed
              video-id="27oCMXv1Y-8"
              aspect="4by3"
              class="mb-16 mb-md-0"
            >
              <p class="h5 text-center embed-thumbnail-caption">
                {{ $t('video.2') }}
              </p>
            </YoutubeEmbed>
          </b-col>
          <b-col lg="4">
            <YoutubeEmbed
              video-id="ZImy68h-0zA"
              aspect="4by3"
              class="mb-16 mb-md-0"
            >
              <p class="h5 text-center embed-thumbnail-caption">
                {{ $t('video.3') }}
              </p>
            </YoutubeEmbed>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
import { BImgLazy, BButtonGroup } from 'bootstrap-vue'
import sendToMindbox from '@/utils/mindbox'

export default {
  components: {
    BImgLazy,
    BButtonGroup,
  },
  data() {
    return {
      groups: [
        {
          key: 'circuitBreaker',
          image: 'av',
          link: '/catalog/modulnye-avtomaticheskie-vyklyuchateli',
          series: ['basic', 'proxima', 'averes'],
        },
        {
          key: 'rcd',
          image: 'uzo',
          link: '/catalog/vyklyuchateli-differencialnogo-toka-vdt-uzo',
          series: ['basic', 'proxima', 'averes'],
        },
        {
          key: 'rccb',
          image: 'avdt',
          link: '/catalog/avtomaticheskie-vyklyuchateli-differencialnogo-toka-avdt-difavtomaty',
          series: ['basic', 'proxima', 'averes'],
        },
        {
          key: 'surgeProtection',
          image: 'uzip',
          link: '/catalog/ustrojstva-zashhity-ot-impulsny-perenapryazhenij',
          series: ['proxima'],
        },
        {
          key: 'loadBreakSwitch',
          image: 'vn',
          link: '/catalog/vyklyuchateli-nagruzki-rubilniki-razediniteli-predo-raniteli',
          series: ['basic', 'proxima', 'averes'],
        },
        {
          key: 'afci',
          image: 'uzdp',
          link: '/catalog/ustrojstva-zashhity-ot-dugovogo-proboya',
          series: ['proxima'],
        },
      ],
      tabs: [
        { key: 'circuitBreaker' },
        { key: 'rcd' },
        { key: 'rccb' },
        { key: 'surgeProtection' },
        { key: 'loadBreakSwitch' },
        { key: 'afci', new: true },
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
.page-landing-modular-automation {
  .section {
    padding-top: 2rem;
    padding-bottom: 2rem;

    &.section-banner {
      padding-top: 3rem;
      font-size: 0.9375rem;
      font-weight: $font-weight-medium;
      text-transform: uppercase;
      color: $white;
      background-color: #292021;
      background-image: url('/images/modular-automation/banner-bg-sm.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      .benefit-number {
        font-size: 1.25em;
        font-weight: $font-weight-bold;
      }
    }

    &.section-anchors {
      .btn-group {
        .btn {
          min-width: 6rem;
          height: 3rem;
          padding: 0 1.75rem;
          font-size: $font-size-3;
          font-weight: $font-weight-bold;
          line-height: 1;
          color: $gray-600;

          .label-new {
            display: block;
            width: 100%;
            font-size: $font-size-2;
            color: $primary;
          }

          &:not(:disabled):not(.disabled) {
            &:hover {
              color: $white;
              border-color: $primary;
              background-color: $primary;

              .label-new {
                color: $white;
              }
            }
          }
        }
      }
    }
  }

  .btn-catalog {
    font-size: $font-size-3;
    padding: 0.875rem 2.5rem;
    border-radius: 0.75rem;
  }

  @include media-breakpoint-down(md) {
    .section {
      &.section-anchors {
        .btn-group {
          flex-wrap: wrap;

          .btn-group-item {
            flex: 1 1 auto;
          }

          .btn {
            width: 100%;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(md) {
    .section {
      &.section-banner {
        height: 500px;
        font-size: 1.125rem;
        font-weight: $font-weight-bold;
        line-height: 1.2;
        text-transform: none;
        background-image: url('/images/modular-automation/banner-bg.jpg');
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      padding-top: 3rem;
      padding-bottom: 3rem;

      &.section-banner {
        font-size: 1.5rem;

        h1 {
          font-size: 3.75rem;
        }

        .benefit-number {
          display: block;
          width: 100%;
          font-size: 2.5em;
        }
      }

      &.section-anchors {
        .btn-group {
          .btn {
            font-size: $font-size-4;
          }
        }
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "afci": {
      "description": "An arc fault protection device (AFCI) of the PROxima line, combined with a circuit breaker, will minimize the risks of fire under the influence of arc currents by detecting and limiting the arc current to prevent fire, and will also protect the electrical network from short circuits and overloads.",
      "subtitle": "100% protection of your home from fire",
      "tabCaption": "AFCIs",
      "title": "New! Arc flash protection device from EKF"
    },
    "averes": "up to 10 years",
    "basic": "up to 3 years",
    "circuitBreaker": {
      "description": "EKF assortment includes a wide range of modern, reliable and high performance modular circuit breakers. The products are used in industrial, commercial, administrative and residential buildings due to a number of advantages.",
      "subtitle": "Reliable protection against short circuit and overload",
      "tabCaption": "Circuit breakers",
      "title": "EKF circuit breakers"
    },
    "loadBreakSwitch": {
      "description": "EKF modular load break switches are designed for operational control of sections of electrical circuits. They provide disconnection and closing of the rated current, and also perform the disconnection function. They are realized in single-pole, two-pole, three-pole and four-pole versions.",
      "subtitle": "Disconnecting and reconnecting circuit under load",
      "tabCaption": "Load break switches",
      "title": "EKF modular load break switches"
    },
    "numbers": {
      "1": {
        "after": "projects implemented in 2019",
        "before": "more than",
        "number": "1000"
      },
      "2": {
        "after": "apartment is equipped with EKF products",
        "before": "every",
        "number": "5th"
      },
      "3": {
        "after": "years warranty for EKF products",
        "before": "up to",
        "number": "10"
      }
    },
    "pageTitle": "Modular automation — EKF",
    "proxima": "up to 7 years",
    "rccb": {
      "description": "The range of EKF modular automatics includes a number of models of residual current circuit breakers (RCBOs), performing the tasks of RCD and circuit breaker. The devices limit the leakage current, excluding situations in which a person can receive an electric shock, and also protect electrical equipment from the negative consequences of emergency network operating modes caused by a short circuit or overload.",
      "subtitle": "Keeping the current under control ",
      "tabCaption": "RCBOs",
      "title": "EKF residual current circuit breakers"
    },
    "rcd": {
      "description": "EKF residual current switches are designed to protect people from electric shock in case of accidental contact with open conductive parts of an electrical installation and to protect electrical equipment in case of damage to conductor insulation. RCDs for large differential currents (from one hundred milliamperes) provide fire safety by preventing the ignition of the wiring due to the prolonged flow of the leakage current.",
      "subtitle": "Guaranteed protection against leakage currents",
      "tabCaption": "RCDs",
      "title": "Differential current switches (RCD) EKF"
    },
    "surgeProtection": {
      "description": "The EKF SPD group includes models of varistor surge arresters (SPD) and devices based on arresters (T1) of the PROxima line. The devices are designed to combat surges in impulse voltage, the causes of which can be: lightning strikes the power grid, voltage resonance, short circuits, as well as the occurrence of an electric arc.",
      "subtitle": "Reliable protection from voltage surges",
      "tabCaption": "Surge protection devices",
      "title": "EKF surge protection devices"
    },
    "title": "Modular automation",
    "video": {
      "1": "EKF residual current circuit breaker",
      "2": "TOP 4 type tests of modular machines according to GOST",
      "3": "Unique features of AVERES circuit breaker",
      "title": "Modular automation video"
    },
    "warranty": "Warranty"
  },
  "ru": {
    "afci": {
      "description": "Устройство защиты от дугового пробоя (УЗДП) линейки PROxima, совмещенное с автоматическим выключателем, максимально снизит риски возгорания под воздействием токов дугового замыкания, обнаруживая и ограничивая ток дуги для предотвращения пожара, а также обеспечит защиту элетросети от короткого замыкания и перегрузки.",
      "subtitle": "100% защита Вашего жилища от пожара",
      "tabCaption": "УЗДП",
      "title": "Новинка! Устройство защиты от дугового пробоя от EKF"
    },
    "averes": "до 10 лет",
    "basic": "до 3 лет",
    "circuitBreaker": {
      "description": "Ассортимент EKF включает широкий спектр современных, надежных и высокоэффективных модульных автоматических выключателей. Продукция находит применение в промышленных, коммерческих, административных и жилых зданиях благодаря ряду преимуществ.",
      "subtitle": "Надежная защита от короткого замыкания и перегрузки",
      "tabCaption": "Автоматические выключатели",
      "title": "Автоматические выключатели EKF"
    },
    "loadBreakSwitch": {
      "description": "Модульные выключатели нагрузки EKF предназначены для оперативного управления участками электрических цепей. Обеспечивают отключение и включение номинального тока, а также выполняют функцию разъединения. Реализованы в однополюсном, двухполюсном, трехполюсном и четырехполюсном исполнениях.",
      "subtitle": "Отключение и включение цепи под нагрузкой",
      "tabCaption": "Выключатели нагрузки",
      "title": "Модульные выключатели нагрузки EKF"
    },
    "numbers": {
      "1": {
        "after": "проектов реализовано в 2019 году",
        "before": "более",
        "number": "1000"
      },
      "2": {
        "after": "квартире установлено оборудование EKF",
        "before": "в каждой",
        "number": "5"
      },
      "3": {
        "after": "лет гарантии на продукцию EKF",
        "before": "до",
        "number": "10"
      }
    },
    "pageTitle": "Модульное оборудование — EKF",
    "proxima": "до 7 лет",
    "rccb": {
      "description": "Ассортимент модульной автоматики EKF включает ряд моделей автоматических выключателей дифференциального тока (АВДТ), выполняющих задачи УЗО и автоматического выключателя. Устройства ограничивают ток утечки, исключая ситуации, в которых человек может получить удар электротоком, а также защищают электрооборудование от негативных последствий аварийных режимов работы сети, вызванных коротким замыканием или перегрузкой.",
      "subtitle": "Держим ток под контролем",
      "tabCaption": "Дифавтоматы",
      "title": "Автоматические выключатели дифференциального тока EKF"
    },
    "rcd": {
      "description": "Выключатели дифференциального тока EKF предназначены для защиты людей от поражения электрическим током при случайном прикосновении к открытым проводящим частям электроустановки и для защиты электрооборудования при повреждении изоляции проводников. УЗО на большие дифференциальные токи (от ста миллиампер) обеспечивают пожарную безопасность, препятствуя воспламенению проводки из-за длительного протекания тока утечки.",
      "subtitle": "Гарантированная защита от токов утечки",
      "tabCaption": "УЗО",
      "title": "Выключатели дифференциального тока (УЗО) EKF"
    },
    "surgeProtection": {
      "description": "В группу УЗИП от EKF входят модели варисторных ограничителей перенапряжений (ОПВ) и приборы на базе разрядников (Т1) линейки PROxima. Устройства предназначены для борьбы со скачками импульсного напряжения, причинами которых могут стать: попадание молнии в электросеть, резонанс напряжений, короткие замыкания, а также возникновение электрической дуги.",
      "subtitle": "Защита от скачков импульсного напряжения",
      "tabCaption": "УЗИП",
      "title": "Устройства защиты от импульсных перенапряжений EKF"
    },
    "title": "Модульное оборудование",
    "video": {
      "1": "Автоматический выключатель дифференциального тока от EKF",
      "2": "ТОП 4 типовых тестов модульных автоматов по ГОСТу",
      "3": "Уникальные особенности дифавтомата AVERES",
      "title": "Видео по модульному оборудованию"
    },
    "warranty": "Гарантия"
  }
}
</i18n>
