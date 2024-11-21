<template>
  <b-modal
    v-model="localVisible"
    dialog-class="modal-error-report"
    centered
    hide-footer
    hide-header
    lazy
    @show="handleShow"
  >
    <template #default="{ cancel, close, ok }">
      <transition name="fade" mode="out-in">
        <div v-if="!success" key="not-submitted">
          <div class="fs-2 text-center mb-32">
            <p class="h4">{{ $t('errorReport.modalTitle') }}</p>
            <p>{{ $t('errorReport.modalSubtitle') }}</p>
          </div>
          <ErrorReportForm
            :selection="selection"
            @cancel="cancel"
            @submit="handleSubmit"
          />
        </div>

        <div v-else key="submitted" class="fs-2 text-center">
          <p class="h4">{{ $t('errorReport.successTitle') }}</p>
          <p class="mb-32">{{ $t('errorReport.successSubtitle') }}</p>
          <b-button variant="primary" block @click="ok">
            {{ $t('global.close') }}
          </b-button>
        </div>
      </transition>

      <b-button
        variant="white"
        size="sm"
        class="btn-icon modal-close text-secondary rounded-pill"
        @click="close"
      >
        <span class="sr-only">{{ $t('global.close') }}</span>
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
    selection: {
      type: null,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      success: false,
    }
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

  methods: {
    handleShow() {
      this.success = false
    },

    handleSubmit() {
      this.success = true
    },
  },
}
</script>
