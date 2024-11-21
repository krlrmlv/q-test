<template>
  <div>
    <b-form-group
      :label="$t(`${prefix}.title`)"
      content-cols="auto"
      label-cols="auto"
      label-class="flex-fill"
      class="mb-20 mb-lg-24"
    >
      <b-form-checkbox v-model="collapseOpen" switch />
    </b-form-group>

    <b-collapse :visible="collapseOpen">
      <b-row>
        <b-col
          v-for="(subfield, index) in subfields"
          :key="`subfield-${index}`"
          :xl="subfield.cols || 6"
        >
          <b-form-group
            :label="$t(`${prefix}.${subfield.key}`)"
            class="mb-20 mb-lg-24"
          >
            <b-form-select
              v-if="subfield.options"
              :value="fieldValue[subfield.key]"
              :options="getOptions(subfield.options)"
              @input="setFieldValue([$event, subfield.key])"
            />
            <b-form-input
              v-else
              :value="fieldValue[subfield.key]"
              min="0"
              type="number"
              class="no-appearance"
              @input="setFieldValue([Number($event), subfield.key])"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-collapse>
  </div>
</template>

<script>
import {
  BCollapse,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormSelect,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BCollapse,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BFormSelect,
  },

  props: {
    field: {
      type: String,
      default: '',
    },
    subfields: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      collapseOpen: false,
    }
  },

  computed: {
    ...mapGetters('masterkupol', ['gridData']),

    fieldValue() {
      return this.gridData?.[this.field] || {}
    },

    prefix() {
      return `calculators.masterKupol.grid.${this.field}`
    },
  },

  watch: {
    collapseOpen: {
      immediate: true,
      handler(event) {
        if (event) {
          this.setDefaults()
        } else {
          this.setGridDataField([null, this.field])
        }
      },
    },
  },

  methods: {
    ...mapActions('masterkupol', ['setGridDataField']),

    getOptions(keys) {
      return keys.map((value) => ({
        text: this.$t(`calculators.masterKupol.grid.${this.field}.${value}`),
        value,
      }))
    },

    setDefaults() {
      const fieldValue = this.subfields.reduce((obj, { key, value }) => {
        obj[key] = value
        return obj
      }, {})
      this.setGridDataField([fieldValue, this.field])
    },

    setFieldValue([event, innerField]) {
      if (!this.collapseOpen) return

      const newValue = {
        ...(this.gridData?.[this.field] || {}),
        [innerField]: event,
      }
      this.setGridDataField([newValue, this.field])
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .form-row {
    align-items: center;
    flex-wrap: nowrap;

    .col-form-label {
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  .custom-switch {
    min-height: 0;
    padding: 0;

    .custom-control-label {
      width: 2.25rem;
      height: 1.25rem;

      &::before {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: $rounded-pill;
        background-color: $gray-500;
        transition: $transition-base;
        transition-property: background-color;
      }

      &::after {
        left: 0.125rem;
        top: 0.125rem;
        width: 1rem;
        height: 1rem;
        border-radius: $rounded-pill;
        background-color: $white;
        box-shadow: $box-shadow-sm;
        transform: translateX(0);
        transition: $transition-base;
        transition-property: transform;
      }
    }

    .custom-control-input:checked ~ .custom-control-label {
      &::before {
        background-color: $primary;
      }

      &::after {
        transform: translateX(1rem);
      }
    }
  }
}
</style>
