<template>
  <main class="page-landing-safeflex">
    <section class="section section-banner">
      <b-container>
        <h1 class="banner-header" v-html="$t('title')"></h1>
        <b-button
          :to="localePath(catalogLink)"
          variant="outline-white"
          class="btn-banner-link"
        >
          {{ $t('catalog.goToCatalog') }}
        </b-button>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <b-row>
          <b-col xl="10" offset-xl="1">
            <h2 class="mb-32">{{ $t('advantages.title') }}</h2>
            <b-row
              cols="2"
              cols-sm="3"
              cols-lg="5"
              class="justify-content-center font-weight-bold lh-120 text-center"
              no-gutters
            >
              <b-col
                v-for="advantage in advantages"
                :key="`advantage-${advantage}`"
              >
                <svg-icon
                  :name="`safeflex/benefit-${advantage}`"
                  width="144"
                  height="120"
                  class="fill-accent mb-16"
                  aria-hidden="true"
                />
                <p v-html="$t(`advantages.${advantage}`)"></p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <b-row>
          <b-col md="4" lg="5" class="text-center">
            <b-img-lazy
              :alt="$t('safeFlex.title')"
              srcset="/images/safeflex/product-1-sm.jpg 360w, /images/safeflex/product-1.jpg 500w"
              src="/images/safeflex/product-1.jpg"
              sizes="(max-width: 767px) 360px, 500px"
              class="img-fluid mb-24"
            />
          </b-col>
          <b-col md="8" lg="7" xl="5" class="text-md-right mb-24">
            <h2>{{ $t('safeFlex.title') }}</h2>
            <p class="mb-64" v-html="$t('safeFlex.description')"></p>

            <div class="mb-32">
              <b-row :cols="safeFlex.colors.length" class="d-inline-flex mx-n4">
                <b-col
                  v-for="color in safeFlex.colors"
                  :key="`color-sf-${color}`"
                  class="px-4"
                >
                  <div class="product-color" :style="colorStyles[color]">
                    <span class="sr-only">{{ $t(`colors.${color}`) }}</span>
                  </div>
                </b-col>
              </b-row>
            </div>

            <b-button :to="localePath(catalogLink)" variant="outline-black">
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
          <b-col xl="2" class="text-center">
            <b-row>
              <b-col
                v-for="i in safeFlex.advantages"
                :key="`advantage-sf-${i}`"
                :offset-lg="i === 1 ? 2 : 0"
                cols="6"
                sm="3"
                lg="2"
                xl="12"
                offset-xl="0"
              >
                <div class="product-benefit">
                  <div class="product-benefit-content">
                    <p class="mb-0" v-html="$t(`safeFlex.advantages.${i}`)"></p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <b-row>
          <b-col
            md="4"
            lg="5"
            order-md="2"
            order-xl="3"
            class="text-center text-xl-right"
          >
            <b-img-lazy
              :alt="$t('safeFlexAuto.title')"
              src="/images/safeflex/product-2.jpg"
              class="img-fluid mb-24"
            />
          </b-col>
          <b-col md="8" lg="7" xl="5" order-md="1" order-xl="2" class="mb-24">
            <h2>{{ $t('safeFlexAuto.title') }}</h2>
            <p class="mb-64" v-html="$t('safeFlexAuto.description')"></p>

            <div class="mb-32">
              <b-row
                :cols="safeFlexAuto.colors.length"
                class="d-inline-flex mx-n4"
              >
                <b-col
                  v-for="color in safeFlexAuto.colors"
                  :key="`color-sf-${color}`"
                  class="px-4"
                >
                  <div class="product-color" :style="colorStyles[color]">
                    <span class="sr-only">{{ $t(`colors.${color}`) }}</span>
                  </div>
                </b-col>
              </b-row>
            </div>

            <b-button :to="localePath(catalogLink)" variant="outline-black">
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
          <b-col xl="2" order-md="3" order-xl="1" class="text-center">
            <b-row>
              <b-col
                v-for="i in safeFlexAuto.advantages"
                :key="`advantage-sfa-${i}`"
                :offset-lg="i === 1 ? 2 : 0"
                cols="6"
                sm="3"
                lg="2"
                xl="12"
                offset-xl="0"
              >
                <div class="product-benefit">
                  <div class="product-benefit-content">
                    <p
                      class="mb-0"
                      v-html="$t(`safeFlexAuto.advantages.${i}`)"
                    ></p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-pro33">
      <b-container>
        <b-row>
          <b-col md="4" lg="5" class="mb-24">
            <div class="product-image">
              <b-img-lazy
                :alt="$t('safeFlexPro.title')"
                srcset="/images/safeflex/product-3-sm.png 360w, /images/safeflex/product-3.png 720w"
                src="/images/safeflex/product-3.png"
                sizes="(max-width: 767px) 360px, 720px"
              />
            </div>
          </b-col>
          <b-col md="8" lg="7" class="mb-24 overflow-hidden">
            <h2>{{ $t('safeFlexPro.title') }}</h2>
            <p class="mb-32" v-html="$t('safeFlexPro.description')"></p>
            <b-row class="font-size-2 lh-120 text-center mx-n16">
              <b-col
                v-for="i in safeFlexPro.advantages"
                :key="`advantage-sfp-${i}`"
                cols="6"
                md="auto"
                class="px-16"
              >
                <p v-html="$t(`safeFlexPro.advantages.${i}`)"></p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row class="font-weight-bold lh-120 text-center mb-32 mt-lg-24">
          <b-col
            v-for="advantage in safeFlexPro.advantageIcons"
            :key="`advantage-sfp-${advantage}`"
            cols="6"
            sm="4"
            xl="2"
          >
            <svg-icon
              :name="`safeflex/benefit-${advantage}`"
              width="144"
              height="120"
              class="fill-white mb-4"
              aria-hidden="true"
            />
            <p v-html="$t(`safeFlexPro.advantageIcons.${advantage}`)"></p>
          </b-col>
        </b-row>

        <div class="text-center">
          <b-button :to="localePath(catalogLink)" variant="outline-white">
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
      catalogLink: '/catalog/izolenta-professionalnaya-pv-safeflex',
      advantages: [
        'voltage',
        'temperature',
        'firesafety',
        'adhesion',
        'elasticity',
      ],
      colorStyles: {
        black: 'background-color: #000',
        blue: 'background-color: #2c1098',
        gray: 'background-color: #919191',
        green: 'background-color: #08ad36',
        greenYellow:
          'background-image: linear-gradient(to right, #08ad36 50%, #fff739 50% )',
        red: 'background-color: #e70000',
        white: 'border: 1px solid #000; background-color: #fff',
        yellow: 'background-color: #fff739',
      },
      safeFlex: {
        advantages: 4,
        colors: [
          'red',
          'greenYellow',
          'green',
          'yellow',
          'gray',
          'white',
          'blue',
          'black',
        ],
      },
      safeFlexAuto: {
        advantages: 4,
        colors: ['blue', 'black'],
      },
      safeFlexPro: {
        advantageIcons: [
          'voltage',
          'temperature',
          'firesafety',
          'adhesion',
          'elasticity',
          'endurance',
        ],
        advantages: 4,
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
$safeflex-accent: #4e32ca;

.page-landing-safeflex {
  background-image: url('/images/safeflex/background-top-sm.jpg'),
    linear-gradient(to top right, #c71d25, #a62743, #8f2e59, #663e80),
    linear-gradient(to top, #ac304a, #804074, transparent),
    url('/images/safeflex/background-bottom-sm.jpg'),
    linear-gradient(to top right, #4e50a3, #804074, #ae3048, #c02938);
  background-position: top left, top, bottom, bottom 400px center, bottom;
  background-repeat: no-repeat;
  background-size: auto, 100% 400px, 100% 1200px, auto, 100% 1600px;

  h2,
  .h2 {
    font-size: 1.875rem;
  }

  .btn {
    min-width: 8rem;
    border-radius: 0.625rem;
    border-width: 2px;

    &[class*='outline'] {
      &:not(:disabled):not(.disabled) {
        &:hover {
          color: $white;
          border-color: $safeflex-accent;
          background-color: $safeflex-accent;
        }
      }
    }
  }

  .fill-accent {
    fill: $safeflex-accent;
  }

  .product-benefit {
    display: block;
    position: relative;
    max-width: 120px;
    margin: 0 auto 0.5rem;
    font-size: $font-size-2;
    line-height: 1.2;
    text-align: center;

    strong {
      font-size: 1.25em;
    }

    &::before {
      display: block;
      content: '';
      padding-bottom: 100%;
    }

    .product-benefit-content {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 0.75rem;
      border-radius: $rounded-pill;
      color: $white;
      background-color: $safeflex-accent;
    }
  }

  .product-color {
    display: block;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: $rounded-pill;
  }

  .section {
    padding-bottom: 2rem;

    &.section-banner {
      min-height: 400px;
      padding-top: 2rem;
      color: $white;

      .banner-header {
        margin-bottom: 2rem;
        font-size: 1.625rem;

        strong {
          font-size: 2em;
        }
      }
    }

    &.section-pro33 {
      padding-bottom: 3.5rem;
      color: $white;

      .product-image {
        & > img {
          max-width: 100%;
          height: auto;
        }
      }
    }
  }

  @include media-breakpoint-up(sm) {
    background-image: url('/images/safeflex/background-top-md.jpg'),
      linear-gradient(to top right, #c71d25, #a62743, #8f2e59, #663e80),
      linear-gradient(to top, #ac304a, #804074, transparent),
      url('/images/safeflex/background-bottom-md.jpg'),
      linear-gradient(to top right, #4e50a3, #804074, #ae3048, #c02938);
    background-position: top, top, bottom, bottom, bottom;
    background-size: auto, 100% 440px, 100% 800px, auto, 100% 1600px;

    .section {
      &.section-banner {
        min-height: 440px;
        padding-top: 3rem;
      }
    }
  }

  @include media-breakpoint-up(md) {
    background-image: url('/images/safeflex/background-top-lg.jpg'),
      linear-gradient(to top right, #c71d25, #a62743, #8f2e59, #663e80),
      linear-gradient(to top, #ac304a, #804074, transparent),
      url('/images/safeflex/background-bottom-lg.jpg'),
      linear-gradient(to top right, #4e50a3, #804074, #ae3048, #c02938);
    background-position: top, top, bottom, bottom -160px center, bottom;
    background-size: auto, 100% 440px, 100% 800px, auto, 100% 1200px;

    .section {
      &.section-banner {
        .banner-header {
          font-size: 2rem;
        }
      }

      &.section-pro33 {
        padding-top: 5rem;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    background-image: url('/images/safeflex/background-top-xl.jpg'),
      linear-gradient(to top right, #c71d25, #a62743, #8f2e59, #663e80),
      linear-gradient(to top, #ac304a, #804074, transparent),
      url('/images/safeflex/background-bottom-xl.jpg'),
      linear-gradient(to top right, #4e50a3, #804074, #ae3048, #c02938);
    background-size: auto, 100% 600px, 100% 800px, auto, 100% 1200px;

    .section {
      &.section-banner {
        min-height: 580px;
        padding-top: 4rem;

        .banner-header {
          font-size: 2.75rem;
          margin-bottom: 3rem;
        }
      }

      &.section-pro33 {
        padding-top: 7rem;
      }
    }
  }

  @include media-breakpoint-up(xl) {
    background-image: url('/images/safeflex/background-top.jpg'),
      linear-gradient(to top right, #c71d25, #a62743, #8f2e59, #663e80),
      url('/images/safeflex/background-hand.png'),
      linear-gradient(to top, #ac304a, #804074, transparent),
      url('/images/safeflex/background-bottom.jpg'),
      linear-gradient(to top right, #4e50a3, #804074, #ae3048, #c02938);
    background-position: top, top, bottom 800px right -80px, bottom,
      bottom -320px center, bottom;
    background-size: auto, 100% 800px, auto, 100% 800px, auto, 100% 980px;

    h2,
    .h2 {
      font-size: 2.25rem;
    }

    .section {
      &.section-banner {
        min-height: 840px;
        padding-top: 5.5rem;

        .banner-header {
          font-size: 3.25rem;
        }
      }

      &.section-pro33 {
        padding-top: 8rem;

        .product-image {
          display: flex;
          justify-content: flex-end;

          & > img {
            flex: 0 0 auto;
            max-width: none;
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
      "adhesion": "High<br />adhesion",
      "elasticity": "Elongation at&nbsp;break is&nbsp;200% (10% more than required&nbsp;by&nbsp;GOST)",
      "firesafety": "Does not support<br />combustion",
      "temperature": "Operating temperature 10°&nbsp;C higher than standard",
      "title": "Advantages",
      "voltage": "6000V<br />breakdown voltage"
    },
    "colors": {
      "black": "Black",
      "blue": "Blue",
      "gray": "Gray",
      "green": "Green",
      "greenYellow": "Green-yellow",
      "red": "Red",
      "white": "White",
      "yellow": "Yellow"
    },
    "pageTitle": "SafeFlex professional electrical tape — EKF",
    "safeFlex": {
      "advantages": {
        "1": "Width<br /><strong>19&nbsp;mm</strong>",
        "2": "Tape length<br /><strong>20&nbsp;m</strong>",
        "3": "Film thickness<br /><strong>0,15&nbsp;mm</strong>",
        "4": "Adhesion<br /><strong>1,5&nbsp;N/cm</strong>"
      },
      "description": "SafeFlex electrical tape is highly elastic, strong and&nbsp;tacky. Use it to&nbsp;work with&nbsp;conductors: for&nbsp;electrical insulation, splicing and&nbsp;bundling, protection from&nbsp;damage and&nbsp;marking.<br />SafeFlex tape uses a&nbsp;rubber-based adhesive layer, which creates an&nbsp;adhesive bond of&nbsp;maximum strength almost instantly.<br />The&nbsp;thickness of&nbsp;the&nbsp;adhesive layer is&nbsp;15&nbsp;microns.",
      "title": "SafeFlex professional electrical tape"
    },
    "safeFlexAuto": {
      "advantages": {
        "1": "width<br /><strong>15nbsp;mm</strong>",
        "2": "Tape length<br /><strong>5&nbsp;m</strong>",
        "3": "Film thickness<br /><strong>0,15&nbsp;mm</strong>",
        "4": "Adhesion<br /><strong>1,5&nbsp;N/cm</strong>"
      },
      "description": "SafeFlex Auto has the&nbsp;same tack and&nbsp;strength properties as&nbsp;standard SafeFlex.<br />SafeFlex Auto is&nbsp;supplied in&nbsp;mini rollers (roller diameter 42&nbsp;mm), this size is&nbsp;much more convenient for&nbsp;electrical work in&nbsp;confined spaces, for&nbsp;example in&nbsp;a&nbsp;car.",
      "title": "SafeFlex Auto professional electrical tape"
    },
    "safeFlexPro": {
      "advantageIcons": {
        "adhesion": "High<br />adhesion",
        "elasticity": "Elongation at&nbsp;break is&nbsp;not less than 220%",
        "endurance": "Resistant to&nbsp;chemicals, acids, alkalis",
        "firesafety": "Does not support<br />combustion",
        "temperature": "Extended temperature range: -45°&nbsp;C to&nbsp;+105°&nbsp;C",
        "voltage": "6000V<br />breakdown voltage"
      },
      "advantages": {
        "1": "Tape length<br><strong class='fs-4'>20&nbsp;m</strong>",
        "2": "Width<br><strong class='fs-4'>19&nbsp;mm</strong>",
        "3": "Film thickness<br><strong class='fs-4'>0,18&nbsp;mm</strong>",
        "4": "Adhesion<br><strong class='fs-4'>2,5&nbsp;N/cm</strong>"
      },
      "description": "This premium tape is&nbsp;suitable for&nbsp;use in&nbsp;all environmental conditions.<br />SafeFlex&nbsp;Pro&nbsp;33+ electrical tape is&nbsp;significantly more elastic and&nbsp;adhesive than even standard SafeFlex.<br />It can be used in&nbsp;an&nbsp;increased temperature range: from&nbsp;–45°&nbsp;С to&nbsp;+ 105°&nbsp;С.<br />SafeFlex&nbsp;Pro&nbsp;33+ is&nbsp;highly resistant to&nbsp;abrasion, moisture, alkalis, acids, chemicals, corrosion and&nbsp;changing environmental conditions (including exposure to&nbsp;ultraviolet radiation).<br />Rolls of&nbsp;SafeFlex&nbsp;Pro&nbsp;33+ electrical tape are&nbsp;sold in&nbsp;round plastic boxes.",
      "title": "SafeFlex Pro 33+ professional electrical tape"
    },
    "title": "<strong>SafeFlex</strong><br />electrical tape&nbsp;&ndash;<br />the&nbsp;new standard<br />for&nbsp;professionals"
  },
  "ru": {
    "advantages": {
      "adhesion": "Высокая<br />адгезия",
      "elasticity": "Относительное удлинение при&nbsp;разрыве составляет 200% (на&nbsp;10%&nbsp;больше, чем по&nbsp;ГОСТ)",
      "firesafety": "Не&nbsp;поддерживает<br />горение",
      "temperature": "Температура эксплуатации на&nbsp;10°С выше, чем по&nbsp;стандарту",
      "title": "Преимущества",
      "voltage": "Напряжение<br />на&nbsp;пробой 6000В"
    },
    "colors": {
      "black": "Чёрный",
      "blue": "Синий",
      "gray": "Серый",
      "green": "Зелёный",
      "greenYellow": "Зелёно-жёлтый",
      "red": "Красный",
      "white": "Белый",
      "yellow": "Жёлтый"
    },
    "pageTitle": "Профессиональная ПВХ изолента SafeFlex",
    "safeFlex": {
      "advantages": {
        "1": "Ширина<br /><strong>19&nbsp;мм</strong>",
        "2": "Длина ленты<br /><strong>20&nbsp;м</strong>",
        "3": "Толщина плёнки<br /><strong>0,15&nbsp;мм</strong>",
        "4": "Адгезия<br /><strong>1,5&nbsp;Н/см</strong>"
      },
      "description": "Изолента SafeFlex отличается высокой эластичностью, прочностью и&nbsp;клейкостью. Используйте ее для&nbsp;работы с&nbsp;проводниками: для&nbsp;их электроизоляции, сращивания и&nbsp;жгутирования, защиты от&nbsp;повреждений и&nbsp;маркировки.<br />В&nbsp;изоленте SafeFlex используется клеевой слой на&nbsp;основе каучука, при&nbsp;котором адгезионная связь максимальной силы возникает практически моментально.<br />Толщина клеевого слоя&nbsp;– 15&nbsp;микрон.",
      "title": "Профессиональная изолента SafeFlex"
    },
    "safeFlexAuto": {
      "advantages": {
        "1": "Ширина<br /><strong>15nbsp;мм</strong>",
        "2": "Длина ленты<br /><strong>5&nbsp;м</strong>",
        "3": "Толщина плёнки<br /><strong>0,15&nbsp;мм</strong>",
        "4": "Адгезия<br /><strong>1,5&nbsp;Н/см</strong>"
      },
      "description": "SafeFlex Auto обладает теми&nbsp;же параметрами клейкости и&nbsp;надежности, что&nbsp;и&nbsp;стандартная SafeFlex.<br />SafeFlex Auto поставляется в&nbsp;мини-роликах (диаметр ролика 42&nbsp;мм), такой размер гораздо удобнее при&nbsp;электромонтажных работах в&nbsp;ограниченном пространстве, например в&nbsp;автомобиле.",
      "title": "Профессиональная изолента SafeFlex Auto"
    },
    "safeFlexPro": {
      "advantageIcons": {
        "adhesion": "Высокая<br />адгезия",
        "elasticity": "Относительное удлинение при&nbsp;разрыве составляет не&nbsp;менее 220%",
        "endurance": "Стойкость к&nbsp;химикатам, кислотам, щелочам",
        "firesafety": "Не&nbsp;поддерживает<br />горение",
        "temperature": "Увеличенный диапазон температур: от&nbsp;–45°C до&nbsp;+105°C",
        "voltage": "Напряжение на&nbsp;пробой 6000В"
      },
      "advantages": {
        "1": "Длина ленты<br><strong class='fs-4'>20&nbsp;м</strong>",
        "2": "Ширина<br><strong class='fs-4'>19&nbsp;мм</strong>",
        "3": "Толщина плёнки<br><strong class='fs-4'>0,18&nbsp;мм</strong>",
        "4": "Адгезия<br><strong class='fs-4'>2,5&nbsp;Н/см</strong>"
      },
      "description": "Эта изолента высшего класса пригодна для&nbsp;использования при&nbsp;любых условиях окружающей среды.<br />Изолента SafeFlex&nbsp;Pro&nbsp;33+&nbsp;– значительно более эластичная и&nbsp;клейкая по&nbsp;сравнению даже со&nbsp;стандартной SafeFlex.<br />Использовать ее можно в&nbsp;увеличенном диапазоне температур: от&nbsp;–45°С до&nbsp;+105°С.<br />SafeFlex&nbsp;Pro&nbsp;33+ обладает высокой устойчивостью к&nbsp;истиранию, воздействию влаги, щелочей, кислот, химикатов, коррозии и&nbsp;изменяющимся условиям окружающей среды (включая воздействие ультрафиолетового излучения).<br />Рулоны изоленты SafeFlex&nbsp;Pro&nbsp;33+ продаются в&nbsp;круглых пластиковых боксах.",
      "title": "Профессиональная изолента SafeFlex Pro 33+"
    },
    "title": "Изолента<br /><strong>SafeFlex</strong><br />Новый стандарт<br />для&nbsp;профессионалов"
  }
}
</i18n>
