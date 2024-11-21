<template>
  <div>
    <h2 class="h3">
      {{ $t('calculators.masterKupol.protectionMethod.title') }}
    </h2>
    <p
      class="mb-32"
      v-html="$t('calculators.masterKupol.protectionMethod.description')"
    />

    <b-form-radio-group
      :checked="protectionMethod"
      class="mb-32 mb-lg-64"
      stacked
      @input="setProtectionMethod"
    >
      <b-row class="mb-n16">
        <b-col
          v-for="option in options"
          :key="`col-${option}`"
          cols="12"
          md="4"
          class="mb-16"
        >
          <b-form-radio :value="option" class="protection-method">
            <div class="protection-method-title">
              {{ $t(`calculators.masterKupol.${option}.title`) }}
            </div>
            <div class="protection-method-image">
              <picture>
                <source
                  :srcset="`/images/calculators/masterkupol/${option}-336.jpg`"
                  media="(max-width: 360px)"
                />
                <source
                  :srcset="`/images/calculators/masterkupol/${option}-551.jpg`"
                  media="(max-width: 767px)"
                />
                <source
                  :srcset="`/images/calculators/masterkupol/${option}.jpg`"
                />
                <img
                  :src="`/images/calculators/masterkupol/${option}.jpg`"
                  :alt="$t(`calculators.masterKupol.${option}.title`)"
                  class="img-fluid"
                />
              </picture>
            </div>
          </b-form-radio>
        </b-col>
      </b-row>
    </b-form-radio-group>

    <MasterkupolNext @click="$emit('next', protectionMethod)" />
  </div>
</template>

<script>
import { BFormRadio, BFormRadioGroup } from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BFormRadio,
    BFormRadioGroup,
  },

  data() {
    return {
      options: ['grid', 'rod', 'grounding'],
    }
  },

  computed: {
    ...mapGetters('masterkupol', ['protectionMethod']),
  },

  methods: {
    ...mapActions('masterkupol', ['setProtectionMethod']),
  },
}
</script>

<style lang="scss" scoped>
.protection-method {
  height: 100%;
  padding-left: 0;

  ::v-deep {
    .custom-control-label {
      flex-direction: column;
      align-items: initial;
      height: 100%;

      &::before,
      &::after {
        top: 0.875rem;
        left: 1.5rem;
      }
    }
  }
}

.protection-method-title {
  flex: 1 1 auto;
  padding: 0.75rem 1.5rem 0.75rem 3.25rem;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  line-height: $line-height-base;
  background-color: $gray-400;
}
</style>
