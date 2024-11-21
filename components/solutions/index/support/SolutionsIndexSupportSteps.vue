<template>
  <div class="card card-solutions-steps">
    <div class="card-body">
      <h4 class="card-title mb-md-24">{{ title }}</h4>

      <ol class="solutions-steps">
        <li
          v-for="(step, index) in renderedSteps"
          :key="`step-${index}`"
          class="solutions-step"
        >
          <span class="solutions-step-index">
            {{ formatIndex(index) }}
          </span>
          <div class="solutions-step-content">
            <p class="h7 solutions-step-title mb-0">
              {{ step.title }}
            </p>

            <div
              v-if="step.description"
              class="markdown-content mt-8 mb-0"
              v-html="step.description"
            />
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mdLight } from '@/utils/markdown'

export default {
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      loading: false,
      renderedSteps: [],
    }
  },

  async fetch() {
    this.loading = true

    try {
      const [md, sanitizeHtml] = await Promise.all([
        mdLight(),
        import('sanitize-html'),
      ])

      const options = { disallowedTagsMode: 'recursiveEscape' }

      this.renderedSteps = this.steps.map(({ description, name, title }) => ({
        description: md.render(sanitizeHtml.default(description, options)),
        name,
        title,
      }))
    } catch (error) {}

    this.loading = false
  },

  methods: {
    formatIndex(index) {
      return `${index + 1}`.padStart(2, '0')
    },
  },
}
</script>

<style lang="scss" scoped>
.card-solutions-steps {
  box-shadow: $box-shadow;
}

.card-body {
  padding: 2rem 1rem;
}

.solutions-steps {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: $font-size-2;
  line-height: 1.4;
}

.solutions-step {
  display: flex;
  align-items: baseline;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}

.solutions-step-index {
  color: $primary;
}

.solutions-step-content {
  align-self: stretch;
  margin-left: 0.5rem;
  padding-left: 1rem;
  border-left: $border-width solid $primary;
}

.markdown-content {
  color: $gray-700;

  ::v-deep {
    p {
      margin: 0;

      & + p {
        margin-top: 0.5rem;
      }
    }
  }
}

@include media-breakpoint-up(md) {
  .card-body {
    padding: 2rem 1.5rem;
  }
}

@include media-breakpoint-up(xl) {
  .card-body {
    padding: 3rem 2rem;
  }

  .solutions-step-content {
    padding-left: 1.25rem;
  }

  .solutions-step-title {
    font-size: $font-size-4;
    line-height: $font-size-base * $line-height-base;
  }
}
</style>
