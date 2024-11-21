<template>
  <SeoLink
    :href="href"
    :title="title"
    :aria-label="title"
    target="_blank"
    class="btn btn-gray-800 text-white btn-app btn-icon"
  >
    <svg-icon
      :name="iconName"
      :width="iconWidth"
      :height="iconHeight"
      aria-hidden="true"
    />
  </SeoLink>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: '#',
    },
    icon: {
      type: String,
      default: null,
    },
    iconHeight: {
      type: [Number, String],
      default: 28,
    },
    iconWidth: {
      type: [Number, String],
      default: 100,
    },
    title: {
      type: String,
      default: null,
    },
  },

  computed: {
    iconName() {
      const name = [this.icon]
      if (!this.isDefaultLocale) name.push(this.$i18n.locale)
      return name.join('-')
    },

    isDefaultLocale() {
      return this.$i18n.locale === this.$i18n.defaultLocale
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-app {
  padding-top: calc(#{$input-btn-padding-y} - 2px);
  padding-bottom: calc(#{$input-btn-padding-y} - 2px);
  border-radius: 0.375rem;

  @include hover {
    border-color: $brand-light;
    background-color: $brand-light;
  }
}
</style>
