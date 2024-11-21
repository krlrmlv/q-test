<template>
  <form>
    <b-form-group
      :label="$t('calculators.masterSticker.deviceLabel', locale)"
      label-size="sm"
      class="mb-12"
    >
      <b-form-input v-model="text" type="text" size="sm" />
    </b-form-group>

    <b-form-group
      :label="$t('calculators.masterSticker.deviceSymbol', locale)"
      label-size="sm"
      class="mb-12"
    >
      <b-form-input v-model="symbol" type="text" size="sm" />
    </b-form-group>

    <b-row>
      <b-col v-if="moduleType">
        <b-button size="sm" variant="danger" block @click="removeDevice">
          {{ $t('global.delete', locale) }}
        </b-button>
      </b-col>

      <b-col>
        <b-button size="sm" variant="success" block @click="saveDevice">
          {{ $t('global.save', locale) }}
        </b-button>
      </b-col>
    </b-row>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { BFormGroup, BFormInput } from 'bootstrap-vue'

export default {
  components: {
    BFormGroup,
    BFormInput,
  },

  props: {
    moduleType: {
      type: [Number, String],
      default: null,
    },
  },

  data() {
    return {
      symbol: null,
      text: null,
    }
  },

  computed: {
    ...mapGetters('mastersticker', [
      'locale',
      'moduleTypeCustomText',
      'moduleTypeSymbol',
    ]),
  },

  watch: {
    moduleType: {
      immediate: true,
      handler(event) {
        if (event) {
          this.symbol = this.moduleTypeSymbol(event)
          this.text = this.getModuleTypeLabel(event)
        }
      },
    },
  },

  methods: {
    ...mapActions('mastersticker', ['updateModuleType', 'deleteModuleType']),

    closeEditor() {
      this.$emit('close')
      this.text = null
      this.symbol = null
    },

    getModuleTypeLabel(moduleType) {
      return (
        this.moduleTypeCustomText(moduleType) ||
        this.$t(
          `calculators.masterSticker.moduleTypes.${moduleType}`,
          this.locale
        )
      )
    },

    removeDevice() {
      this.deleteModuleType(this.moduleType)
      this.$emit('delete')
      this.closeEditor()
    },

    saveDevice() {
      this.updateModuleType({
        id: this.moduleType,
        customText: this.text,
        symbol: this.symbol,
      })
      this.closeEditor()
    },
  },
}
</script>
