<template>
  <b-dropdown
    boundary="window"
    toggle-class="btn-icon rounded-pill"
    variant="gray-200"
    class="header-feedback"
    no-caret
  >
    <template #button-content>
      <span class="sr-only">{{ $t('feedback.title') }}</span>
      <svg-icon name="headset-24" width="24" height="24" aria-hidden="true" />
    </template>

    <b-dropdown-item
      v-for="(item, index) in items"
      :key="`dropdown-item-${index}`"
      :to="localePath(item.to)"
      link-class="dropdown-item-icon"
    >
      <svg-icon :name="item.icon" width="24" height="24" aria-hidden="true" />
      {{ $t(`feedback.${item.text}`) }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { BDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  components: {
    BDropdown,
    BDropdownItem,
  },

  data() {
    return {
      items: [
        {
          text: 'getFeedback',
          icon: 'headset-24',
          to: '/support/feedback',
        },
        {
          text: 'estimateProject',
          icon: 'calculator-24',
          to: '/support/project',
        },
        {
          text: 'reportError',
          icon: 'warning-24',
          to: '/support/report',
        },
        {
          text: 'askQuestion',
          icon: 'question-24',
          to: '/support/question',
        },
      ],
    }
  },
}
</script>
