<template>
  <div class="header-search-history">
    <div v-if="showControls" class="history-controls">
      <span class="dropdown-item" v-text="$t('searchHistory.title')" />
      <b-link class="dropdown-item" @click.stop.prevent="$emit('clear')">
        {{ $t('searchHistory.clear') }}
      </b-link>
    </div>

    <ul class="list-unstyled history-items">
      <li
        v-for="(item, index) in items"
        :key="`history-item-${index}`"
        class="dropdown-item"
      >
        <b-link
          class="dropdown-item-link"
          @click.stop.prevent="$emit('click', item)"
        >
          <svg-icon
            name="history-20"
            width="20"
            height="20"
            class="mr-8"
            aria-hidden="true"
          />
          {{ item }}
        </b-link>
        <b-button
          :title="$t('global.delete')"
          :aria-label="$t('global.delete')"
          variant="link"
          class="btn-remove"
          @click.stop.prevent="$emit('remove', item)"
        >
          <svg-icon name="close-16" width="16" height="16" aria-hidden="true" />
        </b-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    showControls: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.history-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $gray-500;

  .dropdown-item {
    flex: 0 0 auto;
    width: auto;
    color: inherit;

    &:hover {
      background-color: transparent;

      &:link {
        color: $secondary;
      }
    }
  }
}

.history-items {
  margin: 0;

  .dropdown-item {
    display: flex;
    flex-wrap: nowrap;
  }

  .dropdown-item-link {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    width: auto;
    color: inherit;

    .icon {
      color: $secondary;
    }
  }
}

.btn-remove {
  padding: 0;
  border-radius: $rounded-pill;
  border: 0;
  color: $gray-500;

  &:hover {
    color: $secondary;
  }
}
</style>
