<template>
  <div class="header-buttons">
    <HeaderCompare />
    <HeaderButtonWrapper>
      <HeaderFeedback @show-modal="$emit('show-modal', $event)" />
    </HeaderButtonWrapper>
    <HeaderButtonWrapper>
      <HeaderCart :count="cartRows" />
    </HeaderButtonWrapper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['cartRows']),
  },
}
</script>

<style lang="scss" scoped>
.header-buttons {
  display: flex;
  gap: 0 1.5rem;
  justify-self: end;
  padding-left: 1.5rem;
}

@include media-breakpoint-down(md) {
  .header-buttons {
    display: none;
  }
}
</style>
