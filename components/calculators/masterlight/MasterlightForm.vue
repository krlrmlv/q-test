<template>
  <form>
    <b-row class="mb-12 mb-lg-24">
      <b-col lg="6">
        <b-form-group
          :label="$t('calculators.masterLight.form.length')"
          class="mb-20 mb-lg-24"
        >
          <b-form-input
            :value="form.length"
            min="0"
            type="number"
            class="no-appearance"
            @input="$emit('input', $event, 'length')"
          />
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group
          :label="$t('calculators.masterLight.form.width')"
          class="mb-20 mb-lg-24"
        >
          <b-form-input
            :value="form.width"
            min="0"
            type="number"
            class="no-appearance"
            @input="$emit('input', $event, 'width')"
          />
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group
          :label="$t('calculators.masterLight.form.height')"
          class="mb-20 mb-lg-24"
        >
          <b-form-input
            :value="form.height"
            min="0"
            type="number"
            class="no-appearance"
            @input="$emit('input', $event, 'height')"
          />
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group
          :label="$t('calculators.masterLight.form.workAreaHeight')"
          class="mb-20 mb-lg-24"
        >
          <b-form-input
            :value="form.workAreaHeight"
            min="0"
            type="number"
            class="no-appearance"
            @input="$emit('input', $event, 'workAreaHeight')"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group
      :label="$t('calculators.masterLight.form.roomType')"
      class="mb-20 mb-lg-24"
    >
      <b-form-select
        :value="form.roomLuxLevel"
        :options="options.roomLuxLevels"
        @input="$emit('input', $event, 'roomLuxLevel')"
      />
    </b-form-group>
    <b-form-group
      :label="$t('calculators.masterLight.form.roomCategory')"
      class="mb-20 mb-lg-24"
    >
      <b-form-select
        :value="form.roomSafetyFactor"
        :options="options.roomSafetyFactors"
        @input="$emit('input', $event, 'roomSafetyFactor')"
      />
    </b-form-group>
    <b-form-group
      label-class="d-flex align-items-center"
      class="mb-20 mb-lg-24"
    >
      <template #label>
        {{ $t('calculators.masterLight.form.reflectionRatio') }}
        <MasterlightTooltip />
      </template>
      <b-form-select
        :value="form.roomReflectionFactor"
        :options="options.roomReflectionFactors"
        @input="$emit('input', $event, 'roomReflectionFactor')"
      />
    </b-form-group>
  </form>
</template>

<script>
import { BFormGroup, BFormInput, BFormSelect } from 'bootstrap-vue'

export default {
  components: {
    BFormGroup,
    BFormInput,
    BFormSelect,
  },
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    reflectionRatioOptions() {
      return this.options?.reflectionRatios?.map((value) => ({
        text: value.join(' '),
        value,
      }))
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .col-form-label {
    font-size: $font-size-4;
    line-height: $font-size-base * $line-height-base;
  }
}
</style>
