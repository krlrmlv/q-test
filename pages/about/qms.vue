<template>
  <main>
    <b-container tag="section">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="text-lg-center text-gray-900">
        {{ $t('title') }}
      </h1>
      <p class="text-lg-center mb-32" v-html="$t('intro.line1')" />

      <picture>
        <source
          srcset="/images/about/qms/main-sm.jpg"
          media="(max-width: 767px)"
        />
        <source
          srcset="/images/about/qms/main-md.jpg"
          media="(max-width: 1199px)"
        />
        <source
          srcset="/images/about/qms/main.jpg"
          media="(max-width: 1295px)"
        />
        <source srcset="/images/about/qms/main-xl.jpg" />
        <img
          :alt="$t('title')"
          src="/images/about/qms/main.jpg"
          class="img-fluid mb-32"
        />
      </picture>

      <p class="text-lg-center mb-0" v-html="$t('intro.line2')" />
    </b-container>

    <b-container tag="section" class="section-about pb-lg-64">
      <p class="h5 text-center mb-32" v-html="$t('responsibility.header')" />
      <b-row>
        <b-col xl="10" offset-xl="1">
          <ul class="pl-16">
            <li class="mb-16" v-html="$t('responsibility.line1')" />
            <li class="mb-16" v-html="$t('responsibility.line2')" />
            <li class="mb-16" v-html="$t('responsibility.line3')" />
            <li class="mb-16" v-html="$t('responsibility.line4')" />
            <!-- <li class="mb-16" v-html="$t('responsibility.line5')" /> -->
          </ul>
        </b-col>
      </b-row>
      <!-- <p class="h5 text-center" v-html="$t('priority')" />
      <p class="text-center mb-48" v-html="$t('qualityMark')" />

      <b-row align-v="center" class="mb-n16">
        <b-col md="6" xl="5" offset-xl="1">
          <p>{{ $t('signature.position') }}</p>
        </b-col>
        <b-col
          md="6"
          xl="5"
          class="d-flex align-items-center justify-content-end text-right"
        >
          <div class="mr-16 mb-16">
            <img
              :alt="$t('signature.name')"
              src="/images/about/qms/signature.jpg"
              width="110"
            />
          </div>
          <p>{{ $t('signature.name') }}</p>
        </b-col>
      </b-row> -->
      <div class="pt-16 text-center">
        <b-button
          href="/files/quality.pdf"
          variant="link"
          class="text-decoration-none p-0 border-0 text-left"
          download
        >
          <svg-icon
            name="download"
            width="24"
            height="24"
            class="mr-8"
            aria-hidden="true"
          />
          {{ $t('qualityBtn') }}
        </b-button>
      </div>
    </b-container>

    <section class="section-about bg-light">
      <b-container class="text-center">
        <p class="h2 mb-8" v-html="$t('feedback.title')" />
        <p class="h4 text-primary mb-0">
          <span v-html="$t('feedback.writeToDirector')" />:
          <b-link href="mailto:ceo@ekf.su">ceo@ekf.su</b-link>
        </p>
      </b-container>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: this.$t('title'), active: true }],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
}
</script>

<i18n>
{
  "en": {
  "qualityBtn": "Политика в области качества",
    "feedback": {
      "title": "Quality problems?",
      "writeToDirector": "Write to&nbsp;the&nbsp;director"
    },
    "intro": {
      "line1": "Our goal is&nbsp;to&nbsp;keep the&nbsp;high bar of&nbsp;the&nbsp;leading Russian manufacturer of&nbsp;electrical products that meet the&nbsp;requirements and&nbsp;requests of&nbsp;consumers.",
      "line2": "Improving the&nbsp;competitiveness and&nbsp;quality of&nbsp;products is&nbsp;one of&nbsp;the&nbsp;strategic goals of&nbsp;the&nbsp;Company, the&nbsp;achievement of&nbsp;which ensures its sustainable profit; income growth and&nbsp;staff employment. The&nbsp;solution to&nbsp;this problem is determined by&nbsp;an&nbsp;effective production organization and&nbsp;management system that takes into&nbsp;account the&nbsp;requirements of&nbsp;national ISO&nbsp;9000 standards and&nbsp;the&nbsp;principles of&nbsp;total quality management (TQM)."
    },
    "pageTitle": "Quality Management System — EKF",
    "priority": "When assessing the&nbsp;performance of&nbsp;organizational units, priority belongs to&nbsp;quality indicators",
    "qualityMark": "Our name should become a&nbsp;quality mark for&nbsp;our partners and&nbsp;for&nbsp;us",
    "responsibility": {
      "header": "To&nbsp;achieve these goals, the&nbsp;management of&nbsp;Elektroresheniya LLC takes responsibility for:",
      "line1": "Focus on&nbsp;consolidating existing and&nbsp;developing new sales markets through product quality and&nbsp;expanding its range",
      "line2": "Ensure the&nbsp;pursuit of&nbsp;quality level allowing us to&nbsp;be one of&nbsp;the&nbsp;leaders in&nbsp;Russia",
      "line3": "Improve the&nbsp;management system, including through the&nbsp;introduction of&nbsp;advanced management methods",
      "line4": "Promote activities aimed at&nbsp;the development of&nbsp;the&nbsp;Company"
    },
    "signature": {
      "name": "Emelyanov S. G.",
      "position": "General director"
    },
    "title": "Quality Management System"
  },
  "ru": {
    "qualityBtn": "Политика в области качества",
    "feedback": {
      "title": "Проблемы с&nbsp;качеством?",
      "writeToDirector": "Напишите директору"
    },
    "intro": {
      "line1": "Мы — для клиента. <br> Залог успеха компании — довольные внешние и внутренние клиенты. <br> Мы честны с нашими клиентами.",
      "line2": "Повышение конкурентоспособности и качества выпускаемой продукции — одна из стратегических целей Компании, достижение которой обеспечивает ее устойчивую прибыль; рост доходов и занятость персонала. Решение этой задачи определяется эффективной системой организации и управления производством, учитывающей требования национальных стандартов ISO 9000 и принципы всеобщего управления качеством (TQM)."
    },
    "pageTitle": "Система менеджмента качества — EKF",
    "priority": "При&nbsp;оценке деятельности подразделений организации приоритет принадлежит показателям качества",
    "qualityMark": "Наше имя должно стать маркой качества для&nbsp;наших партнеров и&nbsp;для&nbsp;нас",
    "responsibility": {
      "header": "Действующая СМК призвана:",
      "line1": "Обеспечить комплексное управление организационной, коммерческой и технической деятельностью компании, что способствует удовлетворению требований клиента в полном объёме",
      "line2": "Обеспечить внедрение передовых методов и принципов постоянного улучшения, в том числе путем проведения внутренних аудитов",
      "line3": "Быть восприимчивой и гибкой к голосу клиента, его потребностям и ожиданиям",
      "line4": "Реализовать механизмы обеспечения качества на всех стадиях жизненного цикла продукции"
    },
    "signature": {
      "name": "Емельянов С. Г.",
      "position": "Генеральный директор"
    },
    "title": "Система менеджмента качества"
  }
}
</i18n>
