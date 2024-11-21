<template>
  <ul class="nav nav-tabs nav-justified">
    <li
      v-for="option in options"
      :key="`option-${option.value}`"
      role="presentation"
      class="nav-item"
    >
      <b-link
        :class="{ active: option.value === value }"
        role="button"
        class="nav-link"
        @click="$emit('input', option.value)"
      >
        {{ $t(option.text) }}
      </b-link>
    </li>
  </ul>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      options: [
        { value: true, text: 'distribution.showMap' },
        { value: false, text: 'distribution.showList' },
      ],
    }
  },
}
</script>
