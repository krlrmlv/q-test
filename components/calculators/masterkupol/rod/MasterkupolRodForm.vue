<template>
  <div>
    <b-form-group
      label-class="d-flex align-items-center"
      class="mb-20 mb-lg-24"
    >
      <template #label>
        {{ $t('calculators.masterKupol.rod.reliability.title') }}
        <FormTooltip>
          {{ $t('calculators.masterKupol.rod.reliability.tooltip') }}
        </FormTooltip>
      </template>
      <b-form-select
        :value="rodData.reliability"
        :options="reliabilityOptions"
        @input="setRodDataField([$event, 'reliability'])"
      />
    </b-form-group>

    <b-form-group
      :label="$t('calculators.masterKupol.rod.height')"
      class="mb-20 mb-lg-24"
    >
      <b-form-input
        :value="rodData.lightning_rod_height"
        max="150"
        min="0"
        type="number"
        class="no-appearance"
        @input="setRodDataField([Number($event), 'lightning_rod_height'])"
      />
    </b-form-group>

    <b-form-group :label="placementLabel" class="mb-8">
      <b-row>
        <b-col xl="6" class="mb-8">
          <b-input-group prepend="A">
            <b-form-input
              :value="rodData.coordX"
              min="0"
              type="number"
              class="no-appearance"
              @input="setRodDataField([Number($event), 'coordX'])"
            />
          </b-input-group>
        </b-col>
        <b-col xl="6" class="mb-8">
          <b-input-group prepend="B">
            <b-form-input
              :value="rodData.coordY"
              min="0"
              type="number"
              class="no-appearance"
              @input="setRodDataField([Number($event), 'coordY'])"
            />
          </b-input-group>
        </b-col>
      </b-row>
    </b-form-group>

    <b-button
      :class="{ collapsed: !collapseOpen }"
      variant="link"
      class="collapse-toggle mb-20 mb-lg-24"
      block
      @click="toggleCollapse"
    >
      {{ $t(`global.${collapseOpen ? 'hide' : 'more'}`) }}
      <svg-icon
        name="chevron-right-24"
        width="24"
        height="24"
        class="ml-4"
        aria-hidden="true"
      />
    </b-button>

    <b-collapse v-model="collapseOpen">
      <div class="pb-20 pb-lg-24">
        <img
          :src="`/images/calculators/masterkupol/rod-placement${localeSuffix}.svg`"
          :alt="$t('calculators.masterKupol.rod.placement.title')"
          class="img-fluid"
        />
      </div>
    </b-collapse>

    <div v-if="rodType === 'wall'">
      <b-form-group
        label-class="d-flex align-items-center"
        class="mb-20 mb-lg-24"
      >
        <template #label>
          {{ $t('calculators.masterKupol.rod.protectionCategory.title') }}
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
          :value="rodData.protectionCategory"
          :options="protectionCategoryOptions"
          @input="setRodDataField([$event, 'protectionCategory'])"
        />
      </b-form-group>
      <b-form-group
        :label="$t('calculators.masterKupol.rod.conductorType.title')"
        class="mb-20 mb-lg-24"
      >
        <b-form-select
          :value="rodData.conductorType"
          :options="conductorTypeOptions"
          @input="setRodDataField([$event, 'conductorType'])"
        />
      </b-form-group>
      <b-form-group
        :label="$t('calculators.masterKupol.rod.wallMaterial.title')"
        class="mb-20 mb-lg-24"
      >
        <b-form-select
          :value="rodData.wallMaterial"
          :options="wallMaterialOptions"
          @input="setRodDataField([$event, 'wallMaterial'])"
        />
      </b-form-group>
    </div>

    <div v-else-if="rodType === 'ridge'">
      <b-form-group
        :label="$t('calculators.masterKupol.rod.additionalConductors')"
        class="mb-20 mb-lg-24"
      >
        <b-form-input
          :value="rodData.additionalConductors"
          min="0"
          type="number"
          class="no-appearance"
          @input="setRodDataField([Number($event), 'additionalConductors'])"
        />
      </b-form-group>
      <b-form-group
        :label="$t('calculators.masterKupol.rod.additionalChimneyConductors')"
        class="mb-20 mb-lg-24"
      >
        <b-form-input
          :value="rodData.additionalChimneyConductors"
          min="0"
          type="number"
          class="no-appearance"
          @input="
            setRodDataField([Number($event), 'additionalChimneyConductors'])
          "
        />
      </b-form-group>
    </div>
  </div>
</template>

<script>
import {
  BCollapse,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BInputGroup,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BCollapse,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BInputGroup,
  },

  data() {
    return {
      collapseOpen: false,
      protectionCategoryOptions: [
        { text: 'I', value: 1 },
        { text: 'II', value: 2 },
        { text: 'III', value: 3 },
        { text: 'IV', value: 3 },
      ],
      reliabilityOptions: [
        {
          text: this.$t('calculators.masterKupol.rod.reliability.placeholder'),
          value: null,
          disabled: true,
        },
        { text: '0.9', value: 0.9 },
        { text: '0.99', value: 0.99 },
        { text: '0.999', value: 0.999 },
      ],
    }
  },

  computed: {
    ...mapGetters('masterkupol', ['rodData', 'rodType']),

    conductorTypeOptions() {
      return ['rod', 'strip'].map((value) => ({
        text: this.$t(`calculators.masterKupol.rod.conductorType.${value}`),
        value,
      }))
    },

    isDefaultLocale() {
      return this.$i18n.locale === this.$i18n.defaultLocale
    },

    localeSuffix() {
      return this.isDefaultLocale ? '' : `-${this.$i18n.locale}`
    },

    placementLabel() {
      return [
        this.$t('calculators.masterKupol.rod.placement.title'),
        this.$t('units.m'),
      ].join(', ')
    },

    tooltipLines() {
      return Object.values(
        this.$t('calculators.masterKupol.grid.protectionCategory.tooltip')
      )
    },

    wallMaterialOptions() {
      return ['concrete', 'aeratedConcrete', 'brick', 'beam', 'sandwich'].map(
        (value) => ({
          text: this.$t(`calculators.masterKupol.rod.wallMaterial.${value}`),
          value,
        })
      )
    },
  },

  methods: {
    ...mapActions('masterkupol', ['setRodDataField']),

    toggleCollapse() {
      this.collapseOpen = !this.collapseOpen
    },
  },
}
</script>
