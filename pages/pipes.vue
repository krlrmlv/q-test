<template>
  <main class="page-landing-pipes pb-32 pb-lg-64">
    <section class="section section-banner">
      <b-container>
        <b-row>
          <b-col md="8" lg="7">
            <h1 class="text-uppercase">{{ $t('title') }}</h1>
            <p class="lead">{{ $t('subtitle') }}</p>
            <p class="gost">{{ $t('gost') }}</p>
            <b-button
              :to="localePath(catalogLink)"
              variant="white"
              class="text-primary"
            >
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <h2 class="h1 text-uppercase mb-24">{{ $t('advantages.title') }}</h2>
        <p class="lead">{{ $t('advantages.description') }}</p>
        <ul class="list-unstyled d-md-none mb-24">
          <li class="d-flex align-items-center mb-16">
            <div class="align-self-start text-primary mr-16" aria-hidden="true">
              <svg-icon
                name="pipes/benefit-halogen-free"
                width="60"
                height="60"
              />
            </div>
            {{ $t('advantages.halogenFree') }}
          </li>
          <li class="d-flex align-items-center mb-16">
            <div class="align-self-start text-primary mr-16" aria-hidden="true">
              <svg-icon
                name="pipes/benefit-service-life"
                width="60"
                height="60"
              />
            </div>
            {{ $t('advantages.serviceLife') }}
          </li>
          <li class="d-flex align-items-center mb-16">
            <div class="align-self-start text-primary mr-16" aria-hidden="true">
              <svg-icon name="pipes/benefit-ip" width="60" height="60" />
            </div>
            {{ $t('advantages.ip') }}
          </li>
          <li class="d-flex align-items-center mb-16">
            <div class="align-self-start text-primary mr-16" aria-hidden="true">
              <svg-icon
                name="pipes/benefit-installation"
                width="60"
                height="60"
              />
            </div>
            {{ $t('advantages.installation') }}
          </li>
          <li class="d-flex align-items-center mb-16">
            <div class="align-self-start text-primary mr-16" aria-hidden="true">
              <svg-icon
                name="pipes/benefit-resistance"
                width="60"
                height="60"
              />
            </div>
            {{ $t('advantages.resistance') }}
          </li>
          <li class="d-flex align-items-center mb-16">
            <div class="align-self-start text-primary mr-16" aria-hidden="true">
              <svg-icon name="pipes/benefit-materials" width="60" height="60" />
            </div>
            {{ $t('advantages.materials') }}
          </li>
        </ul>
        <b-img-lazy
          :alt="$t('advantages.alt')"
          :src="`/images/pipes/${$t('advantages.image')}`"
          class="img-fluid d-none d-md-block mb-24"
        />

        <b-row>
          <b-col lg="8" xl="6" offset-lg="4" offset-xl="6">
            <div class="fs-2 text-lg-right">
              <p class="mb-0">{{ $t('advantages.footnote1') }}</p>
              <p class="mb-0">{{ $t('advantages.footnote2') }}</p>
              <p class="mb-0">{{ $t('advantages.footnote3') }}</p>
              <p class="mb-0">{{ $t('advantages.footnote4') }}</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-product">
      <b-container>
        <b-row class="mb-24 mb-xl-56" no-gutters>
          <b-col md="8" lg="6" xl="5">
            <h3 class="section-header">
              <span class="text-uppercase">{{ $t('pipe') }}</span>
              <br />
              <span class="text-primary">{{ $t('flexible') }}</span>
              {{ $t('forCableDucts') }}
            </h3>
          </b-col>
          <b-col md="4" xl="3">
            <b-button
              :to="localePath(catalogLink)"
              variant="primary"
              class="section-link"
              block
            >
              {{ $t('catalog.goToCatalog') }}
              <svg-icon
                name="pipes/arrow"
                width="64"
                height="14"
                class="mx-12"
                aria-hidden="true"
              />
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" lg="7" order-md="2">
            <div class="section-image">
              <b-img-lazy
                :alt="`${$t('pipe')} ${$t('flexible')} ${$t('forCableDucts')}`"
                srcset="/images/pipes/pipe-flexible-sm.jpg 360w, /images/pipes/pipe-flexible.jpg 1000w"
                src="/images/pipes/pipe-flexible.jpg"
                sizes="(max-width: 767px) 360px, 1000px"
              />
            </div>
          </b-col>
          <b-col md="6" lg="5" order-md="1">
            <dl class="product-specs mb-24">
              <div class="item">
                <dt>{{ $t('diameter') }}</dt>
                <dd>40–200&nbsp;{{ $t('units.mm') }}</dd>
              </div>
              <div class="item">
                <dt>{{ $t('cable') }}</dt>
                <dd>
                  <span class="text-uppercase">{{ $t('global.yes') }}</span>
                  ({{ $t('nylon') }})
                </dd>
              </div>
              <div class="item">
                <dt>{{ $t('coupling') }}</dt>
                <dd class="text-uppercase">{{ $t('global.yes') }}</dd>
              </div>
              <div class="item">
                <dt>{{ $t('compressionResistance') }}</dt>
                <dd>450&nbsp;{{ $t('n') }}</dd>
              </div>
              <div class="item">
                <dt>{{ $t('wall') }}</dt>
                <dd class="text-uppercase">{{ $t('global.yes') }}</dd>
              </div>
              <div class="item">
                <dt>{{ $t('radius') }}</dt>
                <dd>3D</dd>
              </div>
              <div class="item">
                <dt>{{ $t('tightness') }}</dt>
                <dd>{{ $t('upTo') }} IP67</dd>
              </div>
            </dl>
          </b-col>
        </b-row>
        <p class="h4 text-primary text-uppercase">{{ $t('usage.title') }}</p>
        <p v-html="$t('usage.flexible')"></p>
      </b-container>
    </section>

    <section class="section section-product section-product-reversed">
      <b-container>
        <b-row class="mb-24" no-gutters>
          <b-col md="8" lg="6" xl="5" order-md="2">
            <h3 class="section-header">
              <span class="text-uppercase">{{ $t('pipe') }}</span>
              <br />
              <span class="text-primary">{{ $t('rigid') }}</span>
              {{ $t('forCableDucts') }}
            </h3>
          </b-col>
          <b-col md="4" xl="3" order-md="1" offset-lg="2" offset-xl="4">
            <b-button
              :to="localePath(catalogLink)"
              variant="primary"
              class="section-link"
              block
            >
              {{ $t('catalog.goToCatalog') }}
              <svg-icon
                name="pipes/arrow"
                width="64"
                height="14"
                class="mx-12"
                aria-hidden="true"
              />
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="8" lg="7" xl="5">
            <div class="section-image">
              <b-img-lazy
                :alt="`${$t('pipe')} ${$t('rigid')} ${$t('forCableDucts')}`"
                srcset="/images/pipes/pipe-hard-sm.jpg 360w, /images/pipes/pipe-hard.jpg 874w"
                src="/images/pipes/pipe-hard.jpg"
                sizes="(max-width: 767px) 360px, 874px"
                class="float-xl-right"
              />
            </div>
          </b-col>
          <b-col md="4" lg="5" xl="7">
            <dl class="product-specs mb-24">
              <div class="item">
                <dt>{{ $t('diameter') }}</dt>
                <dd>50–200&nbsp;{{ $t('units.mm') }}</dd>
              </div>
              <div class="item">
                <dt>{{ $t('cable') }}</dt>
                <dd class="text-uppercase">{{ $t('global.no') }}</dd>
              </div>
              <div class="item">
                <dt>{{ $t('coupling') }}</dt>
                <dd class="text-uppercase">{{ $t('global.no') }}</dd>
              </div>
              <div class="item">
                <dt>{{ $t('compressionResistance') }}</dt>
                <dd>750&nbsp;{{ $t('n') }}</dd>
              </div>
              <div class="item">
                <dt>{{ $t('wall') }}</dt>
                <dd class="text-uppercase">{{ $t('global.yes') }}</dd>
              </div>
              <div class="item">
                <dt>{{ $t('radius') }}</dt>
                <dd>20D</dd>
              </div>
              <div class="item">
                <dt>{{ $t('tightness') }}</dt>
                <dd>{{ $t('upTo') }} IP67</dd>
              </div>
            </dl>
          </b-col>
        </b-row>
        <p class="h4 text-primary text-uppercase">{{ $t('usage.title') }}</p>
        <p v-html="$t('usage.rigid')"></p>
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
      catalogLink: '/catalog/truba-dvustennaya-pnd',
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
.page-landing-pipes {
  line-height: 1.2;

  .gost {
    margin-top: 3.75rem;
    margin-bottom: 2rem;
    font-size: 1.25rem;
    color: #faa;
  }

  .lead {
    font-size: 1.25rem;
  }

  .section {
    padding-top: 2rem;
    padding-bottom: 2rem;

    &.section-banner {
      height: 560px;
      padding-top: 2rem;
      padding-bottom: 2rem;
      color: $white;
      background-color: #9f0102;
      background-image: url('/images/pipes/banner-sm.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    &.section-product {
      padding-top: 0;
      font-size: $font-size-4;
      overflow: hidden;

      .section-header {
        margin: 0 -#{$grid-gutter-width * 0.5};
        padding: $grid-gutter-width * 0.5;
        font-size: 1.125rem;
        font-weight: $font-weight-medium;
        color: $white;
        background-color: $gray-900;

        .text-uppercase {
          font-size: 1.25em;
        }
      }

      .section-link {
        width: calc(100% + #{$grid-gutter-width});
        height: 100%;
        margin: 0 -#{$grid-gutter-width * 0.5};
        padding-left: $grid-gutter-width * 0.5;
        padding-right: $grid-gutter-width * 0.5;
      }

      .section-image {
        margin: 0 -#{$grid-gutter-width * 0.5};

        & > img {
          max-width: 100%;
          height: auto;
        }
      }

      .product-specs {
        .item {
          margin-bottom: 1rem;
        }

        dt {
          font-size: $font-size-3;
          font-weight: $font-weight-normal;
          color: $primary;
        }

        dd {
          font-weight: $font-weight-bold;
          color: $body-color;
        }
      }
    }
  }

  @include media-breakpoint-up(md) {
    .gost {
      font-size: 1.5rem;
    }

    .section {
      &.section-banner {
        padding-top: 3rem;
        padding-bottom: 3rem;
        background-image: url('/images/pipes/banner.jpg');
        background-size: auto 100%;

        h1,
        .h1 {
          font-size: 2.75rem;
        }
      }

      &.section-product {
        .section-header {
          margin: 0;
          padding: 1.25rem 1.5rem;
        }

        .section-link {
          width: 100%;
          margin: 0;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .section-image {
          margin: 0;
        }

        &.section-product-reversed {
          .section-header {
            text-align: right;
          }

          .section-link {
            flex-direction: row-reverse;

            .icon {
              transform: rotate(180deg);
            }
          }

          .product-specs {
            text-align: right;
          }
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .gost {
      font-size: 2rem;
    }

    .section {
      padding-top: 3rem;
      padding-bottom: 3rem;

      &.section-banner {
        h1,
        .h1 {
          font-size: 3.25rem;
        }
      }

      &.section-product {
        .section-header {
          position: relative;
          padding: 2.75rem 1.75rem 2.75rem 0;
          z-index: 0;

          .text-uppercase {
            font-size: 1.5em;
          }

          &::before {
            display: block;
            content: '';
            position: absolute;
            left: calc(
              #{map-get($container-max-widths, 'lg') * 0.5} - #{$grid-gutter-width *
                0.5} - 50vw
            );
            right: 0;
            top: 0;
            bottom: 0;
            background-color: $gray-900;
            z-index: -1;
          }
        }

        &.section-product-reversed {
          .section-header {
            padding: 2.75rem 0 2.75rem 1.75rem;

            &::before {
              left: 0;
              right: calc(
                #{map-get($container-max-widths, 'lg') * 0.5} - #{$grid-gutter-width *
                  0.5} - 50vw
              );
              background-color: $gray-900;
              z-index: -1;
            }
          }
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    .gost {
      margin-top: 4.5rem;
      margin-bottom: 3rem;
      font-size: 2.25rem;
    }

    .section {
      &.section-banner {
        height: 900px;
        padding-top: 4.5rem;
        padding-bottom: 5.5rem;

        h1,
        .h1 {
          font-size: 3.75rem;
        }

        .lead {
          font-size: 1.375rem;
        }
      }

      &.section-product {
        .section-header {
          padding: 4.5rem 2.75rem 4.5rem 0;

          &::before {
            left: calc(
              #{map-get($container-max-widths, 'xl') * 0.5} - #{$grid-gutter-width *
                0.5} - 50vw
            );
          }
        }

        .section-image {
          & > img {
            max-width: none;
          }
        }

        .product-specs {
          .item {
            margin-bottom: 3rem;
          }
        }

        &.section-product-reversed {
          .section-header {
            padding: 4.5rem 0 4.5rem 2.75rem;

            &::before {
              left: 0;
              right: calc(
                #{map-get($container-max-widths, 'xl') * 0.5} - #{$grid-gutter-width *
                  0.5} - 50vw
              );
            }
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
    "advantages": {
      "alt": "Benefits: halogen-free; service life is more than 50 years; when using a connecting sleeve IP55, when using O-rings IP67; ease of installation (ideally smooth inner wall, low weight and flexibility of pipes, broaching probe); corrosion and chemical resistance; only primary polymer raw materials are used for production",
      "description": "Double-layer flexible and rigid HDPE pipes for mechanical protection of high-voltage cable lines up to 10 kV with improved strength characteristics. The perfectly smooth inner layer guarantees easy cable pulling. The optimized outer corrugated wall profile provides high structural strength and unrivaled cable protection.",
      "footnote1": "When using double-walled HDPE pipes, additional protection measures are not required (according to GOST R IEC 61386.24-2014).",
      "footnote2": "Normative documentation: GOST R IEC 61386.24-2014 “Pipe systems for laying in the ground”",
      "footnote3": "Connection method: by coupling",
      "footnote4": "Laying method: trench",
      "halogenFree": "Halogen free",
      "image": "benefits-en.svg",
      "installation": "Ease of installation (perfectly smooth inner wall, low weight and flexibility of pipes, pulling probe)",
      "ip": "When using a connecting sleeve IP55, when using O-rings IP67",
      "materials": "Only primary polymer raw materials are used for production",
      "resistance": "Corrosion and chemical resistance",
      "serviceLife": "Service life over 50 years",
      "title": "Advantages"
    },
    "cable": "Broach (cable)",
    "compressionResistance": "Compression resistance",
    "coupling": "Coupling included",
    "diameter": "Diameter",
    "flexible": "flexible",
    "forCableDucts": "for cable ducts",
    "gost": "GOST R IEC 61386.24-2014",
    "n": "N",
    "nylon": "nylon",
    "pageTitle": "Double-walled HDPE pipes — EKF",
    "pipe": "Double-wall HDPE pipe",
    "radius": "Bending radius, not less than",
    "rigid": "rigid",
    "subtitle": "Professional solutions for cable ducting",
    "tightness": "Tightness of connections",
    "title": "Double-walled HDPE pipes",
    "upTo": "up to",
    "usage": {
      "flexible": "<strong>Red</strong> EKF flexible pipes: power supply, street lighting, outdoor advertising<br /> <strong>Blue</strong> EKF flexible pipes: laying telecommunications, signal cables and control cables",
      "rigid": "Construction of cable ducts on streets with increased traffic load:<br /> motorways, railway tracks, airport runways. Suitable for monolithic concreting.",
      "title": "Areas of use"
    },
    "wall": "Smooth inner wall"
  },
  "ru": {
    "advantages": {
      "alt": "Преимущества: не содержат галогенов; срок эксплуатации более 50 лет; при использовании соединительной муфты IP55, при использовании уплотнительных колец IP67; легкость монтажа (идеально гладкая внутренняя стенка, низкий вес и гибкость труб, зонд для протяжки); коррозионная и химическая стойкость; для производства используется только первичное полимерное сырье",
      "description": "Двухслойные гибкие и жесткие трубы из ПНД для механической защиты высоковольтных кабельных линий до 10 кВ с улучшенными прочностными характеристиками. Идеально гладкий внутренний слой гарантирует легкую протяжку кабеля. Оптимизированный профиль внешней гофрированной стенки обеспечивает высокую прочность конструкции и непревзойденную защиту кабеля.",
      "footnote1": "При использовании Двустенных труб ПНД не требуются дополнительные меры защиты (согласно ГОСТ Р МЭК 61386.24-2014).",
      "footnote2": "Нормативная документация: ГОСТ Р МЭК 61386.24-2014 «Трубные системы для прокладки в земле»",
      "footnote3": "Способ соединения: с помощью муфты",
      "footnote4": "Способ прокладки: траншейная",
      "halogenFree": "Не содержат галогенов",
      "image": "benefits.svg",
      "installation": "Легкость монтажа (идеально гладкая внутренняя стенка, низкий вес и гибкость труб, зонд для протяжки)",
      "ip": "При использовании соединительной муфты IP55, при использовании уплотнительных колец IP67",
      "materials": "Для производства используется только первичное полимерное сырье",
      "resistance": "Коррозионная и химическая стойкость",
      "serviceLife": "Срок эксплуатации более 50 лет",
      "title": "Преимущества"
    },
    "cable": "Протяжка (тросик)",
    "compressionResistance": "Сопротивление сжатию",
    "coupling": "Муфта в комплекте",
    "diameter": "Диаметр",
    "flexible": "гибкая",
    "forCableDucts": "для кабельной канализации",
    "gost": "ГОСТ Р МЭК 61386.24-2014",
    "n": "Н",
    "nylon": "нейлон",
    "pageTitle": "Двустенные трубы ПНД — EKF",
    "pipe": "Двустенная труба ПНД",
    "radius": "Радиус изгиба, не менее",
    "rigid": "жесткая",
    "subtitle": "Профессиональные решения для кабельной канализации",
    "tightness": "Герметичность соединений",
    "title": "Двустенные трубы ПНД",
    "upTo": "до",
    "usage": {
      "flexible": "<strong>Красные</strong> трубы EKF гибкие: электроснабжение, уличное освещение, наружнаяя реклама<br /> <strong>Синие</strong> трубы EKF гибкие: прокладка телекоммуникаций, сигнальных кабелей и кабелей управления",
      "rigid": "Строительство кабельной канализации на улицах с повышенной транспортной нагрузкой:<br />автомагистрали, ЖД пути, ВПП аэропорта. Подходят для монолитного бетонирования.",
      "title": "Области применения"
    },
    "wall": "Гладкая внутренняя стенка"
  }
}
</i18n>
