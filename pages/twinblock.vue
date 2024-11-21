<template>
  <main class="page-landing page-landing-twinblock">
    <section class="section section-banner">
      <b-container>
        <b-row>
          <b-col md="6" xl="5">
            <p class="h4 banner-subheader" v-html="$t('banner.subheader')"></p>
            <h1 class="banner-header" v-html="$t('banner.header')"></h1>
            <b-row>
              <b-col cols="auto" class="mb-48">
                <b-button
                  href="/catalog/vyklyuchateli-razediniteli-rubilniki-twinblock-do-1600a-ekf-proxima"
                  variant="outline-white"
                  block
                  v-html="$t('buttons.tocatalog')"
                >
                </b-button>
              </b-col>
              <!-- <b-col cols="auto" class="mb-48">
                <SeoLink
                  href="https://ims3.ekf.su/hasura/catalog/1cb4c38e-4e53-11e6-b98c-000c29c6d5f2"
                  target="_blank"
                  class="btn btn-outline-white btn-block"
                >
                  {{ $t('buttons.toknowmoreims3') }}
                </SeoLink>
              </b-col> -->
            </b-row>
          </b-col>
          <b-col md="6" xl="7">
            <b-aspect :aspect="1.37">
              <b-img-lazy
                srcset="/images/twinblock/main-sm.png 360w, /images/twinblock/main.png 658w"
                src="/images/twinblock/main.png"
                sizes="(max-width: 575px) 360px, 658px"
                class="img-fluid"
                alt="Выключатель-разъединитель TwinBlock реверсивный 40А"
              />
            </b-aspect>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section font-size-4 lh-120 pb-lg-48">
      <b-container>
        <h2 class="h3 text-uppercase mb-48" v-html="$t('title')"></h2>
        <p class="mb-0" v-html="$t('text1.1')"></p>
        <p class="mb-0" v-html="$t('text1.2')"></p>
        <p class="mb-0" v-html="$t('text1.3')"></p>
        <p class="mb-56" v-html="$t('text1.4')"></p>
        <b-row align-v="center" class="mt-lg-48 mt-xl-64">
          <b-col md="6" class="text-center mb-48">
            <b-img-lazy
              srcset="/images/twinblock/twinblock-40a-sm.png 300w, /images/twinblock/twinblock-40a.png 400w"
              src="/images/twinblock/twinblock-40a.png"
              sizes="(max-width: 767px) 300px, 400px"
              class="img-fluid"
              alt="Выключатель-разъединитель TwinBlock 40А"
            />
          </b-col>
          <b-col md="6" class="text-md-right mb-48">
            <p v-html="$t('quote.text')"></p>
            <p class="font-size-2 mb-48" v-html="$t('quote.author')"></p>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
import { BAspect, BImgLazy } from 'bootstrap-vue'
import sendToMindbox from '@/utils/mindbox'

export default {
  components: {
    BAspect,
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

<style lang="scss">
.page-landing-twinblock {
  color: $white;
  background-color: #0d4b7e;
  background-image: url('/images/twinblock/bg-lines.svg'),
    url('/images/twinblock/bg-dots.svg'), url('/images/twinblock/bg-dots.svg'),
    url('/images/twinblock/bg-lines.svg'), linear-gradient(#0d4b7e, #5eacbb);
  background-position: left 750px top 275px, left 90px top 520px,
    left 1650px top 1055px, left -380px top 1120px, center center;
  background-repeat: no-repeat;
  background-size: auto;

  .section {
    padding-top: 2rem;

    &.section-banner {
      .banner-header {
        margin-bottom: 3rem;
        text-transform: uppercase;
      }

      .banner-subheader {
        margin-bottom: 0.75rem;
        font-size: $font-size-3;
        text-transform: uppercase;
        opacity: 0.5;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      &.section-banner {
        padding-top: 4rem;

        .banner-header {
          font-size: 3.875rem;
        }

        .banner-subheader {
          font-size: 1.375rem;
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    .section {
      &.section-banner {
        padding-top: 7rem;
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "banner": {
      "subheader": "Switch disconnectors for&nbsp;40 and&nbsp;63A",
      "header": "New TwinBlock from&nbsp;EKF"
    },
    "buttons": {
      "tocatalog": "To&nbsp;catalog",
      "toknowmoreims3": "More in IMS3"
    },
    "pageTitle": "New TwinBlock from EKF",
    "title": "TwinBlock from&nbsp;EKF",
    "text1": {
      "1": "The model range of TwinBlock switches-disconnectors (knife switches) from&nbsp; EKF has been replenished with the next novelties&nbsp; - devices designed for & nbsp; rated current 40 and&nbsp;63A.",
      "2": "The switches are available as &nbsp;in &nbsp;standard, and&nbsp;and &nbsp;in&nbsp;reversible and&nbsp;have pre-installed control knobs.",
      "3": "TwinBlock&nbsp;- three-phase switches designed for&nbsp;manual switching on and&nbsp;switching off electrical circuits. Devices with&nbsp;reverse switching allow you to connect the consumer to a&nbsp;spare power source.",
      "4": "The new circuit breakers ensure the fastest possible switching. For&nbsp;this in&nbsp;they have implemented a function, with&nbsp; which the speed of activation / deactivation does not  depend on the speed of movement of the operator's hand"
    },
    "quote": {
      "text": "«EKF produces a wide range of TwinBlock switch-disconnectors, which are demanded for their high reliability. Previously, we offered switches for&nbsp;currents from&nbsp;80to&nbsp;1600A. But since the market also needs high-quality devices with  lower ratings, we have expanded the line with devices by&nbsp;40and&nbsp;63A. Compact, easy-to-use switches will become an effective tool for managing electrical circuits»,",
      "author": "- noted Dmitry Kucherov, Head of Strategic Development Department at EKF."
    }
  },
  "ru": {
    "banner": {
      "subheader": "Выключатели-разъединители на&nbsp;40&nbsp;и&nbsp;63А",
      "header": "Новые TwinBlock от&nbsp;EKF"
    },
    "buttons": {
      "tocatalog": "В&nbsp;каталог",
      "toknowmoreims3": "Подробнее в IMS3"
    },
    "pageTitle": "Новые TwinBlock от компании EKF",
    "title": "TwinBlock от&nbsp;EKF",
    "text1": {
      "1": "Модельный ряд выключателей-разъединителей (рубильников) TwinBlock от&nbsp EKF пополнился очередными новинками&nbsp;– устройствами, рассчитанными на&nbsp;номинальный ток 40 и&nbsp;63А.",
      "2": "Рубильники выпускаются как&nbsp;в&nbsp;стандартном, так&nbsp;и&nbsp;в&nbsp;реверсивном исполнении и&nbsp;имеют предустановленные рукоятки управления.",
      "3": "TwinBlock&nbsp;– трехфазные рубильники, предназначенные для&nbsp;ручного включения и&nbsp;отключения электрических цепей. Аппараты с&nbsp;реверсивным переключением позволяют подключать потребителя к&nbsp;запасному источнику питания.",
      "4": "Новые рубильники обеспечивают максимально быстрое переключение. Для&nbsp;этого в&nbsp;них реализована функция, при&nbsp;которой скорость включения/отключения не&nbsp;зависит от&nbsp;скорости движения руки оператора."
    },
    "quote": {
      "text": "«Компания EKF выпускает широкую линейку выключателей-разъединителей TwinBlock, востребованных в&nbsp;силу своей высокой надежности. Раньше мы предлагали рубильники на&nbsp;токи от&nbsp;80 до&nbsp;1600А. Но&nbsp;поскольку на&nbsp;рынке необходимы и&nbsp;качественные аппараты с&nbsp;меньшими номиналами, мы расширили линейку устройствами на&nbsp;40 и&nbsp;63А. Компактные, удобные в&nbsp;использовании рубильники станут эффективным инструментом управления электрическими цепями»,",
      "author": " – отметил руководитель департамента<br /> стратегического развития EKF Дмитрий&nbsp;Кучеров."
    }
  }
}
</i18n>
