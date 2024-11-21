<template>
  <DistributionPage v-bind="{ breadcrumbs, filterOptions }" />
</template>

<script>
import sendToMindbox from '@/utils/mindbox'

export default {
  transition: { name: '' },

  data() {
    return {
      breadcrumbs: [{ text: 'distribution.title', active: true }],
      filterOptions: [
        {
          value: null,
          text: 'distribution.showAll',
        },
        {
          value: 'wholesale',
          text: 'distribution.distributor.checkboxText',
        },
        {
          value: 'internet_shop',
          text: 'distribution.onlineStore.checkboxText',
        },
        {
          value: 'retail',
          text: 'distribution.retail.checkboxText',
        },
      ],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('meta.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('meta.keywords'),
        },
      ],
    }
  },

  mounted() {
    sendToMindbox('EKFGroupWhereToBuy')
  },
}
</script>

<i18n>
{
  "en": {
    "meta": {
      "description": "EKF partners",
      "keywords": "where to buy partners company"
    },
    "pageTitle": "Where to buy"
  },
  "ru": {
    "meta": {
      "description": "Партнеры компании EKF",
      "keywords": "Где купить партнеры компания"
    },
    "pageTitle": "Где купить"
  }
}
</i18n>
