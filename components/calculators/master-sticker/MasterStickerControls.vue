<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" md="auto" order-md="3" class="mb-16">
        <b-row>
          <b-col cols="6">
            <b-button
              :disabled="step < 2"
              variant="primary"
              block
              @click="setStep(step - 1)"
            >
              {{ $t('global.back', locale) }}
            </b-button>
          </b-col>

          <b-col cols="6">
            <b-button
              :disabled="step > 2"
              variant="primary"
              block
              @click="setStep(step + 1)"
            >
              {{ $t('global.forward', locale) }}
            </b-button>
          </b-col>
        </b-row>
      </b-col>

      <b-col
        id="mastersticker-aside-col"
        cols="12"
        md="auto"
        order-md="1"
        class="mb-16"
      >
        <div class="mastersticker-aside">
          <transition name="fade">
            <b-button
              v-if="step === 1"
              variant="outline-primary"
              block
              @click="addRail"
            >
              {{ $t('calculators.masterSticker.addRail', locale) }}
            </b-button>
          </transition>
        </div>
      </b-col>

      <b-col cols="12" md="auto" order-md="2" class="mr-md-auto mb-16">
        <b-button variant="outline-primary" block @click="clearRails">
          {{ $t('calculators.masterSticker.clearAll', locale) }}
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('mastersticker', ['locale', 'step']),
  },

  methods: {
    ...mapActions('mastersticker', ['addRail', 'clearRails', 'setStep']),
  },
}
</script>
