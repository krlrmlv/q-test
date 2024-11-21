<template>
  <main class="page-landing-cline pb-32 pb-lg-64">
    <section class="section section-banner py-0">
      <picture>
        <source
          srcset="/images/c-line/banner-cline-sm.jpg"
          media="(max-width: 767px)"
        />
        <source
          srcset="/images/c-line/banner-cline-md.jpg"
          media="(max-width: 1199px)"
        />
        <source srcset="/images/c-line/banner-cline.jpg" />
        <img
          src="/images/c-line/banner-cline.jpg"
          class="banner-image"
          aria-hidden="true"
        />
      </picture>
      <div class="banner-text">
        <b-container class="h-100">
          <b-row class="h-100 align-items-md-center">
            <b-col md="8" lg="6">
              <h1 class="mb-24" v-html="$t('title')"></h1>
              <p class="fs-5 mb-32">{{ $t('description') }}</p>
              <b-button :to="localePath(catalogLink)" variant="primary">
                {{ $t('catalog.goToCatalog') }}
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </section>

    <section class="section">
      <b-container>
        <h2 class="mb-24">{{ $t('advantages.title') }}</h2>

        <b-row class="lh-120 mb-n24">
          <b-col sm="6" lg="4" class="mb-24">
            <b-img-lazy
              :alt="$t('advantages.depth')"
              src="/images/c-line/benefits-depth.jpg"
              class="img-fluid mb-16"
            />
            <p class="text-center mb-0 px-lg-24">
              {{ $t('advantages.depth') }}
            </p>
          </b-col>
          <b-col sm="6" lg="4" class="mb-24">
            <b-img-lazy
              :alt="$t('advantages.housing')"
              src="/images/c-line/benefits-firesafety.jpg"
              class="img-fluid mb-16"
            />
            <p class="text-center px-lg-24">
              {{ $t('advantages.housing') }}
            </p>
          </b-col>
          <b-col sm="6" lg="4" class="mb-24">
            <b-img-lazy
              :alt="$t('advantages.cover')"
              src="/images/c-line/benefits-cable-management.jpg"
              class="img-fluid mb-16"
            />
            <p class="text-center px-lg-24">
              {{ $t('advantages.cover') }}
            </p>
          </b-col>
          <b-col sm="6" lg="4" class="mb-24">
            <b-img-lazy
              :alt="$t('advantages.modular')"
              src="/images/c-line/benefits-legacy.jpg"
              class="img-fluid mb-16"
            />
            <p class="text-center px-lg-24">
              {{ $t('advantages.modular') }}<br />
              <small> <sup>*</sup>{{ $t('advantages.modularFootnote') }}</small>
            </p>
          </b-col>
          <b-col sm="6" lg="4" class="mb-24">
            <b-img-lazy
              :alt="$t('advantages.load')"
              src="/images/c-line/benefits-load.jpg"
              class="img-fluid mb-15"
            />
            <p class="text-center px-lg-24">
              {{ $t('advantages.load') }}
            </p>
          </b-col>
          <b-col sm="6" lg="4" class="mb-24">
            <b-img-lazy
              :alt="$t('advantages.capacity')"
              src="/images/c-line/benefits-capacity.jpg"
              class="img-fluid mb-16"
            />
            <p class="text-center px-lg-24">
              {{ $t('advantages.capacity') }}
            </p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section bg-gray-200 py-0">
      <b-container>
        <b-row no-gutters>
          <b-col md="4" class="d-none d-md-block">
            <b-img-lazy
              src="/images/c-line/c-line-12.jpg"
              class="img-fluid"
              alt="C-Line 12"
            />
          </b-col>
          <b-col md="7" offset-md="1" class="py-16 py-md-32">
            <h2 class="mb-24" v-html="$t('cLine12.title')"></h2>
            <b-img-lazy
              alt="C-Line 12"
              src="/images/c-line/c-line-12.jpg"
              class="img-fluid mb-24 d-md-none"
            />
            <p class="mb-24" v-html="$t('cLine12.description')"></p>
            <b-button
              :to="localePath(catalogLink)"
              variant="primary"
              class="px-24"
            >
              {{ $t('catalog.goToCatalog') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section">
      <b-container>
        <b-row>
          <b-col md="8" class="d-flex flex-column">
            <h2 class="mb-24" v-html="$t('cLine24.title')"></h2>
            <b-img-lazy
              src="/images/c-line/c-line-24.jpg"
              class="img-fluid mb-24 d-md-none"
              alt="C-Line 24"
            />
            <p class="mb-24" v-html="$t('cLine24.description')"></p>
            <b-button
              :to="localePath(catalogLink)"
              variant="primary"
              class="px-24 mr-auto"
            >
              {{ $t('catalog.goToCatalog') }}
            </b-button>
            <b-row class="mt-auto mb-16 mb-md-24">
              <b-col cols="6" md="3" class="mt-24">
                <b-img-lazy
                  src="/images/c-line/c-line-24-1.jpg"
                  class="img-fluid"
                  alt="C-Line 24"
                />
              </b-col>
              <b-col cols="6" md="3" class="mt-24">
                <b-img-lazy
                  src="/images/c-line/c-line-24-2.jpg"
                  class="img-fluid"
                  alt="C-Line 24"
                />
              </b-col>
              <b-col cols="6" md="3" class="mt-24">
                <b-img-lazy
                  src="/images/c-line/c-line-24-3.jpg"
                  class="img-fluid"
                  alt="C-Line 24"
                />
              </b-col>
              <b-col cols="6" md="3" class="mt-24">
                <b-img-lazy
                  src="/images/c-line/c-line-24-4.jpg"
                  class="img-fluid"
                  alt="C-Line 24"
                />
              </b-col>
            </b-row>
          </b-col>
          <b-col md="4" class="d-none d-md-block mb-24">
            <b-img-lazy
              src="/images/c-line/c-line-24.jpg"
              class="img-fluid"
              alt="C-Line 24"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section text-center bg-gray-200">
      <b-container>
        <b-row class="mb-n32">
          <b-col
            v-for="(benefit, index) in benefits"
            :key="`benefit-${index}`"
            cols="6"
            lg="3"
          >
            <div class="mb-16" aria-hidden="true">
              <img :src="`/images/c-line/${benefit.image}.svg`" width="64" />
            </div>
            <p class="mb-32">{{ $t(`benefits.${benefit.text}`) }}</p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section lh-120">
      <b-container>
        <b-row align-v="center">
          <b-col md="4" lg="6" class="d-none d-md-block">
            <b-img-lazy
              :alt="$t('blindCover.title')"
              src="/images/c-line/hatch.jpg"
              class="img-fluid"
            />
          </b-col>
          <b-col md="8" lg="6">
            <h2 class="text-center text-md-left mb-24">
              {{ $t('blindCover.title') }}
            </h2>
            <b-img-lazy
              :alt="$t('blindCover.title')"
              src="/images/c-line/hatch.jpg"
              class="img-fluid d-md-none mb-24"
            />
            <ul class="list-unstyled mb-0">
              <li class="mb-16">{{ $t('blindCover.description.1') }}</li>
              <li class="mb-16">{{ $t('blindCover.description.2') }}</li>
              <li>{{ $t('blindCover.description.3') }}</li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section text-center bg-gray-200">
      <b-container>
        <h2 class="mb-24">{{ $t('floor.title') }}</h2>
        <b-row class="mb-n24">
          <b-col md="4">
            <b-img-lazy
              :alt="$t('floor.carpet')"
              src="/images/c-line/floor-1.jpg"
              class="img-fluid mb-16"
            />
            <p class="mb-24">{{ $t('floor.carpet') }}</p>
          </b-col>
          <b-col md="4">
            <b-img-lazy
              :alt="$t('floor.linoleum')"
              src="/images/c-line/floor-2.jpg"
              class="img-fluid mb-16"
            />
            <p class="mb-24">{{ $t('floor.linoleum') }}</p>
          </b-col>
          <b-col md="4">
            <b-img-lazy
              :alt="$t('floor.parquet')"
              src="/images/c-line/floor-3.jpg"
              class="img-fluid mb-16"
            />
            <p class="mb-24">{{ $t('floor.parquet') }}</p>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section text-center">
      <b-container>
        <h2 class="mb-24">{{ $t('modules.title') }}</h2>
        <b-row>
          <b-col
            md="10"
            lg="8"
            xl="6"
            offset-md="1"
            offset-lg="2"
            offset-xl="3"
          >
            <b-img-lazy
              :alt="$t('modules.title')"
              :srcset="`/images/c-line/${$t(
                'modules.image'
              )}-sm.jpg 320w, /images/c-line/${$t('modules.image')}.jpg 540w`"
              :src="`/images/c-line/${$t('modules.image')}.jpg`"
              sizes="(max-width: 767px) 320px, 540px"
              class="img-fluid"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section fs-1 text-center lh-120 bg-gray-200">
      <b-container>
        <h2 class="mb-24">{{ $t('assortment.title') }}</h2>
        <b-row>
          <b-col lg="10" xl="8" offset-lg="1" offset-xl="2">
            <b-row class="mb-n24">
              <b-col
                v-for="(item, index) in assortment"
                :key="`assortment-${index}`"
                cols="6"
                md="3"
              >
                <b-img-lazy
                  :alt="$t(`assortment.${item.text}`)"
                  :src="`/images/c-line/${$t(item.image)}.jpg`"
                  class="img-fluid mb-16"
                />
                <p class="mb-24">{{ $t(`assortment.${item.text}`) }}</p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="section lh-120">
      <b-container class="text-center">
        <h2 class="mb-24">{{ $t('angularPlugs.title') }}</h2>
        <b-img-lazy
          :alt="$t('angularPlugs.title')"
          srcset="/images/c-line/plugs-sm.jpg 360w, /images/c-line/plugs.jpg 1140w"
          src="/images/c-line/plugs.jpg"
          sizes="(max-width: 575px) 360px, 1140px"
          class="img-fluid mb-24"
        />
        <b-row>
          <b-col xl="10" offset-xl="1">
            <p class="mb-24">
              {{ $t('angularPlugs.description') }}
            </p>
          </b-col>
        </b-row>
        <b-button :to="localePath(catalogLink)" variant="primary">
          {{ $t('catalog.goToCatalog') }}
        </b-button>
      </b-container>
    </section>
  </main>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'

export default {
  components: {
    BImgLazy,
  },
  data() {
    return {
      catalogLink: '/catalog/sistemy-organizacii-rabochi-mest-c-line',
      assortment: [
        { text: 'socketPro', image: 'socket-pro' },
        { text: 'socketProRed', image: 'socket-pro-red' },
        { text: 'socket', image: 'socket' },
        { text: 'socketRed', image: 'socket-red' },
        { text: 'socketRj45', image: 'socket-rj45' },
        { text: 'socketRj11', image: 'socket-rj11' },
        { text: 'socketTv', image: 'socket-tv' },
        { text: 'socketUsb', image: 'socket-usb' },
      ],
      benefits: [
        { image: 'flame-retardant', text: 'flameRetardant' },
        { image: 'halogen-free', text: 'halogenFree' },
        { image: 'cable-protection', text: 'cableProtection' },
        { image: 'easy-installation', text: 'easyInstallation' },
        { image: 'fasteners', text: 'fasteners' },
        { image: 'modular', text: 'modular' },
        { image: 'compatibility', text: 'compatibility' },
        { image: 'accessories', text: 'accessories' },
      ],
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
}
</script>

<style lang="scss">
.page-landing-cline {
  .section {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }

  .section-banner {
    position: relative;
    height: 670px;
    line-height: 1.4;
    color: $white;
    background-color: #444945;

    .banner-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right;
    }

    .banner-text {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      color: $white;
      background-image: linear-gradient(90deg, rgba($black, 0.5), transparent);
    }
  }

  @include media-breakpoint-up(md) {
    .section-banner {
      .banner-text {
        background-image: linear-gradient(
          90deg,
          rgba($black, 0.75),
          transparent
        );
      }
    }
  }

  @include media-breakpoint-up(lg) {
    .section {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
  }

  @include media-breakpoint-up(xl) {
    .section {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "advantages": {
      "capacity": "Up to 24 modules in a hatch",
      "cover": "The lid contains 2 hinged passages for leading cables out of the box and protecting them from kinking",
      "depth": "Planting depth no more than 7 mm for the finishing floor covering (carpet, linoleum, tiles)",
      "housing": "Flame retardant, halogen-free plastic housing",
      "load": "Floor hatches are designed to withstand loads of up to 153 kg",
      "modular": "Possibility to install classic* and modular devices",
      "modularFootnote": "only for C-Line 24 model",
      "title": "Advantages"
    },
    "angularPlugs": {
      "description": "The contact group of PRO sockets is located at an angle of 45 degrees, so that up to 24 modules can be installed in the hatch. Plugs do not cover adjacent sockets.",
      "title": "Plugs do not interfere with each other"
    },
    "assortment": {
      "socketPro": "PRO socket, white, 45°",
      "socketProRed": "PRO socket, red, 45°",
      "socket": "Straight socket, white",
      "socketRed": "Straight socket, red",
      "socketRj45": "RJ45 socket, category 5е","socketRj11": "RJ11 socket",
      "socketTv": "TV socket",
      "socketUsb": "USB socket, 2,1 А current (2 slots)",
      "title": "Wide range of accessories"
    },
    "benefits": {
      "flameRetardant": "Flame retardant plastic",
      "halogenFree": "Halogen free",
      "cableProtection": "Protection of wires from kinks",
      "easyInstallation": "Easy assembly",
      "fasteners": "Fasteners included",
      "modular": "Up to 24 modules ",
      "compatibility": "Can be installed in any floor: monolithic, raised floor, podium",
      "accessories": "Wide range of wiring accessories"
    },
    "blindCover": {
      "description": {
        "1": "Used as a junction box in the floor (without the possibility of installing a device frame)",
        "2": "Can be mounted in any C-Line floor box",
        "3": "Made of non-flammable, halogen-free plastic"
      },
      "title": "C-Line blind cover"
    },
    "cLine12": {
      "description": "The C-Line 12 hatch package already includes instrument frames for 12 modules and all the necessary fasteners. You just need to choose sockets that are installed with a simple click. For monolithic floors, you must also purchase a C-Line 12 floor box.",
      "title": "C-Line 12. Turnkey solution. Choose sockets and go"
    },
    "cLine24": {
      "description": "The C-Line 24 hatch is equipped with all the necessary fasteners. A wide range of frames allows you to install classic or modular wiring accessories. <strong>Up to 24 modules in a hatch.</strong>",
      "title": "C-Line 24. Complete freedom.<br />Build your own C-Line"
    },
    "description": "Complete set of products for organizing workplaces with electrical installation in concrete and double floors, as well as raised floors",
    "floor": {
      "carpet": "Carpeting",
      "linoleum": "Linoleum / laminate",
      "parquet": "Parquet / engineering board",
      "title": "Choose any floor"
    },
    "modules": {
      "image": "modules-en",
      "title": "EMP modular standard"
    },
    "pageTitle": "C-Line floor systems — EKF",
    "title": "C-Line floor systems"
  },
  "ru": {
    "advantages": {
      "capacity": "До 24 модулей в лючке",
      "cover": "Крышка содержит 2 откидных прохода для вывода кабелей из коробки и их защиты от перегибов",
      "depth": "Глубина посадки не более 7 мм для финишного напольного покрытия (ковролина, линолеума, плитки)",
      "housing": "Корпус из негорючего безгалогенового пластика",
      "load": "Конструкция напольных лючков выдерживает нагрузку до 153 кг",
      "modular": "Возможность установки классических* и модульных приборов",
      "modularFootnote": "только для модели C-Line 24",
      "title": "Преимущества"
    },
    "angularPlugs": {
      "description": "Контактная группа розеток PRO расположена под углом 45 градусов, благодаря чему в лючок можно установить до 24 модулей. Вилки не перекрывают соседние розетки.",
      "title": "Вилки не мешают друг другу"
    },
    "assortment": {
      "socketPro": "Розетка PRO, белая, 45°",
      "socketProRed": "Розетка PRO, красная, 45°",
      "socket": "Розетка белая прямая",
      "socketRed": "Розетка красная прямая",
      "socketRj45": "Розетка RJ45, категории 5е","socketRj11": "Розетка RJ11",
      "socketTv": "Розетка TV",
      "socketUsb": "Розетка USB, сила тока 2,1 А (2 гнезда)",
      "title": "Широкий выбор ЭУИ"
    },
    "benefits": {
      "flameRetardant": "Из негорючего пластика",
      "halogenFree": "Не содержат галогенов",
      "cableProtection": "Защита проводов от перегибов",
      "easyInstallation": "Легкий монтаж",
      "fasteners": "Крепеж в комплекте",
      "modular": "До 24 модулей",
      "compatibility": "Можно установить в любой пол: монолитный, фальш-пол, подиум",
      "accessories": "Широкий выбор ЭУИ"
    },
    "blindCover": {
      "description": {
        "1": "Используется в качестве распределительной коробки в полу (без возможности установки приборной рамки)",
        "2": "Может монтироваться в любую напольную коробку C-Line",
        "3": "Из негорючего безгалогенового пластика"
      },
      "title": "Лючок C-Line глухой"
    },
    "cLine12": {
      "description": "В комплектацию Лючка C-Line 12 уже входят приборные рамки на 12 модулей и весь необходимый крепеж. Необходимо лишь выбрать розетки, которые устанавливаются простым защелкиванием. Для монолитных полов необходимо также приобрести напольную коробку под лючок C-Line 12.",
      "title": "C-Line 12. Решение «под ключ». Выбирай розетки и вперед"
    },
    "cLine24": {
      "description": "Лючок C-Line 24 укомплектован всем необходимым крепежом. Широкий выбор рамок позволяет установить классические или модульные ЭУИ. <strong>До 24 модулей в лючке.</strong>",
      "title": "C-Line 24. Полная свобода.<br />Cобери свой C-Line"
    },
    "description": "Полный комплект продукции для организации рабочих мест с установкой электрического подключения в бетонных и двойных, а также фальшполах",
    "floor": {
      "carpet": "Ковролин",
      "linoleum": "Линолеум/ламинат",
      "parquet": "Паркет/инженерная доска",
      "title": "Выбирай любой пол"
    },
    "modules": {
      "image": "modules",
      "title": "ЭМИ модульный стандарт"
    },
    "pageTitle": "Напольные системы C-Line — EKF",
    "title": "Напольные системы<br />C-Line"
  }
}
</i18n>
