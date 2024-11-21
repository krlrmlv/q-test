<template>
  <div class="cards-container">
    <b-col
      v-for="card in siteCards"
      :key="card.url"
      cols="12"
      lg="4"
      class="mb-24 mb-xl-0"
    >
      <div
        class="card card-body p-40"
        :class="{ 'current-site': withCurrentSite && card?.isCurrent }"
        @click="navigate(card)"
      >
        <h4 class="card-title mb-8">
          {{ card.title }}

          <span class="text-muted">({{ card.langCode }})</span>
        </h4>

        <p class="mb-32">{{ card.subtitle }}</p>

        <span v-if="withCurrentSite && card.isCurrent" class="card-btn text"
          >Вы на этом сайте</span
        >

        <b-button v-else variant="primary" class="card-btn">
          {{ card.btnText }}

          <svg-icon
            name="arrow-right-24"
            class="ml-8 d-md-none d-lg-block"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </b-button>
      </div>
    </b-col>
  </div>
</template>

<script>
export default {
  props: {
    withCurrentSite: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      siteCards: [
        {
          title: 'Россия и СНГ',
          subtitle: 'Russia and CIS',
          langCode: 'ru',
          url: `${process.env.SITE_URL}ru`,
          btnText: 'Перейти на сайт',
          cookieValue: 'ru',
          isCurrent: true,
        },
        {
          title: 'Middle East&Africa',
          subtitle: 'Ближний Восток и Африка',
          langCode: 'en',
          url: 'https://ae.ekfgroup.com/',
          btnText: 'Go to website',
          cookieValue: 'ae',
        },
        {
          title: 'International',
          subtitle: 'Другие',
          langCode: 'en',
          url: 'https://global.ekfgroup.com/',
          btnText: 'Go to website',
          cookieValue: 'en',
        },
      ],
    }
  },

  methods: {
    navigate(card) {
      if ((this.withCurrentSite && card.isCurrent) || !card?.url) return

      // this.$cookies.set('region', card.cookieValue, {
      //   maxAge: 60 * 60 * 24 * 365, // 1 year
      //   path: '/',
      //   sameSite: true,
      // })

      if (process.client) window.location.assign(card?.url)
    },
  },
}
</script>

<style lang="scss" scoped>
.cards-container {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
}

.current-site {
  background-color: $gray-100;
}

.card-body {
  height: 100%;

  &:not(.current-site) {
    cursor: pointer;
  }

  &:hover .btn {
    color: $white;
    background-color: $primary-light;
    border-color: $primary-light;
  }
}

.card-title {
  font-size: 1.25rem;
}

.card-btn {
  margin-right: auto;
  margin-top: auto;

  &.text {
    color: $gray-700;
    margin-bottom: auto;
  }
}
</style>
