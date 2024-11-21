<template>
  <b-link class="card" @click="$emit('anchor-click', anchor.key)">
    <div class="card-body">
      <div class="text-primary">
        <svg-icon
          :name="anchor.icon"
          width="48"
          height="48"
          aria-hidden="true"
        />
      </div>
      <h6 class="my-24">
        {{ anchor.text }}
      </h6>
      <b-button variant="link" class="btn-more px-0">
        {{ $t('global.more') }}
      </b-button>
    </div>
  </b-link>
</template>

<script>
export default {
  props: {
    anchor: {
      type: Object,
      default: () => ({}),
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
@include media-breakpoint-up(lg) {
  .card {
    &:hover {
      box-shadow: $box-shadow;
      background-color: $white;
      cursor: pointer;
      .btn-more {
        color: #db0812;
      }
    }
  }
}

.card-body {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
.btn-more {
  display: block;
  margin-top: auto;
  align-self: flex-start;
  color: $gray-600;
  margin-top: auto;
}
</style>
