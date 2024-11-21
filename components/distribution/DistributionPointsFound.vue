<template>
  <p :class="{ loading: loading }" class="distribution-points-found">
    <span v-if="loading" class="d-flex align-items-center">
      <b-spinner class="mr-8" small />
      {{ $t('loading') }}
    </span>

    <span v-else>
      {{
        getDeclension(
          quantity,
          $t(`foundPrefix${isPartners ? 'Partners' : ''}`)
        )
      }}
      {{ quantity }}
      {{
        getDeclension(
          quantity,
          $t(`foundSuffix${isPartners ? 'Partners' : ''}`)
        )
      }}
    </span>
  </p>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import getDeclension from '@/utils/declension'

export default {
  components: { BSpinner },

  props: {
    isPartners: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    getDeclension,
  },
}
</script>

<style lang="scss" scoped>
.distribution-points-found {
  margin-bottom: 0;
  font-size: $font-size-2;
  color: $secondary;
  transition: $transition-base;
  transition-property: opacity;

  &.loading {
    opacity: 0.5;
  }
}
</style>

<i18n>
{
  "en": {
    "foundPrefix": "Found,Found,Found",
    "foundPrefixPartners": "Found,Found,Found",
    "foundSuffix": "branch,branches,branches",
    "foundSuffixPartners": "branch,branches,branches",
    "loading": "Loading..."
  },
  "ru": {
    "foundPrefix": "Найдена,Найдено,Найдено",
    "foundPrefixPartners": "Найдена,Найдено,Найдено",
    "foundSuffix": "точка продаж,точки продаж,точек продаж",
    "foundSuffixPartners": "точка,точки,точек",
    "loading": "Загрузка..."
  }
}
</i18n>
