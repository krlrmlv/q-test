<template>
  <div id="app-root">
    <Nuxt />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LayoutEmbed',

  mounted() {
    this.$root.$on('bv::modal::show', () => {
      this.setBodyFixed(true)
    })
    this.$root.$on('bv::modal::hidden', () => {
      this.setBodyFixed(false)
    })
  },

  methods: {
    ...mapActions(['setBodyFixed']),
  },
}
</script>

<style>
.grecaptcha-badge {
  display: none;
}
</style>
