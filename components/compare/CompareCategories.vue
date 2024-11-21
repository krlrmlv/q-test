<template>
  <div class="compare-categories-wrapper">
    <b-form-radio-group
      :checked="selectedCategory"
      :disabled="loading"
      button-variant="gray-200"
      size="sm"
      class="compare-categories"
      buttons
      @input="$emit('input', $event)"
    >
      <b-form-radio
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
        class="compare-category"
      >
        {{ category.name }}
        <span v-if="getQuantity(category)">({{ getQuantity(category) }})</span>
      </b-form-radio>

      <b-form-radio
        :value="null"
        button-variant="outline-primary"
        class="compare-category compare-category-all"
      >
        {{ $t('compare.categories.showAll') }}
      </b-form-radio>
    </b-form-radio-group>
  </div>
</template>

<script>
import { BFormRadioGroup, BFormRadio } from 'bootstrap-vue'

export default {
  components: {
    BFormRadioGroup,
    BFormRadio,
  },

  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    selectedCategory: {
      type: [String, Number],
      default: null,
    },
  },

  methods: {
    getQuantity(category) {
      return category?.products_aggregate?.aggregate?.count
    },
  },
}
</script>

<style lang="scss" scoped>
.compare-categories {
  justify-content: flex-start;
  gap: 0.5rem;
}

.compare-category {
  flex: 0 0 auto;
  white-space: nowrap;

  &:not(.compare-category-all) {
    &:not(:disabled):not(.disabled) {
      &.active {
        color: $white;
        border-color: $secondary;
        background-color: $secondary;
      }
    }
  }
}

@include media-breakpoint-down(sm) {
  .compare-categories-wrapper {
    margin-left: -$grid-gutter-width * 0.5;
    margin-right: -$grid-gutter-width * 0.5;
    overflow: hidden;
  }

  .compare-categories {
    padding-left: $grid-gutter-width * 0.5;
    padding-right: $grid-gutter-width * 0.5;
    max-width: 100%;
    overflow: scroll;
    overflow-y: hidden;

    /* hide scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

@include media-breakpoint-up(md) {
  .compare-categories {
    flex-wrap: wrap;
  }

  .compare-category {
    flex: 0 0 auto;
  }
}
</style>

<style scoped>
/* Safari shouldn't exist */
@media not all and (min-resolution: 0.001dpcm) {
  @supports (-webkit-appearance: none) and (stroke-color: transparent) {
    .compare-categories-wrapper {
      height: calc(2px + 1.875rem);
      overflow: hidden;
    }

    .compare-categories-wrapper .compare-categories {
      padding-bottom: 100px;
    }
  }
}
</style>
