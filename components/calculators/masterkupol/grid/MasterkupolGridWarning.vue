<template>
  <b-form-text text-variant="primary" class="lh-120 mt-8">
    <b-link role="button" class="text-reset" @click="$emit('click')">
      <span
        v-html="$t('calculators.masterKupol.grid.protectionCategory.warning')"
      />
    </b-link>
  </b-form-text>
</template>

<script>
import { BFormText } from 'bootstrap-vue'

export default {
  components: { BFormText },
}
</script>
