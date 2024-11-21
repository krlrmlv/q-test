<template>
  <div class="solutions-file">
    <b-link
      :href="fileLink"
      :target="fileTarget"
      :class="linkClass"
      class="solutions-file-link"
      @click="handleClick"
    >
      <span class="icon-wrapper">
        <svg-icon
          :name="`file/${extension}-40`"
          width="40"
          height="40"
          class="icon-large"
          aria-hidden="true"
        />
        <svg-icon
          :name="`file/${extension}-24`"
          width="24"
          height="24"
          class="icon-small"
          aria-hidden="true"
        />
      </span>
      <div>
        <span v-text="file.name" />
        <span
          v-if="fileInfo"
          class="d-block text-nowrap text-muted"
          v-text="fileInfo"
        />
      </div>
    </b-link>

    <SolutionsFileDownloadModal
      v-model="modalVisible"
      :file="file"
      :vendor-code="vendorCode"
      @form-submitted="handleFormSubmitted"
    />
  </div>
</template>

<script>
const ARCHIVE_EXTENSIONS = ['7z', 'rar', 'zip']

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

  data() {
    return {
      modalVisible: false,
      isFormSubmitted: false,
    }
  },

  computed: {
    extension() {
      return this.file?.file?.split(/[#?]/)[0].split('.').pop().trim()
    },

    fileInfo() {
      if (this.hideFileInfo) return

      const info = []
      if (this.extension) info.push(`${this.extension}`.toUpperCase())
      if (this.file?.file_size) {
        info.push(this.$humanFileSize(this.file.file_size))
      }
      return info.length ? `(${info.join(', ')})` : null
    },

    fileLink() {
      return this.isArchive && !this.isFormSubmitted
        ? null
        : this.$getStaticFile(this.file?.file)
    },

    fileTarget() {
      return this.isArchive ? null : '_blank'
    },

    isArchive() {
      return ARCHIVE_EXTENSIONS.includes(this.extension)
    },
  },

  created() {
    if (this.$cookies.get('archiv_form_submitted')) this.isFormSubmitted = true
  },

  methods: {
    handleClick() {
      if (!this.isArchive) {
        this.$ym('reachGoal', 'SAVESOLUTIONSFILE')
        return
      }

      if (this.isFormSubmitted) {
        this.$ym('reachGoal', 'SAVESOLUTIONSNOFORM')
      } else {
        this.modalVisible = true
        this.$ym('reachGoal', 'CLKBUTONDOWNSOLUTION')
      }
    },

    handleFormSubmitted() {
      this.isFormSubmitted = true
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
}

.icon-wrapper {
  display: flex;
  align-self: flex-start;
  margin-right: 0.5rem;
  color: $primary;
}

.icon-small {
  display: none;
}

.icon-large {
  display: none;
}

@include media-breakpoint-down(sm) {
  .icon-small {
    display: block;
  }
}

@include media-breakpoint-up(md) {
  .icon-large {
    display: block;
  }
}
</style>
