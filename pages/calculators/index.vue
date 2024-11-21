<template>
  <b-container tag="main" class="pb-32 pb-lg-64">
    <AppBreadcrumbs :items="breadcrumbs" />

    <h1 class="h2">{{ $t('calculators.title') }}</h1>

    <p class="mb-32 mb-lg-64">
      {{ $t('calculators.description') }}
    </p>

    <b-row class="mb-8">
      <b-col
        v-for="(calculator, index) in calculators"
        :key="`calculator-${index}`"
        cols="12"
        md="6"
        lg="4"
        class="mb-16 mb-sm-24"
      >
        <b-link
          :to="localePath(calculator.to)"
          :href="calculator.href"
          class="card card-calculator"
        >
          <div class="card-header">
            <span class="mr-8">
              <img :src="calculator.image" height="44" aria-hidden="true" />
            </span>
            <h4 class="mb-0">{{ $t(calculator.title) }}</h4>
          </div>
          <div class="card-body">
            <p>{{ $t(calculator.description) }}</p>
          </div>
          <div class="card-footer">
            {{ $t('global.more') }}
            <svg-icon
              name="arrow-right-24"
              width="24"
              height="24"
              class="ml-8"
              aria-hidden="true"
            />
          </div>
        </b-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [
        { text: 'calculators.title', to: '/calculators', active: true },
      ],
      calculators: [
        {
          title: 'calculators.masterCost.title',
          description: 'calculators.masterCost.description',
          image: '/images/calculators/mastercost.svg',
          to: '/calculators/mastercost',
        },
        // {
        //   title: 'calculators.masterHome.title',
        //   description: 'calculators.masterHome.description',
        //   image: '/images/calculators/masterhome.svg',
        //   to: '/calculators/masterhome',
        // },
        // {
        //   title: 'calculators.masterCad.title',
        //   description: 'calculators.masterCad.description',
        //   image: '/images/calculators/mastercad.svg',
        //   to: '/calculators/mastercad',
        // },
        {
          title: 'calculators.masterTool.title',
          description: 'calculators.masterTool.description',
          image: '/images/calculators/mastertool.svg',
          to: '/calculators/mastertool',
        },
        {
          title: 'calculators.masterTray.title',
          description: 'calculators.masterTray.description',
          image: '/images/calculators/mastertray.svg',
          to: '/calculators/mastertray',
        },
        {
          title: 'calculators.masterSticker.title',
          description: 'calculators.masterSticker.description',
          image: '/images/calculators/mastersticker.svg',
          to: '/calculators/mastersticker',
        },
        {
          title: 'calculators.masterLight.title',
          description: 'calculators.masterLight.description',
          image: '/images/calculators/masterlight.svg',
          to: '/calculators/masterlight',
        },
        {
          title: 'calculators.masterRoof.title',
          description: 'calculators.masterRoof.description',
          image: '/images/calculators/masterroof.svg',
          to: '/calculators/masterroof',
        },
        // {
        //   title: 'calculators.masterKupol.title',
        //   description: 'calculators.masterKupol.description',
        //   image: '/images/calculators/masterkupol.svg',
        //   to: '/calculators/masterkupol',
        // },
      ],
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
.card-calculator {
  height: 100%;
  font-size: $font-size-2;
  line-height: 1.4;
  color: inherit;
  transition: $transition-base;
  transition-property: box-shadow;

  &:hover {
    text-decoration: none;
    box-shadow: $box-shadow;
  }

  .card-header {
    display: flex;
    align-items: center;
    padding: 2.5rem 2.5rem 0;
    background-color: transparent;
  }

  .card-body {
    padding: 1rem 2.5rem;
  }

  .card-footer {
    display: flex;
    align-items: center;
    padding: 0 2.5rem 2.5rem;
    font-size: $font-size-3;
    font-weight: $font-weight-medium;
    color: $primary;
    background-color: transparent;
  }
}

@include media-breakpoint-down(md) {
  .card-calculator {
    box-shadow: $box-shadow-sm;
  }
}
</style>

<i18n>
{
  "en": {
    "pageTitle": "Calculators and configurators — EKF"
  },
  "ru": {
    "pageTitle": "Калькуляторы и конфигураторы — EKF"
  }
}
</i18n>
