<template>
  <section class="section-view">
    <b-container>
      <b-row align-v="center" class="mb-24 mb-lg-48">
        <b-col cols="10" md="8" xl="7">
          <h2 class="mb-0">{{ title }}</h2>
        </b-col>

        <b-col
          v-if="buttonLink"
          md="4"
          xl="5"
          class="d-none d-md-block text-right mb-auto"
        >
          <LinkMore :href="link">
            {{ buttonText }}
          </LinkMore>
        </b-col>

        <b-col v-if="subtitle" md="10 " lg="8" xl="7">
          <p class="mb-0 mt-16">
            {{ subtitle }}
          </p>
        </b-col>
      </b-row>

      <slot />

      <b-row v-if="buttonLink">
        <b-col class="text-center d-md-none mt-40">
          <LinkMore :href="link">
            {{ buttonText }}
          </LinkMore>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { isExternal } from '@/utils/link'

export default {
  props: {
    title: {
      type: String,
      required: true,
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
  computed: {
    link() {
      return isExternal(this.buttonLink)
        ? this.buttonLink
        : this.localePath(this.buttonLink)
    },
  },
}
</script>

<style lang="scss" scoped>
.section-view {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

@include media-breakpoint-up(lg) {
  .section-view {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}
</style>
