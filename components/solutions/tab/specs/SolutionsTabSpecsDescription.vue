<template>
  <div>
    <div v-if="isReady" class="markdown-content" v-html="renderedDescription" />

    <SolutionsTextPlaceholder v-else :lines="3" />
  </div>
</template>

<script>
import { mdLight } from '@/utils/markdown'

export default {
  props: {
    description: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      loading: false,
      renderedDescription: null,
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

      const content = sanitizeHtml.default(
        this.description?.replace(/\n /gm, ''),
        options
      )

      this.renderedDescription = md.render(content)
    } catch (error) {}

    this.loading = false
  },

  computed: {
    isReady() {
      return !this.loading && !this.$fetchState?.pending
    },
  },
}
</script>

<style lang="scss" scoped>
.markdown-content {
  ::v-deep {
    h1,
    h2,
    h3,
    h4 {
      margin-top: 3rem;
      margin-bottom: 2rem;
    }

    h5,
    h6 {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      &:first-child {
        margin-top: 0;
      }
    }

    ol,
    ul {
      margin: 0 0 1rem 0;

      & > li {
        margin-bottom: 1rem;
      }
    }

    ul {
      padding: 0;
      list-style: none;

      & > li {
        position: relative;
        padding-left: 1.5rem;

        &::before {
          display: block;
          content: '';
          position: absolute;
          left: 0;
          top: calc(0.7em - 0.25rem);
          width: 0.5rem;
          height: 0.5rem;
          background-color: $primary;
        }
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  .markdown-content {
    ::v-deep {
      ol,
      ul {
        column-count: 2;
        column-gap: $grid-gutter-width;

        & > li {
          break-inside: avoid;
        }
      }
    }
  }
}
</style>
