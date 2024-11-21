<template>
  <div>
    <div v-for="(category_files, category) in categories" :key="category">
      <p class="fs-4 fs-sm-5 font-weight-bold">
        {{ category }}
      </p>
      <b-row class="mb-48">
        <b-col
          v-for="(file, index) in category_files"
          :key="`file-${category}-${index}`"
          cols="12"
          md="6"
          lg="6"
          class="mb-16"
        >
          <DocumentsFile :file="file" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
const FILE_CATEGORIES = {
  'Passport': 'Technical manuals',
  'Datasheet': 'Datasheets',
}
export default {
  props: {
    files: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    categories() {
      return this.files?.reduce((acc, file) => {
        const file_type_name = file?.file_type?.name
        const key = FILE_CATEGORIES[file_type_name] || file_type_name
        if (acc[key]) acc[key].push(file)
        else acc[key] = [file]

        return acc
      }, {})
    },
  },
}
</script>