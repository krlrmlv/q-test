<template>
  <client-only>
    <VueTelInput
      ref="input"
      v-model="localValue"
      :mode="mode"
      :default-country="$i18n.localeProperties.iso"
      :disabled="disabled"
      :input-options="inputOptions"
      :preferred-countries="preferredCountries"
      valid-characters-only
      :class="[
        `input-group input-group-${size}`,
        { 'input-group-invalid': state === false },
        { 'input-group-valid': state === true },
      ]"
      @country-changed="handleCountryChanged"
      @open="clearInputEnabled = true"
      @close="clearInputEnabled = false"
      @blur="autoMoveCursorEnabled = true"
    />
  </client-only>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/css/sprite.css'
import 'vue-tel-input/dist/css/component.css'

export default {
  components: { VueTelInput },

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'national',
    },
    preferredCountries: {
      type: Array,
      default: () => ['RU', 'KZ', 'BY', 'UA'],
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
    state: {
      type: Boolean,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      isRuSelected: true,
      clearInputEnabled: true,
      autoMoveCursorEnabled: true,
    }
  },

  computed: {
    telInput() {
      return this.$refs.input.$refs.input
    },

    inputOptions() {
      return {
        autocomplete: 'off',
        maxlength: 18,
        placeholder: this.$t('form.phone'),
        readonly: this.readonly,
        required: this.required,
        styleClasses: 'form-control',
        type: 'tel',
      }
    },

    localValue: {
      get() {
        return this.value ?? ''
      },
      async set(event) {
        if (this.isRuSelected) event = await this.handleRussianPhone(event)
        this.$emit('input', event)
      },
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.$refs.input.choose('RU')
      this.telInput.addEventListener('click', this.handleInputClick)
    })
  },

  beforeDestroy() {
    this.localValue = ''
    this.telInput.removeEventListener('click', this.handleInputClick)
  },

  methods: {
    handleCountryChanged(event) {
      if (event.iso2 === 'RU') this.isRuSelected = true
      else this.isRuSelected = false

      this.clearInputEnabled &&
        setTimeout(() => (this.localValue = '+' + event.dialCode))

      this.clearInputEnabled = false
    },

    handleRussianPhone(number) {
      if (!number.startsWith('+7')) number = number.replace(number[0], '+7')

      if (number === '+77' || number === '+78')
        number = number.replace(number, '+79')

      if (number.startsWith('+779')) number = '+7' + number.slice(3)

      if (number.startsWith('+7+7')) number = number.slice(2)

      return number
    },

    handleInputClick() {
      if (!this.autoMoveCursorEnabled) return

      const valueLength = this.telInput?.value?.length
      this.telInput.setSelectionRange(valueLength, valueLength)
      this.autoMoveCursorEnabled = false
    },
  },
}
</script>

<style lang="scss" scoped>
.vue-tel-input {
  position: relative;
  border-radius: 0;
  border: none;
  transition: $transition-base;
  transition-property: box-shadow;

  &:focus-within {
    box-shadow: $input-focus-box-shadow;
  }

  &.input-group-invalid {
    &:focus-within {
      box-shadow: 0 0 0 $input-focus-width rgba($danger, 0.25);
    }

    ::v-deep {
      .form-control,
      .vti__dropdown {
        border-color: $danger;
      }
    }
  }

  &.input-group-valid {
    &:focus-within {
      box-shadow: 0 0 0 $input-focus-width rgba($success, 0.25);
    }

    ::v-deep {
      .form-control,
      .vti__dropdown {
        border-color: $success;
      }
    }
  }

  ::v-deep {
    .form-control {
      padding-left: $input-padding-x * 0.5;
      border: $border-width solid $border-color;
      border-left: none;

      &:focus {
        box-shadow: none;
      }
    }

    .vti__dropdown {
      position: static;
      flex-direction: row;
      align-content: stretch;
      justify-content: stretch;
      padding: $input-padding-y $input-padding-x * 0.5 $input-padding-y
        $input-padding-x;
      border: $border-width solid $border-color;
      border-right: none;
      transition: $transition-base;
      transition-property: background-color;

      &:focus-visible {
        background-color: $gray-100;
        outline: none;
      }
    }

    .vti__flag {
      margin: 0;
    }

    .vti__dropdown-arrow {
      margin-left: 0.5rem;
    }

    .vti__dropdown-list {
      left: 0;
      width: 100% !important;
      margin: -$border-width 0;
      max-height: 15rem;
      border: $border-width solid $border-color;
      z-index: 3;

      &.below {
        top: 100%;
      }
    }

    .vti__dropdown-item {
      display: flex;
      align-items: center;
      padding: $dropdown-item-padding-y $dropdown-item-padding-x;

      &.last-preferred {
        border-color: $border-color;
      }
    }

    .vti__flag-wrapper {
      flex: 0 0 auto;
      width: auto;
      margin-right: 0.5rem;
    }
  }
}
</style>
