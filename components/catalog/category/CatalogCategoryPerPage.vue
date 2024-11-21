<template>
  <b-dropdown
    variant="link"
    size="sm"
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
      v-for="(mode, index) in perPageModes"
      :key="`per-page-mode-${index}`"
      @click="setPerPage(mode)"
    >
      {{ $t('catalog.perPage') }} {{ mode }}
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

  data() {
    return {
      perPageModes: [24, 36, 48, 72],
    }
  },

  computed: {
    ...mapGetters('category', ['perPage']),

    buttonText() {
      return this.$t('catalog.perPage') + this.perPage
    },
  },

  methods: {
    ...mapActions('category', ['setPerPage']),
  },
}
</script>
