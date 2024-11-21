<template>
  <form>
    <ValidationProvider
      v-for="field in numberFields"
      v-slot="{ valid, validated }"
      :key="field"
      :name="field"
      rules="min_value:1"
      slim
    >
      <b-form-group
        :label="$t(`calculators.masterKupol.form.${field}`)"
        :state="valid || !validated ? null : false"
        label-class="h6 mb-0"
        class="mb-20 mb-lg-24"
      >
        <b-form-input
          :value="form[field]"
          :state="valid || !validated ? null : false"
          min="0"
          placeholder="0"
          type="number"
          class="no-appearance"
          @input="handleInput(Number($event), field)"
        />
      </b-form-group>
    </ValidationProvider>

    <ValidationProvider
      v-slot="{ valid, validated }"
      name="zone"
      rules="required"
      slim
    >
      <b-form-group
        :label="$t('calculators.masterKupol.form.zone')"
        :state="valid || !validated ? null : false"
        label-class="h6 mb-0"
        class="mb-0"
      >
        <b-form-select
          :value="form.zone"
          :options="climateZoneOptions"
          :state="valid || !validated ? null : false"
          class="mb-16"
          @input="handleInput($event, 'zone')"
        />

        <MasterkupolZoneSelect @input="handleInput($event, 'zone')" />
      </b-form-group>
    </ValidationProvider>
  </form>
</template>

<script>
import { BFormGroup, BFormInput, BFormSelect } from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BFormGroup,
    BFormInput,
    BFormSelect,
  },

  data() {
    return {
      numberFields: ['width', 'length', 'height'],
    }
  },

  computed: {
    ...mapGetters('masterkupol', { form: 'buildingData' }),

    climateZoneOptions() {
      const options = ['1', '2', '3', '4'].map((value) => ({
        text: value,
        value,
      }))
      options.unshift({
        text: this.$t('calculators.masterKupol.climateZones.selectZone'),
        value: null,
        disabled: true,
      })
      options.push({
        text: this.$t('calculators.masterKupol.climateZones.special'),
        value: 'special',
      })
      return options
    },
  },

  methods: {
    ...mapActions('masterkupol', ['setBuildingData']),

    handleInput(value, field) {
      this.setBuildingData({ ...this.form, [field]: value })
    },
  },
}
</script>
