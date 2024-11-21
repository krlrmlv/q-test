<template>
  <main class="page-landing-pro-relay pb-32 pb-lg-64">
    <section class="section section-banner">
      <b-container class="d-flex flex-column flex-fill">
        <b-row class="flex-fill">
          <b-col md="7" xl="8" class="d-flex flex-column">
            <h1 class="banner-header" v-html="$t('title')"></h1>
            <div class="d-none d-md-block">
              <p>{{ $t('lead.1') }}</p>
              <p>{{ $t('lead.2') }}</p>
              <ul class="pl-16">
                <li>{{ $t('lead.3') }}</li>
                <li>{{ $t('lead.4') }}</li>
                <li>{{ $t('lead.5') }}</li>
              </ul>
            </div>
            <b-row class="header-links mt-auto">
              <b-col cols="8" sm="auto" offset="2" offset-sm="0">
                <b-button
                  :to="localePath(catalogLink)"
                  variant="primary"
                  class="mb-16 mb-sm-0"
                  block
                >
                  {{ $t('catalog.goToCatalog') }}
                </b-button>
              </b-col>
              <b-col cols="8" sm="auto" offset="2" offset-sm="0">
                <b-button variant="primary" block @click="handleScroll">
                  {{ $t('submit') }}
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section pb-0">
      <b-container>
        <h2 class="h1 text-center mb-8 mb-lg-0">
          {{ $t('usage.title') }}
        </h2>
        <p class="h4 text-center mb-24 mb-xl-40">
          {{ $t('usage.subtitle') }}
        </p>
        <b-row
          cols="2"
          cols-sm="3"
          cols-lg="5"
          class="justify-content-center text-center"
        >
          <b-col v-for="item in usage" :key="`usage-${item}`">
            <svg-icon
              :name="`pro-relay/usage-${item}`"
              width="60"
              height="60"
              class="fill-primary mb-8"
              aria-hidden="true"
            />
            <p class="font-weight-bold mb-24" v-html="$t(`usage.${item}`)"></p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2 class="h1 text-center text-md-left mb-24 mb-xl-40">
          {{ $t('solutions.title') }}
        </h2>
        <b-row>
          <b-col
            v-for="s in 4"
            :key="`solution-${s}`"
            sm="6"
            xl="3"
            class="mb-24"
          >
            <div class="card card-pro-relay-solution h-100">
              <div class="card-body">
                <h5 class="text-uppercase mb-xl-24">
                  {{ $t('solutions.ats') }}:
                </h5>
                <p class="mb-0">{{ $t(`solutions.${s}`) }}</p>
              </div>
              <div class="card-footer">
                <b-button
                  :href="`/uploads/landing/prorelay-solution-${s}.zip`"
                  variant="outline-white"
                >
                  {{ $t('global.more') }}
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-benefits">
      <b-container>
        <h2 class="h1 text-center text-md-right mb-24 mb-xl-40">
          {{ $t('advantages.title') }}
        </h2>
        <div class="section-image">
          <b-img
            :alt="$t('advantages.title')"
            :srcset="`/images/pro-relay/benefits-sm.jpg 360w, /images/pro-relay/${$t(
              'advantages.image'
            )} 1544w`"
            :src="`/images/pro-relay/${$t('advantages.image')}`"
            sizes="(max-width: 767px) 360px, 1544px"
          />
        </div>
        <ul class="d-md-none pl-16">
          <li v-for="a in 7" :key="`advantage-${a}`" class="mb-8">
            {{ $t(`advantages.${a}`) }}
          </li>
        </ul>
      </b-container>
    </section>

    <section
      v-for="(mod, index) in modules"
      :key="`module-${mod.key}`"
      :class="{
        'section-product-reversed': index % 2 !== 0,
        'mb-64 pb-lg-32': index === modules.length - 1,
      }"
      class="section section-product"
    >
      <b-container>
        <b-row>
          <b-col :order-md="index % 2 !== 0 ? 2 : null" md="6" xl="7">
            <h2 class="h1">{{ $t(`modules.${mod.key}.title`) }}</h2>
            <ul class="list-product">
              <li v-for="p in mod.points" :key="`point-${mod.key}-${p}`">
                {{ $t(`modules.${mod.key}.points.${p}`) }}
              </li>
            </ul>
            <p
              v-for="d in mod.description"
              :key="`description-${mod.key}-${d}`"
              :class="{ 'mb-24 mb-md-0': d === mod.description }"
            >
              {{ $t(`modules.${mod.key}.description.${d}`) }}
            </p>
          </b-col>
          <b-col :order-md="index % 2 !== 0 ? 1 : null" md="6" xl="5">
            <b-img
              :srcset="`/images/pro-relay/module-${mod.key}-sm.jpg 360w, /images/pro-relay/module-${mod.key}.jpg 500w`"
              :src="`/images/pro-relay/module-${mod.key}.jpg`"
              :alt="$t(`modules.${mod.key}.title`)"
              sizes="(max-width: 767px) 360px, 500px"
              class="img-fluid"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-dark text-center">
      <b-container>
        <h2 class="h1 text-center mb-24" v-html="$t('software.title')"></h2>
        <p class="font-weight-bold mb-24 mb-lg-40">
          {{ $t('software.description') }}
        </p>
        <b-button :to="localePath('/support/software')" variant="white">
          {{ $t('global.download') }}
        </b-button>
      </b-container>
    </section>

    <section class="section section-product section-product-reversed">
      <b-container>
        <b-row>
          <b-col md="6" xl="7" order-md="2">
            <h2 class="h1">{{ $t('add.title') }}</h2>
            <p class="mb-24">{{ $t('add.subtitle') }}</p>
            <ul class="list-unstyled font-weight-bold">
              <li class="text-uppercase mb-24">{{ $t('add.usb') }}</li>
              <li class="text-uppercase mb-24">{{ $t('add.rs232') }}</li>
              <li class="mb-24">{{ $t('add.driver') }}</li>
            </ul>
            <b-button
              href="/uploads/products/62044292EB9CD64C686A241CFBBB699B.zip"
              variant="primary"
            >
              {{ $t('global.download') }}
            </b-button>
          </b-col>
          <b-col md="6" xl="5" order-md="1" class="d-none d-md-block">
            <b-img
              :alt="$t('add.alt')"
              srcset="/images/pro-relay/cable-sm.jpg 360w, /images/pro-relay/cable.jpg 500w"
              src="/images/pro-relay/cable.jpg"
              sizes="(max-width: 767px) 360px, 500px"
              class="img-fluid"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <b-row>
          <b-col lg="10" xl="8" offset-lg="1" offset-xl="2">
            <FormFeedback
              id="feedback-form"
              :code="282"
              :mindbox-custom-fields="mindboxCustomFields"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>
    <!-- <a id="feedback-form" style="height: 30px"> hluis </a> -->
  </main>
</template>

<script>
import { BImg } from 'bootstrap-vue'
import sendToMindbox from '@/utils/mindbox'
import { scrollToTarget } from '@/utils/window'

export default {
  components: {
    BImg,
  },

  data() {
    return {
      catalogLink: '/catalog/avtomatizaciya-i-upravlenie',
      modules: [
        { key: 'base', description: 1, points: 4 },
        { key: 'expansion', description: 2, points: 3 },
        { key: 'interface', description: 1, points: 2 },
      ],
      usage: ['pump', 'escalator', 'fan', 'ats', 'lighting'],
      mindboxCustomFields: {
        formName: 'Оставить заявку - форма в футере',
        EKFFormID: 'ostavit_zayavku_forma_v_futere',
      },
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

  methods: {
    handleScroll() {
      const scrollTarget = document.querySelector('#feedback-form')
      scrollToTarget(scrollTarget)
    },
  },
}
</script>

<style lang="scss">
.page-landing-pro-relay {
  line-height: 1.2;

  h1,
  .h1 {
    font-size: 1.75rem;

    small {
      font-size: 0.75em;
      font-weight: inherit;
    }
  }

  h4,
  .h4 {
    font-size: 1.125rem;
  }

  h5,
  .h5 {
    font-size: 1rem;
  }

  .btn {
    min-width: 9.5rem;
    padding: 0.75rem 1.25rem;
  }

  .card-pro-relay-solution {
    border-radius: 0.25rem;
    color: $white;
    background-color: #f23838;
    background-image: linear-gradient(to top, #ff0101, #ed4f4f, #bf3a3a);

    .card-body {
      padding: 1.5rem;
    }

    .card-footer {
      padding: 0 1.5rem 1.5rem;
    }
  }

  .list-product {
    list-style: none;
    margin-bottom: 2rem;
    padding: 0;
    font-weight: $font-weight-medium;

    & > li {
      position: relative;
      margin-bottom: 1rem;
      padding-left: 1.25em;

      &::before {
        display: block;
        content: '';
        position: absolute;
        left: 0;
        top: 0.35em;
        width: 0.5em;
        height: 0.5em;
        border-radius: $rounded-pill;
        background-color: $primary;
      }
    }
  }

  .section {
    padding-top: 2rem;
    padding-bottom: 2rem;

    &.section-banner {
      display: flex;
      flex-direction: column;
      min-height: 640px;
      padding-top: 3rem;
      padding-bottom: 1rem;
      font-weight: $font-weight-medium;
      color: $white;
      background-color: #ea5656;
      background-image: url('/images/pro-relay/banner-bg-sm.jpg');
      background-position: center bottom;
      background-repeat: no-repeat;
      background-size: auto 100%;

      .banner-header {
        font-size: 1.5rem;

        strong {
          font-size: 3rem;
        }
      }
    }

    &.section-benefits {
      background-color: #f7fbfc;
      overflow: hidden;

      .section-image {
        & > img {
          max-width: 100%;
          height: auto;
        }
      }
    }

    &.section-product {
      padding-bottom: 0;
    }

    &.section-dark {
      color: $white;
      background-color: $gray-700;
    }
  }

  @include media-breakpoint-up(sm) {
    .section {
      &.section-banner {
        padding-bottom: 2rem;

        .banner-header {
          font-size: 1.75rem;

          strong {
            font-size: 1.5em;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(md) {
    .section {
      &.section-banner {
        background-image: url('/images/pro-relay/banner-bg-md.jpg');
        background-size: cover;

        .banner-header {
          margin-bottom: 2rem;
        }
      }

      &.section-product {
        padding-bottom: 1rem;

        &.section-product-reversed {
          text-align: right;

          .list-product {
            & > li {
              padding-left: 0;
              padding-right: 1.25em;

              &::before {
                left: auto;
                right: 0;
              }
            }
          }
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    font-size: $font-size-4;

    h1,
    .h1 {
      font-size: 3rem;
    }

    h4,
    .h4 {
      font-size: 1.25rem;
    }

    h5,
    .h5 {
      font-size: 1.125rem;
    }

    .card-pro-relay-solution {
      font-size: $font-size-4;
    }

    .section {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;

      &.section-banner {
        padding-top: 4.5rem;

        .banner-header {
          font-size: 2.25rem;

          strong {
            font-size: 1.75em;
          }
        }
      }

      &.section-product {
        font-size: $font-size-5;

        h1,
        .h1 {
          margin-bottom: 2rem;
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    h1,
    .h1 {
      font-size: 4rem;
    }

    h4,
    .h4 {
      font-size: 1.5rem;
    }

    .section {
      &.section-banner {
        min-height: 740px;
        padding-top: 7.5rem;
        padding-bottom: 7rem;
        background-image: url('/images/pro-relay/banner-bg.jpg');

        .banner-header {
          font-size: 3.25rem;
        }
      }

      &.section-benefits {
        padding-bottom: 0;

        .section-image {
          display: flex;
          justify-content: flex-end;

          & > img {
            flex: 0 0 auto;
            max-width: calc(
              50vw + #{map-get($container-max-widths, 'xl') * 0.5}
            );
            height: auto;
          }
        }
      }

      &.section-product {
        h1,
        .h1 {
          display: inline-block;
          position: relative;
          margin-bottom: 3rem;
          padding-bottom: 1rem;
          font-size: 3.25rem;
          letter-spacing: -0.125rem;

          &::after {
            display: block;
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 0.5rem;
            border-radius: $rounded-pill;
            background-color: $primary;
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
    "add": {
      "alt": "Programming cables",
      "driver": "Cable driver",
      "rs232": "RS-232 (COM) programming cable",
      "subtitle": "PRO-Relay can only be programmed using the programming cable.",
      "title": "Additionally",
      "usb": "USB programming cable"
    },
    "advantages": {
      "1": "Ergonomic design",
      "2": "Intuitive programming",
      "3": "95% of simple automation tasks with a few SKU",
      "4": "2 programming languages: LD and FBD",
      "5": "Simplification of complex relay circuits",
      "6": "Built-in backlit LCD display in Cyrillic, 4x16 characters",
      "7": "Reliable mechanical connection between expansion modules and base module",
      "image": "benefits-en.svg",
      "title": "Advantages"
    },
    "lead": {
      "1": "PRO-Relay programmable relays save development time and money by reducing relay components.",
      "2": "PRO-Relay EKF PROxima programmable relays are used for:",
      "3": "discrete control of actuators;",
      "4": "analog control of actuators (when using an extension module);",
      "5": "monitoring the state of the controlled system."
    },
    "modules": {
      "base": {
        "description": {
          "1": "PRO-Relay EKF PROxima programmable relays are designed to create simple automation systems. They allow you to create various control algorithms using the PRO-design software."
        },
        "points": {
          "1": "With / without display",
          "2": "10 to 20 inputs / outputs",
          "3": "Supply voltage =24DC / ~230AC",
          "4": "Selectable transistor and relay outputs"
        },
        "title": "Base modules"
      },
      "expansion": {
        "description": {
          "1": "Expansion modules for the PRO-Relay EKF PROxima programmable relay are designed to increase the number of I/O points of the base module. They allow connecting discrete and analog signals to the processor module.",
          "2": "Not used without a base module!"
        },
        "points": {
          "1": "Discrete I/O",
          "2": "Analog I/O",
          "3": "Temperature inputs"
        },
        "title": "Expansion modules"
      },
      "interface": {
        "description": {
          "1": "Interface modules are designed to connect the PRO-Relay EKF PROxima programmable relay to distributed control and dispatch systems. The module is used only in conjunction with the base module and does NOT function separately."
        },
        "points": {
          "1": "RS-485 Modbus RTU",
          "2": "Ethernet Modbus TCP"
        },
        "title": "Interface modules"
      }
    },
    "pageTitle": "PRO-Relay programmable relays — EKF",
    "software": {
      "description": "PRO-design software allows you to develop and debug control programs for PRO-Relay EKF PROXima programmable relays. Includes programming and debugging tools for developing programs in FBD (functional block diagrams) and LD (ladder diagrams) languages.",
      "title": "PRO-design software"
    },
    "solutions": {
      "1": "Two inputs per bus section",
      "2": "Two inputs with sectioning",
      "3": "Two inputs with sectioning + diesel generator input",
      "4": "Three inputs per bus section",
      "ats": "Automatic transfer switch",
      "title": "Ready-made ATS solutions"
    },
    "submit": "Submit an application",
    "title": "<strong>PRO-Relay</strong><br />programmable relays",
    "usage": {
      "ats": "ATS<br /> control",
      "escalator": "Escalator<br /> control",
      "fan": "Ventilation<br /> control",
      "lighting": "Lighting<br /> control",
      "pump": "Pump<br /> control",
      "subtitle": "Automation of local technological processes",
      "title": "Main areas of application"
    }
  },
  "ru": {
    "add": {
      "alt": "Кабели программирования",
      "driver": "Драйвер для кабеля",
      "rs232": "Кабель программирования RS-232 (COM)",
      "subtitle": "PRO-Relay может быть запрограммировано только при помощи кабеля для программирования.",
      "title": "Дополнительно",
      "usb": "Кабель программирования USB"
    },
    "advantages": {
      "1": "Эргономичный дизайн",
      "2": "Интуитивно понятное программирование",
      "3": "95% задач простой автоматизации при малом SKU",
      "4": "2 языка программирования: LD и FBD",
      "5": "Упрощение сложных релейных схем",
      "6": "Встроенный жидкокристаллический экран с подсветкой и кириллицей, 4×16 символов",
      "7": "Надежное механическое соединение модулей расширения и базового модуля",
      "image": "benefits.svg",
      "title": "Преимущества"
    },
    "lead": {
      "1": "Программируемые реле PRO-Relay экономят время при разработке и финансы за счет сокращения компонентов релейных схем.",
      "2": "Программируемые реле PRO-Relay EKF PROxima используются для:",
      "3": "дискретного управления исполнительными механизмами;",
      "4": "аналогового управления исполнительными механизмами (при использовании модуля расширения);",
      "5": "контроля состояния управляемой системы."
    },
    "modules": {
      "base": {
        "description": {
          "1": "Программируемое реле PRO-Relay EKF PROxima предназначено для создания простых систем автоматизации. Позволяет создавать различные алгоритмы управления с помощью программного обеспечения PRO-design."
        },
        "points": {
          "1": "С дисплеем / без дисплея",
          "2": "От 10 до 20 входов/выходов",
          "3": "Напряжение питания =24DC / ~230AC",
          "4": "Транзисторные и релейные выходы на выбор"
        },
        "title": "Базовые модули"
      },
      "expansion": {
        "description": {
          "1": "Модули расширения для программируемого реле PRO-Relay EKF PROxima предназначены для увеличения количества точек ввода/вывода базового модуля. Позволяют подключать дискретные и аналоговые сигналы к процессорному модулю.",
          "2": "Не используются без базового модуля!"
        },
        "points": {
          "1": "Дискретные входы/выходы",
          "2": "Аналоговые входы/выходы",
          "3": "Температурные входы"
        },
        "title": "Модули расширения"
      },
      "interface": {
        "description": {
          "1": "Модули интерфейсные предназначены для подключения программируемого реле PRO-Relay EKF PROxima к распределенным системам управления и диспетчеризации. Модуль применяется только совместно с базовым модулем и НЕ функционирует отдельно."
        },
        "points": {
          "1": "RS-485 Modbus RTU",
          "2": "Ethernet Modbus TCP"
        },
        "title": "Интерфейсные модули"
      }
    },
    "pageTitle": "Программируемые реле PRO-Relay — EKF",
    "software": {
      "description": "Программное обеспечение PRO-design позволяет разрабатывать и отлаживать программы управления для программируемых реле PRO-Relay EKF PROXima. Включает средства программирования и отладки разрабатываемых программ на языках FBD (функциональные блок-схемы) и LD (лестничные диаграммы).",
      "title": "<span>Програмное обеспечение</span><small>PRO-design</small>"
    },
    "solutions": {
      "1": "Два ввода на одну секцию шин",
      "2": "Два ввода с секционированием",
      "3": "Два ввода с секционированием + ввод ДГУ",
      "4": "Три ввода на одну секцию шин",
      "ats": "Автоматический ввод резерва",
      "title": "Готовые решения АВР"
    },
    "submit": "Оставить заявку",
    "title": "Программируемые реле<br /><strong>PRO-Relay</strong>",
    "usage": {
      "ats": "Управление<br /> АВР",
      "escalator": "Управление<br /> эскалатором",
      "fan": "Управление<br /> вентиляцией",
      "lighting": "Управление<br /> освещением",
      "pump": "Управление<br /> насосами",
      "subtitle": "Автоматизация локальных технологических процессов",
      "title": "Основные сферы применения"
    }
  }
}
</i18n>
