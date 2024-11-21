<template>
  <main class="page-landing-cable-channel pb-32 pb-lg-64">
    <section class="section section-banner">
      <div class="banner-text">
        <b-container>
          <b-row>
            <b-col cols="10" sm="9" md="7" xl="6">
              <p class="overline">{{ $t('overline') }}</p>
              <p class="h1 text-uppercase mb-32">{{ $t('title') }}</p>
              <p class="fs-4 fs-xl-5 mb-160 pb-lg-16">{{ $t('subtitle') }}</p>
              <b-button
                :to="localePath(catalogLink)"
                variant="white"
                class="d-none d-md-inline-flex"
              >
                {{ $t('catalog.goToCatalog') }}
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="banner-image">
        <img
          srcset="
            /images/cable-channel/banner-cable-channel-sm.jpg  600w,
            /images/cable-channel/banner-cable-channel.jpg    1200w
          "
          src="/images/cable-channel/banner-cable-channel.jpg"
          sizes="(max-width: 767px) 600px, 1200px"
          aria-hidden="true"
        />
      </div>
      <div class="text-center mt-32 d-md-none">
        <b-button :to="localePath(catalogLink)" variant="white">
          {{ $t('catalog.goToCatalog') }}
        </b-button>
      </div>
    </section>

    <section class="section section-highlights">
      <b-container>
        <b-row
          cols="2"
          cols-sm="2"
          cols-md="3"
          cols-lg="5"
          class="justify-content-center mb-n24"
        >
          <b-col
            v-for="(highlight, index) in highlights"
            :key="`highlight-${index}`"
          >
            <img
              :src="`/images/cable-channel/${highlight.image}`"
              class="img-fluid mb-16"
              aria-hidden="true"
            />
            <p class="mb-32" v-html="$t(highlight.text)"></p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section lh-120">
      <b-container>
        <h2 class="text-center text-md-left text-accent mb-32">
          {{ $t('advantages.title') }}
        </h2>

        <b-row class="text-center mb-n32">
          <b-col
            v-for="(advantage, index) in advantages"
            :key="`advantage-${index}`"
            md="6"
            lg="4"
            class="mb-32"
          >
            <b-img-lazy
              :src="`/images/cable-channel/${advantage.image}`"
              class="img-fluid rounded-lg border mb-24"
              aria-hidden="true"
            />
            <p
              class="h5 text-uppercase text-accent"
              v-html="$t(advantage.title)"
            ></p>
            <p v-if="advantage.subtitle" v-html="$t(advantage.subtitle)"></p>
          </b-col>
        </b-row>

        <div class="text-right">
          <b-button :to="localePath(catalogLink)" variant="accent">
            {{ $t('catalog.goToCatalog') }}
          </b-button>
        </div>
      </b-container>
    </section>

    <section class="section lh-120 pt-0">
      <b-container>
        <h2 class="text-center text-md-left text-accent mb-32">
          {{ $t('areas.title') }}
        </h2>
        <b-row class="mb-32">
          <b-col md="4">
            <b-img-lazy
              src="/images/cable-channel/application-main.jpg"
              class="img-fluid"
              aria-hidden="true"
            />
          </b-col>
          <b-col md="8">
            <p>{{ $t('areas.p1') }}</p>
            <ul class="list-unstyled">
              <li class="mb-16">{{ $t('areas.li1') }}</li>
              <li class="mb-16">{{ $t('areas.li2') }}</li>
              <li class="mb-16">{{ $t('areas.li3') }}</li>
              <li class="mb-16">{{ $t('areas.li4') }}</li>
            </ul>
            <p>{{ $t('areas.p2') }}</p>
          </b-col>
        </b-row>
        <b-row class="text-center text-accent mb-n32">
          <b-col md="4">
            <b-img-lazy
              src="/images/cable-channel/application-assemblers.jpg"
              class="img-fluid rounded-lg mb-24"
              aria-hidden="true"
            />
            <p class="h5 text-uppercase mb-32">{{ $t('areas.assemblers') }}</p>
          </b-col>
          <b-col md="4">
            <b-img-lazy
              src="/images/cable-channel/application-industry.jpg"
              class="img-fluid rounded-lg mb-24"
              aria-hidden="true"
            />
            <p class="h5 text-uppercase mb-32">{{ $t('areas.industrial') }}</p>
          </b-col>
          <b-col md="4">
            <b-img-lazy
              src="/images/cable-channel/application-construction.jpg"
              class="img-fluid rounded-lg mb-24"
              aria-hidden="true"
            />
            <p class="h5 text-uppercase mb-32">
              {{ $t('areas.construction') }}
            </p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-assortment pt-0">
      <b-container>
        <h2 class="text-center text-md-left text-accent mb-32">
          {{ $t('assortment.title') }}
        </h2>
        <div class="table-responsive">
          <table class="table table-borderless table-striped">
            <thead>
              <tr>
                <th
                  v-for="field in tableFields"
                  :key="field.key"
                  :class="field.thClass"
                >
                  {{ field.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableItems" :key="`row-${index}`">
                <td
                  v-for="field in tableFields"
                  :key="`cell-${index}-${field.key}`"
                  :class="field.tdClass"
                >
                  {{ item[field.key] }}
                </td>
              </tr>
            </tbody>
          </table>
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
      catalogLink: '/catalog/perforirovannye-kabelnye-kanaly',
      advantages: [
        {
          image: 'benefit-pvc.jpg',
          title: 'advantages.pvc.title',
          subtitle: 'advantages.pvc.subtitle',
        },
        {
          image: 'benefit-breakoff1.jpg',
          title: 'advantages.breakoff1.title',
          subtitle: 'advantages.breakoff1.subtitle',
        },
        {
          image: 'benefit-breakoff2.jpg',
          title: 'advantages.breakoff2.title',
          subtitle: 'advantages.breakoff2.subtitle',
        },
        {
          image: 'benefit-diameter.jpg',
          title: 'advantages.diameter.title',
          subtitle: 'advantages.diameter.subtitle',
        },
        {
          image: 'benefit-strap.jpg',
          title: 'advantages.strap.title',
        },
        {
          image: 'benefit-step.jpg',
          title: 'advantages.step.title',
        },
      ],
      highlights: [
        {
          image: 'highlight-step.svg',
          text: 'highlights.step',
        },
        {
          image: 'highlight-breakoff.svg',
          text: 'highlights.breakoff',
        },
        {
          image: 'highlight-firesafety.svg',
          text: 'highlights.firesafety',
        },
        {
          image: 'highlight-turkey.svg',
          text: 'highlights.turkey',
        },
        {
          image: 'highlight-rohs.svg',
          text: 'highlights.rohs',
        },
      ],
      tableFields: [
        {
          key: 'vendorCode',
          label: this.$t('global.vendorCode'),
        },
        {
          key: 'name',
          label: this.$t('global.name'),
        },
        {
          key: 'height',
          label: `${this.$t('global.height')} (H), ${this.$t('units.mm')}`,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          key: 'width',
          label: `${this.$t('global.width')} (W), ${this.$t('units.mm')}`,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
      ],
      tableItems: [
        {
          vendorCode: 'kk25-25',
          name: this.$t('assortment.kk2525'),
          height: 30,
          width: 25,
        },
        {
          vendorCode: 'kk40-25',
          name: this.$t('assortment.kk4025'),
          height: 40,
          width: 25,
        },
        {
          vendorCode: 'kk40-40',
          name: this.$t('assortment.kk4040'),
          height: 40,
          width: 40,
        },
        {
          vendorCode: 'kk40-60',
          name: this.$t('assortment.kk4060'),
          height: 40,
          width: 60,
        },
        {
          vendorCode: 'kk60-25',
          name: this.$t('assortment.kk6025'),
          height: 60,
          width: 25,
        },
        {
          vendorCode: 'kk60-40',
          name: this.$t('assortment.kk6040'),
          height: 60,
          width: 40,
        },
        {
          vendorCode: 'kk60-60',
          name: this.$t('assortment.kk6060'),
          height: 60,
          width: 60,
        },
        {
          vendorCode: 'kk80-25',
          name: this.$t('assortment.kk8025'),
          height: 80,
          width: 25,
        },
        {
          vendorCode: 'kk80-40',
          name: this.$t('assortment.kk8040'),
          height: 80,
          width: 40,
        },
        {
          vendorCode: 'kk80-80',
          name: this.$t('assortment.kk8080'),
          height: 80,
          width: 80,
        },
        {
          vendorCode: 'kk80-60',
          name: this.$t('assortment.kk8060'),
          height: 80,
          width: 60,
        },
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
@import '~assets/scss/tables';

$cable-channel-accent: #174488;

.page-landing-cable-channel {
  .text-accent {
    color: $cable-channel-accent;
  }

  .btn-accent {
    @include button-variant($cable-channel-accent, $cable-channel-accent);
  }

  .section {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;

    &.section-banner {
      position: relative;
      padding-top: 2rem;
      padding-bottom: 3.5rem;
      font-size: $font-size-2;
      line-height: 1.2;
      color: $white;
      background-color: $cable-channel-accent;
      overflow: hidden;
      z-index: 0;

      .banner-image {
        position: relative;
        height: 220px;
        z-index: -1;

        & > img {
          position: absolute;
          left: $grid-gutter-width * 0.5;
          bottom: 0;
        }
      }

      .banner-header {
        margin-bottom: 2rem;
      }
    }

    &.section-highlights {
      padding-top: 2rem;
      padding-bottom: 2rem;
      line-height: 1.2;
      text-align: center;
      color: $cable-channel-accent;
      background-color: $gray-200;
    }

    &.section-assortment {
      .table-responsive {
        border: $border-width solid $gray-300;
      }

      .table {
        th {
          padding: 0.25rem;
          font-weight: $font-weight-normal;
          color: $gray-500;
        }

        td {
          padding: 0.25rem;
          color: $gray-700;
        }

        &.table-striped {
          tbody {
            tr:nth-of-type(2n + 1) {
              background-color: rgba($cable-channel-accent, 0.1);
            }
          }
        }
      }
    }
  }

  @include media-breakpoint-up(sm) {
    .section {
      &.section-banner {
        .banner-image {
          height: 270px;

          & > img {
            left: auto;
            right: 0;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(md) {
    .section {
      &.section-banner {
        height: 480px;
        padding-top: 3rem;
        padding-bottom: 4rem;
        font-size: $font-size-3;

        .banner-image {
          position: absolute;
          left: calc(
            50vw - #{map-get($container-max-widths, 'md') * 0.5} + #{map-get(
                $container-max-widths,
                'md'
              ) * 0.58333} + #{$grid-gutter-width * 0.5}
          );
          right: 0;
          top: 0;
          bottom: 4rem;
          height: auto;

          & > img {
            left: 0;
            bottom: 0;
            right: auto;
          }
        }

        .banner-subheader {
          margin-bottom: 2.5rem;
        }
      }

      &.section-assortment {
        .table-responsive {
          width: auto;
          margin: 0 -1rem;
          border: none;
        }

        .table {
          border-collapse: separate;
          border-spacing: 1rem 0;

          th,
          td {
            padding: 0.625rem 0.25rem;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      padding-top: 4rem;
      padding-bottom: 3rem;

      &.section-banner {
        height: 495px;
        padding-top: 3.5rem;
        font-size: $font-size-4;

        .banner-image {
          left: calc(
            50vw - #{map-get($container-max-widths, 'lg') * 0.5} + #{map-get(
                $container-max-widths,
                'lg'
              ) * 0.58333} + #{$grid-gutter-width * 0.5}
          );
        }

        .banner-subheader {
          margin-bottom: 3.5rem;
        }
      }

      &.section-highlights {
        padding-top: 3rem;
      }

      &.section-assortment {
        .table-responsive {
          margin: 0 -2rem;
        }

        .table {
          border-spacing: 2rem 0;
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    .section {
      padding-top: 6rem;
      padding-bottom: 5rem;

      &.section-banner {
        height: 525px;
        padding-top: 4.5rem;
        padding-bottom: 5.5rem;
        background-image: url('/images/cable-channel/banner-cable-channel-bg.svg');
        background-position: left calc(100vw - 1440px - 44%) top -240px;
        background-repeat: no-repeat;
        background-size: auto;

        .banner-image {
          left: calc(
            50vw - #{map-get($container-max-widths, 'xl') * 0.5} + #{map-get(
                $container-max-widths,
                'xl'
              ) * 0.5} + #{$grid-gutter-width * 0.5}
          );
          bottom: 5.5rem;
        }
      }
    }
  }
}

.overline {
  font-size: $font-size-1;
  font-weight: $font-weight-medium;
  letter-spacing: 0.125rem;
  text-transform: uppercase;
}
</style>

<i18n>
{
  "en": {
    "advantages": {
      "breakoff1": {
        "title": "Special prong<br /> break-off line",
        "subtitle": "Break-off line is smooth, without burrs"
      },
      "breakoff2": {
        "title": "Special section<br /> break-off line",
        "subtitle": "Section can be easily broken off – it is convenient for connecting cable ducts"
      },
      "diameter": {
        "title": "Base holes of different diameters",
        "subtitle": "Ease of installation with various fasteners"
      },
      "pvc": {
        "title": "Made from primary PVC",
        "subtitle": "Improved impact resistance, lower brittleness"
      },
      "step": {
        "title": "Standard perforation pitch"
      },
      "strap": {
        "title": "Holes for cable ties<br /> for attaching wires"
      },
      "title": "Advantages"
    },
    "areas": {
      "assemblers": "LVCD assemblers",
      "construction": "Construction and installation organizations",
      "industrial": "Industrial enterprises",

      "li1": "– for cable laying in automation and distribution electrical cabinets;",
      "li2": "– to protect the wiring from mechanical damage;",
      "li3": "– to reduce the time spent on assembling equipment;",
      "li4": "– to give the assembled product an aesthetically finished look.",
      "p1": "The perforated cable duct is mainly used in the assembly production of electrical cabinets:",
      "p2": "Input-distribution devices and control panels need high-quality accessories for assembly in order for their operation to be durable and reliable, moreover, it is desirable that the installation be quick and convenient. This is facilitated by the use of perforated cable ducts. The neatly laid wires are immediately visible, and the operating organization, even in the person of a layman, will easily appreciate the professionalism of the work.",
      "title": "Areas of use"
    },
    "assortment": {
      "kk2525": "EKF PROxima perforated cable duct (HxW: 30х25mm)",
      "kk4025": "EKF PROxima perforated cable duct (HxW: 40х25mm)",
      "kk4040": "EKF PROxima perforated cable duct (HxW: 40х40mm)",
      "kk4060": "EKF PROxima perforated cable duct (HxW: 40х60mm)",
      "kk6025": "EKF PROxima perforated cable duct (HxW: 60х25mm)",
      "kk6040": "EKF PROxima perforated cable duct (HxW: 60х40mm)",
      "kk6060": "EKF PROxima perforated cable duct (HxW: 60х60mm)",
      "kk8025": "EKF PROxima perforated cable duct (HxW: 80х25mm)",
      "kk8040": "EKF PROxima perforated cable duct (HxW: 80х40mm)",
      "kk8060": "EKF PROxima perforated cable duct (HxW: 80х60mm)",
      "kk8080": "EKF PROxima perforated cable duct (HxW: 80х80mm)",
      "title": "Assortment"
    },
    "highlights": {
      "breakoff": "Prong breaks easily and exactly",
      "firesafety": "Self-extinguishing<br /> PVC",
      "rohs": "RoHS compliant material",
      "step": "Standard perforation pitch",
      "turkey": "Production<br /> in Turkey"
    },
    "overline": "New improved series",
    "pageTitle": "Perforated cable duct — EKF",
    "subtitle": "Allows quick wiring installation and significantly reduces labor costs",
    "title": "Perforated cable duct"
  },
  "ru": {
    "advantages": {
      "breakoff1": {
        "title": "Специальная линия<br /> отлома зубца",
        "subtitle": "Линия отлома ровная, без заусенцев"
      },
      "breakoff2": {
        "title": "Специальная линия<br /> отлома секции",
        "subtitle": "Легко отламывается секция – это удобно для соединения кабель-каналов"
      },
      "diameter": {
        "title": "Отверстия в основании<br /> разного диаметра",
        "subtitle": "Легкость монтажа разными<br /> крепежными элементами"
      },
      "pvc": {
        "title": "Материал изделия –<br />первичный ПВХ",
        "subtitle": "Улучшенная ударопрочность,<br /> меньшая хрупкость"
      },
      "step": {
        "title": "Стандартный шаг перфорации"
      },
      "strap": {
        "title": "Отверстия под стяжки<br /> для крепления проводов"
      },
      "title": "Преимущества"
    },
    "areas": {
      "assemblers": "Сборщики НКУ",
      "construction": "Строительно-монтажные организации",
      "industrial": "Промышленные предприятия",
      "li1": "– для прокладки кабеля в электрических шкафах автоматизации и распределения;",
      "li2": "– для защиты проводки от механических повреждений;",
      "li3": "– для сокращения временных затрат на сборку оборудования;",
      "li4": "– для придания собранному изделию эстетически законченного вида.",
      "p1": "Перфорированный кабель-канал используется, в основном, на сборочном производстве электрических шкафов:",
      "p2": "Вводно-распределительные устройства и щиты управления нуждаются в качественных аксессуарах для сборки, чтобы их работа была долговечной и надежной, причем, желательно чтобы монтаж был быстрым и удобным. Этому способствует применение перфорированных кабель-каналов. Аккуратно уложенные провода видно сразу, и эксплуатирующая организация, даже в лице неспециалиста, легко оценит профессионализм работы.",
      "title": "Области применения"
    },
    "assortment": {
      "kk2525": "Канал кабельный перфорир. (ВхШ: 30х25мм.) EKF PROxima",
      "kk4025": "Канал кабельный перфорир. (ВхШ: 40х25мм.) EKF PROxima",
      "kk4040": "Канал кабельный перфорир. (ВхШ: 40х40мм.) EKF PROxima",
      "kk4060": "Канал кабельный перфорир. (ВхШ: 40х60мм.) EKF PROxima",
      "kk6025": "Канал кабельный перфорир. (ВхШ: 60х25мм.) EKF PROxima",
      "kk6040": "Канал кабельный перфорир. (ВхШ: 60х40мм.) EKF PROxima",
      "kk6060": "Канал кабельный перфорир. (ВхШ: 60х60мм.) EKF PROxima",
      "kk8025": "Канал кабельный перфорир. (ВхШ: 80х25мм.) EKF PROxima",
      "kk8040": "Канал кабельный перфорир. (ВхШ: 80х40мм.) EKF PROxima",
      "kk8060": "Канал кабельный перфорир. (ВхШ: 80х60мм.) EKF PROxima",
      "kk8080": "Канал кабельный перфорир. (ВхШ: 80х80мм.) EKF PROxima",
      "title": "Ассортимент"
    },
    "highlights": {
      "breakoff": "Зубец ломается легко<br/> и ровно",
      "firesafety": "Самозатухающий<br />ПВХ",
      "rohs": "Материал соответствует стандарту RoHS",
      "step": "Стандартный шаг перфорации",
      "turkey": "Производство<br />в Турции"
    },
    "overline": "Новая улучшенная серия",
    "pageTitle": "Перфорированный кабельный канал — EKF",
    "subtitle": "Позволяет осуществлять монтаж проводки в сжатые сроки и существенно снижает трудозатраты при монтаже",
    "title": "Перфорированный кабельный канал"
  }
}
</i18n>
