<template>
  <div>
    <div v-if="documentation.length" class="mb-lg-64">
      <h4 class="mb-40">
        {{ $t('solutions.tabs.documentation.documentation') }}
      </h4>

      <SolutionsFileList :files="documentation" />
    </div>

    <div v-if="software.length" class="mb-lg-64">
      <h4 class="mb-40">
        {{ $t('solutions.tabs.documentation.software') }}
      </h4>

      <SolutionsFileList :files="software" />
    </div>
  </div>
</template>

<script>
const SOFTWARE_FILE_TYPES = ['7']

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    documentation() {
      return (
        this.items?.filter(
          ({ file_type_id }) => !SOFTWARE_FILE_TYPES.includes(file_type_id)
        ) ?? []
      )
    },

    software() {
      return (
        this.items?.filter(({ file_type_id }) =>
          SOFTWARE_FILE_TYPES.includes(file_type_id)
        ) ?? []
      )
    },
  },
}
</script>
