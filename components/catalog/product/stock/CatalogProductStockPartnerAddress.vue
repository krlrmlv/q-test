<template>
  <div>
    <p v-if="address.address" class="mb-0">
      <span v-if="address.html" v-html="address.address"></span>
      <span v-else>{{ address.address }}</span>
    </p>
    <p v-if="phoneText && phoneUrl" class="mb-0">
      <b-link :href="phoneUrl" class="phone-link">
        {{ phoneText }}
      </b-link>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      default: () => ({}),
    },
    phoneUrl: {
      type: String,
      default: '',
    },
    phoneText: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.phone-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: $gray-600;
}
</style>
