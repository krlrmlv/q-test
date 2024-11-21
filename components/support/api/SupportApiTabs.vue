<template>
  <b-tabs content-class="pt-24" justified>
    <b-tab :title="$t('description')">
      <slot name="description" />
    </b-tab>

    <b-tab :title="$t('examples')">
      <SupportApiExampleTabs>
        <template v-for="example in examples" #[`example-${example.key}`]>
          <slot :name="`example-${example.key}`">
            <pre :key="example.key" class="mb-8" v-html="example.text" />
          </slot>
        </template>
      </SupportApiExampleTabs>
    </b-tab>
  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'

export default {
  components: {
    BTabs,
    BTab,
  },

  props: {
    examples: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<i18n>
{
  "en": {
    "description": "Description",
    "examples": "Examples"
  },
  "ru": {
    "description": "Описание",
    "examples": "Примеры кода"
  }
}
</i18n>
