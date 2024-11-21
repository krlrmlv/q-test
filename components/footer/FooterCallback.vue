<template>
  <div class="footer-callback">
    <div class="callback-icon-wrapper" aria-hidden="true">
      <svg-icon name="phone-24" width="24" height="24" />
    </div>

    <div class="callback-text">
      <b-link
        href="tel:88003338815"
        class="text-reset text-hover-primary callback-phonenumber"
      >
        8 800 333-88-15
      </b-link>
      <b-link
        class="text-reset text-hover-primary"
        @click="modalVisible = !modalVisible"
        >{{ $t('feedback.requestCallback') }}</b-link
      >
    </div>

    <CallbackModal v-model="modalVisible" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.footer-callback {
  display: flex;
  align-items: center;
}

.callback-icon-wrapper {
  align-self: flex-start;
  margin-right: 0.5rem;
}

.callback-text {
  display: flex;
  flex-direction: column;
  font-size: $font-size-2;
  color: $gray-500;
}

.callback-phonenumber {
  display: none;
}

@include media-breakpoint-up(sm) {
  .callback-icon-wrapper {
    margin-right: 1rem;
    padding: 0.75rem;
    border-radius: $rounded-pill;
    background-color: $primary;
  }

  .callback-text {
    font-size: $font-size-1;
    line-height: 1.2;
    color: inherit;
  }

  .callback-phonenumber {
    display: block;
    font-size: $font-size-4;
  }
}
</style>
