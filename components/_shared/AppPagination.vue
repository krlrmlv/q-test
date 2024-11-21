<template>
  <b-pagination
    v-model="localValue"
    :align="align"
    :aria-label="$t('pagination.title')"
    :disabled="disabled"
    :label-first-page="$t('pagination.first')"
    :label-last-page="$t('pagination.last')"
    :label-next-page="$t('pagination.next')"
    :label-page="$t('pagination.goToPage')"
    :label-prev-page="$t('pagination.previous')"
    :limit="limit"
    :per-page="perPage"
    :pills="pills"
    :size="size"
    :total-rows="totalRows"
    :first-number="showFirstLastNumbers"
    :last-number="showFirstLastNumbers"
    next-class="page-link-arrow"
    prev-class="page-link-arrow"
    hide-goto-end-buttons
    @change="$emit('change', $event)"
    @page-click="$emit('page-click', $event)"
  >
    <template #prev-text>
      <svg-icon
        v-show="localValue > 1"
        :name="`arrow-left-${iconSize}`"
        :width="iconSize"
        :height="iconSize"
        aria-hidden="true"
      />
    </template>
    <template #next-text>
      <svg-icon
        v-show="localValue < totalPages"
        :name="`arrow-right-${iconSize}`"
        :width="iconSize"
        :height="iconSize"
        aria-hidden="true"
      />
    </template>
  </b-pagination>
</template>

<script>
import { BPagination } from 'bootstrap-vue'

export default {
  components: { BPagination },

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    align: {
      type: String,
      default: 'left',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: [Number, String],
      default: 5,
    },
    perPage: {
      type: [Number, String],
      default: 20,
    },
    pills: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: null,
    },
    totalRows: {
      type: [Number, String],
      default: 0,
    },
    value: {
      type: [Boolean, Number, String],
      default: null,
    },
    showFirstLastNumbers: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(event) {
        this.$emit('input', event)
      },
    },

    iconSize() {
      return this.size === 'sm' ? '16' : '24'
    },

    totalPages() {
      return Math.ceil(this.totalRows / this.perPage)
    },
  },
}
</script>
