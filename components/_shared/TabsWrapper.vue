<template>
  <div :class="{ mounted: isMounted }" class="tabs-wrapper">
    <div v-if="!isMounted" class="nav-wrapper-placeholder">
      <ul
        :class="{ 'nav-justified': justified }"
        role="tablist"
        class="nav nav-tabs"
      >
        <li
          v-for="(tab, index) in tabs"
          :key="`placeholder-tab-${index}`"
          role="presentation"
          class="nav-item"
        >
          <b-link role="tab" class="nav-link" disabled>
            {{ tab.title || tab }}
          </b-link>
        </li>
      </ul>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    justified: {
      type: Boolean,
      default: false,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isMounted: false,
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.isMounted = true
    })
  },
}
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  :not(.mounted) {
    ::v-deep {
      .nav-wrapper {
        display: none;
      }
    }
  }
}
</style>
