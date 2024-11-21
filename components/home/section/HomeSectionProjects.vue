<template>
  <section class="section-home section-home-projects">
    <b-container>
      <b-row class="mb-32 mb-lg-64">
        <b-col lg="8">
          <h2 class="mb-0">
            {{ $t('title') }}
          </h2>
        </b-col>
        <b-col lg="4" class="d-none d-lg-block text-right mb-auto">
          <LinkMore :to="localePath('/about/news/category/projects')">
            {{ $t('linkText') }}
          </LinkMore>
        </b-col>
      </b-row>
      <ComboTabs
        v-model="activeTabIndex"
        :tabs="visibleTabs"
        content-class="pt-32 pt-lg-64"
        justified
        scrollable
      >
        <template v-for="({ tab }, index) in visibleTabs" #[`tab(${index})`]>
          <b-row :key="tab" align-v="center">
            <b-col lg="6" xl="5">
              <div class="project-text">
                <p class="project-category">
                  {{ $t(`${tab}.categoryTitle`) }}
                </p>
                <h6 class="project-title">
                  {{ $t(`${tab}.title`) }}
                </h6>
                <b-img-lazy
                  :alt="$t(`${tab}.title`)"
                  :src="`/images/home/projects/${tab}.jpg`"
                  class="img-fluid d-lg-none mb-8"
                />
                <p>
                  {{ $t(`${tab}.description`) }}
                </p>
                <div class="d-none d-lg-block">
                  <LinkMore :to="localePath('/about/news/category/projects')">
                    {{ $t('linkText') }}
                  </LinkMore>
                </div>
              </div>
            </b-col>
            <b-col lg="6" xl="7" class="d-none d-lg-block">
              <div class="project-image">
                <b-img-lazy
                  :alt="$t(`${tab}.title`)"
                  :src="`/images/home/projects/${tab}.jpg`"
                  class="img-fluid"
                />
              </div>
            </b-col>
          </b-row>
        </template>
      </ComboTabs>

      <div class="text-center d-lg-none mt-16">
        <LinkMore :to="localePath('/about/news/category/projects')">
          {{ $t('linkText') }}
        </LinkMore>
      </div>
    </b-container>
  </section>
</template>

<script>
import { BImgLazy } from 'bootstrap-vue'

export default {
  name: 'HomeSectionProjects',

  serverCacheKey: () => 'HomeSectionProjects',

  components: {
    BImgLazy,
  },

  data() {
    return {
      activeTabIndex: 0,
    }
  },

  computed: {
    visibleTabs() {
      return ['housing', 'industry', 'infrastructure', 'commercial'].map(
        (tab) => ({ tab, title: this.$t(`${tab}.categoryTitle`) })
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.project-category {
  margin-bottom: 0.5rem;
  font-size: $font-size-1;
  color: $gray-500;
}

@include media-breakpoint-down(md) {
  .project-title {
    margin-bottom: 0.5rem;
    font-size: 1.375rem;
  }

  ::v-deep {
    .nav-tabs {
      display: none;
    }

    .tab-pane {
      display: block !important;
      margin-top: 1rem;
    }
  }
}

@include media-breakpoint-up(lg) {
  .project-category {
    display: none;
  }

  .project-text {
    position: relative;
    min-height: 200px;
    margin-right: calc(-100% / 6 - #{$grid-gutter-width * 2});
    padding: 2.5rem;
    background-color: $white;
    box-shadow: $box-shadow-lg;
    z-index: 1;
  }

  .project-image {
    position: relative;

    &::before {
      display: block;
      content: '';
      padding-bottom: 59.009%;
    }

    & > img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  ::v-deep {
    .tab-content {
      padding-top: 4rem;
    }
  }
}

@include media-breakpoint-up(xl) {
  .project-text {
    margin-right: -21%;
  }
}
</style>

<i18n>
{
  "ru": {
    "commercial": {
      "categoryTitle": "Коммерческое строительство",
      "description": "Наша электротехника – в офисных зданиях и торговых центрах по всей стране. Снабжаем объекты всем – от розеток до автоматических выключателей и молниезащиты.",
      "title": "Оборудование для офисов и магазинов"
    },
    "housing": {
      "categoryTitle": "Жилищное строительство",
      "description": "В каждой 5-й квартире РФ установлены автоматические выключатели EKF, а это более 200 млн штук.",
      "title": "Оборудование для жилой недвижимости"
    },
    "industry": {
      "categoryTitle": "Промышленность",
      "description": "Помогаем развивать энергоэффективные технологии для объектов нефтяной, газовой и энергетической отрасли, предприятий авиакосмического сектора, тяжелой и легкой промышленности.",
      "title": "Оборудование для любого сектора экономики"
    },
    "infrastructure": {
      "categoryTitle": "Инфраструктурные объекты",
      "description": "Наше оборудование установлено на стадионе «Фишт» в Сочи, космодроме «Восточный», Нижегородской АЭС и других знаковых объектах.",
      "title": "EKF – в значимых федеральных проектах"
    },
    "linkText": "Смотреть все проекты",
    "title": "Реализованные проекты"
  },
  "en": {
    "commercial": {
      "categoryTitle": "Commercial building",
      "description": "Our electrical engineering is in office buildings and shopping centers all over the country. We supply objects with everything - from sockets to circuit breakers and lightning protection.",
      "title": "Equipment for offices and shops"
    },
    "housing": {
      "categoryTitle": "Housing construction",
      "description": "EKF circuit breakers are installed in every 5th apartment of the Russian Federation, and this is more than 200 million pieces.",
      "title": "Residential equipment"
    },
    "industry": {
      "categoryTitle": "Industry",
      "description": "We help develop energy efficient technologies for oil, gas and energy facilities, aerospace enterprises, heavy and light industries.",
      "title": "Equipment for any sector of the economy"
    },
    "infrastructure": {
      "categoryTitle": "Infrastructure facilities",
      "description": "Our equipment has been installed in hospitals for the treatment of coronavirus, at the Fisht stadium in Sochi, the Crimean Bridge, the Vostochny cosmodrome, the Nizhny Novgorod nuclear power plant and other significant sites.",
      "title": "EKF in significant federal projects"
    },
    "points": "Show all projects",
    "title": "Completed projects"
  }
}

</i18n>
