<template>
  <div class="catalog-filter">
    <p class="h7">
      {{ $t('distribution.title') }}
    </p>
    <b-link :to="localePath('/distribution/buy')" class="d-block">
      <img
        :alt="$t('distribution.title')"
        src="/images/filter-distribution-map.png"
        class="img-fluid"
      />
    </b-link>
  </div>
</template>
