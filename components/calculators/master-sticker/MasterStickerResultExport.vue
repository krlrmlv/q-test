<template>
  <div class="mastersticker-result-export">
    <p class="mb-32">
      {{ $t('calculators.masterSticker.checkDataWarning', locale) }}
    </p>

    <b-form-group
      :label="$t('calculators.masterSticker.headerHeight', locale)"
      label-size="sm"
      class="mb-32"
    >
      <b-form-input
        :value="headerHeight"
        type="number"
        min="5"
        max="35"
        class="mb-8"
        debounce="500"
        @input="setHeaderHeight(parseInt($event))"
      />
      <b-form-checkbox :checked="printHeader" size="sm" @input="setPrintHeader">
        {{ $t('calculators.masterSticker.printHeader', locale) }}
      </b-form-checkbox>
    </b-form-group>

    <b-button variant="primary" block @click="$emit('print')">
      <b-spinner v-if="busyPrinting" class="mr-8" small />
      {{ $t('global.print', locale) }}
    </b-button>

    <b-button
      variant="outline-primary"
      class="mt-16"
      block
      @click="$emit('save-pdf')"
    >
      <b-spinner v-if="busySaving" class="mr-8" small />
      {{ $t('global.save', locale) }} PDF
    </b-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { BFormGroup, BFormInput, BFormCheckbox, BSpinner } from 'bootstrap-vue'

export default {
  components: {
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BSpinner,
  },

  props: {
    busyPrinting: {
      type: Boolean,
      default: false,
    },
    busySaving: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters('mastersticker', ['headerHeight', 'locale', 'printHeader']),
  },

  methods: {
    ...mapActions('mastersticker', ['setHeaderHeight', 'setPrintHeader']),
  },
}
</script>
