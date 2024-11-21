<template>
  <b-link
    :href="item.file"
    target="_blank"
    class="media text-reset text-decoration-none"
    @click="$emit('click')"
  >
    <div class="media-aside align-self-start text-primary mr-8">
      <svg-icon
        :name="`file/${fileExtension}-24`"
        :aria-label="fileExtension"
        width="24"
        height="24"
      />
    </div>
    <div class="media-body">
      <p class="mb-0">
        {{ item.name }}
        <span v-if="fileInfo" class="text-muted text-nowrap">
          ({{ fileInfo }})
        </span>
      </p>
    </div>
  </b-link>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    fileExtension() {
      const arr = this.item.file ? this.item.file.split('.') : ['']
      return arr[arr.length - 1].toString().toLowerCase()
    },

    fileInfo() {
      const info = []
      if (this.fileExtension) {
        info.push(this.fileExtension.toUpperCase())
      }
      if (this.item?.fileSize) {
        info.push(this.$humanFileSize(this.item.fileSize))
      }
      return info.join(', ')
    },
  },
}
</script>
