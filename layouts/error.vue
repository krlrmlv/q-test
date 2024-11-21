<template>
  <b-container tag="main" class="text-center mt-32 mt-lg-64 py-32 py-lg-64">
    <h1 class="d-flex flex-column mb-32">
      <span
        v-if="error.statusCode === 404"
        class="display-1 font-weight-medium text-primary"
      >
        {{ error.statusCode }}
      </span>
      <span>{{ errorTitle }}</span>
    </h1>
    <p
      v-if="error.statusCode === 404"
      class="mb-32"
      v-html="$t('error.404.text')"
    ></p>

    <b-link :to="localePath('/')">
      {{ $t('error.goHome') }}
    </b-link>
  </b-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  head() {
    return {
      title: this.errorTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.errorDescription,
        },
      ],
    }
  },
  computed: {
    errorTitle() {
      return this.error.statusCode === 404
        ? this.$t('error.404.title')
        : `${this.$t('error.title')} ${this.error.statusCode}`
    },
    errorDescription() {
      return this.error.statusCode === 404
        ? this.$t('error.404.metaDescription')
        : `${this.$t('error.title')} ${this.error.statusCode}`
    },
  },
}
</script>
