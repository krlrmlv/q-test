<template>
  <div class="solutions-file">
    <b-link
      :href="fileLink"
      target="_blank"
      :class="linkClass"
      class="solutions-file-link text-hover-primary"
    >
      <span class="icon-wrapper">
        <svg-icon
          :name="`file/${extension}-40`"
          width="40"
          height="40"
          class="icon-large"
          aria-hidden="true"
        />
      </span>
      <div>
        <span v-text="file.description ? file.description : file.name" />
        <span
          v-if="fileInfo"
          class="d-block text-nowrap text-muted"
          v-text="fileInfo"
        />
      </div>
    </b-link>
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: () => ({}),
    },
    hideFileInfo: {
      type: Boolean,
      default: false,
    },
    linkClass: {
      type: String,
      default: null,
    },
    vendorCode: {
      type: String,
      default: null,
    },
  },
  computed: {
    extension() {
      return this.file?.file?.split(/[#?]/)[0].split('.').pop().trim()
    },

    fileInfo() {
      if (this.hideFileInfo) return

      const info = []
      if (this.extension) info.push(`${this.extension}`.toUpperCase())
      if (this.file?.size) {
        info.push(this.$humanFileSize(this.file.size))
      }
      return info.length ? `(${info.join(', ')})` : null
    },

    fileLink() {
      return this.$getStaticFile(
        `/uploads/products/${this.file?.file}`,
        null,
        false
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.solutions-file-link {
  display: flex;
  align-items: center;
  font-size: $font-size-2;
  line-height: 1.4;
  color: inherit;
  transition: ease-in-out 0.15s;
}

.icon-wrapper {
  display: flex;
  align-self: flex-start;
  margin-right: 0.5rem;
  color: $primary;
}
</style>
