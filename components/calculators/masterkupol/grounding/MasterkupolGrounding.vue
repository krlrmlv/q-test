<template>
  <div>
    <h2 class="h3">
      {{ $t('calculators.masterKupol.grounding.title') }}
    </h2>
    <p
      class="mb-32"
      v-html="$t('calculators.masterKupol.grounding.description')"
    />

    <MasterkupolGroundingForm class="mb-12 mb-lg-40" />

    <MasterkupolNext
      :loading="loading"
      title="calculators.masterKupol.calculate"
      @click="handleNext"
    />
  </div>
</template>

<script>
import { mindboxCalculateCalculator } from '@/utils/mindbox'

export default {
  data() {
    return {
      loading: false,
    }
  },

  methods: {
    async handleNext() {
      this.loading = true
      mindboxCalculateCalculator('MasterKupol')
      await this.$store.dispatch('masterkupol/fetchCart')
      this.loading = false
      this.$emit('next', 'cart')
    },
  },
}
</script>
