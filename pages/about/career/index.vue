<template>
  <main>
    <b-container tag="section" class="mb-32 mb-lg-64">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="text-lg-center">
        {{ $t('about.career') }}
      </h1>
      <p class="text-lg-center mb-32" v-html="$t('intro.line1')" />

      <picture>
        <source
          v-for="source in imageSources"
          :key="`src-${source.w || 'full'}`"
          :srcset="`/images/about/career/${source.src}`"
          :media="source.w ? `(max-width: ${source.w}px)` : null"
        />
        <img
          :alt="$t('bannerAlt')"
          src="/images/about/career/main.jpg"
          class="img-fluid mb-32"
        />
      </picture>

      <p class="text-lg-center mb-32" v-html="$t('intro.line2')" />
    </b-container>

    <section class="py-64 py-md-88 bg-light">
      <b-container>
        <h2 class="sr-only">{{ $t('benefits.srTitle') }}</h2>

        <ul class="benefits-list">
          <li
            v-for="(benefit, index) in benefits"
            :key="`benefit-${index}`"
            class="text-center benefits-item"
          >
            <img
              alt=""
              :src="`/images/about/career/${benefit}.svg`"
              height="128"
              width="128"
            />

            <p class="fs-4 mb-0">
              {{ $t(`benefits.${benefit}`) }}
            </p>
          </li>
        </ul>
      </b-container>
    </section>

    <b-container tag="section" class="section-about">
      <h2 class="text-lg-center mb-32 mb-lg-64">
        {{ $t('vacancies') }}
      </h2>

      <CareerAccordion :professional-roles="professionalRoles" />
    </b-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      benefits: [
        'conditions',
        'birthday',
        'friday',
        'discount',
        'education',
        'teambuilding',
      ],
      breadcrumbs: [{ text: 'about.career', active: true }],
      clusters: [],
      imageSources: [
        { src: 'main-sm.jpg', w: 767 },
        { src: 'main-md.jpg', w: 1199 },
        { src: 'main.jpg' },
      ],
    }
  },

  async fetch() {
    const { data } = await this.$axios.get(
      'https://api.hh.ru/vacancies?employer_id=4522&per_page=1&clusters=true'
    )
    this.clusters = data?.clusters
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },

  computed: {
    professionalRoles() {
      const cluster = this.clusters?.find(
        ({ id }) => id === 'professional_role'
      )

      return (
        cluster?.items
          ?.sort((a, b) => a.name.localeCompare(b.name))
          ?.map(({ count, name, url }) => ({
            count,
            name,
            url: url.replace('per_page=1&', 'per_page=100&no_magic=true&'),
          })) || []
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.benefits-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 2rem;
  padding: 0;

  .benefits-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.5rem;
    flex: 0 1 362px;
  }

  @include media-breakpoint-down(md) {
    .benefits-item {
      flex-basis: 336px;
    }
  }

  @include media-breakpoint-down(sm) {
    justify-content: center;

    .benefits-item {
      flex-basis: auto;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "bannerAlt": "EKF staff",
    "benefits": {
      "srTitle": "Benefits of working at EKF",
      "birthday": "4-hour working day on employee's birthday",
      "conditions": "Comfortable working conditions",
      "discount": "Special discount for the purchase of electrical equipment",
      "education": "Internship and integrated training under the guidance of experienced mentors",
      "friday": "Shorter working hours on Friday",
      "teambuilding": "Corporate seminars and webinars, outdoor trainings and business games"
    },
    "intro": {
      "line1": "EKF is included in the TOP-150 best employers of &laquo;large companies of Russia&raquo; according to the portal hh.ru",
      "line2": "We offer work in&nbsp;the&nbsp;team of&nbsp;experienced specialists, where favorable conditions are created for&nbsp;professional and&nbsp;personal growth.<br />We value each employee, as&nbsp;we are convinced that people are most important."
    },
    "pageTitle": "Career — EKF",
    "vacancies": "Vacancies"
  },
  "ru": {
    "bannerAlt": "Сотрудники EKF",
    "benefits": {
      "srTitle": "Преимущества работы в EKF",
      "birthday": "4-часовой рабочий день в день рождения сотрудника",
      "conditions": "Комфортные условия работы",
      "discount": "Специальные цены на приобретение электротехнического оборудования",
      "education": "Cтажировка и комплексное обучение под руководством опытных наставников",
      "friday": "Сокращенный рабочий день в пятницу",
      "teambuilding": "Корпоративные семинары и вебинары, выездные тренинги и деловые игры"
    },
    "intro": {
      "line1": "EKF входит в&nbsp;рейтинг ТОП-150 лучших работодателей &laquo;крупных компаний России&raquo; по&nbsp;версии портала hh.ru",
      "line2": "Мы предлагаем работу в&nbsp;команде опытных специалистов, где&nbsp;созданы благоприятные условия для&nbsp;профессионального и&nbsp;личностного роста.<br />Мы дорожим каждым сотрудником, так&nbsp;как убеждены, что люди&nbsp;– это главная ценность."
    },
    "pageTitle": "Карьера — EKF",
    "vacancies": "Вакансии"
  }
}
</i18n>
