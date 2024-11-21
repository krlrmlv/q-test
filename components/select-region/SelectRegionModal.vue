<template>
  <b-modal
    v-model="localVisible"
    size="xl"
    hide-header
    hide-footer
    :centered="true"
  >
    <template #default="{ cancel }">
      <h3 class="text-center">Select your region</h3>

      <p class="text-center mb-16 mb-xl-40">Выберите регион</p>

      <SelectRegionCards class="cards" with-current-site />

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

<style lang="scss" scoped>
.cards {
  display: flex;
}

::v-deep {
  .card:not(.current-site) {
    box-shadow: $box-shadow;
  }

  .modal-xl {
    max-width: 1140px;
  }

  @include media-breakpoint-down(lg) {
    .modal-body {
      padding-right: 1.5rem;
      padding-left: 1.5rem;
    }
  }

  @include media-breakpoint-down(md) {
    .modal-xl {
      max-width: 560px;
    }
  }

  @include media-breakpoint-down(sm) {
    .modal-body {
      padding-right: 0.25rem;
      padding-left: 0.25rem;
    }
  }
}
</style>
