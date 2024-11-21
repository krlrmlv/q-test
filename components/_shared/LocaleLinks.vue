<template>
  <div class="d-flex align-items-center">
    <SeoLink
      href="https://ae.ekfgroup.com/"
      target="_blank"
      class="d-flex align-items-center text-reset mr-16"
    >
      <span class="d-flex rounded-pill overflow-hidden mr-8">
        <svg-icon name="flags/en-24" width="24" height="24" aria-hidden="true"
      /></span>
      EN
    </SeoLink>
    <!-- <b-link
      v-for="locale in availableLocales"
      :key="locale.code"
      class="d-flex align-items-center text-reset mr-16"
      @click.prevent.stop="$i18n.setLocale(locale.code)"
    >
      <span class="d-flex rounded-pill overflow-hidden mr-8">
        <svg-icon
          :name="`flags/${locale.code}-24`"
          width="24"
          height="24"
          aria-hidden="true"
      /></span>
      {{ locale.code.toUpperCase() }}
    </b-link> -->
  </div>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter(
        (locale) => locale.code !== this.$i18n.locale
      )
    },
  },
}
</script>
