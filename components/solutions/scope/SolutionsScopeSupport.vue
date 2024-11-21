<template>
  <section class="py-64 py-md-80 py-xl-96">
    <b-container>
      <h2 class="mb-24 mb-md-40 mb-xl-32">
        {{ title }}
      </h2>

      <b-row class="mb-xl-n24">
        <b-col
          v-for="(step, index) in renderedSteps"
          :key="`step-${index}`"
          cols="12"
          md="4"
          class="mb-16 mb-md-24"
        >
          <div class="card card-step">
            <div class="card-icon" aria-hidden="true">
              <svg-icon name="check-24" width="24" height="24" />
            </div>
            <div class="card-body">
              <h5 class="card-title mb-xl-24">{{ step.title }}</h5>

              <div class="markdown-content" v-html="step.description" />

              <div class="card-link">
                <LinkMore @click="$emit('click-step')">
                  {{ $t('makeRequest') }}
                </LinkMore>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
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
}
</script>

<style lang="scss" scoped>
.card-step {
  height: 100%;
  font-size: $font-size-2;
  line-height: 1.4;
  background-color: $white;
  cursor: pointer;
}

.card-icon {
  padding: 1.5rem 1.5rem 0;
  color: $primary;
}

.card-body {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.5rem 2.5rem;
}

.card-link {
  margin-top: auto;
  padding-top: 1.125rem;

  .btn-link {
    font-size: inherit;
  }
}

.markdown-content {
  ::v-deep {
    p {
      margin: 0;

      & + p {
        margin-top: 0.5rem;
      }
    }
  }
}

@include media-breakpoint-down(sm) {
  .card-link {
    display: none;
  }
}

@include media-breakpoint-down(md) {
  .card-step {
    box-shadow: $box-shadow;
  }

  .card-body {
    padding-bottom: 1.5rem;
  }

  .card-title {
    font-size: $font-size-4;
  }
}

@include media-breakpoint-up(lg) {
  .card-step {
    &:hover {
      .card-link {
        opacity: 1;
      }
    }
  }

  .card-link {
    padding-top: 2.5rem;
    font-size: $font-size-3;
    opacity: 0;
    transition: $transition-base;
    transition-property: opacity;
  }
}

@include media-breakpoint-up(xl) {
  .card-step {
    display: flex;
    flex-direction: row;
    transition: $transition-base;
    transition-property: box-shadow;

    &:hover {
      box-shadow: $box-shadow;
    }
  }

  .card-body {
    display: flex;
    flex-direction: column;
    padding: 3rem 2rem 2.75rem 1rem;
  }

  .card-icon {
    padding: 3rem 0 3rem 2rem;
  }

  .card-link {
    margin-top: auto;
  }
}
</style>

<i18n>
{
  "en": {
    "makeRequest": "Make request"
  },
  "ru": {
    "makeRequest": "Оставить заявку"
  }
}
</i18n>
