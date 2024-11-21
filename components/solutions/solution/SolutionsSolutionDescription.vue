<template>
  <section class="solutions-solution-description">
    <div class="description-header">
      <h1 class="h2">{{ solution.name }}</h1>
      <p class="text-muted">
        {{ solution.vendor_code }}
      </p>
    </div>

    <SolutionsSolutionPicture :images="images" class="description-picture" />

    <div class="description-text">
      <TextCollapse
        v-if="isReady"
        :lines="8"
        :line-height="1.4"
        class="lh-140 mb-24 mb-lg-48"
      >
        <div v-html="renderedContent" />
      </TextCollapse>

      <SolutionsTextPlaceholder v-else class="lh-140 mb-24 mb-lg-48" />

      <div class="text-center text-md-left">
        <LinkMore @click="$emit('click-request')">
          {{ $t('solutions.requestConsultation') }}
        </LinkMore>
      </div>
    </div>
  </section>
</template>

<script>
import { mdLight } from '@/utils/markdown'

export default {
  props: {
    solution: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      loading: false,
      renderedContent: null,
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

      const description =
        this.solution?.short_description ?? this.solution?.description

      const content = sanitizeHtml.default(
        description?.replace(/\n /gm, ''),
        options
      )

      this.renderedContent = md.render(content)
    } catch (error) {}

    this.loading = false
  },

  computed: {
    images() {
      return (
        this.solution?.images?.map(({ file: url }) => ({
          url,
          alt: this.solution?.name,
        })) ?? []
      )
    },

    isReady() {
      return !this.loading && !this.$fetchState?.pending
    },
  },
}
</script>

<style lang="scss" scoped>
.solutions-solution-description {
  display: grid;
  grid-template-columns: 100%;
  gap: 1rem $grid-gutter-width;
}

@include media-breakpoint-down(lg) {
  .description-header {
    .h2 {
      font-size: 1.75rem;
    }
  }
}

@include media-breakpoint-up(md) {
  .solutions-solution-description {
    grid-template-columns: 1fr 1fr;
  }

  .description-header {
    grid-column: 1 / span 2;
    min-width: 0;
  }

  .description-picture {
    grid-column: 1 / span 1;
    grid-row-start: 2;
    min-width: 0;
  }

  .description-text {
    grid-column: 2 / span 1;
    grid-row-start: 2;
    min-width: 0;
  }
}

@include media-breakpoint-up(lg) {
  .solutions-solution-description {
    grid-template-rows: min-content 1fr;
    gap: 2rem $grid-gutter-width;
  }

  .description-header {
    grid-column: 2 / span 1;
    grid-row-start: 1;
  }

  .description-picture {
    grid-row: 1 / span 2;
  }
}
</style>
