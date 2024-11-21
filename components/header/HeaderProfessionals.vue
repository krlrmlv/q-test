<template>
  <nav class="header-pros text-gray-800">
    <b-nav class="header-nav-top pr-8">
      <b-nav-item
        v-for="(link, index) in layoutsVisible"
        :key="`link-visible-${index}`"
        :to="localePath(`/view/${link.slug}`)"
        link-classes="header-nav-link"
      >
        {{ link.name }}
      </b-nav-item>
    </b-nav>

    <div :class="{ open: collapseOpen }" class="header-pros-collapse">
      <b-nav class="header-nav-top">
        <b-nav-item
          v-for="(link, index) in layoutsHidden"
          :key="`link-hidden-${index}`"
          :to="localePath(`/view/${link.slug}`)"
          link-classes="header-nav-link"
        >
          {{ link.name }}
        </b-nav-item>
      </b-nav>

      <b-button
        :title="$t(collapseOpen ? 'collapse' : 'expand')"
        :aria-label="$t(collapseOpen ? 'collapse' : 'expand')"
        variant="white"
        class="collapse-toggle"
        @click="toggleCollapse"
      >
        <svg-icon
          name="chevron-right-24"
          width="16"
          height="16"
          aria-hidden="true"
        />
      </b-button>
    </div>
  </nav>
</template>

<script>
import { BNav, BNavItem } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

const LIMIT = 3

export default {
  components: {
    BNav,
    BNavItem,
  },

  data() {
    return {
      collapseOpen: false,
    }
  },

  computed: {
    ...mapGetters('layouts', ['layouts']),

    layoutsHidden() {
      return this.layouts.slice(LIMIT)
    },

    layoutsVisible() {
      return this.layouts.slice(0, LIMIT)
    },
  },

  methods: {
    toggleCollapse() {
      this.collapseOpen = !this.collapseOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.header-pros {
  position: relative;
  overflow: visible;
}

.header-pros-collapse {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 100%;
  background-color: $white;
  transition: $transition-base;
  transition-property: right;

  .header-nav-top {
    width: 100%;
    overflow: hidden;

    &:first-of-type {
      margin-left: 0.175rem;
    }
  }

  .collapse-toggle {
    padding: 0.25rem;
    border: none;

    .icon {
      width: 1rem;
      height: 1rem;
      transition: $transition-base;
      transition-property: transform;
    }

    &:not(:disabled):not(.disabled) {
      &:hover,
      &:focus,
      &:active {
        outline: none;
        background-color: $white;
        box-shadow: none;
      }

      &:focus-visible {
        background-color: $gray-100;
      }
    }
  }

  &.open {
    right: calc(100% + 1.5rem - #{map-get($container-max-widths, 'lg')});

    .collapse-toggle {
      .icon {
        transform: rotate(-180deg);
      }
    }
  }
}

.b-skeleton {
  width: 300px;
  height: 1.375rem;
  margin: 0.25rem 0;
}

@include media-breakpoint-up(xl) {
  .header-pros-collapse {
    &.open {
      right: calc(100% + 0.5rem - #{map-get($container-max-widths, 'xl')});
    }
  }
}

@include media-breakpoint-up(xxl) {
  .header-pros-collapse.open {
    right: calc(100% + 10rem - #{map-get($container-max-widths, 'xxl')});
  }
}

@include media-breakpoint-up(xxxl) {
  .header-pros-collapse.open {
    right: calc(100% + 15.5rem - #{map-get($container-max-widths, 'xxxl')});
  }
}
</style>

<i18n>
{
  "en": {
    "collapse": "Collapse",
    "expand": "Expand"
  },
  "ru": {
    "collapse": "Свернуть",
    "expand": "Развернуть"
  }
}
</i18n>
