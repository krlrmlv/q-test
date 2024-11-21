<template>
  <b-row class="search-results-controls align-items-center mx-n8 mb-16">
    <b-col cols="auto" class="flex-fill d-none d-lg-block mb-16 px-8">
      <p class="fs-2 text-secondary mb-0">
        {{ foundText }}
      </p>
    </b-col>

    <b-col cols="auto" class="mb-16 px-8">
      <b-dropdown
        :text="sortMode.text"
        size="sm"
        variant="link"
        class="dropdown-control-btn"
        block
        no-caret
      >
        <template #button-content>
          {{ sortMode.text }}
          <svg-icon
            name="chevron-down-16"
            width="16"
            height="16"
            class="ml-4"
            aria-hidden="true"
          />
        </template>
        <b-dropdown-item
          v-for="(mode, index) in sortModes"
          :key="`sort-mode-${index}`"
          @click="$emit('sort-set', mode.value)"
        >
          {{ mode.text }}
        </b-dropdown-item>
      </b-dropdown>
    </b-col>

    <b-col cols="auto" class="flex-fill text-right d-md-none mb-16 px-8">
      <b-button
        variant="link"
        class="text-decoration-none text-secondary border-0 p-0"
        @click="$emit('show-filters')"
      >
        {{ $t('filters.title') }}
        <svg-icon
          name="filters-24"
          width="24"
          height="24"
          class="ml-8"
          aria-hidden="true"
        />
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import { BDropdown, BDropdownItem } from 'bootstrap-vue'
import getDeclension from '@/utils/declension'

export default {
  components: {
    BDropdown,
    BDropdownItem,
  },

  props: {
    found: {
      type: [Number, String],
      default: 0,
    },

    itemType: {
      type: String,
      default: 'news',
    },

    sort: {
      type: Object,
      default: () => ({ published_at: 'desc' }),
    },

    sortModes: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    foundText() {
      let text = getDeclension(
        this.found,
        this.$t(`searchResults.${this.itemType}FoundDeclensions`)
      )
      text += ` ${this.found} `
      text += getDeclension(
        this.found,
        this.$t(`searchResults.${this.itemType}ItemDeclensions`)
      )
      return text
    },

    sortMode() {
      return (
        this.sortModes.find(({ value }) => value === this.sort) ??
        this.sortModes[0]
      )
    },
  },
}
</script>
