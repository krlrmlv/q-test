<template>
  <main>
    <b-container tag="section" class="mb-32">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2 mb-32">
        {{ vacancy.name }}
      </h1>

      <article class="vacancy-content mb-32 mb-lg-64">
        <h5>
          {{ $t('city') }}
        </h5>

        <p class="mb-32">
          {{ cityName }}
        </p>

        <div v-html="sanitizedDescription" />
      </article>

      <h2 class="h3 mb-32 mb-lg-48">
        {{ $t('submitForm') }}
      </h2>

      <b-row>
        <b-col xl="8">
          <CareerForm :vacancy-name="vacancy.name" />
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
import sanitizeHtml from 'sanitize-html'

export default {
  async asyncData({ error: nuxtError, params, $axios }) {
    const vacancyId = params.vacancy
    let vacancy

    /* Fetch vacancy data */
    try {
      const { data } = await $axios.get(
        `https://api.hh.ru/vacancies/${vacancyId}`
      )
      vacancy = data
    } catch (error) {
      return nuxtError({ statusCode: 404 })
    }

    if (!vacancy || vacancy?.archived) return nuxtError({ statusCode: 404 })

    /* Build breadcrumbs */
    const breadcrumbs = [{ text: 'about.career', to: '/about/career' }]
    if (vacancy.name) {
      breadcrumbs.push({ text: vacancy.name, active: true })
    }

    return { breadcrumbs, vacancy }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },

  computed: {
    cityName() {
      return this.vacancy?.area?.name || this.$t('cityNotSpecified')
    },

    pageTitle() {
      let title = ''
      if (this.vacancy?.name) {
        title += this.vacancy.name
        if (this.vacancy?.area?.name) title += ` (${this.vacancy.area.name})`
        title += ' — '
      }
      title += this.$t('pageTitle')
      return title
    },

    sanitizedDescription() {
      return sanitizeHtml(this.vacancy?.description) || ''
    },
  },
}
</script>

<style lang="scss" scoped>
.vacancy-content {
  ::v-deep h5,
  .h5 {
    margin-bottom: 0.5rem;
    color: $primary;

    &:not(:first-child) {
      margin-top: 2rem;
    }
  }

  ::v-deep {
    p > strong {
      color: $primary;

      @include media-breakpoint-up(md) {
        font-size: 22px;
      }
    }
  }

  ::v-deep ul,
  ol {
    padding-left: 1.125em;

    li > p {
      margin-bottom: 0;
    }
  }
}

@include media-breakpoint-up(lg) {
  .vacancy-content {
    font-size: $font-size-4;
  }
}
</style>

<i18n>
{
  "en": {
    "city": "City",
    "cityNotSpecified": "Not specified",
    "pageTitle": "Career — EKF",
    "submitForm": "Submit the form and we will call you back",
    "vacancyNotFound": "Vacancy not found."
  },
  "ru": {
    "city": "Город",
    "cityNotSpecified": "Не указан",
    "pageTitle": "Карьера — EKF",
    "submitForm": "Отправь анкету, и мы обязательно перезвоним",
    "vacancyNotFound": "Вакансия не найдена."
  }
}
</i18n>
