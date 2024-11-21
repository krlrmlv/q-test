<template>
  <b-row>
    <b-col lg="4">
      <b-form-group
        :label="$t('calculators.masterKupol.grounding.groundType.title')"
        class="mb-20 mb-lg-24"
      >
        <b-form-select
          :value="groundingData.groundType"
          :options="groundTypeOptions"
          @input="setGroundingDataField([$event, 'groundType'])"
        />
      </b-form-group>
    </b-col>

    <b-col lg="4">
      <b-form-group
        label-class="d-flex align-items-center"
        class="mb-20 mb-lg-24"
      >
        <template #label>
          {{ $t('calculators.masterKupol.grounding.resistance.title') }}
          <FormTooltip class="ml-lg-0 ml-xl-4">
            {{ $t('calculators.masterKupol.grounding.resistance.tooltip') }}
          </FormTooltip>
        </template>
        <b-form-input
          :value="groundingData.resistance"
          min="0"
          type="number"
          class="no-appearance"
          @input="setGroundingDataField([Number($event), 'resistance'])"
        />
      </b-form-group>
    </b-col>

    <b-col lg="4">
      <b-form-group
        :label="$t('calculators.masterKupol.grounding.electrodeType.title')"
        class="mb-20 mb-lg-24"
      >
        <b-form-select
          :value="groundingData.electrodeType"
          :options="electrodeTypeOptions"
          @input="setGroundingDataField([$event, 'electrodeType'])"
        />
      </b-form-group>
    </b-col>
  </b-row>
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

  computed: {
    ...mapGetters('masterkupol', ['groundingData']),

    electrodeTypeOptions() {
      return ['vertical', 'horizontal'].map((value) => ({
        text: this.$t(
          `calculators.masterKupol.grounding.electrodeType.${value}`
        ),
        value,
      }))
    },

    groundTypeOptions() {
      return [
        'blackEarth',
        'clay',
        'gardenLand',
        'loam',
        'sandyLoam',
        'sand',
        'limestone',
        'rockyGround',
        'turf',
      ].map((value) => ({
        text: this.$t(`calculators.masterKupol.grounding.groundType.${value}`),
        value,
      }))
    },
  },

  methods: {
    ...mapActions('masterkupol', ['setGroundingDataField']),
  },
}
</script>
