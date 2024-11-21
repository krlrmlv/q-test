<template>
  <main class="page-landing page-landing-uzdp">
    <section class="section section-banner">
      <b-container class="h-100">
        <b-row class="h-100 align-items-md-center">
          <b-col sm="8" lg="6" xl="12">
            <div class="d-flex flex-column h-100">
              <h2 class="h1 text-accent" v-html="$t('banner.header1')"></h2>
              <h1 v-html="$t('banner.header2')"></h1>
              <p
                class="h1 text-gost mt-auto mb-0"
                v-html="$t('banner.header3')"
              ></p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section pb-0">
      <b-container>
        <h2
          class="text-uppercase text-md-right text-gray-600 mb-16 pb-16"
          v-html="$t('title.1')"
        ></h2>
        <b-row
          class="font-size-2 font-weight-medium row-protect text-center mx-n8 mb-24"
        >
          <b-col sm="6" lg="3" class="px-8 mb-24">
            <div
              class="d-flex align-items-center justify-content-center h-100 bg-gray-200 rounded-lg p-16 py-lg-24 px-xl-40"
              v-html="$t('text-cards.1')"
            ></div>
          </b-col>
          <b-col sm="6" lg="3" class="px-8 mb-24">
            <div
              class="d-flex align-items-center justify-content-center h-100 bg-gray-200 rounded-lg p-16 py-lg-24 px-xl-40"
              v-html="$t('text-cards.2')"
            ></div>
          </b-col>
          <b-col sm="6" lg="3" class="px-8 mb-24">
            <div
              class="d-flex align-items-center justify-content-center h-100 bg-gray-200 rounded-lg p-16 py-lg-24 px-xl-40"
              v-html="$t('text-cards.3')"
            ></div>
          </b-col>
          <b-col sm="6" lg="3" class="px-8 mb-24">
            <div
              class="d-flex align-items-center justify-content-center h-100 bg-gray-200 rounded-lg p-16 py-lg-24 px-xl-40"
              v-html="$t('text-cards.4')"
            ></div>
          </b-col>
        </b-row>
        <div class="text-sm-right">
          <b-button
            href="/catalog/avtomaticheskie-vykljuchateli-modulnye-i-dop-ustrojstva/ustroystva-zashchity-ot-dugovogo-proboya-uzdp"
            variant="primary"
            class="rounded px-24"
            v-html="$t('button-text')"
          >
          </b-button>
        </div>
      </b-container>
    </section>

    <section class="section pb-0">
      <b-container>
        <h2
          class="text-uppercase text-gray-600 mb-8"
          v-html="$t('title.2-1')"
        ></h2>
        <p class="h5 text-gray-600 mb-16 pb-16" v-html="$t('title.2-2')"></p>
        <b-row
          cols="2"
          cols-md="4"
          cols-lg="5"
          class="justify-content-center font-weight-medium text-center"
        >
          <b-col>
            <b-img-lazy
              src="/images/uzdp/breakdown-1.svg"
              class="img-fluid mb-16"
              alt="Ослабленный контакт"
            />
            <p class="mb-24" v-html="$t('reasons-images.1')"></p>
          </b-col>
          <b-col>
            <b-img-lazy
              src="/images/uzdp/breakdown-2.svg"
              class="img-fluid mb-16"
              alt="Механическое повреждение кабеля"
            />
            <p class="mb-24" v-html="$t('reasons-images.2')"></p>
          </b-col>
          <b-col>
            <b-img-lazy
              src="/images/uzdp/breakdown-3.svg"
              class="img-fluid mb-16"
              alt="Передавленный кабель"
            />
            <p class="mb-24" v-html="$t('reasons-images.3')"></p>
          </b-col>
          <b-col>
            <b-img-lazy
              src="/images/uzdp/breakdown-4.svg"
              class="img-fluid mb-16"
              alt="Неполноценный контакт"
            />
            <p class="mb-24" v-html="$t('reasons-images.4')"></p>
          </b-col>
          <b-col>
            <b-img-lazy
              src="/images/uzdp/breakdown-5.svg"
              class="img-fluid mb-16"
              alt="Повреждение грызунами"
            />
            <p class="mb-24" v-html="$t('reasons-images.5')"></p>
          </b-col>
          <b-col>
            <b-img-lazy
              src="/images/uzdp/breakdown-6.svg"
              class="img-fluid mb-16"
              alt="Механическое повреждение изоляции"
            />
            <p class="mb-24" v-html="$t('reasons-images.6')"></p>
          </b-col>
          <b-col>
            <b-img-lazy
              src="/images/uzdp/breakdown-7.svg"
              class="img-fluid mb-16"
              alt="Скрутка Al-Cu"
            />
            <p class="mb-24" v-html="$t('reasons-images.7')"></p>
          </b-col>
          <b-col>
            <b-img-lazy
              src="/images/uzdp/breakdown-8.svg"
              class="img-fluid mb-16"
              alt="Дефект кабеля"
            />
            <p class="mb-24" v-html="$t('reasons-images.8')"></p>
          </b-col>
          <b-col>
            <b-img-lazy
              src="/images/uzdp/breakdown-9.svg"
              class="img-fluid mb-16"
              alt="Повреждение или старение изоляции"
            />
            <p class="mb-24" v-html="$t('reasons-images.9')"></p>
          </b-col>
          <b-col>
            <b-img-lazy
              src="/images/uzdp/breakdown-10.svg"
              class="img-fluid mb-16"
              alt="Кабель с заниженным сечением"
            />
            <p class="mb-24" v-html="$t('reasons-images.10')"></p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-table">
      <b-container>
        <h2
          class="text-uppercase text-md-right text-gray-600 mb-8"
          v-html="$t('title.3-1')"
        ></h2>
        <p
          class="h5 text-md-right text-gray-600 mb-16 pb-16"
          v-html="$t('title.3-2')"
        ></p>

        <div class="table-responsive">
          <table class="table table-bordered">
            <thead class="bg-gray-400">
              <tr>
                <th
                  class="text-uppercase w-25"
                  v-html="$t('table.title.type')"
                ></th>
                <th
                  class="text-right w-25"
                  v-html="$t('table.title.auto')"
                ></th>
                <th class="text-right w-25" v-html="$t('table.title.uzo')"></th>
                <th
                  class="text-right w-25"
                  v-html="$t('table.title.uzdp')"
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-html="$t('table.1.type')"></td>
                <td
                  class="font-weight-medium text-right text-warning"
                  v-html="$t('table.1.auto')"
                ></td>
                <td
                  class="font-weight-medium text-right text-warning"
                  v-html="$t('table.1.uzo')"
                ></td>
                <td
                  class="font-weight-medium text-right text-success"
                  v-html="$t('table.1.uzdp')"
                ></td>
              </tr>
              <tr>
                <td v-html="$t('table.2.type')"></td>
                <td
                  class="font-weight-medium text-right text-warning"
                  v-html="$t('table.2.auto')"
                ></td>
                <td
                  class="font-weight-medium text-right text-danger"
                  v-html="$t('table.2.uzo')"
                ></td>
                <td
                  class="font-weight-medium text-right text-success"
                  v-html="$t('table.2.uzdp')"
                ></td>
              </tr>
              <tr>
                <td v-html="$t('table.3.type')"></td>
                <td
                  class="font-weight-medium text-right text-danger"
                  v-html="$t('table.3.auto')"
                ></td>
                <td
                  class="font-weight-medium text-right text-danger"
                  v-html="$t('table.3.uzo')"
                ></td>
                <td
                  class="font-weight-medium text-right text-success"
                  v-html="$t('table.3.uzdp')"
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-container>
    </section>

    <section class="section section-algorithm">
      <b-container class="section-bg">
        <b-row>
          <b-col xl="10" offset-xl="1">
            <b-row align-v="center">
              <b-col md="6" xl="5">
                <b-img-lazy
                  src="/images/uzdp/algorithm.jpg"
                  class="img-fluid"
                  alt="Алгоритм работы УЗДП"
                />
              </b-col>
              <b-col md="6" xl="7" class="py-16">
                <div class="font-weight-medium py-16">
                  <p
                    class="text-uppercase mb-24"
                    v-html="$t('algoritm.title')"
                  ></p>
                  <ul class="mb-0 pl-16">
                    <li class="mb-12" v-html="$t('algoritm.1')"></li>
                    <li class="mb-12" v-html="$t('algoritm.2')"></li>
                    <li class="mb-12" v-html="$t('algoritm.3')"></li>
                    <li class="mb-12" v-html="$t('algoritm.4')"></li>
                    <li v-html="$t('algoritm.5')"></li>
                  </ul>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2
          class="text-uppercase text-md-right text-gray-600 mb-24"
          v-html="$t('title.4')"
        ></h2>
        <ul class="mb-24 pl-16 d-md-none">
          <li v-html="$t('characteristics.1')"></li>
          <li v-html="$t('characteristics.2')"></li>
          <li v-html="$t('characteristics.3')"></li>
          <li v-html="$t('characteristics.4')"></li>
          <li v-html="$t('characteristics.5')"></li>
          <li v-html="$t('characteristics.6')"></li>
          <li v-html="$t('characteristics.7')"></li>
          <li v-html="$t('characteristics.8')"></li>
          <li v-html="$t('characteristics.9')"></li>
          <li v-html="$t('characteristics.10')"></li>
        </ul>
        <div class="d-none d-md-block">
          <b-img-lazy
            src="/images/uzdp/specs.svg"
            class="img-fluid mb-24"
            alt="Технические характеристики"
          />
        </div>
        <b-button
          href="/catalog/avtomaticheskie-vykljuchateli-modulnye-i-dop-ustrojstva/ustroystva-zashchity-ot-dugovogo-proboya-uzdp"
          variant="primary"
          class="rounded px-24"
          v-html="$t('button-text')"
        >
        </b-button>
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

<i18n>
{
  "en": {
    "algoritm": {
      "title": "The&nbsp;operation algorithm of&nbsp;the&nbsp;AFDD consists of&nbsp;constant monitoring of&nbsp;the&nbsp;sinusoid of&nbsp;the&nbsp;current and&nbsp;arc voltage with&nbsp;the&nbsp;help of&nbsp;a&nbsp;microcontroller:",
      "1": "arc identification",
      "2": "interference analysis",
      "3": "signal filtering",
      "4": "calculations of&nbsp;fine parameters of&nbsp;electrical signals",
      "5": "load disconnection"
    },
    "banner": {
      "header1": "100% protection of&nbsp;your home <br /> from&nbsp;fire",
      "header2": "AFDD PROxima arc fault protection device",
      "header3": "GOST 62606-2016"
    },
    "button-text": "Go to catalog",
    "characteristics": {
      "1": "Rated voltage&nbsp;– 230V",
      "2": "Rated operational current&nbsp;– (6), (10), 16, 20, 25, 32&nbsp;A",
      "3": "Rated network frequency&nbsp;– 50&nbsp;Hz",
      "4": "Time-current characteristic of&nbsp;tripping&nbsp;– (B), C",
      "5": "Rated impulse withstand voltage&nbsp;– 4&nbsp;kV",
      "6": "Ultimate switching capacity&nbsp;– 6000&nbsp;A",
      "7": "Top power connection",
      "8": "Connection cross section of&nbsp;a&nbsp;solid conductor&nbsp;– 1–25&nbsp;mm²",
      "9": "PIN/FORK bus connection",
      "10": "Limit operating temperature range from&nbsp;–25 to&nbsp;+40°С"
    },
    "pageTitle": "AFDD PROxima arc fault protection device from EKF",
    "reasons-images": {
      "1": "Loose contact",
      "2": "Mechanical damage to&nbsp;the&nbsp;cable",
      "3": "Squashed cable",
      "4": "Defective contact",
      "5": "Rodent damage",
      "6": "Mechanical damage to&nbsp;the&nbsp;insulation",
      "7": "Al-Cu twist",
      "8": "Cable defect",
      "9": "Insulation damage or&nbsp;aging",
      "10": "Undersized cable"
    },
    "table": {
      "title": {
        "type": "Spark type",
        "auto": "Circuit breaker",
        "uzo": "RCD",
        "uzdp": "AFDD"
      },
      "1": {
        "type": "Parallel arcing:<br /> phase-to-earth",
        "auto": "Will not work if I<sub>kz</sub> is insufficient",
        "uzo": "Will not work if I<sub>kz</sub> is insufficient",
        "uzdp": "Will break the&nbsp;circuit"
      },
      "2": {
        "type": "Parallel arcing:<br /> phase-neutral",
        "auto": "Will not work if I<sub>∆n</sub> is insufficient",
        "uzo": "Will not work",
        "uzdp": "Will break the&nbsp;circuit"
      },
      "3": {
        "type": "Sequential arcing<br /> (bad contact)",
        "auto": "Will not work",
        "uzo": "Will not work",
        "uzdp": "Will break the&nbsp;circuit"
      }
    },
    "text-cards": {
      "1": "Reducing the&nbsp;risk of&nbsp;fire under the&nbsp;influence of&nbsp;arc fault currents",
      "2": "Arc current detection and&nbsp;limitation for&nbsp;fire prevention",
      "3": "Protection against&nbsp;emergency short circuit overcurrents",
      "4": "Overcurrent&nbsp;protection"
    },
    "title": {
      "1": "AFDD PROxima EKF is designed for:",
      "2-1": "Causes of an arc fault",
      "2-2": "more than <span class=\"text-danger\">80% of fires</span> in living quarters occur due to arc fault",
      "3-1": "The third stage of protection",
      "3-2": "Circuit breakers and RCDs DO NOT PROTECT the electrical circuit from ARC FAULT",
      "4": "Specifications"
    }
  },
  "ru": {
    "algoritm": {
      "title": "Алгоритм работы УЗДП заключается в&nbsp;постоянном отслеживании синусоиды тока и&nbsp;напряжения дуги с&nbsp;помощью микроконтроллера:",
      "1": "идентификация дуги",
      "2": "анализа помех",
      "3": "фильтрации сигналов",
      "4": "вычислений тонких параметров электрических сигналов",
      "5": "отключение нагрузки"
    },
    "banner": {
      "header1": "100% защита Вашего жилища <br /> от&nbsp;пожара",
      "header2": "Устройство защиты от&nbsp;дугового пробоя УЗДП&nbsp;PROxima&nbsp;EKF",
      "header3": "ГОСТ 62606-2016"
    },
    "button-text": "В&nbsp;каталог",
    "characteristics": {
      "1": "Номинальное напряжение&nbsp;– 230В",
      "2": "Номинальный рабочий ток&nbsp;– (6), (10), 16, 20, 25, 32&nbsp;А",
      "3": "Номинальная частота сети&nbsp;– 50&nbsp;Гц",
      "4": "Время-токовая характеристика расцепления&nbsp;– (B), C",
      "5": "Номинальное выдерживаемое импульсное напряжение&nbsp;– 4&nbsp;кВ",
      "6": "Предельная коммутационная способность&nbsp;– 6000&nbsp;А",
      "7": "Подключение питания сверху",
      "8": "Поперечное сечение подключения однопроволочного (жесткого) провода&nbsp; – 1–25&nbsp;мм²",
      "9": "Подключение по&nbsp;шине PIN/FORK",
      "10": "Диапазон предельных рабочих температур от&nbsp;–25 до&nbsp;+40°С"
    },
    "pageTitle": "Устройство защиты от дугового пробоя УЗДП PROxima от компании EKF",
    "reasons-images": {
      "1": "Ослабленный контакт",
      "2": "Механическое повреждение кабеля",
      "3": "Передавленный кабель",
      "4": "Неполноценный контакт",
      "5": "Повреждение грызунами",
      "6": "Механическое повреждение изоляции",
      "7": "Скрутка Al-Cu",
      "8": "Дефект кабеля",
      "9": "Повреждение или&nbsp;старение изоляции",
      "10": "Кабель с&nbsp;заниженным сечением"
    },
    "table": {
      "title": {
        "type": "Тип искрения",
        "auto": "Автоматический выключатель",
        "uzo": "УЗО",
        "uzdp": "УЗДП"
      },
      "1": {
        "type": "Параллельное искрение:<br /> фаза-земля",
        "auto": "Не&nbsp;сработает при&nbsp;недостаточном&nbsp;I<sub>кз</sub>",
        "uzo": "Не&nbsp;сработает при&nbsp;недостаточном&nbsp;I<sub>кз</sub>",
        "uzdp": "Разомкнет электрическую&nbsp;цепь"
      },
      "2": {
        "type": "Параллельное искрение:<br /> фаза-нейтраль",
        "auto": "Не&nbsp;сработает при&nbsp;недостаточном&nbsp;I<sub>∆n</sub>",
        "uzo": "Не&nbsp;сработает",
        "uzdp": "Разомкнет электрическую&nbsp;цепь"
      },
      "3": {
        "type": "Последовательное искрение<br /> (плохой контакт)",
        "auto": "Не&nbsp;сработает",
        "uzo": "Не&nbsp;сработает",
        "uzdp": "Разомкнет электрическую&nbsp;цепь"
      }
    },
    "title": {
      "1": "УЗДП PROxima EKF предназначен для:",
      "2-1": "Причины возникновения дугового пробоя",
      "2-2": "более <span class=\"text-danger\">80% пожаров</span> в&nbsp;жилых помещениях возникают из-за&nbsp;дугового пробоя",
      "3-1": "Третий этап защиты",
      "3-2": "АВ и УЗО НЕ ЗАЩИЩАЮТ электрическую цепь от ДУГОВОГО ПРОБОЯ",
      "4": "Технические характеристики"
    },
    "text-cards": {
      "1": "Снижения риска возгорания под&nbsp;воздействием токов дугового замыкания",
      "2": "Обнаружения и&nbsp;ограничения тока дуги для&nbsp;предупреждения пожара",
      "3": "Защиты от&nbsp;аварийных сверхтоков короткого замыкания",
      "4": "Защиты от&nbsp;токов перегрузки"
    }
  }
}
</i18n>

<style lang="scss">
.page-landing-uzdp {
  line-height: 1.2;

  .section {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;

    &.section-banner {
      height: 475px;
      color: $white;
      background-color: #8eadca;
      background-image: url('/images/uzdp/banner-bg-sm.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      h1,
      .h1 {
        font-size: 1.375rem;
        text-transform: uppercase;
      }

      .text-accent {
        color: darken($primary, 10%);
      }

      .text-gost {
        color: #3471a9;
      }
    }

    &.section-table {
      .table {
        thead {
          th {
            border-bottom-width: 1px;
          }
        }

        th,
        td {
          vertical-align: middle;
        }

        .text-warning {
          font-size: 0.9em;
          color: #dea000 !important;
        }

        .text-danger {
          font-size: 0.9em;
          color: #a70a00 !important;
        }

        .text-success {
          font-size: 0.9em;
          color: #3d8202 !important;
        }
      }
    }

    &.section-algorithm {
      padding-top: 0;
      padding-bottom: 0;

      .section-bg {
        color: $white;
        background-color: #8cabc8;
      }
    }
  }

  @include media-breakpoint-up(sm) {
    .section {
      &.section-banner {
        padding-top: 3rem;
        padding-bottom: 3rem;

        h1,
        .h1 {
          font-size: 1.75rem;
        }
      }
    }
  }

  @include media-breakpoint-up(md) {
    .section {
      &.section-banner {
        background-image: url('/images/uzdp/banner-bg-md.jpg');
      }
    }
  }

  @include media-breakpoint-up(lg) {
    font-size: $font-size-4;

    .section {
      .row-protect {
        font-size: $font-size-3;
      }
      &.section-banner {
        h1,
        .h1 {
          margin-bottom: 2rem;
          font-size: 1.875rem;
        }
      }

      &.section-table {
        .table {
          th {
            padding: 0.625rem 1.5rem;
          }

          td {
            padding: 1.125rem 1.5rem;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    .section {
      padding-top: 3rem;
      padding-bottom: 3rem;

      &.section-banner {
        h1,
        .h1 {
          max-width: 600px;
          font-size: 2.125rem;
        }
      }
    }
  }

  @media (min-width: 1600px) {
    .section {
      &.section-banner {
        text-align: center;
        background-image: url('/images/uzdp/banner-bg.jpg');

        h1,
        .h1 {
          max-width: 860px;
          margin-right: auto;
          margin-left: auto;
        }
      }
    }
  }
}
</style>
