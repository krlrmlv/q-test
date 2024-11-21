<template>
  <div class="career-collapse">
    <b-link
      :class="{ active: visible }"
      class="career-collapse-toggle"
      @click="$emit('toggle')"
    >
      {{ category.name }}
      <span class="text-primary ml-8">{{ category.count }}</span>
    </b-link>

    <b-collapse :visible="visible">
      <div v-if="loading" class="pt-16">
        <b-spinner variant="light" />
      </div>
      <CareerVacancies v-else :vacancies="vacancies" />
    </b-collapse>
  </div>
</template>

<script>
import { BCollapse, BSpinner } from 'bootstrap-vue'

export default {
  components: {
    BCollapse,
    BSpinner,
  },

  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: false,
      vacancies: [],
    }
  },

  watch: {
    visible: {
      immediate: true,
      handler(event) {
        if (event) this.fetchVacancies()
      },
    },
  },

  methods: {
    async fetchVacancies() {
      if (!this.category?.url) return

      this.loading = true

      try {
        const { data } = await this.$axios.get(this.category.url)
        this.vacancies = data.items
      } catch (error) {}

      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.career-collapse-toggle {
  text-decoration: none;
  color: inherit;
  transition: $transition-base;
  transition-property: color;

  &:hover {
    text-decoration: underline;
    text-decoration-style: dashed;
    text-decoration-thickness: $border-width;
  }

  &.active {
    color: $primary;
  }
}
</style>
