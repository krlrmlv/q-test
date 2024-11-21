<template>
  <b-modal v-model="localVisible" size="lg" centered hide-footer hide-header>
    <template #default="{ close }">

      <h4 class="mb-16 pl-10 pr-10 text-center">
        {{ $t('cart.clearConfirmation.title') }}
      </h4>

      <p class="mb-24 pl-10 pr-10 text-center">{{ $t(question) }}</p>

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
    deleteType: {
      type: String,
      default: '',
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
    question: {
      get() {
        if (this.deleteType === 'clearCart') {
          return 'cart.clearConfirmation.question'
        }
        if (this.deleteType === 'clearProductsInStock') {
          return 'cart.clearConfirmation.questionInStock'
        }
        if (this.deleteType === 'clearProductsPreorder') {
          return 'cart.clearConfirmation.questionPreorder'
        }

        return 'cart.clearConfirmation.question'
      }
    }
  },

  methods: {
    confirmDelete() {
      this.$emit('reset')
      this.$emit('delete', this.deleteType)
      this.$emit('change', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  gap: 0.5rem 1rem;
  justify-content: space-around;

  button {
    min-width: 144px;
    width: 100%;
  }
}

.text-center {
  text-align: center;
}
.pl-10 {
  padding-left: 10px;
}
.pr-10 {
  padding-right: 10px;
}

@include media-breakpoint-down(xs) {
  ::v-deep {
    .modal-body {
      padding-top: 3rem;
      padding-bottom: 2rem;
    }
  }
}
</style>
