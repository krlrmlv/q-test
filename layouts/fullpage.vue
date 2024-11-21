<template>
  <div id="app-root">
    <HeaderWrapper />
    <HeaderBackdrop />

    <Nuxt />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LayoutFullpage',

  head() {
    return {
      bodyAttrs: {
        class: this.bodyClass,
      },
    }
  },

  computed: {
    ...mapGetters('header', ['catalogOpen']),

    bodyClass() {
      return this.catalogOpen ? ['menu-open'] : []
    },
  },

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

<style lang="scss" scoped>
@include media-breakpoint-up(lg) {
  #app-root {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .menu-open {
    #app-root {
      overflow: auto;
    }
  }
}
</style>
