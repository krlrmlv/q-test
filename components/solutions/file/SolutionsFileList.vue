<template>
  <b-row class="mx-xl-n24 mb-lg-32">
    <b-col
      v-for="(file, index) in files"
      :key="`file-${index}`"
      cols="12"
      md="6"
      lg="3"
      class="mb-16 mb-md-32 mb-xl-48 px-xl-24"
    >
      <SolutionsFile :file="file" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
