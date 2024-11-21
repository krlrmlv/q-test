<template>
  <div class="header-search-toggle">
    <b-button
      :title="$t('global.search')"
      :aria-label="$t('global.search')"
      variant="white"
      class="btn-icon btn-toggle"
      @click="toggleSearch"
    >
      <svg-icon
        :name="searchOpen ? 'close-24' : 'search-24'"
        width="24"
        height="24"
        aria-hidden="true"
      />
    </b-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('header', ['searchOpen']),
  },

  methods: {
    ...mapActions('header', ['setSearchOpen']),

    toggleSearch() {
      this.setSearchOpen(!this.searchOpen)
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-toggle {
  color: $secondary;
}

@include media-breakpoint-up(lg) {
  .btn-toggle {
    color: $primary;
  }
}
</style>
