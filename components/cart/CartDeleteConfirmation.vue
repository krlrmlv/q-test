<template>
  <b-modal v-model="localVisible" size="xl" centered hide-footer hide-header>
    <template #default="{ close }">
      <svg-icon
        name="exclamation-48"
        width="48"
        height="48"
        aria-hidden="true"
        class="mb-16 text-primary"
      />

      <h4 class="mb-16 p-0 col-md-10 col-lg-7">
        {{ $t('cart.deleteConfirmation.title') }}
      </h4>

      <p>
        {{ $t(`cart.deleteConfirmation.${textKey}`) }}
      </p>

      <hr class="my-16 my-md-40 border-gray-200" />

      <h6 class="mb-24">{{ $t('cart.deleteConfirmation.question') }}</h6>

      <div class="controls">
        <b-button variant="primary" @click="confirmDelete">
          {{ $t('global.delete') }}
        </b-button>
        <b-button variant="gray-200" @click="close">
          {{ $t('global.cancel') }}
        </b-button>
      </div>

      <b-button
        :title="$t('global.close')"
        :aria-label="$t('global.close')"
        variant="white"
        size="sm"
        class="btn-icon modal-close text-muted rounded-pill"
        @click="close"
      >
        <svg-icon name="close-24" width="24" height="24" aria-hidden="true" />
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  components: {
    BModal,
  },

  model: {
    prop: 'visible',
    event: 'change',
  },

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: null,
    },
    product: {
      type: Object,
      default: () => ({}),
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

    textKey() {
      return this.index ? 'solutionText' : 'cartText'
    },
  },

  methods: {
    confirmDelete() {
      this.$emit('reset')
      this.$emit('delete', this.index ?? this.product)
      this.$emit('change', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  gap: 0.5rem 1rem;

  button {
    min-width: 144px;
  }
}

@include media-breakpoint-down(xs) {
  ::v-deep {
    .modal-body {
      padding-top: 1rem;
      padding-bottom: 2rem;
    }
  }

  .controls {
    flex-direction: column;

    button {
      display: block;
      width: 100%;
    }
  }
}
</style>
