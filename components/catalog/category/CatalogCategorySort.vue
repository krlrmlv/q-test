<template>
  <b-dropdown
    :text="buttonText"
    size="sm"
    variant="link"
    class="dropdown-control-btn"
    block
    right
    no-caret
  >
    <template #button-content>
      {{ buttonText }}
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
      @click="setSortBy(mode.key)"
    >
      {{ $t(`sort.${mode.key}`) }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { BDropdown, BDropdownItem } from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BDropdown,
    BDropdownItem,
  },

  computed: {
    ...mapGetters('category', ['sortBy', 'sortModes']),

    buttonText() {
      return this.$t(`sort.${this.sortBy?.key}`)
    },
  },

  methods: {
    ...mapActions('category', ['setSortBy']),
  },
}
</script>
