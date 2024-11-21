<template>
  <div>
    <h2 class="h3">
      {{ $t(`${i18n}.initialData.title`) }}
    </h2>

    <p class="mb-48">
      <span v-html="$t(`${i18n}.initialData.description`)" />

      <b-link href="/files/masterroof-questionnaire.pdf" target="_blank">
        <span v-html="$t(`${i18n}.initialData.quastionnaire`)" />
      </b-link>
    </p>

    <b-row class="mb-32 mb-lg-64">
      <MasterroofForm />

      <MasterroofScheme />
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('masterroof', ['i18n']),
  },
}
</script>

<style lang="scss">
.masterroof-questions-list {
  color: $primary;
}
</style>
