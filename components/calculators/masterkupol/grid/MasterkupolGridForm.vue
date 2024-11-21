<template>
  <b-row>
    <b-col xl="6">
      <b-form-group
        label-class="d-flex align-items-center"
        class="mb-20 mb-lg-24"
      >
        <template #label>
          {{ $t('calculators.masterKupol.grid.protectionCategory.title') }}
          <FormTooltip>
            <p
              v-for="(line, index) in tooltipLines"
              :key="`tooltip-line-${index}`"
              :class="{ 'mt-8': index > 0 }"
              class="mb-0"
            >
              {{ line }}
            </p>
          </FormTooltip>
        </template>
        <b-form-select
          :value="gridData.protectionCategory"
          :options="protectionCategoryOptions"
          @input="setGridDataField([$event, 'protectionCategory'])"
        />

        <MasterkupolGridWarning
          v-if="gridData.protectionCategory === 1"
          @click="$emit('go-to-rod')"
        />
      </b-form-group>
    </b-col>

    <b-col xl="6">
      <b-form-group
        :label="$t('calculators.masterKupol.grid.mountingMethod.title')"
        class="mb-20 mb-lg-24"
      >
        <b-form-select
          :value="gridData.mountingMethod"
          :options="mountingMethodOptions"
          @input="setGridDataField([$event, 'mountingMethod'])"
        />
      </b-form-group>
    </b-col>

    <b-col xl="6">
      <b-form-group
        :label="$t('calculators.masterKupol.grid.roofMaterial.title')"
        class="mb-20 mb-lg-24"
      >
        <b-form-select
          :value="gridData.roofMaterial"
          :options="roofMaterialOptions"
          @input="setGridDataField([$event, 'roofMaterial'])"
        />
      </b-form-group>
    </b-col>

    <b-col xl="6">
      <b-form-group
        :label="$t('calculators.masterKupol.grid.wallMaterial.title')"
        class="mb-20 mb-lg-24"
      >
        <b-form-select
          :value="gridData.wallMaterial"
          :options="wallMaterialOptions"
          @input="setGridDataField([$event, 'wallMaterial'])"
        />
      </b-form-group>
    </b-col>

    <b-col xl="6">
      <b-form-group
        :label="$t('calculators.masterKupol.grid.conductorType.title')"
        class="mb-20 mb-lg-24"
      >
        <b-form-select
          :value="gridData.conductorType"
          :options="conductorTypeOptions"
          @input="setGridDataField([$event, 'conductorType'])"
        />
      </b-form-group>
    </b-col>

    <b-col v-if="isPitched" xl="6">
      <b-form-group
        :label="$t('calculators.masterKupol.grid.pitchAngle')"
        class="mb-20 mb-lg-24"
      >
        <b-form-input
          :value="gridData.pitchAngle"
          max="180"
          min="0"
          type="number"
          class="no-appearance"
          @input="setGridDataField([Number($event), 'pitchAngle'])"
        />
      </b-form-group>
    </b-col>

    <b-col v-if="isPitched" cols="12">
      <b-form-group
        :label="$t('calculators.masterKupol.grid.additionalConductors')"
        class="mb-20 mb-lg-24"
      >
        <b-form-input
          :value="gridData.additionalConductors"
          min="0"
          type="number"
          class="no-appearance"
          @input="setGridDataField([Number($event), 'additionalConductors'])"
        />
      </b-form-group>
    </b-col>

    <b-col v-if="isPitched" cols="12">
      <b-form-group
        :label="$t('calculators.masterKupol.grid.additionalChimneyConductors')"
        class="mb-20 mb-lg-24"
      >
        <b-form-input
          :value="gridData.additionalChimneyConductors"
          min="0"
          type="number"
          class="no-appearance"
          @input="
            setGridDataField([Number($event), 'additionalChimneyConductors'])
          "
        />
      </b-form-group>
    </b-col>

    <b-col cols="12" class="mb-n20 mb-lg-n24">
      <MasterkupolGridSwitch :subfields="chimneyFields" field="chimneys" />

      <hr class="my-20 my-lg-24" />

      <MasterkupolGridSwitch :subfields="drainpipeFields" field="drainpipes" />

      <hr class="my-20 my-lg-24" />

      <MasterkupolGridSwitch
        :subfields="constructionFields"
        field="constructions"
        class="mb-20 mb-lg-24"
      />
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

  data() {
    return {
      chimneyFields: [
        { key: 'quantity', value: 0 },
        { key: 'material', value: 'brick', options: ['brick', 'metal'] },
      ],
      conductorTypeOptions: [
        {
          text: this.$t('calculators.masterKupol.grid.conductorType.d8'),
          value: 'd8',
        },
      ],
      constructionFields: [{ key: 'quantity', value: 0, cols: 12 }],
      drainpipeFields: [
        { key: 'diameter', value: 0 },
        { key: 'material', value: 'metal', options: ['metal', 'plastic'] },
      ],
      mountingMethodOptions: [
        {
          text: this.$t('calculators.masterKupol.grid.mountingMethod.above'),
          value: 'above',
        },
      ],
      protectionCategoryOptions: [
        { text: 'I', value: 1 },
        { text: 'II', value: 2 },
        { text: 'III', value: 3 },
        { text: 'IV', value: 3 },
      ],
    }
  },

  computed: {
    ...mapGetters('masterkupol', ['gridData', 'roofType']),

    isPitched() {
      return this.roofType === 'pitched'
    },

    chimneyMaterialOptions() {
      return ['brick', 'metal'].map((value) => ({
        text: this.$t(`calculators.masterKupol.grid.chimneys.${value}`),
        value,
      }))
    },

    roofMaterialOptions() {
      return ['tiling', 'galvanized', 'seam', 'soft'].map((value) => ({
        text: this.$t(`calculators.masterKupol.grid.roofMaterial.${value}`),
        value,
      }))
    },

    tooltipLines() {
      return Object.values(
        this.$t('calculators.masterKupol.grid.protectionCategory.tooltip')
      )
    },

    wallMaterialOptions() {
      return ['concrete', 'aeratedConcrete', 'brick', 'beam', 'sandwich'].map(
        (value) => ({
          text: this.$t(`calculators.masterKupol.grid.wallMaterial.${value}`),
          value,
        })
      )
    },
  },

  methods: {
    ...mapActions('masterkupol', ['setGridDataField']),
  },
}
</script>
