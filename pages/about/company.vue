<template>
  <main>
    <b-container tag="section">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="text-lg-center">
        {{ $t('pageHeader') }}
      </h1>
      <p class="text-lg-center mb-32" v-html="$t('intro.line1')" />

      <div class="hero embed-responsive embed-responsive-26by9 mb-32">
        <LazyVideo
          :breakpoint="768"
          :is-playing="videoPlaying"
          :sources="videoSources"
          poster="/videos/intro-full-poster.webp"
          class="embed-responsive-item object-fit-cover d-none d-md-block"
          @canplay="videoReady = true"
          @pause="videoPlaying = false"
          @play="videoPlaying = true"
        />

        <picture>
          <source type="image/webp" srcset="/videos/intro-mobile-poster.webp" />
          <source type="image/jpeg" srcset="/videos/intro-mobile-poster.jpg" />
          <img
            alt=""
            src="/videos/intro-mobile-poster.jpg"
            class="embed-responsive-item object-fit-cover d-md-none"
            aria-hidden="true"
          />
        </picture>

        <transition name="fade" mode="out-in">
          <div
            v-if="videoReady"
            :key="videoPlaying"
            class="embed-responsive-item text-right d-none d-md-block"
          >
            <b-button
              :title="$t(`global.${videoPlaying ? 'pause' : 'play'}`)"
              :aria-label="$t(`global.${videoPlaying ? 'pause' : 'play'}`)"
              variant="link"
              class="btn-icon btn-video-toggle rounded-pill"
              @click="videoPlaying = !videoPlaying"
            >
              <svg-icon
                :name="`${videoPlaying ? 'pause' : 'play'}-24`"
                width="24"
                height="24"
                aria-hidden="true"
              />
            </b-button>
          </div>
        </transition>
      </div>

      <b-row class="justify-content-center">
        <b-col xl="9">
          <p class="text-lg-center mb-64" v-html="$t('intro.line2')" />
        </b-col>
      </b-row>
    </b-container>

    <section class="section-about section-about-numbers bg-light">
      <h2 class="sr-only">{{ $t('numbers.srTitle') }}</h2>

      <ul class="numbers-list container">
        <li class="numbers-item">
          <span class="h1 text-primary mb-8 mb-md-16">5000+</span>
          <span class="fs-lg-4" v-html="$t('numbers.objects')" />
        </li>

        <li class="numbers-item">
          <span class="h1 text-primary mb-8 mb-md-16">2000+</span>
          <span class="fs-lg-4" v-html="$t('numbers.employees')" />
        </li>

        <li class="numbers-item">
          <span class="h1 text-primary mb-8 mb-md-16">3000+</span>
          <span class="fs-lg-4" v-html="$t('numbers.points')" />
        </li>

        <li class="numbers-item">
          <span class="h1 text-primary mb-8 mb-md-16">22</span>
          <span class="fs-lg-4" v-html="$t('numbers.experience')" />
        </li>
      </ul>
    </section>

    <b-container tag="section" class="section-about">
      <h2 class="sr-only">{{ $t('ekfAdvantages') }}</h2>

      <b-row class="mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              :alt="$t('skus.title')"
              :src="`/images/about/company/${$t('skus.image')}`"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pl-xl-64">
          <h3 class="h2" v-html="$t('skus.title')" />
          <p class="mb-24 mb-lg-16" v-html="$t('skus.description')" />

          <LinkMore :to="localePath('/catalog')">
            {{ $t('skus.linkText') }}
          </LinkMore>
        </b-col>
      </b-row>

      <b-row class="flex-lg-row-reverse mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              :alt="$t('solutions.title')"
              :src="`/images/about/company/${$t('solutions.image')}`"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pr-xl-64">
          <h3 class="h2" v-html="$t('solutions.title')" />
          <p class="mb-24 mb-lg-16">
            {{ $t('solutions.description') }}&nbsp;<span class="invisible"
              >ВК49865</span
            >
          </p>
          <LinkMore :to="localePath('/solutions')">
            {{ $t('solutions.linkText') }}
          </LinkMore>
        </b-col>
      </b-row>

      <!-- ВК49865  -->

      <b-row class="mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              :alt="$t('geography.title')"
              :src="`/images/about/company/${$t('geography.image')}`"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pl-xl-64">
          <h3 class="h2" v-html="$t('geography.title')" />
          <p class="mb-24 mb-lg-16" v-html="$t('geography.description')" />
        </b-col>
      </b-row>

      <b-row class="flex-lg-row-reverse mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              :alt="$t('production.title')"
              :src="`/images/about/company/${$t('production.image')}`"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pr-xl-64">
          <h3 class="h2" v-html="$t('production.title')" />
          <p class="mb-24 mb-lg-16" v-html="$t('production.description')" />
          <LinkMore :to="localePath('/about/production')">
            {{ $t('production.linkText') }}
          </LinkMore>
        </b-col>
      </b-row>

      <b-row class="mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div class="embed-responsive embed-responsive-16by9">
            <img
              :alt="$t('logistics.title')"
              :src="`/images/about/company/${$t('logistics.image')}`"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pl-xl-64">
          <h3 class="h2" v-html="$t('logistics.title')" />
          <p class="mb-24 mb-lg-16" v-html="$t('logistics.description')" />
        </b-col>
      </b-row>
    </b-container>

    <section class="section-about bg-light">
      <b-container>
        <h2 class="text-lg-center" v-html="$t('partnerPrograms.title')" />
        <p
          class="text-lg-center mb-32"
          v-html="$t('partnerPrograms.description')"
        />

        <div
          class="embed-responsive embed-responsive-26by9 mobile-adaptive mb-32"
        >
          <img
            :alt="$t('partnerPrograms.title')"
            :src="`/images/about/company/${$t('partnerPrograms.image')}`"
            class="embed-responsive-item"
          />
        </div>

        <b-row class="mb-n64">
          <b-col lg="4" class="mb-64">
            <h3 class="h5" v-html="$t('partnerPrograms.specialists.title')" />
            <p
              class="mb-0"
              v-html="$t('partnerPrograms.specialists.description')"
            />
          </b-col>
          <b-col lg="4" class="mb-64">
            <h3 class="h5" v-html="$t('partnerPrograms.institutes.title')" />
            <p
              class="mb-0"
              v-html="$t('partnerPrograms.institutes.description')"
            />
          </b-col>
          <b-col lg="4" class="mb-64">
            <h3 class="h5" v-html="$t('partnerPrograms.worldskills.title')" />
            <p
              class="mb-0"
              v-html="$t('partnerPrograms.worldskills.description')"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'about.company', active: true }],
      partners: [
        'rjd',
        'rosneft',
        'lukoil',
        'gazprom',
        'pik',
        'lsr',
        'kortros',
        'fsk',
        'samolet',
        'granel',
        'yit',
        'setlgroup',
      ],
      videoPlaying: false,
      videoReady: false,
      videoSources: [
        { url: '/videos/intro-full.webm', type: 'video/webm' },
        { url: '/videos/intro-full.mp4', type: 'video/mp4' },
      ],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('meta.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('meta.keywords'),
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.section-about-numbers {
  padding-top: 136px;
  padding-bottom: 150px;
}

.numbers-list {
  list-style: none;
  display: flex;
  justify-content: space-between;

  .numbers-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.btn-video-toggle {
  display: inline-flex;
  position: absolute;
  top: 32px;
  right: 32px;
  margin: (-$input-btn-padding-y) (-$input-btn-padding-y) 0 0;
  border: none;
  color: $gray-400;
  box-shadow: none;
  z-index: 1;

  &:hover {
    color: $white;
  }
}

@include media-breakpoint-down(sm) {
  .hero {
    &::before {
      padding-top: 56.40243902%;
    }
  }

  .section-about-numbers {
    padding-block: 4rem;
  }

  .numbers-list {
    flex-direction: column;
    row-gap: 3rem;

    .numbers-item .h1 {
      font-size: 3rem;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "ekfAdvantages": "EKF advantages",
    "ceo": {
      "caption": "Eugene Oystacher, CEO, EKF",
      "text": "&laquo;We at&nbsp;EKF will support you with&nbsp;the&nbsp;best products, solutions and&nbsp;services. We are constantly developing and&nbsp;improving for&nbsp;you&raquo."
    },
    "geography": {
      "description": "The&nbsp;company's partner network includes over 200 authorized distributors and&nbsp;6,000 sub-dealers in&nbsp;Russia and&nbsp;the&nbsp;CIS. EKF products are sold in&nbsp;15&nbsp;countries around the&nbsp;world.",
      "image": "geography.jpg",
      "linkText": "Go to international website",
      "title": "15 countries of&nbsp;presence"
    },
    "intro": {
      "line1": "EKF develops, manufactures and&nbsp;sells electrical equipment and&nbsp;solutions based on&nbsp;it.",
      "line2": "Our mission is&nbsp;to&nbsp;create reliable and&nbsp;efficient electrical solutions for&nbsp;a&nbsp;steady future.",
      "video": "about",
      "youtubeId": "ZOgxz2sW2VI"
    },
    "lines": {
      "description": "AVERES, PROxima and&nbsp;BASIC are industry-specific and&nbsp;meet the&nbsp;needs of&nbsp;customers with&nbsp;a&nbsp;variety of&nbsp;budget options.",
      "image": "lines.jpg",
      "linkText": "Go to catalog",
      "title": "3 product lines"
    },
    "logistics": {
      "description": "Modern logistics complexes of&nbsp;the&nbsp;company are located in&nbsp;Moscow, Novosibirsk, Yekaterinburg, Rostov-on-Don, Almaty and&nbsp;Tashkent and&nbsp;allow prompt delivery throughout Russia and&nbsp;the&nbsp;CIS.<br />All terminals are equipped with&nbsp;an&nbsp;automated WMS warehouse management system and&nbsp;are located in&nbsp;locations convenient for&nbsp;the&nbsp;entry of&nbsp;eurotrucks.",
      "image": "logistics.jpg",
      "title": "7 logistics centers"
    },
    "meta": {
      "description": "Information about EKF company",
      "keywords": "about us information company"
    },
    "numbers": {
      "srTitle": "EKF in numbers",
      "employees": "employees",
      "experience": "years on&nbsp;the&nbsp;market",
      "objects": "designed objects",
      "points": "points of&nbsp;sales"
    },
    "pageHeader": "Experience. Knowledge. Future",
    "pageTitle": "About us",
    "partnerPrograms": {
      "description": "EKF partner programs streamline standard processes and&nbsp;save project time.<br />EKF solutions have been used in&nbsp;their projects by&nbsp;hundreds of&nbsp;thousands of&nbsp;professional electricians, electricians, low-voltage switchgear assemblers, system integrators, power engineers and&nbsp;designers.",
      "image": "partner-programs.jpg",
      "institutes": {
        "description": "The&nbsp;company offers specialists catalogs of&nbsp;ready-made design solutions and&nbsp;3D models of&nbsp;equipment, free services for&nbsp;convenient and&nbsp;prompt calculation of&nbsp;specifications for&nbsp;EKF equipment. EKF products are integrated into&nbsp;the&nbsp;most popular programs: E-Plan, nanoCAD, AutodeskRevit, Autodesk, Autocad. EKF experts provide partners with&nbsp;a&nbsp;high level of&nbsp;service, an&nbsp;individual approach and&nbsp;support at&nbsp;any stage of&nbsp;design.",
        "title": "EKF for&nbsp;design institutes"
      },
      "specialists": {
        "description": "The&nbsp;company provides partners with&nbsp;favorable economic conditions, a&nbsp;flexible system of&nbsp;discounts, provides useful services, additional marketing tools and&nbsp;training.",
        "title": "EKF for&nbsp;the&nbsp;electrical industry"
      },
      "title": "EKF - cooperation with specialized educational institutions",
      "worldskills": {
        "description": "For the&nbsp;development of&nbsp;any&nbsp;business, qualified personnel are needed. Therefore, EKF pays attention to&nbsp;the&nbsp;training of&nbsp;specialists from the&nbsp;student bench. We cooperate with&nbsp;the&nbsp;leading Russian university in&nbsp;the&nbsp;field&nbsp;of&nbsp;energy, electrical engineering, radio engineering, electronics and&nbsp;information technology - NRU MPEI and&nbsp;other specialized higher and&nbsp;secondary specialized educational institutions in&nbsp;the&nbsp;regions.",
        "title": "EKF is&nbsp;a&nbsp;partner of&nbsp;WorldSkills Russia"
      }
    },
    "partners": {
      "description": "EKF equipment operates smoothly at&nbsp;the&nbsp;country's iconic industrial and&nbsp;energy facilities,<br />used in&nbsp;projects of&nbsp;the&nbsp;largest Russian companies.",
      "title": "Our clients"
    },
    "production": {
      "description": "The company's production base includes platforms in&nbsp;Vladimir region. The&nbsp;enterprises are&nbsp;followed by&nbsp;the&nbsp;principles of&nbsp;sustainable development and&nbsp;ESG&nbsp;&ndash; concern for&nbsp;ecology, social responsibility, management. EKF actively implements the&nbsp;concept of&nbsp;leaning and&nbsp;cutting the&nbsp;carbon footprint, pays attention to&nbsp;the&nbsp;health and&nbsp;security of&nbsp;employees, supports the&nbsp;fight against unscrupulous competition.",
      "image": "production.jpg",
      "linkText": "Read more",
      "title": "Own production in&nbsp;the&nbsp;Russian Federation"
    },
    "skus": {
      "description": "EKF offers a&nbsp;full range&nbsp;of&nbsp;electrical equipment for&nbsp;the&nbsp;input, distribution and&nbsp;metering of&nbsp;electricity, setting&nbsp;up process control. The priority direction of&nbsp;EKF's work is&nbsp;the development of&nbsp;integrated energy-efficient solutions. Main product lines: low-voltage electrical products, medium-voltage equipment, switchboard enclosures, products for electrical installation and installation, instrumentation, measurement and&nbsp;automation systems, cable systems, smart home, lightning protection, professional lighting. Solutions and products designed to&nbsp;reduce resources and&nbsp;organize power management in&nbsp;any&nbsp;facility.",
      "image": "skus.jpg",
      "linkText": "Go to catalog",
      "title": "More than 19,000&nbsp;SKUs"
    },
    "solutions": {
      "description": "The priority area of&nbsp;the&nbsp;company is&nbsp;the&nbsp;development of&nbsp;integrated energy efficient solutions for&nbsp;industrial enterprises, design and&nbsp;construction of&nbsp;energy, civil and&nbsp;infrastructure facilities.",
      "image": "solutions.jpg",
      "linkText": "Go to solutions catalog",
      "title": "Complex solutions"
    }
  },
  "ru": {
    "ekfAdvantages": "Преимущества EKF",
    "ceo": {
      "caption": "Евгений Ойстачер, CEO, EKF",
      "text": "&laquo;Мы в&nbsp;EKF поддержим вас лучшими продуктами, решениями и&nbsp;услугами. Постоянно развиваемся и&nbsp;совершенствуемся для&nbsp;вас&raquo;."
    },
    "geography": {
      "description": "Партнерская сеть бренда насчитывает более 250 дистрибьюторов и 6 000 субдилеров в России. EKF активно сотрудничает с ведущими DIY-сетями и маркетплейсами.",
      "image": "geography.jpg",
      "title": "Партнерская сеть"
    },
    "intro": {
      "line1": "Мы занимаемся разработкой, производством и продажей электрооборудования и решений на его основе.",
      "line2": "Наша миссия: создаём надёжные и&nbsp;эффективные электрорешения для&nbsp;устойчивого будущего.",
      "video": "about",
      "youtubeId": "ZOgxz2sW2VI"
    },
    "lines": {
      "description": "AVERES, PROxima и&nbsp;BASIC разработаны с&nbsp;учетом отраслевой специфики и&nbsp;отвечают потребностям покупателей с&nbsp;различными возможностями бюджета.",
      "image": "lines.jpg",
      "linkText": "Перейти в каталог продукции",
      "title": "3 продуктовые линейки"
    },
    "logistics": {
      "description": "Современные логистические комплексы позволяют осуществлять оперативную доставку. Все терминалы оснащены автоматизированной WMS-системой управления складом и&nbsp;находятся в&nbsp;локациях, удобных для&nbsp;подъезда еврофур.",
      "image": "logistics.jpg",
      "title": "7 логистических центров"
    },
    "meta": {
      "description": "Информация о бренде EKF",
      "keywords": "О нас информация о бренде"
    },
    "numbers": {
      "srTitle": "EKF в числах",
      "employees": "сотрудников",
      "experience": "года на&nbsp;рынке",
      "objects": "спроектированных объектов",
      "points": "точек продаж"
    },
    "pageHeader": "Энергия для жизни",
    "pageTitle": "О нас",
    "partnerPrograms": {
      "description": "Партнерские программы EKF позволяют оптимизировать стандартные процессы и&nbsp;сэкономить время работы над&nbsp;проектом.<br />Решения EKF используют в&nbsp;своих проектах сотни тысяч профессиональных электриков, электромонтажников, сборщиков НКУ, системных интеграторов, энергетиков и&nbsp;проектировщиков.",
      "image": "partner-programs.jpg",
      "institutes": {
        "description": "Мы предлагаем специалистам каталоги готовых проектных решений и&nbsp;3D-модели оборудования, бесплатные сервисы для&nbsp;удобного и&nbsp;оперативного расчета спецификаций на&nbsp;оборудовании EKF. Продукция EKF интегрирована в&nbsp;наиболее востребованные программы: E-Plan, nanoCAD, AutodeskRevit, Autodesk, Autocad. Эксперты EKF обеспечивают партнерам высокий уровень сервиса, индивидуальный подход и&nbsp;поддержку на&nbsp;любом этапе проектирования.",
        "title": "EKF&nbsp;— проектным институтам"
      },
      "specialists": {
        "description": "Партнерам мы обеспечиваем выгодные экономические условия, гибкую систему скидок, предоставляет полезные сервисы, дополнительные маркетинговые инструменты и&nbsp;обучение.",
        "title": "EKF&nbsp;— специалистам электротехнической отрасли"
      },
      "title": "Партнерские программы EKF",
      "worldskills": {
        "description": "Для&nbsp;развития любого бизнеса необходимы квалифицированные кадры. Поэтому EKF уделяет внимание подготовке специалистов со&nbsp;студенческой скамьи. Мы сотрудничаем с&nbsp;ведущим ВУЗом России в&nbsp;области энергетики, электротехники, радиотехники, электроники и&nbsp;информационных технологий ‒ НИУ&nbsp;«МЭИ» и&nbsp;другими профильными высшими и&nbsp;средними специальными учебными заведениями в&nbsp;регионах.",
        "title": "EKF — сотрудничество с&nbsp;профильными учебными заведениями"
      }
    },
    "partners": {
      "description": "Оборудование EKF бесперебойно работает на&nbsp;знаковых промышленных и&nbsp;энергетических объектах страны,<br />применяется в&nbsp;проектах крупнейших российских компаний.",
      "title": "Нам доверяют"
    },
    "production": {
      "description": "В актив компании ООО «Электрорешения», которая представляет бренд EKF в России, входят 2 производственные площадки во Владимирской области, сеть логистических центров, а также собственный отдел R&D и испытательная лаборатория, оснащенная новейшим оборудованием.",
      "image": "production.jpg",
      "linkText": "Подробнее",
      "title": "Собственное производство в&nbsp;РФ"
    },
    "skus": {
      "description": "EKF предлагает полный спектр электрооборудования для&nbsp;ввода, распределения и&nbsp;учёта электричества, автоматизации технологических процессов. Приоритетное направление работы&nbsp;EKF – разработка комплексных энергоэффективных решений. EKF разработчик собственного ПО – умный дом EKF Connect Home и IIoT EKF Connect Industry для промышленности. Решения и&nbsp;продукты призваны сокращать расход ресурсов и&nbsp;налаживать эффективное управление электроснабжением на&nbsp;любых объектах.",
      "image": "skus.jpg",
      "linkText": "Перейти в каталог продукции",
      "title": "Более 19&nbsp;000 артикулов"
    },
    "solutions": {
      "description": "Приоритетное направление работы – разработка комплексных энергоэффективных решений для промышленных предприятий, проектирования и строительства энергетических, гражданских и инфраструктурных объектов.",
      "image": "solutions.jpg",
      "linkText": "Перейти в каталог решений",
      "title": "Комплексные решения"
    }
  }
}
</i18n>
