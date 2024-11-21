<template>
  <nav>
    <ul class="list-unstyled">
      <li v-for="item in items" :key="item.key">
        <h5 class="text-dark">
          <b-link
            :to="localePath(`/legal/${item.key}`)"
            :class="{ 'text-reset': active !== item.key }"
          >
            {{ $t(`legal.${item.text}`) }}
          </b-link>
        </h5>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      items: [
        { key: 'user-agreement', text: 'userAgreement' },
        { key: 'data-protection', text: 'dataProtection' },
        { key: 'data-consent', text: 'dataConsent' },
        { key: 'promotion-consent', text: 'promotionConsent' },
        { key: 'data-policy', text: 'dataPolicy' },
        { key: 'labor-assessment', text: 'laborAssessment' },
        { key: 'oferta', text: 'oferta' },
      ],
    }
  },
}
</script>
