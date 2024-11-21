<template>
  <b-nav class="masterkupol-nav">
    <b-nav-item
      v-for="(item, index) in items"
      :key="`item-${index}`"
      @click="handleClick(item, index)"
    >
      {{
        $te(`calculators.masterKupol.${item}.title`)
          ? $t(`calculators.masterKupol.${item}.title`)
          : item
      }}
    </b-nav-item>
  </b-nav>
</template>

<script>
import { BNav, BNavItem } from 'bootstrap-vue'

export default {
  components: {
    BNav,
    BNavItem,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    activeItem() {
      return this.items[this.items?.length - 1]
    },
  },

  methods: {
    handleClick(item, index) {
      if (index >= this.items.length - 1) return
      this.$emit('click', item, index)
    },
  },
}
</script>

<style lang="scss" scoped>
$inactive-link-color: $gray-500;
$inactive-link-border-color: $gray-400;

$chevron-left: url('data:image/svg+xml,<svg width="16" height="16" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m10 2.5859-4.707 4.707v1.4141c1.569 1.569 3.138 3.138 4.707 4.707l1.4141-1.4141c-1.3333-1.3333-2.6667-2.6667-4-4l4-4z" fill="#{$secondary}"/></svg>');
$chevron-right: url('data:image/svg+xml,<svg width="16" height="16" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m6 2.5859-1.4141 1.4141 4 4c-1.3333 1.3333-2.6667 2.6667-4 4l1.4141 1.4141c1.569-1.569 3.138-3.138 4.707-4.707v-1.4141c-1.569-1.569-3.138-3.138-4.707-4.707z" fill="#{$inactive-link-color}"/></svg>');

::v-deep {
  .nav-link {
    font-size: $font-size-2;
    line-height: 1.33333;
    color: $secondary;

    &:hover,
    &:focus {
      text-decoration: none;
    }
  }
}

@include media-breakpoint-down(sm) {
  ::v-deep {
    .nav-item {
      &:not(:nth-last-child(2)) {
        display: none;
      }
    }

    .nav-link {
      padding: 0 0 0 1.5rem;
      background-image: escape-svg($chevron-left);
      background-position: left 0.0625em top 0.0625em;
      background-repeat: no-repeat;
      background-size: 1rem;
    }
  }
}

@include media-breakpoint-up(md) {
  ::v-deep {
    .nav-item {
      &:not(:last-child) {
        .nav-link {
          padding-right: 1.5rem;
          color: $inactive-link-color;
          background-image: escape-svg($chevron-right);
          background-position: right;
          background-repeat: no-repeat;
          background-size: 1rem;

          &:hover {
            color: $secondary;
            border-color: $secondary;
          }
        }
      }

      &:last-child {
        .nav-link {
          &::after {
            width: 100%;
          }

          &:hover {
            cursor: default;
          }
        }
      }
    }

    .nav-link {
      position: relative;
      padding: 0.5rem;
      border-bottom: $border-width solid $inactive-link-border-color;
      transition: $transition-base;
      transition-property: color, border-color;

      &::after {
        display: block;
        content: '';
        position: absolute;
        left: 0;
        width: 0;
        bottom: -$border-width;
        height: $border-width;
        background-color: currentColor;
      }
    }
  }
}
</style>
