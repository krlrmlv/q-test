<template>
  <div class="footer-links-collapse">
    <b-button
      :disabled="loading"
      variant="link"
      class="footer-links-header d-sm-none"
      @click="handleHeaderClick"
    >
      <span v-if="loading" class="spinner-wrapper">
        <b-spinner class="spinner" />
      </span>

      <svg-icon
        v-else
        :name="collapseOpen ? 'minus-16' : 'plus-16'"
        width="16"
        height="16"
        aria-hidden="true"
      />
      {{ $te(linksGroup.title) ? $t(linksGroup.title) : linksGroup.title }}
    </b-button>

    <b-link
      :to="linksGroup.link && localePath(linksGroup.link)"
      class="footer-links-header d-none d-sm-block"
    >
      {{ $te(linksGroup.title) ? $t(linksGroup.title) : linksGroup.title }}
    </b-link>

    <b-collapse
      v-model="collapseOpen"
      accordion="footer-links"
      class="d-sm-block"
    >
      <ul v-if="loading" class="list-unstyled footer-links-content">
        <li
          v-for="(_, index) in 5"
          :key="`placeholder-${index}`"
          :class="{ 'mt-8': index > 0 }"
        >
          <b-skeleton
            :width="index < 4 ? '85%' : '60%'"
            class="footer-links-item"
          />
        </li>
      </ul>

      <ul v-else class="list-unstyled footer-links-content">
        <li
          v-for="(link, index) in linksGroup.items"
          :key="`item-${index}`"
          :class="{ 'mt-8': index > 0 }"
        >
          <b-link :to="localePath(link.link)" class="footer-links-item">
            {{ $te(link.title) ? $t(link.title) : link.title }}
          </b-link>
        </li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
import { BCollapse, BSkeleton, BSpinner } from 'bootstrap-vue'

export default {
  components: {
    BCollapse,
    BSkeleton,
    BSpinner,
  },

  props: {
    linksGroup: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      collapseOpen: false,
    }
  },

  methods: {
    handleHeaderClick() {
      if (this.loading) return

      this.collapseOpen = !this.collapseOpen
    },
  },
}
</script>

<style lang="scss" scoped>
.footer-links-header {
  padding: 0;
  border: none;
  font-weight: $font-weight-medium;
  color: $white;

  @include hover {
    color: $primary;
  }

  &:focus,
  &.focus,
  &:not(:disabled):not(.disabled):active,
  &:not(:disabled):not(.disabled).active,
  .show > &.dropdown-toggle {
    text-decoration: none;
  }

  ::v-deep {
    .icon {
      margin-right: 0.5rem;
    }
  }
}

.footer-links-content {
  margin: 0;
  padding-top: 0.5rem;
  padding-left: calc(0.5rem + 16px);
  font-size: $font-size-2;
  line-height: 1.4;
}

.footer-links-item {
  color: $gray-500;

  &.b-skeleton {
    display: inline-block;
    height: 1em;
    line-height: 1.4em;
    vertical-align: bottom;
    opacity: 0.15;
  }

  @include hover {
    color: $white;
  }
}

.spinner-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 0.5rem;

  .spinner {
    width: 14px;
    height: 14px;
    border-width: $border-width * 2;
  }
}

@include media-breakpoint-up(sm) {
  .footer-links-content {
    padding-top: 1.5rem;
    padding-left: 0;
  }
}
</style>
