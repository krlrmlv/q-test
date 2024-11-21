<template>
  <transition name="backdrop-fade">
    <div v-if="visible" class="menu-backdrop" @click="closeAllMenus" />
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('header', ['catalogOpen', 'dropdownOpen']),

    visible() {
      return this.catalogOpen || this.dropdownOpen
    },
  },

  methods: {
    ...mapActions('header', ['closeAllMenus']),
  },
}
</script>

<style lang="scss" scoped>
.menu-backdrop {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba($modal-backdrop-bg, $modal-backdrop-opacity);
  z-index: 10;
}
</style>
