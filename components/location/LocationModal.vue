<template>
  <b-modal v-model="localVisible" body-class="p-40" hide-header hide-footer>
    <template #default="{ ok, cancel }">
      <h5>{{ $t('search.selectCity') }}</h5>
      <LocationForm @submit="ok" />
      <b-button
        :title="$t('global.close')"
        :aria-label="$t('global.close')"
        variant="white"
        size="sm"
        class="btn-icon modal-close text-secondary rounded-pill"
        @click="cancel"
      >
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  components: { BModal },

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(event) {
        this.$emit('change', event)
      },
    },
  },
}
</script>
