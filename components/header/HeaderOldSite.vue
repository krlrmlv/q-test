<template>
  <nav class="header-old-site">
    <ul v-if="mounted" class="nav header-nav-top">
      <li class="nav-item flex-fill">
        <SeoLink
          href="https://old.ekfgroup.com/#oprosoldsite"
          target="_blank"
          class="nav-link text-reset"
          @click="$gtm.push({ event: 'btnOldVersion' })"
        >
          {{ $t('footer.goToOldSite') }}
        </SeoLink>
      </li>
    </ul>

    <div v-else class="header-nav-top mx-0">
      <b-skeleton />
    </div>
  </nav>
</template>

<script>
import { BSkeleton } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: { BSkeleton },

  computed: {
    ...mapGetters('header', ['mounted']),
  },
}
</script>

<style lang="scss" scoped>
.header-old-site {
  color: $gray-500;
}

@include media-breakpoint-down(md) {
  .header-old-site {
    font-size: $font-size-1;
    text-align: center;
  }

  .b-skeleton {
    width: 120px;
    margin: 0.1875rem auto;
  }
}

@include media-breakpoint-up(lg) {
  .header-old-site {
    padding-left: 0.5rem;
  }

  .b-skeleton {
    width: 100px;
    height: 1.375rem;
    margin: 0.25rem 0;
  }
}

@include media-breakpoint-up(xl) {
  .header-old-site {
    padding-left: 1rem;
  }
}
</style>
