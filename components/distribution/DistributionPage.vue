<template>
  <main class="overflow-hidden pb-lg-32">
    <b-container>
      <AppBreadcrumbs :items="breadcrumbs" />

      <DistributionFilter
        v-model="filter"
        :options="filterOptions"
        class="mb-40"
      />

      <DistributionDistributorSelect
        v-bind="{ availableFilterOptions, isPartners, selectedFilterOptions }"
        class="mb-96 mb-lg-128"
      />

      <DistributionMarketplaces class="mb-72" />
    </b-container>
  </main>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
    filterOptions: {
      type: Array,
      default: () => [],
    },
    isPartners: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      filter: null,
    }
  },

  computed: {
    availableFilterOptions() {
      return this.filterOptions
        .filter(({ value }) => Boolean(value))
        .map(({ value }) => value)
    },

    selectedFilterOptions() {
      return this.filter
        ? [this.filter]
        : this.filterOptions
            .map(({ value }) => value)
            .filter((value) => Boolean(value))
    },
  },
}
</script>
