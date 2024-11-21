<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h1 class="text-lg-center" v-html="$t('pageHeader')" />

    <b-row class="justify-content-center">
      <b-col xl="11">
        <p class="text-lg-center mb-32" v-html="$t('intro.line1')" />
      </b-col>
    </b-row>

    <div class="production-video-wrapper mb-32">
      <LazyVideo
        :breakpoint="768"
        :is-playing="videoPlaying"
        :sources="videoSources"
        poster="/videos/production-poster.jpg"
        class="production-video"
        @canplay="videoReady = true"
        @pause="videoPlaying = false"
        @play="videoPlaying = true"
      />

      <picture>
        <source
          srcset="/images/about/production/main-sm.jpg"
          media="(max-width: 767px)"
        />
        <source srcset="/videos/production-mobile-poster.jpg" />
        <img
          src="/videos/production-mobile-poster.jpg"
          alt=""
          class="production-video-placeholder"
          aria-hidden="true"
        />
      </picture>

      <transition name="fade" mode="out-in">
        <b-button
          v-if="videoReady"
          :key="videoPlaying"
          variant="link"
          class="btn-icon btn-video-toggle rounded-pill"
          aria-hidden="true"
          @click="videoPlaying = !videoPlaying"
        >
          <svg-icon
            :name="`${videoPlaying ? 'pause' : 'play'}-24`"
            width="24"
            height="24"
          />
        </b-button>
      </transition>
    </div>

    <b-row class="justify-content-center">
      <b-col xl="10">
        <p class="text-lg-center mb-0" v-html="$t('intro.line2')" />
      </b-col>
    </b-row>
    <!-- </b-container> -->

    <section class="section-about">
      <h2 class="sr-only">{{ $t('srTitle') }}</h2>
      <b-row class="flex-lg-row-reverse mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              alt=""
              src="/images/about/production/metal.jpg"
              class="embed-responsive-item"
              loading="lazy"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pr-xl-64">
          <h3 class="h2" v-html="$t('metal.title')" />
          <p class="mb-24 mb-lg-16" v-html="$t('metal.description')" />
        </b-col>
      </b-row>

      <b-row class="mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              alt=""
              src="/images/about/production/tray.jpg"
              class="embed-responsive-item"
              loading="lazy"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pl-xl-64">
          <h3 class="h2" v-html="$t('tray.title')" />
          <p class="mb-24 mb-lg-16" v-html="$t('tray.description')" />
        </b-col>
      </b-row>

      <b-row class="flex-lg-row-reverse mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              alt=""
              src="/images/about/production/plastic.jpg"
              class="embed-responsive-item"
              loading="lazy"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pr-xl-64">
          <h3 class="h2" v-html="$t('plastic.title')" />
          <p class="mb-24 mb-lg-16" v-html="$t('plastic.description')" />
        </b-col>
      </b-row>

      <b-row class="mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              alt=""
              src="/images/about/production/lab.jpg"
              class="embed-responsive-item"
              loading="lazy"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pl-xl-64">
          <h3 class="h2" v-html="$t('lab.title')" />
          <p class="mb-24 mb-lg-16" v-html="$t('lab.description')" />
        </b-col>
      </b-row>

      <b-row class="flex-lg-row-reverse mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              alt=""
              src="/images/about/production/staff.jpg"
              class="embed-responsive-item"
              loading="lazy"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pr-xl-64">
          <h3 class="h2" v-html="$t('staff.title')" />
          <p class="mb-24 mb-lg-16" v-html="$t('staff.description')" />
        </b-col>
      </b-row>

      <b-row class="mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              alt=""
              src="/images/about/production/precision.jpg"
              class="embed-responsive-item"
              loading="lazy"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pl-xl-64">
          <h3 class="h2" v-html="$t('quality.title')" />
          <p class="mb-24 mb-lg-16" v-html="$t('quality.description')" />
        </b-col>
      </b-row>

      <b-row class="flex-lg-row-reverse mb-n16">
        <b-col lg="6" class="mb-16">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              alt=""
              src="/images/about/production/esg.jpg"
              class="embed-responsive-item"
              loading="lazy"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 pr-xl-64">
          <h3 class="h2" v-html="$t('esg.title')" />
          <p class="mb-24 mb-lg-16" v-html="$t('esg.description')" />

          <LinkMore :to="localePath('/about/esg')">
            {{ $t('global.more') }}
          </LinkMore>
        </b-col>
      </b-row>
    </section>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'about.production', active: true }],
      videoPlaying: false,
      videoReady: false,
      videoSources: [
        { url: '/videos/production.webm', type: 'video/webm' },
        { url: '/videos/production.mp4', type: 'video/mp4' },
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

<style lang="scss" scoped>
.production-video-wrapper {
  position: relative;
}

.production-video,
.production-video-placeholder {
  width: 100%;
  height: auto;
}

.btn-video-toggle {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: $gray-400;

  &:not(:disabled):not(.disabled) {
    &:hover {
      color: $white;
    }
  }
}

@include media-breakpoint-down(sm) {
  .production-video,
  .btn-video-toggle {
    display: none;
  }
}

@include media-breakpoint-up(md) {
  .production-video-placeholder {
    display: none;
  }
}
</style>

<i18n>
{
  "en": {
    "esg": {
      "description": "EKF enterprises adhere to&nbsp;the&nbsp;ESG principles&nbsp;– care for&nbsp;the&nbsp;environment, social responsibility, management. The&nbsp;company actively implements the&nbsp;concept of&nbsp;lean production, pays attention to&nbsp;the&nbsp;health and&nbsp;safety of&nbsp;employees, and&nbsp;supports projects to&nbsp;combat unfair competition.",
      "title": "ESG principles"
    },
    "intro": {
      "line1": "The&nbsp;company's assets include production sites in&nbsp;Vladimir Region, 7&nbsp;logistics centers, as&nbsp;well as&nbsp;its own testing laboratory equipped with&nbsp;the&nbsp;latest equipment. 1,800 employees are employed in&nbsp;factories around the&nbsp;world, one third of&nbsp;them work in&nbsp;Russia.",
      "line2": "Own production in&nbsp;the&nbsp;Russian Federation allows us to&nbsp;reduce the&nbsp;cost of&nbsp;equipment and&nbsp;reduce delivery times to&nbsp;partners. EKF is an&nbsp;active participant in&nbsp;the&nbsp;import substitution program. The&nbsp;company develops domestic production of&nbsp;switchboard and&nbsp;power equipment, measuring instruments, electrical and&nbsp;wiring accessories."
    },
    "lab": {
      "description": "Samples of&nbsp;each batch of&nbsp;goods are tested on&nbsp;special stands and&nbsp;with&nbsp;the&nbsp;help of&nbsp;control devices for&nbsp;compliance with&nbsp;the&nbsp;declared technical characteristics and&nbsp;GOST requirements.",
      "title": "Own laboratory"
    },
    "metal": {
      "description": "In&nbsp;2002, EKF started to&nbsp;produce metal cases in&nbsp;Aleksandrov. Later, the&nbsp;plant's assortment was supplemented by&nbsp;components for&nbsp;electrical panels and&nbsp;busbars. The&nbsp;manufactured products are successfully used at&nbsp;industrial and&nbsp;socially significant facilities.",
      "title": "Metal products factory"
    },
    "pageHeader": "Own production in&nbsp;the&nbsp;Russian Federation",
    "pageTitle": "Production — EKF",
    "plastic": {
      "description": "In&nbsp;March 2021, the&nbsp;first stage of&nbsp;the&nbsp;plant in&nbsp;the&nbsp;village of&nbsp;Stavrovo, Vladimir region, started working. The&nbsp;company produces products made of&nbsp;technical plastics, including switchboards of&nbsp;the&nbsp;Slim box series, cable entries, products for&nbsp;electrical installation.",
      "title": "Technical plastics products factory"
    },
    "quality": {
      "description": "EKF products are developed on&nbsp;the&nbsp;basis of&nbsp;modern technologies, taking into&nbsp;account the&nbsp;latest scientific achievements. All components and&nbsp;finished products undergo testing and&nbsp;independent examination in&nbsp;international and&nbsp;Russian centers. ISO&nbsp;9001 certification of&nbsp;production sites guarantees a&nbsp;professional approach and&nbsp;consistently high product quality.",
      "title": "High quality standards"
    },
    "staff": {
      "description": "The&nbsp;company employs highly qualified technical specialists&nbsp;– engineers and&nbsp;designers. Total investment in&nbsp;R&D is&nbsp;about 3% of&nbsp;the&nbsp;annual turnover.",
      "title": "Staff of&nbsp;experts and&nbsp;designers"
    },
    "srTitle": "EKF production includes:",
    "tray": {
      "description": "In January 2019, the production of a metal cable tray of the T-Line series was launched. Products are manufactured using patented technology. The range includes tray sections with a section from 35×50 to 100×600 mm. Due to the high quality of the products of the T-Line series, they have been in high demand since the start of production.",
      "title": "Metal tray production"
    }
  },
  "ru": {
    "esg": {
      "description": "Мы придерживаемся производственной системы TPS (Toyota Production System), постоянно совершенствуем процессы для&nbsp;устранения потерь, повышения производительности труда. Активно реализуем концепцию lean-идеологии – создание ценности, бережливость и&nbsp;сокращение углеродного следа. Особое внимание уделяется здоровью и&nbsp;безопасности сотрудников, поддержке проектов по&nbsp;борьбе с&nbsp;недобросовестной конкуренцией.",
      "title": "Принципы ESG"
    },
    "intro": {
      "line1": "В актив компании ООО «Электрорешения», которая представляет бренд EKF в России, входят 2 производственные площадки во Владимирской области, сеть логистических центров, а также собственный отдел R&D и испытательная лаборатория, оснащенная новейшим оборудованием.",
      "line2": "Собственное производство в&nbsp;РФ позволяет снижать себестоимость продукции и&nbsp;сокращать сроки доставки партнерам. EKF&nbsp;&ndash; активный участник программы импортозамещения. Выпускаемая продукция успешно применяется на&nbsp;промышленных и&nbsp;социально значимых объектах, в&nbsp;гражданском и&nbsp;коммерческом строительстве."
    },
    "lab": {
      "description": "На&nbsp;специальных стендах и&nbsp;с&nbsp;помощью приборов контроля тестируются образцы каждой партии товара на&nbsp;соответствие заявленным техническим характеристикам и&nbsp;требованиям ГОСТа.",
      "title": "Собственная лаборатория"
    },
    "metal": {
      "description": "В&nbsp;2006&nbsp;году EKF начал производить металлические корпуса в&nbsp;Александрове. Позже ассортимент завода дополнили комплектующие для&nbsp;электрощитов, аксессуары для металлического лотка.",
      "title": "Завод по&nbsp;производству металлических изделий"
    },
    "pageHeader": "Собственное производство в РФ",
    "pageTitle": "Производство — EKF",
    "plastic": {
      "description": "В&nbsp;марте 2021&nbsp;года заработала первая очередь завода в&nbsp;поселке Ставрово Владимирской области. На&nbsp;предприятии производят изделия из&nbsp;технических пластиков, в&nbsp;том&nbsp;числе распределительные щиты серии Slimbox и «Промупаковка», кабельные вводы, металлические лотки и&nbsp;крышки, системы подвесов, аксессуары для&nbsp;молниезащиты, пластиковые кабеленесущие системы, электроустановочные и&nbsp;электромонтажные изделия.",
      "title": "Завод по&nbsp;производству изделий из&nbsp;технических пластиков"
    },
    "quality": {
      "description": "Продукция EKF разрабатывается на&nbsp;основе современных технологий с&nbsp;учетом последних научных достижений. Все комплектующие и&nbsp;готовые изделия проходят тестирование и&nbsp;независимую экспертизу в&nbsp;международных и&nbsp;российских центрах. Сертификация производственных площадок по&nbsp;ISO&nbsp;9001 гарантирует профессиональный подход и&nbsp;неизменно высокое качество продукции.",
      "title": "Высокие стандарты качества"
    },
    "staff": {
      "description": "В&nbsp;штате EKF работают высококвалифицированные технические специалисты&nbsp;– инженеры и&nbsp;конструкторы. Общие вложения в&nbsp;R&D составляют около 3% от&nbsp;годового оборота.",
      "title": "Штат экспертов и&nbsp;конструкторов"
    },
    "srTitle": "Производство EKF включает в себя:",
    "tray": {
      "description": "В&nbsp;январе 2019&nbsp;года запущено производство металлического кабельного лотка серии EKF-Line. Продукция изготавливается по&nbsp;запатентованной технологии. Ассортимент включает в&nbsp;себя секции лотка сечением от&nbsp;35&times;50 до&nbsp;100&times;600&nbsp;мм. Благодаря высокому качеству изделия серии EKF-Line пользуются стабильным спросом с&nbsp;момента старта производства.",
      "title": "Производство металлического лотка"
    }
  }
}
</i18n>
