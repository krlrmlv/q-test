<template>
  <div class="info-block alert-info">
    <div class="d-flex align-items-center info-text">
      <svg-icon
        name="info-24"
        width="24"
        height="24"
        class="mr-16 text-info"
        aria-hidden="true"
      />

      <slot />
    </div>

    <slot name="button"></slot>
  </div>
</template>

<style lang="scss" scoped>
.info-block {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .text-info {
    flex-shrink: 0;
  }
}
</style>
