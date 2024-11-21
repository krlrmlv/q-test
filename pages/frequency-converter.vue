<template>
  <main class="page-landing-frequency-converter">
    <section class="section section-banner">
      <b-container>
        <b-row>
          <b-col md="7" lg="6" xl="7" class="d-flex flex-column">
            <h1 class="banner-header text-uppercase">{{ $t('title') }}</h1>
            <p class="banner-subheader">{{ $t('subtitle') }}</p>
            <b-row class="banner-links">
              <b-col cols="auto" xl="4">
                <b-button
                  :to="localePath(catalogLink)"
                  variant="outline-white"
                  block
                >
                  {{ $t('catalog.goToCatalog') }}
                </b-button>
              </b-col>
              <b-col cols="auto" xl="4">
                <b-button
                  :to="localePath('/support/feedback')"
                  variant="outline-white"
                  block
                >
                  {{ $t('service') }}
                </b-button>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="5" lg="6" xl="5" class="text-center">
            <div class="banner-image-wrapper">
              <b-img-lazy
                :alt="`EKF ${$t('title')}`"
                srcset="/images/frequency-converter/banner-sm.png 360w, /images/frequency-converter/banner.png 485w"
                src="/images/frequency-converter/banner.png"
                sizes="(max-width: 767px) 360px, 485px"
                class="img-fluid"
              />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section py-md-0">
      <b-container>
        <div class="d-md-none">
          <b-img-lazy
            :alt="$t('advantages.title')"
            src="/images/frequency-converter/benefits-sm.svg"
            class="img-fluid mb-24"
          />
          <ul class="list-benefits">
            <li>{{ $t('advantages.controlPanel') }}</li>
            <li>{{ $t('advantages.fanMount') }}</li>
            <li>{{ $t('advantages.controlBoard') }}</li>
            <li>{{ $t('advantages.varnish') }}</li>
            <li>{{ $t('advantages.convection') }}</li>
            <li>{{ $t('advantages.powerBoard') }}</li>
          </ul>
        </div>
        <b-row class="d-none d-md-flex">
          <b-col xl="10" offset-xl="1">
            <b-aspect :aspect="1.6">
              <b-img-lazy
                :src="`/images/frequency-converter/${$t('advantages.image')}`"
                :alt="$t('advantages.title')"
                class="img-fluid"
              />
            </b-aspect>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-usage">
      <b-container>
        <b-row align-v="center">
          <b-col md="6" lg="8" xl="7" offset-xl="1">
            <h2 class="mb-24">{{ $t('usage.title') }}</h2>
            <p class="mb-16 fs-3" v-html="$t('usage.description.p')"></p>
            <ul class="pl-16 mb-24 fs-3">
              <li class="mb-8">{{ $t('usage.description.li1') }}</li>
              <li class="mb-8">{{ $t('usage.description.li2') }}</li>
              <li class="mb-8">{{ $t('usage.description.li3') }}</li>
              <li class="mb-8">{{ $t('usage.description.li4') }}</li>
              <li class="mb-8">{{ $t('usage.description.li5') }}</li>
              <li class="mb-8">{{ $t('usage.description.li6') }}</li>
            </ul>
          </b-col>
          <b-col md="6" lg="4">
            <b-img-lazy
              :alt="$t('usage.alt')"
              src="/images/frequency-converter/usage.png"
              class="img-fluid"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <b-row>
          <b-col md="6">
            <youtube-embed video-id="My60jNehn-w" class="mb-16 mb-md-0">
              <p class="h5 text-center embed-thumbnail-caption">
                {{ $t('video.1') }}
              </p>
            </youtube-embed>
          </b-col>
          <b-col md="6">
            <youtube-embed video-id="vYDA242DSjs" class="mb-16 mb-md-0">
              <p class="h5 text-center embed-thumbnail-caption">
                {{ $t('video.2') }}
              </p>
            </youtube-embed>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section section-links">
      <b-container>
        <b-row align-v="center">
          <b-col lg="3" offset-xl="1" order="2" order-lg="1">
            <b-row class="mx-n8">
              <b-col
                v-for="(link, index) in rightLinks"
                :key="link.key"
                :offset-lg="index % 2 === 0 ? 4 : 0"
                lg="12"
                class="px-8"
              >
                <div class="section-links-item">
                  <b-link
                    :href="
                      link.link
                        ? link.link
                        : `/files/frequency-converter/${link.key}.pdf`
                    "
                    target="_blank"
                    class="section-links-link"
                  >
                    <svg-icon
                      name="arrow-download-16"
                      width="24"
                      height="24"
                      aria-hidden="true"
                    />
                    <span class="caption">{{ $t(`links.${link.key}`) }}</span>
                  </b-link>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="5" xl="4" order="1" order-lg="2">
            <b-img-lazy
              src="/images/frequency-converter/links-image.png"
              class="img-fluid my-24 pl-lg-40"
              aria-hidden="true"
            />
          </b-col>
          <b-col lg="3" order="3" order-lg="3">
            <b-row class="mx-n8">
              <b-col
                v-for="(link, index) in leftLinks"
                :key="link.key"
                :offset-lg="index % 2 === 0 ? 0 : 4"
                lg="12"
                class="px-8"
              >
                <div class="section-links-item">
                  <b-link
                    :href="link.link"
                    target="_blank"
                    class="section-links-link"
                  >
                    <svg-icon
                      name="arrow-download-16"
                      width="24"
                      height="24"
                      aria-hidden="true"
                    />
                    <span class="caption">{{ $t(`links.${link.key}`) }}</span>
                  </b-link>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
      <svg
        width="0"
        height="0"
        version="1.1"
        viewBox="0 0 1 1"
        xmlns="http://www.w3.org/2000/svg"
        style="position: absolute; opacity: 0"
      >
        <clipPath id="hex" clipPathUnits="objectBoundingBox">
          <path
            d="m0.94397 0.76331-0.40794 0.20816a0.072063 0.063691 0 0 1-0.072063 0l-0.40794-0.20816a0.072063 0.063691 0 0 1-0.036029-0.055156v-0.41631a0.072063 0.063691 0 0 1 0.036029-0.055156l0.40794-0.20816a0.072063 0.063691 0 0 1 0.072063 0l0.40794 0.20816a0.072063 0.063691 0 0 1 0.036029 0.055156v0.41631a0.072063 0.063691 0 0 1-0.03603 0.055156z"
          />
        </clipPath>
      </svg>
    </section>

    <section class="section my-lg-48">
      <b-container>
        <CardCollapse
          :title="instructionsTitle"
          class="mb-16"
          @toggle-collapse="$emit('toggle-collapse')"
        >
          <b-link
            v-for="(item, index) in instructions"
            :key="`doc-${index}`"
            :href="`/files/frequency-converter/instructions/${
              item.file
            }.${item.type.toLowerCase()}`"
            class="media text-reset mb-8"
          >
            <div class="media-aside align-self-start text-primary mr-8">
              <svg-icon
                :name="`file/${item.type.toString().toLowerCase()}-24`"
                width="24"
                height="24"
              />
            </div>
            <div class="media-body">
              <p class="mb-0">
                {{ item.description }}
                <span v-if="item.type || item.size" class="text-muted"
                  >({{ [item.type, item.size + ' Кб'].join(', ') }})</span
                >
              </p>
            </div>
          </b-link>
        </CardCollapse>

        <CardCollapse
          :title="templatesTitle"
          @toggle-collapse="$emit('toggle-collapse')"
        >
          <b-link
            v-for="(item, index) in templates"
            :key="`doc-${index}`"
            :href="`/files/frequency-converter/templates/${
              item.file
            }.${item.type.toLowerCase()}`"
            class="media text-reset mb-8"
          >
            <div class="media-aside align-self-start text-primary mr-8">
              <svg-icon
                :name="`file/${item.type.toString().toLowerCase()}-24`"
                width="24"
                height="24"
              />
            </div>
            <div class="media-body">
              <p class="mb-0">
                {{ item.description }}
                <span v-if="item.type || item.size" class="text-muted"
                  >({{ [item.type, item.size + ' Кб'].join(', ') }})</span
                >
              </p>
            </div>
          </b-link>
        </CardCollapse>
      </b-container>
    </section>

    <section class="section section-light py-lg-96">
      <b-container>
        <b-row>
          <b-col lg="10" xl="8" offset-lg="1" offset-xl="2">
            <h3 class="mb-24">{{ $t('feedback.title') }}</h3>

            <p class="fs-3 mb-32">
              {{ $t('feedback.description') }}
            </p>

            <FormFeedback
              :code="282"
              :mindbox-custom-fields="mindboxCustomFields"
            />
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
  data() {
    return {
      instructionsTitle: 'Краткие инструкции по настройке преобразователей',
      instructions: [
        {
          description: 'Базовые настройки двигателя',
          type: 'PDF',
          size: '105',
          file: 'base',
        },
        {
          description:
            'Варианты двухпроводного и трехпроводного управления преобразователем через клеммы',
          type: 'PDF',
          size: '183',
          file: 'variants',
        },
        {
          description: 'Коммуникация по Modbus',
          type: 'PDF',
          size: '197',
          file: 'communications',
        },
        {
          description: 'Настройка работы по встроенному упрощенному ПЛК',
          type: 'PDF',
          size: '146',
          file: 'plk',
        },
        {
          description:
            'Настройка работы по ПИД регулятору для поддержания давления',
          type: 'PDF',
          size: '234',
          file: 'pid-pressure',
        },
        {
          description:
            'Настройка работы по ПИД регулятору для поддержания давления_Proxima',
          type: 'PDF',
          size: '172',
          file: 'pid-pressure-proxima',
        },
        {
          description:
            'Настройка работы по ПИД регулятору для поддержания температуры',
          type: 'PDF',
          size: '235',
          file: 'pid-temperature',
        },
        {
          description: 'Настройка работы по ступенчатому заданию',
          type: 'PDF',
          size: '191',
          file: 'setting',
        },
        {
          description:
            'Организация переключения между ручным и автоматическим режимом',
          type: 'PDF',
          size: '104',
          file: 'organization',
        },
        {
          description: 'Подключение нескольких двигателей',
          type: 'PDF',
          size: '110',
          file: 'plug-in',
        },
        {
          description:
            'Управление преобразователем кнопками и потенциометром на панели',
          type: 'PDF',
          size: '136',
          file: 'potentiometer',
        },
        {
          description:
            'Управление преобразователем при помощи внешних сигналов',
          type: 'PDF',
          size: '159',
          file: 'external-signals',
        },
      ],
      mindboxCustomFields: {
        formName: 'Оставить заявку - форма в футере',
        EKFFormID: 'ostavit_zayavku_forma_v_futere',
      },
      templatesTitle: 'Шаблоны по интеграции',
      templates: [
        {
          description: 'Прошивки PRO-Screen для VECTOR-100',
          type: 'ZIP',
          size: '17 383',
          file: 'vector',
        },
        {
          description: 'Vector100 Node red',
          type: 'JSON',
          size: '66',
          file: 'vector100',
        },
        {
          description: 'Основные параметры для связи с ПЧ arOPC',
          type: 'CFX',
          size: '19',
          file: 'common-param',
        },
        {
          description: 'Программа для общения по Modbus Vector-100 ProLogic',
          type: 'GPC',
          size: '3',
          file: 'modbus',
        },
      ],
      visible: {
        type: Boolean,
        default() {
          return false
        },
      },
      accordion: {
        type: String,
        default: null,
      },
      appear: {
        type: Boolean,
        default() {
          return false
        },
      },
      catalogLink: '/catalog/preobrazovateli-chastoty',
      rightLinks: [
        {
          key: 'manual',
        },
        {
          key: 'configurator',
          link: '/uploads/products/73B834729E38711A3A1E681509F92BE2.zip',
        },
        {
          key: 'passport',
          link: '/uploads/products/576098A8F2E0DD75F74D8E2F54E893B2.pdf',
        },
      ],
      leftLinks: [
        {
          key: 'catalog',
          link: '/uploads/products/FFE9D85B87AD1C0439E3C2AC6C7E5934.pdf',
        },
        {
          key: 'model',
          link: '/uploads/products/B24831F76C1BE55FB4B4BE71941A97E8.7z',
        },
        {
          key: 'certificate',
          link: '/uploads/products/C8F1DEAB32962635946E6A4B7D8BF87D.pdf',
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
.page-landing-frequency-converter {
  line-height: 1.2;
  background-image: url('/images/frequency-converter/main-bg.svg');
  background-position: top;
  background-repeat: no-repeat;
  background-size: auto;

  .card-collapse {
    .card-header {
      font-size: $font-size-5;
    }
    .card-body {
      padding: 1rem 0;
      .media {
        .media-body {
          flex: 1;
          display: flex;
          align-self: flex-end;
        }
      }
      svg {
        fill: $secondary;
      }
    }
  }

  .section {
    padding-top: 2rem;
    padding-bottom: 2rem;

    &.section-light {
      background-color: #f8f9fa;
    }

    &.section-banner {
      padding-bottom: 0;
      color: $white;
      background-image: url('/images/frequency-converter/banner-bg.svg');
      background-position: left -700px top;
      background-repeat: no-repeat;
      background-size: cover;

      .banner-subheader {
        margin-bottom: 2rem;
        font-size: 1.25rem;
      }

      .banner-links {
        margin-bottom: 3rem;
      }

      .banner-image-wrapper {
        min-height: 435px;
      }
    }

    &.section-usage {
      background-image: url('/images/frequency-converter/usage-bg.svg');
      background-position: left -800px center;
      background-repeat: no-repeat;
      background-size: auto 100%;
    }

    &.section-links {
      .section-links-link {
        display: flex;
        margin-bottom: 1rem;
        color: $body-color;

        .icon {
          flex: 0 0 auto;
          margin-right: 0.5rem;
          transition: $transition-base;
        }

        .caption {
          align-self: center;
        }

        &:hover {
          text-decoration: none;
          color: $primary;
        }
      }
    }
  }

  .list-benefits {
    list-style: none;
    margin-bottom: 1rem;
    padding: 0;
    font-size: $font-size-2;
    font-weight: $font-weight-medium;
    text-transform: uppercase;

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
        background-image: linear-gradient($primary, darken($primary, 25%));
      }
    }
  }

  @include media-breakpoint-up(md) {
    .section {
      &.section-banner {
        padding-top: 4rem;
        background-position: left -200px top;
        background-size: auto 100%;

        .banner-links {
          margin-top: auto;
          margin-bottom: auto;
        }

        .banner-image-wrapper {
          min-height: 360px;
        }
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      &.section-banner {
        background-position: left -600px top;

        .banner-header {
          margin-top: 2rem;
          margin-bottom: 2rem;
          font-size: 2.75rem;
        }

        .banner-subheader {
          font-size: 2rem;
          margin-bottom: 3rem;
        }

        .banner-links {
          margin-top: auto;
          margin-bottom: auto;
        }

        .banner-image-wrapper {
          min-height: 600px;
        }
      }

      &.section-usage {
        font-size: $font-size-4;
        background-position: left -400px center;
      }

      &.section-links {
        .section-links-item {
          position: relative;
          margin-top: calc(-12.5% + 1rem);
          margin-bottom: calc(-12.5% + 1rem);
          width: 200px;
          height: 200px;

          &::before {
            display: block;
            content: '';
            padding-bottom: 102.5%;
          }
        }

        .section-links-link {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          max-width: 100%;
          height: 100%;
          text-align: center;
          color: $white;
          filter: drop-shadow(0 0.125rem 0.125rem rgba($black, 0.35));
          overflow: hidden;
          transition: $transition-base;
          z-index: 0;

          &::before {
            display: block;
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #9a0101;
            background-image: linear-gradient(#d20101, #620202);
            clip-path: url('#hex');
            transform: scale(1);
            transition: $transition-base;
            z-index: -1;
          }

          .icon {
            position: absolute;
            left: 50%;
            bottom: 2rem;
            margin: 0;
            transform: translateX(-50%);
          }

          .caption {
            align-self: center;
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }

          &:hover {
            color: $white;
            filter: drop-shadow(0 0.375rem 0.5rem rgba($black, 0.35));

            &::before {
              transform: scale(1.025);
            }
          }
        }
      }
    }
  }

  @include media-breakpoint-up(xl) {
    .section {
      &.section-banner {
        background-position: left calc(50vw - 1100px) top;

        .banner-header {
          margin-bottom: 3rem;
          font-size: 3.75rem;
        }

        .banner-subheader {
          font-size: 2.25rem;
        }

        .banner-links {
          margin-top: auto;
          margin-bottom: auto;
        }
      }

      &.section-usage {
        padding: 6rem 0;
        background-position: center;
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "advantages": {
      "controlBoard": "Control board",
      "controlPanel": "2 lines control panel",
      "convection": "The arrangement of containers does not interfere with air convection",
      "fanMount": "Fan mount, easy to remove for replacement, standard size",
      "image": "benefits-en.svg",
      "powerBoard": "Power board",
      "title": "Advantages of EKF frequency converters",
      "varnish": "The boards are varnished"
    },
    "feedback": {
      "description": "If you have not found the answer to your question, write to us through the feedback form, and EKF specialist will promptly contact you to help.",
      "title": "Submit a request for frequency converters"
    },
    "links": {
      "catalog": "Catalog",
      "certificate": "Certificate",
      "configurator": "VECTOR frequency converter configurator",
      "leaflet": "Leaflet",
      "manual": "User guide",
      "model": "3D model",
      "passport": "Passport"
    },
    "pageTitle": "Frequency converters — EKF",
    "service": "Service centers",
    "subtitle": "Save up to 70% of resources consumed in production",
    "title": "Frequency converters",
    "usage": {
      "alt": "Application of EKF frequency converters",
      "description": {
        "li1": "smooth start of the electric motor;",
        "li2": "regulation of the motor frequency;",
        "li3": "overload protection of the electric motor;",
        "li4": "reduction of starting currents;",
        "li5": "conversion of a single-phase network to a three-phase one (single-phase converters).",
        "p": "General industrial frequency converters VEKTOR EKF PROxima are used in ventilation automation systems, pumping equipment, in electric drives of conveyors, elevators, etc.<br /> They provide:"
      },
      "title": "Application"
    },
    "video": {
      "1": "Configuring the frequency converter for terminal operation (in Russian)",
      "2": "Basic setup of the EKF VECTOR-100 frequency converter. Electric motor connection (in Russian)"
    }
  },
  "ru": {
    "advantages": {
      "controlBoard": "Контрольная плата",
      "controlPanel": "2 строки на панели управления",
      "convection": "Расположение емкостей не мешает конвекции воздуха",
      "fanMount": "Крепление вентилятора, снимается для замены просто, стандартный размер",
      "image": "benefits.png",
      "powerBoard": "Силовая плата",
      "title": "Преимущества преобразователей частоты EKF",
      "varnish": "Платы покрыты лаком"
    },
    "feedback": {
      "description": "Если Вы не нашли ответ на интересующий Вас вопрос, напишите нам через форму обратной связи, и специалист EKF оперативно свяжется с вами, чтобы помочь.",
      "title": "Оставить заявку по преобразователям частоты"
    },
    "links": {
      "catalog": "Мастер-каталог",
      "certificate": "Сертификат",
      "configurator": "Конфигуратор для преобразователя частоты VECTOR",
      "leaflet": "Листовка",
      "manual": "Руководство пользователя",
      "model": "3D модель",
      "passport": "Паспорт"
    },
    "pageTitle": "Преобразователи частоты — EKF",
    "service": "Сервисные центры",
    "subtitle": "Экономьте до 70% потребляемых ресурсов на производстве",
    "title": "Преобразователи частоты",
    "usage": {
      "alt": "Применение преобразователей частоты EKF",
      "description": {
        "li1": "регулирование частоты вращения электродвигателя",
        "li2": "защиту электродвигателя от перегрузок и перепадов питающей сети",
        "li3": "уменьшение пусковых токов",
        "li4": "повышение энергоэффективности оборудование и снижение износа механических частей",
        "li5": "возможность организовать поддержание оптимальных технологических параметров (давление или температура)",
        "li6": "преобразование однофазной сети в трехфазную (однофазные преобразователи)",
        "p": "Общепромышленные преобразователи частоты VEKTOR – 100 EKF применяются в системах автоматизации  для вентиляции, насосного оборудования, в системах электроприводов конвейеров  и общего технологического оборудования. <br /> <br />Обеспечивают:"
      },
      "title": "Применение"
    },
    "video": {
      "1": "Настройка частотного преобразователя для работы с клемм",
      "2": "Базовые настройки преобразователя частоты VECTOR-100 от EKF. Подключение электродвигателя"
    }
  }
}
</i18n>
