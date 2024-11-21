<template>
  <div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
::v-deep {
  .b-skeleton {
    width: calc(#{$border-width * 2} + 24px + 1.375rem);
    height: calc(#{$border-width * 2} + 24px + 1.375rem);
    border-radius: $rounded-pill;
  }
}
</style>
