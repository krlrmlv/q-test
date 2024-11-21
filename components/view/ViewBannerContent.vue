<template>
  <b-row class="view-banner-content">
    <b-col>
      <b-row>
        <b-col v-if="title" cols="12" sm="9">
          <h2 class="h1 title">{{ title }}</h2>
        </b-col>

        <b-col v-if="subtitle" cols="12" sm="9" lg="6">
          <p>{{ subtitle }}</p>
        </b-col>
      </b-row>

      <slot />

      <LinkMore
        v-if="buttonText"
        :href="buttonLink"
        target="_blank"
        class="btn-primary view-banner-btn"
        block
        @click="$emit('click')"
      >
        {{ buttonText }}
      </LinkMore>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    buttonLink: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.view-banner-content {
  padding-top: 12rem;
  padding-bottom: 2rem;

  .view-banner-btn {
    padding: 0.875rem 3rem;
    color: $white;
  }

  @include media-breakpoint-down(md) {
    .title {
      font-size: 2.5rem;
    }
  }

  @include media-breakpoint-up(md) {
    padding-top: 9rem;
    padding-bottom: 6rem;

    .view-banner-btn {
      max-width: 294px;
    }
  }

  @include media-breakpoint-up(lg) {
    padding-top: 8rem;
    padding-bottom: 11rem;

    .view-banner-btn {
      max-width: 267px;
    }
  }
}
</style>
