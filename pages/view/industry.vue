<template>
  <main>
    <ViewBanner :banner="bannerMain">
      <template #breadcrumbs>
        <AppBreadcrumbs :items="breadcrumbs" class="light-breadcrumbs mb-0" />
      </template>

      <ViewBannerContent
        class="banner-main-content"
        :title="$t('banners.main.title')"
        :subtitle="$t('banners.main.subtitle')"
        :button-text="$t('banners.main.submit')"
        @click="showModal"
      />
    </ViewBanner>

    <ViewSection
      :title="$t('industries.title')"
      :subtitle="$t('industries.subtitle')"
      class="pb-0 pb-md-12"
    >
      <ViewIndustryIndustries :industries="industries" @click="showModal" />
    </ViewSection>

    <ViewSection
      :title="$t('catalogSection.title')"
      :subtitle="$t('catalogSection.subtitle')"
      :button-text="$t('catalog.goToCatalogProduction')"
      :button-link="'/catalog'"
    >
      <ViewIndustryCatalogCategoryCards :categories="catalogCategories" />
    </ViewSection>

    <ViewBanner :banner="bannerEkfConnect">
      <ViewBannerContent
        class="banner-ekf-connect-content"
        :title="$t('banners.ekfConnect.title')"
        :subtitle="$t('banners.ekfConnect.subtitle')"
        :button-text="$t('banners.ekfConnect.submit')"
        button-link="https://connect.ekfgroup.com/industry/"
      >
        <ul class="mb-8">
          <li>{{ $t('banners.ekfConnect.list.1') }}</li>
          <li>{{ $t('banners.ekfConnect.list.2') }}</li>
          <li>{{ $t('banners.ekfConnect.list.3') }}</li>
        </ul>
      </ViewBannerContent>
    </ViewBanner>

    <ViewSection
      :title="$t('solutionIndustry.title')"
      :subtitle="$t('solutionIndustry.subtitle')"
      :button-text="$t('solutions.categories.buttonText')"
      button-link="/solutions"
      class="pb-0 overflow-hidden"
    >
      <SolutionsScopeCategoriesSlider :categories="solutionCategories" />
    </ViewSection>

    <ViewSection
      :title="$t('projects.title')"
      :button-text="$t('projects.buttonText')"
      :button-link="'/about/news/category/projects'"
    >
      <b-row>
        <b-col
          v-for="article in projects.articles"
          :key="`project-${article.id}`"
          sm="6"
          lg="3"
          class="mb-16"
        >
          <NewsCard :article="article" />
        </b-col>
      </b-row>
    </ViewSection>

    <ViewBanner :banner="bannerAutomation">
      <ViewBannerContent
        class="banner-automation-content"
        :title="$t('banners.automation.title')"
        :subtitle="$t('banners.automation.subtitle')"
        :button-text="$t('banners.automation.submit')"
        button-link="https://kipia.ekfgroup.com/"
      />
    </ViewBanner>

    <SolutionsIndexSupport
      form-name="Промышленность — Сопровождаем на всех этапах проекта"
      :title="solutionForm.title"
      :description="solutionForm.subtitle"
      :help-steps="help"
      :help-title="$t('helpTitle')"
      industry-page
      @submit="solutionFormSubmit"
    />

    <ViewSection
      :title="$t('courses.title')"
      :subtitle="$t('courses.subtitle')"
      :button-text="$t('courses.buttonText')"
      button-link="https://univer.ekfgroup.com/catalog/"
      class="bg-light"
    >
      <CoursesCards :courses="courses" />
    </ViewSection>

    <ViewSection
      :title="$t('global.news')"
      :button-text="$t('global.newsLink')"
      :button-link="'/about/news'"
      class="pb-0"
    >
      <b-row>
        <b-col
          v-for="article in news.articles"
          :key="`news-${article.id}`"
          sm="6"
          lg="3"
          class="mb-16"
        >
          <NewsCard :article="article" />
        </b-col>
      </b-row>
    </ViewSection>

    <ViewSection :title="$t('socials.title')">
      <ViewIndustrySocialCards />
    </ViewSection>

    <ConsultationFormModal
      id="consultation-modal-industry"
      ref="consultationModal"
      v-model="modalVisible"
      :fields="consultationFormFields"
      :code="1026"
      industry-page
    />
  </main>
</template>

<script>
import {
  INDUSTRIES,
  INDUSTRY_CATALOG_CATEGORY_SLUGS,
  INDUSTRY_NEWS_IDS,
  INDUSTRY_PROJECTS_IDS,
} from '~/components/constants/view-industry'

import VIEW_INDUSTRY from '@/graphql/view/ViewIndustry'
import sendToMindbox from '~/utils/mindbox'

export default {
  async asyncData({ app, $graphql }) {
    const variables = {
      locale: app.i18n.locale,
      slugs: INDUSTRY_CATALOG_CATEGORY_SLUGS,
      newsIds: INDUSTRY_NEWS_IDS,
      projectsIds: INDUSTRY_PROJECTS_IDS,
    }

    const {
      catalogCategories,
      solutionCategories,
      projects,
      forms,
      help,
      courses,
      news,
    } = await $graphql.default.request(VIEW_INDUSTRY, variables)

    catalogCategories.sort(
      (a, b) =>
        INDUSTRY_CATALOG_CATEGORY_SLUGS.indexOf(a.slug) -
        INDUSTRY_CATALOG_CATEGORY_SLUGS.indexOf(b.slug)
    )

    return {
      bannersPath: '/images/view/industry',
      catalogCategories,
      courses,
      forms,
      help,
      projects: projects[0] ?? [],
      solutionCategories,
      news: news[0] ?? [],
      modalVisible: false,
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },

  computed: {
    bannerMain() {
      const imageName = 'banner-main'

      return {
        image: imageName,
        lazy: false,
        path: this.bannersPath,
        sources: [
          { width: 420, image: imageName + '-xs' },
          { width: 575, image: imageName + '-sm' },
          { width: 767, image: imageName + '-md' },
        ],
      }
    },

    bannerEkfConnect() {
      const imageName = 'banner-ekf-connect'

      return {
        image: imageName,
        lazy: true,
        path: this.bannersPath,
        sources: [
          { width: 420, image: imageName + '-sm' },
          { width: 767, image: imageName + '-md' },
        ],
      }
    },

    bannerAutomation() {
      const imageName = 'banner-automation'

      return {
        image: imageName,
        lazy: true,
        path: this.bannersPath,
        sources: [
          { width: 420, image: imageName + '-sm' },
          { width: 767, image: imageName + '-md' },
        ],
      }
    },

    breadcrumbs() {
      return [{ text: 'layout.3', active: true }]
    },

    industries() {
      return INDUSTRIES
    },

    solutionForm() {
      return this.forms?.[1] ?? {}
    },

    consultationFormFields() {
      return [
        {
          name: 'username',
          placeholder: 'form.fullName',
          rules: 'required',
        },
        {
          name: 'phone',
          placeholder: '',
          rules: 'required|tel',
          type: 'tel',
        },
        {
          name: 'company',
          placeholder: 'form.company',
          rules: 'required',
        },
        {
          name: 'email',
          placeholder: 'form.email',
          rules: 'required',
        },
        {
          name: 'message',
          placeholder: 'form.message',
          rules: '',
        },
      ]
    },
  },

  mounted() {
    sendToMindbox('EKFGroupCkgProsmotrStranicy', {
      customerAction: {
        customFields: {
          cKGname: ['Промышленность'],
        },
      },
    })
  },

  methods: {
    showModal() {
      this.modalVisible = true
    },

    solutionFormSubmit() {
      this.$refs.consultationModal.submitSuccess = true
      this.showModal()
    },
  },
}
</script>

<style lang="scss" scoped>
.banner-main-content {
  ::v-deep {
    .view-banner-btn {
      .icon {
        display: none;
      }
    }
  }
}

.banner-ekf-connect-content {
  ul {
    padding-left: 1rem;

    li {
      margin-bottom: 1rem;
    }

    li::marker {
      width: 0.5rem;
      height: 0.5rem;
      color: $primary;
    }
  }
}

@include media-breakpoint-down(xs) {
  .banner-automation-content {
    min-height: 560px;
    padding-bottom: 2rem;
    > :first-child {
      margin-top: auto;
    }
  }
}
</style>

<i18n>
  {
    "en": {
      "banners": {
        "automation": {
          "subtitle": "All information for SCADA specialists on one resource",
          "title": "Industrial Automation EKF",
          "submit": "Go to website"
        },
        "main": {
          "subtitle": "EKF provides products and solutions for power supply and automation of various industries",
          "title": "Safe and Efficient Enterprise",
          "submit": "Submit application"
        },
        "ekfConnect": {
          "subtitle": "Analytical IIoT platform to enhance enterprise efficiency",
          "title": "EKF Connect Industry",
          "submit": "Go to website",
          "list": {
            "1": "Real-time data monitoring and analysis",
            "2": "Production optimization",
            "3": "Increased productivity and prevention of unplanned downtime"
          }
        }
      },
      "industries": {
        "title": "Application Industries",
        "subtitle": "Wide range of solutions for various systems and facilities from a single supplier"
      },
      "solutionIndustry": {
        "title": "Standard and Custom Solutions",
        "subtitle": "Wide range of solutions for various systems and facilities from a single supplier"
      },
      "catalogSection": {
        "subtitle": "Reliable equipment, laboratory-tested, compliant with GOST and industry standards. Warranty up to 10 years",
        "title": "Wide assortment for various tasks"
      },
      "projects": {
        "title": "Implemented Projects",
        "buttonText": "View all projects"
      },
      "socials": {
        "title": "Follow our industry social networks"
      },
      "helpTitle": "Our Services",
      "pageTitle": "Professional solutions and useful services for designers - EKF company"
    },
    "ru": {
      "banners": {
        "automation": {
          "subtitle": "Вся информация для специалистов по АСУ ТП на одном ресурсе",
          "title": "Промышленная автоматизация EKF",
          "submit": "Перейти на сайт"
        },
        "main": {
          "subtitle": "EKF предоставляет продукты и решения для электроснабжения и автоматизации производств различных отраслей",
          "title": "Безопасное и эффективное предприятие",
          "submit": "Оставить заявку"
        },
        "ekfConnect": {
          "subtitle": "Аналитическая IIoT-платформа для повышения эффективности предприятия",
          "title": "EKF Connect Industry",
          "submit": "Перейти на сайт",
          "list": {
            "1": "Оперативный мониторинг и анализ данных в режиме реального времени ",
            "2": "Оптимизация производства",
            "3": "Увеличение производительности и предотвращение незапланированных простоев предприятия"
          }
        }
      },
      "industries": {
        "title": "Отрасли применения",
        "subtitle": "Широкий выбор решений для различных систем и объектов от одного поставщика"
      },
      "solutionIndustry": {
        "title": "Типовые и индивидуальные решения",
        "subtitle": "Широкий выбор решений для различных систем и объектов от одного поставщика"
      },
      "catalogSection": {
        "subtitle": "Надёжное оборудование, прошедшее лабораторные испытания, в соответствии с ГОСТ и отраслевыми стандартами. Гарантия до 10 лет",
        "title": "Широкий ассортимент для разных задач"
      },
      "projects": {
        "title": "Реализованные проекты",
        "buttonText": "Смотреть все проекты"
      },
      "socials": {
        "title": "Подписывайтесь на наши отраслевые социальные сети"
      },
      "courses": {
        "title": "Обучение и развитие компетенций",
        "subtitle": "Онлайн и очные обучения инженерных служб и служб эксплуатации предприятий. Расширение компетенций ваших специалистов",
        "buttonText": "Перейти в EKF Универ"
      },
      "helpTitle": "Наши услуги",
      "pageTitle": "Профессиональные решения и полезные сервисы для проектировщиков — компания EKF"
    }
  }
  </i18n>
