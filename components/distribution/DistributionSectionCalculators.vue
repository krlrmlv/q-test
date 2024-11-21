<template>
  <section
    :class="bgVariant ? `bg-${bgVariant}` : null"
    class="section-home section-home-calculators pb-0 pb-lg-24"
  >
    <b-container>
      <div>
        <div class="d-flex justify-content-between">
          <h2 class="mb-0" v-html="$t('title')"></h2>
          <LinkMore :to="localePath('/calculators')" class="d-none d-lg-block">
            {{ $t('linkText') }}
          </LinkMore>
        </div>
        <b-row class="mt-16 mb-5">
          <b-col md="8" xl="9">
            Сервис MasterCost для подбора аналогов оборудования
            EKF на продукцию европейских и отечественных брендов.
          </b-col>
        </b-row>
      </div>

      <LazyMasterCost/>
    </b-container>
  </section>
</template>

<script>

export default {
  name: 'DistributionSectionCalculators',

  serverCacheKey: ({ bgVariant }) =>
    `DistributionSectionCalculators::${bgVariant}`,

  props: {
    bgVariant: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.section-home-calculators {
  ::v-deep {
    .nav-calculators-mobile,
    .nav-calculators {
      .nav-link {
        text-align: left;

        .icon {
          fill: $primary;
        }

        &:not(.active) {
          color: $white;
          background-color: $secondary;

          &:hover {
            background-color: darken($secondary, 10%);
          }
        }

        &.active {
          cursor: default;
        }
      }
    }

    .tab-calculators {
      padding-top: 0.4375rem;
      padding-bottom: 0.4375rem;
      text-align: left;
    }

    .card-calculator {
      .card-header {
        margin-bottom: 2rem;
        padding: 0;
        background-color: transparent;
      }
    }
  }
}
</style>

<i18n>
{
  "ru": {
    "linkText": "Смотреть все калькуляторы",
    "subtitle": "Бесплатные калькуляторы для электротехнической отрасли",
    "title": "Рассчитайте или подберите <br> оборудование"
  },
  "en": {
    "linkText": "Show all calculators",
    "subtitle": "Free calculators for the electrical industry",
    "title": "Calculate or select equipment"
  }
}
</i18n>
