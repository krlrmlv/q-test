<template>
  <div class="distribution-branch-collapse">
    <b-button
      size="sm"
      variant="link"
      class="collapse-toggle"
      block
      @click="collapseOpen = !collapseOpen"
    >
      <svg-icon
        :name="collapseOpen ? 'minus-16' : 'plus-16'"
        width="16"
        height="16"
        class="mr-8"
        aria-hidden="true"
      />
      {{ items.length }}&nbsp;{{
        getDeclension(items.length, $t('distribution.branchDeclensions'))
      }}
    </b-button>

    <b-collapse v-model="collapseOpen" accordion="distribution-branch">
      <ul class="distribution-branch-list">
        <li v-for="(branch, index) in items" :key="index" class="list-item">
          <p class="mb-0">
            <b-link class="text-reset" @click="$emit('selected', branch)">
              {{ branch.address }}
            </b-link>
          </p>
          <p class="mb-0">
            <b-link
              v-if="branch.phone"
              :href="`tel:${branch.phone}`"
              target="_blank"
              class="text-reset"
            >
              {{ branch.phone }}
            </b-link>
          </p>
        </li>
      </ul>
    </b-collapse>
  </div>
</template>

<script>
import { BCollapse } from 'bootstrap-vue'
import getDeclension from '@/utils/declension'

export default {
  components: { BCollapse },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      collapseOpen: false,
    }
  },

  methods: { getDeclension },
}
</script>

<style lang="scss" scoped>
.collapse-toggle {
  justify-content: flex-start;
  padding: 0;
  border: none;
  color: $secondary;

  &:not(:disabled):not(.disabled):focus {
    box-shadow: none;
  }
}

.distribution-branch-list {
  margin: 0;
  padding-left: calc(16px + 0.5rem);
  font-size: $font-size-2;
  line-height: 1.4;
  list-style: none;
}

.list-item {
  margin-top: 0.5rem;
}
</style>
