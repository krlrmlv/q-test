<template>
  <main class="page-landing-datacenter pb-32 pb-lg-64">
    <section class="section section-banner">
      <b-container>
        <b-row>
          <b-col md="9" lg="7" xl="6">
            <h1 class="mb-48 pb-lg-24">{{ $t('title') }}</h1>
            <b-button
              :to="{ hash: '#feedback-form' }"
              variant="white"
              size="sm"
            >
              {{ $t('submit') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section text-center pb-0">
      <b-container>
        <b-row>
          <b-col md="4">
            <h5 class="text-uppercase">{{ $t('advantages.safety.title') }}</h5>
            <p class="mb-24">{{ $t('advantages.safety.description') }}</p>
          </b-col>
          <b-col md="4">
            <h5 class="text-uppercase">
              {{ $t('advantages.stability.title') }}
            </h5>
            <p class="mb-8">{{ $t('advantages.stability.description.p1') }}</p>
            <ul class="list-unstyled mb-8">
              <li>{{ $t('advantages.stability.description.li1') }}</li>
              <li>{{ $t('advantages.stability.description.li2') }}</li>
              <li>{{ $t('advantages.stability.description.li3') }}</li>
            </ul>
            <p class="mb-24">{{ $t('advantages.stability.description.p2') }}</p>
          </b-col>
          <b-col md="4">
            <h5 class="text-uppercase">
              {{ $t('advantages.perspective.title') }}
            </h5>
            <p class="mb-24">{{ $t('advantages.perspective.description') }}</p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2 class="h3 text-center mb-24" v-html="$t('accessories.title')"></h2>
        <b-row class="d-none d-md-flex mb-24">
          <b-col
            v-for="(toggle, toggleIndex) in accessories"
            :key="`toggle-${toggleIndex}`"
            sm="6"
            lg="3"
            class="mb-16"
          >
            <b-link
              :class="{ active: tabIndex === toggleIndex }"
              class="card card-datacenter-toggle"
              @click="toggleTab(toggleIndex)"
            >
              <b-img-lazy
                :alt="$t(`accessories.${toggle.key}.title`)"
                :src="`/images/datacenter/${toggle.image}`"
                class="card-img d-none d-lg-block"
              />
              <div class="card-body">
                <h6
                  class="
                    h7
                    flex-grow-1 flex-lg-grow-0
                    text-center text-lg-left
                    mb-0 mb-lg-24
                  "
                >
                  {{ $t(`accessories.${toggle.key}.title`) }}
                </h6>
                <p class="d-none d-lg-block mb-24">
                  {{ $t(`accessories.${toggle.key}.description`) }}
                </p>
                <span
                  class="
                    d-flex
                    rounded-pill
                    text-dark
                    border border-dark
                    ml-8 ml-lg-0
                    mr-lg-auto
                    mt-lg-auto
                    p-2
                  "
                >
                  <svg-icon
                    name="arrow-down-24"
                    width="24"
                    height="24"
                    class="icon-toggle d-none d-lg-inline"
                    aria-hidden="true"
                  />
                  <svg-icon
                    name="arrow-right-16"
                    width="16"
                    height="16"
                    class="icon-toggle d-lg-none"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </b-link>
          </b-col>
        </b-row>

        <div
          v-for="(accessory, index) in accessories"
          :key="`accessory-${index}`"
          class="mb-16"
        >
          <b-link
            :class="{ active: tabIndex === index }"
            class="card card-datacenter-toggle d-md-none"
            @click="toggleTab(index)"
          >
            <div class="card-body">
              <h6 class="h7 flex-fill text-center mb-0">
                {{ $t(`accessories.${accessory.key}.title`) }}
              </h6>
              <span
                class="
                  d-flex
                  rounded-pill
                  text-dark
                  border border-dark
                  ml-8
                  p-2
                "
              >
                <svg-icon
                  name="arrow-right-16"
                  width="16"
                  height="16"
                  class="icon-toggle"
                  aria-hidden="true"
                />
              </span>
            </div>
          </b-link>
          <div class="mx-n12">
            <b-collapse :visible="tabIndex === index">
              <div class="px-12 pt-16 pt-md-0">
                <b-row>
                  <b-col sm="6" lg="3" class="mb-16">
                    <div class="card card-datacenter-solution">
                      <b-img-lazy
                        :src="`/images/datacenter/${accessory.image}`"
                        :alt="$t(`accessories.${accessory.key}.title`)"
                        class="card-img d-lg-none"
                      />
                      <div class="card-body">
                        <h6 class="h7 d-none d-sm-block">
                          {{ $t(`accessories.${accessory.key}.title`) }}
                        </h6>
                        <p class="d-lg-none">
                          {{ $t(`accessories.${accessory.key}.description`) }}
                        </p>
                        <ul class="pl-16">
                          <li
                            v-for="advantage in accessory.advantages"
                            :key="`advantage-${accessory.key}-${advantage}`"
                            class="mb-16"
                          >
                            {{
                              $t(
                                `accessories.${accessory.key}.advantages.${advantage}`
                              )
                            }}
                          </li>
                        </ul>
                      </div>
                      <div class="card-footer">
                        <b-button
                          :to="localePath(accessory.link)"
                          variant="dark"
                          size="sm"
                        >
                          {{ $t('catalog.goToCatalog') }}
                        </b-button>
                      </div>
                    </div>
                  </b-col>
                  <b-col
                    v-if="accessory.items && accessory.items.length"
                    sm="6"
                    lg="9"
                    class="mb-16"
                  >
                    <b-row
                      :cols-lg="accessory.columns"
                      :cols-xl="accessory.columns"
                      cols="2"
                      cols-sm="2"
                      cols-md="2"
                    >
                      <b-col
                        v-for="item in accessory.items"
                        :key="`item-${accessory.key}-${item.key}`"
                        class="mb-24"
                      >
                        <b-link
                          :to="localePath(item.link)"
                          class="card card-datacenter-product"
                        >
                          <b-img-lazy
                            :src="`/images/datacenter/${item.image}`"
                            :alt="
                              $t(
                                `accessories.${accessory.key}.items.${item.key}`
                              )
                            "
                            class="card-img"
                          />
                          <p class="card-body">
                            {{
                              $t(
                                `accessories.${accessory.key}.items.${item.key}`
                              )
                            }}
                          </p>
                        </b-link>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col
                    v-else
                    sm="6"
                    lg="9"
                    class="text-center d-none d-lg-block mb-16"
                  >
                    <b-img-lazy
                      :src="`/images/datacenter/${accessory.imageMain}`"
                      :alt="$t(`accessories.${accessory.key}.title`)"
                      class="img-fluid"
                    />
                  </b-col>
                </b-row>
              </div>
            </b-collapse>
          </div>
        </div>
      </b-container>
    </section>
    <section class="section">
      <a id="feedback-form" class="anchor"></a>
      <b-container>
        <b-row>
          <b-col lg="10" xl="8" offset-lg="1" offset-xl="2">
            <FormFeedback />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
import { BImgLazy, BCollapse } from 'bootstrap-vue'

export default {
  components: {
    BImgLazy,
    BCollapse,
  },
  data() {
    return {
      accessories: [
        {
          key: 'trivia',
          image: 'trivia-power.jpg',
          link: '/catalog',
          columns: 3,
          advantages: [
            'assembly',
            'frame',
            'solutions',
            'convenience',
            'price',
          ],
          items: [
            {
              key: 'shell',
              image: 'trivia-power-shell.jpg',
              link: '/catalog/funkcionalnye-obolochki-av-trivia',
            },
            {
              key: 'airSwitch',
              image: 'trivia-power-switch-air.jpg',
              link: '/catalog/avtomaticheskie-vyklyuchateli-vozdushnye',
            },
            {
              key: 'moldedSwitch',
              image: 'trivia-power-switch-molded.jpg',
              link: '/catalog/avtomaticheskie-vyklyuchateli-v-litom-korpuse',
            },
            {
              key: 'trigger',
              image: 'trivia-power-breaker.jpg',
              link: '/catalog/vyklyuchateli-razediniteli-rubilniki-twinblock-do-1600a-ekf-proxima',
            },
            {
              key: 'controller',
              image: 'trivia-power-controller.jpg',
              link: '/catalog/kontrollery-avr',
            },
            {
              key: 'relay',
              image: 'trivia-power-prorelay.jpg',
              link: '/catalog/programmiruemye-rele-ekf-proxima',
            },
          ],
        },
        {
          key: 'converter',
          image: 'frequency-converters.jpg',
          imageMain: 'frequency-converters-big.jpg',
          link: '/catalog/preobrazovateli-chastoty',
          advantages: ['warranty', 'stock', 'economy', 'support', 'training'],
        },
        {
          key: 'stand',
          image: 'power-stand.jpg',
          link: '/catalog',
          columns: 4,
          advantages: [
            'accessories',
            'averes',
            'measuring',
            'monitoring',
            'qualityData',
          ],
          items: [
            {
              key: 'fort',
              image: 'stand-shell.jpg',
              link: '/catalog/shkafy-fort-na-4000a',
            },
            {
              key: 'moldedSwitch',
              image: 'stand-switch-molded.jpg',
              link: '/catalog/vyklyuchateli-silovye-do-1600a-av-power-ekf-averes',
            },
            {
              key: 'modularSwitch',
              image: 'stand-switch-modular.jpg',
              link: '/catalog/avtomaticheskie-vyklyuchateli-modulnye-i-dop-ustrojstva',
            },
            {
              key: 'measuring',
              image: 'stand-measuring.jpg',
              link: '/catalog/mnogofunkcionalnye-izmeriteli',
            },
          ],
        },
        {
          key: 'hyperion',
          image: 'hyperion.jpg',
          imageMain: 'hyperion-big.jpg',
          link: '/catalog/shinoprovod-magistralnyj-hyperion',
          advantages: [
            'design',
            'assembly',
            'service',
            'placement',
            'durability',
            'safety',
            'lowRadiation',
          ],
        },
      ],
      tabIndex: 0,
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
  methods: {
    toggleTab(index) {
      if (this.tabIndex !== index) this.tabIndex = index
      else this.tabIndex = -1
    },
  },
}
</script>

<style lang="scss">
.page-landing-datacenter {
  font-size: $font-size-2;
  line-height: 1.2;

  .section {
    padding-top: 2rem;
    padding-bottom: 2rem;

    &.section-banner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 240px;
      color: $white;
      background-color: #1b3949;
      background-image: url('/images/datacenter/banner-bg-sm.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      .banner-header {
        margin-bottom: 3rem;
      }

      .banner-link {
        padding-left: 1rem;
        padding-right: 1rem;
        transition: $transition-base;

        &:not(:disabled):not(.disabled) {
          &:hover {
            border-color: #abd7de;
            background-color: #abd7de;
          }
        }
      }
    }
  }

  .card {
    text-decoration: none;
    color: inherit;

    &:hover {
      text-decoration: none;
      color: inherit;
    }

    &.card-datacenter-toggle {
      border: 1px solid $gray-500;
      transition: $transition-base;

      .card-body {
        display: flex;
        align-items: center;
        min-height: 3rem;
        padding: 0.5rem 0.75rem;
      }

      .icon-toggle {
        flex: 0 0 auto;
        transform: rotate(0);
        transition: $transition-base;
      }

      &:hover {
        text-decoration: none;
        color: inherit;
        border-color: $gray-600;
        background-color: $gray-100;
      }

      &.active {
        border-color: $gray-700;
        background-color: $gray-200;

        .icon-toggle {
          transform: rotate(90deg);
        }
      }
    }

    &.card-datacenter-solution {
      height: 100%;
      background-color: #fbfbfb;
      box-shadow: $box-shadow-sm;

      .card-body {
        padding: 1rem;
      }

      .card-footer {
        display: flex;
        flex-direction: column;
        padding: 0 1rem 1rem;
        background-color: transparent;
      }
    }

    &.card-datacenter-product {
      display: block;

      .card-img {
        width: auto;
        max-width: 100%;
        height: auto;
        border: 1px solid $gray-300;
      }

      .card-body {
        margin: 0;
        padding: 0.75rem 0 0;
        font-size: $font-size-1;
        font-weight: $font-weight-bold;
        text-decoration: underline;
      }

      &:hover {
        color: $primary;
      }
    }
  }

  @include media-breakpoint-up(sm) {
    .card {
      &.card-datacenter-toggle {
        height: 100%;
      }

      &.card-datacenter-solution {
        .card-footer {
          align-items: flex-start;

          .btn {
            min-width: 9.5rem;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      padding-top: 3rem;
      padding-bottom: 3rem;

      &.section-banner {
        min-height: 440px;
        background-image: url('/images/datacenter/banner-bg.jpg');

        .banner-header {
          margin-bottom: 4.5rem;
        }
      }
    }

    .card {
      &.card-datacenter-toggle {
        border: none;
        background-color: #fbfbfb;
        box-shadow: $box-shadow-sm;

        .card-body {
          flex-direction: column;
          align-items: stretch;
          padding: 1rem;
        }

        .icon-toggle {
          margin-left: 0;
        }

        &:hover {
          background-color: #fbfbfb;
          box-shadow: $box-shadow;
        }

        &.active {
          background-color: #fbfbfb;
          box-shadow: $box-shadow;

          .icon-toggle {
            transform: rotate(-180deg);
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
    "accessories": {
      "title": "Accessories for data centers",
      "converter": {
        "advantages": {
          "economy": "Electricity savings up to 50%",
          "stock": "Always in stock",
          "support": "Full information and technical support",
          "training": "Regular customer training",
          "warranty": "3 years warranty"
        },
        "description": "Applying frequency converters in ventilation and air conditioning systems, you save a significant part of the electricity consumed by the data center.",
        "title": "Frequency converters"
      },
      "hyperion": {
        "advantages": {
          "assembly": "Fast to assemble",
          "design": "Easy to design",
          "durability": "Durability",
          "lowRadiation": "Low electromagnetic radiation",
          "placement": "Compact layout",
          "safety": "Fire safety",
          "service": "Easy to maintain"
        },
        "description": "Hundreds of successfully implemented projects in various industries of the Russian Federation and the CIS countries.",
        "title": "Hyperion bus system"
      },
      "stand": {
        "advantages": {
          "accessories": "Protective AVERES equipment with increased technical characteristics",
          "averes": "AVERES – 10 years warranty",
          "measuring": "Multifunctional measuring instruments to optimize the operation of the data center",
          "monitoring": "Remote monitoring (Modbus RTU, LORA)",
          "qualityData": "Archiving data on the power supply network state"
        },
        "description": "Secondary power distribution system with continuous electricity quality control.",
        "items": {
          "fort": "FORT series floor shells",
          "measuring": "Multifunctional meters",
          "modularSwitch": "AVERES modular automatic switches",
          "moldedSwitch": "AV Power AVERES molded case automatic switches"
        },
        "title": "Power distribution rack with electricity quality control"
      },
      "trivia": {
        "advantages": {
          "assembly": "Fast to assemble",
          "convenience": "Convenience and safety of operation",
          "frame": "Hard frame",
          "price": "Competitive price",
          "solutions": "Ready-made solutions"
        },
        "description": "Provides power distribution and automatically enables the reserve during an accident.",
        "items": {
          "airSwitch": "Air switches",
          "controller": "ATS controllers",
          "moldedSwitch": "Molded case switches",
          "relay": "PRO-Relay",
          "shell": "AV Trivia shells",
          "trigger": "Breakers"
        },
        "title": "Trivia Power"
      }
    },
    "advantages": {
      "perspective": {
        "description": "EKF components allow you to expand the capabilities of the data centers through the use of the Hyperion busbar, the modular design of the shells, devices for protection for load currents up to 6,300 amps.",
        "title": "Perspective"
      },
      "safety": {
        "description": "Use of the AVERES premium series protection devices and the Trivia series shells ensures the safety of data processing centers, reliably protecting them from the encroachment of unauthorized persons, and the equipment itself from accidents and fires due to electrical wiring faults.",
        "title": "Safety"
      },
      "stability": {
        "description": {
          "li1": "– remote control of the power supply quality;",
          "li2": "– automatic ventilation control;",
          "li3": "– a convenient system of cassette filters.",
          "p1": "EKF solutions help set:",
          "p2": "All this ensures uninterrupted operation of the data center, preventing the risks of emergency situations and equipment failures."
        },
        "title": "Stability"
      }
    },
    "pageTitle": "Solutions for data centers — EKF",
    "submit": "Submit an application",
    "title": "Solutions for data centers"
  },
  "ru": {
    "accessories": {
      "title": "Комплектующие для&nbsp;центров<br /> обработки данных",
      "converter": {
        "advantages": {
          "economy": "Экономия электроэнергии до 50%",
          "stock": "Всегда на складе",
          "support": "Полная информационная и техническая поддержка",
          "training": "Регулярные обучения клиентов",
          "warranty": "Гарантия 3 года"
        },
        "description": "Применяя преобразователи частоты Vector в системах вентиляции и кондиционирования, Вы экономите значительную часть электроэнергии, потребляемой ЦОД.",
        "title": "Преобразователи частоты"
      },
      "hyperion": {
        "advantages": {
          "assembly": "Быстро монтировать",
          "design": "Легко проектировать",
          "durability": "Долговечность",
          "lowRadiation": "Низкое электромагнитное излучение",
          "placement": "Компактность размещения",
          "safety": "Пожарная безопасность",
          "service": "Просто обслуживать"
        },
        "description": "Сотни успешно реализованных проектов в различных отраслях промышленности РФ и стран СНГ.",
        "title": "Система шинопровода Hyperion"
      },
      "stand": {
        "advantages": {
          "accessories": "Защитная аппаратура с повышенными техническими характеристиками AVERES",
          "averes": "AVERES – гарантия 10 лет",
          "measuring": "Многофункциональные измерительные приборы для оптимизации работы ЦОД",
          "monitoring": "Удаленный мониторинг (Modbus RTU, LORA)",
          "qualityData": "Архивирование данных о состоянии питающей сети"
        },
        "description": "Вторичная система распределения питания с непрерывным контролем качества электроэнергии.",
        "items": {
          "fort": "Напольные оболочки серии «FORT»",
          "measuring": "Многофункциональные измерители",
          "modularSwitch": "Модульные автоматические выключатели AVERES",
          "moldedSwitch": "Автоматические выключатели в литом корпусе AV Power AVERES"
        },
        "title": "Стойка распределения питания с контролем качества электричества"
      },
      "trivia": {
        "advantages": {
          "assembly": "Быстрая сборка",
          "convenience": "Удобство и безопасность эксплуатации",
          "frame": "Жесткий каркас",
          "price": "Конкурентная цена",
          "solutions": "Готовые решения"
        },
        "description": "Обеспечивает распределение питания и автоматически вводит резерв при аварии.",
        "items": {
          "airSwitch": "Выключатели воздушные",
          "controller": "Контроллеры АВР",
          "moldedSwitch": "Выключатели в литом корпусе",
          "relay": "PRO-Relay",
          "shell": "Оболочки AV Trivia",
          "trigger": "Рубильники"
        },
        "title": "Trivia Power"
      }
    },
    "advantages": {
      "perspective": {
        "description": "Комплектующие EKF позволяют расширить возможности работы центров обработки данных благодаря использованию шинопровода Hyperion, модульной конструкции оболочек, аппаратов защиты на токи нагрузки до 6300 ампер.",
        "title": "Перспективность"
      },
      "safety": {
        "description": "Использование аппаратов защиты премиальной серии AVERES и оболочек серии Trivia обеспечивает безопасность центров обработки данных, надежно защищая их от посягательства посторонних лиц, а само оборудование – от аварий и возникновения пожаров вследствие неисправности электропроводки.",
        "title": "Безопасность"
      },
      "stability": {
        "description": {
          "li1": "– удаленный контроль за показателями качества электропитания;",
          "li2": "– автоматическое управление вентиляцией;",
          "li3": "– удобную систему кассетных фильтров.",
          "p1": "Решения EKF помогают установить:",
          "p2": "Все это обеспечивает бесперебойную работу ЦОД, предотвращая риски аварийных ситуаций и выхода оборудования из строя."
        },
        "title": "Бесперебойность"
      }
    },
    "pageTitle":  "Решения для центров обработки данных — EKF",
    "submit": "Оставить заявку",
    "title":  "Решения для центров обработки данных"
  }
}
</i18n>
