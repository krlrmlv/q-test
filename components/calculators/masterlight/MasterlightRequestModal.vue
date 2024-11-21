<template>
  <b-modal v-model="localVisible" size="lg" hide-header hide-footer>
    <template #default="{ cancel, close }">
      <transition name="fade" mode="out-in">
        <div v-if="success" key="success">
          <div class="text-md-center mb-32">
            <h4>{{ $t('calculators.masterLight.modal.successTitle') }}</h4>
            <p class="fs-2 mb-0">
              {{ $t('calculators.masterLight.modal.successSubitle') }}
            </p>
          </div>

          <b-button variant="primary" block @click="close">
            {{ $t('global.close') }}
          </b-button>
        </div>

        <div v-else key="form">
          <div class="text-md-center mb-32">
            <h4>{{ $t('calculators.masterLight.modal.title') }}</h4>
            <p v-if="!loggedIn" class="fs-2 mb-0">
              {{ $t('calculators.masterLight.modal.subtitle') }}
            </p>
          </div>

          <FormFeedback
            :code="282"
            disable-file-upload
            disable-form-accept
            @success="handleSubmit(_, ok)"
          />
        </div>
      </transition>
      <b-button
        variant="white"
        size="sm"
        class="btn-icon modal-close text-secondary rounded-pill"
        @click="cancel"
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
    category: {
      type: Object,
      default: () => ({}),
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

    loggedIn() {
      return this.$store.state.auth
    },
  },

  methods: {
    handleSubmit(_, callback) {
      const delay = 5000
      this.success = true
      setTimeout(() => callback(), delay)
    },
  },
}
</script>
