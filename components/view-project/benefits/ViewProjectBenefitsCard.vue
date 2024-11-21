<template>
  <div class="card">
    <div class="card-body">
      <div class="text-primary">
        <svg-icon :name="icon" width="48" height="48" aria-hidden="true" />
      </div>
      <h6 class="mt-24 mb-16">
        {{ $t(`projectBenefits.${benefit}.title`) }}
      </h6>
      <p>
        {{ $t(`projectBenefits.${benefit}.text`) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    benefit: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
  font-size: $font-size-2;
  line-height: 1.4;
  color: inherit;
  background-color: $gray-100;
  transition: $transition-base;
  transition-property: box-shadow;
}
.card-body {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
</style>
