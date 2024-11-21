<template>
  <div>
    <b-row class="mb-n16 mb-lg-n24">
      <b-col
        v-for="(library, index) in visibleLibraries"
        :key="index"
        lg="4"
        class="mb-16 mb-lg-24"
      >
        <SupportLibrariesCard :library="library" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { libraries } from '~/components/constants/libraries'

export default {
  props: {
    limit: {
      type: [Number, String],
      default: null,
    },
  },

  computed: {
    visibleLibraries() {
      return this.limit ? libraries.slice(0, Number(this.limit)) : libraries
    },
  },
}
</script>
