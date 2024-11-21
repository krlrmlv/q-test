<template>
  <b-link :to="localePath({ name: 'index' })" class="header-brand">
    <img
      src="/images/logo-ekf.svg"
      width="138"
      height="36"
      alt="EKF"
      class="header-brand-image"
    />
  </b-link>
</template>

<style lang="scss" scoped>
.header-brand-image {
  width: auto;
  height: 2.25rem;
}

@include media-breakpoint-down(md) {
  .header-brand {
    margin: 0 auto;
    padding: 1rem 0;
    text-align: center;
  }

  .header-brand-image {
    height: 2rem;
  }
}

@include media-breakpoint-up(lg) {
  .header-brand {
    display: flex;
    align-items: center;
    padding-right: 2rem;
  }
}
</style>
