<template>
  <b-container>
    <h2 class="mb-40 col-lg-9 p-0">{{ $t('projectBenefits.title') }}</h2>
    <b-row>
      <b-col
        v-for="{ key, icon, md } in benefitCards"
        :key="key"
        :md="md"
        class="mb-24"
      >
        <ViewProjectBenefitsCard :benefit="key" :icon="icon" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    benefitCards() {
      return [
        { key: 'estimates', icon: 'calculator-24', md: '6' },
        { key: 'documentations', icon: 'folders-48', md: '6' },
        { key: 'accompaniment', icon: 'user-24', md: '4' },
        { key: 'programs', icon: 'star-frame-40', md: '4' },
        { key: 'support', icon: 'headset-24', md: '4' },
      ]
    },
  },
}
</script>
