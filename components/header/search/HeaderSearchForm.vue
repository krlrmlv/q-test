<template>
  <form action="/search" method="get" @submit.prevent="handleSubmit">
    <b-input-group class="input-group-flush header-search-form">
      <b-form-input
        ref="searchField"
        :placeholder="$t('global.searchSite')"
        :value="query"
        autocomplete="off"
        name="q"
        type="search"
        @focus="$emit('focus', $event)"
        @input="$emit('input', $event)"
      />
      <template #append>
        <b-button
          :title="$t('global.search')"
          type="submit"
          variant="link"
          class="btn-icon"
        >
          <svg-icon
            name="search-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </b-button>
      </template>
    </b-input-group>
  </form>
</template>

<script>
import { BFormInput, BInputGroup } from 'bootstrap-vue'

export default {
  components: {
    BFormInput,
    BInputGroup,
  },

  props: {
    query: {
      type: String,
      default: null,
    },
  },

  methods: {
    handleSubmit() {
      const input = this.$refs.searchField?.$el
      this.$emit('submit', input?.value)
    },
  },
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-down(lg) {
  .btn-icon {
    .icon {
      color: $secondary;
    }
  }
}
</style>
