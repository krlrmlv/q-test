<template>
  <DistributionPage v-bind="{ breadcrumbs, filterOptions }" is-partners />
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'distribution.partners.title', active: true }],
      filterOptions: [
        {
          value: null,
          text: 'distribution.showAll',
        },
        {
          value: 'is_panel_equipment_manufacturer',
          text: 'distribution.pem.checkboxText',
        },
        {
          value: 'is_system_integrators',
          text: 'distribution.si.checkboxText',
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
}
</script>

<i18n>
{
  "en": {
    "meta": {
      "description": "EKF partners",
      "keywords": "where to buy partners company"
    },
    "pageTitle": "Partners"
  },
  "ru": {
    "meta": {
      "description": "Партнеры компании EKF",
      "keywords": "Где купить партнеры компания"
    },
    "pageTitle": "Партнеры"
  }
}
</i18n>
