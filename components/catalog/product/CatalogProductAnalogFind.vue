<template>
  <div class="block-find-analog">
    <span variant="link" class="fs-2 text-gray-800">
      <svg-icon
        name="warning-24"
        width="20"
        height="20"
        class="mr-8"
        aria-hidden="true"
      />
      {{ $t('catalog.outOfProduction') }}
    </span>

    <b-button
      :title="$t('catalog.pickUpAnalog')"
      variant="primary"
      block
      @click="redirectToSearchPage"
    >
      <svg-icon
        name="search-24"
        width="20"
        height="20"
        class="mr-8"
        aria-hidden="true"
      />
      <span>
        {{ $t('catalog.pickUpAnalog') }}
      </span>
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    vendorCode: {
      type: String,
      required: true,
    },
  },
  methods: {
    redirectToSearchPage() {
      this.$ym('reachGoal', 'analogues-search')

      const locale = this.$i18n.locale
      const query = `q=${this.vendorCode}&showAnalogs=true`
      this.$router.push(`/${locale}/search?${query}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.block-find-analog {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background-color: $gray-100;
}
</style>
