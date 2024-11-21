<template>
  <main class="page-landing-tline pb-32 pb-lg-64">
    <section class="section section-banner">
      <b-container>
        <b-row class="banner-top">
          <b-col md="6" xl="5">
            <h1 class="banner-header" v-html="$t('title')"></h1>
            <p class="banner-subheader" v-html="$t('subtitle')"></p>
          </b-col>
        </b-row>
        <b-row class="mb-8 my-lg-40">
          <b-col sm="6" md="4" lg="3" xl="auto" class="mb-16">
            <b-button
              :to="{ hash: '#feedback-form' }"
              variant="primary"
              class="rounded"
              block
            >
              {{ $t('submit') }}
            </b-button>
          </b-col>
          <b-col sm="6" md="4" lg="3" xl="auto" class="mb-16">
            <b-button
              :to="localePath(catalogLink)"
              variant="primary"
              class="rounded"
              block
            >
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="8" lg="6">
            <p class="lead mb-32" v-html="$t('lead')"></p>
            <b-link
              href="https://ekfgroup.com/uploads/landing/tline-okl-cert.pdf"
              target="_blank"
              class="d-flex align-items-center text-reset text-decoration-none"
            >
              <div class="align-self-start mr-16">
                <img
                  :alt="$t('okl.alt')"
                  src="/images/t-line/okl-logo.png"
                  width="60"
                />
              </div>
              <p class="h5 text-uppercase mb-0" v-html="$t('okl.title')"></p>
            </b-link>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2 class="text-right" v-html="$t('features.title')"></h2>
        <div class="text-center d-md-none">
          <b-img-lazy
            :alt="$t('features.alt')"
            src="/images/t-line/features-sm.jpg"
            class="img-fluid mb-24"
          />
          <ul class="list-unstyled list-features">
            <li
              v-for="i in 5"
              :key="`feature-${i}`"
              v-html="$t(`features.${i}`)"
            ></li>
          </ul>
        </div>
        <b-img-lazy
          :alt="$t('features.alt')"
          :src="$t('features.image')"
          class="img-fluid d-none d-md-block"
        />
      </b-container>
    </section>

    <section class="section section-specs">
      <b-container>
        <b-row>
          <b-col xl="10" offset-xl="1">
            <h2>{{ $t('specs.title') }}</h2>
            <ul class="list-unstyled row mb-24">
              <li
                v-for="i in 8"
                :key="`spec-${i}`"
                class="col-sm-6 col-lg-3 mb-24"
              >
                <p class="specs-item" v-html="$t(`specs.${i}`)"></p>
              </li>
            </ul>
            <p><sup>* </sup><span v-html="$t('specs.footnote')"></span></p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-products">
      <b-container>
        <b-row>
          <b-col xl="10" offset-xl="1">
            <h2 class="text-right" v-html="$t('accessories.title')"></h2>

            <b-row
              v-for="(item, index) in accessories"
              :key="`accessories-${item.key}`"
              class="mb-24 mb-lg-40"
            >
              <b-col
                :order-md="index % 2 !== 0 ? 2 : null"
                md="6"
                xl="5"
                class="mb-24"
              >
                <b-img-lazy
                  :alt="$t(`accessories.${item.key}.title`)"
                  :src="`/images/t-line/${item.image}`"
                  class="img-fluid"
                />
              </b-col>
              <b-col
                :order-md="index % 2 !== 0 ? 1 : null"
                md="6"
                xl="7"
                class="mb-24"
              >
                <p
                  class="fs-5 font-weight-bold mb-24"
                  v-html="$t(`accessories.${item.key}.title`)"
                ></p>
                <p
                  class="mb-24"
                  v-html="$t(`accessories.${item.key}.description`)"
                ></p>
                <b-button
                  :to="localePath(item.link)"
                  variant="primary"
                  class="rounded"
                >
                  {{ $t('catalog.goToCatalog') }}
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-production">
      <b-container>
        <b-row>
          <b-col xl="10" offset-xl="1">
            <h2 class="section-header" v-html="$t('production.title')"></h2>
            <p v-html="$t('production.description')"></p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-feedback">
      <a id="feedback-form" class="anchor"></a>
      <b-container>
        <b-row>
          <b-col lg="10" xl="8" offset-lg="1" offset-xl="2">
            <FormFeedback :mindbox-custom-fields="mindboxCustomFields" />
          </b-col>
        </b-row>
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
      catalogLink: '/catalog/lotki-i-montazhnye-elementy',
      accessories: [
        {
          key: 'trayPerforated',
          image: 'assortment-1.jpg',
          link: '/catalog/lotki-perforirovannye-t-line-ekf',
        },
        {
          key: 'trayNonPerforated',
          image: 'assortment-2.jpg',
          link: '/catalog/lotki-neperforirovannye-t-line-ekf',
        },
        {
          key: 'covers',
          image: 'assortment-3.jpg',
          link: '/catalog/kryshki-dlya-metallicheskogo-lotka-ekf',
        },
        {
          key: 'accessories',
          image: 'assortment-4.jpg',
          link:
            '/catalog/lotki-listovye-t-line?filters={"9dbfb747-992e-11eb-a21c-00155d007700"%3A[' +
            '"Фланец соединительный","Угол горизонтальный","Угол 90° горизонтальный",' +
            '"Угол 90° вертикальный внутренний","Угол 90° вертикальный внешний",' +
            '"Угол 45° горизонтальный","Угол 45° вертикальный внутренний",' +
            '"Угол 45° вертикальный внешний","Пластина","Переходник по высоте","Перегородка",' +
            '"Ответвитель т-образный",' +
            '"Ответвитель накладной т-образный","Ответвитель крестообразный",' +
            '"Накладка","Комплект","Держатель"]}',
        },
        {
          key: 'hardware',
          image: 'assortment-5.jpg',
          link: '/catalog/krepezh-i-metizy-mf-line-ekf',
        },
        {
          key: 'suspension',
          image: 'assortment-6.jpg',
          link: '/catalog/sistema-podvesov-h-line-ekf',
        },
        {
          key: 'strut',
          image: 'assortment-7.jpg',
          link: '/catalog/strut-sistema-s-line-ekf',
        },
      ],
      mindboxCustomFields: {
        formName: 'Оставить заявку - форма в баннере',
        EKFFormID: 'ostavit_zayavku_forma_v_bannere',
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
}
</script>

<style lang="scss">
.page-landing-tline {
  line-height: 1.2;
  color: $white;
  background-color: #060a22;
  background-image: url('/images/t-line/bg.svg');
  background-position: -300px 940px;
  background-repeat: no-repeat;
  background-size: auto;

  h2,
  .h2 {
    margin-bottom: 2rem;
    font-size: 1.875rem;
  }

  .btn {
    min-width: 9rem;
  }

  .list-features {
    font-size: $font-size-5;
    font-weight: $font-weight-medium;
    margin-bottom: 0;

    & > li {
      position: relative;
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;

      &:not(:last-of-type) {
        &::after {
          display: block;
          content: '';
          position: absolute;
          left: 35%;
          right: 35%;
          bottom: 0;
          height: 1px;
          background-color: $primary;
        }
      }
    }
  }

  .section {
    padding-top: 1rem;
    padding-bottom: 1rem;

    &.section-banner {
      padding-top: 0;
      background-image: url('/images/t-line/banner-bg-xs.jpg');
      background-position: right -320px top -20px;
      background-repeat: no-repeat;
      background-size: auto;

      .banner-top {
        height: 400px;
        margin-bottom: 1rem;
        padding-top: 2rem;
      }

      .banner-header {
        font-size: 2.875rem;
      }

      .banner-subheader {
        font-size: $font-size-4;
        font-weight: $font-weight-medium;
      }
    }

    &.section-specs {
      .specs-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-height: 9rem;
        max-width: 250px;
        margin: 0 auto;
        padding: 1.5rem;
        font-size: $font-size-4;
        font-weight: $font-weight-medium;
        text-align: center;
        border: 2px solid $white;
        box-shadow: 0 0.25rem 1.25rem rgba($white, 0.5),
          inset 0 0 0.25rem rgba($white, 0.25);
      }
    }

    &.section-products {
      font-size: $font-size-4;
    }

    &.section-production {
      padding-top: 0;
      font-size: $font-size-4;
      font-weight: $font-weight-medium;
      background-image: url('/images/t-line/production-bg-xs.jpg');
      background-position: center top;
      background-repeat: no-repeat;
      background-size: auto;

      .section-header {
        min-height: 230px;
        padding-top: 1rem;
      }
    }

    &.section-feedback {
      color: $body-color;
      background-color: $body-bg;
    }
  }

  @include media-breakpoint-up(md) {
    h2,
    .h2 {
      font-size: 2.75rem;
    }

    .section {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;

      &.section-banner {
        .banner-top {
          height: auto;
        }
      }

      &.section-production {
        padding-top: 1.5rem;
        background-image: url('/images/t-line/production-bg-md.jpg');
        background-size: cover;

        .section-header {
          min-height: 0;
          padding-top: 0;
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      padding-top: 2.5rem;
      padding-bottom: 2.5rem;

      &.section-banner {
        height: 850px;
        background-image: url('/images/t-line/banner-bg.jpg');
        background-position: right -750px top -20px;
        background-repeat: no-repeat;
        background-size: auto;

        .banner-top {
          padding-top: 4rem;
        }

        .banner-header {
          margin-bottom: 2rem;
          font-size: 5.75rem;
          line-height: 1.1;

          strong {
            font-size: 1.5em;
            text-transform: lowercase;
          }
        }

        .banner-subheader {
          font-size: 1.5rem;
        }
      }

      &.section-specs {
        background-image: url('/images/t-line/specs-bg.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: map-get($container-max-widths, 'lg') auto;
      }

      &.section-products {
        font-size: $font-size-5;
      }

      &.section-production {
        padding-top: 2.5rem;
        font-size: $font-size-5;
      }
    }
  }

  @include media-breakpoint-up(xl) {
    h2,
    .h2 {
      font-size: 3.875rem;
    }

    .section {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;

      &.section-banner {
        background-position: right -500px top -20px;
      }

      &.section-specs {
        background-size: map-get($container-max-widths, 'xl') auto;
      }

      &.section-production {
        min-height: 580px;
        padding-top: 3.75rem;
        font-size: $font-size-6;

        .section-header {
          margin-bottom: 3.75rem;
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
      "accessories": {
        "description": "The EKF accessory system for metal trays is specially designed to provide builders and installers with the necessary set of transitions, couplers, flanges, plates, etc. to organize a full-fledged tray track. The entire range of articles is designed taking into account the design features of EKF metal trays.",
        "title": "Tray accessories"
      },
      "covers": {
        "description": "The standard safety edge metal tray covers are suitable for both perforated and non-perforated trays, as well as a range of competitors' trays.",
        "title": "Covers for&nbsp;metal trays"
      },
      "hardware": {
        "description": "A wide range of fasteners allows you to quickly and without wasting time organize a tray track using a minimum of tools.",
        "title": "Fasteners and&nbsp;hardware"
      },
      "strut": {
        "description": "The STRUT system is one of the main elements in creating a network of building engineering systems. The system allows the creation of support structures without welding and the fastening of elements using channel nuts. Moreover, such a structure is capable of withstanding heavy loads.",
        "title": "STRUT system"
      },
      "suspension": {
        "description": "The metal trays suspension system provides a wide range of possible cable routing solutions.",
        "title": "Suspension system"
      },
      "trayNonPerforated": {
        "description": "Non-perforated tray is used in systems where increased rigidity is required. Provides greater protection of cables (including from rodents) in comparison with a perforated cable track.",
        "title": "Non-perforated trays"
      },
      "trayPerforated": {
        "description": "The perforated tray is a U-shaped profile and is used for laying cable routes. Perforation makes it easier to install lines and increases the speed of fixing cables.",
        "title": "Perforated trays"
      },
      "title": "Accessories"
    },
    "features": {
      "1": "Screwless fixation: &laquo;horseshoe / eyelet&raquo; (width from 200&nbsp;mm)",
      "2": "Stiffening rib on&nbsp;the&nbsp;walls of&nbsp;the&nbsp;tray (80 and&nbsp;100&nbsp;mm height trays)",
      "3": "&laquo;Male-female&raquo; docking of&nbsp;trays and&nbsp;lids",
      "4": "Longitudinal and&nbsp;transverse stamping to&nbsp;increase the&nbsp;cooling area and&nbsp;give additional rigidity to&nbsp;the&nbsp;base of&nbsp;the&nbsp;tray",
      "5": "Company logo",
      "alt": "Design features",
      "image": "/images/t-line/features-en.svg",
      "title": "Design features"
    },
    "lead": "The&nbsp;T-Line series is&nbsp;presented in&nbsp;a&nbsp;wide range of&nbsp;tray sections&nbsp;&ndash; from 35&times;50 to&nbsp;100&times;600&nbsp;mm. Depending on&nbsp;their needs, customers can purchase perforated or&nbsp;non-perforated sections with&nbsp;or&nbsp;without a&nbsp;cover, as&nbsp;well as&nbsp;a&nbsp;set of&nbsp;all necessary additional accessories.",
    "okl": {
      "alt": "FRCL",
      "title": "Certification<br />as&nbsp;part of&nbsp;FRCL"
    },
    "pageTitle": "T-Line metal trays — Perforated and non-perforated trays from the manufacturer — EKF",
    "production": {
      "description": "In January 2019, the new EKF plant launched a patented metal tray design. The decision to organize its own production was dictated by the consistently high demand for these products and the company's desire to localize production as much as possible on the territory of the Russian Federation. The modern cable support system is especially in demand against the backdrop of an increase in construction and re-equipment of real estate in Russia. ",
      "title": "Production in&nbsp;Moscow"
    },
    "specs": {
      "1": "Perforated and&nbsp;non-perforated",
      "2": "Standard length: 3&nbsp;m",
      "3": "Production in&nbsp;Moscow",
      "4": "Width: 50&nbsp;/ 100&nbsp;/ 150&nbsp;/ 200&nbsp;/ 300&nbsp;/ 400&nbsp;/ 500&nbsp;/ 600&nbsp;mm",
      "5": "Height: 35&nbsp;/ 50&nbsp;/ 80&nbsp;/ 100&nbsp;mm",
      "6": "Thickness: 0,7&nbsp;/ 0,8&nbsp;/ 1,0&nbsp;mm&nbsp;– base series",
      "7": "0,55&nbsp;mm&nbsp;– light series 50&times;50&nbsp;/ 100&nbsp;/ 150&nbsp;/ 200&nbsp;/ 300&nbsp;+ cover",
      "8": "Minimum quantity of&nbsp;shipment is&nbsp;3&nbsp;m",
      "footnote": "For&nbsp;the&nbsp;project, we are ready to&nbsp;make trays of&nbsp;the&nbsp;required size from&nbsp;0.6&nbsp;m to&nbsp;6&nbsp;m with&nbsp;a&nbsp;step of&nbsp;0.2&nbsp;m",
      "title": "General specifications"
    },
    "submit": "Submit an application",
    "subtitle": "Submit an&nbsp;application and&nbsp;we will calculate your project as&nbsp;soon as&nbsp;possible",
    "title": "T-Line <strong>tray</strong>"
  },
  "ru": {
    "accessories": {
      "accessories": {
        "description": "Система аксессуаров EKF для&nbsp;металлических лотков разработана специально для&nbsp;обеспечения строителей и&nbsp;монтажников необходимым набором переходов, ответвителей, фланцев, пластин и&nbsp;т.&nbsp;д. для&nbsp;организации полноценной лотковой трассы. Весь ассортимент артикулов спроектирован с&nbsp;учетом конструктивных особенностей металлических лотков EKF.",
        "title": "Аксессуары для&nbsp;лотка"
      },
      "covers": {
        "description": "Унифицированные крышки для&nbsp;металлического лотка с&nbsp;безопасной кромкой подходят как&nbsp;для&nbsp;перфорированных, так&nbsp;и&nbsp;неперфорированных лотков, а&nbsp;также для&nbsp;лотков ряда конкурентов.",
        "title": "Крышки для&nbsp;металлического лотка"
      },
      "hardware": {
        "description": "Широкий ассортимент крепежа позволяет оперативно и&nbsp;без&nbsp;потери времени организовать лотковую трассу с&nbsp;применением минимума инструмента.",
        "title": "Крепеж и&nbsp;метизы"
      },
      "strut": {
        "description": "STRUT-система&nbsp;– один из&nbsp;основных элементов в&nbsp;создании сети инженерных систем зданий. Система позволяет без&nbsp;сварки создавать опорные конструкции и&nbsp;крепить элементы при&nbsp;помощи канальных гаек. При&nbsp;этом подобная конструкция способна выдерживать большие нагрузки.",
        "title": "STRUT-система"
      },
      "suspension": {
        "description": "Система подвесов для&nbsp;металлических лотков обеспечивает широкий спектр возможных решений по&nbsp;креплению кабельных трасс.",
        "title": "Система подвесов"
      },
      "trayNonPerforated": {
        "description": "Лоток неперфорированный применяется в&nbsp;системах, где&nbsp;необходима повышенная жесткость. Обеспечивает большую защиту кабелей (в&nbsp;том числе от&nbsp;грызунов) в&nbsp;сравнении с&nbsp;перфорированной лотковой трассой.",
        "title": "Лотки неперфорированные"
      },
      "trayPerforated": {
        "description": "Лоток перфорированный представляет собой П-образный профиль и&nbsp;применяется для&nbsp;прокладки кабельных трасс. Перфорация облегчает процесс монтажа линий и&nbsp;увеличивает скорость фиксации кабелей.",
        "title": "Лотки перфорированные"
      },
      "title": "Ассортимент<br />комплектующих"
    },
    "features": {
      "1": "Безвинтовая фиксация: «подкова/проушина» (ширина от&nbsp;200&nbsp;мм)",
      "2": "Ребро жесткости на&nbsp;стенках лотка (лоток высотой 80 и&nbsp;100&nbsp;мм)",
      "3": "Стыковка лотков и&nbsp;крышек «папа-мама»",
      "4": "Продольная и&nbsp;поперечная подштамповка для&nbsp;увеличения площади охлаждения и&nbsp;придания дополнительной жесткости основанию лотка",
      "5": "Логотип компании",
      "alt": "Конструктивные особенности",
      "image": "/images/t-line/features.svg",
      "title": "Конструктивные<br />особенности"
    },
    "lead": "Серия T-Line представлена в&nbsp;широком ассортименте сечений лотка&nbsp;– от&nbsp;35&times;50 до&nbsp;100&times;600&nbsp;мм. В&nbsp;зависимости от&nbsp;своих задач клиенты могут приобрести перфорированные или&nbsp;неперфорированные секции с&nbsp;крышкой или&nbsp;без&nbsp;нее, а&nbsp;также набор всех необходимых дополнительных аксессуаров.",
    "okl": {
      "alt": "ОКЛ",
      "title": "Сертификация<br />в&nbsp;составе ОКЛ"
    },
    "pageTitle": "Металлические лотки T-Line — Перфорированные и неперфорированные лотки от производителя — EKF",
    "production": {
      "description": "В&nbsp;январе 2019&nbsp;года новый завод EKF начал выпуск металлического лотка запатентованной конструкции. Решение об&nbsp;организации собственного производства было продиктовано стабильно высоким спросом на&nbsp;данную продукцию и&nbsp;желанием компании максимально локализовать производство на&nbsp;территории РФ. Современная кабеленесущая система особенно востребована на&nbsp;фоне увеличения объемов строительства и&nbsp;переоснащения объектов недвижимости в&nbsp;России.",
      "title": "Производство в&nbsp;Москве"
    },
    "specs": {
      "1": "Перфорированный и&nbsp;неперфорированный",
      "2": "Стандартная длина: 3&nbsp;м",
      "3": "Производство в&nbsp;Москве",
      "4": "Ширина: 50&nbsp;/ 100&nbsp;/ 150&nbsp;/ 200&nbsp;/ 300&nbsp;/ 400&nbsp;/ 500&nbsp;/ 600&nbsp;мм",
      "5": "Высота: 35&nbsp;/ 50&nbsp;/ 80&nbsp;/ 100&nbsp;мм",
      "6": "Толщина: 0,7&nbsp;/ 0,8&nbsp;/ 1,0&nbsp;мм&nbsp;– базовый ряд",
      "7": "0,55&nbsp;мм&nbsp;– лёгкая серия 50&times;50&nbsp;/ 100&nbsp;/ 150&nbsp;/ 200&nbsp;/ 300&nbsp;+ крышка",
      "8": "Минимальное кол-во отгрузки по&nbsp;3&nbsp;м",
      "footnote": "Под&nbsp;проект готовы делать лоток необходимого габарита от&nbsp;0,6&nbsp;м до&nbsp;6&nbsp;м с&nbsp;шагом 0,2&nbsp;м",
      "title": "Общие характеристики"
    },
    "submit": "Оставить заявку",
    "subtitle": "Оставьте заявку и&nbsp;мы рассчитаем ваш проект в&nbsp;кратчайшие сроки",
    "title": "<strong>Лоток</strong> T-Line"
  }
}
</i18n>
