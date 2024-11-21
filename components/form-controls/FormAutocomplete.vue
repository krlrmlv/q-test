<template>
  <div class="form-autocomplete">
    <b-form-input
      v-model="localValue"
      :debounce="debounce"
      :disabled="disabled"
      :placeholder="placeholder"
      :state="state"
    />
    <div :class="{ show: dropdownVisible }" class="dropdown">
      <ul
        :class="{ show: dropdownVisible }"
        tabindex="-1"
        role="menu"
        class="dropdown-menu w-100"
      >
        <li
          v-for="(option, index) in options"
          :key="`option-${index}`"
          role="presentation"
        >
          <b-link
            role="menuitem"
            class="dropdown-item"
            @click="updateOption(option)"
          >
            <slot :option="option" name="option">
              {{ option.value }}
            </slot>
          </b-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { BFormInput } from 'bootstrap-vue'

export default {
  components: { BFormInput },

  props: {
    debounce: {
      type: Number,
      default: 300,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: null,
    },
    state: {
      type: Boolean,
      default: null,
    },
    value: {
      type: [String, Number],
      default: null,
    },
  },

  data() {
    return {
      dropdownVisible: false,
    }
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },

  watch: {
    options(value) {
      if (value && value.length) this.dropdownVisible = true
      else this.dropdownVisible = false
    },
  },

  methods: {
    updateOption(option) {
      this.$emit('update', option)
      this.dropdownVisible = false
    },
  },
}
</script>
