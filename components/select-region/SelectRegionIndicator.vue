<template>
  <div :class="{ 'indicator-dark': dark }" class="indicator">
    <slot v-bind="{ showModal }">
      <b-button
        :size="size"
        class="indicator-button text-reset border-0 p-0"
        variant="link"
        @click="showModal"
      >
        <svg-icon
          :name="`language-${iconSize}`"
          :width="iconSize"
          :height="iconSize"
          class="mr-8"
        />

        <span class="caption"> EN </span>
      </b-button>
    </slot>

    <SelectRegionModal v-model="modalVisible" />
  </div>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      modalVisible: false,
    }
  },

  computed: {
    iconSize() {
      return this.size === 'sm' ? 16 : 24
    },
  },

  methods: {
    showModal() {
      this.modalVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.indicator-button {
  justify-content: flex-start;
  max-width: 100%;
  font-weight: inherit;
  text-align: left;

  .icon {
    fill: $secondary;
    align-self: flex-start;
  }

  .caption {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.btn-sm {
    line-height: 1;
  }
}

.indicator-dark {
  color: $gray-500;

  .indicator-button {
    .icon {
      fill: $white;
    }
  }
}
</style>
