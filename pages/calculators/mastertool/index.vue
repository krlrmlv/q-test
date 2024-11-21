<template>
  <b-container tag="main" class="pb-lg-32">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h1 class="h2 d-flex align-items-center">
      <span class="mr-8 d-flex">
        <img
          src="/images/calculators/mastertool.svg"
          height="44"
          aria-hidden="true"
        />
      </span>
      {{ $t('calculators.masterTool.title') }}
    </h1>

    <p class="mb-32 mb-lg-64">{{ $t('calculators.masterTool.description') }}</p>

    <div
      v-for="(group, index) in groups"
      :key="`group-${index}`"
      class="mb-32 mb-lg-48"
    >
      <h4 class="border-bottom pb-8">
        {{ group.name }}
      </h4>

      <ul class="list-mastertool column-count-lg-2 marker-secondary pl-16">
        <li
          v-for="(item, itemIndex) in group.items"
          :key="`item-${index}-${itemIndex}`"
          class="pl-4 mb-16"
        >
          <b-link :href="item.href" :to="item.to" class="list-mastertool-link">
            <span v-if="item.icon" class="list-mastertool-icon">
              <svg-icon
                :name="item.icon"
                width="24"
                height="24"
                aria-hidden="true"
              />
            </span>
            {{ item.name }}
          </b-link>
        </li>
      </ul>
    </div>
  </b-container>
</template>

<script>
import camelCase from 'lodash/camelCase'
import { mapGetters } from 'vuex'
import { mtGroups } from '~/components/constants/mastertool'
import { mindboxViewCalculator } from '@/utils/mindbox'

export default {
  data() {
    return {
      breadcrumbs: [
        { text: 'calculators.title', to: '/calculators' },
        {
          text: 'calculators.masterTool.title',
          to: '/calculators/mastertool',
          active: true,
        },
      ],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },

  computed: {
    ...mapGetters(['settingByKey']),

    groups() {
      return mtGroups?.map(({ items, name }) => ({
        name: this.$t(name),
        items: items?.map((item) => {
          let href, icon, to
          const name = this.$t(
            `calculators.masterTool.${camelCase(item.slug)}.linkText`
          )
          if (item.file) {
            href = `${process.env.REST_API_URL}${this.settingByKey(item.file)}`
            icon = 'file/xls-24'
          } else {
            to = this.localePath(`/calculators/mastertool/${item.slug}`)
          }
          return { href, icon, name, to }
        }),
      }))
    },
  },
  mounted() {
    mindboxViewCalculator(this.$t('pageTitle'))
  },
}
</script>

<style lang="scss" scoped>
.list-mastertool {
  column-gap: 2rem;
}

.list-mastertool-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;

  &:hover {
    color: $primary;
  }
}

.list-mastertool-icon {
  align-self: flex-start;
  margin-right: 0.5rem;
  color: $secondary;
}
</style>

<i18n>
{
  "en": {
    "pageTitle": "MasterTool service — EKF"
  },
  "ru": {
    "pageTitle": "Сервис MasterTool — EKF"
  }
}
</i18n>
