<template>
  <li class="nav-item">
    <b-link :to="localePath('/compare')" class="nav-link">
      <span class="nav-link-icon">
        <svg-icon
          name="compare-24"
          width="24"
          height="24"
          class="mr-8"
          aria-hidden="true"
        />
        <CountBadge :loading="loading" :value="compareProductCount" />
      </span>
      {{ $t('compare.title') }}
    </b-link>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('compare', ['compareProductCount']),

    loading() {
      return this.$fetchState?.pending
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-link-icon {
  position: relative;
}

::v-deep {
  .count-badge {
    position: absolute;
    top: -0.25rem;
    right: 0.25rem;
  }
}
</style>
