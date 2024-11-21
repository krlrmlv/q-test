<template>
  <div class="pb-24">
    <transition name="fade" mode="out-in">
      <div :key="currentPage">
        <div
          v-for="(vacancy, index) in paginatedVacancies"
          :key="`vacancy-${index}`"
          :class="{ 'border-top': index > 0 }"
          class="pt-32 pb-24"
        >
          <b-row>
            <b-col md="6" lg="5" offset-xl="1">
              <p class="fs-4 mb-4">
                <b-link
                  :to="localePath(`/about/career/${vacancy.id}`)"
                  class="text-reset"
                >
                  {{ vacancy.name }}
                </b-link>
              </p>
              <p class="text-muted mb-4 mb-md-0">
                {{ formatDate(vacancy.created_at) }}
              </p>
            </b-col>
            <b-col cols="7" md="3">
              <p class="mb-0">
                {{ formatSalary(vacancy.salary) }}
              </p>
            </b-col>
            <b-col cols="5" md="3" class="text-right text-md-left">
              <p class="mb-0">
                {{ vacancy.area && vacancy.area.name }}
              </p>
            </b-col>
          </b-row>
        </div>
      </div>
    </transition>

    <AppPagination
      v-if="totalRows > perPage"
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="totalRows"
      align="center"
      size="sm"
      class="mt-16"
    />
  </div>
</template>

<script>
import formatSum from '@/utils/formatSum'

export default {
  props: {
    vacancies: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      currentPage: 1,
      // perPage: 10,
    }
  },

  computed: {
    perPage() {
      return parseInt(this.$route.query.perPage) || 10
    },
    paginatedVacancies() {
      const start = this.perPage * (this.currentPage - 1)
      const end = start + this.perPage
      return this.vacancies.slice(start, end)
    },

    totalRows() {
      return this.vacancies?.length
    },
  },

  methods: {
    formatDate(datestring) {
      const date = new Date(datestring)
      const options = { dateStyle: 'medium' }
      return date.toLocaleString(this.$i18n.localeProperties.iso, options)
    },

    formatSalary(salary) {
      if (!salary) return this.$t('salaryNotSpecified')
      else {
        let salaryString = ''
        if (salary.from) {
          salaryString =
            salaryString +
            ` ${this.$t('from')} ${formatSum(salary.from, this.$i18n.locale)}`
        }
        if (salary.to) {
          salaryString =
            salaryString +
            ` ${this.$t('to')} ${formatSum(salary.to, this.$i18n.locale)}`
        }
        salaryString = salaryString + ' ₽'

        return salaryString
      }
    },
  },
}
</script>

<i18n>
{
  "en": {
    "from": "from",
    "salaryNotSpecified": "salary not specified",
    "to": "to"
  },
  "ru": {
    "from": "от",
    "salaryNotSpecified": "з/п не указана",
    "to": "до"
  }
}
</i18n>
