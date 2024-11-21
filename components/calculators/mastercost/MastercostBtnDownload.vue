<template>
  <b-link
    :href="$getStaticFile(settingByKey('mastercost-file'))"
    :class="{ 'btn btn-outline-primary btn-block': button }"
    @click="$gtm.push({ event: 'btnDownloadMascost' })"
  >
    <span v-if="icon" class="d-flex mr-8">
      <svg-icon :name="icon" width="24" height="24" aria-hidden="true" />
    </span>

    {{ $t('global.download') }} {{ $t('calculators.masterCost.title') }}
  </b-link>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    button: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
  },

  computed: {
    ...mapGetters(['settingByKey']),
  },
}
</script>
