<template>
  <div class="header-menu-toggle">
    <b-button
      v-if="mounted"
      :title="$t('global.menu')"
      variant="white"
      class="btn-icon btn-toggle text-secondary"
      @click="toggleMenu"
    >
      <svg-icon
        :name="mobileMenuOpen ? 'close-24' : 'burger-24'"
        width="24"
        height="24"
        aria-hidden="true"
      />
    </b-button>
    <b-skeleton v-else class="btn-toggle" />
  </div>
</template>

<script>
import { BSkeleton } from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { BSkeleton },

  computed: {
    ...mapGetters('header', ['mobileMenuOpen', 'mounted']),
  },

  methods: {
    ...mapActions('header', ['setMobileMenuOpen']),

    toggleMenu() {
      this.setMobileMenuOpen(!this.mobileMenuOpen)
    },
  },
}
</script>
