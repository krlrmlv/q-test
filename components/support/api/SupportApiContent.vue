<template>
  <section :class="{ show: visible }" class="support-api-sidebar">
    <header class="support-api-sidebar-header d-lg-none">
      <b-button
        :title="$t('global.back')"
        :aria-label="$t('global.back')"
        variant="link"
        class="text-reset border-0 px-0 py-12"
        block
        @click="$emit('close')"
      >
        <svg-icon
          name="chevron-left-24"
          width="24"
          height="24"
          class="text-secondary"
          aria-hidden="true"
        />
        <span class="h7 text-uppercase mx-auto mb-0"> Оглавление </span>
      </b-button>
    </header>

    <div class="support-api-content">
      <transition name="fade" mode="out-in">
        <component :is="componentName" v-if="index" :index="index" />
      </transition>
    </div>

    <footer class="support-api-sidebar-footer d-lg-none">
      <b-button
        v-if="!isFirst"
        :title="$t('global.back')"
        :aria-label="$t('global.back')"
        variant="primary"
        class="btn-icon"
        @click="$emit('navigate-back')"
      >
        <svg-icon
          name="arrow-left-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </b-button>

      <b-button
        v-if="!isLast"
        :title="$t('global.forward')"
        :aria-label="$t('global.forward')"
        variant="primary"
        class="btn-icon ml-auto"
        @click="$emit('navigate-forward')"
      >
        <svg-icon
          name="arrow-right-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </b-button>
    </footer>
  </section>
</template>

<script>
export default {
  props: {
    index: {
      type: [Number, String],
      default: null,
    },
    isFirst: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    componentName() {
      return this.index
        ? `SupportApiChapter${this.index.replace(/\W/g, '')}`
        : null
    },
  },
}
</script>

<style lang="scss" scoped>
.support-api-sidebar-header {
  flex: 0 0 auto;
  border-bottom: $border-width solid $border-color;
}

.support-api-sidebar-footer {
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  padding: 1rem 0 1rem;
}

.support-api-content {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;

  ::v-deep {
    .nav-tabs {
      margin-left: $border-width;
    }

    ul:not(.nav):not(.list-unstyled) {
      padding-left: 1.5em;
      list-style-type: disc;
    }

    .code {
      padding: 0.5rem;
      background-color: $gray-100;
    }

    .table {
      th,
      td {
        padding: 0.75em 1em;
      }
    }

    .text-value {
      color: #08717f;
    }

    .text-parameter {
      color: $primary-dark;
    }
  }
}

@include media-breakpoint-down(md) {
  .support-api-sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0 $grid-gutter-width * 0.5;
    background-color: $white;
    overflow-y: auto;
    transform: translateX(100%);
    transition: $transition-base;
    transition-property: transform;
    z-index: $zindex-dropdown + 2;

    &.show {
      transform: translateX(0);
    }
  }

  .support-api-content {
    padding: 2rem 0 1rem;

    .fade-enter-active,
    .fade-leave-active {
      transition: none;
    }
  }
}
</style>
