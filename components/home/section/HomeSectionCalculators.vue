<template>
  <section
    :class="bgVariant ? `bg-${bgVariant}` : null"
    class="section-home section-home-calculators"
  >
    <b-container>
      <b-row align-v="center" class="mb-lg-64">
        <b-col md="10" lg="8" xl="9">
          <h2>{{ $t('title') }}</h2>
        </b-col>
        <b-col lg="4" xl="3" class="d-none d-lg-block text-right mb-auto">
          <LinkMore :to="localePath('/calculators')">
            {{ $t('linkText') }}
          </LinkMore>
        </b-col>
        <b-col md="10 " lg="9">
          <p class="mb-lg-0">
            {{ $t(`${subtitleVariant}`) }}
          </p>
        </b-col>

        <b-col cols="12" class="d-lg-none">
          <b-nav class="nav-calculators-mobile" tabs vertical>
            <b-nav-item
              :to="localePath('/calculators/mastercost')"
              link-classes="justify-content-start px-16"
              class="mb-8"
            >
              <svg-icon
                name="calculators/mastercost-sm"
                width="38"
                height="32"
                class="mr-16"
                aria-hidden="true"
              />
              {{ $t('calculators.masterCost.tabCaption') }}
            </b-nav-item>

            <b-nav-item
              :to="localePath('/calculators/mastercad')"
              link-classes="justify-content-start px-16"
              class="mb-8"
            >
              <svg-icon
                name="calculators/mastercad-sm"
                width="38"
                height="32"
                class="mr-16"
                aria-hidden="true"
              />
              {{ $t('calculators.masterCad.subtitle') }}
            </b-nav-item>

            <b-nav-item
              :to="localePath('/calculators/mastertool/lightning-protection')"
              link-classes="justify-content-start px-16"
              class="mb-32"
            >
              <svg-icon
                name="calculators/calculator-sm"
                width="38"
                height="32"
                class="mr-16"
                aria-hidden="true"
              />
              {{ $t('calculators.airTerminal.title') }}
            </b-nav-item>
          </b-nav>
        </b-col>

        <b-col class="text-center d-lg-none">
          <LinkMore :to="localePath('/calculators')">
            {{ $t('linkText') }}
          </LinkMore>
        </b-col>
      </b-row>

      <HomeCalculatorTabs />
    </b-container>
  </section>
</template>

<script>
import { BNav, BNavItem } from 'bootstrap-vue'

export default {
  name: 'HomeSectionCalculators',

  serverCacheKey: ({ bgVariant }) => `HomeSectionCalculators::${bgVariant}`,

  components: {
    BNav,
    BNavItem,
  },

  props: {
    bgVariant: {
      type: String,
      default: '',
    },
    subtitleVariant: {
      type: String,
      default: 'subtitle',
    },
  },
}
</script>

<style lang="scss" scoped>
.section-home-calculators {
  ::v-deep {
    .home-calculator-tabs {
      .nav-tabs:not(.nav-calculators) {
        background-color: transparent;

        .nav-link.active {
          background-color: transparent;
        }
      }

      .nav-tabs.nav-calculators {
        .nav-link::after {
          display: none;
        }
      }
    }

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
      padding: 0.4375rem 1.5rem;
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
    "lkpSubtitle": "Подберите аналог электротехнической продукции других брендов или рассчитайте необходимое количество продукции с помощью наших бесплатных калькуляторов. Это особенно актуально, если вы ищете оборудование, которое уже заложено в проект, но нет возможности его приобрести",
    "title": "Рассчитайте или подберите оборудование"
  },
  "en": {
    "linkText": "Show all calculators",
    "subtitle": "Free calculators for the electrical industry",
    "lkpSubtitle": "Select analogues of electrical products from other brands or calculate the required quantity of products using our free calculators. This is especially true if you are looking for equipment that is already included in the project, but there is no way to purchase it",
    "title": "Calculate or select equipment"
  }
}
</i18n>
