<template>
  <main>
    <b-container tag="section">
      <AppBreadcrumbs :items="breadcrumbs" />

      <p
        v-if="$i18n.locale !== 'en'"
        class="fs-lg-4 text-lg-center text-secondary"
      >
        {{ $t('titleTranslation') }}
      </p>
      <h1 class="h2 text-lg-center mb-32" v-html="$t('title')" />

      <picture>
        <source
          srcset="/images/about/esg/main-sm.jpg"
          media="(max-width: 767px)"
        />
        <source
          srcset="/images/about/esg/main-md.jpg"
          media="(max-width: 1199px)"
        />
        <source
          srcset="/images/about/esg/main.jpg"
          media="(max-width: 1295px)"
        />
        <source srcset="/images/about/esg/main-xl.jpg" />
        <img
          :alt="$t('title')"
          src="/images/about/esg/main.jpg"
          class="img-fluid mb-32"
        />
      </picture>

      <b-row class="justify-content-center">
        <b-col xl="10">
          <p class="fs-lg-4 text-lg-center mb-0" v-html="$t('intro')" />
        </b-col>
      </b-row>
      <div class="text-lg-center my-32">
        <b-button
          href="/files/esg-2023.pdf"
          variant="link"
          class="text-decoration-none p-0 border-0 text-left"
          download
        >
          <svg-icon
            name="download-24"
            width="24"
            height="24"
            class="mr-8"
            aria-hidden="true"
          />
          {{ $t('downloadEsgReport') }}
        </b-button>
      </div>
      <div class="text-lg-center mb-48 mb-lg-96">
        <b-button
          href="/files/esg-2022.pdf"
          variant="link"
          class="text-decoration-none p-0 border-0 text-left"
          download
        >
          <svg-icon
            name="download-24"
            width="24"
            height="24"
            class="mr-8"
            aria-hidden="true"
          />
          {{ $t('downloadEsgReport22') }}
        </b-button>
      </div>
    </b-container>

    <section class="achievements">
      <b-container class="px-0">
        <div class="achievements-container">
          <b-container class="py-64 py-lg-96">
            <h2 class="mb-48 mb-lg-64" v-html="$t('achievements.title')" />
            <b-row>
              <b-col cols="12" lg="6">
                <h2
                  class="achivment-title mb-8"
                  v-html="$t('achievements.1.title')"
                ></h2>

                <p class="mb-48" v-html="$t('achievements.1.p')"></p>
              </b-col>
              <b-col cols="12" lg="6" order-lg="3">
                <h2
                  class="achivment-title mb-8"
                  v-html="$t('achievements.2.title')"
                ></h2>
                <p class="mb-48" v-html="$t('achievements.2.p')"></p>
              </b-col>
              <b-col cols="12" lg="6" order-lg="5">
                <h2
                  class="achivment-title mb-8"
                  v-html="$t('achievements.3.title')"
                ></h2>
                <p class="mb-48 mb-lg-0" v-html="$t('achievements.3.p')"></p>
              </b-col>
              <b-col cols="12" lg="6" order-lg="2">
                <h2
                  class="achivment-title mb-8"
                  v-html="$t('achievements.4.title')"
                ></h2>
                <p class="mb-48" v-html="$t('achievements.4.p')"></p>
              </b-col>
              <b-col cols="12" lg="6" order-lg="4">
                <h2
                  class="achivment-title mb-8"
                  v-html="$t('achievements.5.title')"
                ></h2>
                <p v-html="$t('achievements.5.p')"></p>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </b-container>
    </section>

    <b-container tag="section" class="section-about">
      <b-row class="mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div
            class="embed-responsive embed-responsive-688by393 mobile-adaptive shadow"
          >
            <img
              :alt="$t('trail.title')"
              src="/images/about/esg/trail.jpg"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pl-xl-64">
          <h2 v-html="$t('trail.title')" />
          <div v-html="$t('trail.description')" />
        </b-col>
      </b-row>

      <b-row class="flex-lg-row-reverse mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div
            class="embed-responsive embed-responsive-688by393 mobile-adaptive"
          >
            <img
              :alt="$t('consumption.title')"
              src="/images/about/esg/consumption.jpg"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pr-xl-64">
          <h2 v-html="$t('consumption.title')" />
          <p class="mb-lg-32" v-html="$t('consumption.description')" />
        </b-col>
      </b-row>

      <b-row class="mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div
            class="embed-responsive embed-responsive-688by393 mobile-adaptive"
          >
            <img
              :alt="$t('community.title')"
              src="/images/about/esg/community.jpg"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pl-xl-64">
          <h2 v-html="$t('community.title')" />
          <p class="mb-lg-32" v-html="$t('community.description')" />
        </b-col>
      </b-row>

      <b-row class="flex-lg-row-reverse mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div
            class="embed-responsive embed-responsive-688by393 mobile-adaptive"
          >
            <img
              :alt="$t('responsibility.title')"
              src="/images/about/esg/responsibility.jpg"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pr-xl-64">
          <h2 v-html="$t('responsibility.title')" />
          <p class="mb-lg-32" v-html="$t('responsibility.description')" />
        </b-col>
      </b-row>

      <b-row class="mb-48">
        <b-col lg="6" class="mb-16 mb-xl-48">
          <div
            class="embed-responsive embed-responsive-688by393 mobile-adaptive"
          >
            <img
              :alt="$t('medium.title')"
              src="/images/about/esg/medium.jpg"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 mb-xl-48 pl-xl-64">
          <h2 v-html="$t('medium.title')" />
          <p class="mb-lg-32" v-html="$t('medium.description')" />
        </b-col>
      </b-row>

      <b-row class="flex-lg-row-reverse mb-n16">
        <b-col lg="6" class="mb-16">
          <div
            class="embed-responsive embed-responsive-688by393 mobile-adaptive"
          >
            <img
              :alt="$t('fairPosition.title')"
              src="/images/about/esg/fair-position.jpg"
              class="embed-responsive-item"
            />
          </div>
        </b-col>
        <b-col lg="6" class="mb-16 pr-xl-64">
          <h2 v-html="$t('fairPosition.title')" />
          <p class="mb-lg-32" v-html="$t('fairPosition.description')" />

          <LinkMore :to="localePath('/about/fair-position')">
            {{ $t('global.more') }}
          </LinkMore>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      benefits: [
        { image: 'fair-position.svg', key: 'fairPosition' },
        { image: 'education.svg', key: 'education' },
        { image: 'saving.svg', key: 'production' },
        { image: 'iso.svg', key: 'quality' },
      ],
      breadcrumbs: [{ text: 'about.esg', active: true }],
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
.section-esg-benefits {
  .benefit-image {
    margin-bottom: 2rem;
  }

  .benefit-title {
    margin-bottom: 0;
  }
}

.achievements {
  background-color: $gray-200;
}

.achievements-container {
  background-image: url('/images/about/esg/esg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  .achivment-title {
    font-size: 2.5rem;
  }
}

@include media-breakpoint-up(lg) {
  .section-esg-benefits {
    .benefit-image {
      margin-bottom: 0.5rem;
    }

    .benefit-title {
      font-size: $font-size-4;
      font-weight: $font-weight-normal;
    }
  }
}

@include media-breakpoint-up(xl) {
  .achievements-container {
    background-image: url('/images/about/esg/esg.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>

<i18n>
{
  "en": {
    "benefits": {
      "education": "Comprehensive learning",
      "fairPosition": "Fair position",
      "production": "Lean manufacturing",
      "quality": "Consistent quality"
    },
    "community": {
      "description": "We help professionally grow our staff, employees of&nbsp;partners and&nbsp;everyone who works with&nbsp;electrical engineering. The&nbsp;EKF training center regularly conducts educational courses, seminars, webinars and&nbsp;master classes.",
      "title": "Contribution to&nbsp;the&nbsp;development of&nbsp;the&nbsp;professional community"
    },
    "consumption": {
      "description": "We introduce in&nbsp;enterprises the&nbsp;principles of&nbsp;lean manufacturing. Up to&nbsp;90% of&nbsp;the&nbsp;waste of&nbsp;our central warehouse we hand over to&nbsp;secondary processing. To&nbsp;save electricity, we installed diode light sources. We save forests due to&nbsp;electronic document flow.",
      "title": "Reasonable consumption of&nbsp;resources"
    },
    "fairPosition": {
      "description": "We strive to&nbsp;ensure the&nbsp;transparent work of&nbsp;the&nbsp;electrical engineering market to&nbsp;eliminate unscrupulous competition, the&nbsp;illicit trafficking of&nbsp;imported equipment and&nbsp;the&nbsp;implementation of&nbsp;fakes. We actively support the &laquo;Fair Position&raquo; project.",
      "title": "&laquo;Fair Position&raquo; participants"
    },
    "intro": "EKF strives to&nbsp;maintain a&nbsp;balance between economic growth and&nbsp;sustainable development. Caring for&nbsp;the&nbsp;environment and&nbsp;society is as&nbsp;important to&nbsp;us as&nbsp;expanding our business. We are continuously improving internal processes and&nbsp;production technologies, realizing the&nbsp;principles of&nbsp;ESG&nbsp;&ndash; environment, social responsibility, management.",
    "medium": {
      "description": "We appreciate the&nbsp;psychological and&nbsp;physical comfort of&nbsp;each employee&nbsp;&ndash; in&nbsp;the&nbsp;office, in&nbsp;production and&nbsp;remote. We build team relationships on&nbsp;trust, respect and&nbsp;support, and&nbsp;we consider workplace safety to&nbsp;be a&nbsp;mandatory part of&nbsp;concern for&nbsp;employees.",
      "title": "Comfortable and&nbsp;secure work environment"
    },
    "pageTitle": "Environmental. Social. Governance — EKF",
    "downloadEsgReport": "Download EKF ESG Progress Report 2023",
    "downloadEsgReport22": "Download EKF ESG Progress Report 2022",
    "responsibility": {
      "description": "Our production sites are certified by&nbsp;ISO&nbsp;9001, which guarantees stable high quality products. We test all components and&nbsp;finished products in&nbsp;international and&nbsp;Russian test centers, as&nbsp;well as&nbsp;in&nbsp;our own laboratory.",
      "title": "Responsibility to&nbsp;customers"
    },
    "title": "Environmental. Social. Governance",
    "titleTranslation": "Environmental. Social. Governance",
    "trail": {
      "description": "<p class='mb-8'>Reducing the&nbsp;impact on&nbsp;the&nbsp;planet on&nbsp;2&nbsp;levels:</p><ul class='pl-16'><li>Corporate: We use eco-friendly materials&nbsp;&ndash; metal, powder paint, recycled packaging</li><li>Personal: Collect the&nbsp;batteries and&nbsp;waste paper, spend the&nbsp;cleanup</li></ul>",
      "title": "Reducing the&nbsp;ecological trail"
    }
  },
  "ru": {
    "benefits": {
      "education": "Комплексное обучение",
      "fairPosition": "Честная позиция",
      "production": "Бережливое производство",
      "quality": "Стабильное качество"
    },
    "achievements": {
      "title": "Достижения на 2022 год",
      "1": {
        "title": "82,3%",
        "p": "отходов переработано"
      },
      "2": {
        "title": "на 20%",
        "p": "снижены выбросы от техники центрального&nbsp;склада"
      },
      "3": {
        "title": "на 43%",
        "p": "выросло число вознаграждений "
      },
      "4": {
        "title": "86%",
        "p": "сотрудников удовлетворено компанией "
      },
      "5": {
        "title": "3 235",
        "p": "часов обучения пройдено"
      }
    },
    "community": {
      "description": "Помогаем профессионально расти своему персоналу, сотрудникам партнеров и&nbsp;всем, кто работает с&nbsp;электротехникой. В&nbsp;учебном центре EKF регулярно проходят обучающие курсы, семинары, вебинары и&nbsp;мастер-классы.",
      "title": "Вклад в&nbsp;развитие профессионального сообщества"
    },
    "consumption": {
      "description": "Придерживаемся принципов бережливого производства. 80%&nbsp;отходов от&nbsp;собственного производства направлены на&nbsp;переработку специализированным компаниям. Сохраняем леса благодаря электронному документообороту.",
      "title": "Разумное потребление ресурсов"
    },
    "fairPosition": {
      "description": " Стремимся обеспечить прозрачную работу рынка электротехники, чтобы исключить недобросовестную конкуренцию, незаконный оборот импортного оборудования и реализацию подделок. Активно поддерживаем проект &laquo;Честная позиция&raquo;.",
      "title": "Участники &laquo;Честной позиции&raquo;"
    },
    "intro": "EKF стремится поддерживать баланс между экономическим ростом и&nbsp;устойчивым развитием. Заботиться об&nbsp;окружающей среде и&nbsp;обществе для&nbsp;нас так&nbsp;же важно, как&nbsp;расширять бизнес. Мы непрерывно совершенствуем внутренние процессы и&nbsp;производственные технологии, реализуя принципы ESG&nbsp;– окружающая среда, социальная ответственность, управление.",
    "medium": {
      "description": "Нам важен психологический и&nbsp;физический комфорт каждого работника&nbsp;– и&nbsp;офисного, и&nbsp;производственного, и&nbsp;удаленного. Мы строим отношения в&nbsp;команде на&nbsp;доверии, уважении и&nbsp;поддержке, а&nbsp;охрану труда считаем обязательной частью заботы о&nbsp;сотрудниках.",
      "title": "Комфортная и&nbsp;безопасная среда для&nbsp;работы"
    },
    "pageTitle": "Окружающая среда. Общество. Корпоративное управление — EKF",
    "downloadEsgReport": "Скачать отчет о ESG-прогрессе EKF за 2023 год",
    "downloadEsgReport22": "Скачать отчет о ESG-прогрессе EKF за 2022 год",
    "responsibility": {
      "description": "Наши производственные площадки сертифицированы по&nbsp;ISO&nbsp;9001, что гарантирует стабильное высокое качество продукции. Мы тестируем все комплектующие и&nbsp;готовые изделия в&nbsp;международных и&nbsp;российских испытательных центрах, а&nbsp;также в&nbsp;собственной лаборатории.",
      "title": "Ответственность перед клиентами"
    },
    "title": "Устойчивое развитие",
    "titleTranslation": "Environmental. Social. Governance",
    "trail": {
      "description": "<p class='mb-8'>Сокращаем воздействие на&nbsp;планету на&nbsp;2&nbsp;уровнях:</p><ul class='pl-16'><li>Корпоративный: используем экологичные материалы&nbsp;– металл, порошковую краску, упаковку из&nbsp;вторсырья</li><li>Личный: собираем батарейки и&nbsp;макулатуру, проводим субботники</li></ul>",
      "title": "Уменьшение экологического следа"
    }
  }
}
</i18n>
