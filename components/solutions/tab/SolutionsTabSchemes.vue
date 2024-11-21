<template>
  <div>
    <div v-if="schemes.length" class="mb-lg-64">
      <h4 class="mb-40">
        {{ $t('solutions.tabs.schemes.schemes') }}
      </h4>

      <SolutionsFileList :files="schemes" />
    </div>

    <div v-if="drawings.length" class="mb-lg-64">
      <h4 class="mb-40">
        {{ $t('solutions.tabs.schemes.drawings') }}
      </h4>

      <SolutionsFileList :files="drawings" />
    </div>
  </div>
</template>

<script>
const DRAWING_FILE_TYPES = ['8']

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    drawings() {
      return (
        this.items?.filter(({ file_type_id }) =>
          DRAWING_FILE_TYPES.includes(file_type_id)
        ) ?? []
      )
    },

    schemes() {
      return (
        this.items?.filter(
          ({ file_type_id }) => !DRAWING_FILE_TYPES.includes(file_type_id)
        ) ?? []
      )
    },
  },
}
</script>
