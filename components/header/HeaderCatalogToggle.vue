<template>
  <div class="header-catalog-toggle">
    <b-button
      v-if="mounted"
      :class="{ active: catalogOpen }"
      variant="outline-primary"
      class="btn-catalog"
      block
      @click="toggleCatalog"
    >
      {{ $t('catalog.catalog') }}
    </b-button>

    <b-skeleton v-else type="button" />
  </div>
</template>

<script>
import { BSkeleton } from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { BSkeleton },

  computed: {
    ...mapGetters('header', ['catalogOpen', 'fixed', 'mounted']),
  },

  methods: {
    ...mapActions(['setBodyFixed']),
    ...mapActions('header', ['setCatalogOpen']),

    toggleCatalog() {
      /* Fix body only when catalog opens from fixed header */
      if (!this.catalogOpen) {
        if (this.fixed) this.setBodyFixed(true)
      }
      this.setCatalogOpen(!this.catalogOpen)
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-catalog {
  width: calc(#{$border-width * 2} + 7.75rem);
  font-size: 1rem;
  font-weight: $font-weight-medium;
  text-transform: uppercase;
}

::v-deep {
  .b-skeleton {
    width: calc(#{$border-width * 2} + 7.75rem);
    height: calc(#{$border-width * 2} + 2.875rem);
  }
}
</style>
